import { body } from 'express-validator';

const validations = [
    body('email').exists().withMessage('Email required'),
    body('email').if(body('email').exists()).isEmail().withMessage('Invalid email format'),
    body('name').exists().withMessage('Name required'),
    body('name').if(body('name')).exists().isLength({min: 3}).withMessage('Min length is 3 characteres')
];

export default validations;