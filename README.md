# mailsearch  [![Dependency Status][daviddm-url]][daviddm-image]


A Simple node-imap and mailparser example

## Install

```bash
$ npm install --save mailsearch
```

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

[daviddm-url]: https://david-dm.org/kwakayama/mailsearch.png?theme=shields.io
[daviddm-image]: https://david-dm.org/kwakayama/mailsearch