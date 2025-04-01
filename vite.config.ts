import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import path from "path"  
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
	devServer: {
		proxy: 'http://47.121.184.198:8080'
	  },
  plugins: [vue()],
  resolve:{
    alias:{
      "@":path.resolve(__dirname,"./src")
    }
  },
  base:'./',
  server: {
    proxy: {
      '/api': {
        target: 'http://your-backend-url',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})



