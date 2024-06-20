// export const handler = async (event) => {

//     const response = {
//       statusCode: 200,
//       body: JSON.stringify('Hello from Zain!'),
//     };
//     return response;
//   };
  

import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

import { createRecord } from "./db.mjs";

const ses = new SESClient({ region: "ap-southeast-2" });


import axios from 'axios';



axios(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error('error:' + err));


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


      const url = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd';
      const options = {
        method: 'GET',
        headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-XrgbyYz9iFPf71nBJkPh8afu'}
      };


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

    const recordForCreation =  {

                 "history":"11",
                 "blog_author":"Neil harrison",
                 "blog_title":"Microservice"
            }

    await createRecord('history', recordForCreation)
    // let response = await ses.send(command);

    // let responseAx = await axios(url, options);
    // console.log(responseAx.json())

    return { body: 'Successfully created item!' }
  } catch (err) {
    
    return { error: err }
  }
}