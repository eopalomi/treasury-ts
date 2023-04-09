import { Response, Request } from "express";
import { CreatePaymentOrderUseCase } from "../../application/use-cases/create-payment-order.use-case";

export class PaymentOrderController {

    constructor(private createPaymentOrderUseCase: CreatePaymentOrderUseCase) {
        this.createPaymentOrder = this.createPaymentOrder.bind(this);
    }

    public async createPaymentOrder({ body }: Request, res: Response): Promise<any> {
        // console.log("body", body); 
        // console.log("body", this.createPaymentOrderUseCase); 
        
        try {

            const payment = await this.createPaymentOrderUseCase.execute({
                paymentAmount: body.paymentAmount,
                idPaymentStatus: body.idPaymentStatus,
                idPaymentType: body.idPaymentType,
                idPaymentMethod: body.idPaymentMethod,
                idBankAccount: body.idBankAccount,
                idUser: body.idUser,
                idTypeCurrency: body.idTypeCurrency,
                paymentDate: body.paymentDate,
                transacctionCode: body.transacctionCode,
                accountantNumber: body.accountantNumber,
                accountantDate: body.accountantDate
            });

            res.status(200).json({
                responseCode: '00',
                message: 'Orden Pago Creada',
                data: { payment }
            })

        } catch (error: any) {
            res.status(400).json({
                responseCode: '01',
                message: error.message,
                stack: error.stack
            })
        }
    }


};