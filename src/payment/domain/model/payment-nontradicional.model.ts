import { PaymentDetail } from "./payment-detail.model";
import { Payment } from "./payment.model";

export class NonTradicionalPayment extends Payment {

    private readonly expedientNumber: number;
    private readonly creditActivationDate: Date;
    private readonly customerName: string;

    constructor(
        paymentDate: Date,
        referenceCode: string,
        paymentAmount: number,
        idcurrencyType: number,
        paymentType: number,
        idPaymentCategory: number,
        exchangeRate: number,
        idPaymentSubcategory: number,
        expedientNumber: number,
        creditActivationDate: Date,
        customerName: string,
        paymentDetail: PaymentDetail[]
    ){
        super(
            paymentDate,
            referenceCode,
            paymentAmount,
            idcurrencyType,
            paymentType,
            idPaymentCategory,
            exchangeRate,
            idPaymentSubcategory,
            paymentDetail
        );

        this.expedientNumber = expedientNumber;
        this.creditActivationDate = creditActivationDate;
        this.customerName = customerName;

        this.validate();
    }

    validate(): void {
        if (this.idFile.toString().length != 6){
            throw new Error('Cantidad de Digitos del expediente no puede ser diferente de 6')
        }
    }

}