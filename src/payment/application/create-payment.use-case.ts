import { PaymentDetail } from "../domain/model/payment-detail.model";
import { NonTradicionalPayment } from "../domain/model/paymentCategories/payment-nontradicional.model";
import { NonTraditionalPaymentRepository } from "../domain/repositories/payment-nontradicional.repository";

interface PaymentParams {
    paymentDate: Date,
    referenceCode: string,
    paymentAmount: number,
    idcurrencyType: number,
    paymentType: number,
    idPaymentCategory: number,
    exchangeRate: number,
    idPaymentSubcategory: number,
    idFile: number,
    creditActivationDate: Date,
    customerName: string,
    paymentDetail: PaymentDetail[]
}

export class CreatePaymentUseCase {

    constructor(private payment: NonTraditionalPaymentRepository) {};

     createPayment = async (params: PaymentParams):Promise<void> => {
        const payment = new NonTradicionalPayment(
            params.paymentDate,
            params.referenceCode,
            params.paymentAmount,
            params.idcurrencyType,
            params.paymentType,
            params.idPaymentCategory,
            params.exchangeRate,
            params.idPaymentSubcategory,
            params.idFile,
            params.creditActivationDate,
            params.customerName,
            params.paymentDetail
        );

       this.payment.create(payment);
    }
    

}