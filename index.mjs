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



export async function handler(event) {
    console.log(event);
    try {
      const params = {
      TableName : 'history',
      Item: {
             "history":11,
             "blog_author":"Neil harrison",
             "blog_title":"Microservice"
        }
      }
    await dynamo.put(params)
    return { body: 'Successfully created item!' }
  } catch (err) {
    
    return { error: err }
  }
}