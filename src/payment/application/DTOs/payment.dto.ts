export interface UpdatePaymentDTO {
    idBank: number,
    banckAccountNumber: string,
    interbankAccountNumber: string,
    idBankForPayment: number
};

export interface NonTraditionalPaymentDTO {
    paymentDate: string,
    referenceCode: string,
    paymentAmount: number,
    idcurrencyType: number,
    idPaymentCategory: number,
    idPaymentSubcategory: number,
    paymentType: number,
    exchangeRate: number,
    expedientNumber: number | null,
    creditActivationDate: Date | null,
    customerName: string,
    paymentDetail: PaymentDetail[]
};

interface PaymentDetail {
    paymentDetailDate: string,
    idBank: number,
    banckAccountNumber: string,
    interbankAccountNumber: string | null,
    paymentAmmount: number,
    beneficiaryName: string,
    beneficiaryIdentificationDocument: string,
    paymentDetails: string | null,
    idPaymentStatus: number,
    idPaymenOrder: number,
    idBankForPayment: number,
    accountingEntryNumber: number
};
