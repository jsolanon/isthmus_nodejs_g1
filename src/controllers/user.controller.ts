import { Request, Response, Router } from 'express';
import jwt from 'jsonwebtoken';
import config from 'config';
import bcrypt from 'bcryptjs';
import User from '../models/user';
import { ErrorHandler, handlerError } from '../error';
import bodyUserValidations from '../middlewares/validators/user/user.validator';
import validator_handler from '../middlewares/validator';
import auth_token from '../middlewares/auth/auth';

const router = Router();

//=======================
// POST
// Registrar usuario
// Publico
//=======================

router.post('/', bodyUserValidations, validator_handler, async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    try {
        let user = await User.findOne( { email } );
        if ( user ) {
            const custom = new ErrorHandler(400, "User already exists");
            handlerError(custom, req, res);
        }
        user = new User({
            name,
            email,
            password
        });
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id,
            },
        };

        jwt.sign(payload, config.get('jwt_secret'), { expiresIn: 3600}, (error, token) => {
            if (error) throw error;
            res.status(200).json({
                data: { token },
                msj: 'User created'
            });
        });

    }
    catch (error) {
        console.log(error);
        const custom = new ErrorHandler(500, 'Server error');
        handlerError(custom, req, res);
    }
})

export default router;