import { PaymentDetail } from "./payment-detail.model";

export abstract class Payment {

    public readonly paymentDate: Date;
    public readonly referenceCode: string;
    public readonly paymentAmount: number;
    public readonly idcurrencyType: number;
    public readonly idPaymentCategory: number;
    public readonly idPaymentSubcategory: number;
    public readonly paymentType: number;
    public readonly exchangeRate: number;
    public readonly paymentDetail: PaymentDetail[];
    
    constructor(
        paymentDate: Date,
        referenceCode: string,
        paymentAmount: number,
        idcurrencyType: number,
        paymentType: number,
        idPaymentCategory: number,
        exchangeRate: number,
        idPaymentSubcategory: number,
        paymentDetail: PaymentDetail[]
    ) {
        this.paymentDate = paymentDate;
        this.referenceCode = referenceCode;
        this.paymentAmount = paymentAmount;
        this.idcurrencyType = idcurrencyType;
        this.paymentType = paymentType;
        this.idPaymentCategory = idPaymentCategory;
        this.exchangeRate = exchangeRate;
        this.idPaymentSubcategory = idPaymentSubcategory;
        this.paymentDetail = paymentDetail;
        
        this.validatePayment();
    }

    abstract validate(): void;

    validatePayment(): void {
        const regex: RegExp = /^[0-9]+$/;

        if (![1, 2].includes(this.idcurrencyType)){
            throw new Error('Tipo de moneda no valida');
        };

        if (this.paymentAmount <= 0){
            throw new Error('Monto a pagar no puede ser menor a cero')
        }

        if (![1,3,4,2,5,10].includes(this.paymentType)){
            throw new Error('paymentType solo puede ser: 1,3,4,2,5,10')
        }
    }
}
