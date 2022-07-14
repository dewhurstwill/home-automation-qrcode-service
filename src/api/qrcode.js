const express = require('express');
const config = require('./config');
const {
  buildText,
  buildUrl,
  buildEmail,
  buildSms,
  buildVCard,
  buildWifi,
  generateQrCode
} = require('../helpers');

const router = express.Router();

router.post('/generate/contact-card', async (req, res) => {
  const { schema } = config.serviceInfo.routes[2];
  try {
    const { text } = await schema.joi.validateAsync(req.body);
    const code = await generateQrCode(buildVCard(text));
    return res.json({ qrcode: code });
  } catch (err) {
    if (err && err.details && err.details[0].message) {
      return res.status(422).json({
        schema: config.serviceInfo.routes[2].schema.POST,
        message: err.details[0].message
      });
    }
    return res.status(422).json({ message: err });
  }
});

router.post('/generate/text', async (req, res) => {
  const { schema } = config.serviceInfo.routes[3];
  try {
    const { text } = await schema.joi.validateAsync(req.body);
    const code = await generateQrCode(buildText(text));
    return res.json({ qrcode: code });
  } catch (err) {
    if (err && err.details && err.details[0].message) {
      return res.status(422).json({
        schema: config.serviceInfo.routes[3].schema.POST,
        message: err.details[0].message
      });
    }
    return res.status(422).json({ message: err });
  }
});

router.post('/generate/url', async (req, res) => {
  const { schema } = config.serviceInfo.routes[4];
  try {
    const { url } = await schema.joi.validateAsync(req.body);
    const code = await generateQrCode(buildUrl(url));
    return res.json({ qrcode: code });
  } catch (err) {
    if (err && err.details && err.details[0].message) {
      return res.status(422).json({
        schema: config.serviceInfo.routes[4].schema.POST,
        message: err.details[0].message
      });
    }
    return res.status(422).json({ message: err });
  }
});

router.post('/generate/email', async (req, res) => {
  const { schema } = config.serviceInfo.routes[5];
  try {
    const { emailAddress, subject, message } = await schema.joi.validateAsync(req.body);
    const code = await generateQrCode(buildEmail(emailAddress, subject, message));
    return res.json({ qrcode: code });
  } catch (err) {
    if (err && err.details && err.details[0].message) {
      return res.status(422).json({
        schema: config.serviceInfo.routes[5].schema.POST,
        message: err.details[0].message
      });
    }
    return res.status(422).json({ message: err });
  }
});

router.post('/generate/sms', async (req, res) => {
  const { schema } = config.serviceInfo.routes[6];
  try {
    const { mobileNumber, message } = await schema.joi.validateAsync(req.body);
    const code = await generateQrCode(buildSms(mobileNumber, message));
    return res.json({ qrcode: code });
  } catch (err) {
    if (err && err.details && err.details[0].message) {
      return res.status(422).json({
        schema: config.serviceInfo.routes[6].schema.POST,
        message: err.details[0].message
      });
    }
    return res.status(422).json({ message: err });
  }
});

router.post('/generate/wifi', async (req, res) => {
  const { schema } = config.serviceInfo.routes[7];
  try {
    const {
      protocol,
      ssid,
      password,
      hidden
    } = await schema.joi.validateAsync(req.body);
    const code = await generateQrCode(buildWifi(protocol, ssid, password, hidden));
    return res.json({ qrcode: code });
  } catch (err) {
    if (err && err.details && err.details[0].message) {
      return res.status(422).json({
        schema: config.serviceInfo.routes[7].schema.POST,
        message: err.details[0].message
      });
    }
    return res.status(422).json({ message: err });
  }
});

module.exports = router;
