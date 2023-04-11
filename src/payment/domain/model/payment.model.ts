
export class Payment {
    public readonly paymentDate: Date;
    public readonly referenceCode: string;
    public readonly paymentAmount: number;
    public readonly idcurrencyType: number;
    public readonly paymentType: number;
    public readonly idPaymentCategory: number;
    public readonly exchangeRate: number;
    public readonly idPaymentSubcategory: number;

    constructor(
        paymentDate: Date,
        referenceCode: string,
        paymentAmount: number,
        idcurrencyType: number,
        paymentType: number,
        idPaymentCategory: number,
        exchangeRate: number,
        idPaymentSubcategory: number
    ) {
        this.paymentDate = paymentDate;
        this.referenceCode = referenceCode;
        this.paymentAmount = paymentAmount;
        this.idcurrencyType = idcurrencyType;
        this.paymentType = paymentType;
        this.idPaymentCategory = idPaymentCategory;
        this.exchangeRate = exchangeRate;
        this.idPaymentSubcategory = idPaymentSubcategory;
    }

    validateidcurrencyType(): boolean {
        const currencyTypes = [1, 2];

        return currencyTypes.includes(this.idcurrencyType);
    }
}
