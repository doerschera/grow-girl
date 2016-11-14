$(document).ready(function(){

	// flower objects
	var daisy = {
		startPercent: 25,
		growStrength: 5,
		budSrc: "images/daisyBud.png",
		halfSrc: "images/daisyHalfBloom.png",
		bloomSrc: "images/daisyBloom.png"
	};

	var sunflower = {
		startPercent: 15,
		growStrength: 4,
		budSrc: "images/sunflowerBud.png",
		halfSrc: "images/sunflowerHalfBloom.png",
		bloomSrc: "images/sunflowerBloom.png"
	};

	var tulip = {
		startPercent: 10,
		growStrength: 3,
		budSrc: "images/tulipBud.png",
		halfSrc: "images/tulipHalfBloom.png",
		bloomSrc: "images/tulipBloom.png"
	}

	var weedSrc = {
		img1: "images/weed3.png",
		img2: "images/weed1.png",
		img3: "images/weed2.png"
	}

	// flower/weed variables
	var weedPercent = 100;
	var weedStrength = 5;
	var weedImg;
	var weed;
	var weedSelect = false;

	var flowerImg;
	var flowerSelect = false;
	var flower;
	var flowerStrength = 0;
	var flowerCurrentPercent = 0;
	var gardenCount = 0;

	// main timer
	var count;

	var timer = setInterval(function(){
		if(count === 0) {
			outcome();
			clearInterval(timer);
		}
		$('#seconds').html(count--);
	}, 1000)

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

	$('#startBtn').click(function(event){
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
		$('.main, #toolTip').removeClass('disable');
		var flowerTracker = flowerCurrentPercent + '%';
		$('.flowerHealth').css('left', flowerTracker);

		chooseNumbers();
		populateNumbers();
		targetNumber();
		count = 60;
	})


	// populate math problem
	var problemNumbers1 = [[8, 7, 6, 4, 3], [5, 3, 5, 2, 6], [1, 7, 5, 5, 1],[9, 7, 1, 8, 4], [3, 4, 9, 4, 7], [9, 6, 6, 8, 9], [5, 9, 5, 3, 1], [4, 8, 4, 6, 8], [4, 9, 8, 1, 7],[9, 9, 8, 2, 6], [4, 1, 9, 6, 7], [5, 6, 5, 9, 8],[9, 4, 5, 7, 2], [8, 9, 7, 7, 8], [8, 1, 1, 4, 3],[9, 8, 2, 7, 6], [7, 7, 1, 2, 8], [4, 7, 3, 7, 5],[1, 3, 2, 6, 5], [2, 3, 9, 4, 2], [4, 9, 7, 6, 2],[6, 9, 4, 1, 3], [3, 1, 9, 1, 1], [7, 6, 2, 4, 8],[8, 4, 5, 2, 4], [6, 9, 2, 4, 3], [4, 9, 8, 6, 8],[2, 4, 6, 1, 6], [3, 7, 5, 9, 2], [5, 3, 1, 8, 1],[8, 7, 5, 8, 4], [3, 7, 6, 3, 5], [2, 1, 2, 8, 5],[7, 8, 2, 1, 6], [8, 6, 1, 9, 5], [7, 4, 3, 8, 5],[6, 1, 5, 4, 7], [3, 3, 1, 8, 2], [1, 3, 9, 2, 6],[2, 3, 7, 1, 6], [5, 8, 9, 4, 3], [9, 2, 7, 3, 1],[9, 7, 8, 6, 3], [6, 3, 2, 5, 3], [8, 3, 1, 4, 7],[6, 2, 9, 8, 3], [7, 1, 4, 7, 9], [2, 3, 5, 9, 7],[1, 9, 4, 1, 6], [9, 8, 6, 3, 1]];
	var targetNumbers1 = [8, 6, 9, 7, 5, 10, 5, 10, 11, 2, 1, 7, 3, 11, 3, 4, 5, 2, 9, 8, 2, 9, 13, 15, 3, 12, 3, 4, 8, 10, 10, 4, 6, 10, 7, 13, 7, 11, 9, 7, 3, 2, 1, 7, 9, 8, 0, 8, 9, 11];
	var problemNumbers2 = [[9, 1, 4, 1, 5], [1, 4, 5, 9, 1], [9, 8, 2, 8, 7], [3, 3, 7, 4, 5], [8, 8, 1, 3, 7], [3, 2, 9, 3, 5], [6, 8, 2, 9, 3], [7, 7, 5, 1, 8], [7, 8, 7, 6, 3], [8, 6, 4, 3, 6], [3, 4, 2, 5, 6], [4, 1, 9, 3, 8], [9, 1, 2, 5, 3], [8, 1, 9, 8, 4], [5, 2, 9, 6, 7], [1, 6, 6, 7, 3], [3, 5, 6, 8, 1], [4, 7, 8, 3, 1], [6, 4, 3, 4, 9], [2, 8, 9, 4, 8], [7, 3, 9, 1, 3], [5, 4, 2, 7, 9], [2, 1, 4, 4, 6], [1, 8, 6, 2, 5], [8, 2, 3, 4, 5], [2, 6, 3, 2, 7], [7, 8, 5, 7, 8], [1, 4, 5, 2, 8], [9, 1, 3, 6, 5], [6, 7, 8, 2, 4], [3, 8, 5, 1, 6], [1, 8, 2, 5, 4], [4, 2, 8, 3, 2], [1, 4, 9, 7, 3], [5, 6, 8, 1, 4], [4, 4, 8, 3, 5], [1, 4, 7, 5, 9], [1, 3, 2, 7, 4], [6, 8, 2, 4, 4], [3, 4, 9, 8, 3], [7, 9, 1, 6, 8], [4, 6, 7, 9, 3], [5, 3, 2, 5, 6], [7, 3, 1, 7, 2], [3, 5, 2, 2, 6], [9, 6, 6, 8, 6], [1, 7, 8, 9, 3], [3, 6, 2, 9, 4], [2, 9, 5, 3, 5], [3, 2, 9, 1, 2], [3, 4, 3, 1, 8]];
	var targetNumbers2 = [8, 1, 3, 6, 12, 10, 5, 1, 6, 5, 3, 4, 0, 2, 13, 2, 1, 10, 1, 11, 4, 1, 2, 1, 8, 3, 2, 13, 4, 6, 0, 13, 6, 5, 7, 11, 5, 12, 14, 2, 4, 14, 9, 12, 4, 7, 4, 8, 7, 6];
	var problemNumbers3 = [[4, 1, 10, 3, 11], [13, 15, 8, 10, 14], [5, 8, 4, 13, 9], [2, 7, 14, 6, 8], [14, 4, 7, 13, 5], [6, 5, 11, 1, 4], [2, 6, 11, 11, 6], [6, 2, 2, 8, 4], [6, 15, 11, 5, 6], [2, 5, 13, 2, 13], [3, 8, 2, 8, 1], [8, 6, 10, 1, 4], [2, 7, 12, 9, 7], [3, 8, 4, 3, 1], [8, 6, 13, 3, 11], [9, 7, 12, 15, 11], [6, 11, 13, 9, 15], [3, 6, 4, 10, 11], [14, 1, 12, 10, 9], [10, 5, 11, 4, 5], [14, 4, 8, 10, 2], [4, 5, 2, 6, 3], [5, 12, 4, 13, 11], [9, 12, 5, 12, 15], [11, 14, 7, 12, 6], [6, 7, 1, 6, 7], [5, 3, 4, 12, 9], [10, 3, 6, 4, 2], [1, 12, 2, 4, 12], [5, 12, 11, 15, 12], [9, 8, 1, 7, 5], [14, 5, 4, 14, 5], [6, 5, 11, 1, 8], [13, 13, 15, 2, 2], [2, 12, 7, 4, 3], [10, 1, 12, 5, 7], [1, 3, 11, 7, 4], [7, 10, 8, 12, 14], [6, 8, 2, 6, 7], [3, 11, 2, 3, 13], [8, 14, 5, 12, 15], [5, 5, 4, 14, 7], [4, 4, 3, 8, 7], [13, 14, 9, 13, 14], [9, 15, 6, 3, 10], [9, 7, 4, 3, 13], [6, 7, 3, 14, 14], [8, 15, 9, 8, 2], [13, 6, 7, 3, 12], [7, 14, 4, 1, 7]];
	var targetNumbers3 = [3, 16, 14, 14, 20, 3, 2, 6, 4, 23, 19, 5, 4, 20, 16, 20, 28, 4, 1, 9, 22, 4, 15, 20, 0, 9, 11, 4, 2, 9, 5, 4, 15, 28, 25, 4, 19, 27, 29, 8, 1, 8, 3, 2, 2, 24, 28, 3, 5, 10];
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
		var index = Math.floor(Math.random()*50);

		if (usedArray.length == 50) {
			usedArray = [];
			chooseNumbers();
		} else if(usedArray.indexOf(index) === -1) {
			whichArray = index;
			usedArray.push(index);
			console.log(usedArray);
			return;
		} else {
			chooseNumbers();
		}
	}

	function populateNumbers() {
		var mathProperty = mathLevel[weed];
		var numberSet = mathProperty.numbers;
		console.log(whichArray + 'array');

		for(var i = 0; i < 5; i++) {
			var num = numberSet[whichArray][i];
			$('.problem').children('.number').eq(i).html(num);
		}
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
				clearInterval(timer);
				$('#next').removeClass('disable');
				$('#normal').addClass('disable');
				$('#incorrect').removeClass('disable');
				$('#timeDisplay').addClass('disable');

				nextProblem('#incorrect');

				flowerCurrentPercent -= weedStrength;
				weedPercent += flowerStrength;

				messagePercents(flowerCurrentPercent, '.flowerPercent');
				messagePercents(weedPercent, '.weedPercent');

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
			clearInterval(timer);

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

			trackerConditionals(weedPercent, '.weedHealth', weedTracker);
			trackerConditionals(flowerCurrentPercent, '.flowerHealth', flowerTracker);

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
				messagePercents(flowerCurrentPercent, '.flowerPercent');
				messagePercents(weedPercent, '.weedPercent');

				flowerStrength += flower.growStrength;

				percentConditionals(flowerCurrentPercent, '#flowerPercent');
				percentConditionals(weedPercent, '.weedPercent');
			} else {
				$('#incorrect').removeClass('disable');

				nextProblem('#incorrect');

				flowerCurrentPercent -= weedStrength;
				weedPercent += flowerStrength;

				messagePercents(flowerCurrentPercent, '.flowerPercent');
				messagePercents(weedPercent, '.weedPercent');

				percentConditionals(flowerCurrentPercent, '#flowerPercent');
				percentConditionals(weedPercent, '.weedPercent');
			}
		}

		function nextProblem(disableId) {
			$('#next').off('click');
			$('#next').click(function(event) {
				event.preventDefault();
				event.stopPropagation();
				$('#timeDisplay').removeClass('disable');
				$('#next').addClass('disable');
				$('#normal').removeClass('disable');
				$(disableId).addClass('disable');
				$('.plus, .minus, .multiply, .divide').css('backgroundColor', '#ffffff');
				count = 60;
				timer = setInterval(function(){
					if(count === 0) {
						outcome();
						clearInterval(timer);
					}
					$('#seconds').html(count--);
				}, 1000)
				operatorArray = [];
				chooseNumbers();
				populateNumbers();
				targetNumber();
			});
		}

		function messagePercents(typePercent, selector) {
			if(typePercent > 100) {
				$(selector).html('100%');
			} else {
				$(selector).html(typePercent+'%');
			}
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
				$('.garden img').eq(gardenCount).attr('src', flower.bloomSrc);
				gardenCount ++;
				if(gardenCount === 10) {
					$('.gardenMessage').removeClass('disable');
					newGarden();
				}
			} else if(flowerCurrentPercent <= 0) {
				$('.lose').removeClass('disable');
				$('.main').addClass('opacity');
			}
		}

		function newGarden() {
			$('.garden img').attr('src', '#');
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
		clearInterval(timer);
		count = 60;
		timer = setInterval(function(){
			if(count === 0) {
				outcome();
				clearInterval(timer);
			}
			$('#seconds').html(count--);
		}, 1000)
		operatorArray = [];

		$('#correct, #incorrect, .lose, .win, #next').addClass('disable');
		$('#normal, #timeDisplay').removeClass('disable');
		$('.main').removeClass('opacity');
		$('.plus, .minus, .multiply, .divide').css('backgroundColor', '#ffffff');

		var flowerTracker = flowerCurrentPercent + "%";
		$('.flowerHealth').css("left", flowerTracker);
		$('.weedHealth').css('left', '95%');

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
		setInterval(function(){
			if(count === 0) {
				outcome();
				clearInterval(timer);
			}
			$('#seconds').html(count--);
		}, 1000)
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

$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})
