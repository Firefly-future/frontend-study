import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server:{
      proxy: {
      // 凡是以 /api 开头的请求都转到猫眼
      '/api': {
        target: 'https://m.maizuo.com/gateway',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')   // 去掉/api前缀
      }
    }
  }
})
