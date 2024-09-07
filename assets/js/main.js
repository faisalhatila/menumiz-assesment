// DOM elements used for toggling visibility of components and notifications
const notificationComponent = document.getElementById('notificationsComponent')
const leaveDetailsComponent = document.getElementById('leaveDetailsComponent')
const topBarComponent = document.getElementById('topBar')
const notificationIcon = document.getElementById('notificationButton')
const leaveDetailCloseIcon = document.getElementById('leaveDetailCloseIcon')
const toggleLeaveDetailsIcon = document.getElementById('toggleLeaveDetails')
const modalMessageElement = document.getElementById('modalMessage')

// Toggles the display of the notifications component
notificationIcon.addEventListener('click', () => {
    if (notificationComponent.style.display === 'none') {
        notificationComponent.style.display = 'block' // Show notifications
    } else {
        notificationComponent.style.display = 'none' // Hide notifications
    }
})

// Toggles the display of the leave details component
leaveDetailCloseIcon.addEventListener('click', () => {
    if (leaveDetailsComponent.style.display === 'none') {
        leaveDetailsComponent.style.display = 'block' // Show leave details
    } else {
        leaveDetailsComponent.style.display = 'none' // Hide leave details
    }
})

// Handling the click on list items, making the clicked item active
const listItems = document.querySelectorAll('#daysList li');

listItems.forEach(item => {
    item.addEventListener('click', function () {
        // Remove 'active-day' class from all items
        listItems.forEach(li => li.classList.remove('active-day'));
        this.classList.add('active-day'); // Set the clicked item as active
    });
});

// Handling circular progress bars with dynamic percentage
const circularProgress = document.querySelectorAll(".circular-progress");

Array.from(circularProgress).forEach((progressBar) => {
    const progressValue = progressBar.querySelector(".percentage");
    const innerCircle = progressBar.querySelector(".inner-circle");
    let startValue = 0,
        endValue = Number(progressBar.getAttribute("data-percentage")),
        speed = 10,
        progressColor = progressBar.getAttribute("data-progress-color");

    // Interval to animate the progress value from 0 to the given percentage
    const progress = setInterval(() => {
        startValue++;
        progressValue.textContent = `${startValue}%`; // Update progress text
        progressValue.style.color = `${progressColor}`;

        innerCircle.style.backgroundColor = `${progressBar.getAttribute(
            "data-inner-circle-color"
        )}`;

        // Create the circular progress effect using conic-gradient
        progressBar.style.background = `conic-gradient(${progressColor} ${startValue * 3.6
            }deg,${progressBar.getAttribute("data-bg-color")} 0deg)`;

        // Stop the interval when the progress reaches the desired value
        if (startValue === endValue) {
            clearInterval(progress);
        }
    }, speed);
});

// Toast notification elements for approval/rejection messages
const approveToastNotification = document.getElementById('approveToastNotification');
const rejectToastNotification = document.getElementById('rejectToastNotification');

// Close buttons for the toast notifications
const closeNotificationButton = document.getElementById("closeNotification");
const closeRejectNotificationButton = document.getElementById("closeRejectNotification");

// Close the approval notification when the close button is clicked
closeNotificationButton.addEventListener("click", () => {
    approveToastNotification.style.display = "none";
})

// Close the rejection notification when the close button is clicked
closeRejectNotificationButton.addEventListener("click", () => {
    rejectToastNotification.style.display = "none";
})

// Sample leave request data to be rendered in the table
const leaveRequestData = [
    // Leave request objects with id, userImage, name, leave period, days, type, and status
    {
        id: 1,
        userImage: '/assets/img/User2Avatar.png',
        name: 'Mark Jacobs',
        period: ['31 Mar, 2023 09:00 AM', '31 Mar, 2023 18:00 PM'],
        days: '1.0',
        leave_type: 'Annual Leave',
        status: 'pending',
    },
    {
        id: 2,
        userImage: '/assets/img/User1Avatar.svg',
        name: 'Charlie Kristen',
        period: ['10 Apr, 2023 09:00 AM', '11 Apr, 2023 18:00 PM'],
        days: '2.0',
        leave_type: 'Annual Leave',
        status: 'pending',
    },
    // Additional leave request objects...
]

// Elements for displaying the approval/rejection messages and their progress bars
const notificationMessage = document.getElementById('notificationMessage');
const notificationRejectMessage = document.getElementById('notificationRejectMessage');
const progressBar = document.querySelector('.progress-bar .progress');
const rejectProgressBar = document.querySelector('.reject-progress-bar .reject-progress');

// Function to show the approval toast with a message and progress animation
function showApproveToast(message) {
    notificationMessage.textContent = message; // Set the message
    approveToastNotification.style.display = 'block'; // Show the notification

    // Animate the progress bar from 100% to 0%
    progressBar.style.transition = 'none';
    progressBar.style.width = '100%';
    progressBar.offsetHeight;

    setTimeout(() => {
        progressBar.style.transition = 'width 5s linear';
        progressBar.style.width = '0%';
    }, 10);

    setTimeout(() => {
        approveToastNotification.style.display = 'none'; // Hide the notification after 5s
        progressBar.style.transition = 'none'; // Reset progress bar
    }, 5000);
}

// Similar function for showing the rejection toast
function showRejectToast(message) {
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

// Rendering the leave request data in the table
const leaveRequestTableBody = document.getElementById('leaveRequestTableBody');
leaveRequestData.forEach((leave) => {
    const tr = document.createElement('tr');
    tr.className = 'table-body-row';

    // Handle rendering for 'pending' leave requests with approve/reject buttons
    if (leave.status === 'pending') {
        const approveButtonId = `approve-btn-${leave.id}`;
        const rejectButtonId = `reject-btn-${leave.id}`;
        const toggleIconId = `toggleLeaveDetails-${leave.id}`;

        tr.innerHTML = `
            <td class="table-col check-col pending-request">
                <input type="checkbox" />
            </td>
            <td class="table-col name-col">
                <img src="${leave.userImage}" />
                <label class="user-name">${leave.name}</label>
            </td>
            <td class="table-col period-col">
                <span class="period-col-span">
                    <label>${leave.period[0]}</label>
                    <label>${leave.period[1]}</label>
                </span>
            </td>
            <td class="table-col days-col">
                <label>${leave.days}</label>
            </td>
            <td class="table-col leave-col">
                <label>${leave.leave_type}</label>
            </td>
            <td class="table-col actions-col">
                <span class="actions-col-span">
                    <span class="buttons-span">
                        <button class="reject" id="${rejectButtonId}">REJECT</button>
                        <button class="approve" id="${approveButtonId}">APPROVE</button>
                    </span>
                    <img src="/assets/img/RightIcon.svg" id="toggleLeaveDetails-${leave.id}" />
                </span>
            </td>
        `;

        leaveRequestTableBody.appendChild(tr);

        // Add event listeners for the approve and reject buttons
        document.getElementById(rejectButtonId).addEventListener('click', () => {
            openModal(`Are you sure want to reject ${leave.name} ${leave.leave_type} for ${leave.days} day(s)`, () => {
                leave.status = 'rejected';
                // Handle rejection logic here...
                showRejectToast(`${leave.name} ${leave.leave_type} Rejected!.`);
            })
        });

        document.getElementById(approveButtonId).addEventListener('click', () => {
            openModal(`Are you sure want to approve ${leave.name} ${leave.leave_type} for ${leave.days} day(s)`, () => {
                leave.status = 'approved';
                // Handle approval logic here...
                showApproveToast(`${leave.name} ${leave.leave_type} Approved!.`);
            });
        });

        // Toggle leave details component on clicking the icon
        document.getElementById(toggleIconId).addEventListener('click', () => {
            if (leaveDetailsComponent.style.display === 'none') {
                leaveDetailsComponent.style.display = 'block';
            } else {
                leaveDetailsComponent.style.display = 'none';
            }
        });
    }
    // Handle rendering for approved/rejected leave requests...
});

// Toggle the height of the leave days table component on clicking the label
const leaveDaysTableComponent = document.getElementById('leaveDaysTableComponent');
