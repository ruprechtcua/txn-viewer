'use strict';

define(['jquery', 'model/transaction', 'moment'], function($, Transaction, moment) {
	/**
	 * Account constructor, also serves as account opening with init balance
	 */
	function Account(balance){
		var initialTransaction = new Transaction(balance);
		this._transactions = [initialTransaction];
	}

	/**
	 * Adds a transaction to this Account
	 */
	Account.prototype.addTransaction = function(amount, type, date, description){
		this._transactions.push(new Transaction(amount, type, date, description));
	}

	/**
	 * Return all transactions 
	 */
	Account.prototype.getTransactions = function(){
		return this._transactions;
	};

	/**
	 * Return all transactions by types
	 * assumption: if types is not defined, no txns will be returned
	 */
	Account.prototype.getTransactionsByTypes = function(types){
		var txns = this._transactions,
			filtered = [];

		for (var i = 0; i < txns.length; i++) {
			var t = txns[i];
			if(types){
				if(types.indexOf(t.getType()) !== -1){
					filtered.push(t);
				}
			}
		};
		return filtered;
	}

	/**
	 * Return all transactions by types
	 * assumption: if from and to date is not defined, return all txns with valid dates
	 * assumption: date from and to are inclusive
	 */
	Account.prototype.getTransactionsByDateRange = function(from, to){

		var fromDate, toDate;
		if(moment(new Date(from)).isValid()){
			fromDate = new Date(from);
		}

		if(moment(new Date(to)).isValid()){
			toDate = new Date(to);
		}

		var txns = this._transactions,
			filtered = [];

		for (var i = 0; i < txns.length; i++) {
			var t = txns[i];
			if(!moment(new Date(t.getDate())).isValid()){
				continue;
			}
			if(fromDate && fromDate > t.getDate()){
				continue;
			}
			if(toDate && toDate < t.getDate()){
				continue;
			}
			filtered.push(t);
		};

		return filtered;

	}

	/**
	 * Process balance with current transactions
	 */
	Account.prototype.balance = function(){
		var txns = this._transactions,
			balance = 0;
		for (var i = txns.length - 1; i >= 0; i--) {
			balance = balance + txns[i].getAmount();
		};
		return '$'+parseFloat(Math.floor(balance * 100) / 100).toFixed(2);
	}

    return Account;
});
