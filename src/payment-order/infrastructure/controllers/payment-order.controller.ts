import { Response, Request } from "express";
import { CreatePaymentOrderUseCase } from "../../application/use-cases/create-payment-order.use-case";

export class PaymentOrderController {
    constructor(private createPaymentOrderUseCase: CreatePaymentOrderUseCase) { }

    async createPaymentOrder({ body }: Request, res: Response): Promise<any> {
        console.log(body.sas)
        try {

            const payment = this.createPaymentOrderUseCase.execute({
                id: body.id,
                dateRegist: body.dateRegist,
                paymentAmount: body.paymentAmount,
                idPaymentStatus: body.idPaymentStatus,
                idPaymentType: body.idPaymentType,
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
                message: error.message
            })
        }
    }


};