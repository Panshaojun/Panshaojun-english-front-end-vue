import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve:{
    alias:{
      '@': path.resolve(__dirname, './src')
    }
  },
  server:{
    proxy:{
      "/api":{
        target: 'http://localhost:1337',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      //下载文件代理
      "/file":{
        target: 'http://localhost:1337',
        changeOrigin: true,
      }
    }
  }
})
