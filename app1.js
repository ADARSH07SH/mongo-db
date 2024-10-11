const { MongoClient } = require("mongodb");
const uri = require("./atlas_uri");

const client = new MongoClient(uri);
const dbname = "blog";

const connectToDatabase = async () => {
  try {
    await client.connect();
    console.log(`connected to the ${dbname} database`);
  } catch (err) {
    console.error(`error connecting to database :${err}`);
  }
};

const sampleData = {
  _id: 7,
  name: "adarsh",
  class: 7,
  hobbies: ["swimming"],
};

const sampleData2 = [
  {
    name: "John Doe",
    age: 20,
    grade: "A",
    subjects: ["Math", "Physics", "Chemistry"],
    address: {
      street: "123 Main St",
      city: "New York",
      zip: "10001",
    },
  },
  {
    name: "Jane Smith",
    age: 19,
    grade: "B",
    subjects: ["English", "History", "Geography"],
    address: {
      street: "456 Oak St",
      city: "San Francisco",
      zip: "94105",
    },
  },
  {
    name: "Michael Johnson",
    age: 21,
    grade: "A",
    subjects: ["Computer Science", "Math", "Art"],
    address: {
      street: "789 Maple St",
      city: "Los Angeles",
      zip: "90001",
    },
  },
  {
    name: "Emily Davis",
    age: 22,
    grade: "C",
    subjects: ["Biology", "Chemistry", "English"],
    address: {
      street: "321 Pine St",
      city: "Chicago",
      zip: "60601",
    },
  },
  {
    name: "Daniel Garcia",
    age: 18,
    grade: "B",
    subjects: ["Math", "Economics", "Computer Science"],
    address: {
      street: "654 Cedar St",
      city: "Miami",
      zip: "33101",
    },
  },
  {
    name: "Sophia Martinez",
    age: 20,
    grade: "A",
    subjects: ["Physics", "Math", "Astronomy"],
    address: {
      street: "987 Birch St",
      city: "Austin",
      zip: "73301",
    },
  },
  {
    name: "Christopher Lee",
    age: 23,
    grade: "C",
    subjects: ["History", "Sociology", "Political Science"],
    address: {
      street: "135 Elm St",
      city: "Seattle",
      zip: "98101",
    },
  },
  {
    name: "Olivia Wilson",
    age: 21,
    grade: "B",
    subjects: ["Biology", "Math", "Chemistry"],
    address: {
      street: "246 Spruce St",
      city: "Boston",
      zip: "02101",
    },
  },
];

const documentsToFind = { _id: 7 };
// const documentsToFind = { grade: { $in: ['A'] } };
const update1 = { $push: { hobbies: ["reading"] } };

const delete1 = { grade: { $in: ["A"] } };

const main = async () => {
  try {
    await connectToDatabase();
    const databaseList = await client.db().admin().listDatabases();
    databaseList.databases.forEach((db) => {
      console.log(`-${db.name}`);
    });

    const db = client.db("blog");
    const collection = db.collection("new");

    // let result2 = await collection.insertMany(sampleData2)
    // console.log(result2)

    // let result1 = await collection.insertOne(sampleData);
    // console.log(result1)

    // let result3 = await collection.find(documentsToFind);
    // await result3.forEach((doc) => { console.log(doc) })

    // let result4 = await collection.updateMany(documentsToFind, update1)
    // await console.log(result4)

    // {
    //     let result5 = await collection.deleteOne(documentsToFind)
    //     await console.log(result5)
    // }

    // {
    //     let result6 = await collection.deleteMany(delete1)
    //     await console.log(result6)
    // }
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
};

main();
