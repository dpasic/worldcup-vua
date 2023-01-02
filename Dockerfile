# DOHVATI IMAGE
FROM node:16

# OZNAKE
LABEL "vendor"="NULLBIT d.o.o."
LABEL "maintainer"="mkolaric@nullbit.hr"

COPY ./ /usr/src/app/

# RADNI DIR
WORKDIR /usr/src/app

# INSTALACIJA PAKETA
RUN npm install -g nodemon
RUN npm install

# BACKGROUND
CMD nodemon -L ./bin/www