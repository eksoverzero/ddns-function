'use strict';

const aws = require('aws-sdk');
const route53 = new aws.Route53();

module.exports.DDNSUpdate = (event, context, callback) => {
  const domain = event.pathParameters.domain;
  const requestIp = event.requestContext.identity.sourceIp;

  let params = {
    HostedZoneId: process.env.HOSTED_ZONE_ID,
    ChangeBatch: {
      Changes: [{
        Action: "UPSERT",
        ResourceRecordSet: {
          Name: domain,
          ResourceRecords: [{
            Value: requestIp
          }],
          TTL: 60,
          Type: "A"
        }
      }]
    }
  };

  route53.changeResourceRecordSets(params, function(error, data) {
    if (error) {
      return callback(null, {
        statusCode: 500,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          error: error
        })
      });
    } else {
      return callback(null, {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ip: requestIp
        })
      });
    }
  });
};
