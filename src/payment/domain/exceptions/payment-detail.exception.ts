type paymentDetailExceptions =
  | 'numbersOnlyBeneficiaryDocument'
  | 'paymentStatusID'
  | 'lengthInterbankAccountNumber'
  | 'bankID'
  | 'bankForPaymentID';

export class PaymentDetailExceptions extends Error {
  public readonly errorType: paymentDetailExceptions;

  constructor(
    paymentDetailException: paymentDetailExceptions,
    message: string
  ) {
    super(message);
    this.errorType = paymentDetailException;
  }
}
