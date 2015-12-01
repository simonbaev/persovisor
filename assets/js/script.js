function v2c(value, color, limit) {
	limit = typeof limit !== 'undefined' ? limit : [0,100];
	return color[0] + Math.round((value - limit[0]) * (color[1] - color[0]) / (limit[1] - limit[0]));	
}
function sliderChangeHandler(v) {
	var R = [0x00, 0x99], G = [0x00, 0x00], B = [0x99, 0x00];
	var value = typeof v.value !== 'undefined' ? v.value.newValue : 0;
	var target = '#' + v.target.id + '_S .slider-handle';
	var color = 'rgb(' + v2c(value,R) + ',' + v2c(value,G) + ',' + v2c(value,B) + ')';
	$(target).css('background',color);
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
									'id' : 'opt' + index + '_PI'
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
									'id' : 'opt' + index + '_PL'
								})
							)
						)
					)
				)
			)
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
									'id' : 'opt' + index + '_CI'
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
									'id' : 'opt' + index + '_CL'
								})
							)
						)
					)
				)
			)
		)
	)
	//-- Pros Intensity
	result
	.find('#opt' + index + '_PI')
	.slider({
		id: 'opt' + index + '_PI_S', 
		min: 0, 
		max: 100, 
		value: 0, 
		tooltip: 'hide' 
	})
	.on('change', sliderChangeHandler)
	//-- Pros Likelihood
	result
	.find('#opt' + index + '_PL')
	.slider({
		id: 'opt' + index + '_PL_S', 
		min: 0, 
		max: 100, 
		value: 0, 
		tooltip: 'hide' 
	})
	.on('change', sliderChangeHandler)
	//-- Cons Intensity
	result
	.find('#opt' + index + '_CI')
	.slider({
		id: 'opt' + index + '_CI_S', 
		min: 0, 
		max: 100, 
		value: 0, 
		tooltip: 'hide' 
	})
	.on('change', sliderChangeHandler)
	//-- Cons Likelihood
	result
	.find('#opt' + index + '_CL')
	.slider({
		id: 'opt' + index + '_CL_S', 
		min: 0, 
		max: 100, 
		value: 0, 
		tooltip: 'hide' 
	})
	.on('change', sliderChangeHandler)
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
							var container = $(this).parentsUntil('div.container-fluid').parent();
							if(localStorage.getItem('confirmedRemove') === 'true') {
								removeContainer(container);
							}
							else {
								bootbox.confirm({
									size : 'small',
									animate : false,
    								message : 'All data on "Play" tab will be lost. Are you sure?', 
    								callback : function(result) {
    									if(result) {
    										localStorage.setItem('confirmedRemove', true);
    										removeContainer(container);
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
		)
	)
	$(window).scrollTop($(document).height() - $(window).height());
}
function removeContainer(container) {
	container.remove();
	$('#setup > div.container-fluid').slice(0,-1).each(function(index){
		$(this)
		.find('label')
		.attr('for','opt_' + (1 + index))
		.text('Option ' + (1 + index))
		.end()
		.find('input')
		.attr({
			'id' : 'opt_' + (1 + index),
			'placeholder' : 'Name your "Option ' + (1 + index) + '" here'			
		})
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
	$('#play')
	.append(getOptionMarkup(1))
	.append(getOptionMarkup(2))
	.append(getOptionMarkup(3))
	.find('input').trigger('change');

})
