import { PaymentOrder } from "../models/payment-order.model";

export interface PaymentOrderRepository {
    create(ordenDePago: PaymentOrder): Promise<void>;
    findById(id: number): Promise<PaymentOrder | null>;
    findAll(): Promise<PaymentOrder>;
    update(ordenDePago: PaymentOrder): Promise<void>;
    updateAll(ordenDePago: PaymentOrder[]): Promise<void>;
    delete(id: number): Promise<void>;
}