

class RollupBlock {
    constructor(
        public claimedStateRoot: string,
        public claimedTx: Transaction[],
        public parent: RollupBlock,
        public gasLimit: string,
        public gasUsed: string,
        public hash: string
    ) {}
}