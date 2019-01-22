FROM node
RUN mkdir -p /usr/src/taskmgrangapp
WORKDIR /usr/src/taskmgrangapp
COPY package.json /usr/src/taskmgrangapp
RUN npm install
COPY . /usr/src/taskmgrangapp
EXPOSE 4200
CMD ["npm" "start"]
