document.addEventListener('DOMContentLoaded', function () {
    const cardNumberInput = document.getElementById('cardnumber');
    const cardNumberDisplay = document.querySelector('.card-number-overlay');
    const cardDateDisplay = document.querySelector('.card-date-overlay');
    const cardNameDisplay = document.querySelector('.card-name-overlay');
    const cardCvcDisplay = document.querySelector('.card-cvc-overlay');
    const confirmButton = document.querySelector('.confirm-button');
    const completedState = document.querySelector('.completed-state');
    const activeStateMessage = document.querySelector('.active-state-message');
    const continueButton = document.querySelector('.continue-button');

    function showCompletedState() {
        if (validateForm()) {
            // Hide form details
            document.querySelector('.card-details').style.display = 'none';
    
            // Hide active state message
            activeStateMessage.style.display = 'none';
    
            // Hide confirm button
            confirmButton.style.display = 'none';
    
            // Show completed state
            completedState.style.display = 'block';
    
            // Show card logo
            document.querySelector('.card-logo').style.display = 'block';
    
            // Display entered card details in the completed state
            const enteredCardNumber = cardNumberInput.value.replace(/\s/g, '');
            const enteredCardDate = `${document.getElementById('expiry-month').value}/${document.getElementById('expiry-year').value}`;
            const enteredCardName = document.getElementById('cardholder').value.toUpperCase();
            const enteredCardCvc = document.getElementById('cvc').value;
    
            document.querySelector('.completed-state .card-number-overlay').textContent = enteredCardNumber.replace(/(.{4})/g, '$1 ');
            document.querySelector('.completed-state .card-date-overlay').textContent = enteredCardDate;
            document.querySelector('.completed-state .card-name-overlay').textContent = enteredCardName;
            document.querySelector('.completed-state .card-cvc-overlay').textContent = enteredCardCvc;
        } else {
            // Show active state message
            activeStateMessage.style.display = 'block';
    
            // Hide completed state
            completedState.style.display = 'none';
    
            // Hide card logo
            document.querySelector('.card-logo').style.display = 'none';
        }
    }

    function validateCardNumber() {
        const cardNumber = cardNumberInput.value.replace(/\s/g, '');
        const isValid = /^\d{16}$/.test(cardNumber);
        cardNumberInput.classList.toggle('error', !isValid);
        return isValid;
    }

    function validateCardDate() {
        const expiryMonth = document.getElementById('expiry-month').value;
        const expiryYear = document.getElementById('expiry-year').value;
        const isValidMonth = /^\d{2}$/.test(expiryMonth);
        const isValidYear = /^\d{2}$/.test(expiryYear);
        return isValidMonth && isValidYear;
    }

    function validateCvc() {
        const cvc = document.getElementById('cvc').value;
        const isValidCvc = /^\d{3}$/.test(cvc);
        return isValidCvc;
    }

    function validateForm() {
        return validateCardNumber() && validateCardDate() && validateCvc();
    }

    cardNumberInput.addEventListener('input', function () {
        const cardNumber = cardNumberInput.value.replace(/\s/g, '');
        cardNumberDisplay.textContent = cardNumber.replace(/(.{4})/g, '$1 ');
        validateCardNumber();
    });

    document.getElementById('expiry-month').addEventListener('input', function () {
        const expiryMonth = document.getElementById('expiry-month').value;
        const expiryYear = document.getElementById('expiry-year').value;
        updateCardDateDisplay(expiryMonth, expiryYear);
        validateCardDate();
    });

    document.getElementById('expiry-year').addEventListener('input', function () {
        const expiryMonth = document.getElementById('expiry-month').value;
        const expiryYear = document.getElementById('expiry-year').value;
        updateCardDateDisplay(expiryMonth, expiryYear);
        validateCardDate();
    });

    document.getElementById('cardholder').addEventListener('input', function () {
        const cardholderName = document.getElementById('cardholder').value;
        cardNameDisplay.textContent = cardholderName.toUpperCase();
    });

    document.getElementById('cvc').addEventListener('input', function () {
        const cvc = document.getElementById('cvc').value;
        cardCvcDisplay.textContent = cvc;
        validateCvc();
    });

    function updateCardDateDisplay(month, year) {
        cardDateDisplay.textContent = `${month}/${year}`;
    }

    // Confirm button event listener
    confirmButton.addEventListener('click', function () {
        showCompletedState();
    });

    // Continue button event listener
    continueButton.addEventListener('click', function () {
        resetForm();
        // Reload the page
        location.reload();
    });

    function resetForm() {
        document.querySelector('.card-details').style.display = 'block';
        completedState.style.display = 'none';
        activeStateMessage.style.display = 'none';
        cardNumberInput.value = '';
        cardNumberDisplay.textContent = '0000 0000 0000 0000';
        cardNumberInput.classList.remove('error');
        document.getElementById('expiry-month').value = '';
        document.getElementById('expiry-year').value = '';
        cardDateDisplay.textContent = 'MM/YY';
        document.getElementById('cardholder').value = '';
        cardNameDisplay.textContent = 'NAME';
        document.getElementById('cvc').value = '';
        cardCvcDisplay.textContent = 'CVC';
    }
});
