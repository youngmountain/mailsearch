'use strict';

var Imap = require('imap'),
    MailParser = require('mailparser').MailParser,
    imap = null,
    env = process.env.NODE_ENV || 'development',
    _ = require('lodash'),
    Q = require('q');

var MailSearch = function(config) {

  this.config = require('./env/' + env);
  // Extend configuration
  this.config = _.extend(this.config, config);
};

MailSearch.prototype.search = function() {

  var deferred = Q.defer();
  var that = this;

  imap = new Imap( this.config.imap );

  function openInbox(cb) {
    imap.openBox(that.config.mailbox, false, cb);
  }

  imap.once('ready', function () {
    var mailList = [];
    openInbox(function (err) {
      if (err) {
        deferred.reject(new Error(err));
      }

      imap.search(that.config.searchParams, function(err, results) {

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
