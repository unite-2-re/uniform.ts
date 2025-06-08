import {worker} from "./rollup/rollup.config";
import {resolve} from "node:path";

//
function objectAssign(target, ...sources) {
    if (!sources.length) return target;

    const source = sources.shift();
    if (source && typeof source === 'object') {
        for (const key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                if (source[key] && typeof source[key] === 'object') {
                    if (!target[key] || typeof target[key] !== 'object') {
                        target[key] = Array.isArray(source[key]) ? [] : {};
                    }
                    objectAssign(target[key], source[key]);
                } else {
                    target[key] = source[key];
                }
            }
        }
    }

    return objectAssign(target, ...sources);
}

//
const importConfig = (url, ...args)=>{
    return import(url)?.then?.((m)=>m?.default?.(...args));
}

//
export const __dirname = resolve(import.meta.dirname, "./");
export default objectAssign({
    worker,
    resolve: {
        alias: {
            "@": resolve(__dirname, "./src/"),
            "@mods": resolve(__dirname, "./src/$blit$/"),
            "@ext": resolve(__dirname, "./src/$ext$/"),
            "@blit": resolve(__dirname, "./src/$blit$/"),
            "@scss": resolve(__dirname, "./src/$scss$/"),
            "@temp": resolve(__dirname, "./src/$temp$/"),
            "@service": resolve(__dirname, "./src/$service$/"),
            "/assets/": resolve(__dirname, "./assets/"),
            "/frontend/": resolve(__dirname, "./frontend/"),
            "/plugins/": resolve(__dirname, "./plugins/")
        },
    },
    build: {
        lib: { entry: resolve(__dirname, './src/main/index.ts') }
    },
    optimizeDeps: {
        include: [
            "./node_modules/**/*.mjs",
            "./node_modules/**/*.js",
            "./node_modules/**/*.ts",
            "./src/**/*.mjs",
            "./src/**/*.js",
            "./src/**/*.ts",
            "./src/*.mjs",
            "./src/*.js",
            "./src/*.ts",
            "./test/*.mjs",
            "./test/*.js",
            "./test/*.ts"
        ],
        entries: [
            resolve(__dirname, './src/$worker$/index.ts'),
            resolve(__dirname, './src/$main$/index.ts')
        ],
        force: true
    }
}, importConfig("../shared/rollup.config.js", await readFile(resolve(__dirname, "./tsconfig.json"), {encoding: "utf8"}), import.meta.dirname));
