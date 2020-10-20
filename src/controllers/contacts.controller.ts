import { Request, Response, Router } from 'express';
import { ErrorHandler, handlerError } from '../error';
import validator_handler from '../middlewares/validator';
import post_validations from '../middlewares/validators/contact/post';
import put_validations from '../middlewares/validators/contact/put';
import auth_token from '../middlewares/auth/auth';
import Contact from '../models/contacts';

const router = Router();

router.get('/', auth_token, async (req: Request, res: Response) => {
    try {
        const contacts = await Contact.find({user: req.user?.id}).sort({date: -1})
        return res.status(200).json({
            data: contacts,
            msj: 'List of contacts'
        })
    }
    catch (error) {
        console.log(error);
        const custom = new ErrorHandler(500, 'Server error');
        handlerError(custom, req, res);
    }
});

router.post('/', auth_token, post_validations, validator_handler, async (req: Request, res: Response) => {
    try {
        const { name, email, phone, type } = req.body;
        const newContact = new Contact({
            user: req.user?.id,
            name,
            email,
            phone,
            type,
        });
        const contacts = await newContact.save()
        return res.status(201).json({
            data: contacts,
            msj: 'Contact created'
        });
    }
    catch (error) {
        console.log(error);
        const custom = new ErrorHandler(500, 'Server error');
        handlerError(custom, req, res);
    }
});

router.put('/', auth_token, put_validations, validator_handler, async (req: Request, res: Response) => {
    try {
        const { name, email, phone, type } = req.body;
        const contactFields: any = {};
        if(name) contactFields.name = name;
        if(email) contactFields.email = email;
        if(phone) contactFields.phone = phone;
        if(type) contactFields.type = type;

        let contact = await Contact.findById(req.query.id);

        if (!contact) {
            const custom = new ErrorHandler(404, 'Contact not found');
            handlerError(custom, req, res);
        }

        if (contact?.user.toString() !== req.user?.id) {
            const custom = new ErrorHandler(401, 'Not authorized');
            handlerError(custom, req, res);
        }

        contact = await Contact.findByIdAndUpdate( req.query.id, {$set: contactFields}, { new: true } );
        return res.status(200).json({
            data: contact,
            msj: 'Contact updated'
        });
    }
    catch (error) {
        console.log(error);
        const custom = new ErrorHandler(500, 'Server error');
        handlerError(custom, req, res);
    }
});

router.delete('/:id', auth_token, async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        let contact = await Contact.findById(id);

        if (!contact) {
            const custom = new ErrorHandler(404, 'Contact not found');
            handlerError(custom, req, res);
        }

        if (contact?.user.toString() !== req.user?.id) {
            const custom = new ErrorHandler(401, 'Not authorized');
            handlerError(custom, req, res);
        }

        await Contact.findByIdAndRemove(id);
        return res.status(200).json({
            data: contact,
            msj: 'Contact removed'
        });
    }
    catch (error) {
        console.log(error);
        const custom = new ErrorHandler(500, 'Server error');
        handlerError(custom, req, res);
    }
});

export default router;