/* jshint esversion:6 */
$(document).ready(function() {

    $(".right").on('click', function(event) {

        var sideWidth = $('.slot0').width();
        var sideHeight = $('.slot0').height();

        function addUnicodeBy1(str) {
            return String.fromCharCode(str.charCodeAt() + 1);
        }

        var slots = {};

        (function getSlotCoord() {
            $(".test-container").find("[class*='slot']").each(function(index, el) {
                slots[index] = { x: $(this).position().left, y: $(this).position().top };
            });
        })();

        $(".test-container").find("img").each(function(index, el) {

            var initialSlot = +this.dataset.img;
            // loops back last img to the first slot
            if (initialSlot === 4) {
                this.dataset.img = 0;
            } else {
                this.dataset.img = addUnicodeBy1(this.dataset.img);
            }

            function animate(target, destination) {
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
                    }, function cb() {
                        $(target).remove().appendTo(destination).css({
                            left: '0', // resets positioning after inserting img into new DOM
                            top: '0',
                            width: '100%',
                            height: '100%',
                            position: 'static' // must be static
                        });
                    });
            }
            var target = $(this).attr('class');
            var destination = `.slot${this.dataset.img}`;
            animate('.' + target, destination);
        });
    });


    $(".left").on('click', function(event) {

        var sideWidth = $('.slot0').width();
        var sideHeight = $('.slot0').height();

        function minusUnicodeBy1(str) {
            return String.fromCharCode(str.charCodeAt() - 1);
        }

        var slots = {};

        (function getSlotCoord() {
            $(".test-container").find("[class*='slot']").each(function(index, el) {
                slots[index] = { x: $(this).position().left, y: $(this).position().top };
            });
        })();

        $(".test-container").find("img").each(function(index, el) {

            var initialSlot = +this.dataset.img;
            // loops back last img to the first slot
            if (initialSlot === 0) {
                this.dataset.img = 4;
            } else {
                this.dataset.img = minusUnicodeBy1(this.dataset.img);
            }

            function animate(target, destination) {
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
                    }, function cb() {
                        $(target).remove().appendTo(destination).css({
                            left: '0', // resets positioning after inserting img into new DOM
                            top: '0',
                            width: '100%',
                            height: '100%',
                            position: 'static' // must be static
                        });
                    });
            }
            var target = $(this).attr('class');
            var destination = `.slot${this.dataset.img}`;
            animate('.' + target, destination);
        });
    });
});
