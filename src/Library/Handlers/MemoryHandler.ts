// deno-lint-ignore-file no-explicit-any
import UUIDMap from "../Utils/UUIDMap.ts";
import { ORG }  from "../Utils/OrganicType.ts";
import { extract } from "../Utils/InstructionType.ts";

//
import DataHandler from "./DataHandler.ts";

//
export default class ObjectPoolMemberHandler extends DataHandler {
    #memoryPool: UUIDMap | null;

    //
    constructor(memoryPool: UUIDMap | null = new UUIDMap()){
        super();
        this.#memoryPool = memoryPool;
    }

    // there is may not be meta object
    $data(t: unknown|string|null): any {
        return super.$data((()=>{
            const wrap = (extract(t) ?? t) as any;
            const uuid = (wrap as any)?.[ORG.uuid] ?? wrap ?? t;
            if (typeof uuid == "string") {
                return this.#memoryPool?.get(uuid) ?? t;
            }
            return t;
        })());
    }

    //
    $get(t: unknown|string|null): any {
        const wrap = (extract(t) ?? t) as any;
        const uuid = ((wrap as any)?.[ORG.uuid] ?? wrap) as string ?? t;
        if (typeof uuid == "string") {
            return this.#memoryPool?.get(uuid);
        }
        return null;
    };
}