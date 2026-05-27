import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa' // <-- أضفنا هذا السطر

export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
    // أضفنا هذا الكائن كاملاً
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'عيادتي - حجز المواعيد', // الاسم الكامل
        short_name: 'عيادتي', // اسم مختصر
        description: 'تطبيق حجز مواعيد طبيب',
        theme_color: '#2563eb', // لون مناسب (أزرق)
        background_color: '#ffffff',
        display: 'standalone', // هذا يخليه يظهر كتطبيق منفصل
        icons: [
          {
            src: '/icon-192.png', // لازم نجهز هذي الصورة
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
})