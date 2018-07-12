
window.onload=function(){
      Box();
}
function Box(){
     var banner = document.querySelector('.al_banner');
     var box = document.querySelector("ul:first-of-type");
     var firstImg = box.querySelector("li:first-of-type");
     var lastImg = box.querySelector("li:last-of-type");
    //  添加照片
     box.appendChild(firstImg.cloneNode(true));
     box.insertBefore(lastImg.cloneNode(true),box.firstChild);
    //  实现滚动
    var bannerWidth = banner.offsetWidth;
    var lis = box.querySelectorAll("li");
    var count = lis.length;
    // console.log(count);
    // 获取box盒子的总共偏移距离
    box.style.width = count*bannerWidth+"px";
    for(var i=0; i<lis.length;i++){
        lis[i].style.width = bannerWidth+"px";
    }
    // console.log(bannerWidth);
    var index = 1;
    box.style.width = -bannerWidth+"px";
    box.onresize=function(){
        var bannerWidth = banner.offsetWidth;
        box.style.width = count*bannerWidth+"px";
        for(var i=0;i<lis.length;i++){
            lis[i].style.width = bannerWidth+"px";
        }
        box.style.width = -bannerWidth+"px";   
    }
    // console.log(-bannerWidth, 1343);
// 实现自动轮播
    var timerId;
    var Time = function(){
         timerId = setInterval(function(){
            index++;
            box.style.transition ="left 0.5s ease-in-out";
            box.style.left =-index*bannerWidth+"px";
            setTimeout(function(){
               if(index == count-1){
                   index=1;
                   box.style.transition="none";
                   box.style.left=-index*bannerWidth+"px";
               }
            },500)
         },1000)
    }
    Time();
    // 添加小圆点
    var round=function (index){
        var rounds = banner.querySelector("ul:last-of-type").querySelectorAll("li");
        for(var i=0; i<rounds.length; i++){
            rounds[i].classList.remove('active')
        }
        rounds[index-1].classList.add('active');
    }
    // 手动轮播
    var startX,moveX,distanceX;
    var isEnd = true;
    box.addEventListener("touchstart",function(e){
        clearInterval(timerId);
        startX = e.targetTouches[0].clientX;
    })
    box.addEventListener("touchmove", function (e) {
        if(isEnd==true){
            moveX = e.targetTouches[0].clientX;
            distanceX = moveX - startX;
            box.style.transition = 'none';
            box.style.left = (-index * bannerWidth + distanceX) + "px";
        }
    })
    box.addEventListener("touchend", function (e) {
        isEnd=false;
        if(Math.abs(distanceX) > 100){
            if(distanceX>0){
                index--;
            }else{
                index++;
            }
            box.style.transition="left 0.5s ease-in-out";
            box.style.left = (-index * bannerWidth + distanceX) + "px";
        }
        else if(Math.abs(distanceX) > 0){
            box.style.transition = "left 0.5s ease-in-out";
            box.style.left = (-index * bannerWidth + distanceX) + "px";
        }
        startX=0;
        moveX=0;
        distanceX=0;
    })
    // 添加过渡之后的监听
    box.addEventListener('webkitTransitionEnd',function(){
           if(index==count-1){
               index=1;
               box.style.transition="none";
               box.style.left=-index*bannerWidth+"px";
           }
           else if(index==0){
               index = count-2;
               box.style.transition = "none";
               box.style.left = -index * bannerWidth + "px";
           }
           round(index);
           setTimeout(function(){
               isEnd=true;
               clearInterval(timerId);
               Time();
           })

    })
}