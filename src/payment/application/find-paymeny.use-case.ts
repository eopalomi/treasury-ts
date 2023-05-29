import { PaymentRepository } from "../domain/repositories/payment-nontradicional.repository";
import { NonTraditionalPaymentDTO } from "./DTOs/payment.dto";
import { PaymentMapper } from "./mappers/payment.mapper";

export class FindPaymentUseCase {
    constructor(private paymentRepository: PaymentRepository) { }

    findPayment = async (id: number): Promise<NonTraditionalPaymentDTO | null> => {
        const payment = await this.paymentRepository.findById(id);

        if (payment) {
            return PaymentMapper.paymentToDTO(payment);
        }

        return null;
    };
}