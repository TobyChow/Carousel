/* jshint esversion:6 */
$(document).ready(function() {

    var speed = 300; // speed of animation

    // Displays initial title and caption of main display
    (function displayMainText() {
        $('.slot2 .display-title').text($('.slot2 .title').text());
        $('.slot2 .display-caption').text($('.slot2 .caption').text());
    })();

    // When left arrow of carousel is clicked
    $(".left-arrow").on('click', function(event) {
        // Get dimensions of the side panels
        var sideWidth = $('.slot0').width();
        var sideHeight = $('.slot0').height();

        // Used to manipulate dataset values since it is stored as strings
        function addUnicodeBy1(str) {
            return String.fromCharCode(str.charCodeAt() + 1);
        }

        // Stores dimensions(top and left) of each panels
        var slots = {};

        (function getSlotCoord() {
            $(".carousel-container").find("[class*='slot']").each(function(index, el) {
                slots[index] = { x: $(this).position().left, y: $(this).position().top };
            });
        })();

        $(".carousel-container").find("img").each(function(index, el) {

            var initialSlot = +this.dataset.img;
            // loops back last img to the first slot
            if (initialSlot === 4) {
                this.dataset.img = 0;
            } else {
                this.dataset.img = addUnicodeBy1(this.dataset.img);
            }

            function animateSlide(target, destination) {
                var differenceX = slots[1].x - slots[0].x; // assuming evenly spaced slots
                var differenceY;
                if (destination === '.slot2') {
                    differenceY = slots[2].y - slots[1].y;
                } else if (destination === '.slot3') {
                    differenceX = slots[3].x - slots[2].x;
                    differenceY = slots[3].y - slots[2].y;
                }

                var targetWidth = $(target).width();
                var targetHeight = $(target).height();
                var destinationWidth = $(destination).width();
                var destinationHeight = $(destination).height();
                $(target)
                    .css({
                        'position': 'absolute',
                        width: targetWidth,
                        height: targetHeight
                    })
                    .animate({
                        left: differenceX, // only if flex is space evenly distributed
                        top: differenceY,
                        width: destinationWidth,
                        height: destinationHeight
                    }, speed, function cb() {
                        $(target).remove().appendTo(destination).css({
                            left: '0', // resets positioning after inserting img into new DOM
                            top: '0',
                            width: '100%',
                            height: '100%',
                            position: 'static' // must be static
                        });
                    });
            }
            var target = $(this).attr('class').match(/^img\d/g); // stores img classes only;
            var destination = `.slot${this.dataset.img}`;
            animateSlide('.' + target, destination);
        });


        // animate dots and change title / caption display
        (function animateDotLeft() {
            // get data-dot with the active-dot
            var activeDot = $('.active-dot').removeClass('active-dot');
            var activeDotData = +activeDot[0].dataset.dot;
            activeDotData--;
            if (activeDotData < 0) {
                activeDotData = 4;
            }
            $(`[data-dot=${activeDotData}]`).addClass('active-dot');
            // Get title and caption from parent of img's original slot
            var newTitle = $(`.slot${activeDotData} .title`).text();
            var newCaption = $(`.slot${activeDotData} .caption`).text();
            // insert new title / caption into slot 2
            $('.content .display-title').text(newTitle);
            $('.content .display-caption').text(newCaption);
        })();
    });


    $(".right-arrow").on('click', function(event) {

        var sideWidth = $('.slot0').width();
        var sideHeight = $('.slot0').height();

        function minusUnicodeBy1(str) {
            return String.fromCharCode(str.charCodeAt() - 1);
        }

        var slots = {};

        (function getSlotCoord() {
            $(".carousel-container").find("[class*='slot']").each(function(index, el) {
                slots[index] = { x: $(this).position().left, y: $(this).position().top };
            });
        })();

        $(".carousel-container").find("img").each(function(index, el) {

            var initialSlot = +this.dataset.img;
            // loops back last img to the first slot
            if (initialSlot === 0) {
                this.dataset.img = 4;
            } else {
                this.dataset.img = minusUnicodeBy1(this.dataset.img);
            }

            function animateSlide(target, destination) {
                var differenceX = slots[0].x - slots[1].x; // assuming evenly spaced slots
                var differenceY;
                if (destination === '.slot2') {
                    differenceX = slots[2].x - slots[3].x;
                    differenceY = slots[2].y - slots[3].y;
                } else if (destination === '.slot1') {
                    differenceX = slots[1].x - slots[2].x;
                    differenceY = slots[1].y - slots[2].y;
                }

                var targetWidth = $(target).width();
                var targetHeight = $(target).height();
                var destinationWidth = $(destination).width();
                var destinationHeight = $(destination).height();
                var difference = slots[1].x - slots[0].x; // assuming evenly spaced slots
                $(target)
                    .css({
                        'position': 'absolute',
                        width: targetWidth,
                        height: targetHeight
                    })
                    .animate({
                        left: differenceX, // only if flex is space evenly distributed
                        top: differenceY,
                        width: destinationWidth,
                        height: destinationHeight
                    }, speed, function cb() {
                        $(target).remove().appendTo(destination).css({
                            left: '0', // resets positioning after inserting img into new DOM
                            top: '0',
                            width: '100%',
                            height: '100%',
                            position: 'static' // must be static
                        });
                    });
            }
            var target = $(this).attr('class').match(/^img\d/g); // stores img classes only
            console.log(target);
            var destination = `.slot${this.dataset.img}`;
            animateSlide('.' + target, destination);
        });

        // animate dots and change title / caption display
        (function animateDotRight() {
            // get data-dot with the active-dot
            var activeDot = $('.active-dot').removeClass('active-dot');
            var activeDotData = +activeDot[0].dataset.dot;
            activeDotData++;
            if (activeDotData > 4) {
                activeDotData = 0;
            }
            $(`[data-dot=${activeDotData}]`).addClass('active-dot');
            // Get title and caption from parent of img's original slot
            var newTitle = $(`.slot${activeDotData} .title`).text();
            var newCaption = $(`.slot${activeDotData} .caption`).text();
            // insert new title / caption into slot 2
            $('.content .display-title').text(newTitle);
            $('.content .display-caption').text(newCaption);
        })();
    });

    // dots on click
    $(".dot").on('click', function(event) {
        var leftCount = 0;
        var rightCount = 0;
        var clickedDot = +this.dataset.dot;
        var start = $('.active-dot')[0].dataset.dot;
        var count = +start;
        function distanceCheck(direction) {
            console.log(count);
            while (count !== clickedDot) {

                if (direction === 'left') {
                    leftCount++;
                    count--;
                    if (count < 0) {
                        count = 4;
                    }
                }
                if (direction === 'right') {
                    rightCount++;
                    count++;
                    if (count > 4) {
                        count = 0;
                    }
                }
            }
            count = start; // resets start to do left check
        }
        distanceCheck('right');
        distanceCheck('left');
        // Go left if it is the shortest route, otherwise go right
        if (leftCount < rightCount) {
            var c = 0;
            while (c < leftCount) {
                // Fix with arrows clicking too quickly, resulting in only 1 click no matter distance
                setTimeout(function() {
                    speed=100;
                    $(".left-arrow").click();
                    speed=300;
                },(c*(300)));
                c++;
            }
        } else {
            var x = 0;
            while (x < rightCount) {
                // same fix as left arrow
                setTimeout(function() {
                    speed=100;
                    $(".right-arrow").click();
                    speed=300;
                },(x*(300)));
                x++;
            }
        }

    });
    $('.left').on('click', function(event) {

        setTimeout(function() {
            $('.left-arrow').click();
        }, 400);
        setTimeout(function() {
            $('.left-arrow').click();
        }, 800);


        /* Act on the event */
    });

});
