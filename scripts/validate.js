const pageSettings = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible"
};


const showInputError = (inputEl, formEl, settings) => {
    const errorMessage = formEl.querySelector("#" + inputEl.id + "-error");
    errorMessage.textContent = inputEl.validationMessage;
    errorMessage.classList.add(pageSettings.errorClass);
    inputEl.classList.add(pageSettings.inputErrorClass);
}

const hideInputError = (inputEl, formEl, settings) => {
    const errorMessage = formEl.querySelector("#" + inputEl.id + "-error");
    errorMessage.textContent = "";
    errorMessage.classList.remove(pageSettings.errorClass);
    inputEl.classList.remove(pageSettings.inputErrorClass);
}

const checkInputValidity = (formEl, inputEl, settings) => {
    if (inputEl.validity.valid) {
        hideInputError(inputEl, formEl, settings);
    } else {
        showInputError(inputEl, formEl, settings);
    }
};

const hasValidInputs = (inputList) => inputList.every((inputEl) => inputEl.validity.valid);

const toggleButton = (inputList, submitButton, settings) => {
    if (hasValidInputs(inputList)) {
        submitButton.disabled = false;
        submitButton.classList.remove(pageSettings.inactiveButtonClass);
    } else {
        disableSubmitButton(submitButton, settings);
    }
};

const disableSubmitButton = (buttonElement, settings) => {
    buttonElement.classList.add(pageSettings.inactiveButtonClass);
    buttonElement.disabled = true;
};

const setEventListeners = (formEl, settings) => {
    const inputList = Array.from(formEl.querySelectorAll(pageSettings.inputSelector));
    const submitButton = formEl.querySelector(pageSettings.submitButtonSelector);

    toggleButton(inputList, submitButton);

    inputList.forEach((inputEl) => {
        inputEl.addEventListener("input", () => {
            checkInputValidity(formEl, inputEl, settings);

            toggleButton(inputList, submitButton, settings);
        });
    });
};

const enableValidation = (settings) => {
    const formElements = Array.from(document.querySelectorAll(pageSettings.formSelector));
    formElements.forEach((formEl) => {
        formEl.addEventListener("submit", (e) => e.preventDefault());
        setEventListeners(formEl, settings);
    });
};

enableValidation(pageSettings);