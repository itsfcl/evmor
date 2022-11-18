function pad(e: string) {
    if (e.length % 2 != 0) return "0"+e;
    return e;
}
class Serialize {
    /**
     * Serialization format :
     * Knockoff of ASN.1
     * For objects:
     * [length of following bytes - 1 byte] [following field bytes - <256 bytes]
     * Doesn't support array type (yet)
     */
    public static serializeObject(tx: Object) {
        let out = "";
        Object.values(tx).map(e => {
            const paddedData = pad(e.toString(16));
            out+=pad((paddedData.length/2).toString(16))+paddedData;
        });
        return out;
    }
    /**
     * Pass any valid serialization string
     * Will return an array of props, do not use it directly to pass transactions/other primitives
     */
    public static deserializeString(str: string) {
        let o: number[] = [];
        let pt = str;
        while (pt!=="") {
            let l = parseInt(pt.slice(0,2),16);
            pt = pt.slice(2);
            o.push(parseInt(pt.slice(0,l*2),16));
            pt = pt.slice(l*2);
        }
    }
}