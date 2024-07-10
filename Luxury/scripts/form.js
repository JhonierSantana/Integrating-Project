document.addEventListener("DOMContentLoaded", () => {
  const checkoutForm = document.getElementById("checkoutForm");
  const telefonoInput = checkoutForm.querySelector("#telefono");
  const numeroTarjetaInput = checkoutForm.querySelector("#numeroTarjeta");
  const expiryDateInput = checkoutForm.querySelector("#expiryDate");
  const emailInput = checkoutForm.querySelector("#email");
  const submitButton = checkoutForm.querySelector("button[type='submit']");

  submitButton.disabled = true;
  checkoutForm.addEventListener("input", () => {
    if (validateForm(checkoutForm)) {
      submitButton.disabled = false;
    } else {
      submitButton = true;
    }
  });

  checkoutForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (validateForm(checkoutForm)) {
      const formData = {
        nombre: checkoutForm.nombre.value,
        telefono: checkoutForm.telefono.value,
        direccion: checkoutForm.direccion.value,
        email: checkoutForm.email.value,
        nombreTarjeta: checkoutForm.nombreTarjeta.value,
        numeroTarjeta: checkoutForm.numeroTarjeta.value,
        fechaCaducidad: checkoutForm.expiryDate.value,
        cvv: checkoutForm.cvv.value,
        fecha: new Date().toLocaleDateString()
      };
      localStorage.setItem("formData", JSON.stringify(formData));
      window.location.href = "./checkoutPaymentSucess.html";
    }
  });

  emailInput.addEventListener("input", (e) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(e.target.value)) {
      e.target.classList.add("error");
    } else {
      e.target.classList.remove("error");
    }
  });

  telefonoInput.addEventListener("input", (e) => {
    e.target.value = e.target.value.replace(/\D/g, "");
  });

  numeroTarjetaInput.addEventListener("input", (e) => {
    e.target.value = e.target.value.replace(/\D/g, "");
  });

  expiryDateInput.addEventListener("input", (e) => {
    let value = e.target.value;
    if (!/^\d{0,2}(\/\d{0,2})?$/.test(value)) {
      value = value.replace(/[^0-9\/]/g, "");
    }
    if (value.length === 2 && !value.includes("/")) {
      value = value + "/";
    }
    e.target.value = value;
  });

  function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll("input");
    inputs.forEach((input) => {
      if (!input.checkValidity()) {
        input.classList.add("error");
        isValid = false;
      } else {
        input.classList.remove("error");
      }
    });
    return isValid;
  }
});
