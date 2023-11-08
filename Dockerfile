# pull official base image
FROM node:21.0.0-alpine

# set working directory
WORKDIR /app

COPY . ./

RUN npm install

# start app
CMD ["npm", "run-script", "dev", "--", "--host"]
