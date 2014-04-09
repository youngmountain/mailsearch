'use strict';

module.exports = {
  imap: {
    user: 'hans.wurst@gmail.com',
    password: 'Zwiebelrostbraten',
    host: 'imap.gmail.com',
    port: 993,
    tls: true
  },
  searchParams: [ 'UNSEEN', ['FROM', 'ifttt.com'] ],
  mailbox: 'INBOX'
};
