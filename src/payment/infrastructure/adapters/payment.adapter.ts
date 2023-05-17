import express from 'express';
import { CreatePaymentUseCase } from '../../application/create-payment.use-case';
import { PaymentController } from '../controllers/payment.controller';
import { PaymentPostgresRepository } from '../repositories/payment.repository';
import { FindPaymentuseCase } from '../../application/find-paymeny.use-case';

export const paymentAdapter = (app: express.Application) => {
    const routes = express.Router();

    const paymentRepository = new PaymentPostgresRepository();

    const createPaymentUseCase = new CreatePaymentUseCase(paymentRepository);
    const findPaymentUseCase = new FindPaymentuseCase(paymentRepository);

    const controller = new PaymentController(createPaymentUseCase, findPaymentUseCase);

    routes.post('/v1/payment', controller.createPayment);
    routes.get('/v1/payment/:id', controller.findbyIdPaymnet);
    
    app.use('/treasury', routes);
};
