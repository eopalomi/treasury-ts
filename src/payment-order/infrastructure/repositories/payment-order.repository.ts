import { Pool } from 'pg';
import { PaymentOrder } from '../../domain/models/payment-order.model';
import { PaymentOrderRepository } from '../../domain/repositories/payment-order.repository';
import { postgresDatabase } from '../adapters/config/postgres.client';

export class PaymentOrderPostgresRepository implements PaymentOrderRepository {
    private readonly pool: Pool;

    constructor() {
        this.pool = postgresDatabase.getConnection();
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

    async findById(id: number): Promise<PaymentOrder | null> {
        const client = await this.pool.connect();

        try {
            const query = `select * from pagos.tbblopag where id_blopag = ${id}`;
            
            let result = await client.query(query);

            if (!result.rows.length){
                return null;
            }

            const row = result.rows[0];

            let columnToPropertyMap = {
                _paymentAmount: 'im_montot',
                _idPaymentStatus: 'id_estpag',
                _idPaymentType: 'id_forpag',
                _idPaymentMethod: 'id_medpag',
                _idPaymentBank: 'id_bancos',
                _idUser: 'co_usuari',
                _idTypeCurrency: 'id_tipmon',
                _paymentDate: 'fe_pagblo',
                _transacctionCode: 'nu_traban',
                _accountantNumber: 'nu_asient',
                _accountantDate: 'fe_asient'
            };
            
            return new PaymentOrder(
                row[columnToPropertyMap._paymentAmount],
                row[columnToPropertyMap._idPaymentStatus],
                row[columnToPropertyMap._idPaymentType],
                row[columnToPropertyMap._idPaymentMethod],
                row[columnToPropertyMap._idPaymentBank],
                row[columnToPropertyMap._idUser],
                row[columnToPropertyMap._idTypeCurrency],
                new Date(row[columnToPropertyMap._paymentDate]),
                row[columnToPropertyMap._transacctionCode],
                row[columnToPropertyMap._accountantNumber],
                new Date(row[columnToPropertyMap._accountantDate])
            )
        } catch (error) {
            console.log("ERROR:", error)
            await client.query('ROLLBACK');
            throw new Error("Error al buscar la orde de pago");
        } finally{
            client.release();
        };
    };

    update(ordenDePago: PaymentOrder): Promise<void> {
        throw new Error('Method not implemented.');
    };
    delete(id: number): Promise<void> {
        throw new Error('Method not implemented.');
    };

    findAll(): Promise<PaymentOrder> {
        throw new Error('Method not implemented.');
    }
    updateAll(ordenDePago: PaymentOrder[]): Promise<void> {
        throw new Error('Method not implemented.');
    }
}