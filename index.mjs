import { createRecord } from "./db.mjs";
import { getCoinPrice } from "./api_gecko_integration.mjs";
import { sendMail } from "./ses_mail_client.mjs";
import { emailEmptyMessage, emailInvalidMessage, cryptoCoinEmptyMessage, tableName, responseSuccessMessage } from "./constants.mjs";

import { v4 as uuidv4 } from 'uuid';
import * as EmailValidator from 'email-validator';
 

export async function handler(event) {
    console.log(event);

    let { email, cryptoCoin } = event;

    if(email){
        if(!EmailValidator.validate(email)) 
            return { error: emailInvalidMessage };
    }
    else{
        return { error: emailEmptyMessage };
    }

    if(!cryptoCoin){
        return { error: cryptoCoinEmptyMessage };

    }

    const date = new Date();

    const recordForCreation =  {
        "searchHistoryId": uuidv4(),
        "timeStamp": date.toISOString(),
        "email": email,
        "cryptoCoin": cryptoCoin
   }

    try {

    await createRecord(tableName, recordForCreation)

    let responseAx = await getCoinPrice(cryptoCoin)

    if(responseAx[cryptoCoin]["usd"]){
        await sendMail("Crypto Prices", email, cryptoCoin + " is " + responseAx[cryptoCoin]["usd"] );
    }

    return { body: { message : responseSuccessMessage, data : responseAx ? responseAx : {}} }
  } catch (err) {
    
    return { error: err }
  }
}