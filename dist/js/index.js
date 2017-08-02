let navBox = document.querySelector('#navBox');//导航盒子
let liList=navBox.querySelectorAll('li');
let iNow=0;

/**
 * 更新导航状态
 */
function updateNav(index) {
    liList.forEach(function (item) {
        item.classList.remove('active');
    })
    let curLi=liList[index];
    curLi.classList.add('active');

    let navArrow=document.querySelector('#navArrow');
    let leftX=curLi.offsetLeft+curLi.offsetWidth/2-navArrow.offsetWidth/2;
    navArrow.style.transform =`translateX(${leftX}px)`;
}
updateNav(iNow);

liList.forEach(function (item,index) {
    item.addEventListener('click',function () {
        toMove(index);
    });
});
/**
 * 运动动画函数
 * @param index
 */
function toMove(index) {
    updateNav(index);
    swipeFn(index);
    iNow=index;
}
let contentBox=document.querySelector('#contentBox');
let contentUl=document.querySelector('#contentUl');
let contentLiList=contentUl.children;
let contentLiLen=contentLiList.length;
contentUl.style.height = `${contentLiLen * 100}%`;

function swipeFn(index) {
    contentUl.style.transform=`translateY(-${100 / contentLiLen * index}%)`;
}

function bindWheel(){
    let timer=null;
    contentBox.addEventListener('mousewheel',function (event) {
        clearTimeout(timer);
        timer=setTimeout(function () {
            if (event.deltaY > 0) {
                iNow >= 1 && toMove(--iNow);
            } else if (event.deltaY < 0) {
                console.log(iNow);
                iNow < contentLiLen - 1 && toMove(++iNow);
            }
        },200);
    });
}
bindWheel();


