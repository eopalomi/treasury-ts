import { Pool } from "pg";
import { Payment } from "../../domain/model/payment.model";
import { PaymentRepository } from "../../domain/repositories/payment.repository";
import { postgresDatabase } from "../config/postgres.client";

export class PaymentPostgresRepository implements PaymentRepository {
    private readonly pool: Pool;

    constructor() {
        this.pool = postgresDatabase.getConnection();
    }

    async create(payment: Payment): Promise<void> {
        const client = await this.pool.connect();

        try {
            await client.query('BEGIN');

            const query = `
                insert into pagos.tbpagtes (
                    fe_regist,
                    nu_refere,
                    im_totabo,
                    id_tipmon,
                    id_tippag,
                    im_tipcam,
                    id_clapag,
                    id_subtippag
                )
                values(
                    default,
                    '${payment.paymentDate}',
                    '${payment.referenceCode}',
                    ${payment.paymentAmount},
                    ${payment.idcurrencyType},
                    ${payment.paymentType},
                    ${payment.exchangeRate},
                    ${payment.idPaymentCategory},
                    ${payment.idPaymentSubcategory}
                );
            `;

            await client.query(query);

            await client.query('COMMIT');
        } catch (error:any) {
            console.log("ERROR: ", error);
            await client.query('ROLLBACK');
            throw new Error(error);
        } finally {
            await client.release();
        };
    }

    findById(id: number): Promise<Payment | null> {
        throw new Error("Method not implemented.");
    }

    update(payment: Payment): Promise<void> {
        throw new Error("Method not implemented.");
    }

    delete(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }

}