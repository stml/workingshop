var slicenum = 10;
var tags = 'sea';

var count = 0;
var page = 1;
var divwidth;
var photoarray = [];
var slicearray = [];
var resetcounter;
var resetinterval;

$(document).ready(function() {

	if ($('#slices').html() != "") {
		slicenum = $('#slices').html();
		if (slicenum > 100) {
			slicenum = 100;
			}
		}
	if ($('#tags').html() != "") {
		tags = $('#tags').html();
		}
		
	divwidth = 100 / slicenum + '%';

	for (var j = 0; j < slicenum; j++) {
		// draw in the divs
		$("#container").append('<div class="slice" id="slice'+j+'"></div>');
		}
	populateSlices();
	getPhotos();
	});
	
function populateSlices() {
	for (var j = 0; j < slicenum; j++) {
		// set divwidth
		$("#slice" + j).css("width",divwidth);
		// add slice to array
		slicearray.push(j);
		}
	// randomise slice array
    slicearray.sort(function() {return 0.5 - Math.random()})
	}
	
function getPhotos() {
	var url ='http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=095ce60fc0fe177b058bb79f0eeceb6c&per_page='+slicenum+'&tags='+tags+'&sort=relevance&page='+page+'&format=json&jsoncallback=?';
	
	$.getJSON(url, function(data){
		$.each(data.photos.photo, function(i,photo) {
    		var src='http://farm'+photo.farm+'.static.flickr.com/'+photo.server+'/'+photo.id+'_'+photo.secret+'_z.jpg';
    		photoarray.push(src);
    		});
    	// start loop
    	update();
    	imageloop();
    	})
	}
	
function imageloop() {
	if (count < slicenum) {
		var imgsrc = photoarray.shift();
		var slicecount = slicearray.shift();
		
		var imgstring = "url('"+imgsrc+"')";
    	$("#slice" + slicecount).css("background-image",imgstring);
		update();
		$('<img/>').attr('src', imgsrc).load(function() {
    		count = count+1;
    		imageloop();
			});
		}
	else if (count == slicenum) {
		reset();
		}
	}
	
function update() {
	$('#info').show();
	$('p.tags').html(tags);
	$('p.progress').html('Drawing '+count+' of '+slicenum+' (Page '+page+')');	
	}
	
function reset() {
	resetcounter = 60;
	$('p.progress').html('Next page in '+resetcounter);
	resetinterval = setInterval("resetclock()",1000);
	}
function resetclock() {
	if (resetcounter > 0) {
		resetcounter = resetcounter - 1;
		$('p.progress').html('Next page in '+resetcounter);
		}
	else {
		clearInterval(resetinterval);
		$('p.reset').html(' ');
		$(".slice").css("background-image","");
		count = 0;
		page = page+1;
		populateSlices();
		getPhotos();		
		}
	}
