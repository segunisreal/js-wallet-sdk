const {createWallet} = require("../functions/create_address");


exports.createWallet = async (req, res, next) => {
  try {
    const body = req.body
    const { coin, network_type } = body;
    const wallet = await createWallet(coin, network_type);
    const success = wallet.success
    res.status(success === true ? 200 : 400).json(wallet);
  } catch (error) {
    next(error);
  }
};