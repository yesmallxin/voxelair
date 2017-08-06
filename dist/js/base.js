/**
 * 求随机数
 * @param range
 * @param base
 * @returns {number}
 */
function createRandomNum(range,base=0) {
    return Math.random()*range+base;
}
function createRandomIntNum(range,base=0) {
    return Math.round(createRandomNum(range,base));
}
/**
 * 函数节流
 * @param method
 * @param delay
 * @param time
 * @returns {Function}
 */
function throttle(delay, action){
    let last = 0;
    let isFirst=true;
    return function(){
        let curr = +new Date()
        if (curr - last > delay || isFirst){
            action.apply(this, arguments);
            isFirst=false;
            last = curr;
        }
    }
}
