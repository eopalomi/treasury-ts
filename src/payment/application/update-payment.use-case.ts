import { UpdatePaymentDTO } from "./DTOs/payment.dto";
import { PaymentRepository } from "../domain/repositories/payment-nontradicional.repository";

export class UpdatePaymentUseCase {
    constructor(private paymentRepository: PaymentRepository) { }

    async updateById(id: number, paymentUpdateDTO: UpdatePaymentDTO) {
        this.paymentRepository.update(id, paymentUpdateDTO);
    };
}