import { Pool } from "pg";
import { PaymentRepository } from "../../domain/repositories/payment-nontradicional.repository";
import { postgresDatabase } from "../config/postgres.client";
import { NonTradicionalPayment } from "../../domain/model/paymentCategories/nontradicional-payment.model";
import { PaymentDetail } from "../../domain/model/payment-detail.model";

export class PaymentPostgresRepository implements PaymentRepository {
    private readonly pool: Pool;

    constructor() {
        this.pool = postgresDatabase.getConnection();
    }

    async create(payment: NonTradicionalPayment, paymentDetail: PaymentDetail[]): Promise<void> {
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
                    '${payment.paymentDate}',
                    '${payment.referenceCode}',
                    ${payment.paymentAmount},
                    ${payment.idcurrencyType},
                    ${payment.idPaymentCategory},
                    ${payment.exchangeRate},
                    ${payment.paymentType},
                    ${payment.idPaymentSubcategory}
                )
                returning id_pagtes;
            `;

            const queryResult = await client.query(query);
            
            paymentDetail.forEach(async ele => {
                const query = `
                    insert into pagos.tbdetabo (
                        id_pagtes, 
                        id_bancos, 
                        nu_ctaban, 
                        nu_ctacci, 
                        im_abonar, 
                        no_benefi, 
                        nu_docben, 
                        id_estpag, 
                        co_docben, 
                        id_banpag,
                        id_clapag
                    )
                    values(
                        ${queryResult.rows[0].id_pagtes}, 
                        ${ele.idBank},
                        '${ele.banckAccountNumber}',
                        '${ele.interbankAccountNumber}',
                        ${ele.paymentAmmount}, 
                        '${ele.beneficiaryName}',
                        '${ele.beneficiaryIdentificationDocument}',
                        ${ele.idPaymentStatus}, 
                        1, 
                        ${ele.idBankForPayment},  
                        ${payment.paymentType}
                    );
                `;
                
                await client.query(query);
            });
            
            await client.query('COMMIT');
        } catch (error:any) {
            console.log("ERROR: ", error);
            await client.query('ROLLBACK');
            throw new Error(error);
        } finally {
            await client.release();
        };
    }

    findById(id: number): Promise<NonTradicionalPayment | null> {
        throw new Error("Method not implemented.");
    }

    update(payment: NonTradicionalPayment): Promise<void> {
        throw new Error("Method not implemented.");
    }

    delete(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }

}