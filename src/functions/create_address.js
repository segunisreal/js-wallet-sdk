const { BtcWallet, UsdtWallet, LtcWallet } = require("@okxweb3/coin-bitcoin");
const {EthWallet} = require("@okxweb3/coin-ethereum");
const {SolWallet} = require("@okxweb3/coin-solana");
const {WaxWallet} = require("../../packages/coin-eos");
const {TrxWallet} = require("../../packages/coin-tron");


const getPrivateKey = async (coin) => {
    let wallet, privateKey = null

    if(coin === 'btc'){
        wallet = new BtcWallet()
        privateKey = await wallet.getRandomPrivateKey();
    }

    if(coin === 'eth'){
        wallet = new EthWallet()
        privateKey = await wallet.getRandomPrivateKey();
    }

    if(coin === 'sol'){
        wallet = new SolWallet()
        privateKey = await wallet.getRandomPrivateKey();
    }

    if(coin === 'usdt'){
        wallet = new UsdtWallet()
        privateKey = await wallet.getRandomPrivateKey();
    }

    if(coin === 'ltc'){
        wallet = new LtcWallet()
        privateKey = await wallet.getRandomPrivateKey();
    }

    if(coin === 'eos'){
        wallet = new WaxWallet()
        privateKey = await wallet.getRandomPrivateKey();
    }

    if(coin === 'tron'){
        wallet = new TrxWallet()
        privateKey = await wallet.getRandomPrivateKey();
    }

    return {wallet, privateKey}
}

const createWallet = async (coin, network_type = "") => {
    const {wallet, privateKey} = await getPrivateKey(coin)

    let success = false
    let detail = 'Wallet address could not be generated'
    let data = {}
    let validAddress = false

    if(privateKey){
        let params = {
            privateKey: privateKey,
        }
        if(network_type){
            params['addressType'] = network_type
        }
        let wallet_response = await wallet.getNewAddress(params);
        if(wallet_response.address) {
            let validateAddressParams = {
                address: wallet_response.address
            }
            validAddress = await wallet.validAddress(validateAddressParams);
            if(validAddress.isValid === true){
                success = true
                detail = 'Wallet address generated successfully'
                data = wallet_response
                data['privateKey'] = privateKey

            }
        }
    }

    return {
        'success': success,
        'detail': detail,
        'data': data,
    }

}

module.exports = {createWallet};