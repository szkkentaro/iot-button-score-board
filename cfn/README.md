CloudFormation template
===

You can provision AWS resources via Cloud Formation template (transformed SAM).
I recommend you to use `aws-sam-cli`, however you also use aws-cli cloudformation command.


## SAM - serverless application model

- [SAM](https://github.com/awslabs/serverless-application-model)
- [AWS SAM cli](https://github.com/awslabs/aws-sam-cli)

## Before provisioning template

You have to finish provision some AWS resources before provision CFn or deploy Web app.

- S3 Bucket

    For upload CloudFormation template

- AWS IoT 1-Click

    https://docs.aws.amazon.com/ja_jp/iot-1-click/latest/developerguide/what-is-1click.html

## How to provision

```console
$ AWS_PROFILE=iot-ideathon # Fix me
$ STACK_NAME=score-board
$ CFN_S3_BUCKET=cf-templates-*******-ap-northeast-1 # Fix me
$ IOT_ENDPOINT=$(aws iot describe-endpoint | jq -r ".endpointAddress")
$ 
$ sam package --template-file template.yaml --output-template-file packaged.yaml --s3-bucket $CFN_S3_BUCKET
$ sam deploy --template-file packaged.yaml --stack-name $STACK_NAME --capabilities CAPABILITY_IAM --parameter-overrides IoTEndpoint=$IOT_ENDPOINT
```