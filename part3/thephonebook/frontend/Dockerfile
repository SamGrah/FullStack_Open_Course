FROM node

WORKDIR /app

EXPOSE 3000

COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json

RUN npm install 

COPY ./src ./src 
COPY ./public ./public

CMD ["npm", "start"]