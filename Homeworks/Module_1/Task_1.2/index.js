const csv = require('csvtojson');
const path = require('path');
const fs = require('fs');
const workingPath = path.parse(process.argv[1]);
const csvFilePath = path.join(workingPath['dir'] + '/csv/nodejs-hw1-ex1.csv' )
const txtFilePath = path.join(workingPath['dir'] + '/task_new_file/from_CSV_to_TXT.txt')

const csvOpt = {delimiter: ';', needEmitAll: true}

try {
    fs.mkdirSync(path.join(workingPath['dir'] + '/task_new_file'));
    console.log('\nFolder "task_new_files" created.');
} catch (error) {
    if (error.code == 'EEXIST') {
        console.log('\nFOLDER "task_new_files" ALREADY EXISTs (error code: ' + error.code + ')');
    };
};

async function convertCsvToJson (readPath) {
    console.log('readPath: ' + readPath)
    try {
        const jsonArray = await csv(csvOpt).fromFile(readPath);
        //console.log(jsonArray)
        return jsonArray;
    } catch (error) {
        console.log('Error occured: ' + error);
    };
};

async function writeCsvContentToTxt (readPath, writePath) {
    const logger = fs.createWriteStream(writePath, {
        flags: 'a'
    });
    try {
        const jsonObject = await convertCsvToJson(readPath)
        for (let i  =0; i < jsonObject.length; i++){
            var jsonLine = JSON.stringify(jsonObject[i], null, 0) + '\n';
            try {
                logger.write(jsonLine);
                console.log(jsonLine);
            } catch (error) {
                console.log("Error occured: " + error)
            };
        };
    } catch (error) {
        console.log("Error occured: " + error)
    };

};

(async () => {
    await writeCsvContentToTxt(csvFilePath, txtFilePath)
})();
