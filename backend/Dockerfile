# versão do Node.js
FROM node:22-alpine

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos package.json para instalar dependências
COPY package.json package-lock.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código
COPY . .

# Expõe a porta do backend
EXPOSE 5000

# Comando para rodar o servidor
CMD ["npm", "run", "dev"]
