import { Request, Response } from "express";
import { CreatePaymentUseCase } from "../../application/create-payment.use-case";
import { paymentExceptions } from "../../domain/exceptions/payment.exceptions";
import { PaymentDetailExceptions } from "../../domain/exceptions/payment-detail.exception";
import { FindPaymentuseCase } from "../../application/find-paymeny.use-case";
import { UpdatePaymentUseCase } from "../../application/update-payment.use-case";
import { UpdatePaymentDTO } from "../../application/DTOs/payment.dto";

export class PaymentController {
    constructor(private createPaymentUseCase: CreatePaymentUseCase, private findPaymnetUseCase: FindPaymentuseCase, private updatePaymnetUseCase: UpdatePaymentUseCase) {}
    
    createPayment = async ({ body }: Request, res: Response) => {
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
        } catch (error) {
            if (error instanceof paymentExceptions || error instanceof PaymentDetailExceptions) {
                const errorCodes = {
                    currencyType: '01',
                    amountGreaterThanZero: '02',
                    categoryID: '03',
                    subCategoryID: '04',
                    paymentType: '05',
                    onlyAlphanumericReference: '06',
                    emptyPaymentDetail: '07',
                    equalPayments: '08',
                    numbersOnlyBeneficiaryDocument: '09',
                    paymentStatusID:'10',
                    lengthInterbankAccountNumber: '11',
                    bankID: '12',
                    bankForPaymentID: '13'
                };

                res.status(422).json({
                    responseCode: errorCodes[error.errorType],
                    message: error.message
                });
            } else {
                res.status(500).json({
                    responseCode: '99',
                    message: 'Internal Server Error',
                });
            };
        };
    };

    findbyIdPayment = async ({params}: Request, res: Response)=>{
        try {
            let idPayment:number = parseInt(params.id);
            
            const payment = await this.findPaymnetUseCase.findPayment(idPayment);
            
            res.status(200).send({
                status:'00',
                result: payment
            })
        } catch (error) {
            res.status(500).send({
                status:'99',
                error
            })
        }
    };

    updatePayment = async ({body, params}: Request, res: Response)=>{
        const payment: UpdatePaymentDTO = {
            idBank: body.idBank,
            banckAccountNumber: body.banckAccountNumber,
            interbankAccountNumber: body.interbankAccountNumber,
            idBankForPayment: body.idBankForPayment
        };

        try {
            const searchPayment = await this.findPaymnetUseCase.findPayment(parseInt(params.id));

            if (!searchPayment){
                res.status(404).json({
                    status: '01',
                    message:'No se encontro el recurso'
                });    

                return;
            };

            await this.updatePaymnetUseCase.updateById(parseInt(params.id), payment)    

            res.status(200).json({
                status: '00',
                message:'OK'
            });
        } catch (error:any) {
            res.status(500).json({
                status: '99',
                error: error.stack
            });
        };      
    }
};