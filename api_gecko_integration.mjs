import axios from 'axios';

export async function getCoinPrice(cryptoCoin) {

    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${cryptoCoin}&vs_currencies=usd`;
    const options = {
      method: 'GET',
      headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-XrgbyYz9iFPf71nBJkPh8afu'}
    };

      try {
        let responseAx = await axios(url, options);
        return responseAx.data;
      } catch (error) {
        console.log(error)
        throw error;
      }

}