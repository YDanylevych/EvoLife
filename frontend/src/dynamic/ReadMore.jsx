import { useEffect } from 'react';

const ReadMore = () => {

  useEffect(() => {
    const handleButtonClick = (event) => {
      event.preventDefault();
      const buttonId = event.target.id;
      const introParagraphId = buttonId.replace('readMoreBtn', 'introText');
      const introParagraph = document.getElementById(introParagraphId);
      toggleIntroVisibility(introParagraph, buttonId);
    };

    const addButtonListeners = () => {
      const buttonIds = ['readMoreBtn1', 'readMoreBtn2', 'readMoreBtn3'];
      buttonIds.forEach(id => {
        const button = document.getElementById(id);
        if (button) {
          button.addEventListener('click', handleButtonClick);
        }
      });
    };

    addButtonListeners();

    return () => {
      const removeButtonListeners = () => {
        const buttonIds = ['readMoreBtn1', 'readMoreBtn2', 'readMoreBtn3'];
        buttonIds.forEach(id => {
          const button = document.getElementById(id);
          if (button) {
            button.removeEventListener('click', handleButtonClick);
          }
        });
      };

      removeButtonListeners();
    };
  }, []); 

  function toggleIntroVisibility(introParagraph, buttonId) {
    if (introParagraph.style.display === 'none' || introParagraph.style.display === '') {
      introParagraph.style.display = 'block';
      document.getElementById(buttonId).innerText = 'Read less';
    } else {
      introParagraph.style.display = 'none';
      document.getElementById(buttonId).innerText = 'Read more';
    }
  }

  return null;
}

export default ReadMore;