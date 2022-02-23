const midtransClient = require('midtrans-client');

const midTrans = async (req, res, next) => {
  try {
    let {email, price} = req.body
    // Create Snap API instance
    let snap = new midtransClient.Snap({
      // Set to true if you want Production Environment (accept real transaction).
      isProduction: false,
      serverKey: 'SB-Mid-server-AGRDFCOSKSu61Eso6nCq4A2g'
    });

    let orderId = Math.floor(1000 + Math.random() * 100000).toString()
    let parameter = {
      transaction_details: {
        order_id: "YOUR-ORDERID-" + orderId,
        gross_amount: +price
      },
      credit_card: {
        secure: true
      },
      customer_details: {
        email: email,
      }
    };
    let snap1 = await snap.createTransaction(parameter)
    res.status(200).json(snap1)
  } catch (error) {
    res.status(500).json({message: 'internal server error'})
    console.log(error);
  }

}

module.exports = midTrans