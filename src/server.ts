import express from 'express';
import { paymentOrderAdapter } from './payment-order/infrastructure/adapters/payment-order.adapter';
import { paymentAdapter } from './payment/infrastructure/adapters/payment.adapter';

const app = express();

const port = process.env.PORT || '2121';

app.use(express.json());

// Adaptadores de Express
paymentOrderAdapter(app);
paymentAdapter(app);

app.listen(port, ()=>{
    console.log('Servidor corriendo en el puerto ' + port)
});