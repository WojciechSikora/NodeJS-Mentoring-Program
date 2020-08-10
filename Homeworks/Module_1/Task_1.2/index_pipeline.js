const csv = require('csvtojson');
const path = require('path');
const fs = require('fs');
const { pipeline } = require('stream');

const workingPath = path.parse(process.argv[1]);
const csvFilePath = path.join(workingPath['dir'] + '/csv/nodejs-hw1-ex1.csv' );
const txtFilePath = path.join(workingPath['dir'] + '/task_new_file/from_CSV_to_TXT.txt');
const csvOpt = {delimiter: ';', needEmitAll: true}

const readStream = fs.createReadStream(csvFilePath);
const writeStream = fs.createWriteStream(txtFilePath);


pipeline (
    readStream,
    csv(csvOpt),
    writeStream,
    (err) => {
        if (err) {
            console.error('Pipeline failed.', err);
        } else {
            console.log('Pipeline succeeded.');
        }
    }
);

