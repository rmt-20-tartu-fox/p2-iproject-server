const authorization = async (req, res, next) => {
  const userId = req.dataOnLogin.id;
  const transId = req.params.id;
  try {
    const findTrans = await Transaction.findOne({
      where: {
        id: transId,
        userId: userId,
      },
    });

    if (!findTrans) {
      throw {
        code: 403,
        name: "Forbidden_Access",
        message: "You are not authorized",
      };
    }

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { authorization };
