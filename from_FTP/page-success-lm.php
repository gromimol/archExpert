<?php
/**
 * Template Name: Success Page - Lead Magnet
 * Description: Thank you page after form submission
 */

// Hide menu for text pages (Privacy Policy, Terms of Use, etc.)
global $hide_menu;
$hide_menu = true;

get_header();
?>

    <div class="success-page">
        <div class="success-page__content">
            <div class="container">
                <div class="success-page__content__body">
                    <div class="h1">Thank you for your interesting!</div>
                    <div class="h3">
                        Your material has been sent to your email.<br />Please check your inbox and the spam folder just in case.
                    </div>
                    <p>
                        This resource will help you turn technology into a competitive advantage and a driver of sustainable business growth. If you have questions or want to discuss your situation in more detail, you can schedule a free 30-minute meeting.
                    </p>
                    <div class="success-page__content__cta">
                        <a href="#" class="btn btn--green js--cta">Book a meeting</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="success-page__footer">
            <div class="container">
                <div class="h2">arch expert</div>
                <p class="copyright">
                    © 2025 Arch Expert Consulting. All rights reserved.
                </p>
            </div>
        </div>
    </div>

<script>
// Auto-fill form with data from sessionStorage when modal opens
document.addEventListener('DOMContentLoaded', function() {
    const formDataJson = sessionStorage.getItem('formSubmission');
    
    if (formDataJson) {
        try {
            const formData = JSON.parse(formDataJson);
            
            // When modal opens, fill the form
            const observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    const modal = document.querySelector('.modal');
                    if (modal && modal.classList.contains('open')) {
                        // Fill form fields with saved data
                        const nameInput = document.getElementById('name');
                        const phoneInput = document.getElementById('phone');
                        const emailInput = document.getElementById('Email');
                        
                        if (nameInput && formData.name) nameInput.value = formData.name;
                        if (phoneInput && formData.phone) phoneInput.value = formData.phone;
                        if (emailInput && formData.email) emailInput.value = formData.email;
                        
                        console.log('Form auto-filled with saved data');
                    }
                });
            });
            
            observer.observe(document.body, {
                attributes: true,
                attributeFilter: ['class'],
                subtree: true
            });
        } catch (error) {
            console.error('Error parsing form data:', error);
        }
    }
});
</script>

<?php
get_footer();
