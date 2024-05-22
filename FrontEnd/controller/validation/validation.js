
// Object containing regular expressions for various input fields
const inp_field = {
    name: /^[a-zA-Z ]{2,30}$/,
    address1: /^[a-zA-Z0-9 ]{2,12}$/i,
    address2: /^[A-z \.]{3,}$/,
    address3: /^[A-z0-9 \.]{3,}$/,
    contact: /^\d{10}$/,
    emgContact: /^\d{10}$/,
    contact1: /^\d{10}$/,
    contact2: /^\d{10}$/,
    loyaltyPoints: /^\d+$/,
    qty: /^\d+$/,
    salePrice: /^\d+$/,
    buyPrice: /^\d+$/,
    discount: /^\d+$/,
    cash: /^\d+$/,
    branch: /^[a-zA-Z ]{2,30}$/,
    person: /^[a-zA-Z ]{2,30}$/,
    email: /^([a-zA-Z0-9._-]+)@([a-zA-Z0-9_-]+)\.([a-zA-Z]{2,6})$/
};

// Function to validate input fields
function validateInput(field, regex) {
    const isValid = regex.test(field.value);
    field.style.borderColor = isValid ? 'green' : 'red';
    field.style.boxShadow = isValid ? '0 0 5px 0 #BBF7D0' : '0 0 5px 0 #E9A89B';
}

document.querySelectorAll('input[type="text"], input[type="email"], input[type="date"]').forEach(input => {
    input.addEventListener('input', function() {
        validateInput(this, inp_field[this.name]);
    });
});

// Function to validate select fields
function validateSelect(select) {
    const isValid = select.value !== '';
    select.style.borderColor = isValid ? 'green' : 'red';
    select.style.boxShadow = isValid ? '0 0 7px 0 #BBF7D0' : '0 0 7px 0 #E9A89B';
}

document.querySelectorAll('select').forEach(select => {
    select.addEventListener('change', function() {
        validateSelect(this);
    });
});




