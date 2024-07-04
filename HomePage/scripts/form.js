document.addEventListener('DOMContentLoaded', () => {
    const customerForm = document.querySelector('.customerInformation');
    const paymentForm = document.querySelector('.PaymentMethod');

    customerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validateForm(customerForm)) {
            const customerData = {
                nombre: customerForm.nombre.value,
                telefono: customerForm.telefono.value,
                direccion: customerForm.text.value,
            };
            console.log('Customer Information:', customerData);
        }
    });

    paymentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validateForm(paymentForm)) {
            const paymentData = {
                email: paymentForm.email.value,
                nombreTarjeta: paymentForm.text.value,
                numeroTarjeta: paymentForm.number.value,
                fechaCaducidad: paymentForm.expiryDate.value,
                cvv: paymentForm.cvv.value,
            };
            console.log('Payment Information:', paymentData);
        }
    });

    function validateForm(form) {
        let isValid = true;
        const inputs = form.querySelectorAll('input, select');
        inputs.forEach(input => {
            if (!input.checkValidity()) {
                input.classList.add('error');
                isValid = false;
            } else {
                input.classList.remove('error');
            }
        });
        return isValid;
    }
});
