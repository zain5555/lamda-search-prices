// export const handler = async (event) => {

//     const response = {
//       statusCode: 200,
//       body: JSON.stringify('Hello from Zain!'),
//     };
//     return response;
//   };
  

import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';

const dynamo = DynamoDBDocument.from(new DynamoDB());

import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
const ses = new SESClient({ region: "ap-southeast-2" });


export async function handler(event) {
    console.log(event);


    const command = new SendEmailCommand({
        Destination: {
          ToAddresses: ["zainsohail96@gmail.com"]
        },
        Message: {
          Body: {
            Text: { Data: "Test" },
          },
    
          Subject: { Data: "Test Email" },
        },
        Source: "zainabedeen.sohail@gmail.com",
      });


    try {
    //   const params = {
    //   TableName : 'history',
    //   Item: {
    //          "history":"11",
    //          "blog_author":"Neil harrison",
    //          "blog_title":"Microservice"
    //     }
    //   }
    // await dynamo.put(params)
    let response = await ses.send(command);

    return { body: 'Successfully created item!' }
  } catch (err) {
    
    return { error: err }
  }
}