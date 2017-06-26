// Невалидные данные исключаем из результирующей выборки
let validators = {
    name: (data) => {
        // name: 'Koch Mühle',
        // Названия отеля должны содержать только символы UTF-8
        return !/[^\x20-\x7E]/.test(data);
    },
    stars: (data) => {
        // stars: '3',
        // Рейтинги отелей должны быть { 0, 1, 2, 3, 4, 5 }
        let ratings = [0, 1, 2, 3, 4, 5];
        return data in ratings;
    },
    uri: (data) => {
        // uri: 'http://garden.com/category/categories/terms/'
        // URI должны быть валидными
        // (открываться в браузере, схема может как присутствовать, так и отсутствовать,
        // но никаких "ftp://", "mailto:", "javascript:", etc...)
        let urlPattern = /((http|https):\/\/)|^[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/
        return urlPattern.test(data);
    }
};
validateRow = (row = {}) => {
    let rowValid = true;
    let keys = Object.keys(row);

    for (let i = 0; i < keys.length; i++) {
        let colName = keys[i];
        let value = row[keys[i]];

        if (validators[colName] && !validators[colName](value)) {
            rowValid = false;
            break;
        }
    }

    return rowValid;
};
module.exports = validateRow;