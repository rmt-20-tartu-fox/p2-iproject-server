const midtransClient = require("midtrans-client");
const midtrans = require("../apis/midtrans");
// Create Snap API instance
// let snap = new midtransClient.Snap({
//   // Set to true if you want Production Environment (accept real transaction).
//   isProduction: false,
//   serverKey: `${process.env.SERVER_KEY}`,
// });
// console.log(">>>>");
const getSnapToken = async (req, res, next) => {
  try {
    console.log("<<<<");
    let snap = new midtransClient.Snap({
      // Set to true if you want Production Environment (accept real transaction).
      isProduction: false,
      serverKey: `${process.env.SERVER_KEY}`,
    });
    // console.log(">>>>");
    let { price, first_name, last_name, email, quantity, itemName } = req.body;
    let parameter = {
      transaction_details: {
        order_id: `${new Date()}`,
        gross_amount: price * quantity,
      },
      credit_card: {
        secure: true,
      },
      item_details: {
        name: `${itemName}`,
        price: price,
        quantity: quantity,
      },
      customer_details: {
        first_name: first_name,
        last_name: last_name,
        email: email,
        // phone: "08111222333",
      },
    };
    let token = await midtrans.post("/snap/v1/transactions", parameter, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa(process.env.SERVER_KEY + ":")}`,
      },
    });
    res.status(200).json(token.data);
  } catch (error) {
    // console.log(error.messages);
    next(error);
  }
};

const getDetailTransaction = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

// snap.createTransaction(parameter).then((transaction) => {
//   // transaction token
//   let transactionToken = transaction.token;
//   console.log("transactionToken:", transactionToken);
// });

module.exports = {
  getSnapToken,
};
