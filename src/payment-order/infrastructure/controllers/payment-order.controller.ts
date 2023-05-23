import { Response, Request } from 'express';
import { CreatePaymentOrderUseCase } from '../../application/use-cases/create-payment-order.use-case';
import { GetPaymentOrderUseCase } from '../../application/use-cases/get-payment-order.use-case';

export class PaymentOrderController {
  constructor(
    private createPaymentOrderUseCase: CreatePaymentOrderUseCase,
    private getPaymentOrderUseCase: GetPaymentOrderUseCase
  ) {
    this.createPaymentOrder = this.createPaymentOrder.bind(this);
    this.finPaymentOrder = this.finPaymentOrder.bind(this);
  }

  public async createPaymentOrder(
    { body }: Request,
    res: Response
  ): Promise<void> {
    try {
      const paymentOrder = await this.createPaymentOrderUseCase.execute({
        paymentAmount: body.paymentAmount,
        idPaymentStatus: body.idPaymentStatus,
        idPaymentType: body.idPaymentType,
        idPaymentMethod: body.idPaymentMethod,
        idBankAccount: body.idBankAccount,
        idUser: body.idUser,
        idTypeCurrency: body.idTypeCurrency,
        paymentDate: body.paymentDate,
        transacctionCode: body.transacctionCode,
        accountantNumber: body.accountantNumber,
        accountantDate: body.accountantDate
      });

      res.status(200).json({
        responseCode: '00',
        message: 'Orden Pago Creada',
        data: paymentOrder
      });
    } catch (error) {
      res.status(400).json({
        responseCode: '01',
        message: (error as Error).message,
        stack: (error as Error).stack
      });
    }
  }

  public async finPaymentOrder(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    console.log('req.params', req.params);

    try {
      const paymentOrder = await this.getPaymentOrderUseCase.getPaymentOrder(
        parseInt(id)
      );
      console.log('payment', paymentOrder);

      if (!paymentOrder) {
        res.status(404).json({
          responseCode: '00',
          message: 'Orden de pago no encontrada',
          data: paymentOrder
        });
      } else {
        res.status(200).json({
          responseCode: '00',
          message: 'Orden de Pago encontrada',
          data: paymentOrder
        });
      }
    } catch (e) {
      res.status(400).json({
        responseCode: '01',
        message: (e as Error).message,
        stack: (e as Error).stack
      });
    }
  }
}
