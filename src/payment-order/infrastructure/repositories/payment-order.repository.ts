import { Pool } from 'pg';
import { PaymentOrder } from '../../domain/models/payment-order.model';
import { paymentOrderRepository } from '../../domain/repositories/payment-order.repository';
import pool from '../adapters/postgres.client'

export class PaymentOrderPostgresRepository implements paymentOrderRepository {
    private readonly pool: Pool;

    constructor() {
        this.pool = pool;
    }

    async create(paymentOrder: PaymentOrder): Promise<void> {
        const client = await this.pool.connect()
        
        try {
            
            await client.query('BEGIN');
            // Escucha el evento 'query' del objeto de cliente pg
            
         
            const query = `insert into pagos.tbblopag (
                im_montot,
                id_estpag,
                id_forpag,
                id_medpag,
                id_ctaban,
                co_usuari,
                id_tipmon,
                id_bancos,
                fe_pagblo,
                nu_traban
             )
             values(
                ${paymentOrder._paymentAmount},
                ${paymentOrder._idPaymentStatus},
                ${paymentOrder._idPaymentType},
                ${paymentOrder._idPaymentMethod},
                ${paymentOrder._idPaymentBank},
                ${paymentOrder._idUser},
                ${paymentOrder._idTypeCurrency},
                ${paymentOrder._idPaymentBank},
                '${paymentOrder._paymentDate}',
                '${paymentOrder._transacctionCode}'
             )`;
            console.log("query", query);
            // const values = [
            //     paymentOrder._paymentAmount,
            //     paymentOrder._idPaymentStatus,
            //     paymentOrder._idPaymentType,
            //     paymentOrder._idPaymentBank,
            //     paymentOrder._idUser,
            //     paymentOrder._idTypeCurrency,
            //     paymentOrder._paymentDate,
            //     paymentOrder._transacctionCode
            // ];
            // console.log("values", values);
            let data = await client.query(query);

            // let data = await client.query(query, values,  (err, result) => {
            //     if (err) {
            //         console.log("result", result)
            //       return console.error('Error executing query', err.stack)
            //     }
            //     console.log(result.rows)
            //   });

            await client.query('COMMIT');

        } catch (error: any) {
            
            console.log("error", error)
            console.log("error", error.stack)
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        };
    };

    findById(id: number): Promise<PaymentOrder> {
        throw new Error('Method not implemented.');
    };
    update(ordenDePago: PaymentOrder): Promise<void> {
        throw new Error('Method not implemented.');
    };
    delete(id: number): Promise<void> {
        throw new Error('Method not implemented.');
    };

}