const notifications = document.querySelector(".notifications");
const buttons = document.querySelectorAll(".buttons .btn");

const toastDetails = {
    timer: 5000,
    success: {
        icon: "fa-circle-check",
    },
    error: {
        icon: "fa-circle-xmark",
    },
    warning: {
        icon: "fa-circle-exclamation",
    },
    info: {
        icon: "fa-circle-info",
    }
}

const removeToast = (toast) => {
    toast.classList.add("hide");
    if(toast.timeoutId) clearTimeout(toast.timeoutId);
    setTimeout(() => toast.remove(), 500);
}

const createToast = (id, message) => {
    const {icon} = toastDetails[id];
    const toast = document.createElement("li");
    toast.className = `toast ${id}`;
    toast.innerHTML = `
        <div class="column">
            <i class="fa-solid ${icon}"></i>
            <span>${message}</span>
        </div>
        <i class="fa-solid fa-xmark" onclick="removeToast(this.parentNode)"></i>
    `;
    notifications.appendChild(toast);

    toast.timeoutId = setTimeout(() => removeToast(toast), toastDetails.timer)
}

const notifySucess = (message) => createToast("success", message);
const notifyError= (message) => createToast("error", message);
const notifyInfo= (message) => createToast("info", message);
const notifyWarning= (message) => createToast("warning", message);

buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
        createToast(btn.id);
    });
})


