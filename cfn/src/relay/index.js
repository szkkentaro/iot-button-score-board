const AWS = require('aws-sdk');
const iotData = new AWS.IotData({
    endpoint: process.env.IOT_ENDPOINT,
    region: 'ap-northeast-1'
});

exports.handler = async (event, context) => {
    const promises = event.Records.map(record => {
        if (~["INSERT", "MODIFY"].indexOf(record.eventName)) {
            const payload = JSON.stringify(record.dynamodb.NewImage);
            console.log(payload, process.env.IOT_TOPIC_NAME);
            return iotData.publish({
                topic: process.env.IOT_TOPIC_NAME,
                payload: payload,
                qos: 0
            }).promise();
        }
    });

    const data = await Promise.all(promises).catch(console.log);
    console.log(data);
};