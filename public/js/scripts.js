// to do
// can set focus/blur
// go back to form
// add autogenerated link to learn more for each school
// think about deactivated state for results buttons



$(document).ready(function() {
	// CREATE A PR OBJECT TO USE IN SUBMITTING THE FORM RESPONSE AND DRAWING CHARTS
	// var pr = {
	// 	eventName: '1m',
	// 	eventType: 'time',
	// 	pr : '315',
	// 	sex: 'f'
	// };

	// SLIDE FROM THE FIRST PAGE TO THE SECOND
	$('#find-button').click(function() {
		$('#landing-page').css('left', '-100%');
		$('#form-page').css('left', '0');
		$('#container').css('min-height', $('#form-page').css('height'));
	});

	// INITIALIZE VARIABLES TO RECORD CHOICES
	var chosenSport = '', lastSport = '', chosenEvent = '', lastEvent = '';

	// OPEN THE SPORT MODAL WHEN THE SPORT MODAL TOGGLE SPAN IS CLICKED, MAKE THE SPAN STOP BLINKING, AND RECORD CHOSENSPORT
	$('#sport-modal-toggle-span').click(function() {
		$('#sportModal').modal();
		$(this).removeClass('blinking');
		// RECORD CHOSENSPORT
		$('.sport').click(function() {
			chosenSport = $(this).text().trim().toLowerCase();
		});
	});

	// RESPOND TO CHANGES WHEN THE SPORT MODAL CLOSES
	$('#sportModal').on('hidden.bs.modal', function (e) {
		// IF NO SPORT WAS CHOSEN AND NONE HAS BEEN CHOSEN
		if (chosenSport.length === 0 && lastSport.length === 0) { $('#sport-modal-toggle-span').addClass('blinking'); };
		// IF A SPORT WAS CHOSEN THAT'S DIFFERENT FROM THE LAST ONE
		if (chosenSport.length !== 0 && chosenSport !== lastSport) {
			// DEACTIVATE RESULTS BUTTONS
			$('button.results').addClass('disabled-button');
			// CLEAR THE VALUE(S) FOR THE PR INPUT
			$('input').val('');
			// DEACTIVATE THE PR MODAL TOGGLE SPAN AND THE RESULTS BUTTONS
			$('#pr-modal-toggle-span').removeClass('blinking')
									  .addClass('disabled-toggle')
									  .text('awesome')
									  .unbind('click');
			// REMOVE EVENT MODAL OPTIONS
			$('#event-modal-options').empty()
			// BASED ON SPORT CHOSEN, ADD EVENT MODAL OPTIONS AND SET EVENTTYPE
			if (chosenSport === 'sprint') {
				pr.eventType = 'time';
				$('#event-modal-options').append('<div class=\'item event\' data-dismiss=\'modal\' name=\'100\'>100m</div><div class=\'item event\' data-dismiss=\'modal\' name=\'200\'>200m</div><div class=\'item event\' data-dismiss=\'modal\' name=\'400\'>400m</div>');
			} else if (chosenSport === 'hurdle') {
				pr.eventType = 'time';
				$('#event-modal-options').append('<div class=\'item event\' data-dismiss=\'modal\' name=\'100H\'>100mh</div><div class=\'item event\' data-dismiss=\'modal\' name=\'110H\'>110mh</div><div class=\'item event\' data-dismiss=\'modal\' name=\'300H\'>300mh</div>');
			} else if (chosenSport === 'run') {
				pr.eventType = 'time';
				$('#event-modal-options').append('<div class=\'item event\' data-dismiss=\'modal\' name=\'800\'>800m</div><div class=\'item event\' data-dismiss=\'modal\' name=\'1500\'>1500m</div><div class=\'item event\' data-dismiss=\'modal\' name=\'1600\'>1600m</div><div class=\'item event\' data-dismiss=\'modal\' name=\'1\'>1 mile</div>');
			} else if (chosenSport === 'jump') {
				pr.eventType = 'distance';
				$('#event-modal-options').append('<div class=\'item event\' data-dismiss=\'modal\' name=\'TJ\'>Triple Jump</div><div class=\'item event\' data-dismiss=\'modal\' name=\'HJ\'>High Jump</div><div class=\'item event\' data-dismiss=\'modal\' name=\'LJ\'>Long Jump</div>');
			} else if (chosenSport === 'throw') {
				pr.eventType = 'distance';
				$('#event-modal-options').append('<div class=\'item event\' data-dismiss=\'modal\' name=\'JT\'>Javelin Toss</div><div class=\'item event\' data-dismiss=\'modal\' name=\'SP\'>Shot Put</div><div class=\'item event\' data-dismiss=\'modal\' name=\'DT\'>Discus</div>');
			} else if (chosenSport === 'vault') {
				pr.eventType = 'distance';
				$('#event-modal-options').append('<div class=\'item event\' data-dismiss=\'modal\' name=\'PV\'>Pole Vault</div>');
				// ADDITIONAL STEPS, SINCE THERE'S ONLY POLE VAULT FOR VAULT
				pr.eventName = 'PV';
				chosenEvent = 'pole vault';
				$('#event-modal-toggle-span').text(chosenEvent);
				$('#the').show();
				$('#pr-modal-toggle-span').removeClass('disabled-toggle')
										  .addClass('blinking')
										  .click(function() {
										  	$('#prModal').modal();
										  	if ($('#pr1').is(':visible')) { $('#pr1').focus(); }
											else { $('#pr2').focus(); };
										  	$(this).removeClass('blinking');
										  });
				lastEvent = chosenEvent;
			};
			// RECORD CHOSENEVENT AND EVENTNAME
			$('.event').click(function() {
				chosenEvent = $(this).text().trim().toLowerCase();
				eventName = $(this).attr('name')
			});
			// HIDE 'THE', RESET EVENT MODAL TOGGLE SPAN TEXT, AND MAKE IT BLINK UNLESS CHOSENSPORT IS VAULT
			if (chosenSport !== 'vault') {
				$('#the').hide();
				$('#event-modal-toggle-span').text('this event');
				$('#event-modal-toggle-span').addClass('blinking');
			};
			// UPDATE PR MODAL BASED ON SPORT AND EVENTTYPE
			if (pr.eventType === 'time') {
				if (chosenSport === 'run') {
					$('#pr1').show();
					$('#pr1').prop('placeholder', '00');
					$('#pr1').css('width', '35px');
					$('#pr1-unit-text').text('mins & ');
				} else {
					$('#pr1').hide();
					$('#pr1-unit-text').text('');
				};
				$('#pr2').prop('placeholder', '00.0');
				$('#pr2').css('width', '60px');
				$('#pr2-unit-text').text('secs');
			} else if (pr.eventType === 'distance') {
				$('#pr1').show();
				$('#pr1').prop('placeholder', '00');
				$('#pr1').css('width', '35px');
				$('#pr1-unit-text').text('feet');
				$('#pr2').prop('placeholder', '00')
				$('#pr2').css('width', '35px');
				$('#pr2-unit-text').text('inches');
				if (chosenSport === 'throw') {
					$('#pr1').prop('placeholder', '000');
					$('#pr1').css('width', '52px');
				};
			};
			// CHANGE THE SPORT MODAL TOGGLE SPAN TEXT
			$('#sport-modal-toggle-span').text(chosenSport);
			// ACTIVATE THE EVENT MODAL TOGGLE SPAN, MAKE IT BLINK, AND MAKE IT RESPOND TO CLICKS
			$('#event-modal-toggle-span').removeClass('disabled-toggle')
										 .click(function() {
										 	$('#eventModal').modal();
										 	$(this).removeClass('blinking'); 
										 });
			// UPDATE LASTSPORT AND RESET CHOSENSPORT
			lastSport = chosenSport;
			chosenSport = '';
		};
	});

	// RESPOND TO CHANGES WHEN THE EVENT MODAL CLOSES
	$('#eventModal').on('hidden.bs.modal', function (e) {
		// IF NO EVENT WAS CHOSEN AND NO EVENT HAS BEEN CHOSEN
		if (chosenEvent.length === 0 && lastEvent.length === 0) { $('#event-modal-toggle-span').addClass('blinking'); };
		// IF THE NEWLY CHOSEN EVENT IS DIFFERENT FROM THE PREVIOUS ONE
		if (chosenEvent.length !== 0 && chosenEvent !== lastEvent) {
			// CHANGE THE EVENT MODAL TOGGLE SPAN TEXT AND INCLUDE THE WORD 'THE'
			$('#event-modal-toggle-span').text(chosenEvent);
			$('#the').show();
			// DEACTIVATE RESULTS BUTTONS
			$('button.results').addClass('disabled-button');
			// ACTIVATE THE PR MODAL TOGGLE SPAN, MAKE IT BLINK, MAKE IT RESPONDS TO CLICKS, AND FOCUS ON FIRST FIELD WHEN OPENED
			$('#pr-modal-toggle-span').removeClass('disabled-toggle')
									  .addClass('blinking')
									  .text('awesome')
									  .click(function() {
									  	$('#prModal').modal();
									  	if ($('#pr1').is(':visible')) { $('#pr1').focus(); }
										else { $('#pr2').focus(); };
									  	$(this).removeClass('blinking');
									  });
			// RESET PR INPUT VALUE(S)
			$('input').val('');
			// UPDATE PR OBJECT WITH EVENT NAME
			pr.eventName = eventName;
			// UPDATE LASTEVENT AND RESET CHOSENEVENT
			lastEvent = chosenEvent;
			chosenEvent = '';
		};
	});

	// RESPOND TO CLICKING ARROW TO CLOSE PR MODAL
	// $('#pr-input:after').click(function() {
	// 	$('#prModal').modal('hide');
	// });

	// RESTRICT NUMERIC INPUT
	$('input').keydown(function (e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
             // Allow: Ctrl+A
            (e.keyCode == 65 && e.ctrlKey === true) ||
             // Allow: Ctrl+C
            (e.keyCode == 67 && e.ctrlKey === true) ||
             // Allow: Ctrl+X
            (e.keyCode == 88 && e.ctrlKey === true) ||
             // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
                 // let it happen, don't do anything
                 return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });

    // ACTIVATE RESULTS BUTTONS IF PR IS ENTERED
	$('input').keyup(function () {
		input1val = $('#pr1').val();
		input2val = $('#pr2').val();
		if (input1val.length !== 0 || input2val.length !== 0) { $('button.results').removeClass('disabled-button'); }
		else { $('button.results').addClass('disabled-button'); };
	});

	// FUNCTION TO CONVERT SECONDS TO MINUTES AND SECONDS
	function secondsToMS(s) {
	    var m = Math.floor(s / 60);
	    s -= m * 60;
	    s = Math.round(s * 100) / 100;
	    return String(m) + ':' + (s < 10 ? '0' + String(s) : String(s));
	};
	// FUNCTION TO CONVERT INCHES TO FEET AND INCHES
	function inchesToFI(i) {
	    var f = Math.floor(i / 12);
	    i -= f * 12;
	    i = Math.round(i);
	    if (i == 0) {
	    	return f + '\'';
	    } else {
	    	return f + '\' ' + i + '"';
	    }
	};
	// FUNCTION TO CONVERT A PR FROM SECONDS OR INCHES TO MINUTES AND SECONDS OR FEET AND INCHES (OR KEEP AS SECONDS)
	var returnConvertedPR = function() {
		if (pr.eventType === 'time') {
			if (Number(pr.pr) > 100) {
				return secondsToMS(Number(pr.pr))
			} else {return pr.pr + 's'};
		};
		if (pr.eventType === 'distance') {return inchesToFI(Number(pr.pr));}
	};

	// RESPOND TO CLOSING PR MODAL
	$('#prModal').on('hidden.bs.modal', function (e) {
		// IF NO PR WAS ENTERED
		input1val = $('#pr1').val();
		input2val = $('#pr2').val();
		if (input1val.length === 0 && input2val.length === 0) {
			$('#pr-modal-toggle-span').addClass('blinking')
									  .text('awesome');
		} else {
			// CONVERT PR INPUT INTO SECONDS OR INCHES, DEPENDING ON EVENTTYPE, UPDATE PR OBJECT, AND UPDATE PR MODAL TOGGLE SPAN TEXT
			input1val = Number($('#pr1').val()) || 0;
			input2val = Number($('#pr2').val()) || 0;
			if (pr.eventType === 'time') { pr.pr = input1val * 60 + input2val; }
			else if (pr.eventType === 'distance') { pr.pr = input1val * 12 + input2val };
			$('#pr-modal-toggle-span').text(returnConvertedPR());
		};
	});

	// RESPOND TO CLICKING RESULTS BUTTONS
	$('button.results').click(function() {
		if ($(this).hasClass('disabled-button') !== true) {
			// BLUR BUTTON THAT WAS CLICKED
			$(this).blur();

			// UPDATE PR OBJECT WITH SEX
			if (event.target.id === 'mens-submit') { pr.sex = 'M'; }
			else if (event.target.id === 'womens-submit') { pr.sex = 'F'; };

			URLString = '/matcher?' + 'eventName=' + pr.eventName + '&pr=' + pr.pr + '&sex=' + pr.sex
			$.ajax({
				type: 'GET',
				url: URLString
			}).success(function(response) {
				console.log(response);
				showResults(JSON.parse(response));
			});
		};
	});

	// FUNCTION TO SHOW RESULTS
	var showResults = function(schools) {
		// IDENTIFY EASIEST WALKON, HARDEST TEAM BEST, AND 5% OF RANGE
		if (pr.eventType === 'time') {
			var easiest = -9999;
			var hardest = 9999;
			for (var schoolIndex = 0; schoolIndex < schools.length; schoolIndex++) {
				if (schools[schoolIndex].walkOn != 9999) {
					if (schools[schoolIndex].walkOn > easiest) {
						easiest = schools[schoolIndex].walkOn;
					};
				};
				if (schools[schoolIndex].teamBest != -9999) {
					if (schools[schoolIndex].teamBest < hardest) {
						hardest = schools[schoolIndex].teamBest;
					};
				};
			};
			if (hardest === 9999) {
				hardest = pr.pr - 0.1 * pr.pr;
			};
		} else {
			var easiest = 9999;
			var hardest = -9999;
			for (var schoolIndex = 0; schoolIndex < schools.length; schoolIndex++) {
				if (schools[schoolIndex].walkOn != -9999) {
					if (schools[schoolIndex].walkOn < easiest) {
						easiest = schools[schoolIndex].walkOn;
					};
				};
				if (schools[schoolIndex].teamBest != 9999) {
					if (schools[schoolIndex].teamBest > hardest) {
						hardest = schools[schoolIndex].teamBest;
					};
				};
			};
			if (hardest === -9999) {
				hardest = pr.pr + 0.1 * pr.pr;
			};
		};
		console.log('Easiest:' + easiest);
		console.log('Hardest:' + hardest);

		var fivePercentOfRange = Math.abs(easiest - hardest) * 0.05;

		// FUNCTION TO TURN SCHOOL AND STUDENT DATA INTO GRAPHABLE DATASET
		var createGraphableData = function(data) {
			var returnedData = [];
			returnedData.push({'x': String(data.teamBest), 'y': '1'});
			returnedData.push({'x': String(pr.pr), 'y': '1'});
			returnedData.push({'x': String(data.walkOn), 'y': '1'});
			return returnedData;
		};

		// FUNCTION TO DRAW A CHART FOR A SCHOOL
		var drawChart = function(data) {
			var vis = d3.select('#' + coreIDSelector);
		    var width = isMobile ? 300 : 600
		    HEIGHT = 40;
		    MARGINS = {
		        top: 20,
		        right: 10,
		        bottom: 20,
		        left: 10
		    };
		    if (pr.eventType === 'time') {
			    xScale = d3.scale.linear()
			    	.range([MARGINS.left, width - MARGINS.right])
			    	.domain([Number(easiest) + fivePercentOfRange, Number(hardest) - fivePercentOfRange]);
		    } else {
		    	xScale = d3.scale.linear()
		    		.range([MARGINS.left, width - MARGINS.right])
		    		.domain([Number(easiest) - fivePercentOfRange, Number(hardest) + fivePercentOfRange]);
		    };
		    yScale = d3.scale.linear()
		    	.range([HEIGHT - MARGINS.top, MARGINS.bottom])
		    	.domain([0,2]);
		    xAxis = d3.svg.axis().scale(xScale);

		    // GENERATE THE LINE
			var lineGen = d3.svg.line()
				.x(function(d) {return xScale(d.x);})
				.y(function(d) {return yScale(d.y);})
				.interpolate('linear');

			// ADD THE LINE
			vis.append('svg:path')
				.attr('d', lineGen(data));

			// ADD DATA POINTS
			vis.selectAll('dot')
				.data(data)
				.enter()
				.append('svg:circle')
				.attr('cx', function(d) { return xScale(d.x); })
				.attr('cy', function(d) { return yScale(d.y); });

			// ADD DATA POINT LABELS
			vis.selectAll('dot')
				.data(data)
				.enter()
				.append('svg:text')
				// MOVE LABEL LEFTWARDS
				.attr('dx', function(d) { return xScale(d.x) - 22; })
				// MOVE LABEL UPWARDS
				.attr('dy', function(d) { return yScale(d.y) - 9; })
				.text(function(d) { 
					if (pr.eventType === 'time') {
						if (Number(d.x) > 100) {
							return secondsToMS(Number(d.x))
						} else {return d.x + 's'};
					};
					if (pr.eventType ==='distance') {return inchesToFI(Number(d.x));}
				});
			// REMOVE THE LABEL FOR THE STUDENT'S PR
			var studentLabel = $('text:contains('+ returnConvertedPR() + ')');
			studentLabel
				.attr('dx', function(d) { return Number(studentLabel.attr('dx')) + 8; })
				.attr('dy', function(d) { return Number(studentLabel.attr('dy')) + 26; })
				.text('You');
		};

		// DYNAMICALLY POPULATE SENTENCE VALUES BASED ON FORM INPUT
		$('#sex').text(function() {return pr.sex === 'F' ? 'female' : 'male'});
		$('#event-name').text(lastEvent);
		$('#pr').text(returnConvertedPR());

		// DISPLAY RESULTS
		// IF THERE AREN'T ANY
		if (schools.length === 0) {
			// DISPLAY ERROR MESSAGE
		// OTHERWISE, FOR EACH SCHOOL, DISPLAY THE SCHOOL'S INFO AND GRAPH
		} else {
			var isMobile = window.screen.width < 650;
			for (var schoolIndex = 0; schoolIndex < schools.length; schoolIndex++) {
				// if (schools[schoolIndex].isPro) {
				var schoolName = schools[schoolIndex].name;
				var schoolNameSelector = schoolName.split(' ').join('-').replace(/[()'.]/g, '').replace('&', ' and ');
				var coreID = schools[schoolIndex].coreID;
				var learnMoreURL = 'http://www.captainu.com/college_teams/' + coreID;
				if (isMobile) {
					$('#sign-up-space').before('<div id=\'' + schoolNameSelector + '\' class=\'school\'></div><hr>');
				} else { $('#sign-up-space').before('<div id=\'' + schoolNameSelector + '\' class=\'school\'><div class=\'school-info\'><p>' + schoolName + '</p><a href=' + learnMoreURL + '>Learn more</a></div></div>'); }
				$('#sign-up-space').before('<hr>');
				var coreIDSelector = 'coreID' + coreID;
				var dataToBeGraphed = createGraphableData(schools[schoolIndex]);
				$('#' + schoolNameSelector).append('<svg id=\'' + coreIDSelector + '\' class=\'school-chart\'></svg>');
				if (isMobile) {
					$('#' + schoolNameSelector).append('<div class=\'school-info\'><p>' + schoolName + '</p><a href=' + learnMoreURL + '>Learn more</a></div>');
				}
				drawChart(dataToBeGraphed);

					// if (schoolIndex === 0) {
					// 	console.log($('circle:last-of-type').css('cx'));
					// 	console.log($('circle').css('cx'));
					// 	leftDotXValue = $('circle:last-of-type').css('cx');
					// 	rightDotXValue = $('circle').css('cx');
					// 	shift = $('#best-performance-bubble:after').css('left', shift)rightDotXValue - ;
					// 	$('#walk-on-bubble').css('left', leftDotXValue);
					// 	$('#best-performance-bubble:after').css('left', shift);
					// }
				// };
			};
		// SLIDE FROM THE FORM PAGE TO THE RESULTS PAGE
		$("#form-page").css('left', '-100%');
		$("#results-page").css('left', '0');
		$("#container").css("min-height",$("#results-page").css("height"));
		};
	};
});