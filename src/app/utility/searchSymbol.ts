const MONGO_URL = "mongodb+srv://crypto:rQmQkouPuOIiuZP2@cryptograph.s1z9wgi.mongodb.net/?retryWrites=true&w=majority&appName=Cryptograph";

const { MongoClient } = require('mongodb');

const uri = MONGO_URL;
const client = new MongoClient(uri);

function searchSymbol(symbol: string) {
    const database = client.db("bitmexData");
    const collection = database.collection("symbols");
    if (!symbol) {
        return collection.find().limit(10).toArray();
    }

    return collection.find({ symbol: { $regex: new RegExp(symbol, 'i') } }).toArray();
}

export default searchSymbol;