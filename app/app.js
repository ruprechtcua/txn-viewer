'use strict';

define(['jquery', 'model/account'], function($, Account) {

	return {
		run: function(dataUrl){
			var _this = this,
				account;
			$.get(dataUrl, function(data) {
		        account = _this.parseData(data);

		        window.account = account;
		    });
		},

		/**
		 * Assumption: this is only for demo purposes, 
		 * we are not certain whether the data will come from a text file
		 */
		parseData: function(data){
			var lines = data.split('\n'),
				account;
			
			for (var i = 0; i < lines.length; i++) {
				var element = lines[i],
					itemPerElement = element.split(','),
					amount = itemPerElement[0],
					type = itemPerElement[1],
					date = itemPerElement[2],
					description = itemPerElement[3];

				//initial balance
				if(i == 0){
					account = new Account(amount);
				}else{
					account.addTransaction(amount, type, date, description);
				}
			};

			return account;
		}	    
	}
});
