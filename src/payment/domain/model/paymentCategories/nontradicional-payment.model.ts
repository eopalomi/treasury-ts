import { PaymentDetail } from "../payment-detail.model";
import { Payment } from "../payment.model";

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
    ) {
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
        const regexValidaLetraNumeros = /^[a-zA-Z0-9\s]+$/;

        if (this.expedientNumber.toString().length != 6) {
            throw new Error('Cantidad de Digitos del expediente no puede ser diferente de 6')
        }

        if(this.customerName.length > 45){
            throw new Error("El nombre del cliente no puede tener mas 45 caracteres");
        }
        
        if (!regexValidaLetraNumeros.test(this.customerName)){
            throw new Error("El nombre del cliente solo puede contener letras y numeros");
        }
    }

}