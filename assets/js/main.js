const notificationComponent = document.getElementById('notificationsComponent')
const leaveDetailsComponent = document.getElementById('leaveDetailsComponent')
const topBarComponent = document.getElementById('topBar')
const notificationIcon = document.getElementById('notificationButton')
const leaveDetailCloseIcon = document.getElementById('leaveDetailCloseIcon')
const toggleLeaveDetailsIcon = document.getElementById('toggleLeaveDetails')
const modalMessageElement = document.getElementById('modalMessage')

notificationIcon.addEventListener('click', () => {
    if (notificationComponent.style.display === 'none') {
        notificationComponent.style.display = 'block'
    }
    else {
        notificationComponent.style.display = 'none'
    }

})

leaveDetailCloseIcon.addEventListener('click', () => {
    if (leaveDetailsComponent.style.display === 'none') {
        leaveDetailsComponent.style.display = 'block'
    }
    else {
        leaveDetailsComponent.style.display = 'none'
    }
    document.getElementById('normalView').style.display = ''
    document.getElementById('leaveDetailsNestedView').style.display = 'none'
    window.scrollTo({ top: 0, behavior: 'smooth' });
})
const listItems = document.querySelectorAll('#daysList li');

// Add a click event listener to each <li>
listItems.forEach(item => {
    item.addEventListener('click', function () {
        // Remove 'active' class from all <li> elements
        listItems.forEach(li => li.classList.remove('active-day'));

        // Add 'active' class to the clicked <li> element
        this.classList.add('active-day');
    });
});


const circularProgress = document.querySelectorAll(".circular-progress");

Array.from(circularProgress).forEach((progressBar) => {
    const progressValue = progressBar.querySelector(".percentage");
    const innerCircle = progressBar.querySelector(".inner-circle");
    let startValue = 0,
        endValue = Number(progressBar.getAttribute("data-percentage")),
        speed = 10,
        progressColor = progressBar.getAttribute("data-progress-color");

    const progress = setInterval(() => {
        startValue++;
        progressValue.textContent = `${startValue}%`;
        progressValue.style.color = `${progressColor}`;

        innerCircle.style.backgroundColor = `${progressBar.getAttribute(
            "data-inner-circle-color"
        )}`;

        progressBar.style.background = `conic-gradient(${progressColor} ${startValue * 3.6
            }deg,${progressBar.getAttribute("data-bg-color")} 0deg)`;
        if (startValue === endValue) {
            clearInterval(progress);
        }
    }, speed);
});

const approveToastNotification = document.getElementById('approveToastNotification');
const rejectToastNotification = document.getElementById('rejectToastNotification');

const closeNotificationButton = document.getElementById("closeNotification");
const closeRejectNotificationButton = document.getElementById("closeRejectNotification");

closeNotificationButton.addEventListener("click", () => {
    approveToastNotification.style.display = "none";
})
closeRejectNotificationButton.addEventListener("click", () => {
    rejectToastNotification.style.display = "none";
})


const leaveRequestData = [
    {
        id: 1,
        userImage: '/assets/img/avatars/Mark.svg',
        name: 'Mark Jacobs',
        period: [
            '31 Mar, 2023 09:00 AM', '31 Mar, 2023 18:00 PM'
        ],
        days: '1.0',
        leave_type: 'Annual Leave',
        status: 'pending',
    },
    {
        id: 2,
        userImage: '/assets/img/avatars/Charlie.svg',
        name: 'Charlie Kristen',
        period: [
            '10 Apr, 2023 09:00 AM', '11 Apr, 2023 18:00 PM'
        ],
        days: '2.0',
        leave_type: 'Annual Leave',
        status: 'pending',
    },
    {
        id: 3,
        userImage: '/assets/img/avatars/Nur.svg',
        name: 'Nur Fariha binti Maslan',
        period: [
            '21 Apr, 2023 09:00 AM', '24 Apr, 2023 18:00 PM'
        ],
        days: '2.0',
        leave_type: 'Hospital Leave',
        status: 'pending',
    },
    {
        id: 4,
        userImage: '/assets/img/avatars/Nishant.svg',
        name: 'Nishant Talwar',
        period: [
            '31 Mar, 2023 09:00 AM', '31 Mar, 2023 18:00 PM'
        ],
        days: '1.0',
        leave_type: 'Annual Leave',
        status: 'approved',
    },
    {
        id: 5,
        userImage: '/assets/img/avatars/Simon.svg',
        name: 'Simon Minter',
        period: [
            '10 Apr, 2023 09:00 AM', '11 Apr, 2023 18:00 PM'
        ],
        days: '2.0',
        leave_type: 'Annual Leave',
        status: 'rejected',
    },
]


// const filterIcon = document



const notificationMessage = document.getElementById('notificationMessage');
const notificationRejectMessage = document.getElementById('notificationRejectMessage');
const progressBar = document.querySelector('.progress-bar .progress');
const rejectProgressBar = document.querySelector('.reject-progress-bar .reject-progress');

function showApproveToast(message) {
    notificationMessage.textContent = message;
    approveToastNotification.style.display = 'block';

    progressBar.style.transition = 'none';
    progressBar.style.width = '100%';
    progressBar.offsetHeight;

    setTimeout(() => {
        progressBar.style.transition = 'width 5s linear';
        progressBar.style.width = '0%';
    }, 10);

    setTimeout(() => {
        approveToastNotification.style.display = 'none';
        progressBar.style.transition = 'none';
    }, 5000);
}
function showRejectToast(message) {
    console.log({ rejMsg: message })
    notificationRejectMessage.textContent = message;
    rejectToastNotification.style.display = 'block';

    rejectProgressBar.style.transition = 'none';
    rejectProgressBar.style.width = '100%';
    rejectProgressBar.offsetHeight;

    setTimeout(() => {
        rejectProgressBar.style.transition = 'width 5s linear';
        rejectProgressBar.style.width = '0%';
    }, 10);

    setTimeout(() => {
        rejectToastNotification.style.display = 'none';
        rejectProgressBar.style.transition = 'none';
    }, 5000);
}
// Get the table body element
const leaveRequestTableBody = document.getElementById('leaveRequestTableBody');

// Loop through the data
leaveRequestData.forEach((leave) => {
    // Create a new table row element
    const div = document.createElement('div');
    div.className = 'table-body-row-div';

    // Determine the row content based on the status
    if (leave.status === 'pending') {
        // Assign a dynamic ID to the approve button using the leave request's ID
        const approveButtonId = `approveBtn-${leave.id}`;
        const rejectButtonId = `rejectBtn-${leave.id}`;
        const toggleIconId = `toggleLeaveDetails-${leave.id}`; // Assign unique ID to the icon
        const checkBoxId = `checkBox-${leave.id}`; // Assign unique ID to the icon
        div.innerHTML = `
            <div class="table-col-div check-col-div pending-request">
                <input id="${checkBoxId}" type="checkbox" class="custom-checkbox" />
            </div>
            <div class="table-col-div name-col-div">
                <img src="${leave.userImage}" />
                <label class="user-name">${leave.name}</label>
            </div>
            <div class="table-col-div period-col-div">
                <span class="period-col-span">
                    <label>${leave.period[0]}</label>
                    <label>${leave.period[1]}</label>
                </span>
            </div>
            <div class="table-col-div days-col-div">
                <label>${leave.days}</label>
            </div>
            <div class="table-col-div leave-col-div">
                <label>${leave.leave_type}</label>
            </div>
            <div class="table-col-div actions-col-div">
                <span class="actions-col-span">
                    <span class="buttons-span">
                        <button class="reject" id="${rejectButtonId}">REJECT</button>
                        <button class="approve" id="${approveButtonId}">APPROVE</button>
                    </span>
                    <img src="/assets/img/RightIcon.svg" style="cursor:pointer;" id="toggleLeaveDetails-${leave.id}" />
                </span>
            </div>
        `;

        // Append the row to the table body
        leaveRequestTableBody.appendChild(div);

        // Add click event listener to the approve button
        document.getElementById(rejectButtonId).addEventListener('click', () => {
            openModal(`Are you sure want to reject ${leave.name} ${leave.leave_type} for ${leave.days} day(s)`, () => {
                leave.status = 'rejected';
                const approveButton = document.getElementById(approveButtonId);
                const rejectButton = document.getElementById(rejectButtonId);
                rejectButton.textContent = 'REJECTED';
                const buttonsSpan = rejectButton.closest('.buttons-span');
                approveButton.remove();
                buttonsSpan.classList.remove('buttons-span');
                buttonsSpan.classList.add('rejected-buttons-span');
                const checkColTd = div.querySelector('.check-col-div');
                checkColTd.classList.remove('pending-request');
                checkColTd.classList.add('rejected-request');
                showRejectToast(`${leave.name} ${leave.leave_type} Rejected!.`);
            })
        })
        document.getElementById(approveButtonId).addEventListener('click', () => {
            openModal(`Are you sure want to approve ${leave.name} ${leave.leave_type} for ${leave.days} day(s)`, () => {
                // I want tbelow code must run when I click on YES Modal button
                leave.status = 'approved';
                const approveButton = document.getElementById(approveButtonId);
                approveButton.textContent = 'APPROVED';
                const buttonsSpan = approveButton.closest('.buttons-span');
                const rejectButton = buttonsSpan.querySelector('.reject');
                rejectButton.remove();
                buttonsSpan.classList.remove('buttons-span');
                buttonsSpan.classList.add('approved-buttons-span');
                const checkColTd = div.querySelector('.check-col-div');
                checkColTd.classList.remove('pending-request');
                checkColTd.classList.add('approved-request');
                showApproveToast(`${leave.name} ${leave.leave_type} Approved!.`);

            })


        });
        document.getElementById(toggleIconId).addEventListener('click', () => {
            if (leaveDetailsComponent.style.display === 'none') {
                leaveDetailsComponent.style.display = 'block';
            } else {
                leaveDetailsComponent.style.display = 'none';
            }
            if (document.getElementById('normalView').style.display === '') {
                document.getElementById('normalView').style.display = 'none'
                document.getElementById('leaveDetailsNestedView').style.display = ''
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    } else if (leave.status === 'approved') {
        div.innerHTML = `
            <div class="table-col-div check-col-div approved-request">
                <input type="checkbox" disabled class="custom-checkbox disabled" />
            </div>
            <div class="table-col-div name-col-div">
                <img src="${leave.userImage}" />
                <label class="user-name">${leave.name}</label>
            </div>
            <div class="table-col-div period-col-div">
                <span class="period-col-span">
                    <label>${leave.period[0]}</label>
                    <label>${leave.period[1]}</label>
                </span>
            </div>
            <div class="table-col-div days-col-div">
                <label>${leave.days}</label>
            </div>
            <div class="table-col-div leave-col-div">
                <label>${leave.leave_type}</label>
            </div>
            <div class="table-col-div actions-col-div">
                <span class="actions-col-span">
                    <span class="approved-buttons-span">
                        <button class="approve">APPROVED</button>
                    </span>
                    <img src="/assets/img/RightIcon.svg" style="cursor:pointer;" />
                </span>
            </div>
        `;

        // Append the row to the table body
        leaveRequestTableBody.appendChild(div);
    } else {
        div.innerHTML = `
            <div class="table-col-div check-col-div rejected-request">
                <input type="checkbox" disabled class="custom-checkbox disabled" />
            </div>
            <div class="table-col-div name-col-div">
                <img src="${leave.userImage}" />
                <label class="user-name">${leave.name}</label>
            </div>
            <div class="table-col-div period-col-div">
                <span class="period-col-span">
                    <label>${leave.period[0]}</label>
                    <label>${leave.period[1]}</label>
                </span>
            </div>
            <div class="table-col-div days-col-div">
                <label>${leave.days}</label>
            </div>
            <div class="table-col-div leave-col-div">
                <label>${leave.leave_type}</label>
            </div>
            <div class="table-col-div actions-col-div">
                <span class="actions-col-span">
                    <span class="rejected-buttons-span">
                        <button class="reject">REJECTED</button>
                    </span>
                    <img src="/assets/img/RightIcon.svg" style="cursor:pointer;" />
                </span>
            </div>
        `;

        // Append the row to the table body
        leaveRequestTableBody.appendChild(div);
    }
});

const leaveDaysTableComponent = document.getElementById('leaveDaysTableComponent');
const toggleTableLabel = document.getElementById('toggleTableLabel');

toggleTableLabel.addEventListener('click', () => {
    if (leaveDaysTableComponent.style['max-height'] === '100px') {
        leaveDaysTableComponent.style.maxHeight = '200px'
    }
    else {
        leaveDaysTableComponent.style.maxHeight = '100px'
    }
});


// Get the modal elements
const modalOverlay = document.getElementById('modalOverlay');
const closeModalButton = document.getElementById('closeModalBtn');
const closeModalButton1 = document.getElementById('closeModalBtn1');
const openModalButton = document.getElementById('openModalBtn');


let pendingApprovalAction = null
// Function to open the modal with transition and disable background scroll
function openModal(message, callBackAction) {
    modalMessageElement.innerHTML = message
    modalOverlay.classList.add('show');
    document.body.style.overflow = 'hidden'; // Disable scrolling on background
    leaveDetailsComponent.style.overflow = 'hidden'; // Disable scrolling on background
    document.querySelector('.page-content').style.filter = 'blur(5px)';
    topBarComponent.style.filter = 'blur(5px)';
    pendingApprovalAction = callBackAction

}

// Function to close the modal and enable background scroll
function closeModal() {
    topBarComponent.style.filter = '';
    modalOverlay.classList.remove('show');
    document.body.style.overflow = ''; // Re-enable scrolling on background
    leaveDetailsComponent.style.overflow = 'auto';
    document.querySelector('.page-content').style.filter = 'none';
}

// Event listener for YES button in the modal
document.getElementById('yesModalBtn').addEventListener('click', () => {
    if (pendingApprovalAction) {
        pendingApprovalAction(); // Execute the stored action
    }
    closeModal(); // Close the modal after the action
});

// Event listeners for opening and closing the modal
openModalButton.addEventListener('click', openModal);
closeModalButton.addEventListener('click', closeModal);
closeModalButton1.addEventListener('click', () => {
    closeModal()
});

// Optionally close the modal when clicking outside of it
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        closeModal();
    }
});
const paginationNextBtn = document.getElementById('nextBtn');
const paginationPrevBtn = document.getElementById('prevBtn');
const paginationStartRecordItem = document.getElementById('startRecordItem');
const paginationEndRecordItem = document.getElementById('endRecordItem');
let startRecordItem = 1;
let endRecordItem = 25;
const totalRecords = 227;
const recordsPerPage = 25;

// Update the pagination UI
const updatePagination = () => {
    paginationStartRecordItem.innerHTML = startRecordItem;
    paginationEndRecordItem.innerHTML = endRecordItem;

    // Disable the Next button if we reach or exceed totalRecords
    if (endRecordItem >= totalRecords) {
        paginationNextBtn.classList.add('disabled');
        endRecordItem = totalRecords; // Ensure it doesn't go beyond totalRecords
    } else {
        paginationNextBtn.classList.remove('disabled');
    }

    // Disable the Previous button if we're at the first page
    if (startRecordItem > 1) {
        paginationPrevBtn.classList.remove('disabled');
    } else {
        paginationPrevBtn.classList.add('disabled');
    }
};

// Next button event listener
paginationNextBtn.addEventListener('click', () => {
    if (endRecordItem < totalRecords) {
        startRecordItem += recordsPerPage;
        endRecordItem += recordsPerPage;

        // Ensure endRecordItem doesn't exceed totalRecords
        if (endRecordItem > totalRecords) {
            endRecordItem = totalRecords;
            // Ensure startRecordItem aligns with full pages if we are on the last page
            startRecordItem = totalRecords - (totalRecords % recordsPerPage) + 1;
        }
    }
    updatePagination();
});

// Previous button event listener
paginationPrevBtn.addEventListener('click', () => {
    if (startRecordItem > 1) {
        startRecordItem -= recordsPerPage;
        endRecordItem = startRecordItem + recordsPerPage - 1;

        // Ensure startRecordItem doesn't go below 1
        if (startRecordItem < 1) {
            startRecordItem = 1;
        }
    }
    updatePagination();
});

// Initialize pagination state on load
updatePagination();


// Get the elements to manipulate
const tableHeaderCheckbox = document.getElementById('tableHeaderCheckbox');
const totalCheckedRequests = document.getElementById('totalCheckedRequests');
const leaveRequestsComponent = document.getElementById('leaveRequestsComponent');
const totalCount = document.getElementById('totalCount');

// Function to check/uncheck all checkboxes
function toggleAllCheckboxes(state) {
    const checkboxes = document.querySelectorAll('input[type="checkbox"][id*="checkBox-"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = state;
    });
    // Log the number of checked checkboxes
    logCheckedCount();
    updateElementStyles();
}

// Function to count checked checkboxes
function countCheckedCheckboxes() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"][id*="checkBox-"]');
    return Array.from(checkboxes).filter(checkbox => checkbox.checked).length;
}

// Function to log the number of checked checkboxes
function logCheckedCount() {
    const checkedCount = countCheckedCheckboxes();
    console.log(`Number of checked checkboxes: ${checkedCount}`);
    return checkedCount; // Return the count to use in updating the element
}

// Function to update the styles of totalCheckedRequests and leaveRequestsComponent
function updateElementStyles() {
    const checkedCount = logCheckedCount(); // Get the checked count

    // Update the inner HTML of totalCount with the checked count
    totalCount.innerHTML = checkedCount;

    if (checkedCount > 0) {
        totalCheckedRequests.style.display = ''; // Show the element
        leaveRequestsComponent.style.marginBottom = '100px'; // Set margin bottom
    } else {
        totalCheckedRequests.style.display = 'none'; // Hide the element
        leaveRequestsComponent.style.marginBottom = '0'; // Remove margin bottom
    }
}

// Function to reset everything to its original state
function resetState() {
    tableHeaderCheckbox.checked = false;
    const individualCheckboxes = document.querySelectorAll('input[type="checkbox"][id*="checkBox-"]');
    individualCheckboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
    totalCheckedRequests.style.display = 'none';
    leaveRequestsComponent.style.marginBottom = '0';
    totalCount.innerHTML = '0';
}

// Add event listener to the main checkbox
tableHeaderCheckbox.addEventListener('change', function () {
    toggleAllCheckboxes(tableHeaderCheckbox.checked);
    // Also log the count and update the styles after toggling all checkboxes
    updateElementStyles();
});

// Add event listeners to individual checkboxes
const individualCheckboxes = document.querySelectorAll('input[type="checkbox"][id*="checkBox-"]');
individualCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function () {
        // Check if all individual checkboxes are checked
        const allChecked = Array.from(individualCheckboxes).every(cb => cb.checked);

        // If all are checked, check the main checkbox
        // Otherwise, uncheck it
        tableHeaderCheckbox.checked = allChecked;

        // Log the number of checked checkboxes and update the styles
        updateElementStyles();
    });
});

// Add event listeners to all elements with the class closeTotalCheckRequest
const closeButtons = document.querySelectorAll('.closeTotalCheckRequest');
const closeButton1 = document.getElementById('rejectTotalCheckRequest');
const closeButton2 = document.getElementById('approveeTotalCheckRequest');
// closeButtons.forEach(button => {
//     button.addEventListener('click', function () {
//         resetState();
//     });
// });
closeButton1.addEventListener('click', () => {
    resetState();
})
closeButton2.addEventListener('click', () => {
    resetState();
})