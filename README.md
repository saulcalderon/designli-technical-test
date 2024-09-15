# designli-technical-test

NestJS API for the two challenges:
    - Challenge 1: Map SES Notification to a custom response.
    - Challenge 2: Parse an email and extract the first JSON attachment(file).

## Description of the solution

### Challenge 1

The SES notification is mapped to a custom response in the `POST /mapper` endpoint. The notification is transformed into a class instance using the `class-validator` library and also validated that the incoming schema is correct.

After the validation, the instance is transformed into the custom response using the `class-transformer` library to map the instance to the custom response schema.

The SES notification provided is from: https://github.com/aws/aws-lambda-go/blob/main/events/testdata/ses-sns-event.json that can be used to test the endpoint.

The custom response schema looks like this:
```json
{
    "spam": true,
    "virus": true,
    "dns": true,
    "mes": "septiempre",
    "retrasado": true,
    "emisor": "example@test.com",
    "receptor": ["example@test.com"]
}
```

### Challenge 2

The email is received by the `POST /parser` endpoint and then parsed using the `mailparser` library, depending on the method specified in the request (file_path or url).

The json file is extracted from the email as a buffer and then transformed into a `StreamableFile` class from NestJS to be sent to the client.

Here is the email example used to test the endpoint: https://github.com/saulcalderon/designli-technical-test/blob/feature/real-challenge/src/mail-parse/fixture/email-example.eml


**IMPORTANT NOTE:** Both endpoints can be tested using the Swagger documentation available at `http://localhost:3000/api` after running the app.

## Prerequisites

- Node.js (v20.17.0)

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

## Run tests

```bash
# unit tests
$ npm run test
```

## Swagger documentation

The Swagger documentation is available at `http://localhost:3000/api` after running the app.


