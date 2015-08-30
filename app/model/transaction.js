'use strict';

define(['moment'], function(moment) {
	/**
	 * private constants
	 */
	var validType = ['FT','BP','IT'],
		notApplicableType = '';

	var Transaction = function(amount, type, date, info){
		this.setAmount(amount);
		this.setType(type);
		this.setDate(date);
		this.setInfo(info);
	}

	Transaction.prototype.setAmount = function(amount){
		if(parseFloat(amount)){
			this._amount = parseFloat(amount);
		}else{
			this._amount = 0;
		}
	}

	Transaction.prototype.getAmount = function(){
		return this._amount;
	}

	Transaction.prototype.setType = function(type){
		if(validType.indexOf(type) === -1){
			this._type = notApplicableType;
		}else{
			this._type = type;
		}
	}

	Transaction.prototype.getType = function(){
		return this._type;
	}

	Transaction.prototype.setDate = function(date){
		if(moment(new Date(date)).isValid()){
			this._date = new Date(date);
		}else{
			this._date = '';
		}
	}

	Transaction.prototype.getDate = function(){
		return this._date;
	}

	Transaction.prototype.getInfo = function(){
		return this._info;
	}

	Transaction.prototype.setInfo = function(info){
		this._info = info;
	}

	/**
	 * Pretty print transaction object to readable text (if needed)
	 */
	Transaction.prototype.toReadableText = function(){
		var text = '',
			_this = this,
			amount = parseFloat(Math.floor(_this._amount * 100) / 100).toFixed(2);

		if(amount > 0){
			text = text + '+';
		}

		text = text + amount;

		text = text + ',';
		if(typeof _this._type !== 'undefined'){
			text = text + _this._type;
		}

		text = text + ',';
		if(typeof _this._date !== 'undefined'){

			if(moment(new Date(_this._date)).isValid()){
				text = text + moment(new Date(_this._date)).format('MM/DD/YYYY');
			}
			 
		}
		text = text + ',';
		if(typeof _this._info !== 'undefined'){
			text = text + _this._info;
		}
		return text;
	}

	return Transaction;

});
