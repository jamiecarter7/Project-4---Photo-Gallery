// Aim: On press load up a modal overlay with the image and the title and blurb and tags.

var $lightbox = $(".lightbox");

// image array to use for numbering and for location in list
var allImagesArray = [];

//store current image location via number
var imageNumberPosition = 0;


////////////////////////////////////////////////////////////////
//functions

//next image function
var nextImage = function() {
	console.log('current number: ' + imageNumberPosition);
	imageNumberPosition += 1;
	console.log('old number + 1 = ' + imageNumberPosition);
};


//previous image function
var previousImage = function() {
	console.log('current number: ' + imageNumberPosition);
	imageNumberPosition -= 1;
	console.log('old number + 1 = ' + imageNumberPosition);
};


//hide show lightbox navigation buttons
var lightboxButtons = function(){
	//show or hide next and previous images based on image selected
	//previous button
	if ( imageNumberPosition === 0 ){
		$('.lightbox-previous').hide();
		$('.lightbox-previous-placeholder').show();
		console.log('hide previous button');
	} else {
		$('.lightbox-previous').show();
		$('.lightbox-previous-placeholder').hide();
		console.log('show previous button');
	}

	//next button
	if ( imageNumberPosition === allImagesArray.length - 1) {
		$('.lightbox-next').hide();
		$('.lightbox-next-placeholder').show();
		console.log('hide next button');
	} else {
		$('.lightbox-next').show();
		$('.lightbox-next-placeholder').hide();
		console.log('show next button');
	}
};

//update lightbox image on navigation
	//update image or video

var updateLightbox = function() {
	var a = $("img[src$='" + allImagesArray[imageNumberPosition] + "']").siblings('video').length;
	console.log(a);
	if ( a > 0){
			$(".lightbox-video").show();
			$(".lightbox-video").empty();
			$(".lightbox-video").html('<source src="duckvideo.mp4" type="video/mp4"></source>' );
			$(".lightbox-image").attr('src', allImagesArray[imageNumberPosition]);
			$(".lightbox-video")[0].play();
			$(".lightbox-image").hide();
	} else {
			$(".lightbox-video").hide();
			$(".lightbox-video")[0].pause();
			$(".lightbox-image").attr('src', allImagesArray[imageNumberPosition]);
			$(".lightbox-image").show();
	}
	
	//update title
	var newLightboxTitle;
	newLightboxTitle = $("img[src$='" + allImagesArray[imageNumberPosition] + "']").siblings('div').children('h2').text();
	console.log(newLightboxTitle);
	$(".lightbox h2").text(newLightboxTitle);

	//update blurb
	var newLightboxBlurb;
	newLightboxBlurb = $("img[src$='" + allImagesArray[imageNumberPosition] + "']").siblings('div').children('p').first().text();
	console.log(newLightboxBlurb);
	$(".lightbox p").first().text(newLightboxBlurb);

	//update tags
	//get tags as an array
	var newLightboxTags = '';
	$("img[src$='" + allImagesArray[imageNumberPosition] + "']").siblings('div').children('.tags').children('span').each(function (){
			newLightboxTags += '<span>' + $(this).html() + '</span>';
		});
	console.log(newLightboxTags);
	$(".lightbox-tags").html(newLightboxTags);

	lightboxButtons();

};

//random number generator
var randomNumber = function (min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

//0-indexed to 1-indexed
var zeroToOneIndexed = function  (number){
	return number + 1;
};

//1-indexed to 0-indexed
var OneToZeroIndexed = function  (number){
	return number - 1;
};

//fade effects
$(window).ready(function () {
    fadeEffect();
});

var fadeEffect = function(){
	var counter = 0;
    $(".image-card").each(function() {
        counter = counter + 200;
        $(this).delay(counter).fadeTo(1000, 1);
		
		if ( $(this).children('video').length > 0) {
			$(this).children('img').after('<img class="content playbutton" src="img/play.svg" alt="">');
			console.log('video present');
		}
	});
};

//searchbar function
var searchFunction = function(){
	//capture search term
	var searchTerm = $searchbar.val();

	// update nav search bar contents
	$('#nav-searchbar').val( searchTerm );
	

	console.log('Searching: ' + searchTerm);
	console.log('number of images: ' + numberOfImages);

	//update lightbox search criteria
	if (searchTerm === ''){
		$('.lightbox-currentsearch').hide();
	} else {
		$('.lightbox-currentsearch').append().text('Current search: ' + searchTerm);
		$('.lightbox-currentsearch').show();
	}

	//empty card container
	$('.card-container').empty();
	var imageCardChildSearch = 0;
	//loop through each image within the array using 'numberOfImages' variable
	for (i = 0; i < numberOfImages; i += 1){
		
		var tagSearchMatchesCount = 0;
		// this counts up for each image added for targetting purposes
		
		var nthChildPlus1 = i + 1;
		//console.log('<---- Searching image ' + nthChildPlus1 + '---->')
		//loop through all the tags for selected image, do not include [0] this is the image url
		for (j = 3; j < imageDataArray[i].length ; j += 1){
			
			//console.log('searching tag:' + imageDataArray[i][j]);
			
			// if greater than 0 display image (+1 per tag matched)
			if ( imageDataArray[i][j].indexOf(searchTerm) >= 0){	

				//console.log(imageDataArray[i][j] + ' matches search term');
				//store match count, this stops the next tag hiding the image if its not present
				tagSearchMatchesCount += 1;
			}
			//console.log('matched tag: ' + tagSearchMatchesCount);

		}
		
		//console.log('nth child + 1 = ' + nthChildPlus1);
		if ( tagSearchMatchesCount > 0 ){
			
			//show image
			console.log('insert image ' + nthChildPlus1);
			//$(".image-card:nth-child(" + nthChildPlus1 + ")").show();
			var $cardContainer = $('.card-container');

			//create nested div
			$cardContainer.append( $('<div/>', {'class': 'image-card', 'style': 'opacity: 0'} )
            	.append( $('<img>', {'class': 'content', 'src': imageDataArray[i][0], 'alt': imageDataArray[i][1]} )
            	)
            	.append( $('<div/>', {'class': 'content'})
            		.append( $('<h2/>', {text: imageDataArray[i][1]} ) )
            		.append( $('<p/>', {'class': 'hidden', text: imageDataArray[i][2]} )
                	
				).append( $('<p/>', { 'class': 'hidden tags'} )
					.append( htmlTags(i) )	
                	)
            	)
        	);

			
			console.log('this is i = ' + i);
			if ( $('.image-card').children('div').children('p.tags').children('span').last().html() === 'video' ){
					$('.image-card:eq(' + imageCardChildSearch + ')').children('img.content').after('<video class="content video hidden" controls><source src="myPhotos/duckvideo.mp4" type="video/mp4">Your browser does not support the video tag.</video>');
			}

			console.log('inserting card' + imageCardChildSearch);
			imageCardChildSearch += 1;

		} else {

			//hide image
			//console.log('remove image ' + nthChildPlus1);

			
			//$(".image-card:nth-child(" + nthChildPlus1 + ")").hide();

		}


		tagSearchMatchesCount = 0;
	}

	fadeEffect();
	imageCardChildSearch = 0;
};

//build html tags inside a <span>
var htmlTags = function(i){
	var htmlString;
	for (j = 3; j < imageDataArray[i].length; j += 1){
		htmlString += '<span>' + imageDataArray[i][j] + '</span>';
	}
	return htmlString;
};

//get 3 random tags for under the search bar
var getRandomTags = function(){
	for (var i = 0; i < 3; i += 1) {
		//create random number between 0 and array length to target random image
		var targetRandomImage = randomNumber(0, OneToZeroIndexed( arrayOfAllImagesAndTags.length ));
		//console.log('image: ' + zeroToOneIndexed(targetRandomImage));
		//create random number between 1 (0 = image url) and array length of randomimage to target random tag
		var targetRandomTag = randomNumber(1, OneToZeroIndexed( arrayOfAllImagesAndTags[targetRandomImage].length ));
		//console.log('image ' + zeroToOneIndexed(targetRandomImage) + ': ' + targetRandomTag);
		//get tag from array
		var searchbarTag = arrayOfAllImagesAndTags[targetRandomImage][targetRandomTag];
		console.log(searchbarTag);
		

		//show tag in searchbar
		if ( $(".searchbar-tags").children('span:nth-child(' + 1 + ')').text() === searchbarTag){
			console.log('----- matching tags found - rerun function ------');
			i -= 1;
		} else if ( $(".searchbar-tags").children('span:nth-child(' + 2 + ')').text() === searchbarTag ){
			console.log('----- matching tags found - rerun function ------');
			i -= 1;
		} else {	
			$(".searchbar-tags").append('<span>' + searchbarTag + '</span>');
		}
	}

	$(".searchbar-tags").append('<img src="img/refresh.svg" alt="refresh-icon">');

};

////////////////////////////////////////////////////////////////
//place random tags in navbar
var randomTagsInNav = function (){
	//copy html in tags bar
	var html = $('.searchbar-tags').html();
	//empty tags in nav
	$('.nav-searchbar-tags').empty();
	//place html in nav bar
	$('.nav-searchbar-tags').html( html );
};

////////////////////////////////////////////////////////////////
//on mouse up image load (or video)
$( ".card-container" ).on('click', '.image-card', function(){

	//capture the image
	var imageUrl = $(this).children('img').attr('src');
	console.log(videoUrl);

	//capture video
	var videoUrl = $(this).children('.video').children().first().attr('src');
	console.log(videoUrl);

	//capture the title
	var titleText = $(this).children('div.content').children('h2').text();

	//capture the blurb
	var blurbText = $(this).children('div.content').children('p').first().text();

	//capture the tags
	var tagsArray = [];
	$(this).children('div.content').children('p.tags').children('span').each(function (){
						tagsArray.push($(this).text());
					});
	console.log(tagsArray);

	//display image
	if ( $(this).children('video').length > 0){
		$(".lightbox-video").show();
		$(".lightbox-video").empty();
		$(".lightbox-video").html('<source src="duckvideo.mp4" type="video/mp4"></source>' );
		$(".lightbox-image").attr('src', imageUrl);
		$(".lightbox-video")[0].play();
		//$(".lightbox-video").children().attr('src', imageUrl);
		$(".lightbox-image").hide();
	} else {
		$(".lightbox-video").hide();
		$(".lightbox-image").attr('src', imageUrl);
		$(".lightbox-image").show();
	}
	
	//display title
	$lightbox.children('h2').text(titleText);
	//display blurb
	$lightbox.children('p').first().text(blurbText);
	//display tags
	$lightbox.children('p.lightbox-tags').html( function(tagHTML){
		var tagHTML = '';
		for (i = 0; i < tagsArray.length; i += 1){ 
			tagHTML += '<span class="lightbox-span">' + tagsArray[i] + '</span>';
		}
		console.log(tagHTML);
		return tagHTML;
	});

	//display nav buttons (previous and next)(only if available)
	//imagecard location as variable
	var $imageCard = $('.image-card');
	// image array to use for numbering and for location in list
	allImagesArray = [];
	$imageCard.each(function (){
			allImagesArray.push( 
				$(this).children('img').attr('src')
			);
	});

	// print array length
	console.log(allImagesArray.length);
	//print images array
	console.log(allImagesArray);

	//find current image position
	imageNumberPosition = allImagesArray.indexOf( $(this).children('img').attr('src') );
	console.log(imageNumberPosition);

	//show hide next previous buttons
	lightboxButtons();

	//display lightbox
	$lightbox.show();

});
	
	
	
////////////////////////////////////////////////////////////////
//when clicking the image button within a lightbox
$( ".lightbox-image").click( function(){
	
	//if last image do not execute function
	if (imageNumberPosition === allImagesArray.length - 1){
		console.log('click: lightbox image - CANCELLED');
	} else {
		console.log('click: lightbox image');
		//next image array number
		nextImage();
		//update lightbox
		updateLightbox();
	}
	
});

$( ".lightbox-video").click( function(){
	
	//if last image do not execute function
	if (imageNumberPosition === allImagesArray.length - 1){
		console.log('click: lightbox image - CANCELLED');
	} else {
		console.log('click: lightbox image');
		//next image array number
		nextImage();
		//update lightbox
		updateLightbox();
	}
	
});



////////////////////////////////////////////////////////////////
//when clicking previous button within a lightbox
$( ".lightbox-previous" ).click( function(){
	console.log('click: previous button');
	//previous image array number
	previousImage();
	//update lightbox
	updateLightbox();
});


////////////////////////////////////////////////////////////////
//when clicking next button within a lightbox
$( ".lightbox-next" ).click( function(){
	console.log('click: next button');
	//next image array number
	nextImage();
	//update lightbox
	updateLightbox();
});


////////////////////////////////////////////////////////////////
//on mouse up on close button (within lightbox)
$(".lightbox-close").mouseup( function(){
	console.log('close lightbox');
	//hide lightbox
	$lightbox.hide();
	$(".lightbox-video")[0].pause();
});


////////////////////////////////////////////////////////////////
//search bar interaction

//create 2d array of tags
var arrayOfAllImageTags = [];
$(".image-card").each(
	function (){
		$(this).children('div.content').children('p.tags').children('span').each(
			function (){
				arrayOfAllImageTags.push($(this).text());
			}
		);
	});

//array of all image data
var imageDataArray = [];
var numberOfImages = 0;
$(".image-card").each(function(){
	numberOfImages += 1;
});
console.log('number of images: ' + numberOfImages);

for (i = 0; i < numberOfImages; i += 1){
	//create new array for each image
	imageDataArray[i] = new Array();
	//specify nthchild selector for .imagecard
	var nthchild = i + 1;
	//inserting image url and tags into indivdual array
	$(".image-card:nth-child(" + nthchild + ")").each(function(){
		//insert array data, 0 = img url, 1 = title, 2 = blurb, 3+ = tags
		imageDataArray[i].push( $(this).children('img').attr('src') );
		imageDataArray[i].push( $(this).children('div').children('h2').text() );
		imageDataArray[i].push( $(this).children('div').children('p').first().text() );
		//loop through all tags and push() into array
		$(this).children('div.content').children('p.tags').children('span').each(
			function (){ 
				imageDataArray[i].push( $(this).text() );
			}
		);

		if ( $(".image-card:nth-child(" + nthchild + ")").children('video').length > 0){
			imageDataArray[i].push('video');
		}
	});
}

console.log(imageDataArray);

//--------------------------------------------------old method --------
//array of all images and tags on page
var arrayOfAllImagesAndTags = [];
var numberOfImages = 0;
$(".image-card").each(function(){
	numberOfImages += 1;
});
console.log('number of images: ' + numberOfImages);


for (i = 0; i < numberOfImages; i += 1){
	//creating an array per image
	arrayOfAllImagesAndTags[i] = new Array();
	//inserting image url and tags into indivdual array
	//specify nthchild selector for .imagecard
	

	var nthchild = i + 1;

	$(".image-card:nth-child(" + nthchild + ")").each(function(){
		//insert image url in position 0 of array
		arrayOfAllImagesAndTags[i].push( $(this).children('img').attr('src') );
		
		//loop through all tags and push() into array
		$(this).children('div.content').children('p.tags').children('span').each(

							function (){ 
								arrayOfAllImagesAndTags[i].push($(this).text());
							}

		);
		
	});

}

var $searchbar = $('input#searchbar');
//on key up search through tags in arrayOfAllImagesAndTags array.
$searchbar.keyup( function(){
	searchFunction();
});

console.log(arrayOfAllImagesAndTags);
// for (var i = 0; i < 10; i++) {
//   x[i] = new Array(20);
//}

////////////////////////////////////////////////////////////////
//show 3 random tags under search bar
getRandomTags();

////////////////////////////////////////////////////////////////
//show 3 new random tags under search bar on pressing refresh button
//header refresh
$('.searchbar-tags').on('click','img', function(){
	$(".searchbar-tags").empty();
	getRandomTags();
	randomTagsInNav();
});
//nav bar refresh
$('.nav-searchbar-tags').on('click','img', function(){
	$(".searchbar-tags").empty();
	getRandomTags();
	randomTagsInNav();
});

////////////////////////////////////////////////////////////////
//clicking any tag places it into search bar
$('.tags').on('click','span', function(){
	//hide lightbox if open
	$lightbox.hide();
	//capture tag
	var tagClicked = $(this).text();
	console.log(tagClicked);
	//place into search bar
	$searchbar.val(tagClicked);
	searchFunction();
});
////////////////////////////////////////////////////////////////
//clear function
$('.clear-button').on('click', function(){
	console.log('clear pressed');
	$('.searchbar-js').val('');
	searchFunction();
});

////////////////////////////////////////////////////////////////
// nav search bar term placed into main search box
$('#nav-searchbar').keyup(function(){
	$('#searchbar').val( $('#nav-searchbar').val() );
	searchFunction();
});

//keyboard navigation for lightbox
$(document).keydown(function(e) {
    switch(e.which) {
        case 37: // left
            if (imageNumberPosition > 0) {
        		previousImage();
        		updateLightbox();
        	}
        	console.log('left');
        break;

        case 38: // up
        break;

        case 39: // right
        	//stop if at end of list
        	if (imageNumberPosition < OneToZeroIndexed($('.image-card').length)) {
				nextImage();
        		updateLightbox();
        	}
        	console.log('right');
        break;

        case 27: // esc
        $lightbox.hide();
        $(".lightbox-video")[0].pause();
        console.log('esc');
        break;

        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
});

randomTagsInNav();

$(function(){
    $(window).scroll(function() {
        if ( $(this).scrollTop() >= 290) {
            $('nav').show();
        }
        else {
            $('nav').hide();
        }
    });
});

