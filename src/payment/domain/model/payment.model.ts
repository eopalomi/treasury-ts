import { error } from "console";
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

    private totalAmountPayment: number = 0;
    
    constructor (
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
        
        this.validateProperties();
        this.validateAmount();
    }

    abstract validate(): void;

    validateProperties(): void {
        const regex: RegExp = /^[a-zA-Z0-9]+$/;

        if (![1, 2].includes(this.idcurrencyType)){
            throw new Error('Tipo de moneda no valida');
        };

        if (this.paymentAmount <= 0){
            throw new Error('Monto a pagar no puede ser menor a cero')
        }

        if (![1,3,4,2,5,10].includes(this.idPaymentCategory)){
            throw new Error( `La categoria del pago(paymentType) solo puede ser: 
                1  = PROVEDORES
                3  = ENTREGAS A RENDIR
                4  = OBLIGACIONES FINANCIERAS
                2  = NO TRADICIONALES
                5  = BIM
                10 = OTRAS OPERACIONES
            `)
        }

        if (![1,5,6,2,3,7,4,8,11,12,10,9,23,24].includes(this.idPaymentSubcategory)){
            throw new Error( `La subcategoria (idPaymentSubcategory) solo puede ser: 
                1  = CONCESIONARIOS
                5  = CONVERSIONES
                6  = SETAMEN SETACA
                2  = SOAT
                3  = GPS
                7  = ULTRASEAL
                4  = LIBRE DISPONIBILIDAD
                8  = ENTREGA A CLIENTES
                11 = MOTOS
                12 = BIM MOVIMIENTOS
                10 = MOTOTAXI - MOTOFURGON
                9  = EQUIPOS
                23 = TALLER
                24 = ALFIN
                13 = TRANSFERENCIAS ENTRE CUENTAS BANCARIAS DE EDPYME ACCESO CREDITICIO - MISMA MONEDA
                14 = TRANSFERENCIAS ENTRE CUENTAS BANCARIAS DE EDPYME ACCESO CREDITICIO - DISTINTA MONEDA
                15 = TRANSACCIONES DE BIM - CUENTA BANCARIA CUSTODIA Y OTRAS ENTIDADES DEL SECTOR FINANCIERO
                16 = REGULARIZACION TRANSACCIONAL
                17 = REGULARIZACION CONTABLE
                18 = REGISTRO DE CARGOS
                19 = REGISTRO DE ABONOS
                20 = REGISTRO DE ITF
                21 = GANANCIA POR DIFERENCIA DE CAMBIO
                22 = PERDIDA POR DIFERENCIA DE CAMBIO
            `);
        };

        if (![1,2,3,4,5,6,7,8,9,11,12,13,14,15,17,22,24,25,27,28,29,30,31,32,34,35,36,37,39,41,42,44,46,47,48,49,50,51,52].includes(this.paymentType)){
            throw new Error( `La categoria del pago(paymentType) solo puede ser: 
                1  = OLX
                2  = Libre Disponibilidad FR
                3  = Provedores
                4  = Entrega a rendir
                5  = Obligaciones Financieras
                6  = UltraSeal
                7  = Libre Disponibilidad FR Retanqueo
                8  = LD Consumo
                9  = Libre Disponibilidad FAE
                11 = Libre Disponibilidad POS
                12 = POS
                13 = Libre Disponibilidad Palanca
                14 = Libre Disponibilidad Conversiones
                15 = Libre Disponibilidad Digital Moto
                17 = Mototaxi
                22 = Libre Disponibilidad Siembra
                24 = Siembra POS
                25 = Siembra Palanca
                27 = LD Contigo
                28 = LD Compra de Deuda
                29 = LD Rapicash
                30 = LD Bancarizado
                31 = Motofurgon
                32 = Entrega Rendir - Devolucion
                34 = Libre Disponibilidad Izipay
                35 = Motos No Bancarizado
                36 = Libre Disponibilidad POS
                37 = Libre Disponibilidad Celulares
                39 = Vende Mas
                41 = Seminuevo
                42 = Motos
                44 = Linea de Ayuda
                46 = Vehicular
                47 = GPS
                48 = GM
                49 = Seguro Vida Crecer
                50 = Seguro Todo Riesgo
                51 = LD sin FR
                52 = LD sin FR Siembra
            `);
        };

        if (regex.test(this.referenceCode)){
            throw new Error('la referencia solo puede contener letras y numeros')
        };

        if (this.paymentDetail.length === 0){
            throw new Error('Tiene que agregar al menos un detalle del pago')
        };
    }

    validateAmount(){
        this.paymentDetail.forEach(detail => {
            this.totalAmountPayment += detail.paymentAmmount;
        });

        if (this.totalAmountPayment !== this.paymentAmount){
            throw new Error('El monto del pago en el detalle no es igual al monto total')
        };
    }
}
