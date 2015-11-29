$(document).ready(function(){
	console.log("Welcome!")
	$('.tab-content').swiperight(function() {
		$('.nav-tabs > .active').prev('li').find('a').trigger('click');
		console.log("right")
	});
	$('.tab-content').swipeleft(function() {
		$('.nav-tabs > .active').next('li').find('a').trigger('click');
		console.log("left")
	});
	$('#intro a[href=#setup]').click(function(){
		$('.nav-tabs li a[href=#setup]').trigger('click');
		return false;
	});
	$('#intro a[href=#play]').click(function(){
		$('.nav-tabs li a[href=#play]').trigger('click');
		return false;
	});
})
