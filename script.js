gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ignoreMobileResize:true});
function valueSetters(){
     gsap.set("#nav a",{
        y:"-100%",
        opacity:0
    })
    gsap.set("#home span .child",{
        y:"100%"
    })
    gsap.set("#home .row img",{
        opacity:0
    })
}


function revealToSpan(){
document.querySelectorAll(".reveal")
.forEach(function(elem){


    var parent=document.createElement("span")
    var child=document.createElement("span")


    parent.classList.add("parent")
    child.classList.add("child")


    child.innerHTML=elem.innerHTML;
    parent.appendChild(child)

    elem.innerHTML="";
    elem.appendChild(parent)
})
}
revealToSpan();
valueSetters();

var tl=gsap.timeline();
tl.from(" #loader .child span",{
    x:100,
    duration:1.4,
    stagger:0.2,
    ease:Power3.easeInOut
})

.to("#loader .parent .child",{
    y:"-100%",
    duration:1,
    ease:Circ.easeInOut
})

.to("#loader",{
    height:0,
    duration:1,
    ease:Circ.easeInOut
})

.to("#green",{
    height:"100%",
    top:0,
    duration:1,
    delay:-0.5,
    ease:Circ.easeInOut
})

.to("#green",{
    height:"0%",
    duration:1,
    delay:-0.5,
    ease:Circ.easeInOut,
    onComplete:function(){
        animateHomePage()
    }
})

function animateHomePage(){
   
    var tl=gsap.timeline();
    tl.to("#nav a",{
        y:0,
        opacity:1,
        stagger:0.2,
        ease:Expo.easeInOut
    })

     tl.to("#home .parent .child",{
        y:0,
        stagger:0.1,
        duration:0.4,
        ease:Expo.easeInOut
    })
}



function cardHoverEffect() {

    const cursorContent = document.querySelector(".cursor-content");
    const elemImages = document.querySelectorAll("#elem img");
    const workSection = document.querySelector("#work");   

    document.querySelectorAll(".cnt").forEach(function(cnt) {

        var showingImage = cnt.querySelector("img");
        var imageList = cnt.dataset.images.split(",");
        var bgColor = showingImage.dataset.color;

        cnt.addEventListener("mousemove", function(dets) {
            cursorContent.style.opacity = 1;
            cursorContent.style.transform = `translate(${dets.clientX}px, ${dets.clientY}px)`;

            showingImage.style.filter = "grayscale(1)";

            elemImages.forEach(function(img, i) {
                img.src = imageList[i];
            });

            if (bgColor) {
                workSection.style.backgroundColor = "#" + bgColor;   
            }
        });

        cnt.addEventListener("mouseleave", function() {
            cursorContent.style.opacity = 0;
            showingImage.style.filter = "grayscale(0)";
            workSection.style.backgroundColor = "";   
        });
    });

}

cardHoverEffect();

function pro(){
 const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#work",
        start: "top 80%",
        end: "top 50%",
      },
    });

    tl.from(".project h1", {
        y:100,
      stagger: 0.15,
      duration: 1,
      delay:1
    });
}
pro();

function edu() {
    const tl1 = gsap.timeline({
        scrollTrigger: {
    trigger: "#education",
    start: "top 90%",
    end: "top 40%"
}
    });

    tl1.from("#education .education-item h2", {   
        y: 150,
        stagger: 0.8,
        duration: 2,
        opacity: 0,
        ease: "power3.out"
    });
    
}
edu();


function achi() {
    const tl1 = gsap.timeline({
        scrollTrigger: {
            trigger: ".achievements",   
            start: "top 90%",
            end: "top 40%",
        }
    });

    tl1.from(".achievements .achievement-item h2", {
        y: 150,
        stagger: 0.8,
        duration: 2,
        opacity: 0,
        ease: "power3.out"
    });
}
achi();

function image(){
    gsap.from('#images .cnt', {
        y: 100,
        opacity: 0,
        stagger: 0.3,
        duration: 1,
        scale:0.3,
        scrollTrigger: {
            trigger: '#images',
            start: 'top 85%',
            end: 'top 30%',
            scrub: 1
        }
    });

    gsap.from('.sd .cnt', {
        y: 100,
        opacity: 0,
        duration: 1,
        scale:0.3,
        scrollTrigger: {
            trigger: '.sd',
            start: 'top 85%',
            end: 'top 30%',
            scrub: 1
        }
    });
}
image();

function end () {
    const tln = gsap.timeline({
        scrollTrigger: {
            trigger: ".etext",
            start: "top 80%",
            end: "top 20%"
        }
    });

    tln.from(".end h1 .eline", {
        x: 100,
        opacity: 0,
        stagger: 0.2,
        duration: 0.5,
        ease: "power3.out"
    });
}
end();
