'use strict';

var MailSearch = require('../lib/mailsearch.js');
var assert = require('should');

describe('mailsearch', function () {

  it('should be awesome', function () {

    (function () {
      new MailSearch()
    }).should.throw('You must provide a imap configuration object.');

    (function () {
      new MailSearch('foo')
    }).should.throw('Your imap configuration must be an object.');

    (function () {

      var imapConfig = {
        user: 'hans.wurst@gmail.com',
        password: 'Zwiebelrostbraten',
        host: 'imap.gmail.com',
        port: 993,
        tls: true
      }

      new MailSearch(imapConfig)
    }).should.not.throw();

  });

});
