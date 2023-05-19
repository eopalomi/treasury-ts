import { PaymentDetail } from "../model/payment-detail.model";
import { NonTradicionalPayment } from "../model/paymentCategories/nontradicional-payment.model";
import { UpdatePaymentDTO } from "../../application/DTOs/payment.dto";

export interface PaymentRepository {
    create(payment: NonTradicionalPayment, paymentdetaile: PaymentDetail[]): Promise<void>;
    findById(id:number): Promise<NonTradicionalPayment|null>;
    update(id: number, payment: UpdatePaymentDTO): Promise<void>;
    delete(id: number): Promise<void>;
};