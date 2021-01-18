$(document).ready(function () {

    gsap.registerPlugin(ScrollTrigger);

  //zoom
  let zoom = gsap.timeline({
    scrollTrigger: {
      trigger: "body",
      start: "center center",
      end: "50%",
      scrub: true,
    }
  }).to("#landing", {scale: 4, duration: 2})
    .to("#landing", {autoAlpha: 0, duration: 0.5}, 1.5);


  //load content
  gsap.timeline({
    scrollTrigger: {
      trigger: "#content",
      start: "top 22%",
      end: "top 20%",
      scrub: true,
    }
  })
    .to("#content", {
      autoAlpha: 1,
    });


  //snap
  gsap.timeline({
    scrollTrigger: {
      trigger: "#content",
      start: "top 20%",
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