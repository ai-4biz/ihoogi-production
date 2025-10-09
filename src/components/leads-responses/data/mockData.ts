// Mock data for leads and comments analytics
export const mockLeads = [
  {
    id: 1,
    name: "דני לוי",
    email: "dani@example.com",
    phone: "050-1234567",
    message: "אשמח לפרטים נוספים על השירותים שלכם. אני מחפש פתרון שיכול לעזור בניהול התוכן השיווקי של העסק שלי.",
    date: "15.05.2025",
    status: "new",
    source: "אתר",
    automationType: "AI",
    questionnaire: "טופס צור קשר",
    partner: "דני כהן",
    questionnaireAnswers: {
      "שם מלא": "דני לוי",
      "אימייל": "dani@example.com",
      "טלפון": "050-1234567",
      "נושא הפנייה": "שירותי ניהול תוכן",
      "הודעה": "אשמח לפרטים נוספים על השירותים שלכם"
    }
  },
  {
    id: 2,
    name: "שירה כהן",
    email: "shira@example.com",
    phone: "052-7654321",
    message: "מחפשת ייעוץ בנושא קידום ברשתות חברתיות. האם ניתן לקבוע שיחת התייעצות? אשמח לשוחח על אפשרויות שיתוף פעולה.",
    date: "14.05.2025",
    status: "contacted",
    source: "WhatsApp",
    automationType: "תבנית",
    questionnaire: "טופס צור קשר",
    partner: "יעל לוי",
    questionnaireAnswers: {
      "שם מלא": "שירה כהן",
      "אימייל": "shira@example.com",
      "טלפון": "052-7654321",
      "נושא הפנייה": "קידום ברשתות חברתיות",
      "הודעה": "מחפשת ייעוץ בנושא קידום ברשתות חברתיות"
    }
  },
  {
    id: 3,
    name: "יוסי אברהם",
    email: "yossi@example.com",
    phone: "054-9876543",
    message: "מעוניין בהצעת מחיר עבור שירותי כתיבת תוכן. אנחנו חברה בתחום הביטוח ומחפשים לשפר את הנוכחות הדיגיטלית שלנו.",
    date: "13.05.2025",
    status: "new",
    source: "LinkedIn",
    automationType: "משולב",
    questionnaire: "טופס צור קשר",
    partner: "",
    questionnaireAnswers: {
      "שם מלא": "יוסי אברהם",
      "אימייל": "yossi@example.com",
      "טלפון": "054-9876543",
      "נושא הפנייה": "כתיבת תוכן",
      "הודעה": "מעוניין בהצעת מחיר עבור שירותי כתיבת תוכן"
    }
  },
  {
    id: 4,
    name: "מיכל שרון",
    email: "michal@example.com",
    phone: "053-1112222",
    message: "קראתי את המאמר שלכם על שיווק דיגיטלי ואני מתעניינת בשירותי הקידום במדיה חברתית שאתם מציעים.",
    date: "12.05.2025",
    status: "open",
    source: "Facebook",
    automationType: "תבנית",
    questionnaire: "טופס צור קשר",
    partner: "רון אבני",
    questionnaireAnswers: {
      "שם מלא": "מיכל שרון",
      "אימייל": "michal@example.com",
      "טלפון": "053-1112222",
      "נושא הפנייה": "שיווק דיגיטלי",
      "הודעה": "קראתי את המאמר שלכם על שיווק דיגיטלי"
    }
  },
  {
    id: 5,
    name: "אריה גולן",
    email: "arie@example.com",
    phone: "058-5556666",
    message: "אני מחפש מישהו שיכול לעזור לנו עם אסטרטגיית שיווק לעסק חדש שאנחנו מקימים בתחום ההייטק.",
    date: "10.05.2025",
    status: "closed",
    source: "Instagram",
    automationType: "AI",
    questionnaire: "טופס צור קשר",
    partner: "מיכל גרין",
    questionnaireAnswers: {
      "שם מלא": "אריה גולן",
      "אימייל": "arie@example.com",
      "טלפון": "058-5556666",
      "נושא הפנייה": "אסטרטגיית שיווק",
      "הודעה": "אני מחפש מישהו שיכול לעזור לנו עם אסטרטגיית שיווק"
    }
  }
];

export const mockComments = [
  {
    id: "c1",
    username: "רוני לוי",
    platform: "facebook",
    date: "היום, 10:30",
    comment: "היי, האם יש לכם שירות של ייעוץ אונליין? מעוניין לקבל פרטים.",
    post: "שירותים חדשים לעסקים",
    replied: false
  },
  {
    id: "c2",
    username: "מיכל כהן",
    platform: "instagram",
    date: "אתמול, 14:20",
    comment: "תודה רבה על המאמר המעולה! ממש עזר לי להבין את הנושא.",
    post: "איך לבנות אסטרטגיית תוכן",
    replied: true
  },
  {
    id: "c3",
    username: "יוסי אברהם",
    platform: "facebook",
    date: "לפני 3 ימים",
    comment: "לא מרוצה מהשירות שקיבלתי, אשמח שתחזרו אליי בהקדם.",
    post: "שיפרנו את השירות ללקוחות",
    replied: false
  },
  {
    id: "c4",
    username: "דנה שרון",
    platform: "linkedin",
    date: "לפני שבוע",
    comment: "האם אפשר לקבל פרטים על המחירון החדש? לא מצאתי באתר.",
    post: "שינויי מחירים 2024",
    replied: true
  },
  {
    id: "c5",
    username: "שלמה יעקב",
    platform: "instagram",
    date: "לפני שבועיים",
    comment: "נהניתי מאוד מהתוכן שאתם מעלים, תמשיכו כך!",
    post: "5 טיפים לשיווק דיגיטלי",
    replied: true
  },
  {
    id: "c6",
    username: "עדי גולן",
    platform: "facebook",
    date: "לפני יומיים",
    comment: "יש לי שאלה לגבי המוצר החדש. האם הוא מתאים גם לעסקים קטנים?",
    post: "השקת מוצר חדש",
    replied: false
  }
];

export const leadsAnalytics = {
  total: 45,
  thisWeek: 12,
  conversionRate: "28%",
  sources: [
    { name: "טופס צור קשר", count: 18 },
    { name: "וואטסאפ", count: 15 },
    { name: "אימייל", count: 12 }
  ],
  responseTime: "4.5 שעות בממוצע"
};

export const commentsAnalytics = {
  total: 87,
  thisWeek: 23,
  positiveRate: "76%",
  platforms: [
    { name: "פייסבוק", count: 42 },
    { name: "אינסטגרם", count: 31 },
    { name: "לינקדאין", count: 14 }
  ],
  popularPosts: [
    { title: "5 טיפים לשיווק דיגיטלי", comments: 18 },
    { title: "איך לשפר את הנראות ברשת", comments: 12 }
  ]
};
