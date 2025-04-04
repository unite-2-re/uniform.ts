// deno-lint-ignore-file no-explicit-any
import { isSymbol, FORBIDDEN_KEYS, META_KEYS } from "../Utils/Useful";
import { extract } from "../Utils/InstructionType";
import ORG from "../Utils/OrganicType";

//
import DataHandler from "./DataHandler";

//
export default class RemoteReferenceHandler extends DataHandler {
    #exChanger: any|null;

    //
    constructor(exChanger: any|null){
        super();
        this.#exChanger = exChanger;
    }

    //
    get /*@__MANGLE_PROP__*/ $exc() { return this.#exChanger; }

    //
    /*@__MANGLE_PROP__*/ $data(t: unknown) { return extract(t) ?? t; }
    /*@__MANGLE_PROP__*/ $hnd(cmd: string, meta: unknown, ...args: unknown[]) {
        const data: any = this.$data(meta);

        // return meta as is
        if (cmd == "get") { // any remote is disposable
            if (args[0] == ORG.dispose) { return ()=>{ return this.#exChanger?.$request("dispose", meta, []); }; };
            if (args[0] == ORG.data) { return data; };
            if (args[0] == ORG.exc) { return this.$exc ?? data?.[ORG.exc] ?? data?.then?.((e: any)=>e?.[ORG.exc]) ?? null; };
            if ( // forbidden actions
                isSymbol(args?.[0]) ||
                FORBIDDEN_KEYS.has(args?.[0] as string) ||
                META_KEYS.has?.(args?.[0] as any)
            ) { return null; };
        }

        /*@__MANGLE_PROP__*/
        return this.#exChanger?.$request(cmd, meta, args);
    }

    //
    /*@__MANGLE_PROP__*/ $get(_: unknown|string|null): any { return null; };
}
