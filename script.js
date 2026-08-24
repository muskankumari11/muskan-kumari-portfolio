gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.config({
    ignoreMobileResize: true
});


/* ================================================= */
/* INITIAL SETTERS */
/* ================================================= */

function valueSetters() {

    gsap.set("#nav a", {
        y: "-100%",
        opacity: 0
    });

    gsap.set("#home span .child", {
        y: "100%"
    });

    gsap.set("#home .row img", {
        opacity: 0
    });
}


/* ================================================= */
/* REVEAL TEXT */
/* ================================================= */

function revealToSpan() {

    document
        .querySelectorAll(".reveal")
        .forEach(function (elem) {

            const parent = document.createElement("span");
            const child = document.createElement("span");

            parent.classList.add("parent");
            child.classList.add("child");

            child.innerHTML = elem.innerHTML;

            parent.appendChild(child);

            elem.innerHTML = "";
            elem.appendChild(parent);

        });
}


revealToSpan();
valueSetters();


/* ================================================= */
/* LOADER ANIMATION */
/* ================================================= */

const loaderTimeline = gsap.timeline();

loaderTimeline

    .from("#loader .child span", {
        x: 100,
        duration: 1.4,
        stagger: 0.2,
        ease: "power3.inOut"
    })

    .to("#loader .parent .child", {
        y: "-100%",
        duration: 1,
        ease: "circ.inOut"
    })

    .to("#loader", {
        height: 0,
        duration: 1,
        ease: "circ.inOut"
    })

    .to("#green", {
        height: "100%",
        top: 0,
        duration: 1,
        delay: -0.5,
        ease: "circ.inOut"
    })

    .to("#green", {
        height: "0%",
        duration: 1,
        delay: -0.5,
        ease: "circ.inOut",

        onComplete: function () {
            animateHomePage();
        }
    });


/* ================================================= */
/* HOME ANIMATION */
/* ================================================= */

function animateHomePage() {

    const tl = gsap.timeline();

    tl.to("#nav a", {
        y: 0,
        opacity: 1,

        stagger: 0.2,

        ease: "expo.inOut"
    })

    .to("#home .parent .child", {
        y: 0,

        stagger: 0.1,

        duration: 0.4,

        ease: "expo.inOut"
    });

}


/* ================================================= */
/* CARD HOVER */
/* ================================================= */

function cardHoverEffect() {

    // Mobile par cursor animation nahi chahiye
    if (window.innerWidth <= 768) {
        return;
    }

    const cursorContent =
        document.querySelector(".cursor-content");

    const elemImages =
        document.querySelectorAll("#elem img");

    const workSection =
        document.querySelector("#work");


    document
        .querySelectorAll(".cnt")
        .forEach(function (cnt) {

            const showingImage =
                cnt.querySelector("img");

            const imageList =
                cnt.dataset.images
                    .split(",")
                    .map(url => url.trim());

            const bgColor =
                showingImage.dataset.color;


            cnt.addEventListener("mousemove", function (dets) {

                cursorContent.style.opacity = 1;

                cursorContent.style.transform =
                    `translate(${dets.clientX}px, ${dets.clientY}px)`;


                showingImage.style.filter =
                    "grayscale(1)";


                elemImages.forEach(function (img, i) {

                    if (imageList[i]) {
                        img.src = imageList[i];
                    }

                });


                if (bgColor) {

                    workSection.style.backgroundColor =
                        "#" + bgColor;

                }

            });


            cnt.addEventListener("mouseleave", function () {

                cursorContent.style.opacity = 0;

                showingImage.style.filter =
                    "grayscale(0)";

                workSection.style.backgroundColor = "";

            });

        });

}


cardHoverEffect();


/* ================================================= */
/* PROJECT ANIMATION */
/* ================================================= */

function projectAnimation() {

    gsap.from(".project h1", {

        y: 100,

        stagger: 0.15,

        duration: 1,

        delay: 0.2,

        ease: "power3.out",

        scrollTrigger: {

            trigger: "#work",

            start: "top 80%",

            toggleActions:
                "play none none reverse"

        }

    });

}


projectAnimation();


function achievementAnimation() {

    const items = document.querySelectorAll(
        ".achievements .achievement-item h2"
    );

    if (!items.length) {
        console.log("Achievement elements not found");
        return;
    }

    items.forEach((item) => {

        gsap.fromTo(
            item,

            {
                y: 100,
                opacity: 0
            },

            {
                y: 0,
                opacity: 1,

                duration: 0.8,

                ease: "power3.out",

                scrollTrigger: {
                    trigger: item,

                    start: "top 90%",

                    end: "top 60%",

                    toggleActions:
                        "play none none reverse",

                    markers: false
                }
            }
        );

    });

}


function educationAnimation() {

    const items = document.querySelectorAll(
        "#education .education-item h2"
    );

    if (!items.length) {
        console.log("Education elements not found");
        return;
    }

    items.forEach((item) => {

        gsap.fromTo(
            item,

            {
                y: 100,
                opacity: 0
            },

            {
                y: 0,
                opacity: 1,

                duration: 0.8,

                ease: "power3.out",

                scrollTrigger: {
                    trigger: item,

                    start: "top 90%",

                    end: "top 60%",

                    toggleActions:
                        "play none none reverse",

                    markers: false
                }
            }
        );

    });

}


achievementAnimation();
educationAnimation();


/* ================================================= */
/* PROJECT IMAGES */
/* ================================================= */

function imageAnimation() {

    gsap.from("#images .cnt", {

        y: 100,

        opacity: 0,

        stagger: 0.3,

        duration: 1,

        scale: 0.3,

        scrollTrigger: {

            trigger: "#images",

            start: "top 85%",

            end: "top 30%",

            scrub: 1

        }

    });


    gsap.from(".sd .cnt", {

        y: 100,

        opacity: 0,

        duration: 1,

        scale: 0.3,

        scrollTrigger: {

            trigger: ".sd",

            start: "top 85%",

            end: "top 30%",

            scrub: 1

        }

    });

}


imageAnimation();


/* ================================================= */
/* CONTACT ANIMATION */
/* ================================================= */

function endAnimation() {

    gsap.from(".end h1 .eline", {

        x: 100,

        opacity: 0,

        stagger: 0.2,

        duration: 0.5,

        ease: "power3.out",

        scrollTrigger: {

            trigger: ".etext",

            start: "top 80%",

            toggleActions:
                "play none none reverse"

        }

    });

}


endAnimation();


/* ================================================= */
/* IMPORTANT - REFRESH */
/* ================================================= */

window.addEventListener("load", function () {

    ScrollTrigger.refresh();

});


/* ================================================= */
/* RESIZE REFRESH */
/* ================================================= */

let resizeTimer;

window.addEventListener("resize", function () {

    clearTimeout(resizeTimer);

    resizeTimer = setTimeout(function () {

        ScrollTrigger.refresh();

    }, 300);

});