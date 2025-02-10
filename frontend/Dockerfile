# Etapa 1: Construção da imagem de desenvolvimento (Build)
FROM node:20 AS build

# Define o diretório de trabalho
WORKDIR /app

# Copia o arquivo package.json e o package-lock.json (ou yarn.lock, se for o caso)
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia todos os arquivos do projeto para o container
COPY . .

# Realiza o build do Next.js
RUN npm run build

# Etapa 2: Criação da imagem para produção
FROM node:20 AS production

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependências do estágio de build
COPY --from=build /app/package*.json ./

# Instala apenas as dependências de produção
RUN npm install --production

# Copia os arquivos compilados do estágio de build
COPY --from=build /app ./

# Expõe a porta que o Next.js vai usar
EXPOSE 3000

# Roda o Next.js no modo produção
CMD ["npm", "start"]
