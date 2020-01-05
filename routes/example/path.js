let fs = require('fs');
let path = require('path');
let join = path.join;
function getJsonFiles(jsonPath) {
    let jsonFiles = [];
    function findJsonFile(path) {
        let files = fs.readdirSync(path);
        files.forEach(function (item, index) {
            let fPath = join(path, item);
            let stat = fs.statSync(fPath);
            if (stat.isDirectory() === true) {
                findJsonFile(fPath);
            }
            if (stat.isFile() === true) {
                jsonFiles.push(fPath);
            }
        });
    }
    findJsonFile(jsonPath);
    console.log(jsonFiles);
    res.json({ result: false, code: 200, data: jsonFiles}); 
};
getJsonFiles("./files/");