import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';

import routes from './routes';

const app = express(); //Inicializar express, modulo de node, para RESTful

app.use(helmet());//Seguridad.
app.use(bodyParser.json());//Respuestas y post en formato json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());//caracteristicas de los apis,bloqueos o accesos
app.use(express.json());//Respuestas y post en formato json

routes(app);

export default app;