const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB();

exports.handler = async (event, context) => {
    const id = [
        event.placementInfo.attributes.team,
        event.deviceInfo.deviceId
    ].join("-");

    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Key: { id: { S: id } },
        AttributeUpdates: { score: { Action: 'ADD', Value: { N: "1" } } },
        ReturnValues: 'ALL_NEW'
    };
    const data = await dynamo.updateItem(params).promise().catch(console.err);
    console.log(JSON.stringify(event, data));
};