import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom', 'lucide-react'],
          'ui': [
            './src/components/ui/button.tsx',
            './src/components/ui/card.tsx',
            './src/components/ui/dialog.tsx',
            './src/components/ui/input.tsx',
            './src/components/ui/label.tsx'
          ],
          'sections': [
            './src/components/sections/HeroSection.tsx',
            './src/components/sections/ExpertsSection.tsx',
            './src/components/sections/ServicesSection.tsx',
            './src/components/sections/TestimonialsSection.tsx'
          ]
        }
      }
    }
  }
}));
