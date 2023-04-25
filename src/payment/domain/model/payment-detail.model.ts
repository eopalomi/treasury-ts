import { error } from "console";

export class PaymentDetail {
    public readonly paymentDetailDate: string;
    public readonly idBank: number;
    public readonly banckAccountNumber: number;
    public readonly interbankAccountNumber: string;
    public readonly paymentAmmount: number;
    public readonly beneficiaryName: string;
    public readonly beneficiaryIdentificationDocument: string;
    public readonly paymentDetails: string;
    public readonly idPaymentStatus: number;
    public readonly idPaymenOrder: number;
    public readonly idBankForPayment: number;
    public readonly accountingEntryNumber: number;

    constructor(
        idBank: number,
        banckAccountNumber: number,
        interbankAccountNumber: string,
        paymentAmmount: number,
        beneficiaryName: string,
        beneficiaryIdentificationDocument: string,
        paymentDetails: string,
        idPaymentStatus: number,
        idPaymenOrder: number,
        idBankForPayment: number,
        accountingEntryNumber: number
    ) {
        this.idBank = idBank;
        this.banckAccountNumber = banckAccountNumber;
        this.interbankAccountNumber = interbankAccountNumber;
        this.paymentAmmount = paymentAmmount;
        this.beneficiaryName = beneficiaryName;
        this.beneficiaryIdentificationDocument = beneficiaryIdentificationDocument;
        this.paymentDetails = paymentDetails;
        this.idPaymentStatus = idPaymentStatus;
        this.idPaymenOrder = idPaymenOrder;
        this.idBankForPayment = idBankForPayment;
        this.accountingEntryNumber = accountingEntryNumber;
        
        this.paymentDetailDate = new Date().toISOString().slice(0, 10);
        this.validate();
    }

    validate(){
        const regex: RegExp = /^[0-9]+$/;

        if (!regex.test(this.beneficiaryIdentificationDocument)){
            throw new Error('El documento solo puede contener numeros');
        };

        if (![1,2,3,4].includes(this.idPaymentStatus)){
            throw new Error('El estado del pago solo puede ser: 1=Pendiente 2=Completado 3=Anulado 4=Por Confirmar')
        };

        if (String(this.interbankAccountNumber).length !== 20){
            throw new Error('El numero de la cuenta interbancaria debe tener 20 digitos');
        };

        if (![1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25].includes(this.idBank)){
            throw new Error(` El codigo de banco solo puede ser:
                1  = SCOTIABANK PERU SAA
                2  = BBVA BANCO CONTINENTAL
                3  = BCP BANCO DE CRÉDITO DEL PERÚ
                4  = INTERBANK
                5  = BANCO INTERAMERICANO DE FINANZAS
                6  = BANCO DE LA NACIÓN
                7  = CMAC MAYNAS SA
                8  = CAJA 8 (C8)
                9  = CRAC CHAVIN SA
                10 = COOPERATIVA PACIFICO
                11 = BANCO FINANCIERO DEL PERU
                12 = HSBC BANK PERU SA
                13 = CAJA PIURA
                14 = CAJA HUANCAYO
                15 = FALABELLA
                16 = MI BANCO
                17 = COOPERATIVA ABACO
                18 = CRAC NUESTRA GENTE SAA
                19 = CAJA ICA
                20 = CAJA SULLANA
                21 = CAJA TRUJILLO
                22 = WESTER UNION
                23 = BANCO SANTANDER
                24 = CAJA SIPAN
                25 = SUNAT
            `);
        };

        if (![1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25].includes(this.idBankForPayment)){
            throw new Error(` El codigo de banco para realizar el pago solo puede ser:
                1  = SCOTIABANK PERU SAA
                2  = BBVA BANCO CONTINENTAL
                3  = BCP BANCO DE CRÉDITO DEL PERÚ
                4  = INTERBANK
                5  = BANCO INTERAMERICANO DE FINANZAS
                6  = BANCO DE LA NACIÓN
                7  = CMAC MAYNAS SA
                8  = CAJA 8 (C8)
                9  = CRAC CHAVIN SA
                10 = COOPERATIVA PACIFICO
                11 = BANCO FINANCIERO DEL PERU
                12 = HSBC BANK PERU SA
                13 = CAJA PIURA
                14 = CAJA HUANCAYO
                15 = FALABELLA
                16 = MI BANCO
                17 = COOPERATIVA ABACO
                18 = CRAC NUESTRA GENTE SAA
                19 = CAJA ICA
                20 = CAJA SULLANA
                21 = CAJA TRUJILLO
                22 = WESTER UNION
                23 = BANCO SANTANDER
                24 = CAJA SIPAN
                25 = SUNAT
            `);
        };
    };
};