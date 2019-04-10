"use strict";
//  headers for CORS support
const headers = {
  "Access-Control-Allow-Origin": "*", // Required for CORS support to work
  "Access-Control-Allow-Credentials": true // Required for cookies, authorization headers with HTTPS
};
const axios = require("axios");
const BASE_URL = "https://www.goodreads.com/search/index.xml";
const REVIEW_URL = "https://www.goodreads.com/book/show";
const xml2js = require("xml2js");
var parser = new xml2js.Parser({ ignoreAttrs: true, explicitArray: false });

//  test function
const hello = async event => {
  const envVariable = process.env.goodreadsAPI_KEY;
  const { queryStringParameters } = event;
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Go Serverless v1.0! Your function executed successfully! 2",
      input: event,
      envVariable,
      queryStringParameters
    })
  };
};

/**
 * getBooksInfo
 * @param {object} event  lambda invocation event consisting of payload and queryStringParameters
 * @return {object}  return's list of books that was found for the given query string.
 */
const getBooksInfo = async event => {
  const envVariable = process.env.goodreadsAPI_KEY;
  const { queryStringParameters } = event;
  const { q, page, search } = queryStringParameters;
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: envVariable,
        q,
        page,
        search
      }
    });
    return new Promise((resolve, reject) => {
      parser.parseString(response.data, function(err, result) {
        if (err) {
          reject({
            headers,
            statusCode: 401,
            headers,
            body: JSON.stringify(err)
          });
        }
        const { GoodreadsResponse } = result;
        const { search } = GoodreadsResponse;
        console.log("Done");
        console.log(JSON.stringify(search));
        const { "total-results": totalResults } = search;
        if (!totalResults) {
          search.result = { works: [] };
        }
        resolve({
          headers,
          statusCode: 200,
          body: JSON.stringify(search)
        });
      });
    });
  } catch (e) {
    console.log(e);
    return { headers, statusCode: 500, body: JSON.stringify(e) };
  }
};

/**
 * getBooksReview
 * @param {object} event  lambda invocation event consisting of payload and queryStringParameters
 * @return {object}  return data for book for a given bookId
 */
const getBooksReview = async event => {
  const envVariable = process.env.goodreadsAPI_KEY;
  const { queryStringParameters } = event;
  const { id, text_only, format } = queryStringParameters;
  try {
    const response = await axios.get(REVIEW_URL, {
      params: {
        key: envVariable,
        id,
        text_only,
        format
      }
    });
    return new Promise((resolve, reject) => {
      parser.parseString(response.data, function(err, result) {
        if (err) {
          reject({
            headers,
            statusCode: 401,
            headers,
            body: JSON.stringify(err)
          });
        }
        const { GoodreadsResponse = {} } = result;
        resolve({
          headers,
          statusCode: 200,
          body: JSON.stringify(GoodreadsResponse)
        });
      });
    });
  } catch (e) {
    console.log(e);
    return { headers, statusCode: 500, body: JSON.stringify(e) };
  }

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
module.exports = {
  hello,
  getBooksInfo,
  getBooksReview
};
