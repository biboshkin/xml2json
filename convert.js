const fs = require('fs'),
xml2js = require('xml2js');
 
const parser = new xml2js.Parser();

const getFieldsFromInstance = (fieldName, instance) => {
    try {
        return instance.map((i) => i[fieldName])
    } catch (error) {
        console.error(`Поле ${fieldName} отсутсвует в списке`);
        return []
    }
}

fs.readFile(__dirname + '/example.xml', function(err, data) {
    parser.parseString(data, function (err, json) {
        // instance содержит массив объектов
        const instance = json && json.result && json.result.interpretation && json.result.interpretation[0] && json.result.interpretation[0].instance
        const fields = getFieldsFromInstance('SWI_spoken', instance);

        // тут можно обработать поля
        console.log(fields.join(','))
    });
});