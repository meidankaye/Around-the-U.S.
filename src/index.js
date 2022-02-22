import "./index.css";
import Card from "./components/Card.js";
import FormValidator from "./components/FormValidator.js";
import Section from "./components/Section.js";
import Popup from "./components/Popup.js";
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithForm from "./components/PopupWithForm.js";
import { openPopup, closePopup } from "./components/utils.js";

const imagePopup = new PopupWithImage(".popup_type_preview");
imagePopup.setEventListeners();

const editPopup = new PopupWithForm(".popup_type_edit", (data) => {

    profileName.textContent = data.name;
    profileProfession.textContent = data.profession;

});

editPopup.setEventListeners();

const addPopup = new PopupWithForm(".popup_type_add", (data) => {

    renderPlace({
        name: data.title,
        link: data.link
    }, places)

});

addPopup.setEventListeners();


const initialCards = [{
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
},
{
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
},
{
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
},
{
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
},
{
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
},
{
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
},
];

initialCards.reverse();

/* -------------------------------------------------------------------------- */
/*                                  Popups                                    */
/* -------------------------------------------------------------------------- */

// const editPopup = document.querySelector(".popup_type_edit");
// const addPopup = document.querySelector(".popup_type_add");
const places = document.querySelector(".places");

/* -------------------------------------------------------------------------- */
/*                                    Forms                                   */
/* -------------------------------------------------------------------------- */

const editForm = document.querySelector(".popup_type_edit").querySelector(".popup__form");
const addForm = document.querySelector(".popup_type_add").querySelector(".popup__form");

/* -------------------------------------------------------------------------- */
/*                            Buttons and DOM nodes                           */
/* -------------------------------------------------------------------------- */

const profileName = document.querySelector(".profile__name");
const profileProfession = document.querySelector(".profile__profession");
const editBtn = document.querySelector(".profile__edit-button");
const addBtn = document.querySelector(".profile__add-button");
const closeBtnList = Array.from(document.querySelectorAll(".popup__close-button"));

/* -------------------------------------------------------------------------- */
/*                                  Inputs                                    */
/* -------------------------------------------------------------------------- */

// const popupInputName = document.querySelector(".popup__input_type_name");
// const popupInputProfession = document.querySelector(
//     ".popup__input_type_profession"
// );
const placeName = document.querySelector(".popup__input_type_title");
const placeLink = document.querySelector(".popup__input_type_link");



/* -------------------------------------------------------------------------- */
/*                                 Validation                                 */
/* -------------------------------------------------------------------------- */

const validationSettings = {
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible"
};

const editFormValidator = new FormValidator(validationSettings, editForm);
const addFormValidator = new FormValidator(validationSettings, addForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();


/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */

editBtn.addEventListener("click", () => {
    // popupInputName.value = profileName.textContent;
    // popupInputProfession.value = profileProfession.textContent;
    // openPopup(editPopup);
    editPopup.open();
});

// editForm.addEventListener("submit", (e) => {
//     // profileName.textContent = popupInputName.value;
//     // profileProfession.textContent = popupInputProfession.value;
//     // closePopup(editPopup);
//     e.preventDefault();
// });

addBtn.addEventListener("click", () => {
    addFormValidator.resetFormValidation(addForm);
    addPopup.open();
    // openPopup(addPopup);
});

// addForm.addEventListener("submit", (e) => {
//     e.preventDefault();
//     renderPlace({
//         name: placeName.value,
//         link: placeLink.value
//     }, places);
//     // closePopup(addPopup);
//     addForm.reset();
// });

// closeBtnList.forEach((btn) => btn.addEventListener("click", closePopup));

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

const cardTemplate = document.querySelector("#place-template");

function renderPlace(data, container) {
    const card = new Card(data, cardTemplate, (name, link) => {
        imagePopup.open(name, link)
    });
container.prepend(card.getElement());
}

initialCards.forEach((data) => {
    renderPlace(data, places);
});