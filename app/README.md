Web application
===

This app will deploy to S3 bucket, then you can access the app as static web site on S3 bucket.

## Before setup

You have to finish provision AWS rewsources.
Please refence this README.md(../cfn/README.md)

Next, fix a couple of code in `app/src/index.js`.

Set your environment IdentityPoolId and IoT Core host.

> IdentityPoolId: 'ap-northeast-1:bba9e20b-8a60-45f1-a721-*************',

> host: '**************.iot.ap-northeast-1.amazonaws.com',


## How to setup

```
cd /path/to/iot-button-score-board/app
npm install
npm run build
```

## How to deploy 

```
$ S3_BUCKET=score-board-staticsitebucket-*************
$ aws s3 cp dist/ s3://$S3_BUCKET/ --recursive
```

## Requrement

- [webpack](https://webpack.js.org)
