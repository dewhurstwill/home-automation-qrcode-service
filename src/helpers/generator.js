const qrcode = require('qrcode');

function generateQrCode(inputString) {
  return new Promise((resolve, reject) => {
    qrcode.toDataURL(inputString, (err, code) => {
      if (err) reject(err);
      resolve(code);
    });
  });
}

module.exports = generateQrCode;
