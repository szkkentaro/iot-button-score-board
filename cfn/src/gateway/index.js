const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB();

exports.handler = async (event, context) => {
    const id = [
        event.placementInfo.attributes.team,
        event.deviceInfo.deviceId
    ].join("-");

    await dynamo.updateItem({
        TableName: process.env.DYNAMODB_TABLE,
        Key: { Id: { S: id } },
        AttributeUpdates: { Score: { Action: 'ADD', Value: { N: "1" } } },
        ReturnValues: 'ALL_NEW'
    }).promise().catch(console.err);
};