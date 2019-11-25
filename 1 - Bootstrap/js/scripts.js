$(document).ready(function(){
    $("#mycarousel").carousel( { interval: 2000 } );
    $("#carouselButton").click(function(){
        if ($("#carouselButton").children("span").hasClass('fa-pause')) {
            $("#mycarousel").carousel('pause');
            $("#carouselButton").children("span").removeClass('fa-pause');
            $("#carouselButton").children("span").addClass('fa-play');
        }
        else if ($("#carouselButton").children("span").hasClass('fa-play')){
            $("#mycarousel").carousel('cycle');
            $("#carouselButton").children("span").removeClass('fa-play');
            $("#carouselButton").children("span").addClass('fa-pause');                    
        }
    });
});

$(document).ready(function(){
// Hide the Modal on load
$("#loginModal").modal("hide");
    
// Show the Modal
$("#myBtn").click(function(){
    $("#loginModal").modal("show");
});
});

$(document).ready(function(){
// Hide the Modal on load
$("#loginModal").modal("hide");
    
// Show the Modal
$("#myBtn").click(function(){
    $("#loginModal").modal("show");
});
});

$(document).ready(function(){
// Hide the Modal on load
$("#reserveTable").modal("hide");
    
// Show the Modal
$("#reserveTable").click(function(){
    $("#reserveTableModal").modal("show");
});
});