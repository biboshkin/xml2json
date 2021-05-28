const fs = require('fs'),
xml2js = require('xml2js');
 
const parser = new xml2js.Parser();
let instance = []

const getFieldsFromInstance = (field) => {
    try {
        return instance.map((i) => i[field])
    } catch (error) {
        console.error(`Поле ${field} отсутсвует в списке`);
        return []
    }
}

fs.readFile(__dirname + '/example.xml', function(err, data) {
    parser.parseString(data, function (err, json) {
        // instance содержит массив объектов
        instance = json && json.result && json.result.interpretation && json.result.interpretation[0] && json.result.interpretation[0].instance
        

        const fields = getFieldsFromInstance('SWI_spoken') || [];

        // тут можно обработать поля
        console.log(fields.join(','))
    });
});