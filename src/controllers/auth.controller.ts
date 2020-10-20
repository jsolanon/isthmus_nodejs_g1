import { Response, Request, Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from 'config';
import User from '../models/user';
import { ErrorHandler, handlerError } from '../error';
import bodyUserValidations from '../middlewares/validators/auth/auth.validator';
import validator_handler from '../middlewares/validator';

const router = Router();

// ====================================
// @route      POST api/auth
// @desc       Auth user and get token
// @access     Public
// =====================================

router.post('/', bodyUserValidations, validator_handler, async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user){
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                const custom = new ErrorHandler(400, 'Invalid Credentials');
                handlerError(custom, req, res);
            }
            const payload = {
                user: {
                    id: user.id,
                }
            };
            jwt.sign(payload, config.get('jwt_secret'), {expiresIn: 3600}, (error, token) => {
                if (error) throw error;
                res.status(200).json({token});
            })
        } else {
            const custom = new ErrorHandler(400, 'Invalid User');
            handlerError(custom, req, res);
        }
    }
    catch (error) {
        console.log(error);
        const custom = new ErrorHandler(500, 'Server error');
        handlerError(custom, req, res);    
    }
} );

export default router;