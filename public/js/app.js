var signin = '<div class="signinForm"> <form name="signin" method="post"> <input type="text" name="email" value="" placeholder="E-mail"/> <input type="password" name="pw" value="" placeholder="비밀번호"/> <input type="password" name="pwConfirm" value="" placeholder="비밀번호 확인"/> <input type="text" name="univ" value="" placeholder="대학명"/> <input type="text" name="major" value="" placeholder="과명"/> <div class="footer"> <input type="submit" value="이제, 시작해보죠"> </div> </form> </div> '

$(function(){
    $('.signup').click(function() {
        $('.loginForm').remove();
        $('.header').after(signin);
        $('.footer').animate({
            'margin-top': '20%'
        }, 1000);
        $(this).unbind();
    });
});