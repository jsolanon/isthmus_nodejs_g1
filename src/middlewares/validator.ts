import { handlerError, ErrorHandler } from './../error';
import { validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

const validationHandler = (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if(errors.isEmpty()){
        return next();
    }
    const err = new ErrorHandler(400, 'Invalid field');
    handlerError(err, req, res);
} 

export default validationHandler;