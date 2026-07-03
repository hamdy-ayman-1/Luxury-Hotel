/**
 * BOOKING.JS - فندق الملاذ
 * نظام الحجز وإرسال البيانات عبر واتساب
 */

(function() {
  'use strict';

  // ============================================
  // 1. BOOKING FORM HANDLER
  // ============================================
  const bookingForm = document.getElementById('bookingForm');
  
  if (!bookingForm) return;

  // ============================================
  // 2. GET CURRENT LANGUAGE
  // ============================================
  function getCurrentLang() {
    return localStorage.getItem('hotelLang') || 'ar';
  }

  // ============================================
  // 3. TRANSLATE ERROR MESSAGES
  // ============================================
  function getErrorMsg(key) {
    const translations = window.HotelTranslations ? 
      window.HotelTranslations.getAllTranslations() : {};
    const lang = getCurrentLang();
    const t = translations[key];
    return t ? t[lang] : key;
  }

  // ============================================
  // 4. VALIDATE FORM
  // ============================================
  function validateBookingForm() {
    const fields = {
      fullName: document.getElementById('fullName'),
      phoneNumber: document.getElementById('phoneNumber'),
      emailAddress: document.getElementById('emailAddress'),
      countrySelect: document.getElementById('countrySelect'),
      checkInDate: document.getElementById('checkInDate'),
      checkOutDate: document.getElementById('checkOutDate'),
      adultsCount: document.getElementById('adultsCount'),
      roomType: document.getElementById('roomType'),
      roomCount: document.getElementById('roomCount'),
      termsCheck: document.getElementById('termsCheck')
    };

    let isValid = true;

    // Remove previous errors
    document.querySelectorAll('.form-group.error').forEach(function(el) {
      el.classList.remove('error');
    });

    // Validate full name
    if (!fields.fullName || !fields.fullName.value.trim()) {
      if (fields.fullName) {
        fields.fullName.closest('.form-group').classList.add('error');
      }
      isValid = false;
    }

    // Validate phone
    const phoneRegex = /^[\+\d\s\-]{8,20}$/;
    if (!fields.phoneNumber || !fields.phoneNumber.value.trim() || 
        !phoneRegex.test(fields.phoneNumber.value.trim())) {
      if (fields.phoneNumber) {
        fields.phoneNumber.closest('.form-group').classList.add('error');
      }
      isValid = false;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!fields.emailAddress || !fields.emailAddress.value.trim() || 
        !emailRegex.test(fields.emailAddress.value.trim())) {
      if (fields.emailAddress) {
        fields.emailAddress.closest('.form-group').classList.add('error');
      }
      isValid = false;
    }

    // Validate country
    if (!fields.countrySelect || !fields.countrySelect.value) {
      if (fields.countrySelect) {
        fields.countrySelect.closest('.form-group').classList.add('error');
      }
      isValid = false;
    }

    // Validate check-in date
    if (!fields.checkInDate || !fields.checkInDate.value) {
      if (fields.checkInDate) {
        fields.checkInDate.closest('.form-group').classList.add('error');
      }
      isValid = false;
    }

    // Validate check-out date
    if (!fields.checkOutDate || !fields.checkOutDate.value) {
      if (fields.checkOutDate) {
        fields.checkOutDate.closest('.form-group').classList.add('error');
      }
      isValid = false;
    }

    // Validate check-in < check-out
    if (fields.checkInDate && fields.checkOutDate && 
        fields.checkInDate.value && fields.checkOutDate.value) {
      const checkIn = new Date(fields.checkInDate.value);
      const checkOut = new Date(fields.checkOutDate.value);
      if (checkOut <= checkIn) {
        if (fields.checkOutDate) {
          fields.checkOutDate.closest('.form-group').classList.add('error');
        }
        isValid = false;
      }
    }

    // Validate adults
    if (!fields.adultsCount || parseInt(fields.adultsCount.value) < 1) {
      if (fields.adultsCount) {
        fields.adultsCount.closest('.form-group').classList.add('error');
      }
      isValid = false;
    }

    // Validate room type
    if (!fields.roomType || !fields.roomType.value) {
      if (fields.roomType) {
        fields.roomType.closest('.form-group').classList.add('error');
      }
      isValid = false;
    }

    // Validate room count
    if (!fields.roomCount || parseInt(fields.roomCount.value) < 1) {
      if (fields.roomCount) {
        fields.roomCount.closest('.form-group').classList.add('error');
      }
      isValid = false;
    }

    // Validate terms
    if (!fields.termsCheck || !fields.termsCheck.checked) {
      if (fields.termsCheck) {
        fields.termsCheck.closest('.form-group').classList.add('error');
      }
      isValid = false;
    }

    return isValid;
  }

  // ============================================
  // 5. BUILD WHATSAPP MESSAGE
  // ============================================
  function buildWhatsAppMessage() {
    const fullName = document.getElementById('fullName').value.trim();
    const phone = document.getElementById('phoneNumber').value.trim();
    const email = document.getElementById('emailAddress').value.trim();
    const country = document.getElementById('countrySelect').value;
    const checkIn = document.getElementById('checkInDate').value;
    const checkOut = document.getElementById('checkOutDate').value;
    const adults = document.getElementById('adultsCount').value;
    const children = document.getElementById('childrenCount').value || '0';
    const roomType = document.getElementById('roomType').value;
    const roomCount = document.getElementById('roomCount').value;
    const specialRequests = document.getElementById('specialRequests').value.trim();

    const lang = getCurrentLang();
    const isArabic = lang === 'ar';

    // Build message
    let message = isArabic ? 
      '🌹 *طلب حجز جديد - فندق الملاذ* 🌹\n\n' :
      '🌹 *New Booking Request - Almaath Hotel* 🌹\n\n';

    message += isArabic ? '👤 *الاسم:* ' : '👤 *Name:* ';
    message += fullName + '\n';
    
    message += isArabic ? '📞 *الهاتف:* ' : '📞 *Phone:* ';
    message += phone + '\n';
    
    message += isArabic ? '✉️ *البريد الإلكتروني:* ' : '✉️ *Email:* ';
    message += email + '\n';
    
    message += isArabic ? '🌍 *الدولة:* ' : '🌍 *Country:* ';
    message += country + '\n';
    
    message += isArabic ? '📅 *تاريخ الوصول:* ' : '📅 *Check-in:* ';
    message += checkIn + '\n';
    
    message += isArabic ? '📅 *تاريخ المغادرة:* ' : '📅 *Check-out:* ';
    message += checkOut + '\n';
    
    message += isArabic ? '👨 *عدد البالغين:* ' : '👨 *Adults:* ';
    message += adults + '\n';
    
    message += isArabic ? '👶 *عدد الأطفال:* ' : '👶 *Children:* ';
    message += children + '\n';
    
    message += isArabic ? '🛏️ *نوع الغرفة:* ' : '🛏️ *Room Type:* ';
    message += roomType + '\n';
    
    message += isArabic ? '🔢 *عدد الغرف:* ' : '🔢 *Rooms:* ';
    message += roomCount + '\n';

    if (specialRequests) {
      message += isArabic ? '\n📝 *طلبات خاصة:* ' : '\n📝 *Special Requests:* ';
      message += specialRequests + '\n';
    }

    message += isArabic ? 
      '\n✨ *شكراً لاختياركم فندق الملاذ* ✨' :
      '\n✨ *Thank you for choosing Almaath Hotel* ✨';

    return encodeURIComponent(message);
  }

  // ============================================
  // 6. SEND TO WHATSAPP
  // ============================================
  function sendToWhatsApp() {
    const phoneNumber = '96171234567'; // رقم واتساب الفندق
    const message = buildWhatsAppMessage();
    const url = 'https://wa.me/' + phoneNumber + '?text=' + message;
    
    // Open WhatsApp in new window
    window.open(url, '_blank');
  }

  // ============================================
  // 7. FORM SUBMIT HANDLER
  // ============================================
  bookingForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const msgDiv = document.getElementById('bookingFormMsg');
    
    if (!validateBookingForm()) {
      if (msgDiv) {
        msgDiv.className = 'form-message error';
        const lang = getCurrentLang();
        msgDiv.textContent = lang === 'ar' ? 
          'الرجاء تصحيح الأخطاء في النموذج' : 
          'Please correct the errors in the form';
      }
      return;
    }

    // Show success message
    if (msgDiv) {
      const lang = getCurrentLang();
      msgDiv.className = 'form-message success';
      msgDiv.textContent = lang === 'ar' ? 
        '✅ جاري تحويلك إلى واتساب لإتمام الحجز...' : 
        '✅ Redirecting to WhatsApp to complete your booking...';
    }

    // Send to WhatsApp after short delay
    setTimeout(function() {
      sendToWhatsApp();
      
      // Reset message after sending
      setTimeout(function() {
        if (msgDiv) {
          msgDiv.className = 'form-message';
          msgDiv.textContent = '';
        }
      }, 3000);
    }, 1000);
  });

  // ============================================
  // 8. SET MIN DATE FOR DATE INPUTS
  // ============================================
  function setMinDates() {
    const checkIn = document.getElementById('checkInDate');
    const checkOut = document.getElementById('checkOutDate');
    
    if (checkIn) {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      const minDate = year + '-' + month + '-' + day;
      checkIn.setAttribute('min', minDate);
      
      // Update check-out min date when check-in changes
      checkIn.addEventListener('change', function() {
        if (checkOut) {
          checkOut.setAttribute('min', this.value);
          if (checkOut.value && checkOut.value <= this.value) {
            checkOut.value = '';
          }
        }
      });
    }
    
    if (checkOut) {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const year = tomorrow.getFullYear();
      const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
      const day = String(tomorrow.getDate()).padStart(2, '0');
      checkOut.setAttribute('min', year + '-' + month + '-' + day);
    }
  }

  // ============================================
  // 9. RE-TRANSLATE ON LANGUAGE CHANGE
  // ============================================
  document.addEventListener('languageChanged', function() {
    // Re-translate error messages if any
    const errorGroups = document.querySelectorAll('.form-group.error');
    errorGroups.forEach(function(group) {
      const errorMsg = group.querySelector('.error-msg');
      if (errorMsg) {
        const key = errorMsg.getAttribute('data-translate');
        if (key && window.HotelTranslations) {
          const lang = getCurrentLang();
          const translation = window.HotelTranslations.getTranslation(key, lang);
          if (translation) {
            errorMsg.textContent = translation;
          }
        }
      }
    });
  });

  // ============================================
  // 10. INIT
  // ============================================
  setMinDates();

})();