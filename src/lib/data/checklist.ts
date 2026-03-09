export interface ChecklistItem {
  id: string;
  label: string;
  warning?: string;
  urgent?: boolean;
}

export interface ChecklistGroup {
  id: string;
  label: string;
  accent: "gold" | "neutral";
  items: ChecklistItem[];
}

export const checklistGroups: ChecklistGroup[] = [
  {
    id: "before-you-leave",
    label: "Before You Leave",
    accent: "gold",
    items: [
      {
        id: "pre-vietnam-evisa",
        label: "Vietnam e-Visa — applied & physical copy printed",
        urgent: true,
      },
      {
        id: "pre-mdac",
        label:
          "MDAC (Malaysia Digital Arrival Card) — complete 3 days before Mar 21",
      },
      {
        id: "pre-tdac",
        label: "TDAC (Thailand) — complete within 72h before Mar 29",
        urgent: true,
      },
      {
        id: "pre-passport-validity",
        label: "Passport validity — must be valid past Sep 30, 2026",
      },
      {
        id: "pre-passport-photocopy",
        label: "Passport photocopy ×2 — keep one separate from passport",
      },
      {
        id: "pre-adapter",
        label: "Universal travel adapter — with USB ports (~₹800–1,200)",
      },
      {
        id: "pre-niyo",
        label: "NIYO/Wise debit card — activated, international txns enabled",
      },
      { id: "pre-usd", label: "USD $50–100 cash — crisp $100 bills" },
      {
        id: "pre-maps",
        label: "Offline Google Maps — KL, HCMC, Hanoi, Bangkok downloaded",
      },
    ],
  },
  {
    id: "clothing",
    label: "Clothing",
    accent: "neutral",
    items: [
      {
        id: "clothes-tshirts",
        label: "5× cotton/linen t-shirts (light colours)",
      },
      { id: "clothes-shorts", label: "2× shorts" },
      {
        id: "clothes-trousers",
        label: "1× light trousers (temples — knees covered)",
      },
      {
        id: "clothes-longsleeve",
        label: "1× light long-sleeved shirt (Hanoi nights + temple cover)",
      },
      { id: "clothes-underwear", label: "7× underwear (quick-dry preferred)" },
      { id: "clothes-socks", label: "3× pairs ankle/no-show socks" },
      {
        id: "clothes-rainjacket",
        label: "1× lightweight rain jacket (doubles as AC layer)",
      },
      { id: "clothes-flipflops", label: "1× flip flops" },
      {
        id: "clothes-shoes",
        label: "1× comfortable walking shoes — wear on flight",
      },
      {
        id: "clothes-scarf",
        label: "1× thin cotton scarf/sarong (temple cover + bus blanket)",
      },
    ],
  },
  {
    id: "medicines",
    label: "Medicines",
    accent: "neutral",
    items: [
      { id: "med-crocin", label: "Crocin 500mg × 10 tabs — fever, headache" },
      {
        id: "med-brufen",
        label: "Brufen 400mg × 6 tabs",
        warning: "NOT Combiflam",
        urgent: true,
      },
      {
        id: "med-imodium",
        label: "Imodium 2mg (Loperamide) × 6 tabs — traveler's diarrhea",
      },
      {
        id: "med-ors",
        label: "ORS sachets (Electral/Enerzal) × 10 — dehydration",
      },
      {
        id: "med-antacid",
        label: "Antacid (Digene / Pudin Hara) — small pack",
      },
      {
        id: "med-avomine",
        label: "Avomine (Promethazine) × 4 tabs",
        warning: "buses/boats only",
        urgent: true,
      },
      {
        id: "med-azee",
        label: "Azee 500 / Azithromycin × 3–6 tabs",
        warning: "prescription needed",
        urgent: true,
      },
      {
        id: "med-candid",
        label: "Candid cream × 1 tube",
        warning: "PLAIN, not Candid-B",
        urgent: true,
      },
      { id: "med-betadine", label: "Betadine ointment 5g × 1 — cuts/scrapes" },
      { id: "med-bandaids", label: "Band-aids × 10 strips" },
      {
        id: "med-cetirizine",
        label: "Cetirizine 10mg × 10 tabs — non-drowsy antihistamine",
      },
    ],
  },
  {
    id: "toiletries",
    label: "Toiletries",
    accent: "neutral",
    items: [
      {
        id: "toilet-sunscreen",
        label: "Sunscreen SPF50+ PA++++ — 2× 50ml (Neutrogena/Bioré)",
      },
      {
        id: "toilet-odomos",
        label: "Odomos mosquito repellent — 50g cream or 35ml spray",
      },
      {
        id: "toilet-deodorant",
        label: "Deodorant/antiperspirant — stick or roll-on (NOT spray)",
      },
      { id: "toilet-lipbalm", label: "Lip balm with SPF (Himalaya/Biotique)" },
      {
        id: "toilet-moisturizer",
        label: "Moisturizer light gel — 30–50ml (Cetaphil/Neutrogena)",
      },
      { id: "toilet-shampoo", label: "Shampoo — 100ml" },
      { id: "toilet-conditioner", label: "Conditioner" },
      { id: "toilet-bodywash", label: "Body wash" },
      { id: "toilet-toothpaste", label: "Toothpaste — small 30g" },
      { id: "toilet-toothbrush", label: "Toothbrush" },
      { id: "toilet-razor", label: "Razor + blades" },
      { id: "toilet-wetwipes", label: "Wet wipes — pack of 20" },
      { id: "toilet-towel", label: "Microfiber travel towel (~150g)" },
      { id: "toilet-toiletry-bag", label: "Hanging toiletry bag" },
      { id: "toilet-ziploc", label: "Large ziploc bags × 3" },
    ],
  },
  {
    id: "electronics",
    label: "Electronics",
    accent: "neutral",
    items: [
      {
        id: "elec-phone",
        label: "Smartphone — offline maps downloaded before boarding",
      },
      {
        id: "elec-powerbank",
        label: "Power bank 10,000mAh — in cabin bag",
        warning: "AirAsia policy",
        urgent: true,
      },
      { id: "elec-cable", label: "USB-C cable × 1" },
      { id: "elec-adapter", label: "Universal travel adapter with USB ports" },
      { id: "elec-earphones", label: "Earphones" },
    ],
  },
  {
    id: "documents",
    label: "Documents & Essentials",
    accent: "neutral",
    items: [
      { id: "docs-passport", label: "Passport — valid >6 months past Mar 31" },
      { id: "docs-photos", label: "Passport-size photos × 4" },
      {
        id: "docs-photocopy",
        label: "Passport photocopy × 2 (one separate from passport)",
      },
      {
        id: "docs-evisa",
        label: "Vietnam e-Visa PRINTOUT — physical copy for immigration",
        urgent: true,
      },
      { id: "docs-mdac", label: "MDAC confirmation — screenshot or printout" },
      {
        id: "docs-tdac",
        label: "TDAC confirmation — complete within 72h of Mar 29",
        urgent: true,
      },
      { id: "docs-flights", label: "All flight confirmations — printed" },
      { id: "docs-hostels", label: "Hostel bookings all 4 cities — printed" },
      {
        id: "docs-insurance",
        label: "Travel insurance docs + helpline number",
      },
      { id: "docs-usd", label: "USD $50–100 cash — crisp $100 bills" },
      {
        id: "docs-niyo",
        label: "NIYO/Wise debit card — loaded, international enabled",
      },
      { id: "docs-scapia", label: "Scapia credit card (zero-forex primary)" },
      { id: "docs-backup-card", label: "Backup credit card — different bank" },
      { id: "docs-padlock", label: "Combination padlock (small) — ₹150–200" },
      { id: "docs-earplugs", label: "Earplugs × 3 pairs" },
      {
        id: "docs-emergency-card",
        label: "Emergency contact card (in wallet)",
      },
      { id: "docs-daybag", label: "Small packable day bag" },
    ],
  },
];
