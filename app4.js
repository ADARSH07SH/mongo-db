const { MongoClient } = require('mongodb');
const uri = require('./atlas_uri');
const { pipeline } = require('stream');
const { ADDRGETNETWORKPARAMS, BADFLAGS } = require('dns');
const client = new MongoClient(uri)

const main=async()=>{
    try {
      client.connect();
      console.log("connected to database");
      const user = client.db("bank").collection("accounts");
      // const user = client.db("sample_mflix").collection("movies")

      // let result = await user
      //   .find(
      //     { genres: "Drama", year: { $gt: 2014 }, languages: "English" },
      //     { title: 1, year: 1, _id: 0 } // Include only title and year, exclude _id
      //   )
      //   .sort({ year: 1 })
      //   .limit(10);

      // let result2 = await user.countDocuments({ year: { $in: [2005,2004,2001] } });

      // await result.forEach((doc) => {
      //      console.log(doc)
      // })

      // console.log(result2)

      // let results3 = await user
      //   .aggregate([
      //     { $match: { year: { $gt: 2013 } } },
      //     { $project: { title: 1, _id: 0, year: 1, new_year: 1 } },
      //     { $sort: { year: 1, title: 1 } },
      //     {
      //       $set: {
      //         new_year: { $subtract: [{ $toInt: "$year" }, 2023] },
      //       },
      //     },
      //   ])
      //   .limit(5);

      // await results3.forEach((doc) => {
      //     console.log(doc)
      // })
      // let result = await user.findOne({});
      // console.log(result);

      // await user.createIndex({ birthdate: 1 })

      // console.log(await user.indexes())

      // let r1 = await user
      //   .find({ birthdate: { gt: new Date("1969-02-04T00:00:00.000+00:00") } })
      //   .explain();
      // console.log(await r1)

      // console.log(await user.find({username:"fmiller"}))

      // console.log(await user.createIndex({ title: "text", plot: "text" }))
      // console.log(await user.indexes())
      // let reu4 = await user.find(
      //   { $text: { $search: "man" } },
      //   { _id: 1 }
      // );
      // await reu4.forEach((doc)=>{console.log(doc)})

      // await user.createIndex({ title: "text", plot:"text" });
      // await console.log(await user.indexes())
      // let resu = await user.find({ $title: { $search: "man" } });
      // await resu.forEach((doc)=>{ console.log(doc)})

      // $metadata

      // console.log(await user.indexes());
      // let r4 = await user.find({ $text: { $search: "Sophia " } });
      // await r4.forEach((doc)=>{console.log(doc)})
      // // console.log(await user.findOne())
      // let results4 = await user.find({ name: { $search: "Mercury" } });
      // await results4.forEach((doc)=>{console.log(doc)})
      // console.log(await user.dropIndex("name_text"));

      // console.log(await user.createIndex({name:"text"}))

      //  $$root
      
      console.log("-----------------------------------------------------");
      let res1 = await user.findOne({ account_id: "MDB574189300" });
      await console.log(res1);
      console.log("-----------------------------------------------------");
      let res2 = await user.findOne({ account_id: "MDB7902345" });
      await console.log(res2);

      const session = await client.startSession();

      try {
        session.withTransaction(async () => {
          user.updateOne(
            { account_id: "MDB574189300" },
            { $inc: { balance: -30 } }
          );
          user.updateOne(
            { account_id: "MDB7902345" },
            { $inc: { balance: 30 } }
          );
        })
        
      } catch (err) {
        console.log(err)
      } finally {
        await session.endSession();
      }
      


      console.log("-----------------------------------------------------");
      let res3 = await user.findOne({ account_id: "MDB574189300" });
      await console.log(res3);
      console.log("-----------------------------------------------------");
      let res5 = await user.findOne({ account_id: "MDB7902345" });
      await console.log(res5);




    } catch (err) {
        console.log(err)
    } finally {
        client.close()
}
}

main();