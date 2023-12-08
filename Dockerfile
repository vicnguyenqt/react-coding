FROM node:12-alpine

# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /app

# Installing dependencies
COPY package.json package-lock.json /app/
RUN npm install --freeze-lockfile

# Copying source files
COPY . /app

# Expose server
EXPOSE 8050

# Running the app
CMD npm run start
