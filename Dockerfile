FROM node:14.15.0

RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/app/log


# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json ./
COPY package-lock.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production
RUN mkdir -p /usr/src/app

# Bundle app source
COPY . .

EXPOSE 3337
CMD [ "npm", "start" ]

