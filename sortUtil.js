sortResult = (json = [], sortCol = null, sortDirection = 'asc') => {
    let sortJson = [];
    if (!sortCol || (json.length > 0 && !json[0][sortCol])) {
        console.error('Неверно указано поле для сортировки. Результат не будет отсортирован.');
        return json;
    }

    return json.sort(function (a, b) {
        switch (sortDirection) {
            case 'asc':
                if (a[sortCol] > b[sortCol]) {
                    return 1;
                }
                if (a[sortCol] < b[sortCol]) {
                    return -1;
                }
                break;
            case 'desc':
                if (a[sortCol] < b[sortCol]) {
                    return 1;
                }
                if (a[sortCol] > b[sortCol]) {
                    return -1;
                }
                break;
        }
        // a должно быть равным b
        return 0;
    });
};

module.exports = sortResult;
