const crypto = require('crypto');

const generateMD5 = (plain) => {
    let generatedCheckSum = crypto.createHash('md5').update(plain).digest("hex");
    return generatedCheckSum;
}

const verifyMD5 = (hash,plain) =>  {
    let generatedCheckSum = crypto.createHash('md5').update(plain).digest("hex");
    if(generatedCheckSum == hash)
        return true ;
    else
        return false ;
}

module.exports = {
    verifyMD5,
    generateMD5
}
