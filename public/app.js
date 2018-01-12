const app = angular.module('QuipProQuo', []);

app.controller('MainController', ['$http', function($http) {

	this.word = 'hi';
	this.categories = []
	this.questions = []

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

}]);
