
interface CreateOrdenPagoParams {
    paymentAmount: number,
    idPaymentStatus: number,
    idPaymentType: number,
    idPaymentMethod: number,
    idBankAccount: number,
    idUser: number,
    idTypeCurrency: string,
    paymentDate: Date,
    transacctionCode: string,
    accountantNumber: number,
    accountantDate: Date
}


export class UpdatePaymentOrder {


}