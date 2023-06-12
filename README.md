# Fit Home

Project for plan your own physical exercise schedule at home and help you to perform the exercises at the correct time.

The backend of the project is not ready. Although the architecture is already done, I still need to do some routes that I realize I will need.


## Description

Developing with Clean Arquitecture, Domain Driven Design (DDD), Test Driven Development (TDD) and Design patterns.
Following the principles of SOLID, DRY, YAGNI and KISS.
It also has 100% of test coverage.

To help me architect the project, I develop a 
<a href="https://www.figma.com/file/W1WoZLRKxBFEK26KZ4NF8Q/Felipevm---Fit-Home?type=design&t=5zFCrxs0qhNAdS48-1">figma draft</a> (it's also not the final version).


## Production

This is a project to demonstrate my skills, so I'm not concerned about security in this case when disclosing the real API address.

I deployed the backend on Amazon EC2, which is connected to MongoDB Atlas.

Deploy: http://54.233.146.212:5050/api-docs/


## Development

### Startup

1. Clone the repository.
    * `git clone git@github.com:felipemalli/fit-home.git`

2. Install dependencies:
    * `npm install`

3. Run the project:
    * `npm run up:dev`

4. Wait for the running message and access:
    * http://localhost:5050/api-docs/

### Tests

Run all tests: `npm t`

Run all tests with coverage: `npm run test:ci`

### Finish

Close the project: `npm run down:dev`


## Technologies

- Typescript
- NodeJS
- Express
- MongoDB
- Jest
- Swagger
- JWT
- BCrypt
- Validator
- AWS

Other useful dependencies were used to make the project works properly (you can check the `package.json` file).


## Future of the project

- Create a Front-end