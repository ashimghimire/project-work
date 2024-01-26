
const cryptoJs= require("crypto-js");

let crypto;
        try {
        crypto = require('node:crypto');
        } catch (err) {
        console.error('crypto support is disabled!');
        }



const createKey=()=>{
    const key=crypto.randomBytes(32);
    return key;
}

function encrypt(text,key) {
    var ciphertext = cryptoJs.AES.encrypt(text, key).toString();
    return ciphertext;

   }

const decrypt=(key,message)=>{
    var bytes  = cryptoJs.AES.decrypt(message, key);
    var originalText = bytes.toString(cryptoJs.enc.Utf8);
    return originalText;
}

module.exports={
    createKey,
    decrypt,
    encrypt
}

