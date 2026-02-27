FROM node:22

WORKDIR /opt/app
COPY . .
RUN chown -R node:node /opt/app
RUN npm config set fetch-retry-maxtimeout 600000 -g
USER node
RUN npm install && npm run build
EXPOSE 1337
CMD ["npm", "start"]
