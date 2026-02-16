// ===== SUCCESS PAGE: Send form data to Mailchimp =====
document.addEventListener('DOMContentLoaded', function() {
    // Read form data from sessionStorage
    const formDataJson = sessionStorage.getItem('formSubmission');

    if (!formDataJson) {
        return;
    }

    let formData;
    try {
        formData = JSON.parse(formDataJson);
    } catch (error) {
        return;
    }

    // Send data to Mailchimp
    sendToMailchimp(formData);
});

/**
 * Send form data to Mailchimp via WordPress AJAX handler
 * @param {Object} data - Form data (type, name, phone, email)
 */
function sendToMailchimp(data) {
    // Check if mailchimpAjax is available
    if (typeof mailchimpAjax === 'undefined') {
        return;
    }

    // Prepare data for WordPress AJAX
    const ajaxData = new FormData();
    ajaxData.append('action', 'mailchimp_subscribe');
    ajaxData.append('nonce', mailchimpAjax.nonce);
    ajaxData.append('type', data.type); // 'meeting' or 'checklist'
    ajaxData.append('email', data.email);
    ajaxData.append('name', data.name);
    ajaxData.append('phone', data.phone);

    // Send AJAX request to WordPress handler
    fetch(mailchimpAjax.ajaxUrl, {
        method: 'POST',
        credentials: 'same-origin',
        body: ajaxData
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            // Clear sessionStorage after successful submission
            sessionStorage.removeItem('formSubmission');
        }
        // Keep data in sessionStorage for retry if failed
    })
    .catch(error => {
        // Keep data in sessionStorage for retry
    });
}
