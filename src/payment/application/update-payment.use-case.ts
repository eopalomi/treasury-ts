import { PaymentRepository } from "../domain/repositories/payment-nontradicional.repository";
import { Payment } from "../domain/model/payment.model";
import { PaymentDetail } from "../domain/model/payment-detail.model";

export class UpdatePaymentUseCase {
    constructor(private paymentRepository: PaymentRepository) { }

    async updateById(id: number, paymentDetail: Partial<PaymentDetail>) {
        this.paymentRepository.update(id, paymentDetail);
    };
}