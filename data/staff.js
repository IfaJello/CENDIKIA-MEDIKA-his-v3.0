/* ========================================
   CENDEKIA MEDIKA
   STAFF MANAGEMENT JAVASCRIPT
======================================== */


/* ========================================
   ELEMENTS
======================================== */

const staffTableBody =
    document.getElementById("staffTableBody");

const searchInput =
    document.getElementById("searchInput");

const roleFilter =
    document.getElementById("roleFilter");

const statusFilter =
    document.getElementById("statusFilter");

const emptyState =
    document.getElementById("emptyState");

const staffModal =
    document.getElementById("staffModal");

const staffForm =
    document.getElementById("staffForm");



/* ========================================
   GET INITIALS
======================================== */

function getInitials(name) {

    if (!name) {
        return "";
    }

    return name
        .trim()
        .split(/\s+/)
        .map(
            word =>
                word
                    .charAt(0)
                    .toUpperCase()
        )
        .join("")
        .substring(0, 2);

}



/* ========================================
   CAPITALIZE
======================================== */

function capitalize(value) {

    if (!value) {
        return "";
    }

    return (
        value.charAt(0).toUpperCase()
        + value.slice(1)
    );

}



/* ========================================
   ESCAPE HTML
======================================== */

function escapeHTML(value) {

    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}



/* ========================================
   UPDATE STATISTICS
======================================== */

function updateStatistics() {

    const total =
        staff.length;

    const active =
        staff.filter(
            member =>
                member.status === "active"
        ).length;

    const inactive =
        staff.filter(
            member =>
                member.status === "inactive"
        ).length;

    const doctors =
        staff.filter(
            member =>
                member.role === "doctor"
        ).length;

    const nurses =
        staff.filter(
            member =>
                member.role === "nurse"
        ).length;


    const totalElement =
        document.getElementById(
            "totalStaff"
        );

    const activeElement =
        document.getElementById(
            "activeStaff"
        );

    const inactiveElement =
        document.getElementById(
            "inactiveStaff"
        );

    const doctorsElement =
        document.getElementById(
            "doctorCount"
        );

    const nursesElement =
        document.getElementById(
            "nurseCount"
        );


    if (totalElement) {
        totalElement.textContent =
            total;
    }

    if (activeElement) {
        activeElement.textContent =
            active;
    }

    if (inactiveElement) {
        inactiveElement.textContent =
            inactive;
    }

    if (doctorsElement) {
        doctorsElement.textContent =
            doctors;
    }

    if (nursesElement) {
        nursesElement.textContent =
            nurses;
    }

}



/* ========================================
   DISPLAY STAFF
======================================== */

function displayStaff() {

    if (!staffTableBody) {
        return;
    }


    const search =
        searchInput
            ? searchInput.value
                .toLowerCase()
                .trim()
            : "";


    const selectedRole =
        roleFilter
            ? roleFilter.value
            : "all";


    const selectedStatus =
        statusFilter
            ? statusFilter.value
            : "all";


    let filteredStaff =
        staff.filter(
            member => {

                const searchableText = (

                    member.name
                    + " "
                    + member.id
                    + " "
                    + member.email
                    + " "
                    + member.phone
                    + " "
                    + member.role
                    + " "
                    + member.department

                ).toLowerCase();


                const matchesSearch =
                    searchableText
                        .includes(search);


                const matchesRole =
                    selectedRole === "all"
                    ||
                    member.role === selectedRole;


                const matchesStatus =
                    selectedStatus === "all"
                    ||
                    member.status === selectedStatus;


                return (
                    matchesSearch
                    &&
                    matchesRole
                    &&
                    matchesStatus
                );

            }
        );


    staffTableBody.innerHTML = "";


    /* EMPTY STATE */

    if (
        filteredStaff.length === 0
    ) {

        if (emptyState) {
            emptyState.style.display =
                "block";
        }

        return;

    }


    if (emptyState) {
        emptyState.style.display =
            "none";
    }



    /* CREATE ROWS */

    filteredStaff.forEach(
        member => {

            const row =
                document.createElement("tr");


            const statusName =
                capitalize(
                    member.status
                );


            const roleName =
                capitalize(
                    member.role
                );


            row.innerHTML = `

                <td>

                    <div class="staff-cell">

                        <div class="staff-avatar">
                            ${escapeHTML(
                                getInitials(
                                    member.name
                                )
                            )}
                        </div>

                        <div>

                            <strong>
                                ${escapeHTML(
                                    member.name
                                )}
                            </strong>

                            <span>
                                ${escapeHTML(
                                    roleName
                                )}
                            </span>

                        </div>

                    </div>

                </td>


                <td>

                    <strong>
                        ${escapeHTML(
                            member.id
                        )}
                    </strong>

                </td>


                <td>

                    <div class="contact-cell">

                        <strong>
                            ${escapeHTML(
                                member.email
                            )}
                        </strong>

                        <span>
                            ${escapeHTML(
                                member.phone
                            )}
                        </span>

                    </div>

                </td>


                <td>
                    ${escapeHTML(
                        member.department
                    )}
                </td>


                <td>

                    <span
                        class="status ${escapeHTML(
                            member.status
                        )}"
                    >
                        ${escapeHTML(
                            statusName
                        )}
                    </span>

                </td>


                <td>

                    ${escapeHTML(
                        member.lastActive ||
                        "Never"
                    )}

                </td>


                <td>

                    <button
                        class="action-button"
                        type="button"
                        onclick="openActionMenu(
                            event,
                            '${escapeHTML(member.id)}'
                        )"
                    >
                        •••
                    </button>

                </td>

            `;


            staffTableBody.appendChild(
                row
            );

        }
    );

}



/* ========================================
   ACTION MENU
======================================== */

function openActionMenu(
    event,
    staffId
) {

    event.stopPropagation();


    closeActionMenus();


    const button =
        event.currentTarget;


    const row =
        button.closest("tr");


    if (!row) {
        return;
    }


    const menu =
        document.createElement("div");


    menu.className =
        "action-menu";


    menu.innerHTML = `

        <button
            type="button"
            onclick="viewStaff('${staffId}')"
        >
            View Profile
        </button>

        <button
            type="button"
            onclick="editStaff('${staffId}')"
        >
            Edit Staff
        </button>

        <button
            type="button"
            class="danger"
            onclick="deactivateStaff('${staffId}')"
        >
            Deactivate
        </button>

    `;


    row.style.position =
        "relative";


    row.appendChild(menu);

}



/* ========================================
   CLOSE ACTION MENUS
======================================== */

function closeActionMenus() {

    document
        .querySelectorAll(".action-menu")
        .forEach(
            menu => menu.remove()
        );

}


document.addEventListener(
    "click",
    closeActionMenus
);



/* ========================================
   VIEW STAFF
======================================== */

function viewStaff(staffId) {

    const member =
        staff.find(
            item =>
                item.id === staffId
        );


    if (!member) {

        alert(
            "Staff member could not be found."
        );

        return;

    }


    closeActionMenus();


    alert(

        "STAFF PROFILE\n\n"

        + "Name: "
        + member.name

        + "\n\nStaff ID: "
        + member.id

        + "\n\nRole: "
        + capitalize(member.role)

        + "\n\nDepartment: "
        + member.department

        + "\n\nEmail: "
        + member.email

        + "\n\nPhone: "
        + member.phone

        + "\n\nStatus: "
        + capitalize(member.status)

        + "\n\nLast Active: "
        + (
            member.lastActive ||
            "Never"
        )

    );

}



/* ========================================
   OPEN ADD STAFF MODAL
======================================== */

function openAddStaffModal() {

    if (!staffModal || !staffForm) {
        return;
    }


    staffForm.dataset.editing =
        "false";

    staffForm.dataset.staffId =
        "";


    staffForm.reset();


    const modalTitle =
        document.getElementById(
            "modalTitle"
        );

    const modalDescription =
        document.getElementById(
            "modalDescription"
        );

    const submitButton =
        document.getElementById(
            "submitStaff"
        );


    if (modalTitle) {

        modalTitle.textContent =
            "Add New Staff";

    }


    if (modalDescription) {

        modalDescription.textContent =
            "Create a new staff account.";

    }


    if (submitButton) {

        submitButton.textContent =
            "Create Staff";

    }


    staffModal.classList.add(
        "show"
    );

}



/* ========================================
   ADD BUTTON
======================================== */

const addStaffButton =
    document.getElementById(
        "addStaffButton"
    );


if (addStaffButton) {

    addStaffButton.addEventListener(
        "click",
        openAddStaffModal
    );

}



/* ========================================
   EDIT STAFF
======================================== */

function editStaff(staffId) {

    const member =
        staff.find(
            item =>
                item.id === staffId
        );


    if (!member) {
        return;
    }


    closeActionMenus();


    const name =
        document.getElementById(
            "staffName"
        );

    const role =
        document.getElementById(
            "staffRole"
        );

    const department =
        document.getElementById(
            "staffDepartment"
        );

    const phone =
        document.getElementById(
            "staffPhone"
        );

    const email =
        document.getElementById(
            "staffEmail"
        );

    const status =
        document.getElementById(
            "staffStatus"
        );


    if (name) {
        name.value =
            member.name || "";
    }

    if (role) {
        role.value =
            member.role || "";
    }

    if (department) {
        department.value =
            member.department || "";
    }

    if (phone) {
        phone.value =
            member.phone || "";
    }

    if (email) {
        email.value =
            member.email || "";
    }

    if (status) {
        status.value =
            member.status || "active";
    }


    staffForm.dataset.editing =
        "true";

    staffForm.dataset.staffId =
        staffId;


    const modalTitle =
        document.getElementById(
            "modalTitle"
        );

    const modalDescription =
        document.getElementById(
            "modalDescription"
        );

    const submitButton =
        document.getElementById(
            "submitStaff"
        );


    if (modalTitle) {

        modalTitle.textContent =
            "Edit Staff";

    }


    if (modalDescription) {

        modalDescription.textContent =
            "Update this staff member's information.";

    }


    if (submitButton) {

        submitButton.textContent =
            "Save Changes";

    }


    staffModal.classList.add(
        "show"
    );

}



/* ========================================
   DEACTIVATE STAFF
======================================== */

function deactivateStaff(staffId) {

    const member =
        staff.find(
            item =>
                item.id === staffId
        );


    if (!member) {
        return;
    }


    closeActionMenus();


    if (
        member.status === "inactive"
    ) {

        alert(
            member.name
            + " is already inactive."
        );

        return;

    }


    const confirmed =
        confirm(
            "Are you sure you want to deactivate "
            + member.name
            + "?"
        );


    if (!confirmed) {
        return;
    }


    member.status =
        "inactive";


    updateStatistics();

    displayStaff();


    alert(
        member.name
        + " has been deactivated."
    );

}



/* ========================================
   FORM SUBMIT
======================================== */

if (staffForm) {

    staffForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const name =
                document.getElementById(
                    "staffName"
                ).value.trim();


            const role =
                document.getElementById(
                    "staffRole"
                ).value;


            const department =
                document.getElementById(
                    "staffDepartment"
                ).value;


            const phone =
                document.getElementById(
                    "staffPhone"
                ).value.trim();


            const email =
                document.getElementById(
                    "staffEmail"
                ).value.trim();


            const status =
                document.getElementById(
                    "staffStatus"
                ).value;


            const editing =
                staffForm.dataset.editing ===
                "true";



            /* =================================
               EDIT EXISTING STAFF
            ================================= */

            if (editing) {

                const staffId =
                    staffForm.dataset.staffId;


                const member =
                    staff.find(
                        item =>
                            item.id === staffId
                    );


                if (!member) {

                    alert(
                        "Staff member could not be found."
                    );

                    return;

                }


                member.name =
                    name;

                member.role =
                    role;

                member.department =
                    department;

                member.phone =
                    phone;

                member.email =
                    email;

                member.status =
                    status;


                updateStatistics();

                displayStaff();

                closeStaffModal();


                alert(
                    name
                    + " has been updated successfully!"
                );


                return;

            }



            /* =================================
               CREATE NEW STAFF
            ================================= */

            const newId =
                generateStaffId();


            const newStaff = {

                id:
                    newId,

                name:
                    name,

                role:
                    role,

                department:
                    department,

                phone:
                    phone,

                email:
                    email,

                status:
                    status,

                lastActive:
                    "Just now"

            };


            staff.unshift(
                newStaff
            );


            updateStatistics();

            displayStaff();

            closeStaffModal();


            alert(
                name
                + " has been added successfully!"
            );

        }
    );

}



/* ========================================
   GENERATE STAFF ID
======================================== */

function generateStaffId() {

    let highestNumber = 0;


    staff.forEach(
        member => {

            const match =
                String(
                    member.id || ""
                ).match(
                    /(\d+)$/
                );


            if (match) {

                const number =
                    Number(
                        match[1]
                    );


                if (
                    number >
                    highestNumber
                ) {

                    highestNumber =
                        number;

                }

            }

        }
    );


    return (
        "ST-"
        + String(
            highestNumber + 1
        ).padStart(
            4,
            "0"
        )
    );

}



/* ========================================
   CLOSE STAFF MODAL
======================================== */

function closeStaffModal() {

    if (!staffModal) {
        return;
    }


    staffModal.classList.remove(
        "show"
    );


    if (staffForm) {

        staffForm.reset();

        staffForm.dataset.editing =
            "false";

        staffForm.dataset.staffId =
            "";

    }

}



/* ========================================
   CLOSE BUTTON
======================================== */

const closeModal =
    document.getElementById(
        "closeModal"
    );


if (closeModal) {

    closeModal.addEventListener(
        "click",
        closeStaffModal
    );

}



/* ========================================
   CANCEL BUTTON
======================================== */

const cancelModal =
    document.getElementById(
        "cancelModal"
    );


if (cancelModal) {

    cancelModal.addEventListener(
        "click",
        closeStaffModal
    );

}



/* ========================================
   CLOSE WHEN CLICKING OVERLAY
======================================== */

if (staffModal) {

    staffModal.addEventListener(
        "click",
        function(event) {

            if (
                event.target ===
                staffModal
            ) {

                closeStaffModal();

            }

        }
    );

}



/* ========================================
   SEARCH
======================================== */

if (searchInput) {

    searchInput.addEventListener(
        "input",
        displayStaff
    );

}



/* ========================================
   ROLE FILTER
======================================== */

if (roleFilter) {

    roleFilter.addEventListener(
        "change",
        displayStaff
    );

}



/* ========================================
   STATUS FILTER
======================================== */

if (statusFilter) {

    statusFilter.addEventListener(
        "change",
        displayStaff
    );

}



/* ========================================
   LOGOUT
======================================== */

function logout() {

    window.location.href =
        "../index.html";

}



/* ========================================
   INITIALIZE
======================================== */

updateStatistics();

displayStaff();