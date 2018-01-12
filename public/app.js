const app = angular.module('QuipProQuo', []);

app.controller('MainController', ['$http', function($http) {

	this.word = 'hi';
	this.categories = []
	this.questions = []
	this.questionID = 0;
	this.answer = '';
	this.display = false;
	this.formData = {};
	this.category = 0;
	// this.showQuestion = 0;

// Get categories
	$http({
		method: 'GET',
		url: 'http://localhost:3000/categories'
	}).then(response => {
		console.log('Response: ', response);
		this.categories = response.data;
	}).catch(reject => {
		console.log('Reject: ', reject);
	});

// Get Questions
	$http({
		method: 'GET',
		url: 'http://localhost:3000/categories/1/questions'
	}).then(response => {
		console.log('Response: ', response);
		this.questions = response.data;
	}).catch(reject => {
		console.log('Reject: ', reject);
	});

	this.answer = () => {

		$http({
			method: 'POST',
			url: 'http://localhost:3000/categories/1/questions/' + this.questionID + '/answers',
			data: this.formData
		}).then(response => {
			console.log('Response ', response.data);
			this.answer = response.data;
		}).catch(reject => {
			console.log('Reject: ', reject);
		});

	};

	this.displayForm = (question) => {

		if (this.display == false) {

			this.display = true;
			this.questionID = question;
		}

		else {

			this.display = false;
		}
	};

	// this.category1 = () => {
  //
	// 	this.category = 1;
	// }
  //
	// this.category2 = () => {
  //
	// 	this.category = 2;
	// }
  //
	// this.category3 = () => {
  //
	// 	this.category = 3;
	// }

	this.pickQuestion = (question) => {

		this.questionID = question;
	}

}]);
