// Generated from BankSphere's approved tour script (data/tour/lessons.json). All data shown is synthetic.
export type TourLang = "en" | "ur";
export type TourLesson = { id: string; title: Record<TourLang,string>; steps: Record<TourLang,string>[] };
export const tourLessons: TourLesson[] = [
  {
    "id": "platform",
    "title": {
      "en": "The platform on one board",
      "ur": "پورا نظام ایک نظر میں"
    },
    "steps": [
      {
        "en": "BankSphere opens customer accounts, screens them and keeps compliance mapped to policy. Every step is sealed into an audit chain that shows if anything was changed.",
        "ur": "بینک اسفیئر کسٹمر کے اکاؤنٹ کھولتا ہے، ان کی جانچ کرتا ہے اور ضوابط کو پالیسی سے جوڑے رکھتا ہے۔ ہر قدم ایک آڈٹ زنجیر میں محفوظ ہوتا ہے جو کسی بھی تبدیلی کو ظاہر کر دیتی ہے۔"
      },
      {
        "en": "AI reads the documents and regulations. Rules written in code make the first decision, and a person makes every final call on a case that needs review.",
        "ur": "مصنوعی ذہانت دستاویزات اور ضوابط پڑھتی ہے۔ کوڈ میں لکھے اصول پہلا فیصلہ کرتے ہیں، اور جس کیس کو جانچ کی ضرورت ہو اس کا آخری فیصلہ ایک انسان کرتا ہے۔"
      }
    ]
  },
  {
    "id": "onboarding",
    "title": {
      "en": "Customer onboarding",
      "ur": "کسٹمر کا اندراج"
    },
    "steps": [
      {
        "en": "A customer opens an account with a photo of their identity card. The file type and size are checked, and the case gets its own audit chain from the first step.",
        "ur": "کسٹمر اپنے شناختی کارڈ کی تصویر سے اکاؤنٹ کھولتا ہے۔ فائل کی قسم اور سائز جانچے جاتے ہیں، اور پہلے قدم سے کیس کی اپنی آڈٹ زنجیر بنتی ہے۔"
      },
      {
        "en": "The customer gets a case ID and a private access token to check progress. The status they see is generic: a confirmed financial-crime match reads only as under review, so nobody is tipped off.",
        "ur": "کسٹمر کو کیس نمبر اور ایک نجی ٹوکن ملتا ہے۔ انہیں عام سی حالت دکھائی جاتی ہے: مالی جرم کا تصدیق شدہ میچ صرف زیرِ جائزہ لکھا آتا ہے، تاکہ کسی کو خبر نہ ہو۔"
      }
    ]
  },
  {
    "id": "officer-gate",
    "title": {
      "en": "The officer desk and the human gate",
      "ur": "افسر کی میز اور انسانی فیصلہ"
    },
    "steps": [
      {
        "en": "Cases that need a person wait here. Plain rules in code decide first: only a low-risk case where every check passes and nothing matches a watchlist is approved automatically.",
        "ur": "جن کیسوں کو انسان کی ضرورت ہو وہ یہاں انتظار کرتے ہیں۔ پہلے کوڈ کے سادہ اصول فیصلہ کرتے ہیں: صرف کم خطرے والا کیس، جس کی ہر جانچ پاس ہو اور کوئی واچ لسٹ میچ نہ ہو، خود بخود منظور ہوتا ہے۔"
      },
      {
        "en": "Open the first case. The officer sees what was read from the card, the screening result and the risk score with the factors behind it.",
        "ur": "پہلا کیس کھولیں۔ افسر کارڈ سے پڑھی گئی تفصیل، اسکریننگ کا نتیجہ اور خطرے کا اسکور اس کی وجوہات کے ساتھ دیکھتا ہے۔"
      },
      {
        "en": "The model can explain a decision but never make one. The officer approves or rejects with a written reason, and that reason is saved in the case's audit trail.",
        "ur": "ماڈل فیصلے کی وضاحت کر سکتا ہے مگر فیصلہ نہیں کر سکتا۔ افسر تحریری وجہ کے ساتھ منظور یا مسترد کرتا ہے، اور وہ وجہ کیس کی آڈٹ ٹریل میں محفوظ ہوتی ہے۔"
      }
    ]
  },
  {
    "id": "detective",
    "title": {
      "en": "Detective and Challenge the AI",
      "ur": "ڈیٹیکٹو اور اے آئی کو چیلنج"
    },
    "steps": [
      {
        "en": "The Detective answers questions about one case from that case's own audit records. Open a case first; the Detective tab sits next to Overview.",
        "ur": "ڈیٹیکٹو کسی ایک کیس کے بارے میں سوالوں کا جواب اسی کیس کے آڈٹ ریکارڈ سے دیتا ہے۔ پہلے کیس کھولیں؛ ڈیٹیکٹو کا ٹیب اوورویو کے ساتھ ہے۔"
      },
      {
        "en": "Ask why the case was referred. Every sentence in the answer must point at a record; plain code checks each one, and any sentence the checks do not pass is withheld rather than shown.",
        "ur": "پوچھیں کہ کیس کیوں بھیجا گیا۔ جواب کے ہر جملے کو کسی ریکارڈ کا حوالہ دینا ہوتا ہے؛ سادہ کوڈ ہر جملہ جانچتا ہے، اور جو جملہ جانچ میں پاس نہ ہو وہ دکھانے کے بجائے روک لیا جاتا ہے۔"
      },
      {
        "en": "An officer who doubts an answer can challenge it. Every sentence is checked again against the evidence as it was, with the officer's reason recorded.",
        "ur": "جو افسر کسی جواب پر شک کرے وہ اسے چیلنج کر سکتا ہے۔ ہر جملہ دوبارہ اُس وقت کے ثبوت سے جانچا جاتا ہے، اور افسر کی وجہ درج ہوتی ہے۔"
      }
    ]
  },
  {
    "id": "copilot",
    "title": {
      "en": "BankSphere Copilot",
      "ur": "بینک اسفیئر کوپائلٹ"
    },
    "steps": [
      {
        "en": "The Copilot answers questions across cases, policies and obligations. It only reads: its tools look records up and change nothing.",
        "ur": "کوپائلٹ کیسوں، پالیسیوں اور ذمہ داریوں کے بارے میں سوالوں کے جواب دیتا ہے۔ یہ صرف پڑھتا ہے: اس کے اوزار ریکارڈ دیکھتے ہیں، کچھ نہیں بدلتے۔"
      },
      {
        "en": "Ask a question. The answer cites its records, and a sentence the checks do not pass is withheld and listed apart.",
        "ur": "سوال پوچھیں۔ جواب اپنے ریکارڈ کا حوالہ دیتا ہے، اور جو جملہ جانچ میں پاس نہ ہو وہ روک کر الگ دکھایا جاتا ہے۔"
      },
      {
        "en": "Now ask it to approve a case. The request is refused in code before any model sees it, and the Copilot points to the review screen where a person decides.",
        "ur": "اب اس سے کیس منظور کرنے کو کہیں۔ یہ درخواست کسی ماڈل تک پہنچنے سے پہلے ہی کوڈ میں رد ہو جاتی ہے، اور کوپائلٹ جائزے کی اسکرین کی طرف بھیجتا ہے جہاں انسان فیصلہ کرتا ہے۔"
      }
    ]
  },
  {
    "id": "time-machine",
    "title": {
      "en": "Time Machine",
      "ur": "ٹائم مشین"
    },
    "steps": [
      {
        "en": "The Time Machine replays a decided case under another version of the decision rule. Open a case and its Time Machine tab.",
        "ur": "ٹائم مشین فیصلہ شدہ کیس کو فیصلے کے اصول کے کسی دوسرے ورژن پر دوبارہ چلاتی ہے۔ کیس اور اس کا ٹائم مشین ٹیب کھولیں۔"
      },
      {
        "en": "Pick the first rule version, RULE-KYC-RISK@1, and replay. The result shows the outcome as decided next to the outcome under that rule, with the factors that changed.",
        "ur": "پہلا ورژن RULE-KYC-RISK@1 چنیں اور دوبارہ چلائیں۔ نتیجہ اصل فیصلہ اور اس اصول کے تحت فیصلہ ساتھ ساتھ دکھاتا ہے، اور بدلنے والے عوامل بھی۔"
      },
      {
        "en": "A replay never changes the case. Its record stays exactly as it was decided; the replay is a separate look at what another rule would have done.",
        "ur": "دوبارہ چلانے سے کیس نہیں بدلتا۔ اس کا ریکارڈ ویسا ہی رہتا ہے جیسا فیصلہ ہوا تھا؛ یہ صرف ایک الگ نظر ہے کہ دوسرا اصول کیا کرتا۔"
      }
    ]
  },
  {
    "id": "digital-twin",
    "title": {
      "en": "Digital Twin",
      "ur": "ڈیجیٹل ٹوئن"
    },
    "steps": [
      {
        "en": "The Digital Twin runs a decision rule on a synthetic portfolio before it touches a real customer.",
        "ur": "ڈیجیٹل ٹوئن کسی فیصلہ کن اصول کو حقیقی کسٹمر تک پہنچنے سے پہلے مصنوعی پورٹ فولیو پر چلاتا ہے۔"
      },
      {
        "en": "Compare the first rule with the live one. Between them, the points for a cash-intensive occupation went from 15 to 25.",
        "ur": "پہلے اصول کا موجودہ اصول سے موازنہ کریں۔ دونوں کے درمیان نقد پر مبنی پیشے کے پوائنٹس 15 سے 25 ہو گئے۔"
      },
      {
        "en": "Run it. The result counts the synthetic cases, the decisions that flip and the change in officer reviews, so a rule change is measured before it goes live.",
        "ur": "چلائیں۔ نتیجہ مصنوعی کیس، بدلنے والے فیصلے اور افسر کے جائزوں میں تبدیلی گنتا ہے، تاکہ اصول کی تبدیلی لاگو ہونے سے پہلے ناپی جائے۔"
      }
    ]
  },
  {
    "id": "compliance",
    "title": {
      "en": "Compliance: regulation to policy",
      "ur": "کمپلائنس: ضابطے سے پالیسی تک"
    },
    "steps": [
      {
        "en": "A circular is ingested and validated. The model proposes the obligations it reads; a reviewer approves each one, and a mapper links it to a policy. Whoever proposes can never decide.",
        "ur": "سرکلر شامل کر کے جانچا جاتا ہے۔ ماڈل جو ذمہ داریاں پڑھتا ہے وہ تجویز کرتا ہے؛ ایک جائزہ کار ہر ایک منظور کرتا ہے، اور میپر اسے پالیسی سے جوڑتا ہے۔ جو تجویز کرے وہ کبھی فیصلہ نہیں کرتا۔"
      },
      {
        "en": "When a policy gets a new version, its blast radius ranks the cases it touches. Compliance picks cases and opens remediation tasks, which officers then work.",
        "ur": "جب کسی پالیسی کا نیا ورژن آتا ہے تو اس کا اثر کا دائرہ متاثرہ کیسوں کی درجہ بندی کرتا ہے۔ کمپلائنس کیس چن کر اصلاحی کام کھولتی ہے، جنہیں پھر افسر نمٹاتے ہیں۔"
      }
    ]
  },
  {
    "id": "fincrime",
    "title": {
      "en": "Financial-crime alerts",
      "ur": "مالی جرائم کے الرٹ"
    },
    "steps": [
      {
        "en": "Possible sanctions, PEP and adverse-media matches arrive here as alerts. The feeds in this build are synthetic.",
        "ur": "پابندیوں، سیاسی شخصیات اور منفی خبروں کے ممکنہ میچ یہاں الرٹ بن کر آتے ہیں۔ اس ورژن میں فیڈز مصنوعی ہیں۔"
      },
      {
        "en": "One officer proposes a disposition and a different officer confirms it. The same person can never do both, and every step is sealed into the alert's audit chain.",
        "ur": "ایک افسر فیصلہ تجویز کرتا ہے اور دوسرا افسر اس کی تصدیق کرتا ہے۔ ایک ہی شخص دونوں کام نہیں کر سکتا، اور ہر قدم الرٹ کی آڈٹ زنجیر میں محفوظ ہوتا ہے۔"
      }
    ]
  },
  {
    "id": "audit-governance",
    "title": {
      "en": "Audit and AI governance",
      "ur": "آڈٹ اور اے آئی کی نگرانی"
    },
    "steps": [
      {
        "en": "Every event is hash-chained, so a changed record breaks its chain. The command center verifies every chain and, where a write-once store is configured, compares it with the checkpoints there.",
        "ur": "ہر واقعہ ہیش زنجیر میں جڑا ہوتا ہے، اس لیے بدلا ہوا ریکارڈ اپنی زنجیر توڑ دیتا ہے۔ کمانڈ سینٹر ہر زنجیر جانچتا ہے، اور جہاں ایک بار لکھا جانے والا اسٹور موجود ہو وہاں اسے چیک پوائنٹس سے ملاتا ہے۔"
      },
      {
        "en": "The AI governance pack lists the models and prompt versions that ran, how often a person decided, the evaluations with their data labels, the controls and the known gaps, recounted from the records each time.",
        "ur": "اے آئی گورننس پیک بتاتا ہے کون سے ماڈل اور پرامپٹ ورژن چلے، کتنی بار انسان نے فیصلہ کیا، ڈیٹا لیبل کے ساتھ جائزے، کنٹرول اور معلوم خامیاں، اور یہ ہر بار ریکارڈ سے دوبارہ گنا جاتا ہے۔"
      }
    ]
  }
];
