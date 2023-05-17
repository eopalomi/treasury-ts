import { PaymentRepository } from "../domain/repositories/payment-nontradicional.repository";

export class FindPaymentuseCase {
    constructor(private paymentRepository: PaymentRepository){}

    findPayment = async (id: number) =>{
        const payment = await this.paymentRepository.findById(id);

        return payment;
    };
}