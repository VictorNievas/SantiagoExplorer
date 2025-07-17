#!/bin/bash

echo "▶️ Entrando al directorio del frontend..."
cd ../frontend

echo "📦 Instalando dependencias de React..."
npm install

echo "🏗️  Construyendo la app de React..."
npm run build

echo "🧹 Limpiando estáticos antiguos..."
rm -rf ../backend/static

echo "🚚 Moviendo build de React a backend/static..."
mv build ../backend/static

echo "✅ Frontend integrado con Flask correctamente."
