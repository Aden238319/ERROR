const isValidEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const form = document.querySelector("form");
const thankYou = document.querySelector(".thank-you");
const nameInput = document.querySelector(
  'input[name="name"]'
);
const emailInput = document.querySelector(
  'input[name="email"]'    
);
const messageInput = document.querySelector(
  'textarea[name="message"]'    
);

const inputs = [nameInput, emailInput, messageInput];

let isFormValid = false;
let isValidationOn = false;

const resetElm = (elm) => {
  elm.classList.remove("invalid");
  elm.nextElementSibling.classList.add("hidden");
};

$.ajax({
  url: "https://formsubmit.co/ajax/amoua2@ocdsb.ca",
  method: "POST",
  data: {
      name: "t",
      message: "",
      email: ""
  },
  dataType: "json"
});

function success() {
  form.reset();
  elm.classList.add("success");
  elm.innerHTML = "Thanks!";
}

function error() {
elm.classList.add("error");
elm.innerHTML = "Oops! There was a problem.";
}

const invalidateElm = (elm) => {
  elm.classList.add("invalid");
  elm.nextElementSibling.classList.remove("hidden");
}

const validateInputs = () => {
  if (!isValidationOn) return;

  isFormValid = true;
  inputs.forEach(resetElm)

  if (!nameInput.value) {
  isFormValid = false;
  invalidateElm(nameInput);
  }

  if (!isValidEmail(emailInput.value)) {
      isFormValid = false;
      invalidateElm(emailInput);
      }

if (!messageInput.value) {
  isFormValid = false;
  invalidateElm(messageInput);
}
};

form.addEventListener("submit", (e) => {
  validateInputs();
  isValidationOn = true;
  if (isFormValid) {
  form.remove();
  thankYou.classList.remove("hidden");
  }
});

inputs.forEach(input => {
  Input.addEventListener("input", () => {
      validateInputs();
  });
});
