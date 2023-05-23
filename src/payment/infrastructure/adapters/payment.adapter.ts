import express from 'express';
import { CreatePaymentUseCase } from '../../application/create-payment.use-case';
import { PaymentController } from '../controllers/payment.controller';
import { PaymentPostgresRepository } from '../repositories/payment.repository';
import { FindPaymentuseCase } from '../../application/find-paymeny.use-case';
import { UpdatePaymentUseCase } from '../../application/update-payment.use-case';

export const paymentAdapter = (app: express.Application) => {
  const routes = express.Router();

  const paymentRepository = new PaymentPostgresRepository();

  const createPaymentUseCase = new CreatePaymentUseCase(paymentRepository);
  const findPaymentUseCase = new FindPaymentuseCase(paymentRepository);
  const updatePaymentUseCase = new UpdatePaymentUseCase(paymentRepository);

  const controller = new PaymentController(
    createPaymentUseCase,
    findPaymentUseCase,
    updatePaymentUseCase
  );

  routes.post('/v1/payment', controller.createPayment);
  routes.patch('/v1/payment/:id', controller.updatePayment);
  routes.get('/v1/payment/:id', controller.findbyIdPayment);

  app.use('/treasury', routes);
};
