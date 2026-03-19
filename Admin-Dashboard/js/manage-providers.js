/**
 * manage-providers.js
 * Handles the interactive UI logic for the Provider Management page.
 * Includes SweetAlert interactions for deleting and changing application status.
 */

/**
 * ----------------------------------------------------
 * SECTION 1: Admin Added Providers (Edit / Delete)
 * ----------------------------------------------------
 */

/**
 * Navigates the admin to the add-provider form to edit the given provider.
 * @param {string} providerId - The unique ID of the provider.
 */
function editAdminProvider(providerId) {
    // Navigate to the form page (assuming query params or session handles the load)
    window.location.href = `add-provider.html?edit=${providerId}`;
}

/**
 * Triggers a SweetAlert confirmation before deleting a provider.
 * Removes the row from the DOM if confirmed.
 * @param {string} providerName - The display name of the provider.
 * @param {HTMLElement} btnElement - The button element that triggered the action.
 */
function confirmDeleteProvider(providerName, btnElement) {
    Swal.fire({
        title: 'Delete Provider?',
        text: `Are you sure you want to remove "${providerName}"? This action cannot be undone.`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        customClass: {
            confirmButton: 'btn btn-error text-white ml-2',
            cancelButton: 'btn btn-ghost'
        },
        buttonsStyling: false,
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            const row = btnElement.closest('tr');
            if (row) {
                row.remove();
            }

            Swal.fire({
                title: 'Deleted!',
                text: `"${providerName}" has been removed.`,
                icon: 'success',
                customClass: { confirmButton: 'btn btn-primary text-white' },
                buttonsStyling: false
            });
        }
    });
}

/**
 * ----------------------------------------------------
 * SECTION 2: Applied Providers (Change Status / View Reason)
 * ----------------------------------------------------
 */

/**
 * Triggers a SweetAlert modal to change the verification status of an applicant.
 */
function changeProviderStatus(badgeId, providerName) {
    const badgeElement = document.getElementById(badgeId);
    if (!badgeElement) return;

    const currentReason = badgeElement.getAttribute('data-reason') || '';
    
    Swal.fire({
        title: `Update Status:<br><span class="text-lg font-normal text-gray-500">${providerName}</span>`,
        html: `
            <div class="text-left mt-4">
                <label class="label"><span class="label-text font-bold uppercase tracking-wider text-xs opacity-60">Select Status</span></label>
                <select id="swal-status-select" class="select select-bordered w-full focus:outline-primary">
                    <option value="Under Review">Under Review</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Need More Info">Need More Info</option>
                </select>
                
                <label class="label mt-4"><span class="label-text font-bold uppercase tracking-wider text-xs opacity-60">Reason (Required)</span></label>
                <textarea id="swal-reason-input" class="textarea textarea-bordered w-full h-24 focus:outline-primary" placeholder="Briefly explain the status update...">${currentReason}</textarea>
            </div>
        `,
        showCancelButton: true,
        confirmButtonText: 'Save Update',
        customClass: {
            confirmButton: 'btn btn-primary text-white ml-2',
            cancelButton: 'btn btn-ghost'
        },
        buttonsStyling: false,
        reverseButtons: true,
        preConfirm: () => {
            const newStatus = document.getElementById('swal-status-select').value;
            const newReason = document.getElementById('swal-reason-input').value.trim();

            if (!newReason) {
                Swal.showValidationMessage('A reason is required to update the status.');
                return false;
            }

            return { status: newStatus, reason: newReason };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const data = result.value;
            badgeElement.setAttribute('data-reason', data.reason);
            badgeElement.innerText = data.status;
            
            badgeElement.classList.remove('bg-warning', 'text-warning-content', 'bg-success', 'text-white', 'bg-error', 'bg-info', 'text-info-content');
            
            if (data.status === 'Approved') {
                badgeElement.classList.add('bg-success', 'text-white');
            } else if (data.status === 'Rejected') {
                badgeElement.classList.add('bg-error', 'text-white');
            } else if (data.status === 'Need More Info') {
                badgeElement.classList.add('bg-info', 'text-info-content');
            } else {
                badgeElement.classList.add('bg-warning', 'text-warning-content');
            }

            Swal.fire({
                title: 'Updated!',
                text: `Status for ${providerName} is now ${data.status}.`,
                icon: 'success',
                timer: 2000,
                showConfirmButton: false
            });
        }
    });
}

/**
 * Triggers a SweetAlert modal to display the reason provided for the current status.
 */
function viewStatusReason(badgeElement) {
    const status = badgeElement.innerText;
    const reason = badgeElement.getAttribute('data-reason') || 'No reason provided.';

    Swal.fire({
        title: `Status: ${status}`,
        text: reason,
        icon: 'info',
        confirmButtonText: 'Close',
        customClass: { confirmButton: 'btn btn-primary text-white' },
        buttonsStyling: false
    });
}
