"use strict";
// importa a biblioteca da amazon
const AWS = require("aws-sdk");

const fetchItem = async (event) => {
  //module.exports.fetchItem = async (event) => {

  // instancia o objeto usado no banco de dados
    const dynamodb = new AWS.DynamoDB.DocumentClient();

    const {id} = event.pathParameters

    let item;

    try {
        const result = await dynamodb.get({
            TableName: "ItemTable",
            Key: {id}
        }).promise();

        item = result.Item;

    } catch (error) {
        console.log(error)
    }

    return {
        statusCode: 200,
        body: JSON.stringify(item),
    };
};

module.exports = {
    handler: fetchItem,
};
