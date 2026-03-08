export type CountryKey = 'kl' | 'hcmc' | 'hanoi' | 'bangkok';
export type TopicKey = 'transport' | 'money' | 'food' | 'scams' | 'activities';
export type VerdictType = 'recommended' | 'budget' | 'optional' | 'skip';

export interface CountryMeta {
  name: string;
  fullName: string;
  flag: string;
  dates: string;
  colorVar: string;
}

export interface TransportOption {
  name: string;
  priceLocal: string;
  priceINR: string;
  duration: string;
  verdict: VerdictType;
  verdictLabel: string;
  tip?: string;
  mapsUrl?: string;
}

export interface TransportData {
  airportName: string;
  terminal: string;
  options: TransportOption[];
}

export interface MoneyChanger {
  name: string;
  location: string;
  tip: string;
}

export interface ATMEntry {
  bank: string;
  fee: string;
  maxPerTxn: string;
  verdict: 'free' | 'expensive' | 'avoid';
}

export interface MoneyData {
  airportExchange: {
    verdict: 'no' | 'yes-basement' | 'limited';
    summary: string;
    detail: string;
  };
  bestChangers: MoneyChanger[];
  atms: {
    best: ATMEntry[];
    avoid: ATMEntry[];
  };
  atmNote?: string;
}

export interface Dish {
  name: string;
  price: string;
  emoji: string;
}

export interface FoodData {
  mustTry: Dish[];
  vegetarianPhrase: string;
  vegetarianMeaning: string;
  warning: string;
  spot: string;
}

export interface Scam {
  name: string;
  description: string;
  avoid: string;
}

export interface Activity {
  name: string;
  cost: string;
  verdict: 'must' | 'optional' | 'skip';
  note?: string;
  mapsUrl?: string;
}

export interface CountryData {
  transport: TransportData;
  money: MoneyData;
  food: FoodData;
  scams: Scam[];
  activities: Activity[];
}

export interface CardStrategy {
  card: string;
  use: string;
  why: string;
  type: 'primary' | 'atm' | 'backup';
}

export const countries: Record<CountryKey, CountryMeta> = {
  kl: {
    name: 'KL',
    fullName: 'Kuala Lumpur',
    flag: '🇲🇾',
    dates: 'Mar 21–24',
    colorVar: '#E8001F',
  },
  hcmc: {
    name: 'HCMC',
    fullName: 'Ho Chi Minh City',
    flag: '🇻🇳',
    dates: 'Mar 24–26',
    colorVar: '#DA251D',
  },
  hanoi: {
    name: 'Hanoi',
    fullName: 'Hanoi',
    flag: '🇻🇳',
    dates: 'Mar 26–29',
    colorVar: '#DA251D',
  },
  bangkok: {
    name: 'Bangkok',
    fullName: 'Bangkok',
    flag: '🇹🇭',
    dates: 'Mar 29–31',
    colorVar: '#4E8ED4',
  },
};

export const cardStrategy: CardStrategy[] = [
  {
    card: 'Scapia Credit Card',
    use: 'POS & transit taps',
    why: '0% forex. Visa contactless works on Bangkok BTS/ARL and KL MRT fare gates directly. Lifetime free, no conditions.',
    type: 'primary',
  },
  {
    card: 'NIYO Global DCB Debit Card',
    use: 'ATM cash withdrawals',
    why: 'Zero explicit forex markup. Withdraw large amounts infrequently to minimize the ₹110+GST fee per transaction. Verify international transactions are ON in the app before departure.',
    type: 'atm',
  },
  {
    card: 'IDFC FIRST Select (or any other card)',
    use: 'Emergency backup',
    why: 'Also 0% forex. Keep it in a separate pocket from your other two cards. Different bank = doesn\'t fail at the same time.',
    type: 'backup',
  },
];

export const tripData: Record<CountryKey, CountryData> = {
  kl: {
    transport: {
      airportName: 'KLIA2',
      terminal: 'AirAsia terminal — not KLIA1',
      options: [
        {
          name: 'Star Shuttle Bus',
          priceLocal: 'RM 12',
          priceINR: '~₹230',
          duration: '~1 hr',
          verdict: 'recommended',
          verdictLabel: 'Take this',
          tip: 'Only bus that goes to both KL Sentral AND Pudu Sentral (near Chinatown). Escalator down to Level 1 Transportation Hub. Buy at counter.',
          mapsUrl: 'https://maps.google.com/?q=KLIA2+Bus+Terminal+Sepang',
        },
        {
          name: 'SkyBus / Aerobus',
          priceLocal: 'RM 15',
          priceINR: '~₹290',
          duration: '~1h 15m',
          verdict: 'budget',
          verdictLabel: 'Also fine',
          tip: 'Goes to KL Sentral. Platform A06, Level 1. Counter open 4:30 AM–2:30 AM.',
          mapsUrl: 'https://maps.google.com/?q=SkyBus+Counter+KLIA2+Sepang',
        },
        {
          name: 'KLIA Transit + MRT Yellow Line',
          priceLocal: '~RM 14',
          priceINR: '~₹270',
          duration: '~60 min',
          verdict: 'optional',
          verdictLabel: 'Rush hour only',
          tip: 'Best during 7–9 AM or 5–8 PM when buses take 2 hrs in traffic. Tap contactless Visa/MC directly at both fare gates.',
          mapsUrl: 'https://maps.google.com/?q=KLIA+Transit+Station+KLIA2',
        },
        {
          name: 'KLIA Ekspres',
          priceLocal: 'RM 55',
          priceINR: '~₹1,060',
          duration: '28–33 min',
          verdict: 'skip',
          verdictLabel: 'Skip',
          tip: '4× more expensive than the bus for 30 minutes saved. Not worth it unless you\'re late for a meeting.',
          mapsUrl: 'https://maps.google.com/?q=KLIA+Ekspres+KLIA2+Station',
        },
      ],
    },
    money: {
      airportExchange: {
        verdict: 'no',
        summary: 'No. Wait for the city.',
        detail: 'Airport rates are 6–9% worse than city changers. AmBank at KLIA2 is the least bad if you need bus fare — exchange max RM 50–100.',
      },
      bestChangers: [
        {
          name: 'Placid Express',
          location: 'Opposite Central Market, Chinatown',
          tip: 'Best rates in KL. Spread is only ~0.027 MYR off the official rate. Walk-in, no paperwork.',
        },
        {
          name: 'Max Money',
          location: 'Sungai Wang Plaza, Ground Floor, Bukit Bintang',
          tip: 'Frequently cited as best rates in Malaysia. "Best Rate" changer is right next door if you want to compare.',
        },
      ],
      atms: {
        best: [
          { bank: 'Maybank', fee: 'FREE', maxPerTxn: 'RM 1,500', verdict: 'free' },
          { bank: 'CIMB', fee: 'FREE', maxPerTxn: 'RM 1,500', verdict: 'free' },
          { bank: 'Public Bank', fee: 'FREE', maxPerTxn: 'RM 1,500', verdict: 'free' },
        ],
        avoid: [
          { bank: 'Euronet', fee: 'High + aggressive DCC', maxPerTxn: '—', verdict: 'avoid' },
        ],
      },
      atmNote: 'KL is the most foreign-card-friendly city in SE Asia. No surcharge from Malaysian ATMs — whatever you pay comes from your Indian bank.',
    },
    food: {
      mustTry: [
        { name: 'Banana leaf rice', price: '₹150–300', emoji: '🍛' },
        { name: 'Char kuey teow', price: '₹70–200', emoji: '🍜' },
        { name: 'Roti canai', price: '₹30–80', emoji: '🫓' },
        { name: 'Nasi lemak', price: '₹50–120', emoji: '🍚' },
        { name: 'Teh tarik', price: '₹30–60', emoji: '☕' },
      ],
      vegetarianPhrase: 'Saya tidak makan daging',
      vegetarianMeaning: 'I don\'t eat meat',
      warning: 'Most Malaysian food is halal (no pork) but NOT vegetarian. Fish sauce and shrimp paste appear in many dishes. Head to Brickfields (Little India) for reliable veg options — banana leaf rice restaurants everywhere.',
      spot: 'Annalakshmi Restaurant, Brickfields — pay what you wish. Run by Temple of Fine Arts. 5 min walk from KL Sentral.',
    },
    scams: [
      {
        name: 'Airport taxi touts',
        description: 'Men inside the terminal approach offering rides at "fixed rates." Always 3–5× higher than Grab or the official bus.',
        avoid: 'Use the official airport bus or book Grab from the designated Level 1 pickup point. Never follow strangers offering rides.',
      },
      {
        name: 'Batu Caves scarf vendors',
        description: 'Vendors at the base claim you\'re required to wear a scarf to enter the main cave temple. You\'re not.',
        avoid: 'Walk straight past them. The main cave has no dress code requirement.',
      },
      {
        name: 'Card game scam',
        description: 'A "friendly" local invites you to play cards at their home or nearby venue. You will always lose money — it\'s a coordinated con.',
        avoid: 'Decline any invitation from a stranger to go somewhere private or play games.',
      },
      {
        name: 'Street taxis refusing meters',
        description: 'Blue-and-yellow metered taxis quote flat rates 3–5× the actual meter fare.',
        avoid: 'Always use Grab — fixed price, GPS-tracked, no negotiation.',
      },
    ],
    activities: [
      { name: 'Batu Caves', cost: 'FREE + ₹105 train', verdict: 'must', note: 'Go before 8 AM. 272 rainbow steps. 140-ft Murugan statue. Keep bags zipped — monkeys steal.', mapsUrl: 'https://maps.google.com/?q=Batu+Caves+Kuala+Lumpur' },
      { name: 'KLCC Fountain Show', cost: 'FREE', verdict: 'must', note: 'Every 30 min, 8–10 PM. Best Petronas Towers photo from the far end of the park.', mapsUrl: 'https://maps.google.com/?q=KLCC+Park+Fountain+Kuala+Lumpur' },
      { name: 'Thean Hou Temple', cost: 'FREE', verdict: 'must', note: 'Go at sunset — red lanterns light up after 7 PM. Panoramic KL skyline.', mapsUrl: 'https://maps.google.com/?q=Thean+Hou+Temple+Kuala+Lumpur' },
      { name: 'Taman Tasik Titiwangsa', cost: 'FREE', verdict: 'must', note: 'THE panoramic KL photo — all towers (Petronas + TRX + KL Tower) reflected in the lake.', mapsUrl: 'https://maps.google.com/?q=Taman+Tasik+Titiwangsa+Kuala+Lumpur' },
      { name: 'KL Forest Eco Park (Canopy Walk)', cost: '~₹770', verdict: 'optional', note: 'Primary rainforest inside the city, 200m canopy walk. Closed Fridays.', mapsUrl: 'https://maps.google.com/?q=KL+Forest+Eco+Park+Canopy+Walk' },
      { name: 'KL Tower', cost: '~₹670', verdict: 'optional', note: 'Better views than Petronas because you can see the towers. Skip if budget is tight.', mapsUrl: 'https://maps.google.com/?q=KL+Tower+Kuala+Lumpur' },
    ],
  },

  hcmc: {
    transport: {
      airportName: 'Tan Son Nhat',
      terminal: 'Terminal 2 (T2) for international flights',
      options: [
        {
          name: 'Bus 152',
          priceLocal: '6,000 VND',
          priceINR: '~₹18',
          duration: '~50 min',
          verdict: 'recommended',
          verdictLabel: 'Take this',
          tip: 'Exit T2, go RIGHT. See the Burger King. Cross the lane in front of it — Bus 152 stop is right there. Cash only (VND). Ends at Ben Thanh Market, near Pham Ngu Lao backpacker area.',
          mapsUrl: 'https://maps.google.com/?q=Bus+152+Stop+Tan+Son+Nhat+Airport',
        },
        {
          name: 'Grab / Xanh SM',
          priceLocal: '70k–150k VND',
          priceINR: '~₹230–500',
          duration: '25–45 min',
          verdict: 'optional',
          verdictLabel: 'If you have bags',
          tip: 'Pickup at T2: exit terminal, go to lanes D1 and D2. Add your card in the app before arriving so you can pay without VND.',
          mapsUrl: 'https://maps.google.com/?q=Tan+Son+Nhat+Airport+Terminal+2+Pickup',
        },
        {
          name: 'Metered Taxi',
          priceLocal: '150k–220k VND',
          priceINR: '~₹500–750',
          duration: '25–45 min',
          verdict: 'skip',
          verdictLabel: 'Grab is safer',
          tip: 'If you must: ALL GREEN = Mai Linh (legit). White with green + RED stripe = Vinasun (legit). Snap a plate photo. Fake taxis run scams — "Mailin," "Vinasum," no uniform.',
          mapsUrl: 'https://maps.google.com/?q=Tan+Son+Nhat+International+Airport',
        },
      ],
    },
    money: {
      airportExchange: {
        verdict: 'limited',
        summary: 'Exchange ≤$20 only. Go to city for bulk.',
        detail: 'Airport rates are 0.8–3.6% worse than city gold shops. On $500, that\'s ~$18 lost. Use Grab (pay by card) to reach District 1 without needing much cash.',
      },
      bestChangers: [
        {
          name: 'Ha Tam Jewelry',
          location: '2 Nguyen An Ninh — right outside the west entrance of Ben Thanh Market',
          tip: 'The most recommended shop across Reddit, TripAdvisor, and expat forums. If there\'s a crowd outside, that\'s a good sign.',
        },
        {
          name: 'Kim Mai Gold Shop',
          location: '84C Cong Quynh, Pham Ngu Lao (backpacker area)',
          tip: 'Consistently high rates. Walking distance from most D1 hostels.',
        },
      ],
      atms: {
        best: [
          { bank: 'VPBank', fee: 'FREE', maxPerTxn: '10,000,000 VND (~₹3,400)', verdict: 'free' },
          { bank: 'ACB', fee: 'FREE', maxPerTxn: '3,000,000 VND (~₹1,020)', verdict: 'free' },
        ],
        avoid: [
          { bank: 'TPBank', fee: '3.3% of amount', maxPerTxn: '—', verdict: 'avoid' },
          { bank: 'BIDV', fee: '~3.3% (3% + 10% tax)', maxPerTxn: '—', verdict: 'avoid' },
          { bank: 'Agribank', fee: '50,000 VND flat', maxPerTxn: '—', verdict: 'expensive' },
        ],
      },
      atmNote: 'VPBank is your ATM. Find one before you land on Google Maps. Old guides saying TPBank is free are outdated — they changed in June 2025.',
    },
    food: {
      mustTry: [
        { name: 'Bánh mì', price: '₹70–100', emoji: '🥖' },
        { name: 'Phở bò', price: '₹100–200', emoji: '🍜' },
        { name: 'Cà phê sữa đá', price: '₹70–140', emoji: '☕' },
        { name: 'Gỏi cuốn (fresh spring rolls)', price: '₹50–120', emoji: '🌯' },
        { name: 'Bún bò Huế', price: '₹100–200', emoji: '🍲' },
      ],
      vegetarianPhrase: 'Tôi ăn chay',
      vegetarianMeaning: 'I eat vegetarian',
      warning: 'Fish sauce (nước mắm) is in nearly everything — even "vegetarian" dishes at regular restaurants. For truly meat/fish-free food, eat ONLY at dedicated Quán Chay (Buddhist vegetarian) restaurants. Look for CHAY on the signboard.',
      spot: 'Pi Vegetarian Bistro (near War Museum), Chay 365, Hum Restaurant. Indian backup: Baba\'s Kitchen, Tandoor (₹400–700/meal but reliable).',
    },
    scams: [
      {
        name: 'Phone/bag snatching',
        description: 'Motorbike riders snatch phones from pedestrians. Most common near Bui Vien, Dong Khoi, and Nguyen Hue Walking Street.',
        avoid: 'Never hold your phone loosely while walking on the street side. Cross-body bag worn in front. Phone goes in a front pocket when not in use.',
      },
      {
        name: 'Fake taxis',
        description: 'Taxis named "Mailin," "Vinasum," or similar charge 5–10× the real fare. One Indian tourist paid ₹4,000 for a ₹500 ride.',
        avoid: 'Grab only. At airport: Bus 152 or Grab. Never hail random taxis off the street.',
      },
      {
        name: 'Cyclo (rickshaw) scam',
        description: 'Driver quotes a low "per ride" price. At the end, claims it was "per minute" or "per person."',
        avoid: 'Avoid entirely. If you use one, get the exact price written down before getting on.',
      },
      {
        name: 'Coconut/shoulder pole sellers',
        description: 'Vendor places their carrying pole on your shoulder for a photo, opens a coconut, then demands 200k–500k VND (~₹680–1,700).',
        avoid: 'Don\'t engage, don\'t touch the pole, keep walking.',
      },
    ],
    activities: [
      { name: 'War Remnants Museum', cost: '₹140', verdict: 'must', note: 'THE reason to visit HCMC. Vietnam War from the Vietnamese perspective. Graphic. Moving. 1.5–2 hrs.', mapsUrl: 'https://maps.google.com/?q=War+Remnants+Museum+Ho+Chi+Minh+City' },
      { name: 'Reunification Palace', cost: '₹140–175', verdict: 'must', note: '10 min walk from museum. Frozen in 1975. Underground war bunkers, original 70s furniture. 1–1.5 hrs.', mapsUrl: 'https://maps.google.com/?q=Reunification+Palace+Ho+Chi+Minh+City' },
      { name: 'Saigon Central Post Office', cost: 'FREE', verdict: 'must', note: 'Designed by Gustave Eiffel. Free to enter. 500m from the Palace.', mapsUrl: 'https://maps.google.com/?q=Saigon+Central+Post+Office' },
      { name: 'Saigon River waterfront', cost: 'FREE', verdict: 'must', note: 'Best evening views. Free. Better than the ₹840 Bitexco Skydeck.', mapsUrl: 'https://maps.google.com/?q=Saigon+River+Waterfront+Ho+Chi+Minh+City' },
      { name: 'Cho Lon / Thien Hau Pagoda', cost: 'FREE', verdict: 'optional', note: 'Less touristy Chinatown. Beautiful pagoda, great street food. 30k VND Grab ride.', mapsUrl: 'https://maps.google.com/?q=Thien+Hau+Pagoda+Cholon+Ho+Chi+Minh' },
      { name: 'Bitexco Skydeck', cost: '₹840', verdict: 'skip', note: 'Rooftop cafes and the waterfront give nearly identical views for ₹200 or free.', mapsUrl: 'https://maps.google.com/?q=Bitexco+Financial+Tower+Saigon+Skydeck' },
    ],
  },

  hanoi: {
    transport: {
      airportName: 'Noi Bai',
      terminal: 'Terminal 1 (T1) — domestic flights from HCMC',
      options: [
        {
          name: 'Bus 86 Express',
          priceLocal: '45,000 VND',
          priceINR: '~₹150',
          duration: '~55 min',
          verdict: 'recommended',
          verdictLabel: 'Take this',
          tip: 'Bright orange bus with "86" sign right outside T1. Get off at Long Bien Bus Interchange — short walk to Old Quarter. AC, WiFi, luggage space. Cash only.',
          mapsUrl: 'https://maps.google.com/?q=Bus+86+Stop+Noi+Bai+Airport+Hanoi',
        },
        {
          name: 'Bus 17',
          priceLocal: '9,000 VND',
          priceINR: '~₹27',
          duration: '~1h 10–15 min',
          verdict: 'budget',
          verdictLabel: 'Ultrabudget',
          tip: 'Exit terminal, go right, walk ~200m past car park. T1 only. Good if you have light luggage.',
          mapsUrl: 'https://maps.google.com/?q=Bus+17+Stop+Noi+Bai+Airport+Hanoi',
        },
        {
          name: 'Grab / Xanh SM',
          priceLocal: '250k–350k VND',
          priceINR: '~₹850–1,200',
          duration: '30–45 min',
          verdict: 'optional',
          verdictLabel: 'Worth it if tired',
          tip: 'Surge pricing during peak hours. Xanh SM is often slightly cheaper than Grab.',
          mapsUrl: 'https://maps.google.com/?q=Noi+Bai+International+Airport+Hanoi',
        },
      ],
    },
    money: {
      airportExchange: {
        verdict: 'no',
        summary: 'No. Exchange ≤$20 for bus fare.',
        detail: 'Noi Bai airport rates are ~2% worse than Old Quarter gold shops. T2 has better rates than T1 if you must. Exchange only enough for Bus 86, then hit the gold shops.',
      },
      bestChangers: [
        {
          name: 'Quoc Trinh Gold Shop',
          location: '27 Ha Trung Street, Hoan Kiem District',
          tip: 'Recommended by locals, expats, and multiple Reddit threads for consistently excellent rates.',
        },
        {
          name: 'Kim Linh Jewelry',
          location: '67 Hang Bac Street, Hoan Kiem',
          tip: 'Top 3 in Hanoi. Easy-going staff. Ha Trung and Hang Bac streets are the gold/jewelry district.',
        },
      ],
      atms: {
        best: [
          { bank: 'VPBank', fee: 'FREE', maxPerTxn: '10,000,000 VND (~₹3,400)', verdict: 'free' },
          { bank: 'ACB', fee: 'FREE', maxPerTxn: '3,000,000 VND', verdict: 'free' },
        ],
        avoid: [
          { bank: 'TPBank', fee: '3.3% of amount', maxPerTxn: '—', verdict: 'avoid' },
          { bank: 'Agribank', fee: '50,000 VND flat', maxPerTxn: '—', verdict: 'expensive' },
        ],
      },
      atmNote: 'A VPBank ATM is at Noi Bai Airport. Same rules as HCMC: VPBank = free, TPBank = expensive.',
    },
    food: {
      mustTry: [
        { name: 'Egg coffee (cà phê trứng)', price: '₹100–150', emoji: '☕' },
        { name: 'Phở', price: '₹100–170', emoji: '🍜' },
        { name: 'Bún chả', price: '₹120–170', emoji: '🥘' },
        { name: 'Bánh mì', price: '₹50–100', emoji: '🥖' },
        { name: 'Bún bò Nam Bộ', price: '₹120–200', emoji: '🍲' },
      ],
      vegetarianPhrase: 'Tôi ăn chay — không thịt',
      vegetarianMeaning: 'I eat vegetarian — no meat',
      warning: 'Fish sauce sneaks into dishes labeled vegetarian at regular restaurants. Go to Quán Chay or Cơm Chay restaurants specifically. Look for "CHAY" on the signboard — this means Buddhist vegetarian.',
      spot: 'Cafe Giang — 39 Nguyen Huu Huan (tiny alley entrance). Egg coffee since 1946. The original. 10,000+ Google reviews.',
    },
    scams: [
      {
        name: 'Airport taxi overcharge',
        description: 'Unofficial drivers have charged up to ₹6,600 (2,000,000 VND) for a ride worth ₹1,000. Some pose as official counter staff inside the terminal.',
        avoid: 'Grab only. Walk straight past anyone offering a taxi inside the terminal.',
      },
      {
        name: 'Cyclo drivers',
        description: 'Agree on 30,000 VND, end up paying 300,000 VND because "it was per 10 minutes" or "per person."',
        avoid: 'Avoid cyclos completely in Hanoi.',
      },
      {
        name: 'Currency confusion',
        description: '500,000 VND and 20,000 VND are BOTH BLUE. Under poor lighting, vendors swap them. You hand over ₹1,700, they claim it was ₹70.',
        avoid: 'Always count your notes in good lighting. Mental math: remove 3 zeros, divide by ~300 = INR.',
      },
      {
        name: 'Road crossing (real hazard)',
        description: 'Traffic doesn\'t stop for pedestrians. Freezing mid-road or running is dangerous.',
        avoid: 'Walk slow and steady. Don\'t stop, don\'t run. Motorbikes will flow around you. By day 2 it feels normal.',
      },
    ],
    activities: [
      { name: 'Ninh Binh Day Trip', cost: '~₹3,300 all-in', verdict: 'must', note: 'The best single day of the trip. Bus (₹615 each way) + Mua Cave (₹340) + Kayak (₹700 for 2) + Rowing boat (₹850) + food.', mapsUrl: 'https://maps.google.com/?q=Ninh+Binh+Vietnam' },
      { name: 'Mua Cave (500-step climb)', cost: '₹340', verdict: 'must', note: 'Part of Ninh Binh. Best viewpoint in northern Vietnam. Dragon statue at peak. Go before crowds.', mapsUrl: 'https://maps.google.com/?q=Mua+Cave+Ninh+Binh' },
      { name: 'Trang An Kayaking', cost: '₹700 for 2', verdict: 'must', note: 'Part of Ninh Binh. 2–3 hrs self-paddling through UNESCO karst landscape.', mapsUrl: 'https://maps.google.com/?q=Trang+An+Landscape+Complex+Ninh+Binh' },
      { name: 'Hoan Kiem Lake + Ngoc Son Temple', cost: '₹100', verdict: 'must', note: 'Go at sunset. Red Huc Bridge, Turtle Tower. Peaceful even in tourist season.', mapsUrl: 'https://maps.google.com/?q=Hoan+Kiem+Lake+Hanoi' },
      { name: 'Ho Chi Minh Mausoleum', cost: '₹85', verdict: 'must', note: 'Open Sat (closed Mon & Fri). Dress code: shoulders + knees covered. Go early — opens 8 AM.', mapsUrl: 'https://maps.google.com/?q=Ho+Chi+Minh+Mausoleum+Hanoi' },
      { name: 'Water Puppet Show', cost: '₹340–560', verdict: 'optional', note: '50-min show at Thang Long Theater. Uniquely Vietnamese art form. Most visitors say worth it.', mapsUrl: 'https://maps.google.com/?q=Thang+Long+Water+Puppet+Theatre+Hanoi' },
      { name: 'Temple of Literature', cost: '₹100', verdict: 'optional', note: 'Vietnam\'s first university, 1070 AD. Beautiful courtyard architecture. 30 min visit.', mapsUrl: 'https://maps.google.com/?q=Temple+of+Literature+Hanoi' },
    ],
  },

  bangkok: {
    transport: {
      airportName: 'Suvarnabhumi',
      terminal: 'International terminal',
      options: [
        {
          name: 'Airport Rail Link (ARL)',
          priceLocal: '45 THB to Phayathai',
          priceINR: '~₹112',
          duration: '~30 min + BTS',
          verdict: 'recommended',
          verdictLabel: 'Take this',
          tip: 'Follow "Train to City" signs down to Basement Level B. Handle SuperRich exchange here first. Tap contactless Visa/MC at fare gates — no token needed. Phayathai (45 THB) → BTS to Siam/Silom. Makkasan (35 THB) → MRT to Sukhumvit/Chinatown.',
          mapsUrl: 'https://maps.google.com/?q=Suvarnabhumi+Airport+Rail+Link+Station',
        },
        {
          name: 'S1 Public Bus',
          priceLocal: '60 THB',
          priceINR: '~₹150',
          duration: '~60 min',
          verdict: 'budget',
          verdictLabel: 'Near Khao San only',
          tip: 'Direct to Khao San Road. Level 1, Exit 7. Every 30 min, 6 AM–8 PM. Only useful if your hostel is near Khao San.',
          mapsUrl: 'https://maps.google.com/?q=Suvarnabhumi+Airport+Bus+S1+Stop',
        },
        {
          name: 'Official Metered Taxi',
          priceLocal: '300–400 THB total',
          priceINR: '~₹750–1,000',
          duration: '30–60 min',
          verdict: 'optional',
          verdictLabel: 'Late night / heavy bags',
          tip: 'Level 1 "TAXI – METER ONLY" kiosk — they print a receipt slip. Add: 50 THB airport surcharge + ~70 THB expressway tolls. Pro tip: go to 4th floor Departures to hail a returning cab — no surcharge.',
          mapsUrl: 'https://maps.google.com/?q=Suvarnabhumi+Airport+Taxi+Level+1',
        },
        {
          name: 'Grab / Bolt',
          priceLocal: '400–600 THB (Bolt: ~264 THB)',
          priceINR: '~₹1,000–1,500',
          duration: '30–60 min',
          verdict: 'skip',
          verdictLabel: 'Only with data',
          tip: 'Level 1, Gate 4. Bolt is often 50% cheaper than Grab for the same route. You need a SIM/data before using these — get it at the basement first.',
          mapsUrl: 'https://maps.google.com/?q=Suvarnabhumi+Airport+Grab+Pickup+Gate+4',
        },
      ],
    },
    money: {
      airportExchange: {
        verdict: 'yes-basement',
        summary: 'Yes — ONLY at Basement Level (B Floor).',
        detail: 'SuperRich Orange is at the basement near the ARL station. Rates are nearly identical to downtown (0.05–0.50 THB per USD difference). Upper floor bank counters are 6–10% worse. Handle this before boarding the ARL.',
      },
      bestChangers: [
        {
          name: 'SuperRich Orange (1965)',
          location: 'Airport Basement B Floor, near ARL — open 5:30 AM–11 PM',
          tip: 'Exchange a reasonable amount here. The rate is so close to downtown that a special trip isn\'t worth it.',
        },
        {
          name: 'SuperRich Green (Thailand)',
          location: 'Rajdamri Road, opposite Central World (city centre)',
          tip: 'Marginally better than Orange in the city. Not at the airport. Open 9 AM–6 PM.',
        },
      ],
      atms: {
        best: [
          { bank: 'Krungsri (yellow)', fee: '250 THB flat', maxPerTxn: '30,000 THB (~₹8,700)', verdict: 'expensive' },
          { bank: 'Krungthai', fee: '250 THB flat', maxPerTxn: '30,000 THB', verdict: 'expensive' },
        ],
        avoid: [
          { bank: 'All other ATMs', fee: '250 THB flat', maxPerTxn: 'Up to 20,000 THB', verdict: 'expensive' },
        ],
      },
      atmNote: 'ALL Thai ATMs charge 250 THB (~₹625) per withdrawal — no exceptions, no workarounds. Use Krungsri/Krungthai (max 30,000 THB) to make the fee only 0.83%. Prefer SuperRich cash exchange over ATMs whenever possible.',
    },
    food: {
      mustTry: [
        { name: 'Pad thai', price: '₹100–200', emoji: '🍜' },
        { name: 'Mango sticky rice', price: '₹100–150', emoji: '🥭' },
        { name: 'Thai iced tea (cha yen)', price: '₹50–90', emoji: '🧋' },
        { name: 'Tom yum soup', price: '₹100–250', emoji: '🍲' },
        { name: 'Khao man gai', price: '₹80–150', emoji: '🍚' },
      ],
      vegetarianPhrase: 'Jay (เจ) — mai sai nam pla',
      vegetarianMeaning: 'Vegan/strict vegetarian — no fish sauce',
      warning: 'Fish sauce (nam pla) and shrimp paste are in nearly everything. Look for yellow flags with red Thai script at stalls — that\'s "jay" (strict vegan). Say "jay" clearly and they\'ll use a separate prep area.',
      spot: 'Yaowarat (Chinatown) — MRT to Wat Mangkon. Go at night. Neon lights, smoking woks, 1.5 km of stalls. Budget ₹300–500 for a full feast. Mango sticky rice: ₹100–150.',
    },
    scams: [
      {
        name: '"Palace is closed today"',
        description: 'A well-dressed stranger near Grand Palace says it\'s closed for a royal ceremony. Completely false. They offer a tuk-tuk to a "special temple" which is a gem shop.',
        avoid: 'The Grand Palace is almost never closed. Walk straight in and ignore all approaches.',
      },
      {
        name: 'Gem/jewelry shop scam',
        description: 'Told about a "government export sale" with wholesale gem prices. The gems are worthless glass. Indian travelers are specifically targeted for this scam.',
        avoid: 'Never buy gems from a stranger\'s tip. If it sounds like a deal, it\'s a scam.',
      },
      {
        name: 'Tuk-tuk "20 baht tour"',
        description: 'Any tuk-tuk offering an impossibly cheap city tour runs a commission route through gem shops, tailor shops, and tourist traps.',
        avoid: 'Use Grab, Bolt, BTS, or official taxis. Any tuk-tuk tour offer = scam.',
      },
      {
        name: '"Friendly" strangers near temples',
        description: 'Anyone who approaches first asking "where are you from?" near Grand Palace, Wat Arun, or Siam is running a scam. Real Thai locals don\'t randomly approach tourists.',
        avoid: 'Politely walk away. If they persist, "mai ao khrap" (no thanks) and keep moving.',
      },
    ],
    activities: [
      { name: 'Wat Arun (climb the prang)', cost: '₹580', verdict: 'must', note: 'Climb the steep central tower — genuinely adventurous. Porcelain mosaic art. Best in late afternoon golden light. Ferry from east bank: 4 THB.', mapsUrl: 'https://maps.google.com/?q=Wat+Arun+Bangkok' },
      { name: 'Wat Saket / Golden Mount', cost: '₹145', verdict: 'must', note: 'Best budget viewpoint in Bangkok. 360° panoramic views from 80m. Compare: MahaNakhon charges ₹2,900 for similar views.', mapsUrl: 'https://maps.google.com/?q=Wat+Saket+Golden+Mount+Bangkok' },
      { name: 'Free Vipassana at Wat Mahathat', cost: 'FREE', verdict: 'must', note: 'Walking + sitting meditation taught in English by monks. 1–3 PM daily. Small class, personal instruction. Unreplicable.', mapsUrl: 'https://maps.google.com/?q=Wat+Mahathat+Yuwaratrangsarit+Bangkok' },
      { name: 'Yaowarat Chinatown night walk', cost: 'FREE', verdict: 'must', note: 'MRT to Wat Mangkon. 1.5 km of neon lights and smoking woks. Street food feast for ₹300–500.', mapsUrl: 'https://maps.google.com/?q=Yaowarat+Chinatown+Bangkok' },
      { name: 'Lumpini Park (monitor lizards)', cost: 'FREE', verdict: 'must', note: '300–400 wild 1–2m monitor lizards roaming free. Go early morning — locals do Tai Chi at sunrise.', mapsUrl: 'https://maps.google.com/?q=Lumpini+Park+Bangkok' },
      { name: 'Grand Palace + Wat Phra Kaew', cost: '₹1,450', verdict: 'optional', note: 'Sacred Emerald Buddha exists nowhere else. 218,000 sqm of royal architecture. Go at 8:30 AM opening. Worth it if budget allows.', mapsUrl: 'https://maps.google.com/?q=Grand+Palace+Bangkok' },
      { name: 'Wat Traimit (gold Buddha)', cost: '₹115', verdict: 'optional', note: 'World\'s largest solid gold Buddha (5.5 tons). Quick 30-min visit, in Chinatown.', mapsUrl: 'https://maps.google.com/?q=Wat+Traimit+Golden+Buddha+Bangkok' },
      { name: 'MahaNakhon Skywalk', cost: '₹2,900–3,500', verdict: 'skip', note: 'Wat Saket gives 360° views for ₹145. This is pure tourist tax.', mapsUrl: 'https://maps.google.com/?q=MahaNakhon+Skywalk+Bangkok' },
    ],
  },
};
