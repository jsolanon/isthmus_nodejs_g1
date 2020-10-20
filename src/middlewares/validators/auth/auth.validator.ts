import { body } from 'express-validator';

const validations = [
    body('password').exists().withMessage('Password required'),
    body('email').exists().withMessage('Email required'),
    body('email').if(body('email').exists()).isEmail().withMessage('Invalid email format')
    
];

export default validations;