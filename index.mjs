// export const handler = async (event) => {

//     const response = {
//       statusCode: 200,
//       body: JSON.stringify('Hello from Zain!'),
//     };
//     return response;
//   };
  

  import * as AWS from 'aws-sdk';
const docClient = new AWS.DynamoDB.DocumentClient();



export async function handler(event) {
    console.log(event);
    try {
      const params = {
      TableName : 'history',
      Item: {
             "blog_id":11,
             "blog_author":"Neil harrison",
             "blog_title":"Microservice"
        }
      }
    await docClient.put(params).promise();
    return { body: 'Successfully created item!' }
  } catch (err) {
    
    return { error: err }
  }
}