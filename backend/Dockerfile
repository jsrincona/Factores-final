# Imagen base con Python
FROM python:3.9

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar el archivo requirements.txt al contenedor
COPY requirements.txt .

# Instalar las dependencias del proyecto
RUN pip install -r requirements.txt

# Copiar el resto del código al contenedor
COPY . .

# Puerto expuesto por la aplicación Django
EXPOSE 8000

# Comando para ejecutar la aplicación Django
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]