const { MongoClient } = require("mongodb");
const uri = require("./atlas_uri"); // Assuming you have this in your project
const dbname = "bank";
const client = new MongoClient(uri);

const accounts = client.db("bank").collection("accounts");
const transfers = client.db("bank").collection("transfers");

let account_id_sender = "MDB574189300";
let account_id_reciever = "MDB7902345";
let transaction_amount = 100;

const connectToDatabase = async () => {
  try {
    await client.connect();
    console.log(`Connected to ${dbname}`);
  } catch (err) {
    console.log("Error connecting to database\n", err);
  }
};

const transferFunds = async () => {
  const session = client.startSession();

  try {
    await connectToDatabase();

    // Start the transaction
    const transactionResults = await session.withTransaction(async () => {
      const updateSenderResults = await accounts.updateOne(
        { account_id: account_id_sender },
        { $inc: { balance: -transaction_amount } },
        { session }
      );
      console.log(
        `Sender account matched: ${updateSenderResults.matchedCount}`
      );

      if (
        updateSenderResults.matchedCount === 0 ||
        updateSenderResults.modifiedCount === 0
      ) {
        throw new Error("Sender account not found or insufficient funds.");
      }

      const updateReceiverResults = await accounts.updateOne(
        { account_id: account_id_reciever },
        { $inc: { balance: transaction_amount } },
        { session }
      );
      console.log(
        `Receiver account matched: ${updateReceiverResults.matchedCount}`
      );

      if (updateReceiverResults.matchedCount === 0) {
        throw new Error("Receiver account not found.");
      }

      // Optionally, you can log this transaction in a 'transfers' collection
      const transferLog = {
        sender: account_id_sender,
        receiver: account_id_reciever,
        amount: transaction_amount,
        date: new Date(),
      };
      await transfers.insertOne(transferLog, { session });

      console.log("Transaction completed successfully.");
    });

    if (transactionResults) {
      console.log("Transaction committed.");
    } else {
      console.log("Transaction aborted.");
    }
  } catch (err) {
    console.log("Transaction failed:", err);
    await session.abortTransaction();
  } finally {
    await session.endSession();
    await client.close();
  }
};

transferFunds();
