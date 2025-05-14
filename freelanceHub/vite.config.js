import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // server: {
  //   proxy :{
  //     '/profile' : 'http://localhost:8080',
  //     // '/api/users/getAllUsers' : 'http://localhost:8080',
  //   }
  // },
  
  plugins: [
    react(),
    tailwindcss(),
  ],
})
