# FROM node:erbium

# COPY . /src

# WORKDIR /src/client

# RUN npm install

# RUN npm run build

# WORKDIR /src/server

# RUN npm install

# EXPOSE 3000

# CMD ["node", "index.js"]

FROM ubuntu

# RUN apt-get update && apt-get install -y \
#     build-essential \
#     curl \
#     dialog \
#     net-tools \
#     tar \
#     wget \  
#     nodejs \
#     npm
RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    dialog \
    net-tools \
    tar \
    wget \  
    nodejs \
    npm

ENV AWS_ACCESS_KEY_ID XXID
ENV AWS_SECRET_ACCESS_KEY XXSECRET
ENV AWS_SESSION_TOKEN XXTOKEN

COPY . /src

WORKDIR /src/client

RUN npm install

RUN npm run build

WORKDIR /src/server

RUN npm install

EXPOSE 3000

CMD ["node", "index.js"]