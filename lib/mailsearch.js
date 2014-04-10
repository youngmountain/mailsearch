/*
 * mailsearch
 * https://github.com//mailsearch
 *
 * Copyright (c) 2014 
 * Licensed under the MIT license.
 */

'use strict';

var Imap = require('imap'),
    MailParser = require('mailparser').MailParser,
    imap = null,
    Q = require('q');

var MailSearch = function(config) {

  if(!config) {
    throw new Error('You must provide a imap configuration object.');
  }

  if(typeof config !== 'object') {
    throw new Error('Your imap configuration must be an object.');
  }

  this.imapConfig = config;
};

MailSearch.prototype.search = function(mailbox, searchParams) {
  mailbox = mailbox || 'INBOX';

  searchParams = searchParams || ['UNSEEN'];

  var deferred = Q.defer();

  imap = new Imap( this.imapConfig );

  function openInbox(cb) {
    imap.openBox(mailbox, false, cb);
  }

  imap.once('ready', function () {
    var mailList = [];
    openInbox(function (err) {
      if (err) {
        deferred.reject(new Error(err));
      }

      imap.search(searchParams, function(err, results) {

        if (err) {
          deferred.reject(new Error(err));
        }

        if (results.length === 0) {
          deferred.resolve(mailList);
          return imap.end();
        }

        // flag to indicate the last mail.
        // reason: fetch end event is fired before parser end
        var isLastMail = false;

        var f = imap.fetch(results, { bodies: '' });
        f.on('message', function(msg) {

          var parser = new MailParser();

          parser.on('end', function (mail) {

            mailList.push(mail);

            if (isLastMail) {
              deferred.resolve(mailList);
            }
          });

          msg.on('body', function(stream) {
            stream.pipe(parser);
          });

        });

        f.once('error', function(err) {
          console.log('Fetch error: ' + err);
          deferred.reject(new Error(err));
        });

        f.once('end', function() {
          isLastMail = true;
          imap.end();
        });

      });
    });
  });

  imap.on('error', function (err) {
    deferred.reject(new Error(err));
  });

  imap.connect();

  return deferred.promise;
};

module.exports = MailSearch;
