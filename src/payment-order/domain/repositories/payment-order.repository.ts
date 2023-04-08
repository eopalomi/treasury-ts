import { OrdenPago } from "../models/payment-order.model";

export interface paymentOrderRepository {
    create(ordenDePago: OrdenPago): Promise<void>;
    findById(id: number): Promise<OrdenPago>;
    update(ordenDePago: OrdenPago): Promise<void>;
    delete(id: number): Promise<void>;
}