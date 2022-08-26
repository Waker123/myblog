import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import path from 'path'
const Components = require('unplugin-vue-components/vite')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

export default defineConfig({
  base: '/',
  plugins: [
    vue(),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, './src'),
    }
  },
  server: {
    proxy: {
      '/api': { // 匹配请求路径，localhost:3000/snow
        target: "http://43.142.183.155:5000", // 代理的目标地址
        changeOrigin: true, // 开发模式，默认的origin是真实的 origin:localhost:3000 代理服务会把origin修改为目标地址
        // secure: true, // 是否https接口
        // ws: true, // 是否代理websockets
        // rewrite target目标地址 + '/abc'，如果接口是这样的，那么不用重写
        rewrite: (path) => path.replace(/^\/api/, '') // 路径重写
      }
    }
  }
})