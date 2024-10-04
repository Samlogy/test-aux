// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     port: 5173,
//     host: true,
//     watch: {
//        usePolling: true,
//     },
//   },
// });

import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command, mode }) => {
 const env = loadEnv(mode, process.cwd());
 console.log('cmd => ', command)
 return {
   plugins: [react()],
   server: {
     port: 5173,
     host: true,
     watch: {
      usePolling: true,
     },
     esbuild: {
      target: "esnext",
      platform: "linux",
    },
  },
  define: {
    VITE_API_END_POINT: JSON.stringify(env.VITE_API_END_POINT),
  },
 };
});