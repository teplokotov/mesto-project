// Styles
import '../pages/index.css';

// Initial cards
import elements from '../blocks/elements/elements.js';

// Modules
import {  formProfile,
          formNewElement,
          btnEdit,
          btnAdd
        } from '../components/utils.js';
import {  settings, enableValidation  } from '../components/validate.js';
import {  drawCards } from '../components/card.js';
import {  handleClickBtnEdit,
          handleSubmitFormProfile,
          setEventListenersOnPopups,
          handleClickBtnAdd,
          handleSubmitFormNewElement
        } from '../components/modal.js';

// Open modal window (Edit profile)
btnEdit.addEventListener('click', handleClickBtnEdit);

// Set name and status from modal window to page and close modal window
formProfile.addEventListener('submit', handleSubmitFormProfile);

// Add new card and close modal window
formNewElement.addEventListener('submit', handleSubmitFormNewElement);

// Allow to close each modal windows if click on overlay
setEventListenersOnPopups();

// Initial drawing cards
drawCards(elements);

// Open modal window (Add new card)
btnAdd.addEventListener('click', handleClickBtnAdd );

// Enabling validation of all forms
enableValidation(settings);
