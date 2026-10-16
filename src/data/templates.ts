import type { TemplateMeta, TemplateId } from '../types'
import { img } from './images'

/** Fictional number in the Kenyan format. Replace with the business's real number. */
const phone = '+254 700 000 142'
const map = (place: string) => `https://www.google.com/maps?q=${encodeURIComponent(place + ', Nairobi, Kenya')}&output=embed`

export const TEMPLATES: TemplateMeta[] = [
  {
    id: 'salon', name: 'Salon & Beauty', industry: 'Hair, nails, skincare',
    blurb: 'Elegant and warm, with a refined editorial feel that makes premium pricing feel natural.',
    features: ['Appointment CTA', 'Priced service menu', 'Stylist profiles', 'Sticky mobile booking bar'],
    cover: img('salonHero', 900, 640) + '&crop=faces', accent: '#A8506B', bg: '#FBF6F1', fontClass: "font-['Cormorant_Garamond']",
    sampleBrand: 'Zuri Beauty House', headline: 'Beauty, unhurried.',
    defaults: {
      isSample: true, businessName: 'Zuri Beauty House', tagline: 'Braids · Natural hair · Colour · Skin',
      description: 'A calm, light-filled studio in Nairobi where every appointment starts with a conversation and ends with you feeling like the best version of yourself.',
      phone, email: 'hello@example.com', address: 'Sample Street, Kilimani, Nairobi, Kenya', mapUrl: map('Kilimani'),
      hours: [{ days: 'Tue to Fri', time: '9:00 am to 7:00 pm' }, { days: 'Saturday', time: '9:00 am to 5:00 pm' }, { days: 'Sun to Mon', time: 'Closed' }],
      primary: '#A8506B', secondary: '#C9A27E', bookingUrl: '#book',
      socials: { instagram: '#', facebook: '#' },
      services: [
        { name: 'Silk Press and Style', price: 'KSh 3,500', desc: 'Consultation, wash, deep condition and a smooth, healthy press.' },
        { name: 'Balayage and Colour', price: 'from KSh 9,000', desc: 'Hand-painted, low-maintenance colour with a gloss finish.' },
        { name: 'Braids and Protective Styles', price: 'from KSh 4,500', desc: 'Knotless braids, twists, cornrows and locs, with scalp care first.' },
        { name: 'Manicure and Gel', price: 'KSh 1,800', desc: 'Shape, cuticle care and long-wear gel colour.' },
        { name: 'Radiance Facial', price: 'KSh 4,000', desc: 'Deep cleanse, exfoliation and a hydrating mask.' },
        { name: 'Bridal Styling', price: 'Enquire', desc: 'Trial plus wedding-day hair and makeup.' },
      ],
      testimonials: [
        { quote: 'I walked in with a Pinterest board and left with exactly the colour I imagined.', name: 'Wanjiru K.', role: 'Illustrative' },
        { quote: 'The calmest salon I have ever visited. Booking was effortless.', name: 'Achieng O.', role: 'Illustrative' },
        { quote: 'My braids lasted weeks and the scalp care was wonderful.', name: 'Mercy W.', role: 'Illustrative' },
      ],
      team: [
        { name: 'Zuri Mwangi', role: 'Founder and Creative Director', bio: 'Specialises in protective styles, natural hair care and rich, lived-in colour.', img: img('salonA', 500, 600) },
        { name: 'Wambui Kamau', role: 'Braid and Texture Artist', bio: 'Protective styling with scalp health first.', img: img('salonB', 500, 600) },
        { name: 'Achieng Otieno', role: 'Nail and Skin Therapist', bio: 'Clean, minimal nail art and restorative facials for every skin tone.', img: img('salonC', 500, 600) },
      ],
    },
  },
  {
    id: 'restaurant', name: 'Restaurant & Café', industry: 'Dining, café, bar',
    blurb: 'Moody, appetite-driven and image-rich, with a menu that scans easily on a phone.',
    features: ['Table reservation widget', 'Tabbed menu with prices', 'Restaurant story', 'Map & opening hours'],
    cover: img('restRoom', 900, 640), accent: '#C8553D', bg: '#1C1410', fontClass: "font-['Fraunces']",
    sampleBrand: 'Moto Kitchen', headline: 'Fire, spice and good company.',
    defaults: {
      isSample: true, businessName: 'Moto Kitchen', tagline: 'Modern Kenyan kitchen and bar',
      description: 'Kenyan classics cooked over open charcoal, a short cocktail list and a room built for long dinners. Walk-ins welcome, tables recommended.',
      phone, email: 'tables@example.com', address: 'Sample Street, Westlands, Nairobi, Kenya', mapUrl: map('Westlands'),
      hours: [{ days: 'Mon to Thu', time: '5:00 pm to 10:00 pm' }, { days: 'Fri to Sat', time: '12:00 pm to 11:00 pm' }, { days: 'Sunday', time: '11:00 am to 9:00 pm (brunch)' }],
      primary: '#C8553D', secondary: '#E3B65B', bookingUrl: '#book', socials: { instagram: '#' },
      services: [
        { category: 'Starters', name: 'Mshikaki Skewers', price: 'KSh 750', desc: 'Marinated beef, lemon, pili pili and kachumbari.' },
        { category: 'Starters', name: 'Beef Samosas', price: 'KSh 500', desc: 'Crisp pastry, tamarind chutney, fresh coriander.' },
        { category: 'Mains', name: 'Nyama Choma Platter', price: 'KSh 1,800', desc: 'Charcoal-grilled goat, ugali, sukuma wiki, kachumbari.' },
        { category: 'Mains', name: 'Pilau wa Nyama', price: 'KSh 1,100', desc: 'Spiced rice, slow-cooked beef, kachumbari.' },
        { category: 'Mains', name: 'Whole Tilapia Fry', price: 'KSh 1,400', desc: 'Crisp lake fish, ugali, greens and fresh salsa.' },
        { category: 'Desserts', name: 'Coconut Mandazi Sundae', price: 'KSh 650', desc: 'Warm mandazi, coconut ice cream, honey.' },
        { category: 'Drinks', name: 'Dawa Cocktail', price: 'KSh 900', desc: 'Vodka, honey, lime and fresh ginger.' },
        { category: 'Drinks', name: 'Fresh Passion Juice', price: 'KSh 350', desc: 'Pressed daily, lightly sweetened.' },
      ],
      testimonials: [
        { quote: 'The nyama choma is the reason we keep coming back. Lovely, warm service.', name: 'Brian M.', role: 'Illustrative' },
        { quote: 'Perfect room for a birthday dinner, loud enough to be fun and quiet enough to talk.', name: 'Faith N.', role: 'Illustrative' },
        { quote: 'Sunday brunch done right. Book ahead.', name: 'Kevin O.', role: 'Illustrative' },
      ],
      team: [],
    },
  },
  {
    id: 'law', name: 'Law Firm', industry: 'Legal practice',
    blurb: 'Calm, credible and highly readable. Restrained palette, clear consultation path, no exaggerated claims.',
    features: ['Consultation booking', 'Practice-area grid', 'Attorney profiles', 'Compliance-friendly disclaimer'],
    cover: img('lawHero', 900, 640) + '&crop=entropy', accent: '#1B2A49', bg: '#F7F5F0', fontClass: "font-['EB_Garamond']",
    sampleBrand: 'Kamau & Odhiambo Advocates', headline: 'Clear advice when it matters most.',
    defaults: {
      isSample: true, businessName: 'Kamau & Odhiambo Advocates', tagline: 'Family · Employment · Property · Wills',
      description: 'A small Nairobi firm that explains your options in plain language, discusses fees upfront and keeps you informed at every step.',
      phone, email: 'enquiries@example.com', address: 'Suite 300, Sample Plaza, Upper Hill, Nairobi, Kenya', mapUrl: map('Upper Hill'),
      hours: [{ days: 'Mon to Fri', time: '8:30 am to 5:30 pm' }, { days: 'Evenings', time: 'By appointment' }, { days: 'Weekend', time: 'Closed' }],
      primary: '#1B2A49', secondary: '#A67C37', bookingUrl: '#book', socials: { website: '#' },
      services: [
        { name: 'Family Law', desc: 'Separation, child custody and maintenance, and mediation.' },
        { name: 'Employment Law', desc: 'Contracts, workplace disputes and terminal dues advice.' },
        { name: 'Land and Property', desc: 'Buying, selling, title searches and lease review.' },
        { name: 'Wills and Succession', desc: 'Wills, powers of attorney and estate administration.' },
        { name: 'Small Business Advice', desc: 'Company registration, contracts and everyday legal support.' },
        { name: 'Dispute Resolution', desc: 'Negotiation and mediation before court.' },
      ],
      testimonials: [
        { quote: 'They explained everything without jargon and never rushed me.', name: 'Mary W.', role: 'Illustrative' },
        { quote: 'Fees were discussed upfront, which made a stressful time easier.', name: 'Peter K.', role: 'Illustrative' },
      ],
      team: [
        { name: 'Otieno Odhiambo', role: 'Managing Partner', bio: 'Guides families and business owners through disputes, contracts and succession.', tags: ['Family', 'Succession'], img: img('lawB', 500, 600) },
        { name: 'Wanjiku Kamau', role: 'Partner', bio: 'Supports employees and small employers through workplace matters.', tags: ['Employment', 'Business'], img: img('lawA', 500, 600) },
        { name: 'Halima Abdalla', role: 'Associate', bio: 'Land transactions and lease reviews for first-time buyers.', tags: ['Property'], img: img('lawC', 500, 600) },
      ],
    },
  },
  {
    id: 'clinic', name: 'Clinic & Healthcare', industry: 'GP, dental, physio',
    blurb: 'Clean, reassuring and accessible. Large type, clear appointment options and privacy-first inquiry.',
    features: ['Appointment booking', 'Services grid', 'Practitioner profiles', 'Privacy-safe inquiry'],
    cover: img('clinicHero', 900, 640) + '&crop=faces', accent: '#0E7C86', bg: '#F1F9FA', fontClass: "font-['Atkinson_Hyperlegible']",
    sampleBrand: 'Afya Family Clinic', headline: 'Care that listens, close to home.',
    defaults: {
      isSample: true, businessName: 'Afya Family Clinic', tagline: 'Family medicine · Physiotherapy · Wellbeing',
      description: 'Friendly, unhurried care for every stage of life, in the heart of Nairobi. Same-week appointments for most needs and online booking, any time.',
      phone, email: 'reception@example.com', address: 'Sample Road, Lavington, Nairobi, Kenya', mapUrl: map('Lavington'),
      hours: [{ days: 'Mon to Fri', time: '8:00 am to 6:00 pm' }, { days: 'Saturday', time: '9:00 am to 1:00 pm' }, { days: 'Sunday', time: 'Closed' }],
      primary: '#0E7C86', secondary: '#2F8F5B', bookingUrl: '#book', socials: { facebook: '#' },
      services: [
        { name: 'General Check-ups', desc: 'Routine exams, screening and health advice.' },
        { name: 'Children and Family Health', desc: 'Immunisation, growth checks and common illness.' },
        { name: 'Physiotherapy', desc: 'Injury recovery, posture and movement.' },
        { name: "Women's Health", desc: 'Preventive care and family planning.' },
        { name: 'Chronic Condition Care', desc: 'Ongoing support for diabetes, hypertension, asthma and more.' },
        { name: 'Mental Wellbeing', desc: 'Supportive consultations and referrals.' },
      ],
      testimonials: [
        { quote: 'I felt listened to from the first minute. Booking online took seconds.', name: 'Grace N.', role: 'Illustrative' },
        { quote: 'Clear explanations and a calm waiting room, and great with my kids.', name: 'Samuel K.', role: 'Illustrative' },
      ],
      team: [
        { name: 'Dr. Njeri Mwangi', role: 'Family Physician', bio: 'Whole-family care with a focus on prevention.', tags: ['Family medicine', 'Preventive care'], img: img('clinicA', 500, 600) },
        { name: 'Dr. Akinyi Odera', role: 'General Practitioner', bio: 'Chronic condition care and minor procedures.', tags: ['Chronic care', 'Minor procedures'], img: img('clinicB', 500, 600) },
        { name: 'Kiprono Koech', role: 'Physiotherapist', bio: 'Sports injuries and rehabilitation plans.', tags: ['Sports injuries', 'Rehabilitation'], img: img('nurse', 500, 600) },
      ],
    },
  },
  {
    id: 'gym', name: 'Gym & Fitness', industry: 'Gym, studio, coaching',
    blurb: 'Bold, high-energy and mobile-ready. Strong calls to action for free trials and memberships.',
    features: ['Free-trial CTA', 'Programs & classes', 'Membership tiers', 'Trainer profiles'],
    cover: img('gymWeights', 900, 640), accent: '#FF5A1F', bg: '#0B0B0C', fontClass: "font-['Barlow_Condensed']",
    sampleBrand: 'Simba Athletic Club', headline: 'Built, not given.',
    defaults: {
      isSample: true, businessName: 'Simba Athletic Club', tagline: 'Strength · Conditioning · Community',
      description: 'Coach-led training in a no-frills Nairobi gym that gets results. Start with a free trial week and find the programme that fits your life.',
      phone, email: 'join@example.com', address: 'Unit 7, Sample Works, Thika Road, Nairobi, Kenya', mapUrl: map('Thika Road'),
      hours: [{ days: 'Mon to Fri', time: '5:30 am to 9:30 pm' }, { days: 'Saturday', time: '7:00 am to 6:00 pm' }, { days: 'Sunday', time: '8:00 am to 4:00 pm' }],
      primary: '#FF5A1F', secondary: '#D6FF3F', bookingUrl: '#book', socials: { instagram: '#', facebook: '#' },
      services: [
        { name: 'Personal Training', price: 'KSh 2,500 / session', desc: 'One-to-one coaching built around your goals.' },
        { name: 'Strength Training', price: 'Included', desc: 'Barbell fundamentals and progressive overload.' },
        { name: 'Group HIIT Classes', price: 'Included', desc: '45-minute coached sessions, all levels.' },
        { name: 'Beginner Foundations', price: 'KSh 8,000 / 4 wks', desc: 'Learn the lifts safely with a small group.' },
        { name: 'Mobility and Recovery', price: 'Included', desc: 'Stretch, foam roll and move better.' },
        { name: 'Nutrition Coaching', price: 'KSh 3,500 / month', desc: 'Practical habits using food you can find locally.' },
      ],
      testimonials: [
        { quote: 'Six months in and I am stronger than I have ever been. The coaches actually care.', name: 'James M.', role: 'Illustrative' },
        { quote: 'Classes are tough but friendly. I stopped dreading Mondays.', name: 'Esther W.', role: 'Illustrative' },
        { quote: 'Great equipment and zero ego on the floor.', name: 'David O.', role: 'Illustrative' },
      ],
      team: [
        { name: 'Brian Kiplagat', role: 'Head Coach', bio: 'Strength and conditioning coach, 10+ years on the floor.', img: img('gymCoach', 500, 600) },
        { name: 'Faith Chebet', role: 'Group Training Lead', bio: 'Runs HIIT and mobility classes.', img: img('gymLead', 500, 600) },
        { name: 'Dennis Mutua', role: 'Personal Trainer', bio: 'Beginner-friendly programming and nutrition habits.', img: img('gymPT', 500, 600) },
      ],
    },
  },
  {
    id: 'studio', name: 'Business & Studio', industry: 'Agencies, studios, any business',
    blurb: 'Cinematic and bold: a full-screen scene, an oversized name, live stats and changing backdrops. Suits any local business.',
    features: ['Full-screen cinematic hero', 'Stats built from your details', 'Backdrops that change by themselves', 'Services, team and enquiry form'],
    cover: img('vistaSavanna', 900, 640), accent: '#E0A94A', bg: '#12151a', fontClass: "font-['Archivo']",
    sampleBrand: 'Kilele & Co.', headline: 'Your story, told boldly.',
    defaults: {
      isSample: true, businessName: 'Kilele & Co.', tagline: 'Brand · Events · Digital · Consulting',
      description: 'A creative and consulting studio helping Nairobi businesses look sharper, run smoother and grow with confidence.',
      phone, email: 'hello@example.com', address: 'Sample Avenue, Kilimani, Nairobi, Kenya', mapUrl: map('Kilimani'),
      hours: [{ days: 'Mon to Fri', time: '8:30 am to 6:00 pm' }, { days: 'Saturday', time: '10:00 am to 2:00 pm' }, { days: 'Sunday', time: 'Closed' }],
      primary: '#E0A94A', secondary: '#F5E9D4', bookingUrl: '#book', socials: { instagram: '#', website: '#' },
      services: [
        { name: 'Brand Strategy', price: 'from KSh 60,000', desc: 'Positioning, naming and a clear voice for your business.' },
        { name: 'Photography and Film', price: 'from KSh 35,000', desc: 'Portraits, products and short films that feel like you.' },
        { name: 'Event Planning', price: 'from KSh 80,000', desc: 'Launches, workshops and celebrations, planned end to end.' },
        { name: 'Websites and Digital', price: 'from KSh 70,000', desc: 'Fast, mobile-friendly sites and social content.' },
        { name: 'Business Consulting', price: 'from KSh 8,000 / hr', desc: 'Practical advice on pricing, operations and growth.' },
        { name: 'Training Workshops', price: 'from KSh 25,000', desc: 'Hands-on sessions for your team or community.' },
      ],
      testimonials: [
        { quote: 'They turned a rough idea into a brand we are proud of, and delivered on time.', name: 'Njeri M.', role: 'Illustrative' },
        { quote: 'Clear, calm and creative. Our launch day ran perfectly.', name: 'Otieno K.', role: 'Illustrative' },
      ],
      team: [
        { name: 'Wanjiru Njenga', role: 'Founder and Strategist', bio: '', img: img('lawA', 200, 200) },
        { name: 'Kevin Otieno', role: 'Creative Director', bio: '', img: img('lawB', 200, 200) },
        { name: 'Zawadi Njoroge', role: 'Events Lead', bio: '', img: img('lawC', 200, 200) },
      ],
    },
  },
]

export const byId = (id?: string): TemplateMeta | undefined => TEMPLATES.find((t) => t.id === (id as TemplateId))
