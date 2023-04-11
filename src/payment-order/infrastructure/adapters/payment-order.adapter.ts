import express from "express";
import { PaymentOrderController } from "../controllers/payment-order.controller";
import { PaymentOrderPostgresRepository } from "../repositories/payment-order.repository";
import { CreatePaymentOrderUseCase } from "../../application/use-cases/create-payment-order.use-case";
import { GetPaymentOrderUseCase } from "../../application/use-cases/get-payment-order.use-case";

export function paymentOrderAdapter(app: express.Application) {
    const routes = express.Router();
    
    //REPOSITORY
    const paymentOrderRepository = new PaymentOrderPostgresRepository();
    
    // USES CASES
    const createPaymentOrderUseCase = new CreatePaymentOrderUseCase(paymentOrderRepository);
    const findPaymentOrderUseCase = new GetPaymentOrderUseCase(paymentOrderRepository);

    //CONTROLLER
    const controller = new PaymentOrderController(createPaymentOrderUseCase, findPaymentOrderUseCase);
    
    routes.post('/v1/payment-order', controller.createPaymentOrder);
    routes.get('/v1/payment-order/:id', controller.finPaymentOrder);

    app.use('/treasury', routes)
};