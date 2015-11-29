
function removeContainer(container) {
	container.remove();
	$('#setup > div.container-fluid').slice(1,-1).each(function(index){
		$(this)
		.find('label')
		.attr('for','opt_' + (4 + index))
		.text('Option ' + (4 + index))
		.end()
		.find('input')
		.attr({
			'id' : 'opt_' + (4 + index),
			'placeholder' : 'Name your "Option ' + (4 + index) + '" here'			
		})
	})	
}
$(document).ready(function(){
	// Initialization
	console.log("Welcome!")
	localStorage.setItem('confirmedRemove', false);
	// Swipe handlers
	$('.tab-content').swiperight(function() {
		$('.nav-tabs > .active').prev('li').find('a').trigger('click');
		console.log("right")
	});
	$('.tab-content').swipeleft(function() {
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
	$('#btnAddOptions').click(function() {
		localStorage.setItem('confirmedRemove', false);
		var N = $('#setup > div.container-fluid').length - 1;
		$('#setup > div.container-fluid').last()
		.before(
			$('<div>')
			.addClass('container-fluid')
			.append(
				$('<div>')
				.addClass('form-group')
				.append(
					$('<label>')
					.attr('for', 'opt_' + (3 + N))
					.text('Option ' + (3 + N))
				)
				.append(
					$('<div>')
					.addClass('input-group')
					.append(
						$('<input>')
						.addClass('form-control')
						.attr({
							'type' : 'text',
							'id' : 'opt_' + (3 + N),
							'placeholder' : 'Name your "Option ' + (3 + N) + '" here'
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
	});
})
