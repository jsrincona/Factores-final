#!/bin/bash

echo -e "DESPLEGANDO FRONTEND"
cd ./frontend
sh deploy.sh
echo -e "FIN DESPLIEGUE FRONTEND"

echo -e "DESPLEGANDO BACKEND"
cd ../backend/
sh deploy.sh
echo -e "FIN DESPLIEGUE BACKEND"