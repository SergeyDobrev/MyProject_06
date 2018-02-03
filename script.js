$(function() {
	var oScene = document.createElement('div');
	$('body').append(oScene);
	$(oScene).addClass('scene');

	var oBlock = new Array();
	var oPoint = new Array();
	var oSide = new Array();
	var sideArray = ['', 'rotateX(90deg)' , 'rotateY(180deg) rotateZ(180deg)', 'rotateX(-90deg)'];
	var pointPositionArray = [[-4,-6,3,1],[0,-4,0,-4]];
	var j = 0;

	for (var i = 0; i < 6; i++) {
		oSide[i] = new Array();
		oBlock[i] = document.createElement('div');
		$(oScene).append(oBlock[i]);
		$(oBlock[i]).addClass('block');
		$(oBlock[i]).css({'transform': 'translateX(' + (i - 3) * 3 + 'vh)'});
	
		for (var n = 0; n < sideArray.length; n++) {
			oSide[i][n] = document.createElement('div');
			$(oBlock[i]).append(oSide[i][n]);
			$(oSide[i][n]).addClass('side');
			$(oSide[i][n]).css({'transform': sideArray[n] + ' translateZ(4vh)'});
			$(oSide[i][n]).html(0);
		}

		if (i === 1 || i === 3) {
			for (var m = 0; m < 2; m++) {
				oPoint[j] = document.createElement('div');
				$(oScene).append(oPoint[j]);
				$(oPoint[j]).addClass('block point');
				$(oPoint[j]).css({'transform':  'translateX(' + pointPositionArray[0][j] + 'vh) ' + 
												'translateY(' + pointPositionArray[1][j] + 'vh)'});

				for (var n = 0; n < sideArray.length; n++) {
					var oPointSide = document.createElement('div');
					$(oPoint[j]).append(oPointSide);
					$(oPointSide).addClass('side pointside');
					$(oPointSide).css({'transform': sideArray[n] + ' translateZ(1vh)'});
					var oPointCircle = document.createElement('div');
					$(oPointSide).append(oPointCircle);
					$(oPointCircle).addClass('pointcircle');
				}
				j++;
			}
		}
	}

	var TimerId = setTimeout(function() {

		var timeArray = [[0,0,0,0,0,0],[0,0,0,0,0,0]];
		var intervalID = setInterval(myIntervalFun, 100);

		function myIntervalFun() {

			var date = new Date();
			timeArray[0][0] = (date.getHours() - (date.getHours() % 10)) / 10;
			timeArray[0][1] = date.getHours() % 10;
			timeArray[0][2] = (date.getMinutes() - (date.getMinutes() % 10)) / 10;
			timeArray[0][3] = date.getMinutes() % 10;
			timeArray[0][4] = (date.getSeconds() - (date.getSeconds() % 10)) / 10;
			timeArray[0][5] = date.getSeconds() % 10;

			for (var i = 0; i < timeArray[0].length; i++) {
				if (timeArray[0][i] != timeArray[1][i]) {
					$(oSide[i][(timeArray[0][i] % 4)]).html(timeArray[0][i]);
					oBlock[i].style.transform = 'translateX(' + (i - 3) * 3 + 'vh) ' + 
												'rotateX(' + (timeArray[0][i] * -90) + 'deg)';
					timeArray[1][i] = timeArray[0][i];
				}
			}

			for (var i = 0; i < oPoint.length; i++) {
				oPoint[i].style.transform = 'translateX(' + pointPositionArray[0][i] + 'vh) ' +
											'translateY(' + pointPositionArray[1][i] + 'vh) ' +
											'rotateX(' + (timeArray[0][5] * -90) + 'deg)';
			}
		}
	}, 1000);
});