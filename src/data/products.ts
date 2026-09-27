import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'fruita-jordgubbe',
    slug: 'fruita-jordgubbe-frystorkad',
    fruitKey: 'jordgubbe',
    animalMascot: {
      name: {
        sv: 'Räven Felix',
        en: 'Felix the Fox',
      },
      animal: {
        sv: 'Räv',
        en: 'Fox',
      },
      trait: {
        sv: 'Älskar sommarsöta jordgubbar',
        en: 'Loves summer-sweet strawberries',
      },
    },
    name: {
      sv: 'Fruita Jordgubbe',
      en: 'Fruita Strawberry',
    },
    subtitle: {
      sv: 'Frystorkade skivor · 100% frukt · 1 ingrediens',
      en: 'Freeze-dried slices · 100% pure fruit · 1 ingredient',
    },
    cleanLabelClaim: {
      sv: 'Bara jordgubbar. Inget annat.',
      en: 'Just strawberries. Nothing else.',
    },
    description: {
      sv: 'Skördade i soliga dalar när bären nått maximal mognad. Skivade och varsamt frystorkade under vakuum. Inget tillsatt socker, ingen sirap, inga färgämnen. Bara 100% jordgubbar med en krispighet som barn älskar.',
      en: 'Harvested at peak ripeness. Sliced and gently freeze-dried under vacuum. No added sugar, no syrups, no colorants. Just 100% fruit with an airy crispness kids crave.',
    },
    price: 29,
    subscriptionPrice: 24, // Spara 17%
    weightGrams: 15,
    packSize: {
      sv: '15 g e (motsvarar ~150g färsk frukt)',
      en: '15 g e (~150g fresh fruit equivalent)',
    },
    tag: 'kids',
    badge: {
      sv: 'Barnens Favorit',
      en: 'Kids Favorite',
    },
    origin: {
      region: 'Silifke & Torosbergen',
      country: 'Turkiet (Solbältet)',
      farmerPartner: 'Akdeniz Ekologiska Fruktodlare',
      harvestSeason: 'Maj – Juni',
    },
    ingredients: {
      sv: '100% frystorkade jordgubbar. Fri från nötter, gluten, soja & konserveringsmedel.',
      en: '100% freeze-dried strawberries. Nut-free, gluten-free, no preservatives.',
    },
    nutrition: {
      energyKcal: 48,
      energyKj: 202,
      fat: '0.2g',
      ofWhichSaturates: '0.01g',
      carbohydrates: '9.6g',
      ofWhichSugars: '7.7g',
      fiber: '2.2g',
      protein: '1.0g',
      salt: '0.003g',
      vitaminC: '36mg (45% DRI / RDA)',
      potassium: '215mg',
    },
    recyclingGuide: {
      bin: 'Mjukplast',
      sv: 'Töm påsen, platta till och sortera som mjukplast vid din återvinningsstation.',
      en: 'Empty pouch, flatten and sort as soft plastic (mono-PE) at your local recycling depot.',
    },
    colorTheme: {
      bg: 'bg-rose-50/70',
      accent: 'text-rose-800',
      border: 'border-rose-200',
      pouchHex: '#FFD3D9',
      waveHex: '#FA92A4',
      textHex: '#931B2A',
    },
    image: '/images/products/jordgubbe.jpg',
    crunchProfile: {
      sv: 'Lätt, frasig och smälter snabbt i munnen till rik jordgubbssmak.',
      en: 'Light, crunchy and melts rapidly into an explosion of strawberry flavor.',
    },
    pairingTip: {
      sv: 'Perfekt i skolryggsäcken eller som fika-topping på naturell filmjölk.',
      en: 'Ideal for school backpacks or as morning yogurt topping.',
    },
    inStock: true,
    rating: 5.0,
    reviewCount: 184,
  },
  {
    id: 'fruita-banan',
    slug: 'fruita-banan-frystorkad',
    fruitKey: 'banan',
    animalMascot: {
      name: {
        sv: 'Apan Mio',
        en: 'Mio the Monkey',
      },
      animal: {
        sv: 'Apa',
        en: 'Monkey',
      },
      trait: {
        sv: 'Busig och energirik',
        en: 'Playful and full of energy',
      },
    },
    name: {
      sv: 'Fruita Banan',
      en: 'Fruita Banana',
    },
    subtitle: {
      sv: 'Frystorkade skivor · Naturligt söt och mättande',
      en: 'Freeze-dried banana slices · Naturally sweet and satisfying',
    },
    cleanLabelClaim: {
      sv: 'Bara banan. Inget annat.',
      en: 'Just banana. Nothing else.',
    },
    description: {
      sv: 'Solmogna bananer frystorkade i tjocka krispiga mynt. Ger jämn energi till skolgården och fritids utan sockertoppar eller krascher. 100% banan i varje tugga.',
      en: 'Ripe bananas sliced into thick, crunchy golden coins. Packed with natural potassium for active kids without blood sugar spikes.',
    },
    price: 27,
    subscriptionPrice: 22,
    weightGrams: 15,
    packSize: {
      sv: '15 g e (motsvarar ~1 banan)',
      en: '15 g e (~1 whole banana equivalent)',
    },
    tag: 'kids',
    badge: {
      sv: 'Mättande Mellanmål',
      en: 'Satisfying Snack',
    },
    origin: {
      region: 'Medelhavskusten & Subtropiska dalarna',
      country: 'KRAV-godkänd odlare',
      farmerPartner: 'Familjen Toros Naturfrukt',
      harvestSeason: 'Året runt',
    },
    ingredients: {
      sv: '100% frystorkad banan. 1 ingrediens, 0% tillsatser.',
      en: '100% freeze-dried banana. 1 ingredient, 0% additives.',
    },
    nutrition: {
      energyKcal: 51,
      energyKj: 215,
      fat: '0.1g',
      ofWhichSaturates: '0.02g',
      carbohydrates: '11.2g',
      ofWhichSugars: '9.0g',
      fiber: '1.4g',
      protein: '0.8g',
      salt: '0.002g',
      potassium: '290mg',
    },
    recyclingGuide: {
      bin: 'Mjukplast',
      sv: 'Sorteras som mjukplast (Mono-PE) i plastinsamlingen.',
      en: 'Sort as soft plastic (Mono-PE) in standard curbside plastic recycling.',
    },
    colorTheme: {
      bg: 'bg-amber-50/70',
      accent: 'text-amber-800',
      border: 'border-amber-200',
      pouchHex: '#FFF3A8',
      waveHex: '#FFDE59',
      textHex: '#17472A',
    },
    image: '/images/products/banan.jpg',
    crunchProfile: {
      sv: 'Krispiga mynt med mild, fyllig och len banansötma.',
      en: 'Crispy banana discs with natural caramel-like sweetness.',
    },
    pairingTip: {
      sv: 'Knapra direkt ur påsen i Kånken-ryggsäcken eller bryt över havregrynsgröt.',
      en: 'Eat straight from the pouch in school backpacks or crumble over oatmeal.',
    },
    inStock: true,
    rating: 4.9,
    reviewCount: 142,
  },
  {
    id: 'fruita-apple',
    slug: 'fruita-apple-frystorkad',
    fruitKey: 'apple',
    animalMascot: {
      name: {
        sv: 'Älgen Algot',
        en: 'Algot the Moose',
      },
      animal: {
        sv: 'Älg',
        en: 'Moose',
      },
      trait: {
        sv: 'Nordens skogskung',
        en: 'King of the Nordic forest',
      },
    },
    name: {
      sv: 'Fruita Äpple',
      en: 'Fruita Apple',
    },
    subtitle: {
      sv: 'Frystorkade äppelskivor · Frisk syra & härligt knaster',
      en: 'Freeze-dried apple slices · Crisp tartness and satisfying snap',
    },
    cleanLabelClaim: {
      sv: 'Bara äpplen med skal. Inget annat.',
      en: 'Just apples with peel. Nothing else.',
    },
    description: {
      sv: 'Äpplen från gamla bergsodlingar med skalet kvar för optimalt fiberinnehåll. Knastertorra och spröda skivor med en perfekt balans mellan syra och fruktsötma. Ersätter chips och kakor helt naturligt.',
      en: 'Mountain apples freeze-dried with peel intact for natural dietary fiber. Ultra-crispy with honest sweet-tart balance. The wholesome swap for processed chips.',
    },
    price: 27,
    subscriptionPrice: 22,
    weightGrams: 15,
    packSize: {
      sv: '15 g e (motsvarar ~150g färska äpplen)',
      en: '15 g e (~150g fresh apples equivalent)',
    },
    tag: 'mellanmal',
    badge: {
      sv: 'Extra Krispig',
      en: 'Extra Crispy',
    },
    origin: {
      region: 'Isparta Bergsodlingar',
      country: 'Turkiet',
      farmerPartner: 'Gökçay Ekologiska Äppelträdgårdar',
      harvestSeason: 'September – Oktober',
    },
    ingredients: {
      sv: '100% frystorkade äpplen med skal. Inget svavel, inget tillsatt socker.',
      en: '100% freeze-dried apples with peel. No sulfur, no added sugar.',
    },
    nutrition: {
      energyKcal: 49,
      energyKj: 206,
      fat: '0.1g',
      ofWhichSaturates: '0.01g',
      carbohydrates: '10.8g',
      ofWhichSugars: '8.7g',
      fiber: '2.4g',
      protein: '0.3g',
      salt: '0.001g',
    },
    recyclingGuide: {
      bin: 'Mjukplast',
      sv: 'Återvinns som ren mjukplast på din kommunala återvinningsstation.',
      en: 'Recycle as clean soft plastic at your municipal recycling center.',
    },
    colorTheme: {
      bg: 'bg-lime-50/70',
      accent: 'text-lime-800',
      border: 'border-lime-200',
      pouchHex: '#DBF2B5',
      waveHex: '#ACDB6D',
      textHex: '#A61A22',
    },
    image: '/images/products/apple.png',
    crunchProfile: {
      sv: 'Superkrispig textur med frisk äppelton och naturlig krisp.',
      en: 'Super-crisp texture with fresh tart-sweet apple notes.',
    },
    pairingTip: {
      sv: 'Oumbärlig till barnens förmiddagsfika på förskolan.',
      en: 'Indispensable for morning kindergarten snacks.',
    },
    inStock: true,
    rating: 4.8,
    reviewCount: 96,
  },
  {
    id: 'fruita-hallon',
    slug: 'fruita-hallon-frystorkad',
    fruitKey: 'hallon',
    animalMascot: {
      name: {
        sv: 'Kaninen Klara',
        en: 'Klara the Bunny',
      },
      animal: {
        sv: 'Kanin',
        en: 'Bunny',
      },
      trait: {
        sv: 'Mjuk, glad och bärtokig',
        en: 'Gentle, joyful and berry-loving',
      },
    },
    name: {
      sv: 'Fruita Hallon',
      en: 'Fruita Raspberry',
    },
    subtitle: {
      sv: 'Frystorkade hallon · Intensiv bärsmak & färg',
      en: 'Freeze-dried raspberries · Intense berry aroma & hue',
    },
    cleanLabelClaim: {
      sv: 'Bara hallon. Inget annat.',
      en: 'Just raspberries. Nothing else.',
    },
    description: {
      sv: 'Hela solmogna hallon som djupfrysts snabbt och torkats under skonsamt vakuum. Den djupa rubinfärgen och den friska syran är helt intakt. Mycket rik på kostfiber (4.2g per påse).',
      en: 'Whole sun-ripened raspberries cryogenically frozen and vacuum dried. Deep ruby color and natural bright acidity. Exceptionally high in dietary fiber (4.2g per pouch).',
    },
    price: 32,
    subscriptionPrice: 26,
    weightGrams: 15,
    packSize: {
      sv: '15 g e (motsvarar ~130g färska hallon)',
      en: '15 g e (~130g fresh raspberries equivalent)',
    },
    tag: 'fika',
    badge: {
      sv: 'Fiberrik Favorit',
      en: 'High Fiber',
    },
    origin: {
      region: 'Bursa & Uludağ Bergsdalar',
      country: 'Turkiet',
      farmerPartner: 'Uludağ Ekokooperativ',
      harvestSeason: 'Juli – Augusti',
    },
    ingredients: {
      sv: '100% frystorkade ekologiska hallon. 1 ingrediens.',
      en: '100% freeze-dried organic raspberries. 1 ingredient.',
    },
    nutrition: {
      energyKcal: 46,
      energyKj: 194,
      fat: '0.3g',
      ofWhichSaturates: '0.01g',
      carbohydrates: '7.8g',
      ofWhichSugars: '5.4g',
      fiber: '4.2g',
      protein: '1.2g',
      salt: '0.002g',
      vitaminC: '28mg',
    },
    recyclingGuide: {
      bin: 'Mjukplast',
      sv: 'Sorteras som mjukplast.',
      en: 'Sort as soft plastic.',
    },
    colorTheme: {
      bg: 'bg-pink-50/70',
      accent: 'text-pink-800',
      border: 'border-pink-200',
      pouchHex: '#FFCADB',
      waveHex: '#F87EA2',
      textHex: '#9C1138',
    },
    image: '/images/products/hallon.jpg',
    crunchProfile: {
      sv: 'Luftig krispighet med en ljuvlig syrlig kick som piggar upp.',
      en: 'Airy crunch followed by an uplifting tangy berry spark.',
    },
    pairingTip: {
      sv: 'Toppa fredagsfikat eller rör ner i filmjölken för naturlig rosa färg.',
      en: 'Swirl into cold filmjölk for a natural pink berry bowl.',
    },
    inStock: true,
    rating: 5.0,
    reviewCount: 165,
  },
  {
    id: 'fruita-bjornbar',
    slug: 'fruita-bjornbar-frystorkad',
    fruitKey: 'bjornbar',
    animalMascot: {
      name: {
        sv: 'Björnen Bruno',
        en: 'Bruno the Bear',
      },
      animal: {
        sv: 'Björn',
        en: 'Bear',
      },
      trait: {
        sv: 'Lugn, stark och älskar skogen',
        en: 'Calm, strong and loves the forest',
      },
    },
    name: {
      sv: 'Fruita Björnbär',
      en: 'Fruita Blackberry',
    },
    subtitle: {
      sv: 'Frystorkade bär · Rik på antioxidanter & krisp',
      en: 'Freeze-dried blackberries · Rich in antioxidants & crunch',
    },
    cleanLabelClaim: {
      sv: 'Bara björnbär. Inget annat.',
      en: 'Just blackberries. Nothing else.',
    },
    description: {
      sv: 'Skogsnära björnbär fyllda med naturliga antocyaniner och mineraler. När bären torkas under vakuum bildas en spröd honeycomb-struktur som smälter behagligt på tungan.',
      en: 'Hand-harvested blackberries packed with natural anthocyanins and minerals. Sublimation yields an airy honeycomb structure that melts delightfully on the tongue.',
    },
    price: 32,
    subscriptionPrice: 26,
    weightGrams: 15,
    packSize: {
      sv: '15 g e (motsvarar ~120g färska björnbär)',
      en: '15 g e (~120g fresh blackberries equivalent)',
    },
    tag: 'mellanmal',
    badge: {
      sv: 'Superbär',
      en: 'Superberry',
    },
    origin: {
      region: 'Svarta havets gröna sluttningar',
      country: 'Turkiet',
      farmerPartner: 'KRAV-certifierat skogskollektiv',
      harvestSeason: 'Augusti',
    },
    ingredients: {
      sv: '100% frystorkade björnbär. 1 ingrediens.',
      en: '100% freeze-dried blackberries. 1 ingredient.',
    },
    nutrition: {
      energyKcal: 47,
      energyKj: 198,
      fat: '0.4g',
      ofWhichSaturates: '0.02g',
      carbohydrates: '8.2g',
      ofWhichSugars: '5.8g',
      fiber: '3.8g',
      protein: '1.4g',
      salt: '0.002g',
    },
    recyclingGuide: {
      bin: 'Mjukplast',
      sv: 'Sorteras som mjukplast.',
      en: 'Sort as soft plastic.',
    },
    colorTheme: {
      bg: 'bg-purple-50/70',
      accent: 'text-purple-900',
      border: 'border-purple-200',
      pouchHex: '#E9D3F8',
      waveHex: '#C494E5',
      textHex: '#43195E',
    },
    image: '/images/products/bjornbar.jpg',
    crunchProfile: {
      sv: 'Djup bärighet med krispigt knaster och frisk syrlighet.',
      en: 'Deep forest fruitiness with satisfying crunch.',
    },
    pairingTip: {
      sv: 'Underbar i chiapudding eller som exklusiv fika-skål på jobbet.',
      en: 'Marvelous in morning chia puddings or office snack bowls.',
    },
    inStock: true,
    rating: 4.8,
    reviewCount: 78,
  },
  {
    id: 'fruita-mango',
    slug: 'fruita-mango-frystorkad',
    fruitKey: 'mango',
    animalMascot: {
      name: {
        sv: 'Tigern Ture',
        en: 'Ture the Tiger',
      },
      animal: {
        sv: 'Tiger',
        en: 'Tiger',
      },
      trait: {
        sv: 'Modig och älskar tropisk sötma',
        en: 'Brave and loves tropical sweetness',
      },
    },
    name: {
      sv: 'Fruita Mango',
      en: 'Fruita Mango',
    },
    subtitle: {
      sv: 'Frystorkad mango · Solmogen sötma utan tillsatser',
      en: 'Freeze-dried mango · Sun-ripened sweetness without additives',
    },
    cleanLabelClaim: {
      sv: 'Bara mango. Inget annat.',
      en: 'Just mango. Nothing else.',
    },
    description: {
      sv: 'Gyllene mangoskivor från Medelhavets varmaste kuster. Naturligt söt och krispig som barnen älskar. Helt fri från tillsatt socker, sirap eller citronsyra.',
      en: 'Golden ripe mango strips gently freeze-dried into crunchy snacks. Wholesome tropical sunshine for Swedish lunchboxes without added sugars or citric acid.',
    },
    price: 29,
    subscriptionPrice: 24,
    weightGrams: 15,
    packSize: {
      sv: '15 g e (motsvarar ~160g färsk mango)',
      en: '15 g e (~160g fresh mango equivalent)',
    },
    tag: 'kids',
    badge: {
      sv: 'Tropisk Favorit',
      en: 'Tropical Pick',
    },
    origin: {
      region: 'Antalya & Alanya kustområde',
      country: 'Turkiet',
      farmerPartner: 'Akdeniz Tropik Trädgårdar',
      harvestSeason: 'Sensommar',
    },
    ingredients: {
      sv: '100% frystorkad mango. Inget tillsatt socker.',
      en: '100% freeze-dried mango. No added sugar.',
    },
    nutrition: {
      energyKcal: 52,
      energyKj: 220,
      fat: '0.2g',
      ofWhichSaturates: '0.03g',
      carbohydrates: '11.5g',
      ofWhichSugars: '10.2g',
      fiber: '1.2g',
      protein: '0.6g',
      salt: '0.002g',
      vitaminC: '22mg',
    },
    recyclingGuide: {
      bin: 'Mjukplast',
      sv: 'Sorteras som mjukplast.',
      en: 'Sort as soft plastic.',
    },
    colorTheme: {
      bg: 'bg-orange-50/70',
      accent: 'text-orange-900',
      border: 'border-orange-200',
      pouchHex: '#FFE3A8',
      waveHex: '#FFB338',
      textHex: '#D84900',
    },
    image: '',
    crunchProfile: {
      sv: 'Frasig, gyllene krisp med intensiv mangosötma.',
      en: 'Crispy golden strips with deep sweet mango fragrance.',
    },
    pairingTip: {
      sv: 'Barnens absoluta favorit till fredagsmyset istället för godis.',
      en: 'The natural Friday-mys swap for sugary confectionery.',
    },
    inStock: true,
    rating: 5.0,
    reviewCount: 192,
  },
  {
    id: 'fruita-skolbox',
    slug: 'fruita-djurkompis-skolbox-6pack',
    fruitKey: 'bundle_all',
    animalMascot: {
      name: {
        sv: 'Hela Djurgänget',
        en: 'All 6 Animal Friends',
      },
      animal: {
        sv: 'Alla 6 djur',
        en: 'All 6 mascots',
      },
      trait: {
        sv: 'En djurkompis för varje skoldag',
        en: 'A mascot buddy for every school day',
      },
    },
    name: {
      sv: 'Fruita Skolbox (6-pack Mix)',
      en: 'Fruita School Bundle (6-Pack Mix)',
    },
    subtitle: {
      sv: 'Alla 6 smaker & djurkompisar · Vardagens räddare',
      en: 'All 6 flavors & animal friends · Weekday lifesaver',
    },
    cleanLabelClaim: {
      sv: 'Bara 100% frukt. 6 påsar med 1 ingrediens.',
      en: 'Just 100% fruit. 6 single-ingredient pouches.',
    },
    description: {
      sv: 'Lös veckans mellanmål på 10 sekunder. Lägg en påse direkt i barnens ryggsäck tillsammans med vattenflaskan. Inget kladd på böcker, tål att ligga i botten av väskan och barnen älskar att samla på de 6 djurkompisarna.',
      en: 'Solve school snacking in 10 seconds. Drop a pouch straight into school backpacks alongside the water bottle. Zero sticky mess on books, non-perishable, and kids love collecting the 6 animal mascots.',
    },
    price: 149,
    originalPrice: 176,
    subscriptionPrice: 125, // Spara extra vid månadsprenumeration
    weightGrams: 90,
    packSize: {
      sv: '6 x 15g påsar (Spara 27 kr)',
      en: '6 x 15g pouches (Save 27 SEK)',
    },
    tag: 'bundles',
    badge: {
      sv: 'Mest Populär Bland Föräldrar',
      en: 'Parents #1 Pick',
    },
    origin: {
      region: 'Hela vårt sortiment',
      country: 'KRAV & Clean Label',
      farmerPartner: 'Fruita Direkthandel',
      harvestSeason: 'Senaste skörden',
    },
    ingredients: {
      sv: '100% frystorkad frukt. 1 ingrediens per påse. 0% tillsatser.',
      en: '100% freeze-dried fruit. 1 ingredient per pouch. 0% additives.',
    },
    nutrition: {
      energyKcal: 49,
      energyKj: 206,
      fat: '0.2g',
      ofWhichSaturates: '0.01g',
      carbohydrates: '10.2g',
      ofWhichSugars: '8.2g',
      fiber: '2.5g',
      protein: '0.9g',
      salt: '0.002g',
    },
    recyclingGuide: {
      bin: 'Mjukplast & Papper',
      sv: 'Ytterkartong sorteras som pappersförpackning. Påsarna sorteras som mjukplast.',
      en: 'Outer box recycled as paper/carton. Individual pouches as soft plastic.',
    },
    colorTheme: {
      bg: 'bg-emerald-50/70',
      accent: 'text-emerald-900',
      border: 'border-emerald-300',
      pouchHex: '#E6EFE8',
      waveHex: '#B3D1BB',
      textHex: '#1C3E28',
    },
    image: '',
    crunchProfile: {
      sv: 'Full variation av krispighet för veckans alla dagar.',
      en: 'A daily variety of crunch and colors for every day of the week.',
    },
    pairingTip: {
      sv: 'Månadsprenumerera för att aldrig få slut på mellanmål i skåpet.',
      en: 'Subscribe monthly so you never run out of school snacks.',
    },
    inStock: true,
    rating: 5.0,
    reviewCount: 310,
  },
  {
    id: 'fruita-bar-trio',
    slug: 'fruita-skogsbar-trio-3pack',
    fruitKey: 'bundle_berries',
    animalMascot: {
      name: {
        sv: 'Bärgänget',
        en: 'The Berry Trio',
      },
      animal: {
        sv: 'Räven, Kaninen & Björnen',
        en: 'Fox, Bunny & Bear',
      },
      trait: {
        sv: 'Superbär med antioxidanter',
        en: 'Superberries packed with antioxidants',
      },
    },
    name: {
      sv: 'Fruita Bär-Trio (3-pack)',
      en: 'Fruita Berry Trio (3-Pack)',
    },
    subtitle: {
      sv: 'Jordgubbe, Hallon & Björnbär · 3 påsar bärlyx',
      en: 'Strawberry, Raspberry & Blackberry · 3 pouches of pure berry crunch',
    },
    cleanLabelClaim: {
      sv: 'Bara bär. Inget tillsatt socker.',
      en: 'Just berries. No added sugar.',
    },
    description: {
      sv: 'Den ultimata bärtrion för familjen. Tre påsar fullproppade med C-vitamin, antioxidanter och spröd krispighet. Räven, Kaninen och Björnen samlade i ett paket.',
      en: 'The ultimate berry collection for the family. 3 pouches packed with natural vitamins, anthocyanins, and crisp texture.',
    },
    price: 85,
    originalPrice: 93,
    subscriptionPrice: 72,
    weightGrams: 45,
    packSize: {
      sv: '3 x 15g påsar (Spara 8 kr)',
      en: '3 x 15g pouches (Save 8 SEK)',
    },
    tag: 'bundles',
    badge: {
      sv: 'Bärfavorit',
      en: 'Berry Favorite',
    },
    origin: {
      region: 'Silifke, Bursa & Torosbergen',
      country: 'KRAV & EU Ekologiskt',
      farmerPartner: 'Fruita Bärkooperativ',
      harvestSeason: 'Sommarskörd',
    },
    ingredients: {
      sv: '100% frystorkade bär (jordgubbe, hallon, björnbär).',
      en: '100% freeze-dried berries (strawberry, raspberry, blackberry).',
    },
    nutrition: {
      energyKcal: 47,
      energyKj: 198,
      fat: '0.3g',
      ofWhichSaturates: '0.01g',
      carbohydrates: '8.5g',
      ofWhichSugars: '6.3g',
      fiber: '3.4g',
      protein: '1.2g',
      salt: '0.002g',
    },
    recyclingGuide: {
      bin: 'Mjukplast',
      sv: 'Sorteras som mjukplast.',
      en: 'Sort as soft plastic.',
    },
    colorTheme: {
      bg: 'bg-rose-50/70',
      accent: 'text-rose-900',
      border: 'border-rose-300',
      pouchHex: '#F9D8E6',
      waveHex: '#D998C4',
      textHex: '#5C1D38',
    },
    image: '',
    crunchProfile: {
      sv: 'Från söt jordgubbscips till frisk syrlig hallon- och björnbärs-crunch.',
      en: 'From sweet strawberry crunch to tangy raspberry and blackberry pop.',
    },
    pairingTip: {
      sv: 'Gör frukostgröten eller filmjölken till dagens höjdpunkt.',
      en: 'Elevates oat porridge or cold filmjölk into the highlight of the morning.',
    },
    inStock: true,
    rating: 4.9,
    reviewCount: 125,
  }
];
