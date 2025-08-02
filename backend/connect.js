import 'dotenv/config'

import { MongoClient } from "mongodb";

// Replace the uri string with your connection string
const uri = process.env.MONGODB_URI

const client = new MongoClient(uri);

async function initiateDb() {

    const db = client.db('Calendar');

    return { db: db, client: client }

}

export { initiateDb }
