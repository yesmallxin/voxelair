let navBox = document.querySelector('#navBox');//导航盒子
let liList=navBox.querySelectorAll('li');
let iNow=0;
let verticalMenu=document.querySelector('#verticalMenu');
let　menuList=Array.from(verticalMenu.children);
let contentBox=document.querySelector('#contentBox');
let contentUl=document.querySelector('#contentUl');
let contentLiList=contentUl.children;
let contentLiLen=contentLiList.length;
contentUl.style.height = `${contentLiLen * 100}%`;
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
function updateMenu(index) {
    menuList.forEach(function (item) {
        item.classList.remove('active');
    });
    let curLi=menuList[index];
    curLi.classList.add('active');
}

liList.forEach((item,index)=>{
    item.addEventListener('click',function () {
        toMove(index);
    });
});

menuList.forEach((item,index)=>{
    item.addEventListener('click',()=>{
        toMove(index);
    })
});
/**
 * 运动动画函数
 * @param index
 */
function toMove(index) {
    updateNav(index);
    updateMenu(index);
    swipeFn(index);
    iNow=index;
}
toMove(0);


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
                iNow < contentLiLen - 1 && toMove(++iNow);
            }
        },200);
    });
}
bindWheel();
/**
 * 获取dom在同级节点中的编号
 * @param dom
 * @returns {number}
 */
function getIndex(dom) {
    let index=0;
    while(dom.previousElementSibling){
        index++;
        dom=dom.previousElementSibling;
    }
    return index;
}
let swipeNav=document.querySelector('#swipeNav');
let swipeUl=document.querySelector('#swipeUl');
let swipeLiList=Array.from(swipeUl.children);

function homeContent() {
    let swipeIndex=0;
    let swipeNavLiList=Array.from(swipeNav.children);
    let liLen=swipeNavLiList.length;
    let homeInner=document.querySelector('#homeInner');

    swipeNav.addEventListener('click',function (event) {
        let dom=null;
        if (event.target.tagName.toLowerCase()!="li"){
            return;
        }else{
            dom=event.target;
        }
        let index=getIndex(dom);
        if (swipeIndex == index) {//如果是当前激活banner，则立即返回
            return;
        }
        swipeAni(swipeIndex,index);
    });
    function swipeAni(curIndex,tarIndex) {
        let classReg=/\b(leftHide|leftShow|rightHide|rightShow)\b/g;
        swipeLiList.forEach((item,index)=>{
            item.className=item.className.replace(classReg,'');
        });
        if (tarIndex > curIndex) {
            swipeLiList[tarIndex].classList.add('rightShow');
            swipeLiList[curIndex].classList.add('leftHide');
        }else{
            swipeLiList[tarIndex].classList.add('leftShow');
            swipeLiList[curIndex].classList.add('rightHide');
        }
        swipeIndex=tarIndex;

        let navReg=/\bactive\b/g;
        swipeNavLiList.forEach((item,index)=>{
            item.className=item.className.replace(navReg,'');
        });
        swipeNavLiList[tarIndex].classList.add('active');
    }
    swipeAni(1,0);

    let timer = setInterval(()=>{
        let tarIndex=swipeIndex+1>=liLen?0:swipeIndex+1;
        swipeAni(swipeIndex,tarIndex);
    },3000);

    homeInner.addEventListener('mouseenter',function () {
        clearInterval(timer);
    });
    homeInner.addEventListener('mouseleave',function () {
        timer = setInterval(()=>{
            let tarIndex=swipeIndex+1>=liLen?0:swipeIndex+1;
            swipeAni(swipeIndex,tarIndex);
        },3000);
    });
}
homeContent();

function courseContent() {
    let courseLogoBox=document.querySelector('#courseLogoBox');
    let logoItemList=courseLogoBox.querySelectorAll('.logoItem');
    logoItemList.forEach((item,index)=>{
        let bgDiv=document.createElement("div");
        bgDiv.classList.add('bg');
        bgDiv.innerHTML=`${'<span></span>'.repeat(4)}`;
        let spanList=bgDiv.querySelectorAll('span');
        if (index / 3 > 1) {
            item.style.marginTop="-9px";
            spanList[3].classList.add('bg');
            index % 4 == 0 && spanList[2].classList.add('bg');
        }else{
            spanList.forEach((item, index)=>{
                item.classList.add('bg');
            });
        }
        if (index % 4 != 0) {
            item.style.marginLeft="-9px";
        }
        item.appendChild(bgDiv);
    });
}
courseContent();

function aboutContent() {
    let aboutInner=document.querySelector('#aboutInner');
    let aboutImgList=aboutInner.querySelectorAll('.aboutImg');
    aboutImgList.forEach((item,index)=>{
        let ul=item.querySelector('.aboutImgUl');
        let span=item.querySelector('.aboutImgBg');
        span.style.backgroundImage=`url(../images/${span.dataset.src})`;
        span.style.transform="scale(1.5)";
        let w=ul.offsetWidth;
        let h=ul.offsetHeight;
        ul.innerHTML=`${'<li></li>'.repeat(4)}`;
        let liList=ul.querySelectorAll('li');

        let fromArr=['0,-100%','200%,0','-100%,100%','100%,200%'];
        liList.forEach(function (item,index) {
            item.style.width=w/2+'px';
            item.style.height=h/2+'px';
            item.style.backgroundImage=`url(../images/${ul.dataset.src})`;
            let toPos={
                left:0,
                top:0
            }
            let fromPosArr=fromArr[index].split(',');
            let fromPos={
                left:fromPosArr[0],
                top:fromPosArr[1]
            }
            if (index %2 != 0){
                toPos.left="100%";
            }
            if (index>=2){
                toPos.top="100%";
            }
            item.style.backgroundPosition=`${toPos.left} ${toPos.top}`;
            item.dataset.toPos=JSON.stringify(toPos);
            item.dataset.fromPos=JSON.stringify(fromPos);
        });
        ul.addEventListener('mouseenter',function () {
            liList.forEach(function (item,index) {
                let fromPos=JSON.parse(item.dataset.fromPos);
                item.style.backgroundPosition=`${fromPos.left} ${fromPos.top}`;
            });
            span.style.transform="scale(1)";
        });
        ul.addEventListener('mouseleave',function () {
            liList.forEach(function (item,index) {
                let toPos=JSON.parse(item.dataset.toPos);
                item.style.backgroundPosition=`${toPos.left} ${toPos.top}`;
            });
            span.style.transform="scale(1.5)";
        });
    });
}
aboutContent();

function teamContent() {
    let teamContent2=document.querySelector('#teamContent2');
    let teamUl=document.querySelector('#teamUl');
    teamUl.innerHTML=`${'<li></li>'.repeat(8)}`;
    let liList=teamUl.querySelectorAll('li');
    liList.forEach((item,index)=>{
        item.style.backgroundPosition=`${-118*index}px`;
        item.addEventListener('mouseenter',function () {
            liList.forEach((item, index)=>{
                item.style.opacity=0.3;
            });
            this.style.opacity=1;
            canvasAni(index);
        });
    });
    teamContent2.addEventListener('mouseleave',function (event) {
        liList.forEach((item, index)=>{
            item.style.opacity=1;
        });
        cancelCanvas();
    });

    let teamCanvas=document.querySelector('#teamCanvas');
    let ballArr = [];
    let context=teamCanvas.getContext('2d');
    let drawRequest=null;
    function canvasAni(index) {
        cancelCanvas();
        drawRequest=requestAnimationFrame(drawCavas);
        teamCanvas.style.left = index*118+'px';
    }
    let pushBall_throttle=throttle(200,pushBall);
    function drawCavas() {
        pushBall_throttle();
        let {width,height}=teamCanvas;
        context.clearRect(0,0,width,height);
        ballArr.forEach((item,index)=>{
            item.moveStep();
            item.paint();
            ballArr=ballArr.filter((item, index)=>{
                return item.y>=50;
            });
        });
        drawRequest=requestAnimationFrame(drawCavas);
    }
    function cancelCanvas() {
        cancelAnimationFrame(drawRequest);
        teamCanvas.style.left = '-118px';
        drawRequest=null;
    }
    function pushBall() {
        var num=createRandomIntNum(2,2);
        let newBall=null;
        for (let i=0;i<num;i++){
            newBall=new CreateBall();
            ballArr.push(newBall);
        }
    }

    class CreateBall{
        constructor(){
            let width=teamCanvas.width;
            this.startX=createRandomIntNum(width/2,width/4);
            this.startY=teamCanvas.height;
            this.r=createRandomIntNum(6,2);
            // this.fillColor=`rgba(${createRandomIntNum(255)},${createRandomIntNum(255)},${createRandomIntNum(255)},${createRandomNum(0.5,0.5).toFixed(1)})`;
            this.fillColor=`rgba(${createRandomIntNum(255)},${createRandomIntNum(255)},${createRandomIntNum(255)},1)`;
            this.num=createRandomIntNum(360);
            this.step=createRandomIntNum(20,10);
            this.x=this.startX;
            this.y=this.startY;
        }
        paint(){
            context.fillStyle = this.fillColor;
            context.beginPath();
            context.moveTo(this.x,this.y);
            context.arc(this.x,this.y,this.r,0,2*Math.PI);
            context.closePath();
            context.fill();
        }
        moveStep(){
            let num=this.num+=5;
            let step=this.step;
            this.x = this.startX - Math.sin(num*Math.PI/180).toFixed(2)*step;
            this.y = this.startY - num*step*0.025;
        }
    }
}

teamContent();