import { PaymentOrder } from '../../domain/models/payment-order.model';
import { PaymentOrderRepository } from '../../domain/repositories/payment-order.repository';

interface CreateOrdenPagoParams {
  paymentAmount: number;
  idPaymentStatus: number;
  idPaymentType: number;
  idPaymentMethod: number;
  idBankAccount: number;
  idUser: number;
  idTypeCurrency: string;
  paymentDate: Date;
  transacctionCode: string;
  accountantNumber: number;
  accountantDate: Date;
}

export class CreatePaymentOrderUseCase {
  constructor(
    private readonly paymentOrderRepository: PaymentOrderRepository
  ) {}

  public execute = async (params: CreateOrdenPagoParams): Promise<void> => {
    const {
      paymentAmount,
      idPaymentStatus,
      idPaymentType,
      idPaymentMethod,
      idBankAccount,
      idUser,
      idTypeCurrency,
      paymentDate,
      transacctionCode,
      accountantNumber,
      accountantDate
    } = params;

    const ordenPago = new PaymentOrder(
      paymentAmount,
      idPaymentStatus,
      idPaymentType,
      idPaymentMethod,
      idBankAccount,
      idUser,
      idTypeCurrency,
      paymentDate,
      transacctionCode,
      accountantNumber,
      accountantDate
    );

    this.paymentOrderRepository.create(ordenPago);
  };
}
