const { MongoClient } = require("mongodb")
const uri = require('./atlas_uri')
const client=new MongoClient(uri)

const connectToDatabase = async () => {
    try {
        await client.connect();
        console.log(`connected to database `)
    } catch (err) {
        console.log(err)
    }
}

const pipeline = [
  { $match: { balance: { $lt: 40000 } } },
  {
    $group: {
      _id: "$account_type",
      total_balance: { $sum: "$balance" },
      avg_balance: { $avg: "$balance" },
    },
  },
];

const pipeline2 = [
    { $match: { account_type: "Savings", balance: { $gt: 1000 } } },
    { $sort: { balance: -1 } },
    {$project:{_id:0,account_id:1,account_type:1,balance:1,usd_balance:{$multiply:["$balance",86]}}}
]
const main = async () => {
    try {
        connectToDatabase()
        const accounts = client.db("bank").collection("accounts");
        // let result = await accounts.aggregate(pipeline)
        // await result.forEach((doc) => { console.log(doc) })
        
        let result2 = await accounts.aggregate(pipeline2);
        await result2.forEach((doc)=>{console.log(doc)})
        

    } catch (err) {
        console.log(err)
    }
    finally {
        client.close();
    }
}

main();


    