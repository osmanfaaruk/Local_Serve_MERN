/**
 * ========================================
 * LocalServe Admin - SweetAlert2 Helpers
 * ========================================
 * 
 * All reusable SweetAlert2 popup functions for the admin dashboard.
 * Include this file in any admin page that needs popups:
 *   <script src="js/swal-alerts.js"></script>
 * 
 * Each function accepts:
 *   - itemName: the name of the item (e.g. "GEC Circle")
 *   - type: what kind of item (e.g. "Location", "Category", "Provider")
 *   - onSuccess: callback function that runs after user confirms
 */


// ─── Button Style Config (change once, applies everywhere) ───
const SWAL_BUTTONS = {
    confirm: 'btn btn-primary text-white mx-3',
    cancel: 'btn btn-error text-white mx-3',
    success: 'btn btn-success text-white',
    warning: 'btn btn-warning text-white mx-3',
    delete: 'btn btn-error text-white mx-3',
};


// ─── ADD: Confirm before adding a new item ───
function confirmAdd(inputFieldId, type, onSuccess) {
    const inputField = document.getElementById(inputFieldId);
    const itemName = inputField.value.trim();

    if (!itemName) {
        Swal.fire({
            icon: 'warning',
            title: 'Empty Field!',
            text: `Please enter a ${type.toLowerCase()} name first!`,
            customClass: { confirmButton: SWAL_BUTTONS.confirm },
            buttonsStyling: false
        }).then(() => {
            inputField.focus();
        });
        return;
    }

    Swal.fire({
        title: 'Are you sure?',
        text: `Do you want to add "${itemName}" as a new ${type.toLowerCase()}?`,
        icon: 'question',
        showCancelButton: true,
        customClass: {
            confirmButton: SWAL_BUTTONS.confirm,
            cancelButton: SWAL_BUTTONS.cancel
        },
        buttonsStyling: false,
        confirmButtonText: 'Yes, Add it!',
        cancelButtonText: 'Cancel'
    }).then((result) => {
        if (result.isConfirmed) {
            // Run the success callback (e.g. DOM update, API call)
            if (onSuccess) onSuccess(itemName);

            Swal.fire({
                title: 'Added!',
                text: `${type} "${itemName}" has been added successfully!`,
                icon: 'success',
                customClass: { confirmButton: SWAL_BUTTONS.success },
                buttonsStyling: false
            });
            inputField.value = '';
        }
    });
}


// ─── EDIT: Confirm edit, then show input for new name ───
function confirmEdit(currentName, type, onSuccess) {
    Swal.fire({
        title: `Edit ${type}`,
        text: `Are you sure you want to edit "${currentName}"?`,
        icon: 'question',
        showCancelButton: true,
        customClass: {
            confirmButton: SWAL_BUTTONS.confirm,
            cancelButton: SWAL_BUTTONS.cancel
        },
        buttonsStyling: false,
        confirmButtonText: 'Yes, Edit',
        cancelButtonText: 'Cancel'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Enter New Name',
                input: 'text',
                inputLabel: `Current name: ${currentName}`,
                inputPlaceholder: `Type new ${type.toLowerCase()} name...`,
                inputValue: currentName,
                showCancelButton: true,
                customClass: {
                    confirmButton: SWAL_BUTTONS.confirm,
                    cancelButton: SWAL_BUTTONS.cancel
                },
                buttonsStyling: false,
                confirmButtonText: 'Update',
                cancelButtonText: 'Cancel',
                inputValidator: (value) => {
                    if (!value.trim()) {
                        return `${type} name cannot be empty!`;
                    }
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    const newName = result.value;

                    // Run the success callback with new name
                    if (onSuccess) onSuccess(newName);

                    Swal.fire({
                        title: 'Updated!',
                        text: `${type} renamed to "${newName}" successfully!`,
                        icon: 'success',
                        customClass: { confirmButton: SWAL_BUTTONS.success },
                        buttonsStyling: false
                    });
                }
            });
        }
    });
}


// ─── DELETE: Confirm before deleting an item ───
function confirmDelete(itemName, type, onSuccess) {
    Swal.fire({
        title: `Delete ${type}?`,
        text: `Are you sure you want to delete "${itemName}"? This action cannot be undone!`,
        icon: 'warning',
        showCancelButton: true,
        customClass: {
            confirmButton: SWAL_BUTTONS.delete,
            cancelButton: SWAL_BUTTONS.confirm
        },
        buttonsStyling: false,
        confirmButtonText: 'Yes, Delete it!',
        cancelButtonText: 'Cancel'
    }).then((result) => {
        if (result.isConfirmed) {
            // Run the success callback (e.g. remove DOM row, API call)
            if (onSuccess) onSuccess();

            Swal.fire({
                title: 'Deleted!',
                text: `"${itemName}" has been removed successfully.`,
                icon: 'success',
                customClass: { confirmButton: SWAL_BUTTONS.success },
                buttonsStyling: false
            });
        }
    });
}


// ─── GENERIC: Simple info/success/error popup ───
function showAlert(title, text, icon = 'info') {
    Swal.fire({
        title: title,
        text: text,
        icon: icon,
        customClass: { confirmButton: SWAL_BUTTONS.confirm },
        buttonsStyling: false
    });
}
