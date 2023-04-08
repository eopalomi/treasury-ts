
export class OrdenPago {
    public readonly _id: number;
    public readonly _dateRegist: Date;
    public readonly _paymentAmount: number;
    public readonly _idPaymentStatus: number;
    public readonly _idPaymentType: number;
    public readonly _idBankAccount: number;
    public readonly _idUser: number;
    public readonly _idTypeCurrency: string;
    public readonly _paymentDate: Date;
    public readonly _transacctionCode: string;
    public readonly _accountantNumber: number;
    public readonly _accountantDate: Date;

    constructor(
        _id: number,
        _dateRegist: Date,
        _paymentAmount: number,
        _idPaymentStatus: number,
        _idPaymentType: number,
        _idBankAccount: number,
        _idUser: number,
        _idTypeCurrency: string,
        _paymentDate: Date,
        _transacctionCode: string,
        _accountantNumber: number,
        _accountantDate: Date
    ) {
        this._id = _id;
        this._dateRegist = _dateRegist;
        this._paymentAmount = _paymentAmount;
        this._idPaymentStatus = _idPaymentStatus;
        this._idPaymentType = _idPaymentType;
        this._idBankAccount = _idBankAccount;
        this._idUser = _idUser;
        this._idTypeCurrency = _idTypeCurrency;
        this._paymentDate = _paymentDate;
        this._transacctionCode = _transacctionCode;
        this._accountantNumber = _accountantNumber;
        this._accountantDate = _accountantDate;
    };

}