// Normalize Carousel Heights - pass in Bootstrap Carousel items.
$.fn.equalHeights = function() {

    var items = $(this), //grab all slides
        heights = [], //create empty array to store height values
        tallest; //create variable to make note of the tallest slide

    var normalizeHeights = function() {

        items.each(function() { //add heights to array
            heights.push($(this).height());
        });
        tallest = Math.max.apply(null, heights); //cache largest value
        items.each(function() {
            $(this).css('height', tallest + 'px');
        });
    };

    normalizeHeights();

    $(window).on('resize orientationchange', function () {
        //reset vars
        tallest = 0;
        heights.length = 0;

        items.each(function() {
            $(this).css('height', ''); //reset min-height
        });
        normalizeHeights(); //run it again
    });

};

$(function($){

    $(window).on('load', function(){
        $('#testimonials-carousel .item').equalHeights();
        $('#tools-carousel .item').equalHeights();
        $('[data-toggle="tooltip"]').tooltip();
    });

});
