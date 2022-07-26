# Loja Integrada Code Challenge
### by Yan Karlo Teixeira

## Assumptions

- The main objective is to demonstrate the code style
- The backend will return as less data as possible
- The project structure is formed by API connecting with 2 services : Shopping-cart (cart) and Products-Catalog (product)
- The message broker was not considered to update prices on the services
- Cache service not considered
- The gRPC approach was used to communicate with the microservices

## Documentation (Swagger)
 It can be accessed through : http://localhost:3000/doc/

## How to run:
```sh
docker-compose up
```
## Project Structure
### API gateway
* **app** (core of the source code)
    + **controllers** => requests receivers and response handlers
    + **routes** => routes -endpoints - definition
    + **services** => business logic handlers which trigger the requests to the other services)
* **dependencies** => javascript object that holds the main configurations setups
* **engines** => classes for server, database, client services
* **entities** => helper classes
* **proto** => protobuf structures

### Products-Catalog
* **dependencies** => javascript object that holds the main configurations setups
* **engines** => classes for server, database, client services
* **entities** => helper classes
* **implementation** => acts as controllers
    + **Services** => Implements the business logic
* **models** => Mongoose models definitions
* **proto** => protobuf structures

### Shopping-Cart
* **dependencies** => javascript object that holds the main configurations setups
* **engines** => classes for server, database, client services
* **entities** => helper classes
* **implementation** => acts as controllers
    + **Services** => Implements the business logic
* **models** => Mongoose models definitions
* **proto** => protobuf structures
