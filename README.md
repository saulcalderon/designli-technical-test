# designli-technical-test

NestJS API to map SES Notification to a custom response.

## Description of the solution

The `class-transformer` library is used to transform the incoming SES Notification into a class instance received in the `POST /mapper` endpoint and transform the instance into a custom response.

The SES notification provided is from: https://github.com/aws/aws-lambda-go/blob/main/events/testdata/ses-sns-event.json

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


