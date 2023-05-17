import { Request, Response } from "express";
import { CreatePaymentUseCase } from "../../application/create-payment.use-case";
import { paymentExceptions } from "../../domain/exceptions/payment.exceptions";
import { PaymentDetailExceptions } from "../../domain/exceptions/payment-detail.exception";
import { FindPaymentuseCase } from "../../application/find-paymeny.use-case";

export class PaymentController {
    constructor(private createPaymentUseCase: CreatePaymentUseCase, private findPaymnetUseCase: FindPaymentuseCase) {}
    
    createPayment = async ({ body }: Request, res: Response) => {
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

    findbyIdPaymnet = async ({params}: Request, res: Response)=>{
        let idPayment:number = parseInt(params.id);
        console.log("idPayment", idPayment)
        const payment = await this.findPaymnetUseCase.findPayment(idPayment);
        
        res.send({
            status:'00',
            result: payment
        })
    };
};