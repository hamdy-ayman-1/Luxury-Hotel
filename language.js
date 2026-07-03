/**
 * LANGUAGE.JS - فندق الملاذ
 * نظام الترجمة الفوري (عربي/إنجليزي) مع LocalStorage
 */

(function() {
  'use strict';

  // ============================================
  // 1. TRANSLATIONS DATABASE
  // ============================================
  const translations = {
    // Navigation
    home: { ar: 'الرئيسية', en: 'Home' },
    about: { ar: 'عن الفندق', en: 'About' },
    contact: { ar: 'اتصل بنا', en: 'Contact' },
    booking: { ar: 'احجز', en: 'Book' },
    
    // Hero
    hero_title: { ar: 'اكتشف الفخامة الحقيقية', en: 'Discover True Luxury' },
    hero_sub: { ar: 'إقامة لا تُنسى في قلب العاصمة', en: 'An Unforgettable Stay in the Heart of the City' },
    hero_book: { ar: 'احجز الآن', en: 'Book Now' },
    hero_explore: { ar: 'استكشف', en: 'Explore' },
    
    // Rooms
    rooms_tag: { ar: 'إقامة راقية', en: 'Luxury Stay' },
    rooms_title: { ar: 'أجنحة فاخرة', en: 'Luxury Suites' },
    rooms_desc: { ar: 'تصاميم حصرية مع إطلالات خلابة وخدمة على مدار الساعة', en: 'Exclusive designs with stunning views and 24/7 service' },
    room_presidential: { ar: 'جناح رئاسي', en: 'Presidential Suite' },
    room_pres_desc: { ar: 'مساحة 120 متر مربع، إطلالة بانورامية، جاكوزي خاص', en: '120 sqm, panoramic view, private jacuzzi' },
    room_deluxe: { ar: 'جناح ديلوكس', en: 'Deluxe Suite' },
    room_del_desc: { ar: 'إطلالة على المدينة، غرفة معيشة منفصلة، خدمة 24 ساعة', en: 'City view, separate living room, 24h service' },
    room_beach: { ar: 'جناح الشاطئ', en: 'Beach Suite' },
    room_beach_desc: { ar: 'إطلالة مباشرة على البحر، شرفة خاصة، مدخل خاص', en: 'Direct sea view, private terrace, private entrance' },
    book_now: { ar: 'احجز', en: 'Book' },
    
    // Amenities
    amenities_tag: { ar: 'خدمات حصرية', en: 'Exclusive Services' },
    amenities_title: { ar: 'مرافق الفندق', en: 'Hotel Amenities' },
    amenity_pool: { ar: 'مسبح لا نهائي', en: 'Infinity Pool' },
    amenity_spa: { ar: 'سبا &amp; جاكوزي', en: 'Spa &amp; Jacuzzi' },
    amenity_rest: { ar: 'مطعم راقٍ', en: 'Fine Dining' },
    amenity_gym: { ar: 'نادي صحي', en: 'Fitness Club' },
    amenity_beach: { ar: 'شاطئ خاص', en: 'Private Beach' },
    amenity_conf: { ar: 'قاعات مؤتمرات', en: 'Conference Halls' },
    
    // Gallery
    gallery_tag: { ar: 'معرض', en: 'Gallery' },
    gallery_title: { ar: 'لحظات من الفخامة', en: 'Moments of Luxury' },
    gallery_about_tag: { ar: 'معرض', en: 'Gallery' },
    gallery_about_title: { ar: 'لحظات من الفخامة', en: 'Moments of Luxury' },
    
    // Testimonials
    testimonial_tag: { ar: 'شهادات', en: 'Testimonials' },
    testimonial_title: { ar: 'ما يقوله ضيوفنا', en: 'What Our Guests Say' },
    testimonial_1: { ar: '"أفضل تجربة فندقية على الإطلاق. الخدمة والتصميم يفوقان الخيال."', en: '"The best hotel experience ever. Service and design are beyond imagination."' },
    testimonial_2: { ar: '"إطلالة رائعة وهدوء تام. سبا ممتاز وطاقم متعاون."', en: '"Amazing view and complete tranquility. Excellent spa and cooperative staff."' },
    testimonial_3: { ar: '"فندق ملاذ هو وجهتنا الدائمة في كل زيارة. راقٍ بأناقة."', en: '"Almaath Hotel is our permanent destination every visit. Elegantly luxurious."' },
    
    // Stats
    stat_guests: { ar: 'نزيل سعيد', en: 'Happy Guests' },
    stat_awards: { ar: 'جائزة عالمية', en: 'Global Awards' },
    stat_satisfaction: { ar: '% رضا', en: '% Satisfaction' },
    stat_restaurants: { ar: 'مطعم فاخر', en: 'Luxury Restaurants' },
    
    // Newsletter
    news_title: { ar: 'النشرة البريدية', en: 'Newsletter' },
    news_desc: { ar: 'اشترك لتحصل على عروض حصرية', en: 'Subscribe to get exclusive offers' },
    subscribe: { ar: 'اشتراك', en: 'Subscribe' },
    
    // Footer
    footer_desc: { ar: 'فخامة لا تضاهى في قلب المدينة', en: 'Unmatched Luxury in the Heart of the City' },
    quick_links: { ar: 'روابط سريعة', en: 'Quick Links' },
    contact_info: { ar: 'معلومات الاتصال', en: 'Contact Info' },
    all_rights: { ar: 'جميع الحقوق محفوظة', en: 'All Rights Reserved' },
    privacy: { ar: 'سياسة الخصوصية', en: 'Privacy Policy' },
    terms: { ar: 'الشروط والأحكام', en: 'Terms & Conditions' },
    
    // About Page
    about_hero_title: { ar: 'قصة الفخامة', en: 'The Story of Luxury' },
    about_hero_sub: { ar: 'رحلة من التميز بدأت بحلم', en: 'A Journey of Excellence That Began with a Dream' },
    about_story_tag: { ar: 'قصتنا', en: 'Our Story' },
    about_story_title: { ar: 'فندق الملاذ: حيث تلتقي الفخامة بالخصوصية', en: 'Almaath Hotel: Where Luxury Meets Privacy' },
    about_story_p1: { ar: 'تأسس فندق الملاذ في عام 2010 بحلم بسيط: خلق ملاذ فاخر يجمع بين الأناقة الشرقية والخدمات الغربية. منذ يومنا الأول، ونحن نسعى لتقديم تجربة إقامة لا تُنسى.', en: 'Almaath Hotel was founded in 2010 with a simple dream: to create a luxurious sanctuary that combines Eastern elegance with Western services. From day one, we have strived to provide an unforgettable stay experience.' },
    about_story_p2: { ar: 'اليوم، بعد أكثر من عقد من التميز، أصبحنا وجهة مفضلة للمسافرين الباحثين عن الرقي والهدوء. كل جناح في فندقنا يحكي قصة، وكل تفصيل مصمم بدقة لإرضاء أذواق ضيوفنا.', en: 'Today, after more than a decade of excellence, we have become a preferred destination for travelers seeking refinement and tranquility. Every suite in our hotel tells a story, and every detail is precisely designed to satisfy our guests\' tastes.' },
    
    vision_title: { ar: 'رؤيتنا', en: 'Our Vision' },
    vision_desc: { ar: 'أن نكون الوجهة الأولى للفخامة في الشرق الأوسط، ونعيد تعريف معنى الإقامة الفاخرة.', en: 'To be the premier luxury destination in the Middle East, redefining the meaning of luxury accommodation.' },
    mission_title: { ar: 'رسالتنا', en: 'Our Mission' },
    mission_desc: { ar: 'تقديم تجربة ضيافة استثنائية تجمع بين التقاليد العريقة والابتكار الحديث.', en: 'To deliver an exceptional hospitality experience that combines ancient traditions with modern innovation.' },
    philosophy_title: { ar: 'فلسفتنا', en: 'Our Philosophy' },
    philosophy_desc: { ar: 'نؤمن بأن الفخامة الحقيقية تكمن في التفاصيل الصغيرة التي تصنع فرقاً كبيراً.', en: 'We believe that true luxury lies in the small details that make a big difference.' },
    
    why_tag: { ar: 'لماذا نحن', en: 'Why Us' },
    why_title: { ar: 'لماذا تختار فندق الملاذ؟', en: 'Why Choose Almaath Hotel?' },
    why_1: { ar: 'خدمة على مدار الساعة', en: '24/7 Service' },
    why_1_desc: { ar: 'فريق متخصص يلبي احتياجاتك في أي وقت', en: 'A specialized team that meets your needs at any time' },
    why_2: { ar: 'تصاميم حصرية', en: 'Exclusive Designs' },
    why_2_desc: { ar: 'أجنحة مصممة من قبل كبار المهندسين المعماريين', en: 'Suites designed by top architects' },
    why_3: { ar: 'مطاعم عالمية', en: 'World-Class Restaurants' },
    why_3_desc: { ar: 'أشهر الطهاة يقدمون أشهى المأكولات', en: 'Famous chefs serving the finest cuisine' },
    why_4: { ar: 'منتجع صحي متكامل', en: 'Integrated Wellness Resort' },
    why_4_desc: { ar: 'سبا وجاكوزي وعلاجات استرخاء فريدة', en: 'Spa, jacuzzi, and unique relaxation treatments' },
    
    awards_tag: { ar: 'جوائزنا', en: 'Our Awards' },
    awards_title: { ar: 'تكريم عالمي', en: 'Global Recognition' },
    award_1: { ar: 'أفضل فندق فاخر 2024', en: 'Best Luxury Hotel 2024' },
    award_1_by: { ar: 'جوائز السفر العالمية', en: 'World Travel Awards' },
    award_2: { ar: 'جائزة التميز في الضيافة', en: 'Hospitality Excellence Award' },
    award_2_by: { ar: 'منظمة السياحة الدولية', en: 'International Tourism Organization' },
    award_3: { ar: 'تصنيف 5 نجوم', en: '5-Star Rating' },
    award_3_by: { ar: 'اتحاد الفنادق العالمي', en: 'World Hotel Federation' },
    
    management_tag: { ar: 'الإدارة', en: 'Management' },
    management_title: { ar: 'فريق القيادة', en: 'Leadership Team' },
    manager_1_name: { ar: 'أحمد المنصور', en: 'Ahmed Al-Mansour' },
    manager_1_title: { ar: 'المدير العام', en: 'General Manager' },
    manager_2_name: { ar: 'سارة الحسين', en: 'Sara Al-Hussein' },
    manager_2_title: { ar: 'مديرة الضيافة', en: 'Director of Hospitality' },
    manager_3_name: { ar: 'ميشيل لوبان', en: 'Michel Le Pen' },
    manager_3_title: { ar: 'الشيف التنفيذي', en: 'Executive Chef' },
    
    timeline_tag: { ar: 'الرحلة', en: 'The Journey' },
    timeline_title: { ar: 'محطاتنا المهمة', en: 'Our Milestones' },
    timeline_1: { ar: 'تأسيس الفندق', en: 'Hotel Founding' },
    timeline_1_desc: { ar: 'افتتاح الفندق بأول 50 غرفة فاخرة', en: 'Opening with 50 luxury rooms' },
    timeline_2: { ar: 'التوسع', en: 'Expansion' },
    timeline_2_desc: { ar: 'إضافة 30 جناحاً جديداً ومرافق سبا', en: 'Adding 30 new suites and spa facilities' },
    timeline_3: { ar: 'التجديد', en: 'Renovation' },
    timeline_3_desc: { ar: 'إعادة تصميم كاملة بأحدث المعايير', en: 'Complete redesign with latest standards' },
    timeline_4: { ar: 'التميز', en: 'Excellence' },
    timeline_4_desc: { ar: 'الحصول على جائزة أفضل فندق فاخر', en: 'Awarded Best Luxury Hotel' },
    
    // Contact Page
    contact_hero_title: { ar: 'تواصل معنا', en: 'Contact Us' },
    contact_hero_sub: { ar: 'نحن هنا لخدمتك على مدار الساعة', en: 'We are here to serve you 24/7' },
    contact_phone_title: { ar: 'الهاتف', en: 'Phone' },
    contact_email_title: { ar: 'البريد الإلكتروني', en: 'Email' },
    contact_whatsapp_title: { ar: 'واتساب', en: 'WhatsApp' },
    contact_whatsapp_btn: { ar: 'تواصل عبر واتساب', en: 'Contact via WhatsApp' },
    contact_hours_title: { ar: 'ساعات العمل', en: 'Working Hours' },
    contact_hours: { ar: 'الاستقبال: 24 ساعة طوال أيام الأسبوع', en: 'Reception: 24/7' },
    contact_hours_rest: { ar: 'المطاعم: 6:00 صباحاً - 12:00 منتصف الليل', en: 'Restaurants: 6:00 AM - 12:00 AM' },
    contact_form_title: { ar: 'أرسل لنا رسالة', en: 'Send Us a Message' },
    contact_name: { ar: 'الاسم الكامل', en: 'Full Name' },
    contact_email: { ar: 'البريد الإلكتروني', en: 'Email' },
    contact_phone: { ar: 'رقم الهاتف', en: 'Phone Number' },
    contact_subject: { ar: 'الموضوع', en: 'Subject' },
    contact_message: { ar: 'الرسالة', en: 'Message' },
    contact_send: { ar: 'إرسال الرسالة', en: 'Send Message' },
    
    // FAQ
    faq_tag: { ar: 'الأسئلة الشائعة', en: 'FAQ' },
    faq_title: { ar: 'أجوبة على استفساراتكم', en: 'Answers to Your Questions' },
    faq_q1: { ar: 'ما هي سياسة الإلغاء؟', en: 'What is the cancellation policy?' },
    faq_a1: { ar: 'يمكنك إلغاء الحجز مجاناً قبل 48 ساعة من تاريخ الوصول. بعد ذلك، يتم تطبيق رسوم ليلة واحدة.', en: 'You can cancel free of charge 48 hours before arrival. After that, a one-night fee applies.' },
    faq_q2: { ar: 'هل يوجد مواقف للسيارات؟', en: 'Is there parking available?' },
    faq_a2: { ar: 'نعم، يتوفر موقف سيارات مجاني تحت الأرض، بالإضافة إلى خدمة صف السيارات.', en: 'Yes, free underground parking is available, along with valet service.' },
    faq_q3: { ar: 'هل الفندق مناسب للعائلات؟', en: 'Is the hotel family-friendly?' },
    faq_a3: { ar: 'بالتأكيد! نوفر غرف عائلية، أنشطة للأطفال، وحضانة أطفال عند الطلب.', en: 'Absolutely! We offer family rooms, children\'s activities, and babysitting on request.' },
    faq_q4: { ar: 'هل تسمحون بالحيوانات الأليفة؟', en: 'Do you allow pets?' },
    faq_a4: { ar: 'نرحب بالحيوانات الأليفة الصغيرة (أقل من 10 كجم) مع رسوم إضافية.', en: 'We welcome small pets (under 10kg) with an additional fee.' },
    
    social_tag: { ar: 'تابعنا', en: 'Follow Us' },
    social_title: { ar: 'نحن على وسائل التواصل', en: 'We\'re on Social Media' },
    
    // Booking Page
    booking_hero_title: { ar: 'احجز إقامتك', en: 'Book Your Stay' },
    booking_hero_sub: { ar: 'ابدأ رحلة الفخامة اليوم', en: 'Start Your Luxury Journey Today' },
    booking_form_title: { ar: 'معلومات الحجز', en: 'Booking Information' },
    booking_name: { ar: 'الاسم الكامل', en: 'Full Name' },
    booking_phone: { ar: 'رقم الهاتف', en: 'Phone Number' },
    booking_email: { ar: 'البريد الإلكتروني', en: 'Email' },
    booking_country: { ar: 'الدولة', en: 'Country' },
    booking_checkin: { ar: 'تاريخ الوصول', en: 'Check-in Date' },
    booking_checkout: { ar: 'تاريخ المغادرة', en: 'Check-out Date' },
    booking_adults: { ar: 'عدد البالغين', en: 'Number of Adults' },
    booking_children: { ar: 'عدد الأطفال', en: 'Number of Children' },
    booking_room_type: { ar: 'نوع الغرفة', en: 'Room Type' },
    booking_rooms: { ar: 'عدد الغرف', en: 'Number of Rooms' },
    booking_requests: { ar: 'طلبات خاصة', en: 'Special Requests' },
    booking_terms: { ar: 'أوافق على الشروط والأحكام', en: 'I agree to the Terms & Conditions' },
    booking_submit: { ar: 'احجز الآن', en: 'Book Now' },
    
    // Form Errors
    name_error: { ar: 'الاسم مطلوب', en: 'Name is required' },
    email_error: { ar: 'بريد إلكتروني غير صالح', en: 'Invalid email address' },
    phone_error: { ar: 'رقم هاتف غير صالح', en: 'Invalid phone number' },
    subject_error: { ar: 'الموضوع مطلوب', en: 'Subject is required' },
    message_error: { ar: 'الرسالة مطلوبة', en: 'Message is required' },
    date_error: { ar: 'يرجى اختيار تاريخ صحيح', en: 'Please select a valid date' },
    country_error: { ar: 'يرجى اختيار الدولة', en: 'Please select a country' },
    room_error: { ar: 'يرجى اختيار نوع الغرفة', en: 'Please select a room type' },
    number_error: { ar: 'يجب أن يكون العدد 1 على الأقل', en: 'Number must be at least 1' },
    terms_error: { ar: 'يجب الموافقة على الشروط', en: 'You must agree to the terms' }
  };

  // ============================================
  // 2. LANGUAGE STATE
  // ============================================
  let currentLang = localStorage.getItem('hotelLang') || 'ar';

  // ============================================
  // 3. DOM ELEMENTS WITH DATA-TRANSLATE
  // ============================================
  function getTranslateElements() {
    return document.querySelectorAll('[data-translate]');
  }

  // ============================================
  // 4. TRANSLATE FUNCTION
  // ============================================
  function translatePage(lang) {
    const elements = getTranslateElements();
    
    elements.forEach(function(el) {
      const key = el.getAttribute('data-translate');
      const translation = translations[key];
      
      if (translation && translation[lang]) {
        // Handle different element types
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          if (el.hasAttribute('placeholder')) {
            el.setAttribute('placeholder', translation[lang]);
          }
        } else if (el.tagName === 'BUTTON' || el.tagName === 'A') {
          if (el.classList.contains('lang-switch')) {
            // Skip language switch button
            return;
          }
          el.textContent = translation[lang];
        } else {
          el.textContent = translation[lang];
        }
      }
    });

    // Update HTML lang and dir attributes
    document.documentElement.lang = lang;
    if (lang === 'ar') {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }

    // Update language switch button
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
      const nextLang = lang === 'ar' ? 'en' : 'ar';
      langToggle.textContent = nextLang.toUpperCase();
      langToggle.setAttribute('data-lang', nextLang);
      langToggle.setAttribute('aria-label', 'تبديل اللغة إلى ' + (nextLang === 'en' ? 'الإنجليزية' : 'العربية'));
    }

    // Save to localStorage
    localStorage.setItem('hotelLang', lang);
    currentLang = lang;

    // Trigger custom event for other scripts
    document.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang: lang } }));
  }

  // ============================================
  // 5. LANGUAGE SWITCH HANDLER
  // ============================================
  function initLanguage() {
    const langToggle = document.getElementById('langToggle');
    
    // Set initial language
    translatePage(currentLang);

    if (langToggle) {
      langToggle.addEventListener('click', function(e) {
        e.preventDefault();
        const current = currentLang;
        const next = current === 'ar' ? 'en' : 'ar';
        translatePage(next);
      });
    }

    // Listen for language changes from other scripts
    document.addEventListener('languageChanged', function(e) {
      // Re-run any additional translations if needed
    });
  }

  // ============================================
  // 6. EXPOSE FOR OTHER SCRIPTS
  // ============================================
  window.HotelTranslations = {
    translate: translatePage,
    getCurrentLang: function() { return currentLang; },
    getAllTranslations: function() { return translations; },
    getTranslation: function(key, lang) {
      const t = translations[key];
      return t ? t[lang] : null;
    }
  };

  // ============================================
  // 7. INIT ON DOM READY
  // ============================================
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLanguage);
  } else {
    initLanguage();
  }

  // Also re-translate when new content is loaded dynamically
  // This can be called by other scripts
  window.reTranslate = function() {
    translatePage(currentLang);
  };

})();