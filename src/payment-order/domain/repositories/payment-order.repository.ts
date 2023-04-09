import { PaymentOrder } from "../models/payment-order.model";

export interface paymentOrderRepository {
    create(ordenDePago: PaymentOrder): Promise<void>;
    findById(id: number): Promise<PaymentOrder>;
    update(ordenDePago: PaymentOrder): Promise<void>;
    delete(id: number): Promise<void>;
}