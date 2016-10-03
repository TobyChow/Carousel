/* jshint esversion:6 */

$(window).load(function() {

    // Left arrow is clicked
    $(".left-arrow").on('click', function(event) {

        var mainWidth = $(".curr-img-container").width();
        var mainHeight = $(".curr-img-container").height();

        var sideWidth = $(".slot-0").width();
        var sideHeight = $(".slot-0").height();

        var slots = {};


        (function getSlotCoord() {
            $(".carousel-container").find("[class*='slot-']").each(function(index, el) {
                slots[index] = { x: $(this).offset().left, y: $(this).offset().top };
            });
        })();
        var dataSlideValue = $(".carousel-container").find("img").each(function(index, el) {
            var imgValue = Number(this.dataset.img);
            if (imgValue <= 0) {
                imgValue = 4;
                this.dataset.img = 4;
            } else {
                imgValue -= 1;
                this.dataset.img -= 1;
            }
            // if img is going into slot-2 (ie:main display)
            if (+(this.dataset.img) === 2) {
                $(this).css({
                        'position': 'absolute',
                        width: '150px',
                        height: '150px'
                    }) // shrink image to preview slide size
                    .animate({
                        width: mainWidth,
                        height: mainHeight,
                        left: slots[+imgValue].x, // account for margin
                        top: slots[+imgValue].y
                    });
            }
            if (+(this.dataset.img) === 4) {
                var offsetDistance = $(window).width() + sideWidth;
                $(this).css({
                        'position': 'absolute',
                        width: '150px',
                        height: '150px'
                    })
                    .offset({
                        top: $(".slot-4").offset().top,
                        left: offsetDistance
                    })
                    .animate({
                        width: sideWidth,
                        height: sideHeight,
                        left: slots[4].x,
                        top: slots[4].y
                    });
            }
            if (+(this.dataset.img) !== 2 && +(this.dataset.img) !== 4) {
                $(this).css({
                        'position': 'absolute',
                        width: '150px',
                        height: '150px'
                    }) // shrink image to preview slide size
                    .animate({
                        width: sideWidth,
                        height: sideHeight,
                        left: slots[+imgValue].x, // account for margin
                        top: slots[+imgValue].y
                    });
            }
        });

    });
    ////////////////////////////////////////// right arrow

    $(".right-arrow").on('click', function(event) {

        var mainWidth = $(".curr-img-container").width();
        var mainHeight = $(".curr-img-container").height();

        var sideWidth = $(".slot-0").width();
        var sideHeight = $(".slot-0").height();

        var slots = {};


        (function getSlotCoord() {
            $(".carousel-container").find("[class*='slot-']").each(function(index, el) {
                slots[index] = { x: $(this).offset().left, y: $(this).offset().top };
            });
        })();

        function addUnicodeBy1(str) {
            return String.fromCharCode(str.charCodeAt() + 1);
        }

        var dataSlideValue = $(".carousel-container").find("img").each(function(index, el) {
            var imgValue = Number(this.dataset.img);
            if (imgValue >= 4) {
                imgValue = 0;
                this.dataset.img = 0;
            } else {
                imgValue += 1;
                this.dataset.img = addUnicodeBy1(this.dataset.img);
            }
            // if img is going into slot-2 (ie:main display)
            if (+(this.dataset.img) === 2) {
                $(this).css({
                        'position': 'absolute',
                        width: sideWidth,
                        height: sideHeight
                    }) // shrink image to preview slide size
                    .animate({
                        width: mainWidth,
                        height: mainHeight,
                        left: slots[+imgValue].x, // account for margin
                        top: slots[+imgValue].y
                    });
            }
            if (+(this.dataset.img) === 0) {
                var offsetDistance = $(window).width() + sideWidth;
                $(this).css({
                        'position': 'absolute',
                        width: sideWidth,
                        height: sideHeight
                    })
                    .offset({
                        top: $(".slot-0").offset().top,
                        left: '-200'
                    })
                    .animate({
                        width: sideWidth,
                        height: sideHeight,
                        left: slots[0].x,
                        top: slots[0].y
                    });
            }
            if (+(this.dataset.img) !== 2 && +(this.dataset.img) !== 0) {
                $(this).css({
                        'position': 'absolute',
                        width: sideWidth,
                        height: sideHeight
                    }) // shrink image to preview slide size
                    .animate({
                        width: sideWidth,
                        height: sideHeight,
                        left: slots[+imgValue].x, // account for margin
                        top: slots[+imgValue].y
                    });
            }
        });

    });


});
