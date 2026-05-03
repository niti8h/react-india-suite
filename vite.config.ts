import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path, { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
    plugins: [react(), dts({ include: ['src'] })],
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'MyContextLib',
            formats: ['es', 'umd'],
            fileName: (format) => `index.${format}.js`,
        },
        rollupOptions: {
            external: ['react', 'react-dom', 'react/jsx-runtime'],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                },
            },
        },
    },
    resolve: {
        alias: {
            // This tells Vite: "If anyone asks for React, 
            // ONLY look in the demo app's node_modules."
            'react': path.resolve(__dirname, './node_modules/react'),
            'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
        },
    },
});