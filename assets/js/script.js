iLabels = ["extremely weak", "very weak", "weak", "not weak, not strong", "strong", "very strong", "extremely strong"];
lLabels = ["extremely seldom", "very seldom", "seldom", "not seldom, not often", "often", "very often", "extremely often"];
var levelPoints = [0, 12, 25, 40, 57, 71, 85, 100];
var midPoints = levelPoints.slice(0,-1).map(
	function(val, idx, arr) {
		return Math.round((val+this[idx])/2);
	},
	levelPoints.slice(1)
);

function colorInterp(low,high,percent) {
	var result = low;
	for (var i in result) {
		result[i] += Math.round((high[i] - low[i]) * percent / 100);
	}
	return result;
}
function sliderStartHandler(v) {
	//$(this).slider('setAttribute','tooltip','hide').slider('refresh');
}
function sliderChangeHandler(v) {
	//-- Common part	
	var value = $(this).slider('getValue');
	var index, i, j, k;
	//-- SliderHandle colorizing	
	var colorMap = [[0,153,255],[153,153,153],[255,80,80]];
	var breakPoints = [0,50,100];
	var colorValue = colorMap[0];
	for (index in breakPoints) {
		i = parseInt(index);
		if((i+1) in breakPoints) {
			if(value >= breakPoints[i] && value <= breakPoints[i+1]) {
				colorValue = colorInterp(colorMap[i], colorMap[i+1], (value - breakPoints[i]) * 100 / (breakPoints[i+1] - breakPoints[i]));
				break;
			}
		}
	}
	for (index in levelPoints) {
		i = parseInt(index);
		if(((i+1) in levelPoints) && (value >= levelPoints[i]) && (value <= levelPoints[i+1])) {
			$(this).slider('setValue', midPoints[i]);
			$('#' + v.target.id + '_val').text(v.target.id.slice(-1) === "I" ? iLabels[i] : lLabels[i]);
			break;	
		}
	}
	var target = '#' + v.target.id + '_S .slider-handle';
	$(target).css('background', 'rgb(' + colorValue.join(',') + ')');
	//-- Score evaluation
	var idPrefix = v.target.id.slice(0,-2);
	var idSuffix = ['PI','PL','CI','CL'];
	level = [];
	for(j in idSuffix) {
		var id = idPrefix + idSuffix[j];
		var val = parseInt($('#' + id).val());
		for (index in levelPoints) {
			i = parseInt(index);
			if(((i+1) in levelPoints) && (val >= levelPoints[i]) && (val <= levelPoints[i+1])) {
				level[j] = i;
				break;	
			}
		}
	}
	//-- Nomination of the Winner
	$('#play fieldset legend').removeClass('winner');
	$('#fs_opt_' + parseInt(v.target.id.slice(3,-3))).data('value',getBigValue(getSmallValue(level[0],level[1]),getSmallValue(level[2],level[3])));
	var costs = [];
	$('#play fieldset').each(function(index){
		costs[index] = {'value': parseInt($(this).data('value')),'index':index};
	});
	costs.sort(function(a,b){
		return b.value - a.value;
	});
	maxCost = costs[0].value;
	var winCounter = 0;
	var rank = 1;
	for(k in costs) {
		if(costs[k].value == maxCost) {
			if(rank == 1) {
				$('#play fieldset:eq('  + costs[k].index +') legend').addClass('winner');
				winCounter++;	
			}
		}
		else {
			maxCost = costs[k].value;
			rank++;
		}
		$('#play fieldset:eq('  + costs[k].index +') legend span.badge').text(rank);
		$('#play fieldset:eq('  + costs[k].index +') legend span.vbar').show();
	}
	if(winCounter === costs.length) {
		$('#play fieldset legend').removeClass('winner');
		$('#play fieldset legend span.badge').empty();
		$('#play fieldset legend span.vbar').hide();
	}
	//-- Check if all sliders are in default state
	//var 
	$('#play').find('input').each(function(){
		
	});
	
	if($('#play').find('input').filter(function(){return parseInt(this.value) === midPoints[0]}).length === $('#play').find('input').length) {
		$('#play').find('p.sliderValue').hide();
		$('#play').find('p.animation').show();	
	}	
	else {
		$('#play').find('p.sliderValue').show();
		$('#play').find('p.animation').hide();	
	}
	$('#play').data('costs',costs);
}
function optionChangeHandler(e) {
	var index = e.target.id.split('_')[1];
	$('#fs_' + e.target.id).find('legend span:eq(0)').text(e.target.value !== '' ? e.target.value : 'Option ' + index);
}

function getOptionMarkup(index) {
	var result = 
	$('<fieldset>')
	.attr('id','fs_opt_' + index)	
	.addClass('bg-warning')
	.append(
		$('<legend>')
		.append(
			$('<span>')
			.text($('#opt_' + index).val() === '' ? 'Option ' + index : $('#opt_' + index).val())
		)
		.append(
			$('<span>')
			.addClass('vbar')
			.hide()
		)
		.append(
			$('<span>')
			.addClass('badge')
		)
	)
	.append(
	 	$('<div>')
	 	.addClass('row vcenter')
	 	.append(
	 		$('<div>')
	 		.addClass('col-xs-2 col-sm-1')
	 		.append(
	 			$('<p>')
	 			.addClass('text-center lb-type')
	 			.append(
	 				$('<strong>')
	 				.html('Pros<br>(+)')
	 			)
	 		)
	 	)
		.append(
			$('<div>')
			.addClass('col-xs-10 col-sm-11')
			.append(
				$('<div>')
				.addClass('row vbottom')
				.append(
					$('<div>')
					.addClass('col-xs-4 col-sm-2 col-md-1')
					.append(
						$('<strong>')
						.text('Intensity')
					)
				)
				.append(
					$('<div>')
					.addClass('col-xs-8 col-sm-10 col-md-11')
					.append(
						$('<div>')
						.addClass('row vcenter')
						.append(
							$('<div>')
							.addClass('col-xs-offset-2 col-xs-8')
							.append(
								$('<p>')
								.addClass('sliderValue text-success text-center')
								.attr({
									'id': 'opt' + index + '_PI_val'
								})
							)
							.append(
								$('<p>')
								.addClass('animation text-center')
								.append(
									$('<span>').addClass('glyphicon glyphicon-chevron-right f1')
								)
								.append(
									$('<span>').addClass('glyphicon glyphicon-chevron-right f2')
								)
								.append(
									$('<span>').addClass('glyphicon glyphicon-chevron-right f3')
								)
							)
						)
					)
					.append(
						$('<div>')
						.addClass('row')
						.append(
							$('<div>')
							.addClass('col-xs-12')
							.append(
								$('<input>')
								.attr({
									'type' : 'text',
									'id' : 'opt' + index + '_PI',
									'data-slider-id' : 'opt' + index + '_PI_S'
								})								
							)
						)
					)
				)
			)
			.append(
				$('<div>')
				.addClass('row colorbar bg-green')
				.append(
					$('<div>')	
					.addClass('col-xs-12')
				)
			)
			.append(
				$('<div>')
				.addClass('row vtop')
				.append(
					$('<div>')
					.addClass('col-xs-4 col-sm-2 col-md-1')
					.append(
						$('<strong>')
						.text('Likelihood')
					)
				)
				.append(
					$('<div>')
					.addClass('col-xs-8 col-sm-10 col-md-11')
					.append(
						$('<div>')
						.addClass('row')
						.append(
							$('<div>')
							.addClass('col-xs-12')
							.append(
								$('<input>')
								.attr({
									'type' : 'text',
									'id' : 'opt' + index + '_PL',
									'data-slider-id' : 'opt' + index + '_PL_S'
								})
							)
						)
					)
					.append(
						$('<div>')
						.addClass('row vcenter')
						.append(
							$('<div>')
							.addClass('col-xs-offset-2 col-xs-8')
							.append(
								$('<p>')
								.addClass('sliderValue text-success text-center')
								.attr({
									'id': 'opt' + index + '_PL_val'
								})
							)
							.append(
								$('<p>')
								.addClass('animation text-center')
								.append(
									$('<span>').addClass('glyphicon glyphicon-chevron-right f1')
								)
								.append(
									$('<span>').addClass('glyphicon glyphicon-chevron-right f2')
								)
								.append(
									$('<span>').addClass('glyphicon glyphicon-chevron-right f3')
								)
							)
						)
					)
				)
			)
		)
	)
	.append(
		$('<hr>')
	)
	.append(
		$('<div>')
		.addClass('row vcenter')
		.append(
			$('<div>')
			.addClass('col-xs-2 col-sm-1')
			.append(
				$('<p>')
				.addClass('text-center lb-type')
				.append(
					$('<strong>')
					.html('Cons<br>(-)')
				)
			)
		)
		.append(
			$('<div>')
			.addClass('col-xs-10 col-sm-11')
			.append(
				$('<div>')
				.addClass('row vbottom')
				.append(
					$('<div>')
					.addClass('col-xs-4 col-sm-2 col-md-1')
					.append(
						$('<strong>')
						.text('Intensity')
					)
				)
				.append(
					$('<div>')
					.addClass('col-xs-8 col-sm-10 col-md-11')
					.append(
						$('<div>')
						.addClass('row vcenter')
						.append(
							$('<div>')
							.addClass('col-xs-offset-2 col-xs-8')
							.append(
								$('<p>')
								.addClass('sliderValue text-danger text-center')
								.attr({
									'id': 'opt' + index + '_CI_val'
								})
							)
							.append(
								$('<p>')
								.addClass('animation text-center')
								.append(
									$('<span>').addClass('glyphicon glyphicon-chevron-right f1')
								)
								.append(
									$('<span>').addClass('glyphicon glyphicon-chevron-right f2')
								)
								.append(
									$('<span>').addClass('glyphicon glyphicon-chevron-right f3')
								)
							)
						)
					)
					.append(
						$('<div>')
						.addClass('row')
						.append(
							$('<div>')
							.addClass('col-xs-12')
							.append(
								$('<input>')
								.attr({
									'type' : 'text',
									'id' : 'opt' + index + '_CI',
									'data-slider-id' : 'opt' + index + '_CI_S'
								})
							)
						)
					)
				)
			)
			.append(
				$('<div>')
				.addClass('row colorbar bg-red')
				.append(
					$('<div>')	
					.addClass('col-xs-12')
				)
			)
			.append(
				$('<div>')
				.addClass('row vtop')
				.append(
					$('<div>')
					.addClass('col-xs-4 col-sm-2 col-md-1')
					.append(
						$('<strong>')
						.text('Likelihood')
					)
				)
				.append(
					$('<div>')
					.addClass('col-xs-8 col-sm-10 col-md-11')
					.append(
						$('<div>')
						.addClass('row')
						.append(
							$('<div>')
							.addClass('col-xs-12')
							.append(
								$('<input>')
								.attr({
									'type' : 'text',
									'id' : 'opt' + index + '_CL',
									'data-slider-id' : 'opt' + index + '_CL_S'
								})
							)
						)
					)
					.append(
						$('<div>')
						.addClass('row vcenter')
						.append(
							$('<div>')
							.addClass('col-xs-offset-2 col-xs-8')
							.append(
								$('<p>')
								.addClass('sliderValue text-danger text-center')
								.attr({
									'id': 'opt' + index + '_CL_val'
								})
							)
							.append(
								$('<p>')
								.addClass('animation text-center')
								.append(
									$('<span>').addClass('glyphicon glyphicon-chevron-right f1')
								)
								.append(
									$('<span>').addClass('glyphicon glyphicon-chevron-right f2')
								)
								.append(
									$('<span>').addClass('glyphicon glyphicon-chevron-right f3')
								)
							)
						)
					)
				)
			)
		)
	);
	var defaultSliderObjectTop = {
		min: 1, 
		max: 100, 
		value: midPoints[0], 
		tooltip: 'hide',
		tooltip_position: 'top'
	};	
	var defaultSliderObjectBottom = {
		min: 1, 
		max: 100, 
		value: midPoints[0], 
		tooltip: 'hide',
		tooltip_position: 'bottom'
	};	
	result.find('#opt' + index + '_PI').slider(defaultSliderObjectTop).on('slideStop', sliderChangeHandler).on('slideStart',sliderStartHandler);
	result.find('#opt' + index + '_PL').slider(defaultSliderObjectBottom).on('slideStop', sliderChangeHandler);
	result.find('#opt' + index + '_CI').slider(defaultSliderObjectTop).on('slideStop', sliderChangeHandler);
	result.find('#opt' + index + '_CL').slider(defaultSliderObjectBottom).on('slideStop', sliderChangeHandler);
	return result;
}
function addButtonHandler() {
	localStorage.setItem('confirmedRemove', false);
	var index = $('#setup > div.container-fluid').length;
	$('#setup > div.container-fluid').last()
	.before(
		$('<div>')
		.addClass('container-fluid')
		.append(
			$('<div>')
			.addClass('form-group')
			.append(
				$('<label>')
				.attr('for', 'opt_' + index)
				.text('Option ' + index)
			)
			.append(
				index <= 3 ? 
				$('<input>')
				.addClass('form-control')
				.attr({
					'type' : 'text',
					'id' : 'opt_' + index,
					'placeholder' : 'Name your "Option ' + index + '" here'
				})
				: 
				$('<div>')
				.addClass('input-group')
				.append(
					$('<input>')
					.addClass('form-control')
					.attr({
						'type' : 'text',
						'id' : 'opt_' + index,
						'placeholder' : 'Name your "Option ' + index + '" here'
					})
				)
				.append(
					$('<span>')
					.addClass('input-group-btn')
					.append(
						$('<button>')
						.addClass('btn btn-default')
						.attr('type','button')
						.text('Remove')
						.click(function(){
							var optionContainer = $(this).parentsUntil('div.container-fluid').parent();
							if(localStorage.getItem('confirmedRemove') === 'true') {
								removeOption(optionContainer);
							}
							else {
								bootbox.confirm({
									size : 'small',
									animate : false,
    								message : 'All data on "Play" tab will be lost. Are you sure?', 
    								callback : function(result) {
    									if(result) {
    										localStorage.setItem('confirmedRemove', true);
    										removeOption(optionContainer);
										}
										else {
											localStorage.setItem('confirmedRemove', false);
										}
									}
								});
							}
						})
					)
				)
			)
			.find('input').on('change',optionChangeHandler)
			.end()
		)
	);
	$('#play').append(getOptionMarkup(index));	
	//-- Workaround to fix initial positions of tooltips
	$('#play').find('input').each(function(){
		$(this).trigger('slideStop');
	});
	
	$(window).scrollTop($(document).height() - $(window).height());
}
function removeOption(container) {
	container.remove();
	$('#play').find('fieldset').remove();
	$('#setup > div.container-fluid').slice(0,-1).each(function(index){
		//-- Add corresponding option fieldset on the Play tab
		$('#play').append(getOptionMarkup(index + 1));
		//-- Name through existing options
		$(this)
		.find('label')
		.attr('for','opt_' + (index + 1))
		.text('Option ' + (index + 1))
		.end()
		.find('input')
		.attr({
			'id' : 'opt_' + (index + 1),
			'placeholder' : 'Name your "Option ' + (index + 1) + '" here'			
		})
		.trigger('change');
	});
}
$(document).ready(function(){
	// Initialization
	console.log("Welcome!");
	localStorage.setItem('confirmedRemove', false);	
	// Swipe handlers
	$('.tab-pane:lt(2)').swiperight(function() {
		$('.nav-tabs > .active').prev('li').find('a').trigger('click');
	});
	$('.tab-pane:lt(2)').swipeleft(function() {
		$('.nav-tabs > .active').next('li').find('a').trigger('click');
	});	
	// Triggers for "Intro" tab links
	$('#intro a[href=#setup]').click(function(){
		$('.nav-tabs li a[href=#setup]').trigger('click');
		return false;
	});
	$('#intro a[href=#play]').click(function(){
		$('.nav-tabs li a[href=#play]').trigger('click');
		return false;
	});
	// "Personalization" tab addOption handler
	$('#btnAddOptions')
	.click(addButtonHandler)
	.trigger('click')
	.trigger('click')
	.trigger('click');	
});
