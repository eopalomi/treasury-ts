import request from 'supertest';

import express from 'express';
import dotenv from 'dotenv';
import { paymentOrderAdapter } from '../payment-order/infrastructure/adapters/payment-order.adapter';
import { paymentAdapter } from '../payment/infrastructure/adapters/payment.adapter';

const app = express();
app.use(express.json());

dotenv.config({ path: `.env.local` });
paymentOrderAdapter(app);
paymentAdapter(app);

describe('Test Payment', () => {
    test('GET endpoint /treasury/v1/payment/:id', async () => {
        const getPayment = await request(app).get("/treasury/v1/payment/137492").send();
        expect(getPayment.statusCode).toBe(200);
        expect(getPayment.body.result.paymentDetail.length).toBeGreaterThan(0);
    });

    test('PATCH endpoint /treasury/v1/payment/:id', async () => {
        const body = {
            idBank: 1,
            banckAccountNumber: "023123123123",
            interbankAccountNumber: "00332132132115245878",
            idBankForPayment: 13
        };

        const getPayment = await request(app)
            .patch("/treasury/v1/payment/137492")
            .send(body);

        expect(getPayment.statusCode).toBe(200);
        expect(getPayment.body.status).toEqual('00');
    });
});

describe('Test Payment Order', () => {
    test('GET endpoint /treasury/v1/payment-order/:id', async () => {
        const getPayment = await request(app).get("/treasury/v1/payment-order/1269").send();
        expect(getPayment.statusCode).toBe(200);
        expect(getPayment.body.data).toBeDefined();
    });
});