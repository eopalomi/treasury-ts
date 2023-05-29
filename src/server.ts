import express from 'express';
import { paymentOrderAdapter } from './payment-order/infrastructure/adapters/payment-order.adapter';
import { paymentAdapter } from './payment/infrastructure/adapters/payment.adapter';
import dotenv from 'dotenv';

const app = express();
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const port = process.env.PORT || '2121';

app.use(express.json());

// Adaptadores de Express
paymentOrderAdapter(app);
paymentAdapter(app);

app.listen(port, () => {
  console.log(
    'Servidor corriendo en el puerto ' +
    port +
    ' en el ambiente de ' +
    process.env.ENVIRONMENT
  );
});

export const testServer = () => {
  const app = express();
  app.use(express.json());

  paymentOrderAdapter(app);
  paymentAdapter(app);

};