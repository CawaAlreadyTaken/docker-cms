# Utilizza l'immagine ufficiale di Node.js come immagine di base
FROM node:16

# Imposta la directory di lavoro all'interno del container
WORKDIR /usr/src/app

# Copia i file 'package.json' e 'package-lock.json' (se disponibile)
COPY dependency/cms-api/package*.json ./

# Installa le dipendenze del progetto
RUN npm install

RUN npm install -g typescript

# Copia i file e le directory del progetto nella directory di lavoro del container
COPY dependency/cms-api/ .

RUN tsc

# Espone la porta 3000 per permettere l'accesso alle API
EXPOSE 3030

# Comando da eseguire all'avvio del container
CMD ["node", "dist/index.js"]
