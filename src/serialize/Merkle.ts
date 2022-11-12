import * as crypto from "crypto";

const hash = (message: string) => crypto.createHash("BLAKE2s256").update(message).digest("hex");
const zhash = hash("0");

class Merkle {
    // TODO : optimization
    zhash = hash("0");
    public static generateHashSet<T>(data: T[]) {
        let hashset: string[][] = []; 
        let l = 0;
        // TODO : better serialization
        hashset[0] = data.map(e => hash(JSON.stringify(e)));
        while (hashset[l].length>1) {
            if (hashset[l].length%2===1) hashset[l].push(zhash);
            for (let i = 0; i<hashset[l].length; i+=2) {
                if (parseInt(hashset[l][i+1], 16) > parseInt(hashset[l][i], 16)) {
                    hashset[l+1].push(hash(hashset[l][i+1] + hashset[l][i]));
                } else {
                    hashset[l+1].push(hash(hashset[l][i] + hashset[l][i+1]));
                }
            }
        }
        return hashset;
    }
}