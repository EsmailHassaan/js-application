 // open seting box
 document.querySelector(".lop").onclick = ()=>{
    document.querySelector(".set-box").classList.toggle("toggle");
};

//_______________________________________________________________________________ 
//_______________________________________________________________________________    
//_______________________________________________________________________________       

// change main color
document.querySelectorAll(".main-color li").forEach( li=>{

    li.addEventListener("click",(itm)=>{

        document.querySelectorAll(".main-color li").forEach((ele)=>{
            ele.classList.remove('active-color');
        });

        document.documentElement.style.setProperty("--main-color",li.dataset.color);
        li.classList.toggle('active-color');
        localStorage.setItem('last-activ',li);
        localStorage.setItem("last-color",li.dataset.color);        
    });
});

// save last active color in local storage
if(localStorage.getItem("last-color") !== null){
    document.documentElement.style.setProperty("--main-color",localStorage.getItem("last-color"));

    document.querySelectorAll(".main-color li").forEach( ele=>{

        if(ele.dataset.color === localStorage.getItem("last-color")){
            ele.classList.add("active-color");
        }
    });
}
// ________________________________________________________________________ 
//_______________________________________________________________________________    
//_______________________________________________________________________________    

// change background image
let interval
let randback = Array.from(document.querySelectorAll('.rand-back ul li')) ;
let land  = document.querySelector('.land-img');
let color = ["01.jpg","02.jpg","03.jpg","04.jpg","05.jpg"];
let randomcolor;
let imgbut = Array.from(document.querySelectorAll('.images li'));
let imgcon = document.querySelector('.img-container');

 function lando(ev){
    imgcon.style.cssText="display:none";

    interval = setInterval(()=> {
    randomcolor = Math.floor(Math.random() * color.length);
    land.style.backgroundImage = "url('images/"+color[randomcolor]+"')";
    }, 10000);  

    localStorage.setItem('active-button',ev.target.innerHTML);
    localStorage.setItem('as',color[randomcolor]);   
};

randback.forEach((element)=>{
    element.addEventListener('click',(e)=>{
        if(element.innerHTML === 'Yes'){
            lando(e);
            goo(e);

        }else if(element.innerHTML === 'No'){
            clearInterval(interval);
            goo(e);
            lando(e);
            imgcon.style.cssText="display:block";
        }
    });       
})

// get backgroundImage from localStorage 
randback.forEach((element)=>{

    if(localStorage.getItem('active-button') === element.innerHTML){

        randback.forEach((ele)=>{
            ele.classList.remove('active-random');
        })

        element.classList.add('active-random');

        if(localStorage.getItem('active-button') === 'Yes'){
            imgcon.style.cssText="display:none";
            land.style.backgroundImage = "url('images/04.jpg')";

            interval = setInterval(()=> {
            randomcolor = Math.floor(Math.random() * color.length);
            land.style.backgroundImage = "url('images/"+color[randomcolor]+"')";
            }, 10000);

        }else if(localStorage.getItem('active-button') === 'No'){
            clearInterval(interval);
            imgcon.style.cssText="display:block";
            land.style.backgroundImage = localStorage.getItem('img');

            imgbut.forEach((ele)=>{
                if(ele.dataset.num === localStorage.getItem('act')){
                    ele.classList.add('active-random');
                };
            });

        };
    };
});

// static background images
for (let j = 0; j < imgbut.length; j++) {
    imgbut[j].style.cssText=`background-image:url(images/${color[j]})`;

    imgbut[j].addEventListener('click',()=>{
        clearInterval(interval);
        land.style.backgroundImage = "url('images/"+color[j]+"')";

        imgbut.forEach((el)=>{
            el.classList.remove('active-random');
        })

        imgbut[j].classList.add('active-random');
        localStorage.setItem('img',land.style.backgroundImage);
        localStorage.setItem('act',imgbut[j].dataset.num);
    });
};

//_______________________________________________________________________________ 
//_______________________________________________________________________________    
//_______________________________________________________________________________ 

// show polits
let show   = Array.from(document.querySelectorAll('.show li'));
let polits = document.querySelector('.polits');
let politsli = document.querySelectorAll('.polits li');
let a        = document.querySelectorAll('header ul li ');

// remove and add new active class function
function goo(ev) {
    ev.target.parentElement.querySelectorAll('.active-random').forEach((ele)=>{
        ele.classList.remove('active-random');
        ev.target.classList.add('active-random');
    });
};

// scroll polits and link function
function link(varible) {
    varible.forEach((el)=>{
        el.addEventListener('click',()=>{
            document.getElementById(el.dataset.sec).scrollIntoView({
                behavior:"smooth"
            });
        });
    });
}

// show polits
show.forEach((el)=>{
    el.addEventListener('click',(e)=>{
        if(el.innerHTML === 'Yes'){
            polits.style.cssText="display:block"
        }else{
            polits.style.cssText="display:none"
        };
        goo(e);
        localStorage.setItem('active-polits',el.innerHTML);
    });   
})

// show polits from localStorage
show.forEach((elem)=>{
    if(localStorage.getItem('active-polits') === elem.innerHTML){
        elem.classList.add('active-random');
        if(localStorage.getItem('active-polits') === 'Yes' ){
            polits.style.cssText="display:block"
        }else{
            polits.style.cssText="display:none"
        }
    }
})

link(a);
link(politsli);

// 
// _____________________________________________________________________________________________
// _____________________________________________________________________________________________
// _____________________________________________________________________________________________

// skills line
window.addEventListener('scroll',()=>{
    let progspan  = Array.from(document.querySelectorAll('.progress span')) 
    let skills   = document.querySelector('.our-skills');

    if(window.scrollY > skills.offsetTop + skills.offsetHeight - window.innerHeight){
        progspan.forEach((el)=>{
            el.style.width = el.dataset.prog
        });
    };
});

// _____________________________________________________________________________________________
// _____________________________________________________________________________________________
// _____________________________________________________________________________________________

// gallery
let img =document.querySelectorAll('.gallery-img img');
 

img.forEach((el)=>{
    el.addEventListener('click',()=>{

        let overlay           = document.createElement('div');
        overlay.className     = 'overlay';
        document.body.appendChild(overlay);

        let container         = document.createElement('div');
        container.className   = 'pop-container';
        document.body.appendChild(container);

        let imag              = document.createElement('img');
        imag.src              = el.src
        container.appendChild(imag);

        let span          = document.createElement('span');
        span.className    = 'close';
        let spantext      = document.createTextNode('x');
        span.appendChild(spantext);
        container.appendChild(span);
        
        span.addEventListener('click',()=>{
            container.remove();
            overlay.remove();
        });

    });
});

// _____________________________________________________________________________________________
// _____________________________________________________________________________________________
// _____________________________________________________________________________________________

// reset option
document.querySelector('.button').onclick = function(){
    localStorage.clear();
    window.location.reload();
};

// _____________________________________________________________________________________________
// _____________________________________________________________________________________________
// _____________________________________________________________________________________________

// responsiv menue
let menue = document.querySelector('.menu');
let ulcontainer = document.querySelector('.ul');


menue.onclick = function(){
    menue.classList.toggle("active-menue");

    if(ulcontainer.className === 'ul'){
        ulcontainer.classList.replace('ul','active-ul')
    }else{
        ulcontainer.classList.replace(ulcontainer.className,'ul')
    }

}
window.onresize = function () {
    if(window.screen.width < 550){
        let polit = document.querySelector('.polits');
        polit.style.cssText='display:none';
    }else if(window.screen.width > 550){
        let polit = document.querySelector('.polits');
        polit.style.cssText='display:block';
    }
    
}

// function givenmesing(e){
//     let alpha = 'abcdefghijklmnopqrstvuwxyz';
//     let start = alpha.indexOf(e[0]);

//     for (let i = 0; i < e.length; i++) {
//         if(alpha[start + i] !== e[i])
//         return alpha[start + i];
        
//     }
// }
// console.log(givenmesing('abcdfg'));
