
export class Payment {
    private readonly idPayment: number;
    private readonly paymentDate: Date;
    private readonly referenceCode: string;
    private readonly paymentAmount: number;
    private readonly idcurrencyType: string;
    private readonly paymentType: number;
    private readonly idPaymentCategory: number;
    private readonly exchangeRate: number;
    private readonly idPaymentSubcategory: number;

    constructor(
        idPayment: number,
        paymentDate: Date,
        referenceCode: string,
        paymentAmount: number,
        idcurrencyType: string,
        paymentType: number,
        idPaymentCategory: number,
        exchangeRate: number,
        idPaymentSubcategory: number
    ){
        this.idPayment = idPayment;
        this.paymentDate = paymentDate;
        this.referenceCode = referenceCode;
        this.paymentAmount = paymentAmount;
        this.idcurrencyType = idcurrencyType;
        this.paymentType = paymentType;
        this.idPaymentCategory = idPaymentCategory;
        this.exchangeRate = exchangeRate;
        this.idPaymentSubcategory = idPaymentSubcategory;
    }

}
