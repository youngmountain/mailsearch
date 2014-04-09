'use strict';

var MailSearch = require('../');

var imapConfig = {
  user: 'hans.wurst@gmail.com',
  password: 'Zwiebelrostbraten',
  host: 'imap.gmail.com',
  port: 993,
  tls: true
}

var ms = new MailSearch(imapConfig);

ms.search('INBOX', ['ALL']).then(function(mails) {
  console.log('Total Inbox Count: :', mails.length);
});
