// ===== SUCCESS PAGE: Send form data to Mailchimp =====
document.addEventListener('DOMContentLoaded', function() {
    // Read form data from sessionStorage
    const formDataJson = sessionStorage.getItem('formSubmission');
    
    if (!formDataJson) {
        console.warn('No form data found in sessionStorage');
        return;
    }

    let formData;
    try {
        formData = JSON.parse(formDataJson);
        console.log('Form data retrieved:', formData);
    } catch (error) {
        console.error('Error parsing form data:', error);
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
    console.log('Preparing to send to Mailchimp...', {
        type: data.type,
        email: data.email,
        name: data.name,
        phone: data.phone
    });

    // Check if mailchimpAjax is available
    if (typeof mailchimpAjax === 'undefined') {
        console.error('❌ Mailchimp AJAX config not loaded');
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
        console.log('Mailchimp response:', result);
        
        if (result.success) {
            console.log('✅ Successfully subscribed to Mailchimp');
            // Clear sessionStorage after successful submission
            sessionStorage.removeItem('formSubmission');
        } else {
            console.error('❌ Mailchimp subscription failed:', result.data);
            // Keep data in sessionStorage for retry
        }
    })
    .catch(error => {
        console.error('❌ Network error sending to Mailchimp:', error);
        // Keep data in sessionStorage for retry
    });
}
