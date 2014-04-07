var Imap = require('imap'),
    MailParser = require('mailparser').MailParser,
    debug = require('./utils/debug'),
    imap = null,
    env = process.env.NODE_ENV || 'development';

var config = require('./env/' + env);

imap = new Imap( config );

function openInbox(cb) {
  imap.openBox('INBOX', false, cb);
}

imap.once('ready', function () {
  openInbox(function (err) {
    if (err) throw err;

    imap.search([ 'UNSEEN', ['SINCE', 'May 20, 2010'] ], function(err, results) {
      
      if (err) throw err;

      if (results.length === 0) {
        debug('Nothing to fetch');
        return imap.end();
      }
      
      var f = imap.fetch(results, { bodies: '' });
      
      f.on('message', function(msg, seqno) {

        var prefix = '(#' + seqno + ') ';

        var parser = new MailParser();
        parser.on('end', function (mail) {
          console.log('%s from:%s \tsubject:%s', prefix, mail.from[0].address, mail.subject);
        });
        
        msg.on('body', function(stream, info) {
          stream.pipe(parser);
        });

        
      });
      
      f.once('error', function(err) {
        console.log('Fetch error: ' + err);
      });
      
      f.once('end', function() {
        console.log('Done fetching all messages!');
        imap.end();
      });

    });
  });
});

imap.on('error', function (err) {
  debug(err);
});

imap.on('end', function () {
  debug('Connection ended');
});

imap.connect();
