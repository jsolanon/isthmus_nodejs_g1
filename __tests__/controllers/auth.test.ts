import { connect, closeDatabase } from './../../src/repositories/__mocks__/db_handler';
import request from 'supertest';
import app from '../../src/app';
jest.setTimeout(30000);

let server: any = null;
let agent: any = null;

describe('Auth User, New session', () => {
    beforeEach(async (done) => {
        await connect();
        server = app
        //Cambiar puerto por las otras pruebas
        .listen(3015, () => {
            agent = request.agent(server);
            done();
        }).on('error', (err) => {
            done(err);
        });
    })
    it('Create a new user correctly', async () => {
        const res = await request(app).post('/v1/user').send({
            name: 'TEST',
            email: 'testQ@email.com',
            password: 'pass12345678'
        });
        expect(res.status).toEqual(200);
    });
    it('Create a new session', async () => {
        const res = await request(app).post('/v1/auth').send({
            email: 'testQ@email.com',
            password: 'pass12345678'
        });
        expect(res.status).toEqual(200);
        expect(typeof res.body.token).toEqual('string');
        expect(res.body.token.length).toBeGreaterThanOrEqual(1);
    });
    it('Bad password', async () => {
        const res = await request(app).post('/v1/auth').send({
            email: 'testQ@email.com',
            password: '123'
        });
        expect(res.status).toEqual(400);
        expect(typeof res.body.message).toEqual('string');
        expect(res.body.message).toEqual('Invalid Credentials');
    });
    it('No valid user', async () => {
        const res = await request(app).post('/v1/auth').send({
            email: 'testtest@email.com',
            password: '123'
        });
        expect(res.status).toEqual(400);
        expect(typeof res.body.message).toEqual('string');
        expect(res.body.message).toEqual('Invalid User');
    });
    afterAll(async () => await closeDatabase())
});