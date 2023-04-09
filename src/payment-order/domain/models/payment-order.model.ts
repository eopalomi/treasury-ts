
export class PaymentOrder {
    public readonly _paymentAmount: number;
    public readonly _idPaymentStatus: number;
    public readonly _idPaymentType: number;
    public readonly _idPaymentMethod: number;
    public readonly _idPaymentBank: number;
    public readonly _idUser: number;
    public readonly _idTypeCurrency: string;
    public readonly _paymentDate: Date;
    public readonly _transacctionCode: string;
    public readonly _accountantNumber: number;
    public readonly _accountantDate: Date;

    constructor(
        _paymentAmount: number,
        _idPaymentStatus: number,
        _idPaymentType: number,
        _idPaymentMethod: number,
        _idPaymentBank: number,
        _idUser: number,
        _idTypeCurrency: string,
        _paymentDate: Date,
        _transacctionCode: string,
        _accountantNumber: number,
        _accountantDate: Date
    ) {
        this._paymentAmount = _paymentAmount;
        this._idPaymentStatus = _idPaymentStatus;
        this._idPaymentType = _idPaymentType;
        this._idPaymentMethod = _idPaymentMethod;
        this._idPaymentBank = _idPaymentBank;
        this._idUser = _idUser;
        this._idTypeCurrency = _idTypeCurrency;
        this._paymentDate = _paymentDate;
        this._transacctionCode = _transacctionCode;
        this._accountantNumber = _accountantNumber;
        this._accountantDate = _accountantDate;
    };
}