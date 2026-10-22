// Single source of truth for names, facts and links.
// Items marked TBC are the [confirm] items from the copy document.

export const SITE = {
  url: 'https://www.thabayametsi.com',
  name: 'Thaba Ya Metsi Private Game Reserve',
  short: 'Thaba Ya Metsi',
  gps: `24°21′18.5″S 28°50′55.6″E`,
  lat: -24.355139,
  lng: 28.848778,
  address: { street: '101 Old R101 Road', locality: 'Mookgopong', region: 'Limpopo', postal: '0600', country: 'ZA' },
  maravi: 'https://www.themaravi.com/',
  talangi: 'https://talangi.com/',
  // Canonical entity description: reuse verbatim everywhere a description is asked for.
  description:
    'A 132-hectare private game reserve on the southern edge of the Waterberg, between Mookgopong and Mokopane in Limpopo, South Africa. Home to free-roaming Waterberg wildlife, a breeding herd of sable antelope, a private Boran cattle genetics programme, and one farm hotel, The Maravi.',
  // TBC: fill these before launch. Left empty, they are hidden or shown as "to be confirmed".
  officePhone: '',
  officeEmail: '',
  postalAddress: '',
  maraviPhone: '',
  maraviEmail: '',
  instagram: '',
};

export const NAV = [
  { href: '/the-reserve', label: 'The Reserve' },
  { href: '/wildlife', label: 'Wildlife' },
  { href: '/stud-and-wildlife', label: 'Stud & Wildlife' },
  { href: '/conservation', label: 'Conservation' },
  { href: '/journal', label: 'Journal' },
];

export const FOOTER_LINKS = [
  { href: '/the-name', label: 'The Name' },
  { href: '/partners', label: 'Partners & Enquiries' },
  { href: '/visit', label: 'Visit & Contact' },
  { href: '/policies', label: 'Policies & Privacy' },
];

export const FAQ = [
  ['What is Thaba Ya Metsi?', 'Thaba Ya Metsi Private Game Reserve is a 132-hectare private reserve in the Waterberg mountains of Limpopo, South Africa, between Mookgopong and Mokopane. It is home to Waterberg wildlife, a sable breeding herd, a Boran genetics programme and one farm hotel, The Maravi.'],
  ['What does Thaba Ya Metsi mean?', 'It is Sepedi for “water mountain”: thaba is mountain, metsi is water.'],
  ['Where is Thaba Ya Metsi?', `On the southern edge of the Waterberg, 250 km north of Johannesburg on the N1, about an hour south of Polokwane, at 24°21′18.5″S 28°50′55.6″E.`],
  ['Can I stay at Thaba Ya Metsi?', 'Yes, at The Maravi, the reserve’s farm hotel of eight rooms, which can be taken whole or a room at a time. Bookings are made on The Maravi’s own website.'],
  ['Is Thaba Ya Metsi a Big 5 reserve?', 'No. It is a mountain reserve of antelope, leopard, brown hyena and birds, with a sable breeding camp. Big 5 reserves are within an hour’s drive and The Maravi arranges visits.'],
  ['Is the Waterberg malaria-free?', 'Yes. The Waterberg is a malaria-free region and no prophylaxis is needed.'],
  ['What is Thaba Ya Metsi Stud & Wildlife?', 'The reserve’s breeding division: a registered Boran cattle stud, using IVF, embryo transfer and genomic selection to produce embryos, semen and selected animals for registered breeders, and a sable antelope breeding herd. It is not a public offering.'],
  ['Is the reserve open to day visitors?', 'No. Guests of The Maravi have the reserve; partners, researchers and press visit by arrangement.'],
];

export const CATEGORIES = ['Seasons', 'Sightings', 'Sable', 'Boran', 'The Land'] as const;
export const CATEGORY_PAGE: Record<string, { href: string; label: string }> = {
  Seasons: { href: '/the-reserve', label: 'the reserve through the year' },
  Sightings: { href: '/wildlife', label: 'the reserve’s free-roaming wildlife' },
  Sable: { href: '/stud-and-wildlife', label: 'the sable breeding herd' },
  Boran: { href: '/stud-and-wildlife', label: 'the Boran stud' },
  'The Land': { href: '/conservation', label: 'how the reserve looks after its land' },
};

// Photo credits for placeholder imagery (replace with the commissioned shoot).
export const CREDIT_PLACEHOLDER = 'Placeholder photograph · to be replaced by the reserve’s own shoot';
