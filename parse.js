let fs = require('fs');
let csv = require('csv-parser');
let YAML = require('yamljs');
let validateRow = require('./validators');
let sortResult = require('./sortUtil');

// инициализация основных переменных
let csvFile = process.argv[2];
let sortCol = process.argv[3];
let sortDirection = process.argv[4]; // asc or desc
let resJson = [];
let yamlFile = './res.yaml';
let jsonFile = './res.json';

// удаляем старые файлы если они есть
fs.existsSync(jsonFile) && fs.unlinkSync(jsonFile);
fs.existsSync(yamlFile) && fs.unlinkSync(yamlFile);

// парсим csv
if (csvFile && fs.existsSync(csvFile)) {
    fs.createReadStream(csvFile)
        .pipe(csv())
        .on('data', (row) => {
            // валидируем, если валидно сохраняем в результирующий файл
            if (validateRow(row)) {
                resJson.push(row);
            }
        })
        .on('end', () => {

            // если передан параметр для сортировки, то сортируем
            if (sortCol)
                resJson = sortResult(resJson, sortCol, sortDirection);

            let yamlString = YAML.stringify(resJson, 4);
            let jsonString = JSON.stringify(resJson, 4);

            fs.writeFile(jsonFile, jsonString, (err) => {
                if (err) throw err;
                console.log('JSON файл сохранен (res.json)!');
            });

            fs.writeFile(yamlFile, yamlString, (err) => {
                if (err) throw err;
                console.log('YAML файл сохранен (res.yaml)!');
            });
        });

} else {
    console.error('Неверно задан файл для парсинга.');
}
