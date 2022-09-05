export class CartaoCredito {
    id?: string;
    titular: string;
    numeroCartao: string;
    dataExpiracao: string;
    cvv: number;
    dataCriacao: Date;
    dataAtualizacao: Date;

    constructor(titular: string, numeroCartao: string, dataExpiracao: string, cvv: number) {
        this.titular = titular;
        this.numeroCartao = numeroCartao;
        this.dataExpiracao = dataExpiracao;
        this.cvv = cvv;
        this.dataCriacao = new Date();
        this.dataAtualizacao = new Date()
    }
}
