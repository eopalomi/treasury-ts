import express from 'express';
import { CreatePaymentUseCase } from '../../application/create-payment.use-case';
import { PaymentController } from '../controllers/payment.controller';
import { PaymentPostgresRepository } from '../repositories/payment.repository';

export const paymentAdapter = (app: express.Application) => {
    const routes = express.Router();

    const paymentRepository = new PaymentPostgresRepository();
    const paymentUseCase = new CreatePaymentUseCase(paymentRepository);
    const controller = new PaymentController(paymentUseCase);

    routes.post('/v1/payment', controller.createPayment);
    app.use('/treasury', routes);
};
