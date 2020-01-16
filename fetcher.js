const request = require('request');
const fs = require('fs');
const input = process.argv.splice(2);
url = input[0];
filePath = input[1];
console.log(input);

request(url, (error, response, body) => {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  //console.log('body:', body); // Print the HTML for the Google homepage.

  const path = filePath;

  fs.access(path, fs.F_OK, (err) => {
    if (err) {
      fs.writeFile(filePath, body, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
        const stats = fs.statSync(filePath);
        const fileSizeInBytes = stats.size;
        console.log("downloaded" + fileSizeInBytes);
      });
    
    } else {

      console.log('the file exists already');
      const readline = require('readline');

      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });


      rl.question('Would you like to rewrite ? y/n', (answer) => {
        if (answer === 'y') {
          fs.writeFile(filePath, body, (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
            const stats = fs.statSync(filePath);
            const fileSizeInBytes = stats.size;
            console.log("downloaded" + fileSizeInBytes);

            rl.close();
          });

        } else {
          console.log("do it");
          rl.close();

        }
    
      }
    
      );
    }
  });

});
