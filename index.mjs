import { createRecord } from "./db.mjs";
import { getCoinPrice } from "./api_gecko_integration.mjs";
import { sendMail } from "./ses_mail_client.mjs";
import { v4 as uuidv4 } from 'uuid';
import * as EmailValidator from 'email-validator';
 

export async function handler(event) {
    console.log(event);

    let { email, cryptoCoin } = event[data];

    if(email){
        if(!EmailValidator.validate(email)) 
            return { error: "email field cannot be empty" };
    }
    else{
        return { error: "email field cannot be empty" };
    }

    if(!cryptoCoin){
        return { error: "cryptoCoin field cannot be empty" };

    }

    const date = new Date();

    const recordForCreation =  {
        "searchHistory": uuidv4(),
        "timeStamp": date.toISOString(),
        "email": email,
        "cryptoCoin": cryptoCoin
   }

    try {

    await createRecord('searchHistory', recordForCreation)

    let responseAx = await getCoinPrice(cryptoCoin)

    if(responseAx[cryptoCoin]["usd"]){
        await sendMail("Crypto Prices", email, responseAx[cryptoCoin]["usd"] );
    }

    return { body: { message : 'Successfully generated Request!', data : responseAx ? responseAx : {}} }
  } catch (err) {
    
    return { error: err }
  }
}