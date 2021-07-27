FROM node

WORKDIR /app

ENV REACT_APP_API_KEY=c3d26404005303e310cabdeb99155ff5

EXPOSE 3000

COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json

RUN npm install 

COPY ./src ./src 
COPY ./public ./public

CMD ["npm", "start"]