### Steps to for getting started for backend services :-
This  repo consist's of code required to interact with goodreads api services
All the function's are deployed on AWS and are using

    1. Lambda
    2. API gateway
Steps to build the service

    1. run npm install
    2. Node version  >= v8.10.0
    3. copy the function that you are testing locally and move it to server.js
    4. get an API key for goodreads and ue it in server.js or for deployent in serverless.yml

hosted service is available on [aws](https://evxoorqk27.execute-api.ap-south-1.amazonaws.com/dev/)
  Endpoint

    1. [GET] getbooksreview provide review of book with given bookid
    2. [GET] goodreadshello provide with list of book for searched keyword

Use Postman to access the collection
  [postman](https://www.getpostman.com/collections/b4c9361389333626cce6)

Please refer to AWS and Serverless furter documentation

  1. [Lambda](https://aws.amazon.com/lambda/)
  2. [Serverless](https://serverless.com/framework/docs/providers/aws)