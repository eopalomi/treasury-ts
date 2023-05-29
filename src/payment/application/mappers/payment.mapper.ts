import { NonTradicionalPayment } from "../../domain/model/paymentCategories/nontradicional-payment.model";
import { NonTraditionalPaymentDTO } from "../DTOs/payment.dto";

export class PaymentMapper {
  static paymentToDTO(payment: NonTradicionalPayment): NonTraditionalPaymentDTO {

    const nontradicionalPayment: NonTraditionalPaymentDTO = {
      paymentDate: payment.paymentDate,
      referenceCode: payment.referenceCode,
      paymentAmount: payment.paymentAmount,
      idcurrencyType: payment.idcurrencyType,
      paymentType: payment.paymentType,
      idPaymentCategory: payment.idPaymentCategory,
      exchangeRate: payment.exchangeRate,
      idPaymentSubcategory: payment.idPaymentSubcategory,
      expedientNumber: payment.expedientNumber,
      creditActivationDate: payment.creditActivationDate,
      customerName: payment.customerName,
      paymentDetail: payment.paymentDetail
    };

    return nontradicionalPayment;
  }
}
