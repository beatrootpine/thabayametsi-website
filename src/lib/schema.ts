import { SITE, FAQ } from '../data/site';

const R = `${SITE.url}/#reserve`;
export function siteGraph() {
  const reserve: any = {
    '@type': ['Organization', 'LandmarksOrAttraction'],
    '@id': R,
    name: SITE.name,
    alternateName: ['Thaba Ya Metsi', 'Thaba ya Metsi'],
    url: `${SITE.url}/`,
    description: SITE.description,
    address: { '@type': 'PostalAddress', streetAddress: SITE.address.street, addressLocality: SITE.address.locality, addressRegion: SITE.address.region, postalCode: SITE.address.postal, addressCountry: SITE.address.country },
    geo: { '@type': 'GeoCoordinates', latitude: SITE.lat, longitude: SITE.lng },
    logo: `${SITE.url}/brand/logo-colour.png`,
    image: `${SITE.url}/brand/logo-colour.png`,
    slogan: 'Water mountain',
    areaServed: 'Waterberg, Limpopo',
    containedInPlace: { '@type': 'Place', name: 'Waterberg Biosphere Reserve' },
    knowsAbout: ['sable antelope breeding', 'Boran cattle genetics', 'Waterberg conservation'],
    subOrganization: [{ '@id': 'https://www.themaravi.com/#hotel' }, { '@id': `${SITE.url}/#stud` }],
  };
  if (SITE.officePhone) reserve.telephone = SITE.officePhone;
  if (SITE.officeEmail) reserve.email = SITE.officeEmail;
  const sameAs = [SITE.instagram].filter(Boolean);
  if (sameAs.length) reserve.sameAs = sameAs;
  return [
    reserve,
    { '@type': 'LodgingBusiness', '@id': 'https://www.themaravi.com/#hotel', name: 'The Maravi', description: 'A farm hotel of eight rooms on Thaba Ya Metsi Private Game Reserve.', url: 'https://www.themaravi.com/', parentOrganization: { '@id': R } },
    { '@type': 'Organization', '@id': `${SITE.url}/#stud`, name: 'Thaba Ya Metsi Stud & Wildlife', description: 'The breeding division of Thaba Ya Metsi Private Game Reserve: a registered Boran cattle stud using IVF, embryo transfer and genomic selection, and a sable antelope breeding herd, in the Waterberg, Limpopo.', url: `${SITE.url}/stud-and-wildlife`, logo: `${SITE.url}/img/stud-and-wildlife-logo.svg`, parentOrganization: { '@id': R }, knowsAbout: ['Boran cattle', 'embryo transfer', 'genomic selection', 'sable antelope breeding'] },
    { '@type': 'WebSite', '@id': `${SITE.url}/#website`, url: `${SITE.url}/`, name: SITE.name, inLanguage: 'en-ZA', publisher: { '@id': R } },
  ];
}

export function breadcrumbs(items: { name: string; href: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Home', href: '/' }, ...items].map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: `${SITE.url}${it.href === '/' ? '/' : it.href}` })),
  };
}

export function faqPage() {
  return { '@type': 'FAQPage', mainEntity: FAQ.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
}

export function heroImage(name: string, caption: string) {
  return { '@type': 'ImageObject', contentUrl: `${SITE.url}/og/${name}.jpg`, caption, creditText: 'Photographer to be credited (placeholder image)' };
}
