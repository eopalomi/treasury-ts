import express from "express";
import { PaymentOrderController } from "../controllers/payment-order.controller";
import { PaymentOrderPostgresRepository } from "../repositories/payment-order.repository";
import { CreatePaymentOrderUseCase } from "../../application/use-cases/create-payment-order.use-case";

export function paymentOrderAdapter(app: express.Application) {
    const routes = express.Router();

    const paymentOrderRepository = new PaymentOrderPostgresRepository();
    
    const paymentOrderUseCase = new CreatePaymentOrderUseCase(paymentOrderRepository);
    
    const controller = new PaymentOrderController(paymentOrderUseCase);
    
    routes.post('/payment-order', controller.createPaymentOrder);

    app.use('/treasury/v1', routes)
};