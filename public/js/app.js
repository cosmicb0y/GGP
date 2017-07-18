var signupDiv = document.createElement("div");
signupDiv.className = "signinForm"

var signupForm = document.createElement("form");
signupForm.setAttribute("name", "signin");
signupForm.setAttribute("method", "post");
signupForm.setAttribute("action", "/api/register");

var emailInput = document.createElement("input");
emailInput.setAttribute("type", "text");
emailInput.setAttribute("name", "email");
emailInput.setAttribute("value", "");
emailInput.setAttribute("placeholder", "E-mail");

var passwordInput = document.createElement("input");
passwordInput.setAttribute("type", "password");
passwordInput.setAttribute("name", "pw");
passwordInput.setAttribute("value", "");
passwordInput.setAttribute("placeholder", "비밀번호");

var passwordConfirmInput = document.createElement("input");
passwordConfirmInput.setAttribute("type", "password");
passwordConfirmInput.setAttribute("name", "pwConfirm");
passwordConfirmInput.setAttribute("value", "");
passwordConfirmInput.setAttribute("placeholder", "비밀번호 확인");

var univInput = document.createElement("input");
univInput.setAttribute("type", "text");
univInput.setAttribute("name", "univ");
univInput.setAttribute("value", "");
univInput.setAttribute("placeholder", "대학명");

var majorInput = document.createElement("input");
majorInput.setAttribute("type", "text");
majorInput.setAttribute("name", "major");
majorInput.setAttribute("value", "");
majorInput.setAttribute("placeholder", "과명");

var radioDiv = document.createElement("div");
radioDiv.className = "radio";

var fashionbeautyRadio = document.createElement("input");
fashionbeautyRadio.setAttribute("type", "radio");
fashionbeautyRadio.setAttribute("id", "1");
fashionbeautyRadio.setAttribute("name", "category");
fashionbeautyRadio.setAttribute("value", "fashionbeauty");

var fashionbeautyLabel = document.createElement("label");
fashionbeautyLabel.setAttribute("for", "1");
fashionbeautyLabel.innerHTML = "패션, 뷰티";

var designRadio = document.createElement("input");
designRadio.setAttribute("type", "radio");
designRadio.setAttribute("id", "2");
designRadio.setAttribute("name", "category");
designRadio.setAttribute("value", "design");

var designLabel = document.createElement("label");
designLabel.setAttribute("for", "2");
designLabel.innerHTML = "디자인";

var artRadio = document.createElement("input");
artRadio.setAttribute("type", "radio");
artRadio.setAttribute("id", "3");
artRadio.setAttribute("name", "category");
artRadio.setAttribute("value", "art");

var artLabel = document.createElement("label");
artLabel.setAttribute("for", "3");
artLabel.innerHTML = "순수예술";

var capstoneRadio = document.createElement("input");
capstoneRadio.setAttribute("type", "radio");
capstoneRadio.setAttribute("id", "4");
capstoneRadio.setAttribute("name", "category");
capstoneRadio.setAttribute("value", "capstone");

var capstoneLabel = document.createElement("label");
capstoneLabel.setAttribute("for", "4");
capstoneLabel.innerHTML = "캡스톤";

var footerDiv = document.createElement("div");
footerDiv.className = "footer";

var submitInput = document.createElement("input");
submitInput.setAttribute("type", "submit");
submitInput.setAttribute("value", "이제, 시작해보죠");

signupForm.append(emailInput);
signupForm.append(passwordInput);
signupForm.append(passwordConfirmInput);
signupForm.append(univInput);
signupForm.append(majorInput);

radioDiv.append(fashionbeautyRadio);
radioDiv.append(fashionbeautyLabel);
radioDiv.append(designRadio);
radioDiv.append(designLabel);
radioDiv.append(artRadio);
radioDiv.append(artLabel);
radioDiv.append(capstoneRadio);
radioDiv.append(capstoneLabel);

signupForm.append(radioDiv);

footerDiv.append(submitInput);

signupForm.append(footerDiv);

signupDiv.append(signupForm);


$(function(){
    $('.signup').click(function() {
        $('.loginForm').remove();
        $('.header').after(signupDiv);
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
