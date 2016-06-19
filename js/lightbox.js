// Aim: On press load up a modal overlay with the image and the title and blurb and tags.

var $lightbox = $(".lightbox");
//$lightbox.hide()

// image array to use for numbering and for location in list
var allImagesArray = [];

//store current image location via number
var imageNumberPosition = 0;

//next image function
var nextImage = function() {
	console.log('current number: ' + imageNumberPosition);
	imageNumberPosition += 1;
	console.log('old number + 1 = ' + imageNumberPosition);
}

var previousImage = function() {
	console.log('current number: ' + imageNumberPosition);
	imageNumberPosition -= 1;
	console.log('old number + 1 = ' + imageNumberPosition);
}

var lightboxButtons = function(){
	//show or hide next and previous images based on image selected
	//previous button
	if ( imageNumberPosition === 0 ){
		$('.lightbox-previous').hide();
		$('.lightbox-previous-placeholder').show();
		console.log('hide previous button')
	} else {
		$('.lightbox-previous').show();
		$('.lightbox-previous-placeholder').hide();
		console.log('show previous button')
	};

	//next button
	if ( imageNumberPosition === allImagesArray.length - 1) {
		$('.lightbox-next').hide();
		$('.lightbox-next-placeholder').show()
		console.log('hide next button');
	} else {
		$('.lightbox-next').show();
		$('.lightbox-next-placeholder').hide()
		console.log('show next button');
	};
};

var updateLightbox = function() {
	//update image (do this last for targetting issues)
	$(".lightbox-image").attr('src', allImagesArray[imageNumberPosition]);
	
	//update title
	var newLightboxTitle;
	newLightboxTitle = $("img[src$='" + allImagesArray[imageNumberPosition] + "']").next().children('h2').text();
	console.log(newLightboxTitle);
	$(".lightbox h2").text(newLightboxTitle);

	//update blurb
	var newLightboxBlurb;
	newLightboxBlurb = $("img[src$='" + allImagesArray[imageNumberPosition] + "']").next().children('p').first().text();
	console.log(newLightboxBlurb);
	$(".lightbox p").first().text(newLightboxBlurb);

	//update tags
	//get tags as an array
	var newLightboxTags = '';
	$("img[src$='" + allImagesArray[imageNumberPosition] + "']").next().children('.tags').children('span').each(function (){
						newLightboxTags += '<span>' + $(this).html() + '</span>';
					});
	console.log(newLightboxTags);
	$(".lightbox-tags").html(newLightboxTags);

	lightboxButtons();

}

//on mouse up on image load
$( ".image-card" ).mouseup( function(){
	console.log('mouse up');
	//capture the image
	var imageUrl = $(this).children('img').attr('src');
	console.log(imageUrl);
	//capture the title
	var titleText = $(this).children('div.content').children('h2').text();
	console.log(titleText);
	//capture the blurb
	var blurbText = $(this).children('div.content').children('p').first().text();
	console.log(blurbText);
	//capture the tags
	var tagsArray = [];
	$(this).children('div.content').children('p.tags').children('span').each(function (){
						tagsArray.push($(this).text());
					});
	console.log(tagsArray);

	//display image
	$(".lightbox-image").attr('src', imageUrl);

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
	imageNumberPosition = allImagesArray.indexOf( $(this).children('img').attr('src') )
	console.log(imageNumberPosition);

	//show hide next previous buttons
	lightboxButtons();

	//display lightbox
	$lightbox.css("display", "block");

});
	
	
	

//on mouse up on image go to next image
$( ".lightbox-image" ).click( function(){
	console.log('image click')
});

$( ".lightbox-previous" ).click( function(){
	console.log('previous image')
	previousImage();
	updateLightbox();

});
//on mouse up previous button (within lightbox)
	//capture prevous image
	//capture title
	//capture blurb
	//capture tags

	//update image
	//update title
	//update blurb
	//update tags
	//update nav (is there previous image?)

$( ".lightbox-next" ).click( function(){
	console.log('next image')
	nextImage();
	updateLightbox();
});
//on mouse up next button (within lightbox)
	//capture prevous image
	//capture title
	//capture blurb
	//capture tags

	//update image
	//update title
	//update blurb
	//update tags
	//update nav (is there next image?)


//keyboard navigation

$(".lightbox-next").keydown(function(e) {
    if (e.keyCode == 13) { // enter change to esc
        
    }
    if (e.keyCode == 37) { // left
        console.log('left click');
    }
    if (e.keyCode == 39) { // right
        console.log('right click');
    }
});

//mouse up on tag search tags in serach bar

//on mouse up on close button (within lightbox)
$(".lightbox-close").mouseup( function(){
	console.log('close lightbox')
	//hide lightbox
	$lightbox.hide();
});
	
//on mouse up on overlay background (within lightbox)
/* $("div.lightbox").mouseup( function(){
	console.log('close lightbox background click')
	//hide lightbox
	$lightbox.hide();
}); */


