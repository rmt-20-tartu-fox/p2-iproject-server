const midtransClient = require("midtrans-client");
const { Transaction } = require("../models");

const getSnapToken = async (req, res, next) => {
  try {
    let snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.SERVER_KEY,
    });

    let email = req.userLogin.email;
    let { price, first_name, last_name, quantity, itemName } = req.body;
    if (quantity <= 0 || !quantity) {
      throw new Error("QUANTITY_REQUIRED");
    }
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
    const result = await snap.createTransaction(parameter);
    res.status(200).json(result);
  } catch (error) {
    console.log(error)
    next(error);
  }
};

const transaction = async (req, res, next) => {
  try {
    let { BookId, order_id, transaction_status } = req.body;
    let newStatus = await Transaction.create({
      status: transaction_status,
      order_id: order_id,
      UserId: req.userLogin.id,
      BookId: BookId,
    });
    res.status(201).json(newStatus);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSnapToken,
  transaction,
};
