
const nodemailer = require('nodemailer');
const {google} = require('googleapis');
const { oauth2 } = require('googleapis/build/src/apis/oauth2');

const CLIENT_ID = '888475001773-0l0h6m4urjjuv5p6mqn6rh48vhnlqn6o.apps.googleusercontent.com'
const CLIENT_SECERET = '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'
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'
const REFRESH_TOKEN = '1//04PpLC8rVPmFRCgYIARAAGAQSNwF-L9IrgY2DrZ8-Ueomns_-cooH7-RQlLYeYapbBJRl47ci8xvRQ4xF_MsVs6mzOmr8p-HZvWw'

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID,CLIENT_SECERET,REDIRECT_URI)

oAuth2Client.setCredentials({refresh_token : REFRESH_TOKEN})


const EmailFunel = async(req, res) => {
  
try{
const accessToken = await oAuth2Client.getAccessToken()
const output = `
<p>${req.body.content}</p>

`;

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
      type: 'OAuth2',
      user: 'darkfanta32@gmail.com',
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECERET,
      refreshToken: REFRESH_TOKEN,
      accessToken: accessToken,
  }
});

// setup email data with unicode symbols
let mailOptions = {
  from: req.body.eHeader+ ' <' + req.body.fromEmail + '>', // sender address
  to: req.body.toEmail, // list of receivers
  subject: 'Node Contact Request', // Subject line
  text: 'Hello world?', // plain text body
  html: output // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
      return console.log(error);
  }
  console.log('Message sent: %s', info.messageId);   
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

  res.render('sentform');
});

  }catch(error){
    return error 
  }


}


module.exports = EmailFunel