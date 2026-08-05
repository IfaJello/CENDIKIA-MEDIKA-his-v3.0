/* ========================================
   CENDEKIA MEDIKA
   ADMIN DASHBOARD
======================================== */


/* ========================================
   LOGOUT
======================================== */

const logoutButton =
    document.getElementById("logoutButton");


logoutButton.addEventListener(
    "click",
    function () {

        const confirmed =
            confirm(
                "Are you sure you want to sign out?"
            );


        if (!confirmed) {
            return;
        }


        window.location.href =
            "../../index.html";

    }
);


/* ========================================
   QUICK ACTIONS
======================================== */

const quickActions =
    document.querySelectorAll(
        ".quick-action"
    );


quickActions.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                const action =
                    button.dataset.action;


                handleQuickAction(
                    action
                );

            }
        );

    }
);


/* ========================================
   QUICK ACTION HANDLER
======================================== */

function handleQuickAction(action) {

    switch (action) {

        case "patient":

            alert(
                "Add Patient\n\n" +
                "The patient registration form " +
                "will be connected here."
            );

            break;


        case "appointment":

            alert(
                "Add Appointment\n\n" +
                "The appointment form " +
                "will be connected here."
            );

            break;


        case "staff":

            alert(
                "Add Staff\n\n" +
                "The staff registration form " +
                "will be connected here."
            );

            break;


        case "report":

            alert(
                "Generate Report\n\n" +
                "The hospital reporting system " +
                "will be connected here."
            );

            break;

    }

}


/* ========================================
   TOP ADD PATIENT BUTTON
======================================== */

const quickAddButton =
    document.getElementById(
        "quickAddButton"
    );


quickAddButton.addEventListener(
    "click",
    function () {

        handleQuickAction(
            "patient"
        );

    }
);


/* ========================================
   NOTIFICATION
======================================== */

const notificationButton =
    document.querySelector(
        ".notification-button"
    );


notificationButton.addEventListener(
    "click",
    function () {

        alert(
            "Notifications\n\n" +
            "You have 3 new notifications."
        );

    }
);


/* ========================================
   PROFILE
======================================== */

const profile =
    document.querySelector(
        ".profile"
    );


profile.addEventListener(
    "click",
    function () {

        alert(
            "Administrator Account\n\n" +
            "Signed in as Admin."
        );

    }
);


/* ========================================
   DASHBOARD READY
======================================== */

console.log(
    "Cendekia Medika Admin Dashboard loaded."
);