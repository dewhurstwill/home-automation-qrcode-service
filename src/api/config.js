const Joi = require('joi');
const ExtendedJoi = Joi.extend(require('joi-phone-number'));

module.exports = {
  host: process.env.HOST || '',
  server: process.env.SERVER || '',
  serviceInfo: {
    microservice: process.env.NAME || 'QR Code Service',
    routes: [{
      path: '/api/v1/health',
      methods: ['GET'],
      description: 'Returns the health status of the service'
    }, {
      path: '/api/v1/info',
      methods: ['GET'],
      description: 'Returns useful information about the service'
    }, {
      path: '/api/v1/qrcode/vcard',
      methods: ['POST'],
      description: '',
      schema: {
        joi: Joi.object({
        }),
        POST: {
        }
      }
    }, {
      path: '/api/v1/qrcode/text',
      methods: ['POST'],
      description: '',
      schema: {
        joi: Joi.object({
          text: Joi.string().required(),
        }),
        POST: {
          text: 'Required, String, Freehand text field to put in the QR Code.'
        }
      }
    }, {
      path: '/api/v1/qrcode/url',
      methods: ['POST'],
      description: '',
      schema: {
        joi: Joi.object({
          url: Joi.string().uri().required(),
        }),
        POST: {
          url: 'Required, String, URL to generate the qrcode for.'
        }
      }
    }, {
      path: '/api/v1/qrcode/email',
      methods: ['POST'],
      description: '',
      schema: {
        joi: Joi.object({
          emailAddress: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
          subject: Joi.string().required(),
          message: Joi.string().required()
        }),
        POST: {
          emailAddress: 'Required, String, Email address to include in QRCode',
          subject: 'Required, String, Subject for email to include in QRCode',
          message: 'Required, String, Message for email body to include in QRCode'
        }
      }
    }, {
      path: '/api/v1/qrcode/sms',
      methods: ['POST'],
      description: '',
      schema: {
        joi: ExtendedJoi.object({
          mobileNumber: ExtendedJoi.string().phoneNumber().required(),
          message: ExtendedJoi.string().required()
        }),
        POST: {
          mobileNumber: 'Required, String, Phone number to include in QRCode',
          message: 'Required, String, Message for message body to include in QRCode'
        }
      }
    }, {
      path: '/api/v1/qrcode/wifi',
      methods: ['POST'],
      description: '',
      schema: {
        joi: Joi.object({
          protocol: Joi.string().required(),
          ssid: Joi.string().required(),
          password: Joi.string().allow(null, ''),
          hidden: Joi.boolean().required()
        }),
        POST: {
          protocol: 'Required, String, Wireless protocol the network uses. [nopass, WEP, WPA]',
          ssid: 'Required, String, SSID for the network',
          password: 'String, Password for the network [Can be left as a blank string]',
          hidden: 'Required, Boolean, Is the network hidden?'
        }
      }
    }],
    description: process.env.DESCRIPTION || '',
  }
}