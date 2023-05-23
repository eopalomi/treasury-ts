type errorTypes =
  | 'currencyType'
  | 'amountGreaterThanZero'
  | 'categoryID'
  | 'subCategoryID'
  | 'paymentType'
  | 'onlyAlphanumericReference'
  | 'emptyPaymentDetail'
  | 'equalPayments';

export class paymentExceptions extends Error {
  public readonly errorType: errorTypes;

  constructor(errorType: errorTypes, message: string) {
    super(message);

    this.errorType = errorType;
  }
}
