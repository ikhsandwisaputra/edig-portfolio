document.addEventListener("DOMContentLoaded", function () {
    // Initialize smooth scrolling and GSAP
    const initLenis = () => new Lenis({
      autoRaf: true,
      lerp: 0.05,
      wheelMultiplier: 0.7,
    });

    gsap.registerPlugin(ScrollTrigger);

    // Setup work section elements
    const workSection = document.querySelector('[data-work="section"]');
    const workItems = document.querySelectorAll('[data-work="item"]');
    
    // Create ghost elements for scroll tracking
    const ghostContainer = document.createElement('div');
    ghostContainer.className = 'ghost_work-container';
    workSection.appendChild(ghostContainer);

    const ghostItems = Array.from(workItems).map(() => {
      const ghostItem = document.createElement('div');
      ghostItem.className = 'ghost_work-item';
      ghostItem.style.cssText = 'width: 100%; height: 300vh;';
      ghostContainer.appendChild(ghostItem);

      return ghostItem;
    });

    // Initial setup
    gsap.set(".work_item", {
      position: "fixed",
      top: "0",
      clipPath: "inset(100% 0 0% 0)"
    });

    // Create animations for each work item
    workItems.forEach((element, index) => {

      // Cache DOM queries
      const lines = element.querySelectorAll('[data-line]'); 
      const workImage = element.querySelector('[data-work="image"]');
      const videoContainer = element.querySelectorAll('[data-work="video"]');
      const overlay = element.querySelectorAll('[data-work="item-overlay"]'); 

      // Set initial image scale
      gsap.set(workImage, {
        scale: 1.4,
        yPercent: 10
      });
      // Main reveal animations
      const stStarting = {
        trigger: ghostItems[index],
        scrub: true,
        start: "top bottom",
        end: "+75vh top",
      };
      gsap.to(element, {
        clipPath: "inset(0% 0 0 0)",
        scrollTrigger: stStarting
      });
      gsap.to(workImage, {
        yPercent: 10,
        scale: 1.2,
        scrollTrigger: stStarting
      });
      // Text lines animation
      gsap.from(lines, {
        yPercent: 125,
        rotate: 2.5,
        ease: "power2.inOut",
        duration: 1.25,
        scrollTrigger: {
          trigger: ghostItems[index],
          start: "top 75%",
          toggleActions: "play reverse restart reverse"
        }
      });
      // Image blur effect
      gsap.to(workImage, {
        filter: "blur(10px)",
        opacity: 0.3,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: ghostItems[index],
          scrub: true,
          start: "0 top",
          end: "35% top",
        }
      });
      // Video container slide in
      gsap.from(videoContainer, {
        x: index % 2 === 0 ? "100vw" : "-100vw",
        scrollTrigger: {
          trigger: ghostItems[index],
          scrub: true,
          start: "0 top",
          end: "65% top",
          onLeave: () => {
            gsap.set(overlay, {
              display: 'flex',
              opacity: 0
            });
          },
        }
      });
      // Final animations
      const stFinal = {
        trigger: ghostItems[index],
        scrub: true,
        start: "105% bottom",
        toggleActions: "play reverse play reverse"
      };
      gsap.fromTo(overlay, { opacity: 0 },
        {
          opacity: 1,
          scrollTrigger: stFinal
        });
      gsap.to(videoContainer, {
        yPercent: 15,
        scrollTrigger: stFinal
      });
      gsap.to(element, {
        filter: "blur(1px)",
        scrollTrigger: stFinal
      });
    });

    // Initialize smooth scrolling
     initLenis();
  })