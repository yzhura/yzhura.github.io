function checkSpam(word){
    if (word.indexOf("Sex") > 0){
        return true;
    } else if (word.indexOf("SPAM") > 0){
        return true;
    } else if (word.indexOf("sex") > 0){
        return true;
    }else {
        return false;
    }
    
}
console.log(checkSpam('typpe for gex SPAM'));
console.log(checkSpam('typpe for gex Sex'));
console.log(checkSpam('typpe for sex dPAM'));
console.log(checkSpam('typpe for gex SsAM'));


