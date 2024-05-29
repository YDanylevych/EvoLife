import { useEffect } from 'react';

const Accordion = () => {
  useEffect(() => {
    const handleAccordionClick = (event) => {
      const accordionItem = event.target.parentElement;
      const accordionContent = accordionItem.querySelector(".accordion-content");

      // Toggle visibility of accordion content
      if (accordionContent.style.maxHeight) {
        accordionContent.style.maxHeight = null;
      } else {
        accordionContent.style.maxHeight = accordionContent.scrollHeight + "px";
      }
    };

    // Attach event listeners to each accordion title
    const accordionTitles = document.querySelectorAll(".accordion-title");
    accordionTitles.forEach(title => {
      title.addEventListener("click", handleAccordionClick);
    });

    // Cleanup event listeners on component unmount
    return () => {
      accordionTitles.forEach(title => {
        title.removeEventListener("click", handleAccordionClick);
      });
    };
  }, []); // empty dependency array ensures the effect runs only once

  return null; // Since this component handles side effects, return null
}

export default Accordion;
