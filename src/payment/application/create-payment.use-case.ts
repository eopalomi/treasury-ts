import { PaymentDetail } from "../domain/model/payment-detail.model";
import { NonTradicionalPayment } from "../domain/model/paymentCategories/nontradicional-payment.model";
import { PaymentRepository } from "../domain/repositories/payment-nontradicional.repository";

interface PaymentDTO {
    paymentDate: Date,
    referenceCode: string,
    paymentAmount: number,
    idcurrencyType: number,
    paymentType: number,
    idPaymentCategory: number,
    exchangeRate: number,
    idPaymentSubcategory: number,
    expedientNumber: number,
    creditActivationDate: Date,
    customerName: string
};

interface PaymentDetailtDTO {
    idBank: number,
    banckAccountNumber: number,
    interbanckAccountNumber: string,
    paymentAmmount: number,
    beneficiaryName: string,
    beneficiaryIdentificationDocument: string,
    paymentDetails: string,
    idPaymentStatus: number,
    idPaymenOrder: number,
    idBankForPayment: number,
    accountingEntryNumber: number
};

export class CreatePaymentUseCase {
    constructor(private paymentRepository: PaymentRepository) {};

    createNonTraditionalPayment = async (paymentParams: PaymentDTO, paymentdetailParams: PaymentDetailtDTO[]):Promise<void> => {
                
        const paymentDetail = paymentdetailParams.map(({
            idBank,
            banckAccountNumber,
            interbanckAccountNumber,
            paymentAmmount,
            beneficiaryName,
            beneficiaryIdentificationDocument,
            paymentDetails,
            idPaymentStatus,
            idPaymenOrder,
            idBankForPayment,
            accountingEntryNumber
        }) => new PaymentDetail(
            idBank,
            banckAccountNumber,
            interbanckAccountNumber,
            paymentAmmount,
            beneficiaryName,
            beneficiaryIdentificationDocument,
            paymentDetails,
            idPaymentStatus,
            idPaymenOrder,
            idBankForPayment,
            accountingEntryNumber
        ));

        const payment = new NonTradicionalPayment(
            paymentParams.paymentDate,
            paymentParams.referenceCode,
            paymentParams.paymentAmount,
            paymentParams.idcurrencyType,
            paymentParams.paymentType,
            paymentParams.idPaymentCategory,
            paymentParams.exchangeRate,
            paymentParams.idPaymentSubcategory,
            paymentParams.expedientNumber,
            paymentParams.creditActivationDate,
            paymentParams.customerName,
            paymentDetail
        );

       await this.paymentRepository.create(payment, paymentDetail);
    };
};