import {NetCore} from "./networking/netcore";
class GenericNode {
    public netmodule: NetCore;
    constructor(
        public port: number
    ) {
        this.netmodule = new NetCore();
        this.launch
    }
    public launch() {
        // TODO : Add the catch and have proper serialization
        this.netmodule.launch(this.port, (msg: string) => {

        });
    }
    public propagate(tx: Transaction) {
        this.netmodule.message(Serialize.serializeObject(tx));
    }
}