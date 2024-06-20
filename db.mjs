import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';
const dynamo = DynamoDBDocument.from(new DynamoDB());


export async function createRecord(tableName, payload) {

    const params = {
      TableName : tableName,
      Item: payload
      }

      try {
        await dynamo.put(params)
      } catch (error) {
        console.log(error)
      }


}