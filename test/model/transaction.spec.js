var requirejs = require('requirejs');
var assert = require('assert');
var should = require('should');

requirejs.config({
    baseUrl: 'app'
});

describe('Transaction Model', function() {

    // Load modules with requirejs before tests
    var Transaction;
    before(function(done) {
        requirejs(['model/transaction'], function(transaction) {
            Transaction = transaction;
            done();
        });
    });

    describe('#Instantiation', function(){
        it('should have all expected properties', function(){
            var txn = new Transaction();
            txn.should.have.property('_amount');
            txn.should.have.property('_type');
            txn.should.have.property('_date');
            txn.should.have.property('_info');
            
        });

        it('should have all expected prototype functions', function(){
            var txn = new Transaction();
            txn.should.have.property('getAmount');
            txn.should.have.property('getType');
            txn.should.have.property('getDate');
            txn.should.have.property('setAmount');
            txn.should.have.property('setType');
            txn.should.have.property('setDate');
            txn.should.have.property('toReadableText');
        });

        it('should have all the values set', function(){
            var txn = new Transaction(100, 'BP', '1/1/2015', 'hello');
            txn.getAmount().should.equal(100);
            txn.getType().should.equal('BP');
            txn.getDate().getDate().should.equal(1);
            txn.getInfo().should.equal('hello');
        });
    });

    describe('#Functions', function(){
        it('should return the right amount if valid', function(){
            var txn = new Transaction(300.00);
            txn.getAmount().should.equal(300.00);

            txn = new Transaction(-321);
            txn.getAmount().should.equal(-321);

            txn = new Transaction('-321');
            txn.getAmount().should.equal(-321);

            txn = new Transaction();
            txn.getAmount().should.equal(0);
        });

        it('should return amount 0 if invalid', function(){
            var txn = new Transaction(0);
            txn.getAmount().should.equal(0);

            txn = new Transaction('abc');
            txn.getAmount().should.equal(0);

            txn = new Transaction('');
            txn.getAmount().should.equal(0);

            txn = new Transaction();
            txn.getAmount().should.equal(0);
        });

        it('should return the right type if valid', function(){
            var txn = new Transaction(300.00, 'IT');
            txn.getType().should.equal('IT');

            txn = new Transaction(300.00, 'FT');
            txn.getType().should.equal('FT');

            txn = new Transaction(300.00, 'BP');
            txn.getType().should.equal('BP');
        });

        it('should return an empty type if invalid', function(){
            var txn = new Transaction(300.00, '');
            txn.getType().should.equal('');

            txn = new Transaction(300.00, 'FTFF');
            txn.getType().should.equal('');

            txn = new Transaction(300.00, 'BPBP');
            txn.getType().should.equal('');
        });

        it('should return a date if valid', function(){
            var txn = new Transaction(300.00, 'FT', '1/1/15');
            txn.getDate().getDate().should.equal(1);

        });

        it('should return an empty date if invalid', function(){
            var txn = new Transaction(300.00, 'FT', '');
            txn.getDate().should.equal('');

            txn = new Transaction(300.00, 'FT', '31/8/15');
            txn.getDate().should.equal('');

            txn = new Transaction(300.00, 'FT', 'abc');
            txn.getDate().should.equal('');
        });

        it('should return a readable text', function(){
            var txn = new Transaction(300.00, 'FT', '');
            txn.toReadableText().should.equal('+300.00,FT,,');

            txn = new Transaction(-300.00, 'FT', '');
            txn.toReadableText().should.equal('-300.00,FT,,');

            txn = new Transaction(-300.00, 'FT', 'abc', 'info');
            txn.toReadableText().should.equal('-300.00,FT,,info');

            txn = new Transaction(-300.00, 'FT', '1/1/2015', 'info');
            txn.toReadableText().should.equal('-300.00,FT,01/01/2015,info');
        });
    });
});