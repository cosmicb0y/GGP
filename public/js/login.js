$(document).ready(function() {
    $('body').keypress(function(e){
        if(e.keyCode != 13) return;
        if(!$('input[name="id"]').val()) $('input[name="id"]').focus();
        if(!$('input[name="pw"]').val()) $('input[name="pw"]').focus();
        $('#login').submit();
    });
});
