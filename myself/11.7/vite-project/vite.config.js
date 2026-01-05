import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  // 共享选项，开发环境和构建都需要使用的选项
  base: 'abc',
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  // 配置开发服务器选项
  // server: {
  //   proxy: {
  //     // 带选项写法：
  //     // http://localhost:5173/api/bar 
  //     // -> http://jsonplaceholder.typicode.com/bar
  //     '/api': {
  //       target: 'http://jsonplaceholder.typicode.com',
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, ''),
  //     }
  //   },
  // },
  // 配置构建相关内容
  build: {
    outDir: 'build',
    // rollup 原本的配置项
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        detail: resolve(__dirname, 'detail.html'),
      }
    }
  }
})