var requirejs = require('requirejs');
var assert = require('assert');
var should = require('should');

requirejs.config({
    baseUrl: 'app'
});

describe('Account Model', function() {

    // Load modules with requirejs before tests
    var Account;
    before(function(done) {
        requirejs(['model/account'], function(account) {
            Account = account;
            done();
        });
    });

    describe('#Instantiation', function(){
        it('should have all expected properties', function(){
            var acc = new Account();
            acc.should.have.property('_transactions');
            
        });

        it('should have all expected prototype functions', function(){
            var acc = new Account();
            acc.should.have.property('addTransaction');
            acc.should.have.property('getTransactions');
            acc.should.have.property('balance');
        });
    });

    describe('#Functions', function(){
        it('should be able to create an account', function(){
            var acc = new Account(1000);
            acc.getTransactions().should.have.length(1);

            acc = new Account();
            acc.getTransactions().should.have.length(1);
        });

        it('should be able to calculate final balance', function(){
            var acc = new Account(1000);
            acc.balance().should.equal('$1000.00');

            acc.addTransaction(-1000, 'BP', '', '');
            acc.balance().should.equal('$0.00');

            acc.addTransaction(1000.34, 'IT', '', '');
            acc.balance().should.equal('$1000.34');

            acc.addTransaction(1000.99, 'IT', '', '');
            acc.balance().should.equal('$2001.33');

            acc.addTransaction(0.001, 'IT', '', '');
            acc.balance().should.equal('$2001.33');

            acc.addTransaction(-0.031, 'IT', '', '');
            acc.balance().should.equal('$2001.30');
        });

        it('should be able to add transactions', function(){
            var acc = new Account(1000);
            acc.getTransactions().should.have.length(1);

            acc.addTransaction(-30, 'BP', '', '');
            acc.getTransactions().should.have.length(2);

            acc.addTransaction();
            acc.getTransactions().should.have.length(3);
        });

        it('should be able to get transactions by types', function(){
            var acc = new Account(1000);

            acc.addTransaction(-30, 'BP', '', '');
            acc.addTransaction(-30, 'BP', '', '');
            acc.addTransaction(-30, 'IT', '', '');

            acc.getTransactionsByTypes(['BP']).should.have.length(2);
            acc.getTransactionsByTypes(['IT']).should.have.length(1);
            acc.getTransactionsByTypes(['IT','BP']).should.have.length(3);
            acc.getTransactionsByTypes().should.have.length(0);
            acc.getTransactionsByTypes([]).should.have.length(0);
            acc.getTransactionsByTypes(['']).should.have.length(1);
        });

        it('should be able to get transactions by date range', function(){
            var acc = new Account(1000);

            acc.addTransaction(-30, 'BP', '03/08/2015', '');
            acc.addTransaction(-30, 'BP', '05/08/2015', '');
            acc.addTransaction(-30, 'IT', '05/09/2015', '');
            acc.addTransaction(-30, 'IT', '05/10/2015', '');

            acc.getTransactionsByDateRange('03/07/2015').should.have.length(4);        
            acc.getTransactionsByDateRange('03/08/2015').should.have.length(4);
            acc.getTransactionsByDateRange('03/09/2015').should.have.length(3);        
            acc.getTransactionsByDateRange('03/09/2015','05/09/2015').should.have.length(2); 
            acc.getTransactionsByDateRange('03/09/2015','05/11/2015').should.have.length(3);
            acc.getTransactionsByDateRange(null,'03/09/2015').should.have.length(1); 
            acc.getTransactionsByDateRange(null,'06/01/2015').should.have.length(4); 
            acc.getTransactionsByDateRange(null,'05/10/2015').should.have.length(4); 
        });
    });
});