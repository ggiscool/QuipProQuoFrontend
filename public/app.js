const app = angular.module('QuipProQuo', []);

app.controller('MainController', ['$http', function($http) {

	this.word = 'hi';
	this.categories = []
	this.questions = []
	this.questionID = 0;
	this.questionContent = '';
	this.findanswer = [];
	this.display = false;
	this.formData = {upvote: 0};
	this.category = 0;
	this.viewAnswersModal = false
	this.currentquestion = false;
	this.loginForm = false;
	this.signUpForm = false;
	this.loggedIn = false;
	// this.showQuestion = 0;
	this.url = 'http://localhost:3000';
	this.user = {};


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

	this.addanswer = () => {

		$http({
			method: 'POST',
			url: 'http://localhost:3000/categories/1/questions/' + this.questionID + '/answers',
			data: this.formData
		}).then(response => {
			console.log('Response ', response.data);
			this.formData = {};
			this.answer = response.data;
			this.findanswer.push(this.answer);

		}).catch(reject => {
			console.log('Reject: ', reject);
		});
		this.closeModel();
	};

	this.displayForm = (question) => {

		if (this.display == false) {

			this.display = true;
			this.questionID = question.id;
			this.questionContent = question.content;
		}

		else {

			this.display = false;
		}
	};

	this.category1 = () => {

		this.category = 1;
		this.viewAnswersModal = false;
		this.questionID = 0;
	}

	this.category2 = () => {

		this.category = 2;
		this.viewAnswersModal = false;
		this.questionID = 0;
	}

	this.category3 = () => {

		this.category = 3;
		this.viewAnswersModal = false;
		this.questionID = 0;
	}

	this.pickQuestion = (question) => {

		this.questionID = question;

		if (this.currentquestion == true) {

			this.viewAnswersModal = false;
		}

	}

this.viewAnswers = (question) => {

	$http({
		method: 'GET',
		url: 'http://localhost:3000/categories/1/questions/' + this.questionID + '/answers'
	}).then(response => {
		console.log('Response: ', response);
		this.findanswer = response.data;
	}).catch(reject => {
			console.log('Reject: ', reject);
	});

	if (this.viewAnswersModal == false) {
		this.viewAnswersModal = true
	} else {
		this.viewAnswersModal = false
	}

	if (this.currentquestion == false) {

		this.currentquestion = true;
		console.log('Viewing answer');
	}


	this.questionID = question;
	}

	this.upvote = (answerid) => {

		console.log(answerid);

		$http({
			method: 'PUT',
			url: 'http://localhost:3000/categories/1/questions/' + this.questionID + '/answers/' + answerid
		}).then(response => {
			console.log('Response: ', response);
		}).catch(reject => {
				console.log('Reject: ', reject);
		});

		let index = this.findanswer.findIndex(i => i.id === answerid);

		this.findanswer[index].upvote += 1;
	}

	this.closeModel = () => {
		this.display = false;
		this.formData = null;
	}

	this.openLoginForm = () => {
		if (this.loginForm == false) {
			this.loginForm = true;
		} else {
			this.loginForm = false;
		}
	}

	this.openSignUpForm = () => {
		if (this.signUpForm == false) {
			this.signUpForm = true;
		} else {
			this.signUpForm = false;
		}
	}


//Authentication--------------
this.login = (userPass) => {
	console.log(userPass);
	$http({
	 method: 'POST',
	 url: this.url + '/users/login',
	 data: { user: { username: userPass.username, password: userPass.password }},
 }).then(response => {
	 console.log(response);
	 this.user = response.data.user;
	 this.loggedIn = true;
	 localStorage.setItem("token", JSON.stringify(response.data.token));
 });
};

// this.createUser = (userPass) => {
// 	console.log(userPass);
// 	$http({
// 	 method: 'POST',
// 	 url: this.url + '/users',
// 	 data: { user: { username: userPass.username, password: userPass.password }},
//  }).then(response => {
// 	 console.log(response);
// 	 this.user = response.data.user;
// 	 this.loggedIn = true;
//  });
// };

this.getUsers = () => {
 $http({
	 url: this.url + '/users',
	 method: 'GET',
	 headers: {
		Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
	}
 }).then(response => {
	 console.log(response);
	 if (response.data.status == 401) {
				this.error = "Unauthorized";
		} else {
			this.users = response.data;
		}
 });
};

this.logout = () => {
localStorage.clear('token');
location.reload();
this.loggedIn = false;
}
//END Authentication----------------

}]);
