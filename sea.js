var slicenum = 50;
                                               console.log("var slicenum = 50;");
var tags = 'brighton';
                                               console.log("var tags = 'brighton';");
var count = 0;
                                               console.log("var count = 0;");
var page = 1;
                                               console.log("var page = 1;");
var divwidth;
                                               console.log("var divwidth;");
var photoarray = [];
                                               console.log("var photoarray = [];");
var slicearray = [];
                                               console.log("var slicearray = [];");
var resetcounter;
                                               console.log("var resetcounter;");
var resetinterval;
                                               console.log("var resetinterval;");





$(document).ready(function() {
                                               console.log("$(document).ready(function() {");

                                               console.log("");
	if ($('#slices').html() != '') {
                                               console.log("	if ($('#slices').html() != '') {");
		slicenum = $('#slices').html();
                                               console.log("		slicenum = $('#slices').html();");
		if (slicenum > 100) {
                                               console.log("		if (slicenum > 100) {");
			slicenum = 100;
                                               console.log("			slicenum = 100;");
			}
                                               console.log("			}");
		}
                                               console.log("		}");
	if ($('#tags').html() != '') {
                                               console.log("	if ($('#tags').html() != '') {");
		tags = $('#tags').html();
                                               console.log("		tags = $('#tags').html();");
		}
                                               console.log("		}");
		
                                               console.log("		");
	divwidth = 100 / slicenum + '%';
                                               console.log("	divwidth = 100 / slicenum + '%';");

                                               console.log("");
	for (var j = 0; j < slicenum; j++) {
                                               console.log("	for (var j = 0; j < slicenum; j++) {");
		// draw in the divs
                                               console.log("		// draw in the divs");
		$('#container').append('<div class="slice" id="slice'+j+'"></div>');
                                               console.log("		$('#container').append('<div class='slice' id='slice'+j+''></div>');");
		}
                                               console.log("		}");
	populateSlices();
                                               console.log("	populateSlices();");
	getPhotos();
                                               console.log("	getPhotos();");
	});





function populateSlices() {
                                               console.log("function populateSlices() {");
	for (var j = 0; j < slicenum; j++) {
                                               console.log("	for (var j = 0; j < slicenum; j++) {");
		// set divwidth
                                               console.log("		// set divwidth");
		$("#slice" + j).css("width",divwidth);
                                               console.log("		$('#slice' + j).css('width',divwidth);");
		// add slice to array
                                               console.log("		// add slice to array");
		slicearray.push(j);
                                               console.log("		slicearray.push(j);");
		}
                                               console.log("		}");
	// randomise slice array
                                               console.log("	// randomise slice array");
    slicearray.sort(function() {return 0.5 - Math.random()})
                                               console.log("    slicearray.sort(function() {return 0.5 - Math.random()})");
	}




function getPhotos() {
                                               console.log("function getPhotos() {");
	var url ='http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=095ce60fc0fe177b058bb79f0eeceb6c&per_page='+slicenum+'&tags='+tags+'&sort=relevance&page='+page+'&format=json&jsoncallback=?';
                                               console.log("	var url ='http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=095ce60fc0fe177b058bb79f0eeceb6c&per_page='+slicenum+'&tags='+tags+'&sort=relevance&page='+page+'&format=json&jsoncallback=?';");
	
                                               console.log("	");
	$.getJSON(url, function(data){
                                               console.log("	$.getJSON(url, function(data){");
		$.each(data.photos.photo, function(i,photo) {
                                               console.log("		$.each(data.photos.photo, function(i,photo) {");
    		var src='http://farm'+photo.farm+'.static.flickr.com/'+photo.server+'/'+photo.id+'_'+photo.secret+'_z.jpg';
                                               console.log("    		var src='http://farm'+photo.farm+'.static.flickr.com/'+photo.server+'/'+photo.id+'_'+photo.secret+'_z.jpg';");
    		photoarray.push(src);
                                               console.log("    		photoarray.push(src);");
    		});
                                               console.log("    		});");
    	// start loop
                                               console.log("    	// start loop");
    	update();
                                               console.log("    	update();");
    	imageloop();
                                               console.log("    	imageloop();");
    	})
                                               console.log("    	})");
	}




function imageloop() {
                                               console.log("function imageloop() {");
	if (count < slicenum) {
                                               console.log("	if (count < slicenum) {");
		var imgsrc = photoarray.shift();
                                               console.log("		var imgsrc = photoarray.shift();");
		var slicecount = slicearray.shift();
                                               console.log("		var slicecount = slicearray.shift();");
		
                                               console.log("		");
		var imgstring = "url('"+imgsrc+"')";
                                               console.log("		var imgstring = 'url(''+imgsrc+'')';");
    	$("#slice" + slicecount).css("background-image",imgstring);
                                               console.log("    	$('#slice' + slicecount).css('background-image',imgstring);");
		update();
                                               console.log("		update();");
		$('<img/>').attr('src', imgsrc).load(function() {
                                               console.log("		$('<img/>').attr('src', imgsrc).load(function() {");
    		count = count+1;
                                               console.log("    		count = count+1;");
    		imageloop();
                                               console.log("    		imageloop();");
			});
                                               console.log("			});");
		}
	else if (count == slicenum) {
                                               console.log("	else if (count == slicenum) {");
		reset();
                                               console.log("		reset();");
		}
                                               console.log("		}");
	}




function update() {
                                               console.log("function update() {");
	$('#info').show();
                                               console.log("	$('#info').show();");
	$('p.tags').html(tags);
                                               console.log("	$('p.tags').html(tags);");
	$('p.progress').html('Drawing '+count+' of '+slicenum+' (Page '+page+')');	
                                               console.log("	$('p.progress').html('Drawing '+count+' of '+slicenum+' (Page '+page+')');	");
	}





function reset() {
                                               console.log("function reset() {");
	resetcounter = 60;
                                               console.log("	resetcounter = 60;");
	$('p.progress').html('Next page in '+resetcounter);
                                               console.log("	$('p.progress').html('Next page in '+resetcounter);");
	resetinterval = setInterval("resetclock()",1000);
                                               console.log("	resetinterval = setInterval('resetclock()',1000);");
	}
                                               console.log("	}");
function resetclock() {
                                               console.log("function resetclock() {");
	if (resetcounter > 0) {
                                               console.log("	if (resetcounter > 0) {");
		resetcounter = resetcounter - 1;
                                               console.log("		resetcounter = resetcounter - 1;");
		$('p.progress').html('Next page in '+resetcounter);
                                               console.log("		$('p.progress').html('Next page in '+resetcounter);");
		}

	else {
                                               console.log("	else {");
		clearInterval(resetinterval);
                                               console.log("		clearInterval(resetinterval);");
		$('p.reset').html(' ');
                                               console.log("		$('p.reset').html(' ');");
		$(".slice").css("background-image","");
                                               console.log("		$('.slice').css('background-image','');");
		count = 0;
                                               console.log("		count = 0;");
		page = page+1;
                                               console.log("		page = page+1;");
		populateSlices();
                                               console.log("		populateSlices();");
		getPhotos();		
                                               console.log("		getPhotos();		");
		}
                                               console.log("		}");
	}
                                               console.log("	}");
