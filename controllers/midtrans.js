const {Cart, User, Product, Customer} = require('../models')
const Sequelize = require('sequelize')
const sequelize = new Sequelize('ohana_coffee', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres'
});
const queryInterface = sequelize.getQueryInterface();
const midtransClient = require('midtrans-client');

const getToken = async (req, res, next) => {
  try {
    let token
    let snap = new midtransClient.Snap({
      
      isProduction : false,
      serverKey : 'SB-Mid-server-AFyNyJPiSzwRapG9W-4TGLMG'
    });
    
    let {UserId, products, CustomerId, total} = req.body
  
    const orderId = `ORDER-${new Date().getTime()}`
    
    const guest = await Customer.findOne({where: {firstname: 'guest'}})
    
    let customerName = ""
    
    if(CustomerId) {
      const customer = await Customer.findByPk(CustomerId)
      customerName = customer.firstname
    } else {
      CustomerId = guest.id
      customerName = guest.firstname
    }

    let convertProductToArray = Object.values(products)
    console.log(convertProductToArray);
    let cartArray = []
    convertProductToArray.forEach( async e => {
        cartArray.push({UserId, ProductId: e.id, CustomerId, orderId, total: e.qty, status: 'waiting for payment', createdAt: new Date(), updatedAt: new Date()})
    });

    await queryInterface.bulkInsert('Carts', cartArray, {})
    // const groupProduct = await Cart.findAll({where: {orderId}, group: ['ProductId', '"Product"."id"'], attributes: ['ProductId', [Sequelize.fn('COUNT', 'ProductId'), 'qty']], include: [{
    //   model: Product,
    //   attributes: ['name', 'price']
    // }]})
    let itemDetails = []
    let gross_amount = 0
    convertProductToArray.forEach(e => {
      itemDetails.push({id: e.id, name: e.name, price: e.price, quantity: e.qty})
      gross_amount += e.qty * e.price
    });

    let parameter = {
      "transaction_details": {
        "order_id": orderId,
        "gross_amount": gross_amount
      },
      "customer_details": {
        "first_name": customerName,
      },
      "item_details": itemDetails,
      "callbacks": {
        "finish": "http://localhost:8080/"
      }
    };
    // console.log(parameter);
  
    const transaction = await snap.createTransaction(parameter)
    token = transaction.token;
    res.status(200).json({transaction_token: token})
    
  } catch (error) {
    console.log(error);
    next(error)
  }
}
	

module.exports = getToken