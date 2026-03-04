// ===== SUCCESS PAGE: Personalize content based on form type =====
document.addEventListener('DOMContentLoaded', function() {
    // Read type from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get('type') || 'meeting'; // default to meeting

    // Content variants
    const content = {
        meeting: {
            title: 'Thank you for your trust!',
            subtitle: 'Your request has been submitted.<br /> Please choose a convenient date and time for the meeting using the Calendly link below',
            description: 'During the 30-minute session, we will review your situation, identify the technological constraints affecting scalability, and outline how resolving them strengthens profitability, operational stability, and the security of your business.',
            ctaTitle: 'Proceed to scheduling:',
            ctaText: 'Book a time',
            ctaLink: 'https://calendly.com/sandybear/interview'
        },
        checklist: {
            title: 'Thank you for your trust!',
            subtitle: 'Your material has been sent to your email.<br />Please check your inbox and the spam folder just in case..',
            description: 'This resource will help you turn technology into a competitive advantage and a driver of sustainable business growth. If you have questions or want to discuss your situation in more detail, you can schedule a free 30-minute meeting.',
            ctaTitle: '',
            ctaText: 'Book a meeting',
            ctaLink: 'https://calendly.com/sandybear/interview'
        }
    };

    // Get current content based on type
    const current = content[type] || content.meeting;

    // Update page elements
    const titleEl = document.querySelector('.success-page__content__body .h1');
    const subtitleEl = document.querySelector('.success-page__content__body .h3');
    const descriptionEl = document.querySelector('.success-page__content__body p');
    const ctaTitleEl = document.querySelector('.success-page__content__cta .h4');
    const ctaBtn = document.querySelector('.success-page__content__cta .btn');

    if (titleEl) titleEl.textContent = current.title;
    if (subtitleEl) subtitleEl.innerHTML = current.subtitle;
    if (descriptionEl) descriptionEl.textContent = current.description;
    if (ctaTitleEl) ctaTitleEl.textContent = current.ctaTitle;
    if (ctaBtn) {
        ctaBtn.textContent = current.ctaText;
        ctaBtn.href = current.ctaLink;
    }
});
