import { PaymentDetail } from '../domain/model/payment-detail.model';
import { NonTradicionalPayment } from '../domain/model/paymentCategories/nontradicional-payment.model';
import { PaymentRepository } from '../domain/repositories/payment-nontradicional.repository';

interface PaymentDTO {
  paymentDate: string;
  referenceCode: string;
  paymentAmount: number;
  idcurrencyType: number;
  paymentType: number;
  idPaymentCategory: number;
  exchangeRate: number;
  idPaymentSubcategory: number;
  expedientNumber: number;
  creditActivationDate: Date;
  customerName: string;
}

interface PaymentDetailtDTO {
  idBank: number;
  banckAccountNumber: string;
  interbanckAccountNumber: string;
  paymentAmmount: number;
  beneficiaryName: string;
  beneficiaryIdentificationDocument: string;
  paymentDetails: string;
  idPaymentStatus: number;
  idPaymenOrder: number;
  idBankForPayment: number;
  accountingEntryNumber: number;
}

export class CreatePaymentUseCase {
  constructor(private paymentRepository: PaymentRepository) { }

  createNonTraditionalPayment = async (
    paymentParams: PaymentDTO,
    paymentdetailParams: PaymentDetailtDTO[]
  ): Promise<void> => {
    const paymentDetail = paymentdetailParams.map(
      ({
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
      }) =>
        new PaymentDetail(
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
        )
    );

    const payment = new NonTradicionalPayment({
      paymentDate: paymentParams.paymentDate,
      referenceCode: paymentParams.referenceCode,
      paymentAmount: paymentParams.paymentAmount,
      idcurrencyType: paymentParams.idcurrencyType,
      paymentType: paymentParams.paymentType,
      idPaymentCategory: paymentParams.idPaymentCategory,
      exchangeRate: paymentParams.exchangeRate,
      idPaymentSubcategory: paymentParams.idPaymentSubcategory,
      expedientNumber: paymentParams.expedientNumber,
      creditActivationDate: paymentParams.creditActivationDate,
      customerName: paymentParams.customerName,
      paymentDetail
    });

    await this.paymentRepository.create(payment, paymentDetail);
  };
}
