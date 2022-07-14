const {
  buildText,
  buildUrl,
  buildEmail,
  buildSms,
  buildVCard,
  buildWifi
} = require('./format');
const generateQrCode = require('./generator');

module.exports = {
  buildText,
  buildUrl,
  buildEmail,
  buildSms,
  buildVCard,
  buildWifi,
  generateQrCode
};
