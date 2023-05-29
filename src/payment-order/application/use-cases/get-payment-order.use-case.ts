import { PaymentOrderRepository } from '../../domain/repositories/payment-order.repository';

interface PaymentOrderDTO {
  paymentAmount: number;
  idPaymentStatus: number;
  idPaymentType: number;
  idPaymentMethod: number;
  idPaymentBank: number;
  idUser: number;
  idTypeCurrency: string;
  paymentDate: string;
  transacctionCode: string;
  accountantNumber: number;
  accountantDate: string;
}

export class GetPaymentOrderUseCase {
  constructor(
    private readonly paymentOrderRepository: PaymentOrderRepository
  ) {}

  public getPaymentOrder = async (
    idPaymentOrder: number
  ): Promise<PaymentOrderDTO | null> => {
    const findPaymentOrder = await this.paymentOrderRepository.findById(
      idPaymentOrder
    );

    if (findPaymentOrder) {
      const paymentOrder: PaymentOrderDTO = {
        paymentAmount: findPaymentOrder._paymentAmount,
        idPaymentStatus: findPaymentOrder._idPaymentStatus,
        idPaymentType: findPaymentOrder._idPaymentType,
        idPaymentMethod: findPaymentOrder._idPaymentMethod,
        idPaymentBank: findPaymentOrder._idPaymentBank,
        idUser: findPaymentOrder._idUser,
        idTypeCurrency: findPaymentOrder._idTypeCurrency,
        paymentDate: String(findPaymentOrder._paymentDate),
        transacctionCode: findPaymentOrder._transacctionCode,
        accountantNumber: findPaymentOrder._accountantNumber,
        accountantDate: String(findPaymentOrder._accountantDate)
      };

      return paymentOrder;
    }

    return null;
  };
}
