// Will be used when result are predictable in the pools or return results
import UniversalHandler, { redirect, wrapMeta } from "../Handlers/UniversalHandler";
import UUIDMap from "../Utils/UUIDMap";
import TypeDetector from "./TypeDetector.ts";
import {$data} from "../Instruction/InstructionType.ts"

//
export default class PreCoding {
    encoder = new Map<string, any>();
    decoder = new Map<string, any>();
    memoryPool = new UUIDMap();
    handler: UniversalHandler = new UniversalHandler();
    typeDetector = new TypeDetector();

    //
    constructor(memoryPool = new UUIDMap()) {
        this.memoryPool = memoryPool;
        this.encoder = new Map<string, any>([
            ["array", (organic, target, transfer = [])=>{
                const encoded = Array.from(target).map((e)=>this.encode(e, transfer));
                return (encoded.some((e)=>e instanceof Promise || typeof e?.then == "function")) ? Promise.all(encoded) : encoded;
            }],

            //
            ["transfer", (organic, target: any, transfer: any[] = [])=>{
                if (transfer.indexOf(target) < 0) { transfer.push(target); };
                return target;
            }],

            //
            ["reference", (organic, target, transfer = [])=>{
                if (organic) {
                    return redirect(target);
                } else {
                    // make as temporary reference for usage
                    return {
                        "@type": "reference",
                        "@uuid": this.memoryPool.add(target)
                    };
                }
            }]
        ]);

        //
        this.decoder = new Map<string, any>([
            ["array", (organic, target, transfer = [])=>{
                const isPromised = (target.some((e)=>e instanceof Promise || typeof e?.then == "function"));
                const encoded = Array.from(target).map((e)=>this.decode(e, transfer));
                return isPromised ? Promise.all(encoded) : encoded;
            }],

            //
            ["reference", (organic, target, transfer = [])=>{
                if (organic) {
                    const exists = this?.memoryPool?.get(target?.["@uuid"] ?? target?.[$data]?.["@uuid"]);
                    return exists ?? wrapMeta(target, this.handler);
                }
                // unusual
                return target;
            }]
        ]);
    }



    //
    $decode(target, transfer: any[] = []) {
        const [t, o] = this.typeDetector.detectType(target, transfer);
        if (this.decoder.has(t)) {
            return this.decoder.get(t)?.(o, target, transfer);
        }
        return target;
    }

    //
    $encode(target, transfer: any[] = []) {
        const [t, o] = this.typeDetector.detectType(target, transfer);
        if (this.encoder.has(t)) {
            return this.encoder.get(t)?.(o, target, transfer);
        }
        return target;
    }



    //
    decode(target, transfer: any[] = []) {
        if (target instanceof Promise || typeof target?.then == "function") {
            return target?.then((e)=>this.$decode(target, transfer));
        }
        return this.$decode(target, transfer);
    }

    //
    encode(target, transfer: any[] = []) {
        if (target instanceof Promise || typeof target?.then == "function") {
            return target?.then((e)=>this.$encode(target, transfer));
        }
        return this.$encode(target, transfer);
    }
}
