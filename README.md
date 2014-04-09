# node-gmail-example

A Simple node-imap and mailparser example

##Usage

    var MailSearch = require('./mailSearch');

    var search = new MailSearch({
      searchParams: [ 'UNSEEN' ]
    });
    
    search.search().then(function(mails) {
      console.log('Total Inbox Count: :', mails.length);
    });


## License
Copyright (c) 2014 . Licensed under the MIT license.
