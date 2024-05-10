"use server";
import axios from 'axios';
import crypto from 'crypto';
async function getStockData(symbol: string) {
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

    const signature = crypto.createHmac('sha256', process.env.BITMEX_SECRET||"")
        .update(verb + path + '?' + queryString + expires)
        .digest('hex');

    try {
        const response = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'api-key': process.env.BITMEX_KEY,
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
