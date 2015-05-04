
$(document).ready(function() {
    $(".selectEmergencyButton").click(function() {
        var id = $(this).attr('id').replace(/e/, '');
        $('div.selectEmergencyButton').css({
            'background': '#B45555'
        });

        $("#e" + id).css({
            'background': 'red'
        });
    });
});

$(document).ready(function() {
    $(".selectCountButton").click(function() {
        var id = $(this).attr('id').replace(/n/, '');
        $('div.selectCountButton').css({
            'background': '#B45555'
        });

        $("#n" + id).css({
            'background': 'red'
        });
    });
});
