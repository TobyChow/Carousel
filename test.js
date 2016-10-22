/* jshint esversion:6 */
$(document).ready(function() {




    $(".right").on('click', function(event) {

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
                var difference = slots[1].x - slots[0].x; // assuming evenly spaced slots
                $(target)
                    .css({
                        'position': 'absolute',
                        width: '100px',
                        height: '100px'
                    })
                    .animate({
                        left: difference
                            // only if flex is space evenly distributed
                    }, function cb() {
                        $(target).remove().appendTo(destination).css({
                            left: '0', // resets positioning after inserting img into new DOM
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
                var difference = slots[1].x - slots[0].x; // assuming evenly spaced slots
                $(target)
                    .css({
                        'position': 'absolute',
                        width: '100px',
                        height: '100px'
                    })
                    .animate({
                        left: '-'+difference
                            // only if flex is space evenly distributed
                    }, function cb() {
                        $(target).remove().appendTo(destination).css({
                            left: '0', // resets positioning after inserting img into new DOM
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
