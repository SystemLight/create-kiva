import path from "path";
import {defineConfig} from "vite";
import vue from "@vitejs/plugin-vue";
import legacy from "@vitejs/plugin-legacy";
import VitePluginElementPlus from "vite-plugin-element-plus";

const baseUrl = {
    development: "./",
    beta: "/",
    release: "/"
};

// https://vitejs.dev/config/
export default defineConfig(({mode}) => ({
    base: baseUrl[mode as keyof typeof baseUrl],
    build: {
        target: "es2015"
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src")
        }
    },
    server: {
        host: "0.0.0.0",
        proxy: {
            "/api": {
                target: "http://localhost:5000",
                changeOrigin: true,
                // rewrite: path => path.replace(/^\/api/, "")
            }
        }
    },
    plugins: [
        vue(),
        {
            ...legacy({
                targets: ["defaults", "not IE 11"]
            }),
            apply: "build"
        },
        // VitePluginElementPlus({
        //     // 如果你需要使用 [component name].scss 源文件，你需要把下面的注释取消掉。
        //     // 对于所有的 API 你可以参考 https://github.com/element-plus/vite-plugin-element-plus
        //     // 的文档注释
        //     // useSource: true
        //     format: mode === "development" ? "esm" : "cjs"
        // })
    ]
}));
