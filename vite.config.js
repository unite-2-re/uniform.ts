import rollupOptions, {plugins, NAME} from "./rollup/uniform/rollup.config";
import {worker} from "./rollup/worker/rollup.config";
import terserOptions from "./rollup/shared.config";
import {resolve} from "node:path";

//
export const __dirname = resolve(import.meta.dirname, "./");

//
export default {
    plugins,
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
            "/plugins/": resolve(__dirname, "./plugins/"),
            "u2re/": resolve(__dirname, '/externals/modules/'),
            'u2re-src/': resolve(__dirname, '../'),
            "u2re/cdnImport": resolve(__dirname, '../cdnImport.mjs'),
            "u2re/dom": resolve(__dirname, "../dom.ts/src/index.ts"),
            "u2re/lure": resolve(__dirname, "../BLU.E/src/index.ts"),
            "u2re/object": resolve(__dirname, "../object.ts/src/index.ts"),
            "u2re/uniform": resolve(__dirname, "../uniform.ts/src/index.ts"),
            "u2re/theme": resolve(__dirname, "../theme.core/src/index.ts"),
        },
    },
    server: {
        port: 5173,
        open: false,
        origin: "/",
        fs: {
            allow: ['..', resolve(__dirname, '../') ]
        },
    },
    build: {
        chunkSizeWarningLimit: 1600,
        assetsInlineLimit: 1024 * 1024,
        minify: "terser",
        sourcemap: 'hidden',
        target: "esnext",
        name: NAME,
        lib: {
            formats: ["es"],
            entry: resolve(__dirname, './src/main/index.ts'),
            name: NAME,
            fileName: NAME,
        },
        rollupOptions,
        //terserOptions
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
}
