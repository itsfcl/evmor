
class Transaction {
    constructor(
        public to: string,
        public from: string,
        // TODO : add support for BLS
        public v: string,
        public r: string,
        public s: string,
        public data: string,
        public value: string,
        public nonce: number,
        public gasLimit: number,
        public maxFeePerGas: number,
        public hash: string
    ) {}
}