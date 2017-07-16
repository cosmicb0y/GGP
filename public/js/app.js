var signin = '<div class="signinForm"> <form name="signin" method="post"> <input type="text" name="email" value="" placeholder="E-mail"/> <input type="password" name="pw" value="" placeholder="비밀번호"/> <input type="password" name="pwConfirm" value="" placeholder="비밀번호 확인"/> <input type="text" name="univ" value="" placeholder="대학명"/> <input type="text" name="major" value="" placeholder="과명"/> <div class="radio"> <input type="radio" id="1" name="category" value="fashionbeauty" /> <label for="1">패션, 뷰티</label> <input type="radio" id="2" name="category" value="design" /> <label for="2">디자인</label> <input type="radio" id="3" name="category" value="art" /> <label for="3">순수예술</label> <input type="radio" id="4" name="category" value="capstone" /> <label for="4">캡스톤</label> </div> <div class="footer"> <input type="submit" value="이제, 시작해보죠"> </div> </form> </div> '

$(function(){
    $('.signup').click(function() {
        $('.loginForm').remove();
        $('.header').after(signin);
        $('.footer').animate({
            'margin-top': '10%'
        }, 1000);
        $(this).unbind();
    });
});

$(document).ready(function() {
    $('body').keypress(function(e){
        if(e.keyCode != 13) return;
        if(!$('input[name="id"]').val()) $('input[name="id"]').focus();
        if(!$('input[name="pw"]').val()) $('input[name="pw"]').focus();
        $('#login').submit();
    });
});