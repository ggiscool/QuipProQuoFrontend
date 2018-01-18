const app = angular.module('QuipProQuo', []);

app.controller('MainController', ['$http', function($http) {

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
	this.url = 'http://localhost:3000';
	this.herokuUrl = 'https://quip-pro-quo.herokuapp.com';
	this.user = {};
	this.err = '';
	this.introMessage = true;

// Get categories
	$http({
		method: 'GET',
		url: this.herokuUrl + '/categories'
		// url: this.url + '/categories'
	}).then(response => {
		
		this.categories = response.data;
	}).catch(reject => {
		
	});

// Get Questions
	$http({
		method: 'GET',
		url: this.herokuUrl + '/categories/1/questions'
		// url: this.url + '/categories/1/questions'
	}).then(response => {
		
		this.questions = response.data;
	}).catch(reject => {
		console.log('Reject: ', reject);
	});


	this.addanswer = () => {

		if (this.formData.username == null) {
			this.formData = {username: this.user.username}
		}

		if (this.formData.content == null) {

			this.err = 'Please enter again';
			this.display = false;
			this.display = true;
		}

		else {

			$http({
				method: 'POST',
				url: this.herokuUrl + '/categories/1/questions/' + this.questionID + '/answers',
				// url: this.url + '/categories/1/questions/' + this.questionID + '/answers',
				data: this.formData
			}).then(response => {
				this.formData = {};
				this.answer = response.data;
				this.findanswer.push(this.answer);
				this.formData = {username: this.user.username}

			}).catch(reject => {
				console.log('Reject: ', reject);
			});

			this.formData = {username: this.user.username}

			this.closeModel();

		}
	};

	this.displayForm = (question) => {

		this.err = '';

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

	this.category4 = () => {

		this.category = 4;
		this.viewAnswersModal = false;
		this.questionID = 0;
	}

	this.category5 = () => {

		this.category = 5;
		this.viewAnswersModal = false;
		this.questionID = 0;
	}

	this.category6 = () => {

		this.category = 6;
		this.viewAnswersModal = false;
		this.questionID = 0;
	}

	this.pickQuestion = (question) => {

		this.questionID = question.id;
		this.questionTitle = question.title;

		if (this.currentquestion == true) {

			this.viewAnswersModal = false;
		}

	}

this.viewAnswers = (question) => {

	$http({
		method: 'GET',
		url: this.herokuUrl + '/categories/1/questions/' + this.questionID + '/answers',
		// url: this.url + '/categories/1/questions/' + this.questionID + '/answers',
	}).then(response => {
		
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
		
	}


	this.questionID = question.id;
	}

	this.upvote = (answerid) => {

		

		this.formData = {user_id: this.user.id, answer_id: answerid, vote: 1};

		$http({
			method: 'POST',
			url: this.herokuUrl + '/upvotes',
			// url: this.url + '/upvotes',
			data: this.formData
		}).then(response => {
			
			this.putupvote(answerid);
		}).catch(reject => {
			console.log('Reject: ', reject);
		});
	}

	this.putupvote = (answerid) => {

			$http({
				method: 'PUT',
				url: this.herokuUrl + '/categories/1/questions/' + this.questionID + '/answers/' + answerid,
				// url: this.url + '/categories/1/questions/' + this.questionID + '/answers/' + answerid,
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

		this.err = '';

		if (this.loginForm == false) {
			this.loginForm = true;
		} else {
			this.loginForm = false;
		}
	}

	this.openSignUpForm = () => {

		this.err = '';

		if (this.signUpForm == false) {
			this.signUpForm = true;
		} else {
			this.signUpForm = false;
		}
	}


//Authentication--------------
this.login = (userPass) => {

	$http({
	 method: 'POST',
	 url: this.herokuUrl + '/users/login',
	 // url: this.url + '/users/login',
	 data: { user: { username: userPass.username, password: userPass.password }},
 }).then(response => {
	 
	 if (response.data.status == 200) {

		 this.user = response.data.user;
		 this.loggedIn = true;
		 localStorage.setItem("token", JSON.stringify(response.data.token));
		 this.formData = {username: this.user.username}
		 this.openLoginForm();
	}

	else {

		this.err = 'Username and/or Password Incorrect';
	}
 });

};

this.createUser = (userPass) => {

	$http({
	 method: 'POST',
	 url: this.herokuUrl + '/users',
	 // url: this.url + '/users',
	 data: { user: { username: userPass.username, password: userPass.password }},
 }).then(response => {
	 
	 this.user = response.data.user;
	 this.loggedIn = true;
	 this.formData = {username: this.user.username}

	 if (response.status == 200) {

	 	this.openSignUpForm();
	 }
 }).catch(reject => {
		

		this.err = 'Username Already Exists';
	});
};

this.getUsers = () => {
 $http({
	 url: this.herokuUrl + '/users',
	 // url: this.url + '/users',
	 method: 'GET',
	 headers: {
		Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
	}
 }).then(response => {
	 
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
