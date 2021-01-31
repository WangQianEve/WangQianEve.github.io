$(document).ready(function () {

    gsap.registerPlugin(ScrollTrigger);

  //zoom
  let zoom = gsap.timeline({
    scrollTrigger: {
      trigger: "body",
      start: "center center",
      end: "center top",
      scrub: true,
    }
  }).to("#landing", {scale: 4, duration: 2})
    .to("#landing", {autoAlpha: 0, duration: 0.2}, 1.5);


  //load content
  gsap.timeline({
    scrollTrigger: {
      trigger: "#content",
      start: "top 27%",
      end: "top 25%",
      scrub: true,
      // markers: true,
    }
  })
    .to("#content", {
      autoAlpha: 1,
    });


  //snap
  gsap.timeline({
    scrollTrigger: {
      trigger: "#content",
      start: "top 27%", //should be same or higher than load's start position to avoid stop in transparent state
      end: "top top",
      scrub: true,
      snap: {
        snapTo: [1],
        duration: 0.3,
        ease: "power4.out"
      },
    }
  });

}); //ready