// gsap.registerPlugin(ScrollTrigger);


// function valueSetters() {

//     gsap.set("#home span .child", {
//         y: "100%"
//     });
// }


// function revealToSpan() {

//     document
//         .querySelectorAll(".reveal")
//         .forEach(function (elem) {

//             const parent = document.createElement("span");
//             const child = document.createElement("span");

//             parent.classList.add("parent");
//             child.classList.add("child");

//             child.innerHTML = elem.innerHTML;

//             parent.appendChild(child);

//             elem.innerHTML = "";
//             elem.appendChild(parent);

//         });
// }


// revealToSpan();




// const loaderTimeline = gsap.timeline();

// loaderTimeline

//     .from("#loader .child span", {
//         x: 100,
//         duration: 1,
//         stagger: 0.2,
//         ease: "power4.inOut"
//     })

//     .to("#loader .parent .child", {
//         y: "-100%",
//         duration: 0.8,
//        ease: "circ.out",
//     })

//     .to("#loader", {
//         height: 0,
//         duration: 0.8,
//         ease: "circ.out",
//     })

//     .to("#green", {
//         height: "100%",
//         top: 0,
//         duration:0.6,
//         delay: -0.5,
//        ease: "circ.out",
        
//     })

//     .to("#green", {
//     height: "0%",
//     duration: 0.8,
//     delay: -0.5,
//     ease: "circ.out"
// })

// .from("#home h1.reveal .child", {
//     y: "100%",
//     duration: 0.8,
//     stagger: 0.1,
//     ease: "expo.out"
// }, "-=0.6")

// .from(".row .text .child", {
//     y: "100%",
//     duration: 0.6,
//     stagger: 0.08,
//     delay:1.4,
//     ease: "expo.out"
// })


// valueSetters();


// function animatesvg(){
//     document.querySelectorAll("#Visual>g").forEach(function (e){
//         var character = e.querySelector("path, polyline");
//         var length = character.getTotalLength();

//         character.style.strokeDasharray = length + 'px';
//         character.style.strokeDashoffset = length + 'px';
//     })

//     // "Visual" ke letters ka sahi order: V -> i -> s -> u -> a -> l, dot sabse last
//     gsap.to(
//         [
//             "#V path, #V polyline",
//             "#i path, #i polyline",
//             "#s path, #s polyline",
//             "#u path, #u polyline",
//             "#a path, #a polyline",
//             "#l path, #l polyline",
//             "#dot path, #dot polyline"
//         ],
//         {
//             strokeDashoffset: 0,
//             duration: 2,
//             stagger: 0.25,
//             ease: Expo.easeInOut,
//             delay: 3.7
//         }
//     );
// }
// animatesvg();



// function cardHoverEffect() {

//     if (window.innerWidth <= 768) {
//         return;
//     }

//     const cursorContent =
//         document.querySelector(".cursor-content");

//     const elemImages =
//         document.querySelectorAll("#elem img");

//     const workSection =
//         document.querySelector("#work");


//     document
//         .querySelectorAll(".cnt")
//         .forEach(function (cnt) {

//             const showingImage =
//                 cnt.querySelector("img");

//             const imageList =
//                 cnt.dataset.images
//                     .split(",")
//                     .map(url => url.trim());

//             const bgColor =
//                 showingImage.dataset.color;


//             cnt.addEventListener("mousemove", function (dets) {

//                 cursorContent.style.opacity = 1;

//                 cursorContent.style.transform =
//                     `translate(${dets.clientX}px, ${dets.clientY}px)`;


//                 showingImage.style.filter =
//                     "grayscale(1)";


//                 elemImages.forEach(function (img, i) {

//                     if (imageList[i]) {
//                         img.src = imageList[i];
//                     }

//                 });


//                 if (bgColor) {

//                     workSection.style.backgroundColor =
//                         "#" + bgColor;

//                 }

//             });


//             cnt.addEventListener("mouseleave", function () {

//                 cursorContent.style.opacity = 0;

//                 showingImage.style.filter =
//                     "grayscale(0)";

//                 workSection.style.backgroundColor = "";

//             });

//         });

// }


// cardHoverEffect();



// function projectAnimation() {

//     gsap.from(".project h1", {

//         y: 100,

//         stagger: 0.15,

//         duration: 1,

//         delay: 0.2,

//         ease: "power3.out",

//         scrollTrigger: {

//             trigger: "#work",

//             start: "top 80%"

//         }

//     });

// }


// projectAnimation();


// function achievementAnimation() {

//     const items = document.querySelectorAll(
//         ".achievements .achievement-item h2"
//     );

//     if (!items.length) {
//         console.log("Achievement elements not found");
//         return;
//     }

//     items.forEach((item) => {

//         gsap.fromTo(
//             item,

//             {
//                 y: 100,
//                 opacity: 0
//             },

//             {
//                 y: 0,
//                 opacity: 1,

//                 duration: 0.8,

//                 ease: "power3.out",

//                 scrollTrigger: {
//                     trigger: item,

//                     start: "top 90%",

//                     end: "top 60%"
//                 }
//             }
//         );

//     });

// }


// function educationAnimation() {

//     const items = document.querySelectorAll(
//         "#education .education-item h2"
//     );

//     if (!items.length) {
//         console.log("Education elements not found");
//         return;
//     }

//     items.forEach((item) => {

//         gsap.fromTo(
//             item,

//             {
//                 y: 100,
//                 opacity: 0
//             },

//             {
//                 y: 0,
//                 opacity: 1,

//                 duration: 0.8,

//                 ease: "power3.out",

//                 scrollTrigger: {
//                     trigger: item,

//                     start: "top 90%",

//                     end: "top 60%"
//                 }
//             }
//         );

//     });

// }


// achievementAnimation();
// educationAnimation();



// function imageAnimation() {

//     gsap.from("#images .cnt", {

//         y: 100,

//         opacity: 0,

//         stagger: 0.3,

//         duration: 1,

//         scale: 0.3,

//         scrollTrigger: {

//             trigger: "#images",

//             start: "top 85%",

//             end: "top 30%",

//             scrub: 1

//         }

//     });


//     gsap.from(".sd .cnt", {

//         y: 100,

//         opacity: 0,

//         duration: 1,

//         scale: 0.3,

//         scrollTrigger: {

//             trigger: ".sd",

//             start: "top 85%",

//             end: "top 30%",

//             scrub: 1

//         }

//     });

// }


// imageAnimation();



// function endAnimation() {

//     gsap.from(".end h1 .eline", {

//         x: 100,

//         opacity: 0,

//         stagger: 0.2,

//         duration: 0.5,

//         ease: "power3.out",

//         scrollTrigger: {

//             trigger: ".etext",

//             start: "top 80%"

//         }

//     });

// }


// endAnimation();


function navColorSwitch() {

    const nav = document.querySelector("#nav");
    const endSection = document.querySelector(".end");
    const navHeight = nav.offsetHeight;

    window.addEventListener("scroll", function () {

        const rect = endSection.getBoundingClientRect();

        if (rect.top <= navHeight) {
            nav.classList.add("dark-nav");
        } else {
            nav.classList.remove("dark-nav");
        }

    });

}

navColorSwitch();