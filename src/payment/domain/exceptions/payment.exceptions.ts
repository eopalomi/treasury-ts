type PaymentErrorTypes =
  | 'currencyType'
  | 'amountGreaterThanZero'
  | 'categoryID'
  | 'subCategoryID'
  | 'paymentType'
  | 'onlyAlphanumericReference'
  | 'emptyPaymentDetail'
  | 'equalPayments'
  | 'numbersOnlyBeneficiaryDocument'
  | 'paymentStatusID'
  | 'lengthInterbankAccountNumber'
  | 'bankID'
  | 'bankForPaymentID';

const exceptionsFactory = ()=>{
  return class customExceptionsFactory extends Error {
    public readonly errorType: PaymentErrorTypes;
  
    constructor(errorType: PaymentErrorTypes, message: string) {
      super(message);
  
      this.errorType = errorType;
    }
  }
};

export const paymentExceptions = exceptionsFactory();
export const PaymentDetailExceptions = exceptionsFactory();