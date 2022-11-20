import * as crypto from "crypto";

const hash = (message: string) => crypto.createHash("BLAKE2s256").update(message).digest("hex");
const zhash = hash("0");

class Merkle {
    // TODO : optimization
    zhash = hash("0");
    public static generateHashSet(data: Object[]) {
        let hashset: string[][] = []; 
        let l = 0;
        hashset[0] = data.map(e => hash(Serialize.serializeObject(e)));
        while (hashset[l].length>1) {
            if (hashset[l].length%2===1) hashset[l].push(zhash);
            for (let i = 0; i<hashset[l].length; i+=2) {
                if (parseInt(hashset[l][i+1], 16) > parseInt(hashset[l][i], 16)) {
                    hashset[l+1].push(hash(hashset[l][i+1] + hashset[l][i]));
                } else {
                    hashset[l+1].push(hash(hashset[l][i] + hashset[l][i+1]));
                }
            }
            l+=1;
        }
        return hashset;
    }

    public static verify(data: string[], root: string, chunk: Object) {
        let sh = hash(Serialize.serializeObject(chunk));
        for (let i of data) {
            if (parseInt(sh, 16) > parseInt(i, 16)) {
                sh = hash(sh + i)
            } else {
                sh = hash(i + sh);
            }
        }
        return root === sh;
    }
}