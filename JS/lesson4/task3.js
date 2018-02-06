function checkString(word){
    if(word.substring(0,21)){
        return word.slice(0,-3) + '...';
    } else { return word}
}
console.log(checkString("0123456789qwertyuiopa"));