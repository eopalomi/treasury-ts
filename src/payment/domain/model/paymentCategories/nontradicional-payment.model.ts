import { PaymentDetail } from '../payment-detail.model';
import { Payment } from '../payment.model';

export class NonTradicionalPayment extends Payment {
  private readonly expedientNumber: number | null;
  private readonly creditActivationDate: Date | null;
  private readonly customerName: string;

  constructor(constructorNonTradicionalPayment: {
    paymentDate: string;
    referenceCode: string;
    paymentAmount: number;
    idcurrencyType: number;
    paymentType: number;
    idPaymentCategory: number;
    exchangeRate: number;
    idPaymentSubcategory: number;
    expedientNumber: number | null;
    creditActivationDate: Date | null;
    customerName: string;
    paymentDetail: PaymentDetail[];
  }) {
    super(
      constructorNonTradicionalPayment.paymentDate,
      constructorNonTradicionalPayment.referenceCode,
      constructorNonTradicionalPayment.paymentAmount,
      constructorNonTradicionalPayment.idcurrencyType,
      constructorNonTradicionalPayment.paymentType,
      constructorNonTradicionalPayment.idPaymentCategory,
      constructorNonTradicionalPayment.exchangeRate,
      constructorNonTradicionalPayment.idPaymentSubcategory,
      constructorNonTradicionalPayment.paymentDetail
    );

    this.expedientNumber = constructorNonTradicionalPayment.expedientNumber;
    this.creditActivationDate =
      constructorNonTradicionalPayment.creditActivationDate;
    this.customerName = constructorNonTradicionalPayment.customerName;

    this.validate();
  }

  validate(): void {
    const regexValidaLetraNumeros = /^[a-zA-Z0-9\s]+$/;

    if (
      this.expedientNumber !== null &&
      this.expedientNumber?.toString()?.length !== 6
    ) {
      throw new Error(
        'Cantidad de Digitos del expediente no puede ser diferente de 6'
      );
    }

    if (this.customerName?.length > 45) {
      throw new Error('El nombre del cliente no puede tener mas 45 caracteres');
    }

    if (!regexValidaLetraNumeros.test(this.customerName)) {
      throw new Error(
        'El nombre del cliente solo puede contener letras y numeros'
      );
    }
  }
}
