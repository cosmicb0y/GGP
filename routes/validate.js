var  validate = {};

validate.validateRegForm = function(user, pwConfirm){
    if( user.password != pwConfirm ){
        return false;
    }
    if( ! validatePW(user.password) ){
        return false;
    }
    if( ! validateCategory(user.category)){
        return false;
    }
    if( ! validateUniv(user.university)){
        return false;
    }
    if( ! validateMajor(user.major)){
        return false;
    }
    return true;
}

function validatePW(pw){
    return true;
}

function validateCategory(cg){
    return true;
}

function validateUniv(univ){
    return true;
}

function validateMajor(major){
    return true;
}

module.exports = validate;
