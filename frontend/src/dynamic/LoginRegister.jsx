import { useEffect } from 'react';

const LoginRegister = () => {
  useEffect(() => {
    const initializeLoginRegister = () => {
      const wrapper = document.querySelector('.wrapper');
      const loginLink = document.querySelector('.login-link');
      const registerLink = document.querySelector('.register-link');
      const bthPopups = document.querySelectorAll('.bth');
      const iconClose = document.querySelector('.icon-close');

      const handleRegisterClick = () => {
        wrapper && wrapper.classList.add('active');
      };

      const handleLoginClick = () => {
        wrapper && wrapper.classList.remove('active');
      };

      const handlePopupClick = () => {
        wrapper && wrapper.classList.add('active-popup');
      };

      const handleCloseClick = () => {
        wrapper && wrapper.classList.remove('active-popup');
      };

      // Automatically trigger popup if wrapper is available
      wrapper && handlePopupClick();

      // Attach event listeners if elements are available
      registerLink && registerLink.addEventListener('click', handleRegisterClick);
      loginLink && loginLink.addEventListener('click', handleLoginClick);
      bthPopups.forEach(button => {
        button.addEventListener('click', handlePopupClick);
      });
      iconClose && iconClose.addEventListener('click', handleCloseClick);

      // Cleanup event listeners on component unmount
      return () => {
        registerLink && registerLink.removeEventListener('click', handleRegisterClick);
        loginLink && loginLink.removeEventListener('click', handleLoginClick);
        bthPopups.forEach(button => {
          button.removeEventListener('click', handlePopupClick);
        });
        iconClose && iconClose.removeEventListener('click', handleCloseClick);
      };
    };

    if (document.readyState === 'complete') {
      initializeLoginRegister();
    } else {
      window.addEventListener('load', initializeLoginRegister);
    }
  }, []); // empty dependency array ensures the effect runs only once

  return null; // Since this component handles side effects, return null
}

export default LoginRegister;
