import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
const ses = new SESClient({ region: "ap-southeast-2" });

export async function sendMail(subject, recipient, body) {

    const command = new SendEmailCommand({
        Destination: {
          ToAddresses: [recipient]
        },
        Message: {
          Body: {
            Text: { Data: "This email is to notify you the price of " + body + " USD." },
          },
    
          Subject: { Data: subject},
        },
        Source: "zainabedeen.sohail@gmail.com",
      });

      try {
        let response = await ses.send(command);
      } catch (error) {
        console.log(error)
      }

}