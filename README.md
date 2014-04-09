# node-gmail-example

A Simple node-imap and mailparser example

##Usage

    var MailSearch = require('mailsearch');

    var imapConfig = {
      user: 'hans.wurst@gmail.com',
      password: 'Zwiebelrostbraten',
      host: 'imap.gmail.com',
      port: 993,
      tls: true
    }

    var ms = new MailSearch( imapConfig );
    ms.search('INBOX', [ 'UNSEEN', ['FROM', 'ifttt.com'] ]).then(function(mails) {
      console.log('Total Inbox Count: :', mails.length);
    });


## License
Copyright (c) 2014 . Licensed under the MIT license.
