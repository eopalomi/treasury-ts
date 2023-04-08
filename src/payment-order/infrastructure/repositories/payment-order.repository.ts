import { Pool } from 'pg';
import { OrdenPago } from '../../domain/models/payment-order.model';
import { paymentOrderRepository } from '../../domain/repositories/payment-order.repository';
import pool from '../adapters/postgres.client'

export class PaymentOrderPostgresRepository implements paymentOrderRepository {
    private readonly pool: Pool;

    constructor() {
        this.pool = pool;
    }

    async create(ordenPago: OrdenPago): Promise<void> {
        const client = await this.pool.connect()

        try {
            await client.query('BEGIN');

            /*const query = 'insert into pagos.tbblopag()values(?,?,?,?,?,?,?,?,?)';
            const values = [
                ordenPago._id,
                ordenPago._dateRegist,
                ordenPago._paymentAmount,
                ordenPago._idPaymentStatus,
                ordenPago._idPaymentType,
                ordenPago._idBankAccount,
                ordenPago._idUser,
                ordenPago._idTypeCurrency,
                ordenPago._paymentDate,
                ordenPago._transacctionCode,
                ordenPago._accountantNumber,
                ordenPago._accountantDate
            ];

            await client.query(query, values);*/

            await client.query('COMMIT');

        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        };
    };

    findById(id: number): Promise<OrdenPago> {
        throw new Error('Method not implemented.');
    };
    update(ordenDePago: OrdenPago): Promise<void> {
        throw new Error('Method not implemented.');
    };
    delete(id: number): Promise<void> {
        throw new Error('Method not implemented.');
    };

}