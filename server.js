var http = require("http");
const axios = require("axios");
const xml2js = require("xml2js");
var parser = new xml2js.Parser({ ignoreAttrs: true, explicitArray: false });
const BASE_URL = "https://www.goodreads.com/search/index.xml";
//create a server object:
http
  .createServer(function(req, res) {
    axios
      .get(BASE_URL, {
        params: {
          key: "",
          q: "C++ Primers"
        }
      })
      .then(function(response) {
        // console.log(response);
        parser.parseString(response.data, function(err, result) {
          console.dir(result);
          const { GoodreadsResponse } = result;
          const { search } = GoodreadsResponse;
          console.log("Done");
          const { "total-results": totalResults } = search;
          if (!totalResults) {
            search.result = { works: [] };
          }
          res.write(JSON.stringify(search)); //write a response to the client
          res.end(); //end the response
        });
      })
      .catch(function(error) {
        console.log(error);
        res.write("error"); //write a response to the client
        res.end(); //end the response
      });
  })
  .listen(8089);
