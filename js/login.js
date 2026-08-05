/* ========================================
   LOGIN PAGE
======================================== */


/* ========================================
   ELEMENTS
======================================== */

const loginForm =
    document.getElementById("loginForm");

const emailInput =
    document.getElementById("email");

const passwordInput =
    document.getElementById("password");

const passwordToggle =
    document.getElementById("passwordToggle");

const loginButton =
    document.getElementById("loginButton");

const loginButtonText =
    document.getElementById("loginButtonText");

const loginError =
    document.getElementById("loginError");


/* ========================================
   SHOW / HIDE PASSWORD
======================================== */

passwordToggle.addEventListener(
    "click",
    function () {

        const isPassword =
            passwordInput.type === "password";


        if (isPassword) {

            passwordInput.type = "text";

            passwordToggle.textContent =
                "Hide";

            passwordToggle.setAttribute(
                "aria-label",
                "Hide password"
            );

        } else {

            passwordInput.type = "password";

            passwordToggle.textContent =
                "Show";

            passwordToggle.setAttribute(
                "aria-label",
                "Show password"
            );

        }

    }
);


/* ========================================
   HIDE ERROR WHILE TYPING
======================================== */

emailInput.addEventListener(
    "input",
    hideError
);

passwordInput.addEventListener(
    "input",
    hideError
);


function hideError() {

    loginError.classList.remove("show");

}


/* ========================================
   LOGIN
======================================== */

loginForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const email =
            emailInput.value
                .trim()
                .toLowerCase();


        const password =
            passwordInput.value;


        /* --------------------------------
           DEMO ACCOUNT
        -------------------------------- */

        const demoEmail =
            "admin@cendekiamedika.com";

        const demoPassword =
            "admin123";


        /* --------------------------------
           CHECK LOGIN
        -------------------------------- */

        if (
            email !== demoEmail ||
            password !== demoPassword
        ) {

            loginError.textContent =
                "Invalid email or password.";

            loginError.classList.add(
                "show"
            );

            return;

        }


        /* --------------------------------
           LOADING STATE
        -------------------------------- */

        loginButton.disabled = true;

        loginButton.classList.add(
            "loading"
        );


        /* --------------------------------
           DEMO REDIRECT
        -------------------------------- */

        setTimeout(
            function () {

                window.location.href =
                    "pages/admin/dashboard.html";

            },
            700
        );

    }
);