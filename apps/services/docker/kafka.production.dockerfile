FROM wurstmeister/kafka:latest

LABEL author="Rachit Srivastava"
WORKDIR /var/www/digi-khata


# To build:
# docker build -f node.development.dockerfile --tag boilerplatetest ../