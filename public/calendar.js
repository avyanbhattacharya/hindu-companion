// Location-Aware Hindu Devotional Calendar & Astronomical Observance Data
// Sourced with transparent calculation rules: Udaya Tithi, Nishita Kala, and local sunrise/sunset
window.BHAKTI_CALENDAR = {
  locations: {
    phoenix: {
      id: "phoenix",
      name: "Phoenix, Arizona",
      region: "North America (MST / UTC-7)",
      tz: "America/Phoenix",
      lat: 33.4484,
      lon: -112.0740,
      sunriseApprox: "06:08 AM",
      sunsetApprox: "06:48 PM",
      convention: "Vaishnava / Local Sunrise (Udaya Tithi at MST)"
    },
    kolkata: {
      id: "kolkata",
      name: "Kolkata, West Bengal",
      region: "India (IST / UTC+5:30)",
      tz: "Asia/Kolkata",
      lat: 22.5726,
      lon: 88.3639,
      sunriseApprox: "05:22 AM",
      sunsetApprox: "05:48 PM",
      convention: "Vaishnava / Local Sunrise (Udaya Tithi at IST)"
    },
    newyork: {
      id: "newyork",
      name: "New York, NY",
      region: "North America (EDT / UTC-4)",
      tz: "America/New_York",
      lat: 40.7128,
      lon: -74.0060,
      sunriseApprox: "06:27 AM",
      sunsetApprox: "07:15 PM",
      convention: "Vaishnava / Local Sunrise (Udaya Tithi at EDT)"
    },
    london: {
      id: "london",
      name: "London, UK",
      region: "Europe (BST / UTC+1)",
      tz: "Europe/London",
      lat: 51.5074,
      lon: -0.1278,
      sunriseApprox: "06:19 AM",
      sunsetApprox: "07:38 PM",
      convention: "Vaishnava / Local Sunrise (Udaya Tithi at BST)"
    }
  },

  // Observances curated by location to reflect astronomical shifts
  events: [
    {
      id: "janmashtami-2026",
      title: "Sri Krishna Janmashtami",
      titleOriginal: "श्री कृष्ण जन्माष्टमी",
      significance: "Appearance Day of the Supreme Personality of Godhead, Lord Sri Krishna in Mathura at midnight.",
      guideId: "janmashtami",
      relatedSongs: ["hare-krishna-mahamantra", "jaya-radha-madhava", "madhurashtakam", "damodarashtakam"],
      fasting: "Fast until midnight (Nishita Kala). Phalahar/non-grain feast following midnight abhisheka.",
      dates: {
        phoenix: { date: "September 3, 2026", weekday: "Thursday", tithi: "Ashtami begins evening, Nishita puja midnight" },
        kolkata: { date: "September 4, 2026", weekday: "Friday", tithi: "Krishna Ashtami prevalent at midnight in IST" },
        newyork: { date: "September 3, 2026", weekday: "Thursday", tithi: "Krishna Ashtami during midnight Nishita Kala" },
        london: { date: "September 4, 2026", weekday: "Friday", tithi: "Krishna Ashtami during midnight Nishita Kala" }
      }
    },
    {
      id: "radhashtami-2026",
      title: "Srimati Radhashtami",
      titleOriginal: "श्रीमती राधाष्टमी / শ্রীমতি রাধাষ্টমী",
      significance: "The divine appearance day of Srimati Radharani, the internal pleasure potency (Hladini Shakti) of Lord Krishna.",
      guideId: "radhashtami",
      relatedSongs: ["radhe-jaya-jaya-madhava-dayite", "jaya-radha-madhava", "hare-krishna-mahamantra"],
      fasting: "Fast until noon (Madhyahna). Grains and feast served following midday abhisheka and aarti.",
      dates: {
        phoenix: { date: "September 18, 2026", weekday: "Friday", tithi: "Shukla Ashtami at midday" },
        kolkata: { date: "September 19, 2026", weekday: "Saturday", tithi: "Shukla Ashtami at midday" },
        newyork: { date: "September 18, 2026", weekday: "Friday", tithi: "Shukla Ashtami at midday" },
        london: { date: "September 19, 2026", weekday: "Saturday", tithi: "Shukla Ashtami at midday" }
      }
    },
    {
      id: "parivartini-ekadashi-2026",
      title: "Parsva / Parivartini Ekadashi",
      titleOriginal: "पार्श्व / परिवर्तिनी एकादशी",
      significance: "The day Lord Vishnu turns over on His side while sleeping during Chaturmasya. Observance removes past accumulated faults.",
      guideId: "ekadashi",
      relatedSongs: ["hare-krishna-mahamantra", "sri-guru-pranam", "vaishnava-pranam"],
      fasting: "Complete grain and bean fast. Vegetables, fruits, milk products, and root crops permitted (Phalahar).",
      dates: {
        phoenix: { date: "September 21, 2026", weekday: "Monday", tithi: "Shukla Ekadashi (Parana Sept 22 06:12 - 10:05 AM)" },
        kolkata: { date: "September 22, 2026", weekday: "Tuesday", tithi: "Shukla Ekadashi (Parana Sept 23 05:27 - 09:30 AM)" },
        newyork: { date: "September 22, 2026", weekday: "Tuesday", tithi: "Shukla Ekadashi (Parana Sept 23 06:33 - 10:15 AM)" },
        london: { date: "September 22, 2026", weekday: "Tuesday", tithi: "Shukla Ekadashi (Parana Sept 23 06:35 - 10:20 AM)" }
      }
    },
    {
      id: "damodara-month-2026",
      title: "Beginning of Damodara Month (Kartika)",
      titleOriginal: "कार्तिक मास / दामोदर व्रत आरम्भ",
      significance: "The most auspicious devotional month of the year. Devotees offer a ghee lamp daily and sing Sri Damodarashtakam.",
      guideId: "kartika-damodara",
      relatedSongs: ["damodarashtakam", "jaya-radha-madhava", "om-jai-jagdish-hare"],
      fasting: "Special vows: avoid urad dal and eggplants; daily ghee lamp offering to Radha-Damodara morning and evening.",
      dates: {
        phoenix: { date: "October 25, 2026", weekday: "Sunday", tithi: "Sharad Purnima night / Kartika vrata begins" },
        kolkata: { date: "October 26, 2026", weekday: "Monday", tithi: "Purnimanta Kartika begins" },
        newyork: { date: "October 25, 2026", weekday: "Sunday", tithi: "Sharad Purnima night / Kartika vrata begins" },
        london: { date: "October 26, 2026", weekday: "Monday", tithi: "Sharad Purnima / Kartika vrata begins" }
      }
    },
    {
      id: "diwali-govardhan-2026",
      title: "Diwali & Dipavali Deepotsava",
      titleOriginal: "दीपावली ও গোবর্ধন পূজা",
      significance: "The festival of lights welcoming Sri Rama's return to Ayodhya, and Mother Yashoda binding Krishna with pure love.",
      guideId: "diwali-govardhan",
      relatedSongs: ["damodarashtakam", "om-jai-jagdish-hare", "jaya-radha-madhava"],
      fasting: "Evening illumination; offering heaps of sweets and food (Annakuta) on Govardhan Puja following day.",
      dates: {
        phoenix: { date: "November 8, 2026", weekday: "Sunday", tithi: "Kartika Krishna Amavasya (Govardhan Puja Nov 9)" },
        kolkata: { date: "November 8, 2026", weekday: "Sunday", tithi: "Kartika Amavasya Deepavali (Govardhan Puja Nov 10)" },
        newyork: { date: "November 8, 2026", weekday: "Sunday", tithi: "Kartika Amavasya (Govardhan Puja Nov 9)" },
        london: { date: "November 8, 2026", weekday: "Sunday", tithi: "Kartika Amavasya (Govardhan Puja Nov 9)" }
      }
    },
    {
      id: "maha-shivaratri-2027",
      title: "Maha Shivaratri",
      titleOriginal: "महाशिवरात्रि",
      significance: "The great night of Lord Shiva, celebrating His descent and supreme meditation, and His marriage to Devi Parvati.",
      guideId: "shivaratri",
      relatedSongs: ["maha-mrityunjaya-mantra", "om-jai-jagdish-hare"],
      fasting: "All-night fast and vigil. Bilva leaf offerings, milk abhisheka during four quarters of the night.",
      dates: {
        phoenix: { date: "March 6, 2027", weekday: "Saturday", tithi: "Phalguna Krishna Chaturdashi Nishita Kala" },
        kolkata: { date: "March 6, 2027", weekday: "Saturday", tithi: "Phalguna Krishna Chaturdashi Nishita Kala" },
        newyork: { date: "March 6, 2027", weekday: "Saturday", tithi: "Phalguna Krishna Chaturdashi Nishita Kala" },
        london: { date: "March 6, 2027", weekday: "Saturday", tithi: "Phalguna Krishna Chaturdashi Nishita Kala" }
      }
    },
    {
      id: "gaura-purnima-2027",
      title: "Sri Gaura Purnima",
      titleOriginal: "শ্রী গৌর পূর্ণিমা / श्री गौर पूर्णिमा",
      significance: "The auspicious appearance day of Sri Chaitanya Mahaprabhu (the Golden Avatara) in Sridhama Mayapur.",
      guideId: "gaura-purnima",
      relatedSongs: ["gaura-aarti", "bhaja-gauranga", "pancha-tattva-mantra", "hare-krishna-mahamantra"],
      fasting: "Fast until moonrise. Anukalpa (non-grain feast) following moonrise darshan, full feast next morning.",
      dates: {
        phoenix: { date: "March 22, 2027", weekday: "Monday", tithi: "Phalguna Purnima at moonrise" },
        kolkata: { date: "March 22, 2027", weekday: "Monday", tithi: "Phalguna Purnima at moonrise" },
        newyork: { date: "March 22, 2027", weekday: "Monday", tithi: "Phalguna Purnima at moonrise" },
        london: { date: "March 22, 2027", weekday: "Monday", tithi: "Phalguna Purnima at moonrise" }
      }
    },
    {
      id: "rama-navami-2027",
      title: "Sri Rama Navami",
      titleOriginal: "श्री राम नवमी",
      significance: "The appearance day of Lord Sri Ramachandra in Ayodhya at midday.",
      guideId: "rama-navami",
      relatedSongs: ["hanuman-chalisa", "hare-krishna-mahamantra", "om-jai-jagdish-hare"],
      fasting: "Fast until midday (12:00 PM). Chanting Sundarkand, Hanuman Chalisa, and Ramcharitmanas.",
      dates: {
        phoenix: { date: "April 15, 2027", weekday: "Thursday", tithi: "Chaitra Shukla Navami at midday" },
        kolkata: { date: "April 15, 2027", weekday: "Thursday", tithi: "Chaitra Shukla Navami at midday" },
        newyork: { date: "April 15, 2027", weekday: "Thursday", tithi: "Chaitra Shukla Navami at midday" },
        london: { date: "April 15, 2027", weekday: "Thursday", tithi: "Chaitra Shukla Navami at midday" }
      }
    }
  ]
};
