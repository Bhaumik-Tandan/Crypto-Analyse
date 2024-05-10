"use server";
const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017";

const axios = require('axios');
const { MongoClient } = require('mongodb');

const uri = MONGO_URL;
const client = new MongoClient(uri);

const baseUrl = 'https://www.bitmex.com/api/v1/instrument';

async function fetchData(start) {
    try {
        const response = await axios.get(baseUrl, {
            params: {
                count: 1000,
                start: start
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null; // Return null in case of an error
    }
}

async function storeData(data) {
    const database = client.db("bitmexData");
    const collection = database.collection("symbols");
    if (data.length > 0) {
        const result = await collection.insertMany(data.map(item => ({
            symbol: item.symbol,
        })
        ));
        console.log(`${result.insertedCount} documents were inserted`);
    }
}

async function run() {
    try {
        await client.connect();
        let start = 0;
        let data;
        do {
            data = await fetchData(start);
            if (data && data.length > 0) {
                await storeData(data);
                start += 1000; 
            }
        } while (data && data.length > 0);
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

run();
