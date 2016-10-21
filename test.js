$(document).ready(function() {

    $(".test-btn").on('click', function(event) {
        console.log('click');
        var slot0 = $(".slot0").position().left;
        var slot1 = $(".slot1").position().left;
        console.log(slot0,slot1);
        console.log(slot0-slot1);
        $(".img0")
            .css({
                'position':'absolute',
                width:'100px',
                height:'100px'
            })
            .animate({
                left: slot1 - slot0,
            },function(){
                $(this).remove().appendTo(".slot1").css({
                    position:'static'
                });
            });
        $(".img1")
            .css({
                position:'absolute',
                width:'100px',
                height:'100px'
            })
            .animate({
                left: slot0-slot1
            },function(){
                $(this).remove().appendTo('.slot0').css({
                    position: 'static'
                });
            });

    });
});
