import axios from 'axios';
import crypto from 'crypto';
async function getStockData(symbol) {
    const verb = 'GET';
    const url = 'https://www.bitmex.com/api/v1/trade/bucketed';
    const path = '/api/v1/trade/bucketed';
    const expires = Math.round(new Date().getTime() / 1000) + 60; 
    const params = {
        binSize: '1d',
        symbol,
        count: 30,
        reverse: true
    };

    const queryString = Object.entries(params).map(([key, value]) => `${key}=${value}`).join('&');

    // Constructing the signature
    const signature = crypto.createHmac('sha256', 'hdl_1Ztc8ZphuQCKUcQLggs87fvTU7jsswE7ULpw0cAawOZy')
        .update(verb + path + '?' + queryString + expires)
        .digest('hex');

    try {
        const response = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'api-key': 'dHrDSHWix7wfxtzRwwxF3xsT',
                'api-signature': signature,
                'api-expires': expires
            },
            params: params
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export default getStockData;
