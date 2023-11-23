// /** 
//  * Set message for form.
//  **/
// function setFormMessage(formElement, type, message) {
//     const messageElement = formElement.querySelector(".form__message");

//     messageElement.textContent = message;
//     messageElement.classList.remove("form__message--success", "form__message--error");
//     messageElement.classList.add(`form__message--${type}`);
// }

// /** 
//  * Set error for the input element.
//  **/
// function setInputError(inputElement, message) {
//     inputElement.classList.add("form__input--error");
//     inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
// }

// /** 
//  * Clear error for the input element.
//  **/
// function clearInputError(inputElement) {
//     inputElement.classList.remove("form__input--error");
//     inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
// }

// document.addEventListener("DOMContentLoaded", () => {

//     const loginForm = document.querySelector("#login");
//     const createAccountForm = document.querySelector("#createAccount");

//     document.querySelector("#linkCreateAccount").addEventListener("click", e => {
//         e.preventDefault();
//         loginForm.classList.add("form--hidden");
//         createAccountForm.classList.remove("form--hidden");
//     });

//     document.querySelector("#linkLogin").addEventListener("click", e => {
//         e.preventDefault();
//         loginForm.classList.remove("form--hidden");
//         createAccountForm.classList.add("form--hidden");
//     });

//     loginForm.addEventListener("submit", e => {
//         e.preventDefault();

//         // Perform your AJAX/Fetch login
//         fetch('/login', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 username_or_email: loginForm.elements["username_or_email"].value,
//                 password: loginForm.elements["password"].value
//             })
//         })
//         .then(response => {
//             // Check if fetch was successful
//             if(!response.ok) {
//                 throw new Error("Network response was not ok");
//             }
//             return response.json();
//         })
//         .then(data => {
//             if (data.success) {
//                 // Handle successful login
//                 window.location.href = '/dashboard'; // Redirect to dashboard
//             } else {
//                 // Display server error messages
//                 setFormMessage(loginForm, "error", data.message);
//             }
//         })
//         .catch(error => {
//             // Handle network errors
//             console.error('There has been a problem with your fetch operation:', error);
//             setFormMessage(loginForm, "error", "Something went wrong, please try again later.");
//         });
//     });

//     document.querySelectorAll(".form__input").forEach(inputElement => {
//         inputElement.addEventListener("blur", e => {
//             if (e.target.id === "signupUsername" && e.target.value.length > 0 && e.target.value.length < 7) {
//                 setInputError(inputElement, "Username must be at least 7 characters in length");
//             }
//         });

//         inputElement.addEventListener("input", e => {
//             // Clear input error messages
//             clearInputError(inputElement);
//         });
//     });
// });
/** 
 * Set message for form.
 **/
function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form__message");

    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error");
    messageElement.classList.add(`form__message--${type}`);
}

/** 
 * Set error for the input element.
 **/
function setInputError(inputElement, message) {
    inputElement.classList.add("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}

/** 
 * Clear error for the input element.
 **/
function clearInputError(inputElement) {
    inputElement.classList.remove("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
}

document.addEventListener("DOMContentLoaded", () => {

    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");

    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.remove("form--hidden");
    });

    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
    });

    loginForm.addEventListener("submit", e => {
        e.preventDefault();

        // Perform your AJAX/Fetch login
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username_or_email: loginForm.elements["username_or_email"].value,
                password: loginForm.elements["password"].value
            })
        })
        .then(response => {
            // Check if fetch was successful
            if(!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                // Handle successful login
                window.location.href = '/dashboard'; // Redirect to dashboard
            } else {
                // Display server error messages
                setFormMessage(loginForm, "error", data.message);
            }
        })
        .catch(error => {
            // Handle network errors
            console.error('There has been a problem with your fetch operation:', error);
            setFormMessage(loginForm, "error", "Something went wrong, please try again later.");
        });
    });

    document.querySelectorAll(".form__input").forEach(inputElement => {
        inputElement.addEventListener("blur", e => {
            if (e.target.id === "signupUsername" && e.target.value.length > 0 && e.target.value.length < 7) {
                setInputError(inputElement, "Username must be at least 7 characters in length");
            }
        });

        inputElement.addEventListener("input", e => {
            // Clear input error messages
            clearInputError(inputElement);
        });
    });
});
