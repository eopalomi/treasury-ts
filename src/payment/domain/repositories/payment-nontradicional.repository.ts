import { Payment } from "../model/payment.model";

export interface NonTraditionalPaymentRepository {
    create(payment: Payment): Promise<void>;
    findById(id:number): Promise<Payment|null>;
    update(payment:Payment): Promise<void>;
    delete(id: number): Promise<void>;
};