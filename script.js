$(document).ready(function(){

	// flower objects
	var daisy = {
		startPercent: 25,
		growStrength: 5,
		budSrc: "images/girl2a.png",
		halfSrc: "images/girl2b.png",
		bloomSrc: "images/girl2c.png"
	};

	var sunflower = {
		startPercent: 15,
		growStrength: 4,
		budSrc: "images/girl4a.png",
		halfSrc: "images/girl4b.png",
		bloomSrc: "images/girl4c.png"
	};

	var tulip = {
		startPercent: 10,
		growStrength: 3,
		budSrc: "images/girl3a.png",
		halfSrc: "images/girl3b.png",
		bloomSrc: "images/girl3c.png"
	}

	var weedSrc = {
		img1: "images/weed3.png",
		img2: "images/weed2.png",
		img3: "images/weed1.png"
	}

	// flower/weed variables
	var weedPercent = 100;
	var weedStrength = 5;
	var weedImg;

	var flowerImg;
	var flowerSelect = false;
	var flower;
	var flowerStrength = 0;
	var flowerCurrentPercent = 0;
	var weed;
	var weedSelect = false;

	// start button
	$('#okay').click(function(){
		$('#startBox').addClass('disable');
		$('.start').removeClass('opacity');
	})

	// flower/weed selection
	function selection(imageList, index) {
		event.preventDefault();

		$(imageList).css("border-color", "#ffffff");
		$(imageList).eq(index).css("border-color", "#0ac247");
	}

	$('.flowerImages a').click(function(){
		flowerSelect = true;
	})

	$('.weedImages a').click(function(){
		weedSelect = true;
	})

	$('#daisy').click(function(){
		selection(".flowerImages li", 0);
		flower = daisy;
		flowerImg = daisy.budSrc;
	})

	$('#sunflower').click(function(){
		selection(".flowerImages li", 1);
		flower = sunflower;
		flowerImg = sunflower.budSrc;
	})

	$('#tulip').click(function(){
		selection(".flowerImages li", 2);
		flower = tulip;
		flowerImg = tulip.budSrc;
	})

	$('#weed1').click(function(){
		selection(".weedImages li", 0);
		weed = "weed1";
		weedImg = weedSrc.img1;
	})

	$('#weed2').click(function(){
		selection(".weedImages li", 1);
		weed = "weed2";
		weedImg = weedSrc.img2;
		console.log(weed);
	})

	$('#weed3').click(function(){
		selection(".weedImages li", 2);
		weed = "weed3";
		weedImg = weedSrc.img3;
	})

	$('#startBtn').click(function(){
		if(flowerSelect == false || weedSelect == false) {
			$('#noSelection').removeClass('disable');
			setTimeout(function(){
				$('#noSelection').addClass('disable')
			}, 5000);
			return;
		}

		if(weed == "weed1") {
			$('.multiply, .divide').css("display", "none");
			$('.plus, .minus').css("display", "list-item")
		}

		flowerStrength = flower.growStrength;
		flowerCurrentPercent = flower.startPercent;

		$('.flower img').attr("src", flowerImg);
		$('.weed img').attr("src", weedImg);
		$('.start').addClass('disable');
		$('.main').removeClass('disable');
		var flowerTracker = flowerCurrentPercent + '%';
		$('#flowerHealth').css('left', flowerTracker);

		chooseNumbers();
		populateNumbers();
		targetNumber();
	})

	// main timer
	var count = 60;
	var timer = setInterval(function(){
		if(count === 0) {
			outcome();
			clearInterval(timer);
		}
		$('#seconds').html(count--);
	}, 1000)

	// populate math problem
	var problemNumbers1 = [[1, 2, 3, 4, 5], [6, 2, 8, 9, 1], [7, 3, 4, 2, 1]];
	var targetNumbers1 = [1, 4, 7];
	var problemNumbers2 = [[3, 9, 7, 1, 3], [3, 7, 2, 1, 1], [3, 4, 2, 6, 2], [5, 8, 3, 1, 4], [4, 1, 7, 8, 2], [3, 4, 3, 7, 4], [7, 2, 2, 3, 5], [6, 1, 5, 3, 1], [2, 4, 7, 1, 3]];
	var targetNumbers2 = [1, 3, 8, 14, 4, 12, 9, 7, 3];
	var problemNumbers3 = [[2, 4, 7, 1, 3], [2, 0, 4, 5, 1], [2, 6, 3, 2, 5]];
	var targetNumbers3 = [3, 0, 1];
	var currentTarget;
	var usedArray=[];
	var whichArray;
	var mathLevel = {
		weed1: {
			numbers: problemNumbers1,
			target: targetNumbers1
		},
		weed2: {
			numbers: problemNumbers2,
			target: targetNumbers2
		},
		weed3: {
			numbers: problemNumbers3,
			target: targetNumbers3
		}
	}

	function chooseNumbers() {
		var index = Math.floor(Math.random()*9);

		if (usedArray.length == 8) {
			return;
		} else if(usedArray.indexOf(index) === -1) {
			whichArray = index;
			usedArray.push(index);
			return;
		} else {
			chooseNumbers();
		}
	}

	function populateNumbers() {
		console.log(weed);
		var mathProperty = mathLevel[weed];
		var numberSet = mathProperty.numbers;

		for(var i = 0; i < 5; i++) {
			var num = numberSet[whichArray][i];
			$('.problem').children('.number').eq(i).html(num);
		}
		console.log(usedArray);
	}

	function targetNumber() {
		var mathProperty = mathLevel[weed];
		var targetArray = mathProperty.target;
		var num = targetArray[whichArray];
		$('.target').html(num);
		currentTarget = num;
	}

	// math operations
	var operatorArray =[]

	function operatorClick(self, index, operatorSet) {
		event.preventDefault();
		operator = $(self).html();
		operatorArray[index]=operator;
		$(operatorSet).css("backgroundColor", "#ffffff");
		$(self).css("backgroundColor", "#0ac247");
	}

	$('.operatorSet1').click(function(){
		operatorClick(this, 0, ".operatorSet1");
	})

	$('.operatorSet2').click(function(){
		operatorClick(this, 1, ".operatorSet2");
	})

	$('.operatorSet3').click(function(){
		operatorClick(this, 2, ".operatorSet3");
	})

	$('.operatorSet4').click(function(){
		operatorClick(this, 3, ".operatorSet4");
	})

	$('#submit').click(function(){
		outcome();
	})

	function outcome() {
		var operator1 = operatorArray[0];
		var operator2 = operatorArray[1];
		var operator3 = operatorArray[2];
		var operator4 = operatorArray[3];
		console.log(operator1);
		var num1 = $('.problem').children('.number').eq(0).html();
		var num2 = $('.problem').children('.number').eq(1).html();
		var num3 = $('.problem').children('.number').eq(2).html();
		var num4 = $('.problem').children('.number').eq(3).html();
		var num5 = $('.problem').children('.number').eq(4).html();
		console.log(num2);

		if(operator1 == undefined || 
		   operator2 == undefined ||
		   operator3 == undefined || 
		   operator4 == undefined) {
			if (count == 0) {
				$('#next').removeClass('disable');
				$('#normal').addClass('disable');
				$('#incorrect').removeClass('disable');
				$('#timeDisplay').addClass('disable');
						
				nextProblem('#incorrect');

				flowerCurrentPercent -= weedStrength;
				weedPercent += flowerStrength;

				$('#flowerPercent').html(flowerCurrentPercent+"%");
				$(".weedPercent").html(weedPercent+"%");
				
				percentConditionals(flowerCurrentPercent, '.flowerPercent');
				percentConditionals(weedPercent, '.weedPercent');

				var weedTracker = weedPercent + "%";
				var flowerTracker = flowerCurrentPercent + "%";
				trackerConditionals(weedPercent, '#weedHealth', weedTracker);
				trackerConditionals(flowerCurrentPercent, '.flowerHealth', flowerTracker);

				flowerImages();
				return;
			};

			$('#noOperator').removeClass('disable');
			setTimeout(function(){
				$('#noOperator').addClass('disable')
			}, 1000 * 3);
		} else {
			$('#timeDisplay').addClass('disable');

			num2 = eval(num1 + operator1 + num2);
			num2.toString();

			num3 = eval(num2 + operator2 + num3);
			num3.toString();

			num4 = eval(num3 + operator3 + num4)
			num4.toString();

			num5 = eval(num4 + operator4 + num5);
			console.log(num5);

			$('#next').removeClass('disable');
			$('#normal').addClass('disable');

			correctCheck();

			var weedTracker = weedPercent + "%";
			var flowerTracker = flowerCurrentPercent + "%";

			trackerConditionals(weedPercent, '#weedHealth', weedTracker);
			trackerConditionals(flowerCurrentPercent, '#flowerHealth', flowerTracker);

			winLose();
			flowerImages();
		}

		function correctCheck() {
			if(num5 == currentTarget) {
				console.log(flower);
				console.log(flowerStrength);
				$('#correct').removeClass('disable');
					nextProblem('#correct');

				flowerCurrentPercent += flowerStrength;
				console.log(flowerCurrentPercent + 'percent');
				weedPercent -= flowerStrength;
				$('#flowerGrowth').html(flowerStrength +"%");
				$('.flowerPercent').html(flowerCurrentPercent+"%");
				$(".weedPercent").html(weedPercent+"%");
				flowerStrength += flower.growStrength;

				percentConditionals(flowerCurrentPercent, '#flowerPercent');
				percentConditionals(weedPercent, '.weedPercent');
			} else {
				$('#incorrect').removeClass('disable');
				
				nextProblem('#incorrect');

				flowerCurrentPercent -= weedStrength;
				weedPercent += flowerStrength;
				$('.flowerPercent').html(flowerCurrentPercent+"%");
				$(".weedPercent").html(weedPercent+"%");
				
				percentConditionals(flowerCurrentPercent, '#flowerPercent');
				percentConditionals(weedPercent, '.weedPercent');
			}
		}

		function nextProblem(disableId) {
			$('#next').click(function() {
				$('#timeDisplay').removeClass('disable');
				$('#next').addClass('disable');
				$('#normal').removeClass('disable');
				$(disableId).addClass('disable');
				$('.plus, .minus, .multiply, .divide').css('backgroundColor', '#ffffff');
				count = 0;
				count = 60;
				operatorArray = [];
				chooseNumbers();
				populateNumbers();
				targetNumber();
			});
		}

		function percentConditionals(typePercent, selector) {
			if(typePercent >= 100) {
				$(selector).html('100%');
			} else if (typePercent <= 0) {
				$(selector).html('0%');
			}
		}

		function trackerConditionals(typePercent, selector, tracker) {
			if(typePercent >= 3 && typePercent <= 95) {
				$(selector).css('left', tracker);
			}
		}

		function flowerImages() {
			if(flowerCurrentPercent >= 50) {
				$('.flower img').attr("src", flower.halfSrc);
			} else if(flowerCurrentPercent >= 90) {
				$('.flower img').attr("src", flower.bloomSrc);
			}
		}

		function winLose() {
			if(flowerCurrentPercent >= 100) {
				$('.win').removeClass('disable');
				$('.main').addClass('opacity');
			} else if(flowerCurrentPercent <= 0) {
				$('.lose').removeClass('disable');
				$('.main').addClass('opacity');
			}
		}
	}

	$(".growMore").click(function(){
		newRound();
	})

	$('.restart').click(function(){
		restart();
	})

	function newRound() {
		weedPercent = 100;
		flowerCurrentPercent = flower.startPercent;
		console.log(flowerCurrentPercent);
		count = 0;
		count = 60;
		operatorArray = [];

		$('#correct, #incorrect, .lose, .win, #next').addClass('disable');
		$('#normal, #timeDisplay').removeClass('disable');
		$('.main').removeClass('opacity');
		$('.plus, .minus, .multiply, .divide').css('backgroundColor', '#ffffff');

		var flowerTracker = flowerCurrentPercent + "%";
		$('#flowerHealth').css("left", flowerTracker);
		$('#weedHealth').css('left', '95%');

		chooseNumbers();
		populateNumbers();
		targetNumber();
	}

	function restart() {
		weed;
		weedSelect = false;
		weedImg;
		weedPercent = 100;
		flower;
		flowerSelect = false;
		flowerImg;
		flowerCurrentPercent = flower.startPercent;
		count = 60;
		currentTarget;
		usedArray = [];
		console.log(usedArray + 'array');
		whichArray;
		operatorArray = [];

		$('.main, #correct, #incorrect, .lose, .win, #next').addClass('disable')
		$('#normal, .start, #timeDisplay').removeClass('disable');
		$('.main').removeClass('opacity');
		$('.plus, .minus, .multiply, .divide').css('backgroundColor', '#ffffff');
		$('.startImages li').css("border-color", "#ffffff");
	}
})

