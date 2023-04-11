import { Request, Response } from "express";
import { CreatePaymentUseCase } from "../../application/create-payment.use-case";

export class PaymentController {
    constructor(private payment: CreatePaymentUseCase){
        this.createPayment = this.createPayment.bind(this);
    }

    async createPayment({body}:Request, res:Response){
        console.log("body", body);
        try {
            const payment = await this.payment.createPayment({
                paymentDate: body.paymentDate,
                referenceCode: body.referenceCode,
                paymentAmount: body.paymentAmount,
                idcurrencyType: body.idcurrencyType,
                paymentType: body.paymentType,
                idPaymentCategory: body.idPaymentCategory,
                exchangeRate: body.exchangeRate,
                idPaymentSubcategory: body.idPaymentSubcategory
            });
            
            res.status(200).json({
                responseCode: '00',
                message: 'Pago creado',
                data: payment
            })
        } catch (error:any) {
            res.status(400).json({
                responseCode: '01',
                message: error,
                data: error.stack
            })
        }
    };
}