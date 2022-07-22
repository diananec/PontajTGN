import { sendEmail } from './send-email';

sendEmail(
    'user@domain.com',
       'We need your feedback',
    'UserName, we need 2 minutes of your time to fill this quick survey [link]',
 { cc: 'user@domain.com; user2@domain.com; userx@domain1.com' }
).then(() => {
    console.log('Your message was successfully sent!');
});