import { Client, Pool } from "pg";
import { PaymentRepository } from "../../domain/repositories/payment-nontradicional.repository";
import { postgresDatabase } from "../config/postgres.client";
import { NonTradicionalPayment } from "../../domain/model/paymentCategories/nontradicional-payment.model";
import { PaymentDetail } from "../../domain/model/payment-detail.model";

export class PaymentPostgresRepository implements PaymentRepository {
  private readonly pool: Pool;

  constructor() {
    this.pool = postgresDatabase.getConnection();
  }

  async create(
    payment: NonTradicionalPayment,
    paymentDetail: PaymentDetail[]
  ): Promise<void> {
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

      paymentDetail.forEach(async (ele) => {
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
                        id_clapag,
                        fe_regist
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
                        ${payment.paymentType},
                        '${ele.paymentDetailDate}'
                    );
                `;

        await client.query(query);
      });

      await client.query('COMMIT');
    } catch (error: any) {
      console.log('ERROR: ', error);
      await client.query('ROLLBACK');
      throw new Error(error);
    } finally {
      await client.release();
    }
  }

  async findById(id: number): Promise<NonTradicionalPayment | null> {
    const client = await this.pool.connect();

    try {
      const queryPaymentHeader = `select * from pagos.tbpagtes where id_pagtes = ${id}`;
      const queryPaymentDetail = `select * from pagos.tbdetabo where id_pagtes = ${id}`;
      const resultpaymentHeader = await client.query(queryPaymentHeader);
      const resultpaymentDetail = await client.query(queryPaymentDetail);

      if (resultpaymentHeader.rowCount == 0) {
        return null;
      }

      if (resultpaymentDetail.rowCount == 0) {
        return null;
      }

      const paymentDetails: PaymentDetail[] = [];

      resultpaymentDetail.rows.forEach((element) => {
        const paymentDetail: PaymentDetail = new PaymentDetail(
          element.id_bancos,
          element.nu_ctaban,
          element.nu_ctacci,
          parseFloat(element.im_abonar),
          element.no_benefi,
          element.nu_docben,
          element.de_detabo,
          element.id_estpag,
          element.id_blopag,
          element.id_banpag,
          element.nu_asient
      );

        paymentDetails.push(paymentDetail);
      });

      const nonTradicionalPayment: NonTradicionalPayment = new NonTradicionalPayment({
        paymentDate: resultpaymentHeader.rows[0].fe_regist,
        referenceCode: resultpaymentHeader.rows[0].nu_refere,
        paymentAmount: parseFloat(resultpaymentHeader.rows[0].im_totabo),
        idcurrencyType: resultpaymentHeader.rows[0].id_tipmon,
        paymentType: resultpaymentHeader.rows[0].id_clapag,
        idPaymentCategory: resultpaymentHeader.rows[0].id_tippag,
        exchangeRate: resultpaymentHeader.rows[0].im_tipcam,
        idPaymentSubcategory: resultpaymentHeader.rows[0].id_subtippag,
        expedientNumber: null,
        creditActivationDate: null,
        customerName: resultpaymentHeader.rows[0].no_perpri,
        paymentDetail: paymentDetails
      });

      return nonTradicionalPayment;
    } catch (error) {
      throw new Error(String(error));
    } finally {
      await client.release();
    }
  }

    async update(id: number, paymentFields: Partial<PaymentDetail>): Promise<void> {
        const client = await this.pool.connect();

    try {
      let querySet = '';

      if (paymentFields.idBank) {
        querySet += `id_bancos = ${paymentFields.idBank},`;
      }

      if (paymentFields.idBankForPayment) {
        querySet += `id_banpag = ${paymentFields.idBankForPayment},`;
      }

      if (paymentFields.banckAccountNumber) {
        querySet += `nu_ctaban = '${paymentFields.banckAccountNumber}',`;
      }

      if (paymentFields.interbankAccountNumber) {
        querySet += `nu_ctacci = '${paymentFields.interbankAccountNumber}',`;
      }

      if (querySet.length > 0) {
        await client.query('BEGIN');

        const queryUpdate = `
                    update pagos.tbdetabo set
                        ${querySet.substring(0, querySet.length - 1)}
                    where id_pagtes = ${id}
                `;
        console.log('update: ', queryUpdate);
        await client.query(queryUpdate);
        await client.query('COMMIT');
      }
    } catch (error: any) {
      throw new Error(error);
    } finally {
      client.release();
    }
  }

  delete(id: number): Promise<void> {
    throw new Error('No es posible eliminar Pagos');
  }
}
