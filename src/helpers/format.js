function buildVCard({
  firstName, lastName, companyName, jobTitle, addressFirstLine, city, county,
  postcode, country, phoneNumber, mobileNumber, faxNumber, emailAddress, website
}) {
  return `BEGIN:VCARD
VERSION:3.0
N:${lastName};${firstName}
FN:${firstName} ${lastName}
ORG:${companyName}
TITLE:${jobTitle}
ADR:;;${addressFirstLine};${city};${county};${postcode};${country}
TEL;WORK;VOICE:${phoneNumber}
TEL;CELL:${mobileNumber}
TEL;FAX:${faxNumber}
EMAIL;WORK;INTERNET:${emailAddress}
URL:${website}
END:VCARD`;
}
function buildText(text) { return text; }
function buildUrl(url) { return buildText(url); }
function buildEmail(address, subject, message) {
  return `MATMSG:TO:${address};SUB:${subject};BODY:${message};;`;
}
function buildSms(mobileNumber, message) {
  return `SMSTO:${mobileNumber}:${message}`;
}
function buildWifi(protocol, ssid, password = '', hidden = false) {
  const validProtocols = ['nopass', 'WEP', 'WPA'];
  if (!validProtocols.includes('protocol')) {
    console.log('Error');
  }
  return `WIFI:T:${protocol};S:${ssid};P:${password};H:${hidden};`;
}

module.exports = {
  buildText,
  buildUrl,
  buildEmail,
  buildSms,
  buildVCard,
  buildWifi
};
