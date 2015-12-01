function v2c(value, color, limit) {
	limit = typeof limit !== 'undefined' ? limit : [0,100];
	return color[0] + Math.round((value - limit[0]) * (color[1] - color[0]) / (limit[1] - limit[0]));	
}
function sliderChangeHandler(v) {
	var R = [0x00, 0x99], G = [0x00, 0x00], B = [0x99, 0x00];
	var value = typeof v.value !== 'undefined' ? v.value.newValue : 0;
	var target = '#' + v.target.id + '_S .slider-handle';
	var color = 'rgb(' + v2c(value,R) + ',' + v2c(value,G) + ',' + v2c(value,B) + ')';
	//console.log($('#' + v.target.id).getAttribute('max'));
	$(target).css('background',color);
}
function optionChangeHandler(e) {
	var index = e.target.id.split('_')[1];
	$('#fs_' + e.target.id).find('legend').text(e.target.value !== '' ? e.target.value : 'Option ' + index);
}

function getOptionMarkup(index) {
	var result = 
	$('<fieldset>')
	.attr('id','fs_opt_' + index)	
	.addClass('bg-warning')
	.append(
		$('<legend>')
		.text($('#opt_' + index).val() === '' ? 'Option ' + index : $('#opt_' + index).val())
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
							.addClass('col-xs-6 text-left')
							.append(
								$('<strong>')
								.text('weak')
							)
						)
						.append(
							$('<div>')
							.addClass('col-xs-6 text-right')
							.append(
								$('<strong>')
								.text('strong')
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
							.addClass('col-xs-6 text-left')
							.append(
								$('<strong>')
								.text('seldom')
							)
						)
						.append(
							$('<div>')
							.addClass('col-xs-6 text-right')
							.append(
								$('<strong>')
								.text('often')
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
							.addClass('col-xs-6 text-left')
							.append(
								$('<strong>')
								.text('weak')
							)
						)
						.append(
							$('<div>')
							.addClass('col-xs-6 text-right')
							.append(
								$('<strong>')
								.text('strong')
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
							.addClass('col-xs-6 text-left')
							.append(
								$('<strong>')
								.text('seldom')
							)
						)
						.append(
							$('<div>')
							.addClass('col-xs-6 text-right')
							.append(
								$('<strong>')
								.text('often')
							)
						)
					)
				)
			)
		)
	)
	var defaultSliderObject = {
		min: 0, 
		max: 100, 
		value: 0, 
		tooltip: 'hide' 
	}
	result.find('#opt' + index + '_PI').slider(defaultSliderObject).on('change', sliderChangeHandler)
	result.find('#opt' + index + '_PL').slider(defaultSliderObject).on('change', sliderChangeHandler)
	result.find('#opt' + index + '_CI').slider(defaultSliderObject).on('change', sliderChangeHandler)
	result.find('#opt' + index + '_CL').slider(defaultSliderObject).on('change', sliderChangeHandler)
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
				index <= 3
				?
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
								})
							}
						})
					)
				)
			)
			.find('input').on('change',optionChangeHandler)
			.end()
		)
	)
	$('#play').append(getOptionMarkup(index));
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
		.trigger('change')
	})		
}
$(document).ready(function(){
	// Initialization
	console.log("Welcome!")
	localStorage.setItem('confirmedRemove', false);	
	// Swipe handlers
	$('.tab-pane:lt(2)').swiperight(function() {
		$('.nav-tabs > .active').prev('li').find('a').trigger('click');
		console.log("right")
	});
	$('.tab-pane:lt(2)').swipeleft(function() {
		$('.nav-tabs > .active').next('li').find('a').trigger('click');
		console.log("left")
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
	.trigger('click')
	// "Play" tab initialization
	$('#play').find('input').trigger('change');

})
