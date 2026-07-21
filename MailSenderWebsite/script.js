// ===== script.js =====
import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

// Initialize EmailJS once
emailjs.init({
    publicKey: "619-EBsIQznAvmfhm"
});

(function() {
  'use strict';

  const form = document.getElementById('contactForm');
  const nameInput = document.getElementById('fullName');
  const phoneInput = document.getElementById('phone');
  const nameError = document.getElementById('nameError');
  const phoneError = document.getElementById('phoneError');
  const sendBtn = document.getElementById('sendBtn');
  const btnText = sendBtn.querySelector('.btn-text');

  // Error popup elements
  const errorPopup = document.getElementById('errorPopup');
  const errorMessage = document.getElementById('errorMessage');
  const errorCloseBtn = document.getElementById('errorCloseBtn');

  let isSubmitting = false;

  function setError(element, message) {
    if (!element) return;
    if (message) {
      element.textContent = message;
      element.classList.add('show');
    } else {
      element.textContent = '';
      element.classList.remove('show');
    }
  }

  function validateForm() {
    let isValid = true;

    const nameValue = nameInput.value.trim();
    if (nameValue === '') {
      setError(nameError, 'Please enter your name.');
      isValid = false;
    } else {
      setError(nameError, '');
    }

    const phoneValue = phoneInput.value.trim();
    const digitsOnly = phoneValue.replace(/\D/g, '');
    if (phoneValue === '') {
      setError(phoneError, 'Please enter your phone number.');
      isValid = false;
    } else if (digitsOnly.length !== 10) {
      setError(phoneError, 'Please enter a valid 10-digit phone number.');
      isValid = false;
    } else {
      setError(phoneError, '');
    }

    return isValid;
  }

  function showErrorPopup(message) {
    errorMessage.textContent = message || 'Something went wrong. Please try again.';
    errorPopup.classList.add('active');
  }

  function hideErrorPopup() {
    errorPopup.classList.remove('active');
  }

  errorCloseBtn.addEventListener('click', hideErrorPopup);
  errorPopup.addEventListener('click', function(e) {
    if (e.target === errorPopup) hideErrorPopup();
  });

  nameInput.addEventListener('input', function() {
    if (nameError.classList.contains('show')) {
      setError(nameError, '');
    }
  });

  phoneInput.addEventListener('input', function() {
    this.value = this.value.replace(/\D/g, '').slice(0, 10);
    if (phoneError.classList.contains('show')) {
      setError(phoneError, '');
    }
  });

  phoneInput.addEventListener('paste', function() {
    setTimeout(() => {
      this.value = this.value.replace(/\D/g, '').slice(0, 10);
    }, 0);
  });

  function createRipple(e, button) {
    const ripple = button.querySelector('.ripple');
    if (!ripple) return;

    ripple.style.animation = 'none';
    ripple.offsetHeight;

    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.style.animation = 'rippleAnim 0.7s ease-out forwards';
  }

  async function saveToFirestore(data) {
    try {
      const docRef = await addDoc(collection(db, "contacts"), {
        name: data.name,
        phone: data.phone,
        createdAt: serverTimestamp()
      });
      return { success: true, id: docRef.id };
    } catch (error) {
      console.error('Firestore error:', error);
      return { success: false, error: error.message };
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (isSubmitting) return;

    const valid = validateForm();
    if (!valid) return;

    const formData = {
      name: nameInput.value.trim(),
      phone: phoneInput.value.trim()
    };

    isSubmitting = true;
    sendBtn.disabled = true;
    btnText.textContent = 'Sending...';

    // Create ripple on click
    const rippleEvent = new MouseEvent('click', {
      clientX: window.innerWidth / 2,
      clientY: window.innerHeight / 2
    });
    createRipple(rippleEvent, sendBtn);

    try {
      // Step 1: Save to Firestore
      const result = await saveToFirestore(formData);
      
      if (!result.success) {
        throw new Error('Firestore save failed');
      }

      // Step 2: Send email using EmailJS
      try {
        await emailjs.send(
          "service_khi2r6y",
          "template_29ukzw3",
          {
            name: formData.name,
            phone: formData.phone,
            time: new Date().toLocaleString()
          }
        );
      } catch (emailError) {
        console.error('EmailJS error:', emailError);
        throw new Error('Failed to send email notification');
      }

      // Step 3: Everything succeeded - redirect to success page
      window.location.href = 'success.html';
      
    } catch (error) {
      // Show error popup for any failure (Firestore or EmailJS)
      showErrorPopup(error.message || 'Failed to save your details. Please check your connection and try again.');
      
      // Re-enable button
      isSubmitting = false;
      sendBtn.disabled = false;
      btnText.textContent = 'Send Mail';
    }
  }

  form.addEventListener('submit', handleSubmit);

  sendBtn.addEventListener('click', function(e) {
    if (!isSubmitting) {
      createRipple(e, this);
    }
  });

  console.log('✅ Contact form ready – Firebase integrated with EmailJS.');
})();