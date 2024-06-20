import axios from 'axios';

export async function getCoinPrice(cryptoCoin) {

    const url = `${process.env.geckoBaseUrl}/simple/price?ids=${cryptoCoin}&vs_currencies=usd`;
    const options = {
      method: 'GET',
      headers: {accept: 'application/json', 'x-cg-demo-api-key': process.env.geckoApiKey}
    };

      try {
        let responseAx = await axios(url, options);
        return responseAx.data;
      } catch (error) {
        console.warn(error);
        throw error;
      }

}