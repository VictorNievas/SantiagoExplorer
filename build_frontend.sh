#!/bin/bash
cd frontend
npm install
npm run build
cd ..
rm -rf backend/static
mv frontend/build backend/static
