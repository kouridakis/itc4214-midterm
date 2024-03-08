$(() => {
    $('#contact-form').on('submit', (e) => {
        e.preventDefault();

        let firstName = $('#first-name').val().trim();
        let lastName = $('#last-name').val().trim();
        let email = $('#email').val().trim();
        let phone = $('#phone').val().trim();
        let subject = $('#subject').val().trim();
        let message = $('#message').val().trim();
        if (!firstName || !lastName || !email || !phone || !subject || !message) {
            alert('Please fill in all of the fields.');
            $('#contact-form').trigger('reset');
            return;
        }
        
        alert(`Name: ${firstName} ${lastName}\nEmail: ${email}\nPhone: ${phone}\nSubject: ${subject}\nMessage: ${message}`);

        $('#contact-form').trigger('reset');
    });
});
