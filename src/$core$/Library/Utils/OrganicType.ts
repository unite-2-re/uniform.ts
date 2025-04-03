// deno-lint-ignore-file no-explicit-any

/*@__PURE__*/ export enum $ORG {
    exc     = "!#exc#!",
    type    = "!#type#!",
    uuid    = "!#uuid#!",
    node    = "!#node#!",
    index   = "!#index#!",
    payload = "!#payload#!",
    dispose = "!#dispose#!"
}

//
/*@__MANGLE_PROP__*/ const $exc$  = /*@__MANGLE_PROP__*/ Symbol.for("$@exc@$");
/*@__MANGLE_PROP__*/ const $data$ = /*@__MANGLE_PROP__*/ Symbol.for("$@data@$");
/*@__MANGLE_PROP__*/ const $sync$ = /*@__MANGLE_PROP__*/ Symbol.for("$@sync@$");

/*@__MANGLE_PROP__*/
export const ORG = {
    exc: $exc$,
    sync: $sync$,
    data: $data$,
    type: $ORG.type,
    uuid: $ORG.uuid,
    node: $ORG.node,
    index: $ORG.index,
    payload: $ORG.payload,
    dispose: $ORG.dispose
}

/*@__PURE__*/ export interface IMeta {
    [$ORG.uuid]?: string;
    [$ORG.type]?: string;
    [$ORG.node]?: unknown;
    [$ORG.payload]?: unknown;
    [$ORG.index]?: number;
};

//
/*@__MANGLE_PROP__*/ /*@__PURE__*/ export default ORG;
/*@__MANGLE_PROP__*/ /*@__PURE__*/ export const $bindings$ = /*@__MANGLE_PROP__*/ new WeakMap<any, any>();
/*@__MANGLE_PROP__*/ /*@__PURE__*/ export const bindWithContext = (context: any, obj: any) => {
    try { context[ORG.exc] = obj; } catch(e: any) {};
    /*@__MANGLE_PROP__*/ /*@__PURE__*/ $bindings$.set(context, obj);
    return obj;
}
