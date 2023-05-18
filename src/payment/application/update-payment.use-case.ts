import { PaymentUpdateDTO } from "../domain/paymentDTO/payment.dto";
import { PaymentRepository } from "../domain/repositories/payment-nontradicional.repository";

export class UpdatePaymentUseCase {
    constructor(private paymentRepository: PaymentRepository) { }

    async updateById(id: number, paymentUpdateDTO: PaymentUpdateDTO) {
        this.paymentRepository.update(id, paymentUpdateDTO);
    };
}