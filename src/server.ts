import express from 'express';
import { paymentOrderAdapter } from './payment-order/infrastructure/adapters/payment-order.adapter';

const app = express();

const port = process.env.PORT || '2121';

// Adaptadores de Express
paymentOrderAdapter(app);

app.listen(port, ()=>{
    console.log('Servidor corriendo en el puerto ' + port)
});