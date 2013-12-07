var mathzoo = angular.module('mathzoo', []);

function MainCtrl($scope) {
	$scope.title = "Math Zoo";
	$scope.started = false;
	$scope.game_over = false;

	$scope.start = function() {
		$scope.started = true;
		$scope.game_over = false;
		$scope.question = {};
		$scope.answer = '';
		$scope.score = 0;
		$scope.message = null;
		$scope.clock = {};
		$scope.clock.time_left = 20;

		$scope.setQuestion();
		setInterval(function() {
				$scope.$apply($scope.updateTime);
			}, 1000);

		$scope.questions = 20;
	}

	$scope.updateTime = function() {
		$scope.clock.time_left--;
		if ($scope.clock.time_left === 0) {
			$scope.clock.time_left = 20;
			$scope.next();
		}
	}

	$scope.setQuestion = function() {
		$scope.question.firstNumber = Math.floor(Math.random() * 100) + 1;
		$scope.question.secondNumber = Math.floor(Math.random() * 100) + 1;
		$scope.questions--;
		if ($scope.questions === 0) { $scope.game_over = true; }
	}	
	

	$scope.check = function() {
		var correct_answer = $scope.question.firstNumber + $scope.question.secondNumber;
		if (Number($scope.answer) === correct_answer) {
			$scope.score++;
			$scope.message = "Correct";
			$scope.correct_answer = correct_answer;			
		} else {
			$scope.message = "Incorrect";
			$scope.correct_answer = correct_answer;
		}
	}

	$scope.next = function() {
		$scope.setQuestion();
		$scope.answer = '';		
		$scope.message = null;
		$scope.clock.time_left = 20;
	}

	$scope.btn = function(num) {
		if (num === 'clear') {
			$scope.answer = '';
		} else if (num === 'del') {
			$scope.answer = $scope.answer.slice(0, $scope.answer.length-1);
		} else {
			$scope.answer = $scope.answer + num;
		}			
	}
}