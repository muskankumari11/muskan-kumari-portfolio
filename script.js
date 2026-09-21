// ✅ 1. URL me se #contact hash hatao taaki page niche jump na kare
if (window.location.hash) {
    history.replaceState(null, null, window.location.pathname + window.location.search);
}

// ✅ 2. Browser ko bolo refresh par hamesha TOP se start kare
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

gsap.registerPlugin(ScrollTrigger);

document.body.classList.add("loader-active");

function valueSetters() {
    gsap.set("#home span .child", {
        y: "100%",
    });
}

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

const scroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true
});

/* ===== GSAP ScrollTrigger + Locomotive Scroll bridge ===== */

scroll.on("scroll", ScrollTrigger.update);

ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
        if (arguments.length) {
            return scroll.scrollTo(value, 0, 0, undefined, true);
        }
        return scroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
        return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight
        };
    },
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});

ScrollTrigger.addEventListener("refresh", () => scroll.update());

/* =========================================================== */

scroll.stop();

const loaderTimeline = gsap.timeline();

loaderTimeline
.addLabel("intro")
.from("#loader .child span:nth-child(1), #loader .child b", {
    x: 100,
    duration: 1.5,
    ease: "expo.out"
}, "intro")
.from("#loader .child span:nth-child(2)", {
    x: 100,
    duration: 1.9,
    ease: "expo.out",
    immediateRender: true
}, "intro+=0.2")
.from("#loader .child span:nth-child(3)", {
    x: 100,
    duration: 1.9,
    ease: "expo.out",
    immediateRender: true
}, "intro+=0.2")
.to("#loader .parent .child", {
    y: "-100%",
    duration: 0.2,
    ease: "circ.out",
    onStart: function () {
        document.querySelector("#loader").classList.add("hide-loader-shape");
    }
}, "-=1")
.call(function () {
    scroll.start();
    document.body.classList.remove("loader-active");
    ScrollTrigger.refresh();
})
.to("#loader", {
    y: "-100%",
    duration: 1,
    ease: "expo.out"
})
.to("#green", {
    y: "-100%",
    duration: 1.2,
    ease: "expo.out"
}, "-=0.75")
.from("#home h1.reveal .child", {
    y: "100%",
    duration: 0.8,
    stagger: 0.1,
    delay: -1,
    ease: "expo.out"
})
.from(".row .text .child", {
    y: "100%",
    duration: 0.6,
    stagger: 0.08,
    delay: 1.4,
    ease: "expo.out"
});

valueSetters();

function animatesvg(){
    document.querySelectorAll("#Visual>g").forEach(function (e){
        var character = e.querySelector("path, polyline");
        var length = character.getTotalLength();

        character.style.strokeDasharray = length + 'px';
        character.style.strokeDashoffset = length + 'px';
    });

    gsap.to(
        [
            "#V path, #V polyline",
            "#i path, #i polyline",
            "#s path, #s polyline",
            "#u path, #u polyline",
            "#a path, #a polyline",
            "#l path, #l polyline",
            "#dot path, #dot polyline"
        ],
        {
            strokeDashoffset: 0,
            duration: 2,
            stagger: 0.25,
            ease: Expo.easeInOut,
            delay: 2.9
        }
    );
}

animatesvg();

function preloadProjectImages() {
    document.querySelectorAll("#work .cnt").forEach(cnt => {
        const imageList = (cnt.dataset.images || "")
            .split(",")
            .map(src => src.trim())
            .filter(Boolean);

        imageList.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    });
}

preloadProjectImages();

/* =========================================================
   FEAT WORKS HOVER EFFECT (ABHISHEK JHA STYLE)
========================================================= */

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

function cardHoverrEffect() {
    if (window.innerWidth <= 768) return;

    const cursor = document.querySelector("#cursor");
    const cursorContent = document.querySelector(".cursor-content");
    const elemContainer = document.querySelector("#elem");
    const workSection = document.querySelector("#work");
    const handIcon = document.querySelector("#cursor-hand");

    if (!cursor || !cursorContent || !elemContainer || !handIcon) return;

    if (cursor.parentElement !== document.body) {
        document.body.appendChild(cursor);
    }
    if (handIcon.parentElement !== document.body) {
        document.body.appendChild(handIcon);
    }

    let slideTimer = null;
    let images = [];
    let index = 0;

    const capsule = cursorContent.querySelector(".ccapsule");

    const moveX = gsap.quickTo(cursorContent, "left", {
        duration: 0.35,
        ease: "power3.out"
    });

    const moveY = gsap.quickTo(cursorContent, "top", {
        duration: 0.35,
        ease: "power3.out"
    });

    const moveHandX = gsap.quickTo(handIcon, "left", {
        duration: 0.08,
        ease: "power3.out"
    });

    const moveHandY = gsap.quickTo(handIcon, "top", {
        duration: 0.08,
        ease: "power3.out"
    });

    const abhishekColors = {
        "cnt1": "#D7DDF2",
        "cnt2": "#EDD5D5",
        "cnt3": "#D5E4D8",
        "cnt4": "#E8DFD5",
        "cnt5": "#E5D8EB"
    };

    function startSlideshow(imageList) {
        clearInterval(slideTimer);
        elemContainer.innerHTML = "";

        images = imageList
            .map(src => src.trim())
            .filter(Boolean)
            .map(src => {
                const img = document.createElement("img");
                img.src = src;
                img.style.opacity = "0";
                elemContainer.appendChild(img);
                return img;
            });

        index = 0;
        if (!images.length) return;

        images[0].style.opacity = "1";
        images[0].classList.add("active");

        if (images.length > 1) {
            slideTimer = setInterval(() => {
                images[index].style.opacity = "0";
                images[index].classList.remove("active");
                index = (index + 1) % images.length;
                images[index].style.opacity = "1";
                images[index].classList.add("active");
            }, 1300);
        }
    }

    document.querySelectorAll(".cnt").forEach(cnt => {
        const mainImage = cnt.querySelector(".img-wrapper img");
        if (!mainImage) return;

        const imageList = (cnt.dataset.images || "")
            .split(",")
            .map(src => src.trim())
            .filter(Boolean);

        let cardColor = "#D7DDF2";
        for (const cls in abhishekColors) {
            if (cnt.classList.contains(cls)) {
                cardColor = abhishekColors[cls];
                break;
            }
        }
        if (mainImage.dataset.color) {
            cardColor = mainImage.dataset.color.startsWith('#') 
                ? mainImage.dataset.color 
                : '#' + mainImage.dataset.color;
        }

        const projectName = cnt.querySelector(".cnt-caption-text")?.textContent.trim() || "VIEW PROJECT";
        const hoverTags = cnt.querySelectorAll(".hover-tag");

        // MOUSE ENTER
        cnt.addEventListener("mouseenter", () => {
            startSlideshow(imageList);

            if (capsule) {
                capsule.textContent = projectName;
            }

            cursorContent.style.opacity = "1";
            cursorContent.style.visibility = "visible";
            handIcon.style.opacity = "1";

            mainImage.style.filter = "grayscale(1)";

            if (hoverTags.length) {
                gsap.to(hoverTags, {
                    y: "0%",
                    duration: 0.5,
                    stagger: 0.08,
                    ease: "power3.out",
                    overwrite: "auto"
                });
            }

            if (workSection) {
                gsap.to(workSection, {
                    backgroundColor: cardColor,
                    duration: 0.65,
                    ease: "power2.out",
                    overwrite: "auto"
                });
            }
        });

        // MOUSE LEAVE
        cnt.addEventListener("mouseleave", () => {
            cursorContent.style.opacity = "0";
            cursorContent.style.visibility = "hidden";
            handIcon.style.opacity = "0";

            mainImage.style.filter = "grayscale(0)";

            if (hoverTags.length) {
                gsap.set(hoverTags, { y: "-110%" });
            }

            if (workSection) {
                gsap.to(workSection, {
                    backgroundColor: "#f2f2f2",
                    duration: 0.65,
                    ease: "power2.out",
                    overwrite: "auto"
                });
            }

            clearInterval(slideTimer);
        });
    });

    document.addEventListener("mousemove", (event) => {
        mouseX = event.clientX;
        mouseY = event.clientY;

        moveX(event.clientX);
        moveY(event.clientY);

        moveHandX(event.clientX);
        moveHandY(event.clientY);
    });
}

cardHoverrEffect();

/* =========================================================
   ARROW EFFECT
========================================================= */

function arrowHoverEffect() {
    document.querySelectorAll(".cnt").forEach(function (card) {
        const arrow = card.querySelector(".cnt-caption-arrow");
        if (!arrow) return;

        const line1 = arrow.querySelector('[id="line1"]');
        const line2 = arrow.querySelector('[id="line2"]');
        const head1 = arrow.querySelector('[id="arrow-head-1"]');
        const head2 = arrow.querySelector('[id="arrow-head-2"]');

        if (!line1 || !line2 || !head1 || !head2) return;

        line2.style.strokeDashoffset = "0";
        line2.style.strokeDasharray = "none";
        head2.style.strokeDashoffset = "0";
        head2.style.strokeDasharray = "none";

        line1.style.strokeDashoffset = "-13.6006";
        line1.style.strokeDasharray = "0px, 23.6006px";
        head1.style.strokeDashoffset = "-9.34";
        head1.style.strokeDasharray = "0px, 19.34px";

        const tl = gsap.timeline({ paused: true });

        tl.to([line2, head2], {
            strokeDasharray: "0px 20px",
            strokeDashoffset: -10,
            duration: 0.6,
            ease: "power2.inOut"
        })
        .to([line1, head1], {
            strokeDasharray: "20px 0px",
            strokeDashoffset: 0,
            duration: 0.6,
            ease: "power2.inOut"
        }, 0);

        card.addEventListener("mouseenter", function () {
            tl.play();
        });

        card.addEventListener("mouseleave", function () {
            tl.progress(0).pause();
        });
    });
}

arrowHoverEffect();

/* =========================================================
   OTHER SECTIONS ANIMATIONS
========================================================= */

function achievementAnimation() {
    gsap.from("#ac .achievement-item h2, #ac .achievement-item .achievement-arrow", {
        y: 100,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
            trigger: "#ac .achievement-item:nth-child(2)",
            start: "top 65%",
            scroller: "#main",
            once: true
        }
    });
}
achievementAnimation();

function educationAnimation() {
    const items = document.querySelectorAll("#education .education-item");
    if (!items.length) return;

    gsap.from("#education .education-item h2, #education .education-item .achievement-arrow", {
        y: 100,
        opacity: 0,
        duration: 0.5,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
            trigger: items[0],
            start: "top 70%",
            scroller: "#main",
            once: true
        }
    });
}
educationAnimation();

function experienceHeadingAnimation() {
    document.querySelectorAll(".experience-section .worknew h1.reveal .child").forEach((child) => {
        gsap.set(child, { y: "100%" });
        gsap.to(child, {
            y: "0%",
            duration: 0.5,
            ease: "power3.out",
            scrollTrigger: {
                trigger: child.closest(".worknew"),
                start: "top 85%",
                scroller: "#main",
                once: true
            }
        });
    });
}
experienceHeadingAnimation();

function experienceTextAnimation() {
    const lines = document.querySelectorAll(".experience-content .line .child");

    gsap.set(lines, {
        y: "100%"
    });

    gsap.to(lines, {
        y: "0%",
        duration: 1.2,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".experience-content",
            start: "top 85%",
            scroller: "#main",
            once: true
        }
    });
}
experienceTextAnimation();

function headingRevealAnimation() {
    document.querySelectorAll(".achievement-heading h1.reveal .child").forEach((child) => {
        gsap.set(child, { y: "100%" });
        gsap.to(child, {
            y: "0%",
            duration: 0.5,
            ease: "power3.out",
            scrollTrigger: {
                trigger: child.closest(".achievement-heading"),
                start: "top 85%",
                scroller: "#main",
                once: true
            }
        });
    });
}
headingRevealAnimation();

function imageryParallax() {
    const settings = [
        { x: 6, y: 13, rotate: -8 },
        { x: 14.7, y: 11, rotate: -0.13 },
        { x: 8, y: 9, rotate: 2 }
    ];

    document.querySelectorAll("#imgrig .imgcntnr").forEach(function (card, i) {
        gsap.to(card, {
            xPercent: settings[i].x,
            yPercent: settings[i].y,
            rotation: settings[i].rotate,
            transformOrigin: "center center",
            ease: "none",
            scrollTrigger: {
                trigger: "#imagery",
                start: "top bottom",
                end: "bottom top",
                scrub: 2,
                scroller: "#main"
            }
        });
    });
}
imageryParallax();

function endGlowParallax() {
    gsap.fromTo(".end-glow",
        { yPercent: -70 },
        {
            yPercent: 0,
            ease: "none",
            scrollTrigger: {
                trigger: ".end",
                start: "top bottom",
                end: "top 25%",
                scrub: 1.2,
                scroller: "#main"
            }
        }
    );
}
endGlowParallax();

function endAnimation() {
    const lines = document.querySelectorAll(".end h1 .reveal .child");

    gsap.set(lines, { y: "100%" });

    gsap.to(lines, {
        y: "0%",
        duration: 0.5,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".etext",
            start: "top 90%",
            scroller: "#main"
        }
    });

    gsap.from(".socials a", {
        y: 50,
        opacity: 0,
        duration: 0.5,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".socials",
            start: "top 95%",
            scroller: "#main"
        }
    });
}
endAnimation();

function navColorSwitch() {
    const nav = document.querySelector("#nav");
    const endSection = document.querySelector(".end");

    if (!nav || !endSection) return;

    scroll.on("scroll", function () {
        const endTop = endSection.getBoundingClientRect().top;
        if (endTop <= 50) {
            nav.classList.add("dark-nav");
        } else {
            nav.classList.remove("dark-nav");
        }
    });
}
navColorSwitch();

window.addEventListener("load", function () {
    scroll.update();
    ScrollTrigger.refresh();
});

function socialsDropdown() {
    const wrapper = document.querySelector(".nav-socials");
    if (!wrapper) return;

    const dropdown = wrapper.querySelector(".socials-dropdown");
    const items = dropdown.querySelectorAll(".socials-dropdown-list a");
    const divider = dropdown.querySelector(".socials-dropdown-divider");

    gsap.set(dropdown, { height: 0, opacity: 0 });
    gsap.set(items, { y: 10, opacity: 0 });
    gsap.set(divider, { scaleX: 0, transformOrigin: "left center" });

    function openDropdown() {
        gsap.killTweensOf([dropdown, items, divider]);
        dropdown.style.pointerEvents = "auto";
        wrapper.classList.add("socials-open");

        gsap.to(dropdown, { height: "auto", opacity: 1, duration: 0.4, ease: "power2.out" });
        gsap.to(divider, { scaleX: 1, duration: 0.4, ease: "power2.out" });
        gsap.to(items, { y: 0, opacity: 1, duration: 0.3, stagger: 0.05, ease: "power2.out", delay: 0.15 });
    }

    function closeDropdown() {
        gsap.killTweensOf([dropdown, items, divider]);
        gsap.to(dropdown, {
            opacity: 0,
            duration: 0.2,
            ease: "power1.out",
            onComplete: () => {
                gsap.set(dropdown, { height: 0 });
                gsap.set(items, { y: 10, opacity: 0 });
                gsap.set(divider, { scaleX: 0 });
            }
        });
        dropdown.style.pointerEvents = "none";
        wrapper.classList.remove("socials-open");
    }

    wrapper.addEventListener("mouseenter", openDropdown);
    wrapper.addEventListener("mouseleave", closeDropdown);
}
socialsDropdown();

function icreate() {
    const lines = document.querySelectorAll("#imglef h1 .line .child");

    gsap.set(lines, {
        y: "100%" 
    });

    gsap.to(lines, {
        y: "0%",
        duration: 1.2,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
            trigger: "#imglef",
            start: "top 85%",   
            scroller: "#main",
            once: true         
        }
    });
}
icreate();

function featAnimation() {
    gsap.set(".fw-text", { y: "100%" });

    gsap.to(".fw-text", {
        y: "0%",
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: {
            trigger: "#featured-work",
            start: "top 85%",
            scroller: "#main",
            once: true
        }
    });
}
featAnimation();