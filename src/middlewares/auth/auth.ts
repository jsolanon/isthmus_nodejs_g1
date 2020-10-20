import { Request, Response, NextFunction } from 'express';
import { handlerError, ErrorHandler } from '../../error';
import jwt from 'jsonwebtoken';
import config from 'config';

const auth_token = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('x-auth-token');
    if(!token){
        const custom = new ErrorHandler(401, 'No token, auth denied');
        handlerError(custom, req, res);
        return;
    }
    try {
        const decoded: any = jwt.decode(token, config.get('jwt_secret'));
        req.user = decoded.user;
    }
    catch(err) {
        console.log(err);
        const custom = new ErrorHandler(401, 'No token, auth denied');
        handlerError(custom, req, res);
        return;
    }
};

export default auth_token;