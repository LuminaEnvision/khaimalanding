/**
 * Inquiry form – sends to Formspree.
 *
 * To enable real email delivery:
 * 1. Go to https://formspree.io and sign up (free).
 * 2. Click "New form", name it (e.g. "Khaima Enquiries").
 * 3. Copy your form endpoint: it looks like https://formspree.io/f/xyzabcde
 * 4. In this file, replace YOUR_ID below with the form ID (the part after /f/ ).
 *    Example: if endpoint is https://formspree.io/f/mnqwerty then use 'https://formspree.io/f/mnqwerty'
 */
(function () {
    var FORMSPREE_URL = 'https://formspree.io/f/xqedjpbg';

    var form = document.getElementById('inquiryForm');
    var successEl = document.getElementById('inquirySuccess');
    var successEmailEl = document.getElementById('inquirySuccessEmail');
    var submitErrorEl = document.getElementById('inquirySubmitError');

    function clearErrors() {
        [].slice.call(document.querySelectorAll('.inquiry-error')).forEach(function (el) {
            el.textContent = '';
        });
        [].slice.call(document.querySelectorAll('.inquiry-invalid')).forEach(function (el) {
            el.classList.remove('inquiry-invalid');
        });
        submitErrorEl.textContent = '';
        submitErrorEl.hidden = true;
    }

    function showFieldError(id, message) {
        var input = document.getElementById(id) || document.querySelector('[name="' + id + '"]');
        var errEl = document.getElementById('error-' + id);
        if (input) {
            input.classList.add('inquiry-invalid');
        }
        if (errEl) {
            errEl.textContent = message;
        }
    }

    function validate() {
        clearErrors();
        var valid = true;

        var name = document.getElementById('name');
        if (!name || !name.value.trim()) {
            showFieldError('name', 'Please enter your name.');
            valid = false;
        }

        var email = document.getElementById('email');
        if (!email || !email.value.trim()) {
            showFieldError('email', 'Please enter your email address.');
            valid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
            showFieldError('email', 'Please enter a valid email address.');
            valid = false;
        }

        var eventType = document.querySelector('input[name="event_type"]:checked');
        if (!eventType) {
            showFieldError('event_type', 'Please select a type of event.');
            valid = false;
        }

        var location = document.getElementById('location');
        if (!location || !location.value.trim()) {
            showFieldError('location', 'Please enter the location.');
            valid = false;
        }

        var guests = document.getElementById('guests');
        if (!guests || !guests.value.trim() || parseInt(guests.value, 10) < 1) {
            showFieldError('guests', 'Please enter the number of guests.');
            valid = false;
        }

        var dateFrom = document.getElementById('date_from');
        var dateTo = document.getElementById('date_to');
        var dateErr = '';
        if (!dateFrom || !dateFrom.value) {
            dateErr = 'Please select a start date.';
            valid = false;
        }
        if (!dateTo || !dateTo.value) {
            dateErr = dateErr || 'Please select an end date.';
            valid = false;
        }
        if (dateFrom && dateTo && dateFrom.value && dateTo.value && dateFrom.value > dateTo.value) {
            dateErr = 'End date must be after start date.';
            valid = false;
        }
        if (dateErr) {
            if (dateFrom) dateFrom.classList.add('inquiry-invalid');
            if (dateTo) dateTo.classList.add('inquiry-invalid');
            var errEl = document.getElementById('error-dates');
            if (errEl) errEl.textContent = dateErr;
        }

        var meals = document.querySelectorAll('input[name="meals"]:checked');
        if (!meals.length) {
            showFieldError('meals', 'Please select at least one meal.');
            valid = false;
        }

        var dietary = document.querySelectorAll('input[name="dietary"]:checked');
        if (!dietary.length) {
            showFieldError('dietary', 'Please select at least one dietary option.');
            valid = false;
        }

        return valid;
    }

    function getPayload() {
        var eventType = document.querySelector('input[name="event_type"]:checked');
        var meals = [].slice.call(document.querySelectorAll('input[name="meals"]:checked')).map(function (c) { return c.value; });
        var dietary = [].slice.call(document.querySelectorAll('input[name="dietary"]:checked')).map(function (c) { return c.value; });

        return {
            name: (document.getElementById('name') && document.getElementById('name').value) || '',
            email: (document.getElementById('email') && document.getElementById('email').value) || '',
            event_type: eventType ? eventType.value : '',
            location: (document.getElementById('location') && document.getElementById('location').value) || '',
            guests: (document.getElementById('guests') && document.getElementById('guests').value) || '',
            date_from: (document.getElementById('date_from') && document.getElementById('date_from').value) || '',
            date_to: (document.getElementById('date_to') && document.getElementById('date_to').value) || '',
            meals: meals,
            dietary: dietary,
            notes: (document.getElementById('notes') && document.getElementById('notes').value) || ''
        };
    }

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            clearErrors();

            if (!validate()) {
                return;
            }

            if (FORMSPREE_URL.indexOf('YOUR_ID') !== -1) {
                submitErrorEl.textContent = 'Form is not connected yet. In js/inquiry.js replace YOUR_ID with your Formspree form ID (get it at formspree.io → New form).';
                submitErrorEl.hidden = false;
                return;
            }

            var btn = form.querySelector('button[type="submit"]');
            if (btn) {
                btn.disabled = true;
                btn.textContent = 'Sending…';
            }

            var payload = getPayload();

            fetch(FORMSPREE_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            })
                .then(function (res) {
                    if (!res.ok) {
                        throw new Error('Submission failed. Please try again.');
                    }
                    return res;
                })
                .then(function () {
                    form.hidden = true;
                    if (successEmailEl) {
                        successEmailEl.textContent = payload.email;
                    }
                    if (successEl) {
                        successEl.hidden = false;
                    }
                })
                .catch(function (err) {
                    submitErrorEl.textContent = err.message || 'Something went wrong. Please try again.';
                    submitErrorEl.hidden = false;
                })
                .finally(function () {
                    if (btn) {
                        btn.disabled = false;
                        btn.textContent = 'Send inquiry';
                    }
                });
        });
    }

    // Date inputs: set min to today so calendar picker starts from today and past dates are disabled
    function setDateMin() {
        var today = new Date();
        var y = today.getFullYear();
        var m = String(today.getMonth() + 1).padStart(2, '0');
        var d = String(today.getDate()).padStart(2, '0');
        var min = y + '-' + m + '-' + d;
        var dateFrom = document.getElementById('date_from');
        var dateTo = document.getElementById('date_to');
        if (dateFrom) dateFrom.setAttribute('min', min);
        if (dateTo) dateTo.setAttribute('min', min);
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setDateMin);
    } else {
        setDateMin();
    }
})();
