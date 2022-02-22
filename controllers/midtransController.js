const midtransClient = require("midtrans-client");
const { Transaction } = require("../models");
const midtrans = require("../apis/midtrans");

const getSnapToken = async (req, res, next) => {
  let snap = new midtransClient.Snap({
    isProduction: false,
    serverKey: process.env.SERVER_KEY,
  });
  try {
    // console.log(">>>>");
    let { price, first_name, last_name, email, quantity, itemName } = req.body;
    let parameter = {
      transaction_details: {
        order_id: `${Math.floor(Date.now() / 10)}`,
        gross_amount: price * quantity,
      },
      credit_card: {
        secure: true,
      },
      item_details: {
        name: itemName,
        price: price,
        quantity: quantity,
      },
      customer_details: {
        first_name: first_name,
        last_name: last_name,
        email: email,
      },
    };
    // let token = await midtrans.post("/snap/v1/transactions", parameter, {
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //     Authorization: `Basic ${btoa(process.env.SERVER_KEY + ":")}`,
    //   },
    // });
    const result = await snap.createTransaction(parameter);
    res.status(200).json(result);
  } catch (error) {
    // console.log(error.messages);
    next(error);
  }
};

const transaction = async (req, res, next) => {
  try {
    let { order_id, transaction_status } = req.query;

    let newStatus = await Transaction.create({
      status: transaction_status,
      order_id: order_id,
      UserId: req.userLogin.id,
    });
    res.status(200).json(newStatus);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSnapToken,
  transaction,
};
