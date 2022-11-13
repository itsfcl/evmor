
class SequencerBeaconHeader {
    constructor(
        public height: number,
        public hash: string,
        public gasUsed: string,
        public gasLimit: string
    ) {}
}

class SequencerBeaconBlock {
    constructor(
        // State Root is stored in block not header for PBS purposes
        public stateRoot: string,
        public txRoot: string,
        // Only this is submitted to L1
        public tx: Transaction[],
        public header: SequencerBeaconHeader
        // TODO : BLS support
    ) {}
}