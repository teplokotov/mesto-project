(()=>{"use strict";var e={formSelector:".form",inputSelector:".form__input",submitButtonSelector:".btn-save",inputErrorClass:"form__input_type_error",errorClass:"form__input-error_active"};function t(e,t,o,c){t.forEach((function(t){return n(e,t,c)})),r(t,o)}function n(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),r.classList.remove(n.errorClass),r.textContent=""}function r(e,t){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?t.removeAttribute("disabled"):t.setAttribute("disabled","disabled")}var o=document.forms.formEdit,c=document.forms.formNewElement,u=o.querySelector(e.submitButtonSelector),i=document.querySelector(".btn-edit"),s=document.querySelector(".btn-add"),a=document.querySelector(".elements__list"),l=document.querySelector("#card-template").content.querySelector(".element"),d=document.querySelector(".figure"),p=d.querySelector(".figure__image"),m=d.querySelector(".figure__caption"),f=document.querySelector("#popupShowPhoto"),v=document.querySelector(".info__name"),y=document.querySelector(".info__status"),S=document.querySelector("#profileName"),q=document.querySelector("#profileStatus"),E=document.querySelector("#popupEdit"),_=document.querySelector("#popupNewElement"),k=_.querySelector(e.submitButtonSelector),b=document.querySelector("#elementName"),g=document.querySelector("#elementLink");function L(e){e.classList.add("popup_opened"),window.addEventListener("keydown",h)}function h(e){"Escape"===e.key&&x(document.querySelector(".popup_opened"))}function x(e){window.removeEventListener("keydown",h),e.classList.remove("popup_opened")}function C(e){x(e.target.closest(".popup"))}function w(e,t,n){var r=function(e,t){var n=l.cloneNode(!0),r=n.querySelector(".element__image"),o=n.querySelector(".element__title");r.setAttribute("alt",e),r.setAttribute("src",t),o.textContent=e;var c=n.querySelector(".btn-like");return c.addEventListener("click",(function(){c.classList.toggle("btn-like_liked")})),n.querySelector(".btn-trash").addEventListener("click",(function(e){e.target.closest(".element").remove()})),r.addEventListener("click",(function(n){p.setAttribute("alt",e),p.setAttribute("src",t),m.textContent=e,L(f)})),n}(e,t);"append"===n?a.append(r):a.prepend(r)}i.addEventListener("click",(function(n){S.value=v.textContent,q.value=y.textContent,t(popupEdit,[S,q],u,e),L(popupEdit)})),o.addEventListener("submit",(function(e){e.preventDefault(),v.textContent=S.value,y.textContent=q.value,C(e)})),c.addEventListener("submit",(function(e){e.preventDefault(),w(b.value,g.value),e.target.reset(),C(e)})),[E,_,f].forEach((function(e){e.addEventListener("click",(function(e){(!e.target.className.includes("form")&&!e.target.className.includes("figure")||e.target.classList.contains("popup__container"))&&C(e)}))})),[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].forEach((function(e){w(e.name,e.link,"append")})),s.addEventListener("click",(function(){c.reset(),t(popupNewElement,[b,g],k,e),window.addEventListener("keydown",h),L(popupNewElement)})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){!function(e,t){var o=Array.from(e.querySelectorAll(t.inputSelector)),c=e.querySelector(t.submitButtonSelector);o.forEach((function(u){u.addEventListener("input",(function(){r(o,c),function(e,t,r){t.validity.valid?n(e,t,r):function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(r.inputErrorClass),t.validity.patternMismatch?o.textContent=t.dataset.errorMessage:o.textContent=n,o.classList.add(r.errorClass)}(e,t,t.validationMessage,r)}(e,u,t)}))}))}(t,e)}))}(e)})();