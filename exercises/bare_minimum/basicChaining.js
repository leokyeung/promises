/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var getUserName = require('./promiseConstructor').pluckFirstLineFromFileAsync;
var getGitHubHandle = require('./promisification').getGitHubProfileAsync;
Promise.promisifyAll(fs);


var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  return getUserName(readFilePath)
    .then(function(user) {
      return getGitHubHandle(user);
    })
    .then(function(body) {
      //write to file path
      return fs.writeFileAsync(writeFilePath, JSON.stringify(body));
    })
    .catch(function(error) {
      console.log(error);
    });
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
