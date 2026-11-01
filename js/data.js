/**
 * Lumière | لوميير - Data & Configuration
 * Pure Vanilla JavaScript (ES6+)
 */

/**
 * STORE CONFIGURATION
 * 
 * Local Images Note:
 * To use local product photography instead of remote Unsplash images,
 * place your images in an "images/" folder following this convention:
 *   images/{product-id}-1.jpg  (Main / Card image)
 *   images/{product-id}-2.jpg  (Secondary / Hover / Detail image)
 * Then set IMAGE_BASE_PATH to "images" or your CDN path.
 */
const STORE_CONFIG = {
  storeName: {
    ar: "لوميير",
    en: "Lumière"
  },
  tagline: {
    ar: "أناقة معاصرة للمرأة العصرية",
    en: "Contemporary Elegance for Modern Women"
  },
  whatsappNumber: "201017238942",
  displayPhone: "01017238942",
  currency: {
    ar: "ج.م",
    en: "EGP"
  },
  freeShippingThreshold: 1500,
  defaultShippingFee: 50,
  imageBasePath: "images", // Set to "images" to enable local files: images/{id}-1.jpg
  instagramHandle: "@lumiere.egypt",
  facebookHandle: "lumiere.fashion.eg",
  workingHours: {
    ar: "يومياً من ١٠ صباحاً إلى ١١ مساءً",
    en: "Daily 10:00 AM – 11:00 PM"
  }
};

// Elegant blush gradient SVG placeholder for broken or missing images (Quotes fully encoded as %22)
const LUMIERE_FALLBACK_IMAGE = "data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 400 533%22%3E%3Cdefs%3E%3ClinearGradient id=%22bg%22 x1=%220%22 y1=%220%22 x2=%221%22 y2=%221%22%3E%3Cstop offset=%220%25%22 stop-color=%22%23FDF4F5%22/%3E%3Cstop offset=%22100%25%22 stop-color=%22%23E9C9CC%22/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width=%22400%22 height=%22533%22 fill=%22url(%23bg)%22/%3E%3Cg transform=%22translate(150, 210)%22 stroke=%22%237A2E3F%22 stroke-width=%222.5%22 fill=%22none%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22%3E%3Cpath d=%22M50 20 C50 10, 38 6, 30 16 C22 26, 48 34, 50 44 L90 72 L10 72 Z%22/%3E%3Cpath d=%22M10 72 L90 72%22/%3E%3Cpath d=%22M32 72 L22 105 L78 105 L68 72%22/%3E%3C/g%3E%3Ctext x=%22200%22 y=%22360%22 font-family=%22sans-serif%22 font-size=%2215%22 fill=%22%237A2E3F%22 font-weight=%22600%22 letter-spacing=%222%22 text-anchor=%22middle%22%3ELUMI%C3%88RE%3C/text%3E%3C/svg%3E";

const GOVERNORATES = [
  { id: "cairo", name_ar: "القاهرة", name_en: "Cairo", fee: 50, deliveryDays: "1-2" },
  { id: "giza", name_ar: "الجيزة", name_en: "Giza", fee: 50, deliveryDays: "1-2" },
  { id: "alexandria", name_ar: "الإسكندرية", name_en: "Alexandria", fee: 65, deliveryDays: "2-3" },
  { id: "qalyubia", name_ar: "القليوبية", name_en: "Qalyubia", fee: 65, deliveryDays: "2-3" },
  { id: "dakahlia", name_ar: "الدقهلية (المنصورة)", name_en: "Dakahlia (Mansoura)", fee: 65, deliveryDays: "2-4" },
  { id: "sharqia", name_ar: "الشرقية (الزقازيق)", name_en: "Sharqia (Zagazig)", fee: 65, deliveryDays: "2-4" },
  { id: "gharbia", name_ar: "الغربية (طنطا)", name_en: "Gharbia (Tanta)", fee: 65, deliveryDays: "2-4" },
  { id: "monufia", name_ar: "المنوفية (شبين الكوم)", name_en: "Monufia", fee: 65, deliveryDays: "2-4" },
  { id: "beheira", name_ar: "البحيرة (دمنهور)", name_en: "Beheira (Damanhur)", fee: 65, deliveryDays: "2-4" },
  { id: "kafr_sheikh", name_ar: "كفر الشيخ", name_en: "Kafr El Sheikh", fee: 65, deliveryDays: "2-4" },
  { id: "damietta", name_ar: "دمياط", name_en: "Damietta", fee: 65, deliveryDays: "2-4" },
  { id: "port_said", name_ar: "بورسعيد", name_en: "Port Said", fee: 70, deliveryDays: "2-4" },
  { id: "ismailia", name_ar: "الإسماعيلية", name_en: "Ismailia", fee: 70, deliveryDays: "2-4" },
  { id: "suez", name_ar: "السويس", name_en: "Suez", fee: 70, deliveryDays: "2-4" },
  { id: "fayoum", name_ar: "الفيوم", name_en: "Fayoum", fee: 80, deliveryDays: "3-5" },
  { id: "beni_suef", name_ar: "بني سويف", name_en: "Beni Suef", fee: 80, deliveryDays: "3-5" },
  { id: "minya", name_ar: "المنيا", name_en: "Minya", fee: 85, deliveryDays: "3-5" },
  { id: "asyut", name_ar: "أسيوط", name_en: "Asyut", fee: 85, deliveryDays: "3-5" },
  { id: "sohag", name_ar: "سوهاج", name_en: "Sohag", fee: 85, deliveryDays: "3-5" },
  { id: "qena", name_ar: "قنا", name_en: "Qena", fee: 90, deliveryDays: "3-5" },
  { id: "luxor", name_ar: "الأقصر", name_en: "Luxor", fee: 90, deliveryDays: "3-5" },
  { id: "aswan", name_ar: "أسوان", name_en: "Aswan", fee: 95, deliveryDays: "4-6" },
  { id: "red_sea", name_ar: "البحر الأحمر (الغردقة)", name_en: "Red Sea (Hurghada)", fee: 100, deliveryDays: "4-6" },
  { id: "matrouh", name_ar: "مطروح والساحل الشمالي", name_en: "Matrouh & North Coast", fee: 100, deliveryDays: "4-6" },
  { id: "new_valley", name_ar: "الوادي الجديد", name_en: "New Valley", fee: 110, deliveryDays: "4-7" },
  { id: "north_sinai", name_ar: "شمال سيناء (العريش)", name_en: "North Sinai (Arish)", fee: 110, deliveryDays: "4-7" },
  { id: "south_sinai", name_ar: "جنوب سيناء (شرم الشيخ)", name_en: "South Sinai (Sharm)", fee: 110, deliveryDays: "4-7" }
];

const CATEGORIES = [
  { id: "all", name_ar: "الكل", name_en: "All Items", icon: "sparkles" },
  { id: "dresses", name_ar: "فساتين", name_en: "Dresses", icon: "dress" },
  { id: "abayas", name_ar: "عبايات", name_en: "Abayas", icon: "abaya" },
  { id: "tops", name_ar: "بلوزات وتيشيرتات", name_en: "Tops & Blouses", icon: "top" },
  { id: "pants", name_ar: "بناطيل وجينز", name_en: "Pants & Jeans", icon: "pants" },
  { id: "skirts", name_ar: "جيبات", name_en: "Skirts", icon: "skirt" },
  { id: "sets", name_ar: "أطقم", name_en: "Sets & Co-ords", icon: "set" },
  { id: "jackets", name_ar: "جاكيتات وكارديجان", name_en: "Jackets & Cardigans", icon: "jacket" },
  { id: "hijab", name_ar: "حجابات وإيشاربات", name_en: "Hijab & Scarves", icon: "scarf" },
  { id: "sleepwear", name_ar: "ملابس نوم", name_en: "Sleepwear", icon: "sleep" },
  { id: "activewear", name_ar: "ملابس رياضية", name_en: "Activewear", icon: "active" }
];

/**
 * 61 UNIQUE WOMEN'S FASHION PRODUCTS
 * Every product has 2 verified, non-repeating image URLs strictly matching its category and color palette.
 */
const PRODUCTS = [
  {
    "id": "dr-01",
    "name_ar": "فستان ماكسي وردي بليسيه ناعم",
    "name_en": "Lumière Pleated Silk Maxi Dress - Dusty Rose",
    "category": "dresses",
    "price": 1450,
    "oldPrice": 1750,
    "badge": "best",
    "colors": [
      {
        "name_ar": "وردي مغبر",
        "name_en": "Dusty Rose",
        "hex": "#D49B9E"
      },
      {
        "name_ar": "عاجي لؤلؤي",
        "name_en": "Pearl Ivory",
        "hex": "#F5EFE6"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=75",
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=600&q=75"
    ],
    "description_ar": "فستان ماكسي راقٍ من الشيفون الحريري المبطن بقصة بليسيه انسيابية وحزام خصر متناسق يمنحك حضوراً ساحراً في كل مناسبة.",
    "description_en": "Lined silk-blend pleated maxi dress featuring subtle cinched waist and flowing silhouette for special occasions.",
    "rating": 4.9,
    "reviewsCount": 38,
    "inStock": true
  },
  {
    "id": "dr-02",
    "name_ar": "فستان كتان صيفي أبيض بأزرار صدف",
    "name_en": "White Linen Shirt Dress with Mother-of-Pearl Buttons",
    "category": "dresses",
    "price": 980,
    "oldPrice": 1200,
    "badge": "sale",
    "colors": [
      {
        "name_ar": "أبيض ناصع",
        "name_en": "Crisp White",
        "hex": "#FFFFFF"
      },
      {
        "name_ar": "رملي طبيعي",
        "name_en": "Sand Flax",
        "hex": "#D6C7B2"
      }
    ],
    "sizes": [
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=600&q=75",
      "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=600&q=75"
    ],
    "description_ar": "فستان كتان طبيعي 100% بتصميم قميص طويل وأزرار صدفية أصلية، خفيف وبارد ومناسب للأجواء الصيفية والمصيف.",
    "description_en": "Crafted from 100% pure Egyptian linen with shell buttons, side pockets, and roll-up sleeves for breezy days.",
    "rating": 4.8,
    "reviewsCount": 24,
    "inStock": true
  },
  {
    "id": "dr-03",
    "name_ar": "فستان سهرة كحلي كريب بأكمام واسعة",
    "name_en": "Royal Navy Crepe Evening Gown with Flared Sleeves",
    "category": "dresses",
    "price": 1850,
    "oldPrice": 2200,
    "badge": "new",
    "colors": [
      {
        "name_ar": "كحلي داكن",
        "name_en": "Royal Navy",
        "hex": "#1C2742"
      },
      {
        "name_ar": "أسود ليلي",
        "name_en": "Midnight Black",
        "hex": "#181818"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=600&q=75",
      "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=600&q=75"
    ],
    "description_ar": "فستان سهرة محتشم من الكريب الثقيل بتفاصيل متدفقة وياقة كلاسيكية وقصة أنيقة تبرز جمال القوام برقي ووقار.",
    "description_en": "Modest evening gown tailored from heavy structured drape crepe with graceful flutter sleeves and clean neckline.",
    "rating": 5,
    "reviewsCount": 19,
    "inStock": true
  },
  {
    "id": "dr-04",
    "name_ar": "فستان مشجر طبقات بألوان الباستيل",
    "name_en": "Tiered Floral Pastel Midi Dress",
    "category": "dresses",
    "price": 890,
    "oldPrice": null,
    "badge": "new",
    "colors": [
      {
        "name_ar": "زهري باستيل",
        "name_en": "Pastel Flora",
        "hex": "#E8B4B8"
      },
      {
        "name_ar": "بيج زهر",
        "name_en": "Soft Cream Flora",
        "hex": "#F3E4DC"
      }
    ],
    "sizes": [
      "Free Size (يناسب S-XL)"
    ],
    "images": [
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=600&q=75",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=75"
    ],
    "description_ar": "فستان فيسكوز خفيف بطبقات كشكش أنثوية ونقشات زهور هادئة مستوحاة من ربيع القاهرة، مريح وعملي للخروجات اليومية.",
    "description_en": "Flowy tiered wrap dress made from breathable viscose in delicate botanical prints, perfect for sunny strolls.",
    "rating": 4.7,
    "reviewsCount": 42,
    "inStock": true
  },
  {
    "id": "dr-05",
    "name_ar": "فستان قطن مصري مطرز يدوياً بالصدر",
    "name_en": "Hand-Embroidered Egyptian Cotton Midi",
    "category": "dresses",
    "price": 1150,
    "oldPrice": 1350,
    "badge": "sale",
    "colors": [
      {
        "name_ar": "كريمي دافئ",
        "name_en": "Warm Cream",
        "hex": "#F7F2E7"
      },
      {
        "name_ar": "أزرق سماوي",
        "name_en": "Sky Mist",
        "hex": "#A5BDD4"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=600&q=75",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=75"
    ],
    "description_ar": "فستان من القطن المصري الفاخر مطرز بخيوط حريرية عند الصدر والياقة، تصميم متوازن يجمع بين التراث والأناقة اليومية.",
    "description_en": "Fine Egyptian cotton dress with artisanal thread work along neckline and bodice, complete with discreet in-seam pockets.",
    "rating": 4.9,
    "reviewsCount": 16,
    "inStock": true
  },
  {
    "id": "dr-06",
    "name_ar": "فستان كتان جملي بياقة بليزر وحزام",
    "name_en": "Tailored Linen Blazer Dress - Camel",
    "category": "dresses",
    "price": 1320,
    "oldPrice": null,
    "badge": null,
    "colors": [
      {
        "name_ar": "جملي كلاسيك",
        "name_en": "Classic Camel",
        "hex": "#B88655"
      },
      {
        "name_ar": "زيتوني هادئ",
        "name_en": "Muted Olive",
        "hex": "#6F7560"
      }
    ],
    "sizes": [
      "M",
      "L",
      "XL"
    ],
    "images": [
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=600&q=75",
      "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?auto=format&fit=crop&w=600&q=75"
    ],
    "description_ar": "فستان بليزر أنيق مزدوج الأزرار مع حزام خصر عريض وإبزيم عاجي، يمكن ارتداؤه منفرداً أو ككارديجان مفتوح فوق بنطلون.",
    "description_en": "Versatile double-breasted coat-dress in structured linen blend with a matching belt. Can be styled open or closed.",
    "rating": 4.6,
    "reviewsCount": 11,
    "inStock": true
  },
  {
    "id": "dr-07",
    "name_ar": "فستان تراكوتا ترابي بياقة مربعة",
    "name_en": "Terracotta Square-Neck A-Line Maxi Dress",
    "category": "dresses",
    "price": 1050,
    "oldPrice": 1250,
    "badge": "best",
    "colors": [
      {
        "name_ar": "تراكوتا ترابي",
        "name_en": "Earthy Terracotta",
        "hex": "#C46548"
      },
      {
        "name_ar": "أسود كلاسيك",
        "name_en": "Classic Noir",
        "hex": "#232323"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=75",
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=75"
    ],
    "description_ar": "فستان بياقة مربعة عصرية وقصة A-line واسعة من مزيج الكتان المنسدل ببطانة خفيفة تمنع الشفافية وتضمن انتعاشك.",
    "description_en": "Flattering square-neck dress with breathable cotton lining and fluid drape, built for daytime elegance.",
    "rating": 4.8,
    "reviewsCount": 29,
    "inStock": true
  },
  {
    "id": "ab-01",
    "name_ar": "عباية كريب ملكي كوري بتطريز ذهبي",
    "name_en": "Royal Korean Crepe Abaya with Gold Thread Embroidery",
    "category": "abayas",
    "price": 1650,
    "oldPrice": 1950,
    "badge": "best",
    "colors": [
      {
        "name_ar": "أسود فاحم",
        "name_en": "Jet Black",
        "hex": "#161616"
      },
      {
        "name_ar": "كحلي ملكي",
        "name_en": "Royal Navy",
        "hex": "#1C2438"
      }
    ],
    "sizes": [
      "52",
      "54",
      "56",
      "58",
      "60"
    ],
    "images": [
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=75",
      "https://images.unsplash.com/photo-1574271143515-5cddf8da19be?auto=format&fit=crop&w=600&q=75"
    ],
    "description_ar": "عباية ملكية فاخرة من الكريب الكوري الأسود الفاحم المات، مزينة بتطريز ذهبي دقيق على الأكمام والأطراف وتأتي مع طرحة مجانية.",
    "description_en": "Non-sheer Korean crepe abaya featuring fine gold embroidery along cuffs and hem. Matching chiffon scarf included.",
    "rating": 4.9,
    "reviewsCount": 56,
    "inStock": true
  },
  {
    "id": "ab-02",
    "name_ar": "عباية لف بلونين بيج وبورغندي بوجهين",
    "name_en": "Reversible Two-Tone Wrap Abaya - Beige & Berry",
    "category": "abayas",
    "price": 1350,
    "oldPrice": null,
    "badge": "new",
    "colors": [
      {
        "name_ar": "بيج وبورغندي",
        "name_en": "Beige & Burgundy",
        "hex": "#C79D8E"
      },
      {
        "name_ar": "رمادي وكحلي",
        "name_en": "Grey & Navy",
        "hex": "#485669"
      }
    ],
    "sizes": [
      "54",
      "56",
      "58"
    ],
    "images": [
      "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&w=600&q=75",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=75"
    ],
    "description_ar": "عباية لف مبتكرة بوجهين تمنحك إطلالتين متكاملتين بقطعة واحدة، خامة متينة خفيفة الوزن ومريحة للاستخدام اليومي والعمل.",
    "description_en": "Reversible wrap abaya delivering two polished looks in one thoughtfully constructed lightweight design.",
    "rating": 4.8,
    "reviewsCount": 22,
    "inStock": true
  },
  {
    "id": "ab-03",
    "name_ar": "عباية بشت خليجي مفتوحة من خامة ندى الباردة",
    "name_en": "Cooling Nada Fabric Open Bisht Abaya",
    "category": "abayas",
    "price": 1480,
    "oldPrice": 1700,
    "badge": "sale",
    "colors": [
      {
        "name_ar": "رمادي لؤلؤي",
        "name_en": "Pearl Grey",
        "hex": "#A8A5A1"
      },
      {
        "name_ar": "موكا دافئ",
        "name_en": "Warm Mocha",
        "hex": "#836D61"
      }
    ],
    "sizes": [
      "52",
      "54",
      "56",
      "58"
    ],
    "images": [
      "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=600&q=75",
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=600&q=75"
    ],
    "description_ar": "قصة بشت واسعة وانسيابية من قماش ندى الحريري البارد، مثالية للصيف والمناسبات العائلية مع أزرار طقطق خفية للإغلاق.",
    "description_en": "Flowing Bisht cut tailored in premium cooling Nada fabric with concealed snap fasteners for versatile styling.",
    "rating": 4.9,
    "reviewsCount": 33,
    "inStock": true
  },
  {
    "id": "ab-04",
    "name_ar": "عباية كاجوال يومية بسحاب أمامي خفي",
    "name_en": "Everyday Zip-Front Casual Abaya with Pockets",
    "category": "abayas",
    "price": 990,
    "oldPrice": 1150,
    "badge": null,
    "colors": [
      {
        "name_ar": "زيتوني داكن",
        "name_en": "Deep Olive",
        "hex": "#4C5243"
      },
      {
        "name_ar": "كحلي هادئ",
        "name_en": "Muted Navy",
        "hex": "#293241"
      }
    ],
    "sizes": [
      "52",
      "54",
      "56",
      "58",
      "60"
    ],
    "images": [
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=75",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=75"
    ],
    "description_ar": "تصميم عملي مخصص للمشاوير والجامعة والدوام، مزود بسحاب أمامي ناعم وجيوب عميقة تتسع للهاتف والمحفظة بسهولة.",
    "description_en": "Streamlined everyday abaya with hidden zip closure and deep secure pockets made from wrinkle-resistant crepe.",
    "rating": 4.7,
    "reviewsCount": 65,
    "inStock": true
  },
  {
    "id": "ab-05",
    "name_ar": "عباية ساتان مطفي برونزي بأكمام درابيه",
    "name_en": "Matte Satin Bronze Abaya with Sculpted Sleeves",
    "category": "abayas",
    "price": 1750,
    "oldPrice": 2100,
    "badge": "new",
    "colors": [
      {
        "name_ar": "برونزي شامبانيا",
        "name_en": "Champagne Bronze",
        "hex": "#BFA588"
      },
      {
        "name_ar": "أسود مخملي",
        "name_en": "Velvet Black",
        "hex": "#1D1D1D"
      }
    ],
    "sizes": [
      "54",
      "56",
      "58"
    ],
    "images": [
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=75",
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=75"
    ],
    "description_ar": "قطعة متميزة تمزج بين لمعان الساتان المطفي الفاخر ودرابيه الأكمام الإيطالي، تضفي هالة من الفخامة المحتشمة لجميع الأعياد.",
    "description_en": "Refined statement abaya crafted from weighted matte satin with architectural cuff draping and flowing lines.",
    "rating": 5,
    "reviewsCount": 14,
    "inStock": true
  },
  {
    "id": "ab-06",
    "name_ar": "عباية لينين بياقة شال وتطريز ريفي ناعم",
    "name_en": "Linen Shawl-Collar Abaya with Folk Stitching",
    "category": "abayas",
    "price": 1280,
    "oldPrice": null,
    "badge": null,
    "colors": [
      {
        "name_ar": "كتاني طبيعي",
        "name_en": "Oatmeal Linen",
        "hex": "#DCD0C0"
      },
      {
        "name_ar": "أزرق نيلي",
        "name_en": "Indigo Wash",
        "hex": "#2B3A42"
      }
    ],
    "sizes": [
      "54",
      "56",
      "58"
    ],
    "images": [
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=75",
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=600&q=75"
    ],
    "description_ar": "عباية بتصميم شال مستوحى من سحر الواحات، منسوجة من خيوط الكتان العضوي مع تطريز قطني ناعم باللون الأبيض الدافئ.",
    "description_en": "Rustic charm meets modern silhouette in this natural linen abaya featuring subtle hand-stitch accents on the collar.",
    "rating": 4.8,
    "reviewsCount": 20,
    "inStock": true
  },
  {
    "id": "ab-07",
    "name_ar": "عباية كلوش كريب توتي بحزام كوردون ذهبي",
    "name_en": "Flared Berry Crepe Abaya with Braided Gold Cord",
    "category": "abayas",
    "price": 1520,
    "oldPrice": 1780,
    "badge": "sale",
    "colors": [
      {
        "name_ar": "توتي عميق",
        "name_en": "Berry Maroon",
        "hex": "#5C1D2E"
      },
      {
        "name_ar": "أسود داكن",
        "name_en": "Onyx Black",
        "hex": "#111111"
      }
    ],
    "sizes": [
      "52",
      "54",
      "56",
      "58"
    ],
    "images": [
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=75",
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=600&q=75"
    ],
    "description_ar": "قصة كلوش واسعة تعطي قواماً متناسقاً وأناقة لا تضاهى، تأتي مع حزام كوردون مجدول يدوي مزين بشراشيب حريرية ذهبية.",
    "description_en": "Wide flared silhouette in fluid drape crepe, adorned with a handcrafted golden cord tie and silk tassels.",
    "rating": 4.9,
    "reviewsCount": 27,
    "inStock": true
  },
  {
    "id": "tp-01",
    "name_ar": "بلوزة شيفون حرير عاجي بياقة فيونكة",
    "name_en": "Ivory Silk Chiffon Pussy-Bow Blouse",
    "category": "tops",
    "price": 680,
    "oldPrice": 820,
    "badge": "best",
    "colors": [
      {
        "name_ar": "عاجي كلاسيك",
        "name_en": "Ivory Cream",
        "hex": "#F7F4EB"
      },
      {
        "name_ar": "وردي ناعم",
        "name_en": "Powder Blush",
        "hex": "#E7C7CA"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=75",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=75"
    ],
    "description_ar": "بلوزة نسائية راقية بياقة فيونكة أنثوية وأكمام كلاسيكية، تناسب بيئة العمل الرسمية والمناسبات المسائية عند تنسيقها مع جيبة أو بنطلون.",
    "description_en": "Tailored pussy-bow blouse in airy semi-sheer silk chiffon with buttoned cuffs, delivering effortless Parisian elegance.",
    "rating": 4.9,
    "reviewsCount": 47,
    "inStock": true
  },
  {
    "id": "tp-02",
    "name_ar": "قميص كتان أوفر سايز أبيض بأزرار خشبية",
    "name_en": "Oversized Pure Linen Button-Down Shirt",
    "category": "tops",
    "price": 640,
    "oldPrice": 750,
    "badge": "new",
    "colors": [
      {
        "name_ar": "أبيض ناصع",
        "name_en": "Bright White",
        "hex": "#FFFFFF"
      },
      {
        "name_ar": "مخطط أزرق",
        "name_en": "Blue Pinstripe",
        "hex": "#6D8FA3"
      }
    ],
    "sizes": [
      "M",
      "L",
      "XL"
    ],
    "images": [
      "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=600&q=75",
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=600&q=75"
    ],
    "description_ar": "قطعة أساسية في دولاب كل فتاة: قميص كتان بقصة مريحة واسعة وأزرار خشبية طبيعية، يمكن ارتداؤه منفرداً أو مفتوحاً فوق توب أبيض.",
    "description_en": "Essential wardrobe staple crafted from 100% organic linen with dropped shoulders and natural horn buttons for easy layering.",
    "rating": 4.8,
    "reviewsCount": 39,
    "inStock": true
  },
  {
    "id": "tp-03",
    "name_ar": "توب ساتان كريب ذهبي بياقة درابيه كاول",
    "name_en": "Champagne Draped Cowl-Neck Satin Top",
    "category": "tops",
    "price": 490,
    "oldPrice": null,
    "badge": null,
    "colors": [
      {
        "name_ar": "شامبانيا ذهبي",
        "name_en": "Champagne Glow",
        "hex": "#D6BF9E"
      },
      {
        "name_ar": "أخضر زمردي",
        "name_en": "Deep Emerald",
        "hex": "#1C483B"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L"
    ],
    "images": [
      "https://images.unsplash.com/photo-1554568218-0f1715e72254?auto=format&fit=crop&w=600&q=75",
      "https://images.unsplash.com/photo-1527719327859-c6ce80353573?auto=format&fit=crop&w=600&q=75"
    ],
    "description_ar": "توب ناعم كالحرير بياقة درابيه أنثوية تعطي لمسة فخامة فورية تحت البليزر أو الكارديجان لمناسبات العشاء والخروج.",
    "description_en": "Lustrous draped cowl neckline top in heavyweight satin crepe cut on the bias to flatter every curve.",
    "rating": 4.7,
    "reviewsCount": 18,
    "inStock": true
  },
  {
    "id": "tp-04",
    "name_ar": "بلوزة قطنية بأكمام بوف وتطريز فرنسي",
    "name_en": "Broderie Anglaise Puff-Sleeve Cotton Blouse",
    "category": "tops",
    "price": 720,
    "oldPrice": 850,
    "badge": "sale",
    "colors": [
      {
        "name_ar": "أبيض عاجي",
        "name_en": "Ivory",
        "hex": "#FAF8F5"
      },
      {
        "name_ar": "أصفر زبدي",
        "name_en": "Butter Yellow",
        "hex": "#EFE3B5"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "https://images.unsplash.com/photo-1503342394128-c104d54dba01?auto=format&fit=crop&w=600&q=75",
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=600&q=75"
    ],
    "description_ar": "بلوزة من القطن المصري الخالص بنقوش خرامة وتطريز دقيق مع أكمام بوف وأساور مطاطية مريحة.",
    "description_en": "Romantic English embroidery atop pure Egyptian cotton with elasticated puffed sleeves and scalloped trims.",
    "rating": 4.9,
    "reviewsCount": 31,
    "inStock": true
  },
  {
    "id": "tp-05",
    "name_ar": "تيشيرت قطن مصري فاخر بياقة مدورة ناعمة",
    "name_en": "Premium Egyptian Long-Staple Cotton Crew Tee",
    "category": "tops",
    "price": 320,
    "oldPrice": 390,
    "badge": "best",
    "colors": [
      {
        "name_ar": "أبيض ثلجي",
        "name_en": "Snow White",
        "hex": "#FFFFFF"
      },
      {
        "name_ar": "أسود كربوني",
        "name_en": "Carbon Black",
        "hex": "#1C1C1C"
      },
      {
        "name_ar": "موكا بيج",
        "name_en": "Mocha Beige",
        "hex": "#BBA89B"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=600&q=75",
      "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=600&q=75"
    ],
    "description_ar": "تيشيرت أساسي فائق النعومة مصنوع من قطن مصري ممشط بنسبة 100%، لا يبهت ولا ينكمش مع الغسيل المتكرر.",
    "description_en": "Essential everyday tee cut from 100% combed Egyptian cotton for incomparable softness, durability and breathability.",
    "rating": 4.9,
    "reviewsCount": 88,
    "inStock": true
  },
  {
    "id": "tp-06",
    "name_ar": "تونيك كتان طويل بفتحات جانبية للمحجبات",
    "name_en": "Modest Longline Linen Tunic with Split Hem",
    "category": "tops",
    "price": 780,
    "oldPrice": null,
    "badge": "new",
    "colors": [
      {
        "name_ar": "أزرق نيلي",
        "name_en": "Calm Indigo",
        "hex": "#3B4E63"
      },
      {
        "name_ar": "بيج طبيعي",
        "name_en": "Natural Flax",
        "hex": "#D2C5B6"
      }
    ],
    "sizes": [
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://images.unsplash.com/photo-1537832816519-689ad163238b?auto=format&fit=crop&w=600&q=75",
      "https://images.unsplash.com/photo-1508427953056-b00b8d78ebf5?auto=format&fit=crop&w=600&q=75"
    ],
    "description_ar": "تونيك محتشم بقصة طويلة تغطي الأرداف مع فتحات جانبية عملية تمنحك حرية الحركة، مثالي للمحجبات مع بنطلون جينز أو قماش.",
    "description_en": "Modest knee-length tunic in airy washed linen with side splits for effortless movement and graceful layering.",
    "rating": 4.8,
    "reviewsCount": 23,
    "inStock": true
  },
  {
    "id": "tp-07",
    "name_ar": "توب تريكو ريب مضلع بأزرار أمامية",
    "name_en": "Fine Ribbed Knit Henley Top - Vanilla",
    "category": "tops",
    "price": 450,
    "oldPrice": 550,
    "badge": "sale",
    "colors": [
      {
        "name_ar": "كريمي فانيليا",
        "name_en": "Vanilla Cream",
        "hex": "#F5F0E6"
      },
      {
        "name_ar": "وردي ناعم",
        "name_en": "Soft Rose",
        "hex": "#E3BDC3"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=600&q=75",
      "https://images.unsplash.com/photo-1551803091-e20673f15770?auto=format&fit=crop&w=600&q=75"
    ],
    "description_ar": "توب ناعم من خيوط الفيسكوز المضلعة المطاطية، تصميم مريح يلتف حول الجسم بخفة دون إحكام مزعج.",
    "description_en": "Soft stretchy ribbed knit henley top designed with tortoiseshell buttons for year-round effortless styling.",
    "rating": 4.7,
    "reviewsCount": 35,
    "inStock": true
  },
  {
    "id": "pn-01",
    "name_ar": "بنطلون بالازو قماش واسع بكسرات أمامية",
    "name_en": "Tailored High-Waist Palazzo Trousers - Sand",
    "category": "pants",
    "price": 790,
    "oldPrice": 950,
    "badge": "best",
    "colors": [
      {
        "name_ar": "بيج رملي",
        "name_en": "Sand Beige",
        "hex": "#CFBEA5"
      },
      {
        "name_ar": "أسود فحمي",
        "name_en": "Charcoal Noir",
        "hex": "#222222"
      }
    ],
    "sizes": [
      "38",
      "40",
      "42",
      "44",
      "46"
    ],
    "images": [
      "https://images.unsplash.com/photo-1582418702059-97ebafb35d09?auto=format&fit=crop&w=600&q=75",
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=75"
    ],
    "description_ar": "بنطلون بالازو بقصة أرجل واسعة وكسرات حادة عند الخصر، مصنوع من كريب صوف تركي ناعم ينساب بأناقة مع كل خطوة.",
    "description_en": "Tailored wide-leg palazzo trousers with crisp front pleats in fluid Turkish suiting crepe.",
    "rating": 4.9,
    "reviewsCount": 62,
    "inStock": true
  },
  {
    "id": "pn-02",
    "name_ar": "جينز موم فيت كلاسيكي بخصر عالي ينحت القوام",
    "name_en": "Vintage Mid-Wash High-Rise Mom Jeans",
    "category": "pants",
    "price": 690,
    "oldPrice": 850,
    "badge": "best",
    "colors": [
      {
        "name_ar": "أزرق كلاسيك",
        "name_en": "Mid Blue Wash",
        "hex": "#4D6B8C"
      },
      {
        "name_ar": "أزرق باهت",
        "name_en": "Light Stone Wash",
        "hex": "#8EA8C3"
      }
    ],
    "sizes": [
      "36",
      "38",
      "40",
      "42",
      "44"
    ],
    "images": [
      "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=600&q=75",
      "https://images.unsplash.com/photo-1551854838-212c50b4c184?auto=format&fit=crop&w=600&q=75"
    ],
    "description_ar": "جينز بقصة الموم الكلاسيكية بخصر مرتفع ينحت القوام مع قطن 98% وإيلاستين 2% لراحة تدوم طوال اليوم دون أن يترهل.",
    "description_en": "Authentic wash mom jeans featuring high-rise sculpting contouring and comfort recovery denim.",
    "rating": 4.8,
    "reviewsCount": 54,
    "inStock": true
  },
  {
    "id": "pn-03",
    "name_ar": "بنطلون كتان صيفي بخصر مطاطي ورباط",
    "name_en": "Relaxed Drawstring Linen Trousers - Off-White",
    "category": "pants",
    "price": 620,
    "oldPrice": null,
    "badge": "new",
    "colors": [
      {
        "name_ar": "عاجي طبيعي",
        "name_en": "Off-White",
        "hex": "#F3EDE2"
      },
      {
        "name_ar": "أخضر ميرمية",
        "name_en": "Sage Green",
        "hex": "#8A9A86"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://images.unsplash.com/photo-1554412933-514a83d2f3c8?auto=format&fit=crop&w=600&q=75",
      "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=600&q=75"
    ],
    "description_ar": "بنطلون مريح جداً من الكتان المصري الخفيف، بوسط استيك ناعم لا يضغط وجيوب مائلة مريحة، مثالي للصيف والسفر.",
    "description_en": "Breathable pure linen pants fitted with an elasticated drawstring waistband and deep pockets for effortless ease.",
    "rating": 4.7,
    "reviewsCount": 28,
    "inStock": true
  },
  {
    "id": "pn-04",
    "name_ar": "جينز وايد ليج مستقيم بحاشية غير مخيطة",
    "name_en": "Ecru Raw-Hem Wide-Leg Denim",
    "category": "pants",
    "price": 740,
    "oldPrice": 890,
    "badge": "sale",
    "colors": [
      {
        "name_ar": "أبيض إيكرو",
        "name_en": "Ecru Denim",
        "hex": "#EFECE6"
      },
      {
        "name_ar": "أزرق داكن",
        "name_en": "Dark Indigo",
        "hex": "#233348"
      }
    ],
    "sizes": [
      "38",
      "40",
      "42",
      "44"
    ],
    "images": [
      "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=600&q=75",
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=600&q=75"
    ],
    "description_ar": "بنطلون جينز وايد ليج بأرجل واسعة مستقيمة وعصرية تزيد من طول القامة، حاشية منتهية بشكل طبيعي غير محبوك.",
    "description_en": "Flattering wide-leg silhouette in premium heavy twill cotton with subtle vintage wash and raw hems.",
    "rating": 4.8,
    "reviewsCount": 33,
    "inStock": true
  },
  {
    "id": "pn-05",
    "name_ar": "بنطلون كلاسيكي للعمل بطول الكاحل وغابردين",
    "name_en": "Ankle-Length Cigarette Trousers - Navy",
    "category": "pants",
    "price": 680,
    "oldPrice": null,
    "badge": null,
    "colors": [
      {
        "name_ar": "كحلي رسمي",
        "name_en": "Formal Navy",
        "hex": "#1D2A44"
      },
      {
        "name_ar": "أسود كلاسيك",
        "name_en": "Classic Black",
        "hex": "#1A1A1A"
      }
    ],
    "sizes": [
      "38",
      "40",
      "42",
      "44",
      "46"
    ],
    "images": [
      "https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?auto=format&fit=crop&w=600&q=75",
      "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=600&q=75"
    ],
    "description_ar": "بنطلون رسمي بطول الكاحل وخامة غابردين سترتش مرنة تسمح بالحركة طوال ساعات الدوام مع الحفاظ على مظهر مهندم ومرتب.",
    "description_en": "Sleek cigarette-leg workwear trousers cut from wrinkle-resistant bi-stretch gabardine for maximum office comfort.",
    "rating": 4.6,
    "reviewsCount": 19,
    "inStock": true
  },
  {
    "id": "pn-06",
    "name_ar": "بنطلون كارجو ساتان ناعم بأساور كاحل",
    "name_en": "Satin Utility Cargo Pants - Olive",
    "category": "pants",
    "price": 760,
    "oldPrice": 880,
    "badge": "new",
    "colors": [
      {
        "name_ar": "زيتوني هادئ",
        "name_en": "Army Olive",
        "hex": "#525B44"
      },
      {
        "name_ar": "كاكي رملي",
        "name_en": "Golden Khaki",
        "hex": "#A89675"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=600&q=75",
      "https://images.unsplash.com/photo-1548624313-0396c75e4b1a?auto=format&fit=crop&w=600&q=75"
    ],
    "description_ar": "تصميم كارجو مطور بأنوثة فائقة من الساتان الحريري غير اللامع مع جيوب جانبية ناعمة لا تزيد الحجم وأساور كاحل قابلة للتعديل.",
    "description_en": "Feminine utility cargo pants crafted in fluid washed silk-satin with sleek flap pockets and elastic cuffs.",
    "rating": 4.8,
    "reviewsCount": 25,
    "inStock": true
  },
  {
    "id": "sk-01",
    "name_ar": "جيبة بليسيه ساتان ميدي وردية مغبرة",
    "name_en": "Sunray Pleated Satin Midi Skirt - Dusty Rose",
    "category": "skirts",
    "price": 650,
    "oldPrice": 790,
    "badge": "best",
    "colors": [
      {
        "name_ar": "وردي مغبر",
        "name_en": "Dusty Rose",
        "hex": "#D69FA4"
      },
      {
        "name_ar": "شامبانيا ذهبي",
        "name_en": "Champagne Gold",
        "hex": "#D3BE9C"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=600&q=75",
      "https://images.unsplash.com/photo-1577900232427-18219b9166a0?auto=format&fit=crop&w=600&q=75"
    ],
    "description_ar": "جيبة بليسيه شمسية من الساتان الفاخر بحزام خصر مطاطي مخفي، انسيابية فائقة ولمعان هادئ يعطي إطلالة ساحرة نهاراً ومساءً.",
    "description_en": "Sunray pleated midi skirt rendered in luminous heavyweight satin with an elasticized inner waist for all-day elegance.",
    "rating": 4.9,
    "reviewsCount": 74,
    "inStock": true
  },
  {
    "id": "sk-02",
    "name_ar": "جيبة جينز ماكسي طويلة بفتحة أمامية محتشمة",
    "name_en": "Column Denim Maxi Skirt with Modest Front Slit",
    "category": "skirts",
    "price": 780,
    "oldPrice": 920,
    "badge": "sale",
    "colors": [
      {
        "name_ar": "أزرق متوسط",
        "name_en": "Vintage Mid Blue",
        "hex": "#526E8F"
      },
      {
        "name_ar": "أبيض حليبي",
        "name_en": "Milky Ecru",
        "hex": "#EFECE3"
      }
    ],
    "sizes": [
      "38",
      "40",
      "42",
      "44",
      "46"
    ],
    "images": [
      "https://images.unsplash.com/photo-1582142306909-195724d33ffc?auto=format&fit=crop&w=600&q=75",
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=600&q=75"
    ],
    "description_ar": "تريند الموسم بلا منازع: جيبة جينز طويلة بقصة عامودية جذابة وفتحة أمامية مدروسة للمشي بحرية واحتشام، مع جيوب خماسية كلاسيكية.",
    "description_en": "Full-length structured denim skirt featuring a modest walking slit and classic contrast stitching.",
    "rating": 4.9,
    "reviewsCount": 48,
    "inStock": true
  },
  {
    "id": "sk-03",
    "name_ar": "جيبة كتان طبقات A-Line مع حزام قماشي",
    "name_en": "Tiered Pure Linen A-Line Maxi Skirt - Flax",
    "category": "skirts",
    "price": 720,
    "oldPrice": null,
    "badge": "new",
    "colors": [
      {
        "name_ar": "بيج طبيعي",
        "name_en": "Natural Flax",
        "hex": "#D9CCB9"
      },
      {
        "name_ar": "تراكوتا",
        "name_en": "Terracotta Clay",
        "hex": "#B85D43"
      }
    ],
    "sizes": [
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&w=600&q=75",
      "https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=600&q=75"
    ],
    "description_ar": "جيبة صيفية خفيفة بثلاث طبقات انسيابية وحزام قماشي متناسق للربط، تعطي طابعاً بوهيمياً أنيقاً مع البلوزات الكتان والتيشيرتات القطنية.",
    "description_en": "Airy three-tier maxi skirt spun from washed natural linen with a coordinating sash belt and soft interior lining.",
    "rating": 4.8,
    "reviewsCount": 22,
    "inStock": true
  },
  {
    "id": "sk-04",
    "name_ar": "جيبة قلم (بنسل) كريب بفتحة خلفية للعمل",
    "name_en": "Tailored Crepe Pencil Skirt - Royal Black",
    "category": "skirts",
    "price": 580,
    "oldPrice": 690,
    "badge": null,
    "colors": [
      {
        "name_ar": "أسود ملكي",
        "name_en": "Royal Black",
        "hex": "#1A1A1A"
      },
      {
        "name_ar": "كحلي رسمي",
        "name_en": "Formal Navy",
        "hex": "#222D42"
      }
    ],
    "sizes": [
      "38",
      "40",
      "42",
      "44"
    ],
    "images": [
      "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=600&q=75",
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=600&q=75"
    ],
    "description_ar": "جيبة بقصة القلم المحتشمة تحت الركبة، خامة كريب تركي مبطن بليكرا ناعمة تعطي إطلالة أنيقة واثقة في اجتماعات العمل والمقابلات.",
    "description_en": "Modest knee-grazing pencil skirt in lined stretch crepe, engineered for poise, comfort, and professional elegance.",
    "rating": 4.6,
    "reviewsCount": 17,
    "inStock": true
  },
  {
    "id": "sk-05",
    "name_ar": "جيبة شيفون فلورال مشجرة بطبقات ناعمة",
    "name_en": "Chiffon Floral Tiered Maxi Skirt - Pastel",
    "category": "skirts",
    "price": 660,
    "oldPrice": 780,
    "badge": "new",
    "colors": [
      {
        "name_ar": "زهور باستيل",
        "name_en": "Pastel Flora",
        "hex": "#DEB5BA"
      },
      {
        "name_ar": "زهور سماوية",
        "name_en": "Sky Flora",
        "hex": "#A7BDCF"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "https://images.unsplash.com/photo-1520006403909-838d6b92c22e?auto=format&fit=crop&w=600&q=75",
      "https://images.unsplash.com/photo-1534126511673-b6899657816a?auto=format&fit=crop&w=600&q=75"
    ],
    "description_ar": "جيبة شيفون حالمة بنقوش زهور هادئة ومبطنة بالكامل ببطانة قطنية تمنع الشفافية وتضمن انتعاشك في الطقس الحار.",
    "description_en": "Dreamy floral chiffon skirt lined completely with cool breathable cotton for sheer modesty on sunny Egyptian afternoons.",
    "rating": 4.8,
    "reviewsCount": 29,
    "inStock": true
  },
  {
    "id": "sk-06",
    "name_ar": "جيبة ساتان كلوش شوكولاتة بقصة الباياس",
    "name_en": "Bias-Cut Chocolate Satin Maxi Skirt",
    "category": "skirts",
    "price": 740,
    "oldPrice": null,
    "badge": "best",
    "colors": [
      {
        "name_ar": "بني شوكولاتة",
        "name_en": "Chocolate Brown",
        "hex": "#4A3228"
      },
      {
        "name_ar": "زيتي زمردي",
        "name_en": "Emerald Green",
        "hex": "#234433"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "https://images.unsplash.com/photo-1523381294911-8d3cead13475?auto=format&fit=crop&w=600&q=75",
      "https://images.unsplash.com/photo-1576188973526-0e5d7047b0cf?auto=format&fit=crop&w=600&q=75"
    ],
    "description_ar": "مفصلة بقصة الباياس المائلة لتعانق انحناءات الجسم بنعومة بالغة دون التصاق، قماش ساتان ثقيل الوزن يمنح حركة ساحرة.",
    "description_en": "Cut on the bias in liquid-weight satin with an unrippled concealed side zipper for a fluid, flattering silhouette.",
    "rating": 4.9,
    "reviewsCount": 36,
    "inStock": true
  },
  {
    "id": "st-01",
    "name_ar": "طقم قطعتين كتان تونيك وبنطلون واسع رملي",
    "name_en": "Two-Piece Linen Tunic & Wide-Leg Trouser Set",
    "category": "sets",
    "price": 1390,
    "oldPrice": 1650,
    "badge": "best",
    "colors": [
      {
        "name_ar": "بيج رملي",
        "name_en": "Warm Sand",
        "hex": "#D4C5B3"
      },
      {
        "name_ar": "زيتوني هادئ",
        "name_en": "Olive Herb",
        "hex": "#6D7A60"
      }
    ],
    "sizes": [
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=75",
      "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?auto=format&fit=crop&w=600&q=75"
    ],
    "description_ar": "طقم متناسق فائق الأناقة يتكون من تونيك طويل بأزرار خشبية وبنطلون بالازو واسع بخصر مطاطي، خيار مثالي ومحتشم لأناقة فورية بدون مجهود.",
    "description_en": "Effortless luxury co-ord pairing a long button-front tunic with matching relaxed palazzo pants in pure breathable linen.",
    "rating": 5,
    "reviewsCount": 68,
    "inStock": true
  },
  {
    "id": "st-02",
    "name_ar": "طقم بدلة رسمية بليزر وبنطلون سليم كحلي",
    "name_en": "Tailored Power Suit Set - Midnight Navy",
    "category": "sets",
    "price": 1750,
    "oldPrice": 2100,
    "badge": "new",
    "colors": [
      {
        "name_ar": "كحلي داكن",
        "name_en": "Midnight Navy",
        "hex": "#1C2742"
      },
      {
        "name_ar": "بيج كاكي",
        "name_en": "Camel Khaki",
        "hex": "#B89B7A"
      }
    ],
    "sizes": [
      "38",
      "40",
      "42",
      "44"
    ],
    "images": [
      "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&w=600&q=75",
      "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=600&q=75"
    ],
    "description_ar": "بدلة رسمية متقنة الخياطة تضم بليزر كلاسيكي مبطن وبنطلون رسمي متناسق، مصممة للمرأة التي تبحث عن الفخامة والوقار في مكان العمل.",
    "description_en": "Impeccably tailored two-piece power suit with a single-breasted blazer and matching high-waisted cigarette trousers.",
    "rating": 4.9,
    "reviewsCount": 32,
    "inStock": true
  },
  {
    "id": "st-03",
    "name_ar": "طقم ريزورت قميص وبنطلون بليسيه حريري",
    "name_en": "Micro-Pleated Resort Shirt & Trouser Co-Ord",
    "category": "sets",
    "price": 1250,
    "oldPrice": 1450,
    "badge": "sale",
    "colors": [
      {
        "name_ar": "شامبانيا لؤلؤي",
        "name_en": "Pearl Champagne",
        "hex": "#EADDC8"
      },
      {
        "name_ar": "أسود ناعم",
        "name_en": "Silky Black",
        "hex": "#1F1F1F"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "https://images.unsplash.com/photo-1475180098004-ca77a66827be?auto=format&fit=crop&w=600&q=75",
      "https://images.unsplash.com/photo-1513094735237-8f2714d57c13?auto=format&fit=crop&w=600&q=75"
    ],
    "description_ar": "طقم بليسيه دقيق خفيف الوزن ومقاوم للتجعد، مناسب للسفر والعطلات، يمنحك شعوراً بالراحة التامة مع بريق هادئ مفعم بالحيوية.",
    "description_en": "Micro-pleated resort set featuring an easy-fit button-up shirt and wide-leg trousers that pack with zero wrinkle worries.",
    "rating": 4.8,
    "reviewsCount": 41,
    "inStock": true
  },
  {
    "id": "st-04",
    "name_ar": "طقم كيمونو مفتوح وجيبة ساتان ماكسي بورغندي",
    "name_en": "Kimono Duster & Flared Satin Maxi Skirt Set",
    "category": "sets",
    "price": 1580,
    "oldPrice": 1850,
    "badge": null,
    "colors": [
      {
        "name_ar": "بورغندي فاخر",
        "name_en": "Wine Burgundy",
        "hex": "#661D2B"
      },
      {
        "name_ar": "أخضر زيتوني",
        "name_en": "Forest Olive",
        "hex": "#3A4A3C"
      }
    ],
    "sizes": [
      "M",
      "L",
      "XL"
    ],
    "images": [
      "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=75",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=75"
    ],
    "description_ar": "طقم مميز يجمع كيمونو طويل مفتوح بحزام خصر وجيبة ساتان كلوش واسعة، مظهر راقٍ متكامل للمناسبات والزيارات الرسمية.",
    "description_en": "Sophisticated twin-set combining a sweeping belted kimono duster with a coordinating flared satin maxi skirt.",
    "rating": 4.9,
    "reviewsCount": 26,
    "inStock": true
  },
  {
    "id": "st-05",
    "name_ar": "طقم لاونج وير مضلع بلوزة وبنطلون قطني",
    "name_en": "Cozy Ribbed Cotton Loungewear Set - Latte",
    "category": "sets",
    "price": 890,
    "oldPrice": 1050,
    "badge": "sale",
    "colors": [
      {
        "name_ar": "بيج لاتيه",
        "name_en": "Latte Cream",
        "hex": "#D6C6B6"
      },
      {
        "name_ar": "رمادي ميلانج",
        "name_en": "Heather Grey",
        "hex": "#B0B0B0"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=600&q=75",
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=600&q=75"
    ],
    "description_ar": "أقصى درجات الراحة المنزلية أو مشاوير الصباح، طقم قطني مضلع ناعم وقابل للتمدد بأكمام طويلة وبنطلون بخصر استيك مريح.",
    "description_en": "Luxuriously soft premium ribbed cotton loungewear engineered for home serenity and relaxed weekend coffee runs.",
    "rating": 4.8,
    "reviewsCount": 51,
    "inStock": true
  },
  {
    "id": "st-06",
    "name_ar": "طقم قطعتين كارديجان طويل وتوب داخلي توفي",
    "name_en": "Duster Cardigan & Mock-Neck Inner Top Set",
    "category": "sets",
    "price": 1120,
    "oldPrice": null,
    "badge": "new",
    "colors": [
      {
        "name_ar": "توفي دافئ",
        "name_en": "Warm Toffee",
        "hex": "#9E7356"
      },
      {
        "name_ar": "عاجي شتوي",
        "name_en": "Winter Ivory",
        "hex": "#EFEBE2"
      }
    ],
    "sizes": [
      "M",
      "L",
      "XL"
    ],
    "images": [
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=600&q=75",
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=75"
    ],
    "description_ar": "كارديجان صوف خفيف طويل يصل لتحت الركبة يرافقه توب داخلي بدون أكمام من نفس الغزل المحبوك، يمكن تنسيقه بسهولة.",
    "description_en": "Fine-gauge knit duo pairing a sweeping longline duster cardigan with an essential sleeveless mock-neck knit top.",
    "rating": 4.7,
    "reviewsCount": 19,
    "inStock": true
  },
  {
    "id": "jk-01",
    "name_ar": "بليزر كلاسيكي أوفر سايز بقصة إيطالية بيج",
    "name_en": "Italian Cut Oversized Structured Blazer - Camel",
    "category": "jackets",
    "price": 1150,
    "oldPrice": 1390,
    "badge": "best",
    "colors": [
      {
        "name_ar": "بيج جملي",
        "name_en": "Camel Beige",
        "hex": "#C2A383"
      },
      {
        "name_ar": "أسود نقي",
        "name_en": "Pure Black",
        "hex": "#181818"
      }
    ],
    "sizes": [
      "38",
      "40",
      "42",
      "44"
    ],
    "images": [
      "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=600&q=75",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=600&q=75"
    ],
    "description_ar": "بليزر أوفر سايز أنيق مبطن بالكامل من الداخل بحرير ساتاني، أكتاف مبطنة برفق تمنحك حضوراً قوياً وجاذبية راقية في أي اجتماع.",
    "description_en": "The quintessential power blazer tailored with soft shoulder pads, peaked lapels, and lustrous satin interior lining.",
    "rating": 4.9,
    "reviewsCount": 83,
    "inStock": true
  },
  {
    "id": "jk-02",
    "name_ar": "كارديجان كيمونو شيفون مزخرف بشراريب",
    "name_en": "Chiffon Kimono Duster with Fringe Hem",
    "category": "jackets",
    "price": 680,
    "oldPrice": 820,
    "badge": "sale",
    "colors": [
      {
        "name_ar": "وردي مسحوق",
        "name_en": "Powder Blush",
        "hex": "#E8C2C7"
      },
      {
        "name_ar": "أخضر زيتوني",
        "name_en": "Olive Herb",
        "hex": "#7E8C73"
      }
    ],
    "sizes": [
      "Free Size (يناسب S إلى XXL)"
    ],
    "images": [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=75",
      "https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=600&q=75"
    ],
    "description_ar": "كارديجان مفتوح بطول ماكسي من الشيفون الرقيق بنقوش فنية هادئة وحاشية مزينة بشراريب بوهيمية، يمنحك طبقة احتشام خفيفة ومشرقة.",
    "description_en": "Airy sheer kimono duster adorned with delicate motif prints and bohemian fringed hem for graceful sunny layering.",
    "rating": 4.8,
    "reviewsCount": 37,
    "inStock": true
  },
  {
    "id": "jk-03",
    "name_ar": "معطف ترانش قطني طويل مزدوج الصدر",
    "name_en": "Heritage Double-Breasted Cotton Trench Coat",
    "category": "jackets",
    "price": 1890,
    "oldPrice": 2350,
    "badge": "new",
    "colors": [
      {
        "name_ar": "عسلي كلاسيك",
        "name_en": "Heritage Honey",
        "hex": "#C7A67D"
      },
      {
        "name_ar": "رمادي غامق",
        "name_en": "Dark Graphite",
        "hex": "#3A3D40"
      }
    ],
    "sizes": [
      "38",
      "40",
      "42",
      "44",
      "46"
    ],
    "images": [
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=75",
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=75"
    ],
    "description_ar": "معطف ترانش طويل مزدوج الصدر بتفاصيل عسكرية راقية، نسيج قطن غابردين معالج ومقاوم لقطرات المطر مع أزرار صلبة وحزام خصر متين.",
    "description_en": "Double-breasted heritage trench cut from storm-resistant cotton gabardine, detailed with epaulets and buckled belt.",
    "rating": 5,
    "reviewsCount": 21,
    "inStock": true
  },
  {
    "id": "jk-04",
    "name_ar": "جاكيت جينز كروب أوفر سايز باهت عتيق",
    "name_en": "Vintage Washed Cropped Denim Jacket",
    "category": "jackets",
    "price": 850,
    "oldPrice": 990,
    "badge": null,
    "colors": [
      {
        "name_ar": "أزرق ثلجي",
        "name_en": "Ice Blue Wash",
        "hex": "#8DA7C2"
      },
      {
        "name_ar": "أسود رمادي",
        "name_en": "Washed Charcoal",
        "hex": "#4B4E54"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "https://images.unsplash.com/photo-1578932750294-f5075e85f44a?auto=format&fit=crop&w=600&q=75",
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=75"
    ],
    "description_ar": "جاكيت جينز مريح بقصة واسعة وجيوب أمامية كبيرة، مناسب للارتداء فوق الفساتين الماكسي أو التيشيرتات لمظهر كاجوال شبابي مميز.",
    "description_en": "Boxy relaxed denim jacket washed for an authentic broken-in vintage look, designed to layer over maxi dresses.",
    "rating": 4.7,
    "reviewsCount": 45,
    "inStock": true
  },
  {
    "id": "jk-05",
    "name_ar": "كارديجان صوف ميرينو طويل بحزام خصر",
    "name_en": "Belted Merino Wool Blend Longline Cardigan",
    "category": "jackets",
    "price": 1290,
    "oldPrice": 1550,
    "badge": "best",
    "colors": [
      {
        "name_ar": "بيج شوفان",
        "name_en": "Oatmeal Heather",
        "hex": "#D6CCC2"
      },
      {
        "name_ar": "بورغندي توتي",
        "name_en": "Rich Berry",
        "hex": "#6E2336"
      }
    ],
    "sizes": [
      "S-M",
      "L-XL"
    ],
    "images": [
      "https://images.unsplash.com/photo-1544441892-794166f1e3be?auto=format&fit=crop&w=600&q=75",
      "https://images.unsplash.com/photo-1563178406-4cdc2923acbc?auto=format&fit=crop&w=600&q=75"
    ],
    "description_ar": "كارديجان دافئ ومترف مصنوع من مزيج صوف ميرينو فائق النعومة وخيوط كشمير، خفيف الوزن ولا يسبب وخزاً للبشرة الحساسة.",
    "description_en": "Ultra-plush long cardigan knitted from itch-free merino-blend yarn with ribbed borders and a detachable tie belt.",
    "rating": 4.9,
    "reviewsCount": 39,
    "inStock": true
  },
  {
    "id": "jk-06",
    "name_ar": "جاكيت تويد فرنسي بأزرار لؤلؤية ذهبية",
    "name_en": "French Bouclé Tweed Jacket with Pearl Buttons",
    "category": "jackets",
    "price": 1450,
    "oldPrice": null,
    "badge": "new",
    "colors": [
      {
        "name_ar": "وردي وعاجي",
        "name_en": "Blush Ivory Mix",
        "hex": "#ECD2D5"
      },
      {
        "name_ar": "أسود وأبيض",
        "name_en": "Classic Monochrome",
        "hex": "#2E2E2E"
      }
    ],
    "sizes": [
      "38",
      "40",
      "42",
      "44"
    ],
    "images": [
      "https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&fit=crop&w=600&q=75",
      "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=600&q=75"
    ],
    "description_ar": "جاكيت بوكليه تويد كلاسيكي مستوحى من دور الأزياء الباريسية، مزين بأزرار لؤلؤية بإطار ذهبي وحواف مهدبة ناعمة.",
    "description_en": "Parisian-inspired textured bouclé tweed jacket featuring custom faux-pearl buttons and delicate fringed braided trims.",
    "rating": 4.9,
    "reviewsCount": 18,
    "inStock": true
  },
  {
    "id": "hj-01",
    "name_ar": "طرحة شيفون جورجيت ماليزي موكا",
    "name_en": "Malaysian Georgette Chiffon Hijab - Mocha",
    "category": "hijab",
    "price": 260,
    "oldPrice": 320,
    "badge": "best",
    "colors": [
      {
        "name_ar": "موكا بيج",
        "name_en": "Mocha Almond",
        "hex": "#BFA58C"
      },
      {
        "name_ar": "وردي بودري",
        "name_en": "Dusty Mauve",
        "hex": "#CE9FA7"
      },
      {
        "name_ar": "أسود فحمي",
        "name_en": "Midnight Black",
        "hex": "#161616"
      }
    ],
    "sizes": [
      "مقاس موحد (75 × 195 سم)"
    ],
    "images": [
      "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=600&q=75",
      "https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=600&q=75"
    ],
    "description_ar": "طرحة شيفون ماليزية أصلية غير زلقة وثابتة على الرأس طوال اليوم، ملمس مطفي أنيق وحياكة أطراف ليزر دقيقة لا تنحل.",
    "description_en": "Authentic non-slip Malaysian georgette chiffon with clean laser-finished borders for effortless daily styling.",
    "rating": 4.9,
    "reviewsCount": 142,
    "inStock": true
  },
  {
    "id": "hj-02",
    "name_ar": "طرحة قطن كويتي مهدب ناعم وبارد",
    "name_en": "Soft Kuwaiti Breathable Cotton Voile Hijab",
    "category": "hijab",
    "price": 240,
    "oldPrice": null,
    "badge": "new",
    "colors": [
      {
        "name_ar": "بيج رملي",
        "name_en": "Desert Sand",
        "hex": "#D9C6B0"
      },
      {
        "name_ar": "أخضر زيتوني",
        "name_en": "Soft Olive",
        "hex": "#8A977F"
      }
    ],
    "sizes": [
      "مقاس موحد (80 × 200 سم)"
    ],
    "images": [
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=600&q=75",
      "https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?auto=format&fit=crop&w=600&q=75"
    ],
    "description_ar": "قطن كويتي ناعم وبارد يسمح بمرور الهواء، مثالي لأيام الصيف الحارة والجامعة دون الحاجة لدبابيس كثيرة.",
    "description_en": "Breathable lightweight cotton voile with subtle eyelash fringe, crafted to stay in place with minimal pins.",
    "rating": 4.8,
    "reviewsCount": 95,
    "inStock": true
  },
  {
    "id": "hj-03",
    "name_ar": "إيشارب حرير ساتان بنقشات رخامية ذهبية",
    "name_en": "Marble Print Silk-Satin Square Scarf",
    "category": "hijab",
    "price": 340,
    "oldPrice": 420,
    "badge": "sale",
    "colors": [
      {
        "name_ar": "رخام ذهبي وعاجي",
        "name_en": "Gold Marble",
        "hex": "#DFCFB7"
      },
      {
        "name_ar": "رخام كحلي",
        "name_en": "Navy Marble",
        "hex": "#354A66"
      }
    ],
    "sizes": [
      "مربع (95 × 95 سم)"
    ],
    "images": [
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=600&q=75",
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=600&q=75"
    ],
    "description_ar": "إيشارب مربع من الساتان الحريري ببريق لؤلؤي ساحر وطباعة رخامية مستوحاة من القصور الملكية، ملمس ناعم جداً يحمي الشعر.",
    "description_en": "Luxurious square silk-satin scarf with artistic marble swirl motifs and handcrafted edge finishes.",
    "rating": 4.8,
    "reviewsCount": 53,
    "inStock": true
  },
  {
    "id": "hj-04",
    "name_ar": "طرحة كريب كرمشة بدون كوي (كرينكل) سينامون",
    "name_en": "Everyday No-Iron Crinkle Crepe Hijab - Cinnamon",
    "category": "hijab",
    "price": 220,
    "oldPrice": 280,
    "badge": "best",
    "colors": [
      {
        "name_ar": "بني قرفة",
        "name_en": "Warm Cinnamon",
        "hex": "#B36243"
      },
      {
        "name_ar": "كريمي فانيليا",
        "name_en": "Creamy Vanilla",
        "hex": "#F3EDE0"
      }
    ],
    "sizes": [
      "مقاس موحد (85 × 190 سم)"
    ],
    "images": [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=75",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=75"
    ],
    "description_ar": "الحل السحري العملي: طرحة بملمس كرينكل ناعم لا تحتاج إلى كوي إطلاقاً، مقاومة للانزلاق وثابتة طوال ساعات السفر والخروج.",
    "description_en": "Textured crinkle crepe hijab that requires zero ironing, lightweight and effortlessly stay-put for busy lifestyles.",
    "rating": 4.9,
    "reviewsCount": 110,
    "inStock": true
  },
  {
    "id": "hj-05",
    "name_ar": "طرحة جيرسي لايكرا قطنية ممتازة نود",
    "name_en": "Premium Stretch Modal Cotton Jersey Hijab - Nude",
    "category": "hijab",
    "price": 290,
    "oldPrice": null,
    "badge": null,
    "colors": [
      {
        "name_ar": "بيج نود",
        "name_en": "Nude Almond",
        "hex": "#D2BAA3"
      },
      {
        "name_ar": "أسود فحمي",
        "name_en": "Pitch Black",
        "hex": "#1A1A1A"
      }
    ],
    "sizes": [
      "مقاس موحد (70 × 185 سم)"
    ],
    "images": [
      "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=600&q=75",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=75"
    ],
    "description_ar": "طرحة قطن جيرسي سترتش عالي المرونة، تثبت على الرأس بدون أي دبابيس وتمنحك راحة مطلقة خلال الرياضة واليوم الطويل.",
    "description_en": "High-recovery stretch modal-cotton jersey fabric that contours effortlessly with zero pins required.",
    "rating": 4.8,
    "reviewsCount": 67,
    "inStock": true
  },
  {
    "id": "hj-06",
    "name_ar": "بندانة قطنية كاملة مبطنة بالساتان لحماية الشعر",
    "name_en": "Satin-Lined Anti-Breakage Undercap",
    "category": "hijab",
    "price": 180,
    "oldPrice": 220,
    "badge": "best",
    "colors": [
      {
        "name_ar": "أسود كلاسيك",
        "name_en": "Onyx Black",
        "hex": "#1C1C1C"
      },
      {
        "name_ar": "بيج نود",
        "name_en": "Skin Nude",
        "hex": "#D6B89E"
      }
    ],
    "sizes": [
      "مطاطي مقاس حر"
    ],
    "images": [
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=75",
      "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=600&q=75"
    ],
    "description_ar": "بندانة قطنية ناعمة من الخارج ومبطنة بالكامل بحرير الساتان النقي من الداخل لحماية الشعر من الاحتكاك والتساقط والهيشان.",
    "description_en": "Pure silk-satin lined undercap that locks in natural moisture, prevents split ends, and eliminates friction.",
    "rating": 5,
    "reviewsCount": 168,
    "inStock": true
  },
  {
    "id": "sl-01",
    "name_ar": "بيجامة ساتان كلاسيكية بأزرار وياقة نوتش وردية",
    "name_en": "Classic Notch-Collar Satin PJ Set - Pearl Rose",
    "category": "sleepwear",
    "price": 850,
    "oldPrice": 1050,
    "badge": "best",
    "colors": [
      {
        "name_ar": "وردي لؤلؤي",
        "name_en": "Pearl Rose",
        "hex": "#E9BAC2"
      },
      {
        "name_ar": "كحلي كحلي",
        "name_en": "Midnight Navy",
        "hex": "#1B2A44"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?auto=format&fit=crop&w=600&q=75",
      "https://images.unsplash.com/photo-1571513722275-4b41940f54b8?auto=format&fit=crop&w=600&q=75"
    ],
    "description_ar": "بيجامة فاخرة قطعتين من الساتان الناعم بحواف بايبينج متباينة وأزرار صدفية، بنطلون مريح بخصر مطاطي يمنحك نوم هادئ وأناقة منزلية ساحرة.",
    "description_en": "Silky-smooth satin long pyjama set finished with contrast piping and an elastic waistband for bedtime luxury.",
    "rating": 4.9,
    "reviewsCount": 76,
    "inStock": true
  },
  {
    "id": "sl-02",
    "name_ar": "روب كيمونو ساتان طويل بحزام شامبانيا",
    "name_en": "Longline Satin Robe with Wide Sash - Champagne",
    "category": "sleepwear",
    "price": 920,
    "oldPrice": 1100,
    "badge": "new",
    "colors": [
      {
        "name_ar": "شامبانيا ذهبي",
        "name_en": "Champagne Glow",
        "hex": "#DFCFB7"
      },
      {
        "name_ar": "بورغندي نبيذي",
        "name_en": "Wine Red",
        "hex": "#631E2A"
      }
    ],
    "sizes": [
      "S-M",
      "L-XL"
    ],
    "images": [
      "https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?auto=format&fit=crop&w=600&q=75",
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=75"
    ],
    "description_ar": "روب ساتان طويل انسيابي بأكمام كيمونو واسعة وحزام خصر عريض، يتميز بلمسة دانتيل فرنسي ناعم وتطريز أنيق على الأكمام.",
    "description_en": "Full-length satin duster robe with kimono sleeves, interior security ties, and delicate lace trims.",
    "rating": 4.9,
    "reviewsCount": 43,
    "inStock": true
  },
  {
    "id": "sl-03",
    "name_ar": "بيجامة قطن مصري 100% بنقشة خطوط رقيقة",
    "name_en": "Pure Egyptian Cotton Pinstripe PJ Set - Blush",
    "category": "sleepwear",
    "price": 720,
    "oldPrice": 850,
    "badge": "sale",
    "colors": [
      {
        "name_ar": "مخطط وردي",
        "name_en": "Blush Stripe",
        "hex": "#ECC4C9"
      },
      {
        "name_ar": "مخطط رمادي",
        "name_en": "Grey Stripe",
        "hex": "#B8C1C9"
      }
    ],
    "sizes": [
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://images.unsplash.com/photo-1534751516642-a1714f526363?auto=format&fit=crop&w=600&q=75",
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=600&q=75"
    ],
    "description_ar": "بيجامة قطنية باردة ومريحة مصنوعة من أجود أنواع القطن المصري الطبيعي، خالية من المواد الاصطناعية لتوفير تهوية مثالية ونوم عميق.",
    "description_en": "Certified 100% Egyptian long-staple cotton poplin, pre-washed for cloud-like softness that breathes easily.",
    "rating": 4.8,
    "reviewsCount": 58,
    "inStock": true
  },
  {
    "id": "sl-04",
    "name_ar": "قميص نوم ماكسي ساتان بحمالات قابلة للتعديل",
    "name_en": "Bias-Cut Satin Maxi Nightdress - Mulberry",
    "category": "sleepwear",
    "price": 680,
    "oldPrice": null,
    "badge": null,
    "colors": [
      {
        "name_ar": "توت بري عميق",
        "name_en": "Deep Mulberry",
        "hex": "#4A1B28"
      },
      {
        "name_ar": "عاجي لؤلؤي",
        "name_en": "Pearl Ivory",
        "hex": "#F7F2E8"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=600&q=75",
      "https://images.unsplash.com/photo-1495385794356-15371f348c31?auto=format&fit=crop&w=600&q=75"
    ],
    "description_ar": "قميص نوم طويل بقصة مائلة تنساب بلطف على الجسم، قماش حريري الملمس مع حمالات رفيعة قابلة للضبط وفتحة جانبية صغيرة لراحة المشي.",
    "description_en": "Floor-length slip nightgown tailored on the bias in liquid-weight satin with adjustable sliders and modest side slit.",
    "rating": 4.7,
    "reviewsCount": 31,
    "inStock": true
  },
  {
    "id": "sl-05",
    "name_ar": "طقم نوم شورت وتوب كامي بحواف دانتيل وردي",
    "name_en": "Cami Top & Shorts Satin Sleep Set - Powder Pink",
    "category": "sleepwear",
    "price": 540,
    "oldPrice": 650,
    "badge": "sale",
    "colors": [
      {
        "name_ar": "وردي بودري",
        "name_en": "Powder Pink",
        "hex": "#EBB5BE"
      },
      {
        "name_ar": "أسود دانتيل",
        "name_en": "Noir Lace",
        "hex": "#1C1C1C"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=75",
      "https://images.unsplash.com/photo-1550614000-4895a10e1bfd?auto=format&fit=crop&w=600&q=75"
    ],
    "description_ar": "طقم خفيف ومرح من قطعتين توب كامي وشورت مريح بخصر مطاطي، مزين بلمسات دانتيل ناعم على الأطراف.",
    "description_en": "Lighthearted two-piece camisole and boxer shorts set in silky satin trimmed with delicate scalloped lace.",
    "rating": 4.8,
    "reviewsCount": 39,
    "inStock": true
  },
  {
    "id": "ac-01",
    "name_ar": "ليجن رياضي عالي الخصر بتقنية نحت القوام أسود",
    "name_en": "Sculpt Seamless High-Waisted Leggings - Onyx",
    "category": "activewear",
    "price": 590,
    "oldPrice": 720,
    "badge": "best",
    "colors": [
      {
        "name_ar": "أسود فحمي",
        "name_en": "Solid Onyx",
        "hex": "#181818"
      },
      {
        "name_ar": "زيتوني غامق",
        "name_en": "Deep Forest",
        "hex": "#29392B"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "images": [
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=75",
      "https://images.unsplash.com/photo-1506152983158-b4a74a01c721?auto=format&fit=crop&w=600&q=75"
    ],
    "description_ar": "ليجن بدون خياطة بارزة يمنح دعماً كاملاً وخصراً عالياً ثابتاً لا ينزلق أثناء التمرين، قماش لا يشف ومقاوم للتعرق بنسبة 100%.",
    "description_en": "Buttery-soft squat-proof seamless performance leggings with 4-way stretch and compression waistband that stays in place.",
    "rating": 4.9,
    "reviewsCount": 92,
    "inStock": true
  },
  {
    "id": "ac-02",
    "name_ar": "هودي رياضي قطني أوفر سايز بسحاب كامل بيج",
    "name_en": "French Terry Zip-Up Athletic Hoodie - Oatmeal",
    "category": "activewear",
    "price": 820,
    "oldPrice": 980,
    "badge": "new",
    "colors": [
      {
        "name_ar": "بيج ميلانج",
        "name_en": "Oatmeal Melange",
        "hex": "#D6CCC2"
      },
      {
        "name_ar": "رمادي كلاسيك",
        "name_en": "Heather Slate",
        "hex": "#9AA0A6"
      }
    ],
    "sizes": [
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=600&q=75",
      "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=600&q=75"
    ],
    "description_ar": "هودي رياضي واسع مصنوع من قطن فرينش تيري عالي الامتصاص، مزود بغطاء رأس مبطن وجيوب كانغرو مريحة وسحاب معدني سلس.",
    "description_en": "Relaxed zip hoodie tailored in breathable Egyptian cotton French terry for warm-ups and post-workout lounging.",
    "rating": 4.8,
    "reviewsCount": 44,
    "inStock": true
  },
  {
    "id": "ac-03",
    "name_ar": "تونيك رياضي طويل للمحجبات سريع الجفاف كحلي",
    "name_en": "Modest Quick-Dry Active Longline Tunic - Navy",
    "category": "activewear",
    "price": 650,
    "oldPrice": 750,
    "badge": "best",
    "colors": [
      {
        "name_ar": "كحلي رياضي",
        "name_en": "Athletic Navy",
        "hex": "#1E2B40"
      },
      {
        "name_ar": "وردي غامق",
        "name_en": "Berry Wine",
        "hex": "#6E2B3C"
      }
    ],
    "sizes": [
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=600&q=75",
      "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=600&q=75"
    ],
    "description_ar": "تونيك رياضي محتشم بطول يصل للركبة مع فتحات جانبية مريحة وفتحة إبهام في الأكمام، مصمم خصيصاً للمحجبات للتدريب بثقة وراحة تامة.",
    "description_en": "Modest sweat-wicking tunic with thumbhole cuffs, split hem for unrestricted running stride, and antibacterial finish.",
    "rating": 4.9,
    "reviewsCount": 78,
    "inStock": true
  },
  {
    "id": "ac-04",
    "name_ar": "بنطلون رياضي جوجر قطني بأرجل مريحة أسود",
    "name_en": "Brushed Cotton Fleece Jogger Pants - Black",
    "category": "activewear",
    "price": 580,
    "oldPrice": null,
    "badge": null,
    "colors": [
      {
        "name_ar": "أسود حالك",
        "name_en": "Solid Black",
        "hex": "#1C1C1C"
      },
      {
        "name_ar": "بيج رملي",
        "name_en": "Sandstone",
        "hex": "#D8C7B5"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "images": [
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=75",
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=600&q=75"
    ],
    "description_ar": "بناطيل جوجر قطنية ناعمة للغاية بوسط مطاطي برباط وأساور كاحل تمنحك إطلالة رياضية مرتبة للنادي والمشاوير اليومية.",
    "description_en": "Ultra-comfy brushed fleece jogger pants with deep secure pockets and ribbed cuffs, striking the perfect balance between style and gym utility.",
    "rating": 4.7,
    "reviewsCount": 36,
    "inStock": true
  },
  {
    "id": "ac-05",
    "name_ar": "حجاب رياضي ببروتوكول تهوية سريع التثبيت",
    "name_en": "Pull-On Breathable Performance Sports Hijab",
    "category": "activewear",
    "price": 250,
    "oldPrice": 300,
    "badge": "sale",
    "colors": [
      {
        "name_ar": "أسود كربوني",
        "name_en": "Carbon Black",
        "hex": "#1C1C1C"
      },
      {
        "name_ar": "رمادي فحمي",
        "name_en": "Charcoal Grey",
        "hex": "#464A50"
      }
    ],
    "sizes": [
      "مقاس حر مرن"
    ],
    "images": [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=75",
      "https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&w=600&q=75"
    ],
    "description_ar": "حجاب رياضي جاهز للارتداء بلمسة واحدة دون أي دبابيس، خفيف الوزن ومزود بمسامات دقيقة لتهوية الشعر وفروة الرأس أثناء الجري والتمارين المكثفة.",
    "description_en": "Zero-distraction slip-on athletic hijab made of micro-mesh aerated technical fabric that stays securely in place.",
    "rating": 4.9,
    "reviewsCount": 85,
    "inStock": true
  }
];

const I18N = {
  ar: {
    // Brand & General
    storeName: "لوميير",
    tagline: "أناقة معاصرة للمرأة العصرية",
    currency: "ج.م",
    langBtn: "English",
    newSeasonBadge: "تشكيلة الموسم الجديدة",
    shopCollectionCTA: "تسوقي التشكيلة",
    bestSellersCTA: "الأكثر مبيعاً",
    announcement: "✨ شحن مجاني لجميع محافظات مصر للطلبات فوق 1,500 ج.م | كود ترحيبي: LUMIERE10",
    
    // Nav & Header
    searchPlaceholder: "ابحثي عن فساتين، عبايات، أطقم...",
    searchTooltip: "بحث في المنتجات",
    favoritesTooltip: "المفضلة",
    cartTooltip: "سلة المشتريات",
    
    // Sections
    categoriesTitle: "تسوقي حسب الفئة",
    newArrivalsTitle: "وصل حديثاً",
    newArrivalsSubtitle: "أحدث تصاميم هذا الأسبوع المختارة بعناية لأناقتك",
    bestSellersTitle: "الأكثر طلباً ومبيعاً",
    bestSellersSubtitle: "القطع المفضلة لدى عميلاتنا في جميع محافظات مصر",
    catalogTitle: "جميع القطع والتصاميم",
    catalogSubtitle: "استكشفي تشكيلتنا الكاملة واختاري ما يناسب ذوقك الرفيع",
    
    // Filters & Sorting
    filterBtn: "تصفية المنتجات",
    filtersHeading: "خيارات التصفية",
    filterCategory: "الفئة",
    filterPrice: "نطاق السعر",
    filterSize: "المقاس",
    filterColor: "اللون",
    filterStock: "المتوفر في المخزن فقط",
    sortLabel: "ترتيب حسب:",
    sortNewest: "الأحدث أولاً",
    sortPriceAsc: "السعر: من الأقل للأعلى",
    sortPriceDesc: "السعر: من الأعلى للأقل",
    sortBestSeller: "الأكثر مبيعاً والتقييم",
    clearFilters: "مسح الفلاتر",
    applyFilters: "تطبيق الفلترة",
    resetFilters: "إعادة ضبط",
    allCategories: "جميع الفئات",
    showingResults: "عرض {count} من {total} قطعة",
    noProductsFound: "لم نجد قطعاً تطابق معايير البحث والفلترة المختارة",
    noProductsAdvice: "جربي تغيير الفلاتر أو استخدام كلمات بحث مختلفة.",
    
    // Product Badges
    badgeNew: "جديد",
    badgeSale: "تخفيض",
    badgeBest: "الأكثر مبيعاً",
    
    // Product Card & Modal
    quickView: "تفاصيل سريعة",
    addToCart: "أضيفي إلى السلة",
    addedToCart: "تمت الإضافة إلى السلة بنجاح ✨",
    addedToFavorites: "تمت الإضافة إلى المفضلة ❤️",
    removedFromFavorites: "تمت الإزالة من المفضلة",
    selectSizePrompt: "يرجى اختيار المقاس أولاً",
    selectColorPrompt: "يرجى اختيار اللون",
    sizeGuideLink: "دليل المقاسات 📏",
    inStockLabel: "متوفر للشحن الفوري",
    outOfStockLabel: "نفدت الكمية مؤقتاً",
    loadMore: "عرض المزيد من القطع",
    allLoaded: "لقد شاهدتِ جميع القطع المتوفرة",
    quantity: "الكمية",
    colorLabel: "اللون:",
    sizeLabel: "المقاس:",
    ratingReviews: "({count} تقييم)",
    
    // Cart Drawer
    cartTitle: "سلة المشتريات",
    emptyCartTitle: "سلتك فارغة حالياً",
    emptyCartDesc: "استكشفي مجموعتنا الأنيقة وأضيفي قطعك المفضلة إلى السلة",
    continueShopping: "متابعة التسوق",
    subtotal: "إجمالي المنتجات:",
    shippingEstimate: "الشحن:",
    shippingFree: "مجاني",
    shippingAtCheckout: "يُحسب عند إدخال المحافظة",
    freeShippingQualified: "🎉 تهانينا! طلبك مؤهل للشحن المجاني",
    freeShippingRemaining: "أضيفي {amount} ج.م إضافية للحصول على شحن مجاني!",
    cartTotal: "الإجمالي التقريبي:",
    proceedToCheckout: "إتمام الطلب الآن",
    removeItem: "حذف القطعة",
    
    // Favorites Drawer
    favoritesTitle: "المفضلة",
    emptyFavoritesTitle: "لا توجد منتجات في المفضلة بعد",
    emptyFavoritesDesc: "احفظي القطع التي تعجبك بالضغط على أيقونة القلب للرجوع إليها في أي وقت",
    moveToCart: "نقل إلى السلة",
    
    // Checkout Flow
    checkoutTitle: "إتمام الطلب",
    step1Title: "بيانات العميل والشحن",
    step2Title: "طريقة الدفع",
    step3Title: "مراجعة وتأكيد الطلب",
    stepLabel1: "الشحن",
    stepLabel2: "الدفع",
    stepLabel3: "المراجعة",
    
    // Step 1 Form
    fullNameLabel: "الاسم بالكامل *",
    fullNamePlaceholder: "مثال: مريم أحمد محمود",
    mobileLabel: "رقم الموبايل * (للتوصيل)",
    mobilePlaceholder: "مثال: 01012345678",
    whatsappLabel: "رقم الواتساب (اختياري)",
    whatsappPlaceholder: "01xxxxxxxxx",
    sameAsMobile: "نفس رقم الموبايل للتواصل عبر واتساب",
    governorateLabel: "المحافظة *",
    selectGovPrompt: "-- اختاري المحافظة --",
    cityLabel: "المدينة / المركز / الحي *",
    cityPlaceholder: "مثال: المعادي / الشيخ زايد / سموحة",
    addressLabel: "العنوان بالتفصيل * (الشارع، رقم العمارة، الدور، الشقة)",
    addressPlaceholder: "مثال: شارع 9، عمارة 14، الدور الثالث، شقة 6",
    landmarkLabel: "علامة مميزة قريبة (اختياري)",
    landmarkPlaceholder: "مثال: بجوار صيدلية العزبي / أمام البنك الأهلي",
    notesLabel: "ملاحظات للتوصيل (اختياري)",
    notesPlaceholder: "مثال: يرجى الاتصال قبل الوصول بساعة",
    
    // Step 2 Payment
    paymentHeading: "اختاري طريقة الدفع المفضلة",
    paymentCodTitle: "الدفع عند الاستلام (COD)",
    paymentCodDesc: "ادفعي نقداً لمندوب الشحن عند استلام الطلب ومعاينة القطع براحة وأمان.",
    paymentInstapayTitle: "انستا باي (InstaPay)",
    paymentVodafoneTitle: "فودافون كاش (Vodafone Cash)",
    paymentCardTitle: "بطاقة بنكية (فيزا / ماستركارد)",
    comingSoonBadge: "قريباً",
    
    // Step 3 Review
    orderSummary: "ملخص الطلب",
    customerDetailsSummary: "بيانات التوصيل",
    nameSummary: "الاسم:",
    phoneSummary: "الموبايل:",
    whatsappSummary: "الواتساب:",
    addressSummary: "العنوان:",
    paymentSummary: "طريقة الدفع:",
    deliveryEstSummary: "مدة التوصيل التقديرية:",
    daysLabel: "أيام عمل",
    editStep: "تعديل",
    checkoutSubmitWhatsapp: "إتمام الطلب وتأكيد عبر واتساب",
    confirmWhatsappBtn: "إتمام الطلب وتأكيد عبر واتساب",
    whatsappRedirectNotice: "سيتم تحويلك مباشرة إلى محادثة واتساب مع لوميير لإرسال تفاصيل طلبك وتأكيده فوراً.",
    backBtn: "السابق",
    nextBtn: "إتمام الطلب وتأكيد عبر واتساب",
    reviewOrderBtn: "مراجعة الطلب",
    
    // Form Validation Messages
    valNameRequired: "يرجى كتابة الاسم ثنائياً على الأقل (كلمتان).",
    valMobileInvalid: "يرجى إدخال رقم موبايل مصري صحيح يبدأ بـ 01 ومكون من 11 رقماً (مثال: 01012345678).",
    valWhatsappInvalid: "رقم الواتساب يجب أن يكون رقماً مصرياً صالحاً (11 رقماً).",
    valGovRequired: "يرجى اختيار المحافظة لحساب تكلفة ومدة الشحن بدقة.",
    valCityRequired: "يرجى تحديد المدينة أو الحي.",
    valAddressRequired: "يرجى كتابة العنوان التفصيلي لتسهيل وصول المندوب.",
    
    // Success Screen
    orderSuccessTitle: "تم تجهيز طلبك بنجاح! 🌸",
    orderSuccessDesc: "تم إعداد رسالة الطلب تلقائياً، اضغطي على زر 'إرسال' في تطبيق واتساب لإتمام التأكيد مع فريق خدمة العملاء.",
    orderRefLabel: "رقم مرجع الطلب:",
    openWhatsappAgain: "فتح محادثة واتساب مرة أخرى",
    finishAndClear: "تم الإرسال - العودة للمتجر",
    
    // Size Guide Modal
    sizeGuideTitle: "دليل المقاسات لوميير",
    sizeGuideIntro: "جميع القياسات الموضحة أدناه بالسنتيمتر (سم). نوصي باستخدام شريط قياس مرن للتأكد من اختيار المقاس المثالي.",
    sizeCol: "المقاس",
    bustCol: "محيط الصدر (سم)",
    waistCol: "محيط الخصر (سم)",
    hipsCol: "محيط الأرداف (سم)",
    sizeGuideTip: "💡 نصيحة لوميير: إذا كانت قياساتك تقع بين مقاسين، نوصي باختيار المقاس الأكبر لضمان راحة وانسيابية تامة في اللبس والمظهر.",
    closeModal: "إغلاق",
    
    // Trust Badges
    badge1Title: "توصيل سريع لجميع المحافظات",
    badge1Desc: "شحن خلال 24-48 ساعة للقاهرة والجيزة وخلال 2-4 أيام لباقي محافظات مصر.",
    badge2Title: "معاينة القطع عند الاستلام",
    badge2Desc: "يمكنكِ فحص الخامات والتأكد من الجودة والمقاس أمام مندوب الشحن بكل راحة وثقة.",
    badge3Title: "أقمشة فاخرة وتشطيب مثالي",
    badge3Desc: "نختار بعناية فائقة أجود أنواع الكريب والكتان والقطن المصري لخامات تدوم طويلاً.",
    badge4Title: "خدمة عملاء مباشرة عبر واتساب",
    badge4Desc: "فريقنا متواجد يومياً لمساعدتكِ في اختيار المقاس وتنسيق الإطلالات ومتابعة الشحنة.",
    
    // Promo Banner
    promoBannerTitle: "شحن مجاني لكل مصر عند الشراء بمبلغ 1,500 ج.م فأكثر",
    promoBannerDesc: "اختاري تشكيلة من فساتينك وعباياتك المفضلة واستمتعي بالتوصيل المجاني إلى باب منزلك.",
    promoBannerCTA: "تسوقي العرض الآن",
    
    // Footer
    footerAboutTitle: "عن لوميير",
    footerAboutText: "علامة أزياء مصرية معاصرة مكرسة لتمكين المرأة العربية من خلال تصاميم تجمع بين الأناقة الراقية والاحتشام العصري بأعلى معايير الجودة.",
    footerLinksTitle: "روابط سريعة",
    footerCareTitle: "خدمة العملاء",
    footerContactTitle: "تواصلي معنا",
    footerRights: "جميع الحقوق محفوظة لمتجر لوميير للأزياء النسائية © 2026",
    faqLink: "الأسئلة الشائعة",
    shippingPolicyLink: "سياسة الشحن والتوصيل",
    returnsPolicyLink: "سياسة الاستبدال والمعاينة",
    privacyPolicyLink: "سياسة الخصوصية",
    floatingWhatsappTooltip: "محادثة مباشرة عبر واتساب"
  },
  
  en: {
    // Brand & General
    storeName: "Lumière",
    tagline: "Contemporary Elegance for Modern Women",
    currency: "EGP",
    langBtn: "العربية",
    newSeasonBadge: "New Season Collection",
    shopCollectionCTA: "Shop Collection",
    bestSellersCTA: "Best Sellers",
    announcement: "✨ Free Shipping across all Egypt on orders over 1,500 EGP | Welcome Code: LUMIERE10",
    
    // Nav & Header
    searchPlaceholder: "Search dresses, abayas, co-ords...",
    searchTooltip: "Search products",
    favoritesTooltip: "Favorites",
    cartTooltip: "Shopping Bag",
    
    // Sections
    categoriesTitle: "Shop by Category",
    newArrivalsTitle: "New Arrivals",
    newArrivalsSubtitle: "Carefully curated novelties tailored for your effortless sophistication",
    bestSellersTitle: "Best Sellers",
    bestSellersSubtitle: "Our most coveted statement pieces adored by women across Egypt",
    catalogTitle: "Complete Collection",
    catalogSubtitle: "Explore our versatile catalog and find your next signature look",
    
    // Filters & Sorting
    filterBtn: "Filter Products",
    filtersHeading: "Refine Selection",
    filterCategory: "Category",
    filterPrice: "Price Range",
    filterSize: "Size",
    filterColor: "Color",
    filterStock: "In Stock Only",
    sortLabel: "Sort by:",
    sortNewest: "Newest Arrivals",
    sortPriceAsc: "Price: Low to High",
    sortPriceDesc: "Price: High to Low",
    sortBestSeller: "Best Sellers & Rating",
    clearFilters: "Clear Filters",
    applyFilters: "Apply Filters",
    resetFilters: "Reset All",
    allCategories: "All Categories",
    showingResults: "Showing {count} of {total} items",
    noProductsFound: "No pieces match your selected filters and search query",
    noProductsAdvice: "Try adjusting your price range or clearing some category filters.",
    
    // Product Badges
    badgeNew: "New",
    badgeSale: "Sale",
    badgeBest: "Best Seller",
    
    // Product Card & Modal
    quickView: "Quick View",
    addToCart: "Add to Bag",
    addedToCart: "Added to your shopping bag ✨",
    addedToFavorites: "Added to favorites ❤️",
    removedFromFavorites: "Removed from favorites",
    selectSizePrompt: "Please choose your size first",
    selectColorPrompt: "Please choose your color",
    sizeGuideLink: "Size Guide 📏",
    inStockLabel: "In Stock - Ready to Ship",
    outOfStockLabel: "Temporarily Sold Out",
    loadMore: "Discover More Items",
    allLoaded: "You've viewed all available pieces",
    quantity: "Quantity",
    colorLabel: "Color:",
    sizeLabel: "Size:",
    ratingReviews: "({count} reviews)",
    
    // Cart Drawer
    cartTitle: "Shopping Bag",
    emptyCartTitle: "Your bag is empty",
    emptyCartDesc: "Explore our collection and curate your dream wardrobe",
    continueShopping: "Continue Shopping",
    subtotal: "Items Subtotal:",
    shippingEstimate: "Shipping:",
    shippingFree: "Free",
    shippingAtCheckout: "Calculated with governorate",
    freeShippingQualified: "🎉 Congratulations! You qualify for Free Shipping",
    freeShippingRemaining: "Add {amount} EGP more for FREE shipping across Egypt!",
    cartTotal: "Estimated Total:",
    proceedToCheckout: "Proceed to Checkout",
    removeItem: "Remove item",
    
    // Favorites Drawer
    favoritesTitle: "Favorites",
    emptyFavoritesTitle: "No favorites yet",
    emptyFavoritesDesc: "Click the heart icon on any piece to save it for later review",
    moveToCart: "Move to Bag",
    
    // Checkout Flow
    checkoutTitle: "Checkout",
    step1Title: "Customer & Delivery Address",
    step2Title: "Payment Method",
    step3Title: "Review & Confirmation",
    stepLabel1: "Shipping",
    stepLabel2: "Payment",
    stepLabel3: "Review",
    
    // Step 1 Form
    fullNameLabel: "Full Name *",
    fullNamePlaceholder: "e.g. Mariam Ahmed Mahmoud",
    mobileLabel: "Mobile Number * (For Delivery)",
    mobilePlaceholder: "e.g. 01012345678",
    whatsappLabel: "WhatsApp Number (Optional)",
    whatsappPlaceholder: "01xxxxxxxxx",
    sameAsMobile: "Same as mobile number for WhatsApp updates",
    governorateLabel: "Governorate *",
    selectGovPrompt: "-- Select Governorate --",
    cityLabel: "City / Area / District *",
    cityPlaceholder: "e.g. Maadi / Sheikh Zayed / Smouha",
    addressLabel: "Detailed Address * (Street, Building, Floor, Apt)",
    addressPlaceholder: "e.g. Street 9, Bldg 14, 3rd Floor, Apt 6",
    landmarkLabel: "Nearest Landmark (Optional)",
    landmarkPlaceholder: "e.g. Near El Ezaby Pharmacy",
    notesLabel: "Delivery Notes (Optional)",
    notesPlaceholder: "e.g. Please call one hour prior to delivery",
    
    // Step 2 Payment
    paymentHeading: "Select Payment Method",
    paymentCodTitle: "Cash on Delivery (COD)",
    paymentCodDesc: "Pay with cash directly to the courier upon delivery with peace of mind inspection.",
    paymentInstapayTitle: "InstaPay",
    paymentVodafoneTitle: "Vodafone Cash",
    paymentCardTitle: "Credit / Debit Card",
    comingSoonBadge: "Coming Soon",
    
    // Step 3 Review
    orderSummary: "Order Summary",
    customerDetailsSummary: "Customer & Delivery Info",
    nameSummary: "Name:",
    phoneSummary: "Phone:",
    whatsappSummary: "WhatsApp:",
    addressSummary: "Address:",
    paymentSummary: "Payment:",
    deliveryEstSummary: "Estimated Delivery:",
    daysLabel: "business days",
    editStep: "Edit",
    checkoutSubmitWhatsapp: "Complete Order via WhatsApp",
    confirmWhatsappBtn: "Complete Order via WhatsApp",
    whatsappRedirectNotice: "You will be directed straight to WhatsApp to confirm and send your order details to Lumière support.",
    backBtn: "Back",
    nextBtn: "Complete Order via WhatsApp",
    reviewOrderBtn: "Review Order",
    
    // Form Validation Messages
    valNameRequired: "Please enter your full name (at least 2 words).",
    valMobileInvalid: "Please enter a valid 11-digit Egyptian mobile number starting with 01 (e.g. 01012345678).",
    valWhatsappInvalid: "WhatsApp number must be a valid 11-digit Egyptian phone number.",
    valGovRequired: "Please select your governorate to calculate shipping fee and transit time.",
    valCityRequired: "Please enter your city or district.",
    valAddressRequired: "Please enter your detailed street address.",
    
    // Success Screen
    orderSuccessTitle: "Your Order is Ready! 🌸",
    orderSuccessDesc: "Your order details have been formatted. Simply press 'Send' in WhatsApp to complete your order with our team.",
    orderRefLabel: "Order Reference:",
    openWhatsappAgain: "Open WhatsApp Again",
    finishAndClear: "Sent! Return to Store",
    
    // Size Guide Modal
    sizeGuideTitle: "Lumière Sizing Guide",
    sizeGuideIntro: "All measurements are shown in centimeters (cm). We recommend using a soft tape measure against your natural contour.",
    sizeCol: "Size",
    bustCol: "Bust (cm)",
    waistCol: "Waist (cm)",
    hipsCol: "Hips (cm)",
    sizeGuideTip: "💡 Lumière Tip: If your measurements fall between two sizes, we advise choosing the larger size for the most graceful drape and comfort.",
    closeModal: "Close",
    
    // Trust Badges
    badge1Title: "Fast Nationwide Delivery",
    badge1Desc: "Dispatched within 24-48 hours for Cairo & Giza, and 2-4 days for all Egyptian governorates.",
    badge2Title: "Inspect Upon Delivery",
    badge2Desc: "You can inspect your pieces and verify fabrics and fit with the courier before paying.",
    badge3Title: "Premium Tailoring & Fabrics",
    badge3Desc: "Hand-picked Egyptian cotton, pure linen, and luxury Korean crepes crafted to last.",
    badge4Title: "Dedicated WhatsApp Support",
    badge4Desc: "Direct personal assistance daily to help you pick your size, coordinate outfits, and track orders.",
    
    // Promo Banner
    promoBannerTitle: "Complimentary Delivery across Egypt on orders over 1,500 EGP",
    promoBannerDesc: "Indulge in our curated collection of dresses, abayas, and co-ords with doorstep complimentary shipping.",
    promoBannerCTA: "Shop the Offer",
    
    // Footer
    footerAboutTitle: "About Lumière",
    footerAboutText: "A contemporary Egyptian boutique celebrating modern women through timeless silhouettes, refined modest fashion, and unparalleled craftsmanship.",
    footerLinksTitle: "Quick Links",
    footerCareTitle: "Customer Care",
    footerContactTitle: "Get in Touch",
    footerRights: "All Rights Reserved. Lumière Women's Fashion © 2026",
    faqLink: "Frequently Asked Questions",
    shippingPolicyLink: "Shipping & Transit Times",
    returnsPolicyLink: "Exchange & Inspection Policy",
    privacyPolicyLink: "Privacy Policy",
    floatingWhatsappTooltip: "Direct WhatsApp Chat"
  }
};

const SIZE_GUIDE_DATA = [
  { size: "S", bust: "84 - 88", waist: "66 - 70", hips: "90 - 94" },
  { size: "M", bust: "89 - 94", waist: "71 - 76", hips: "95 - 100" },
  { size: "L", bust: "95 - 101", waist: "77 - 83", hips: "101 - 107" },
  { size: "XL", bust: "102 - 109", waist: "84 - 91", hips: "108 - 115" },
  { size: "XXL", bust: "110 - 118", waist: "92 - 100", hips: "116 - 124" }
];

// Universal browser/module exposure
if (typeof window !== "undefined") {
  window.STORE_CONFIG = STORE_CONFIG;
  window.LUMIERE_FALLBACK_IMAGE = LUMIERE_FALLBACK_IMAGE;
  window.GOVERNORATES = GOVERNORATES;
  window.CATEGORIES = CATEGORIES;
  window.PRODUCTS = PRODUCTS;
  window.I18N = I18N;
  window.SIZE_GUIDE_DATA = SIZE_GUIDE_DATA;
}
