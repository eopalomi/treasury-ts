import { Request, Response } from "express";
import { CreatePaymentUseCase } from "../../application/create-payment.use-case";

export class PaymentController {
    constructor(private createPaymentUseCase: CreatePaymentUseCase){
        this.createPayment = this.createPayment.bind(this);
    }

    async createPayment({body}:Request, res:Response){
        console.log("body", body);
        console.log("JSON.parse(body.paymentDetail)", body.paymentDetail);
        
        try {
            const payment = await this.createPaymentUseCase.createNonTraditionalPayment(
                {
                    paymentDate: body.paymentDate,
                    referenceCode: body.referenceCode,
                    paymentAmount: body.paymentAmount,
                    idcurrencyType: body.idcurrencyType,
                    paymentType: body.paymentType,
                    idPaymentCategory: body.idPaymentCategory,
                    idPaymentSubcategory: body.idPaymentSubcategory,
                    exchangeRate: body.exchangeRate,
                    expedientNumber: body.expedientNumber,
                    creditActivationDate: body.creditActivationDate,
                    customerName: body.customerName
                },
                body.paymentDetail
            );
            
            res.status(200).json({
                responseCode: '00',
                message: 'Pago creado',
                data: payment
            })
        } catch (error:any) {
            res.status(400).json({
                responseCode: '01',
                message: error.message,
                stack: error.stack
            })
        }
    };
}