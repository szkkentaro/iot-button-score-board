AWS IoT button - sample application
===

Score board

This web app (static html) shows an IoT button press count.

## How to provision AWS resource

[provision resources](./cnf/README.md)

## How to deploy web application

[deploy application](./app/README.md)

## Repository dir

```
$ tree -I node_modules
.
├── LICENSE
├── README.md
├── app                            // score board app
│   ├── dist                       // static source
│   │   ├── bundle.js
│   │   └── index.html
│   ├── package.json
│   ├── src
│   │   └── index.js
│   └── webpack.config.js          // webpack conf
└── cfn                            // AWS Cloud Formation 
    ├── README.md
    ├── src                        // lambda functions source
    │   ├── gateway                // gateway from IoT button to DynamoDB
    │   │   ├── index.js
    │   │   └── package.json
    │   └── relay
    │       ├── index.js
    │       └── package.json
    └── template.yaml              // CloudFormation template written by SAM
```