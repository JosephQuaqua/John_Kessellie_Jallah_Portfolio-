import {
  Activity,
  BarChart3,
  Microscope,
  HeartPulse,
  Baby,
  Smartphone,
  Network,
  Globe2,
} from 'lucide-react';

export const profile = {
  name: 'John Kessellie Jallah',
  firstName: 'John Kessellie',
  lastName: 'Jallah',

  title: 'Public Health Professional',

  hero_tagline:
    'Health Researcher • Data-Driven • Community Impact',

  email: 'johnkjallah29@gmail.com',

  phone: [
    '+917020768743',
    '+231775713380',
  ],

  linkedin_url:
    'https://www.linkedin.com/in/john-kessellie-jallah-9b33a0238',

  short_bio:
    'Dedicated and results-driven Health Science graduate with hands-on experience in public health research, teaching, and community health initiatives across diverse settings.',

  full_bio:
    'Dedicated and results-driven Health Science graduate with hands-on experience in public health research, teaching, and community health initiatives across diverse settings. Demonstrates strong leadership, analytical, and problem-solving skills in addressing health challenges and promoting data-driven solutions. Passionate about leveraging data to improve population health and address health disparities.',
};

export const education = [
  {
    id: 'edu-1',
    degree: 'Postgraduate Diploma in Public Health',
    institution: 'Chhatrapati Shahu Ji Maharaj University',
    location: 'Kanpur Nagar, Uttar Pradesh, India',
    start_date: null,
    end_date: 'July 2026',
    graduation_date: 'July 2026',
    status: 'In Progress',
    cgpa: null,
    thesis: null,
    courses: [
      'Public Health',
      'Epidemiology',
      'Healthcare Administration',
      'Occupational Safety',
      'Health Information Management',
    ],
  },

  {
    id: 'edu-2',
    degree: 'Bachelor of Science in Health Sciences',
    institution:
      'Datta Meghe Institute of Higher Education and Research',
    location: 'Wardha, Maharashtra, India',
    start_date: null,
    end_date: 'July 2025',
    graduation_date: 'July 2025',
    status: 'Completed',
    cgpa: '8.29/10',

    thesis:
      'Evaluating Patient Satisfaction and Validating Patient Discharge Feedback Form at Siddharth Gupta Memorial Cancer Hospital, Wardha, India',

    courses: [
      'Public Health',
      'Epidemiology',
      'Healthcare Administration',
      'Occupational Safety',
      'Health Information Management',
    ],
  },
];

export const experiences = [
  {
    id: 'exp-1',

    organization: 'Vitamin Angels India - AMMA Project',

    position:
      'Concurrent Field Visit (Intern)',

    location:
      'Kanpur Nagar, Uttar Pradesh, India',

    start_date: 'September 2025',

    end_date: 'December 18, 2025',

    is_current: false,

    description: [
      'Conducted structured field monitoring visits across Anganwadi Centres in Uttari and Chetpurwa villages (Shivrajpur), primary-junior composite schools, and the Community Health Centre (CHC), Chaubepur, to assess delivery of maternal, adolescent, and child nutrition interventions.',

      'Supported program monitoring through direct field observation, review of facility records, and beneficiary interactions to document nutrition services, immunization linkages, and health education activities.',

      'Collaborated with frontline health workers, including Anganwadi Workers and CHC staff, to identify gaps in service coverage, referral pathways, and community participation.',

      'Applied Human-Centered Design (HCD) principles to understand beneficiary behaviors, contextual barriers, and adherence challenges related to IFA consumption and nutrition practices.',
    ],
  },

  {
    id: 'exp-2',

    organization:
      'Siddharth Gupta Memorial Cancer Hospital',

    position:
      'Administrative Assistant (Research Intern)',

    location:
      'Wardha, Maharashtra, India',

    start_date: 'March 2025',

    end_date: 'June 2025',

    is_current: false,

    description: [
      'Collected and analyzed patient satisfaction data from a sample of 355 patients to evaluate hospital service quality and improve discharge procedures.',

      'Supported data management for over 500 patient feedback forms, ensuring accurate documentation and timely submission to the quality assurance team.',

      'Maintained and organized electronic health records (EHR), discharge summaries, and billing information.',

      'Assisted in designing and preparing PowerPoint presentations for quarterly reporting meetings to support data-driven decision-making.',
    ],
  },

  {
    id: 'exp-3',

    organization:
      'Acharya Vinoba Bhave Rural Hospital Sawangi (Meghe)',

    position:
      'Summer Intern (Human Resource Department)',

    location:
      'Wardha, Maharashtra, India',

    start_date: 'May 2024',

    end_date: 'August 2024',

    is_current: false,

    description: [
      'Monitored centralized biometric attendance records to track staff presence and ensure compliance with institutional policies.',

      'Drafted and circulated memos for staff refresher training programs, coordinating logistics and communication.',

      'Entered and managed non-employee data for stipend processing, ensuring accuracy and timely submission.',
    ],
  },

  {
    id: 'exp-4',

    organization:
      'Datta Meghe Institute of Higher Education and Research',

    position:
      'Teaching Assistant (Faculty of Health Sciences)',

    location:
      'Sawangi (Meghe), Wardha, Maharashtra, India',

    start_date: 'September 2023',

    end_date: 'November 2023',

    is_current: false,

    description: [
      'Assisted faculty in delivering lectures and facilitating classroom discussions on fundamentals of research methodology.',

      'Mentored junior students in academic writing, guiding them through the research article development process.',

      'Guided students in conducting literature reviews, managing references using Zotero, and formatting manuscripts for publication.',
    ],
  },

  {
    id: 'exp-5',

    organization:
      'Liberia Institute for Statistics and Geo-Information Services (LISGIS)',

    position:
      'Census Enumerator',

    location:
      'Monrovia, Liberia',

    start_date: 'October 2022',

    end_date: 'December 2022',

    is_current: false,

    description: [
      'Conducted door-to-door household enumeration using CS-Entry software to collect demographic and socio-economic data.',

      'Captured and submitted real-time data to the LISGIS central database with GPS tagging for geospatial accuracy and validation.',

      'Ensured data quality and completeness through on-field verification, community engagement, and adherence to national census protocols.',
    ],
  },
];

export const publications = [
  {
    id: 'pub-1',

    title:
      'Navigating Tomorrow’s Healthcare: Exploring the Future of Healthcare Navigation with VR, AR, and Emerging Technologies: A Comprehensive Review',

    authors:
      'Jallah, J. K., Kanyal, D., Lalwani, L., Flahn, S. T. L., & Dweh, T. J.',

    journal:
      'Multidisciplinary Reviews',

    publication_year: 2024,

    volume: '8',

    issue: '5',

    pages: '2025140',

    doi:
      '10.31893/multirev.2025140',

    doi_url:
      'https://doi.org/10.31893/multirev.2025140',

    category:
      'Healthcare Technology',

    featured: true,

    abstract:
      'A comprehensive review exploring the future of healthcare navigation through virtual reality, augmented reality, and emerging technologies.',
  },

  {
    id: 'pub-2',

    title:
      'Public Health Approach in the Elimination and Control of Cervical Cancer: A Review',

    authors:
      'Jallah, J. K., Anjankar, A., & Nankong, F. A.',

    journal:
      'Cureus',

    publication_year: 2023,

    volume: '15',

    issue: '9',

    pages: 'e44543',

    doi:
      '10.7759/cureus.44543',

    doi_url:
      'https://doi.org/10.7759/cureus.44543',

    pmid:
      '37789997',

    pmcid:
      'PMC10544705',

    category:
      'Public Health',

    featured: true,

    abstract:
      'A review examining public health approaches for the elimination and control of cervical cancer.',
  },

  {
    id: 'pub-3',

    title:
      'A Review of the Advancements in Targeted Therapies for Breast Cancer',

    authors:
      'Jallah, J. K., Dweh, T. J., Anjankar, A., & Palma, O.',

    journal:
      'Cureus',

    publication_year: 2023,

    volume: '15',

    issue: '10',

    pages: 'e47847',

    doi:
      '10.7759/cureus.47847',

    doi_url:
      'https://doi.org/10.7759/cureus.47847',

    pmid:
      '38022130',

    pmcid:
      'PMC10679843',

    category:
      'Oncology',

    featured: true,

    abstract:
      'A review of advancements in targeted therapies for breast cancer.',
  },

  {
    id: 'pub-4',

    title:
      'The Effects of Vegan Diet on Fetus and Maternal Health: A Review',

    authors:
      'Palma, O., Jallah, J. K., Mahakalkar, M. G., & Mendhe, D. M.',

    journal:
      'Cureus',

    publication_year: 2023,

    volume: '15',

    issue: '10',

    pages: 'e47971',

    doi:
      '10.7759/cureus.47971',

    doi_url:
      'https://doi.org/10.7759/cureus.47971',

    pmid:
      '38034264',

    pmcid:
      'PMC10685994',

    category:
      'Maternal Health',

    featured: false,

    abstract:
      'A review examining the effects of a vegan diet on fetal and maternal health.',
  },

  {
    id: 'pub-5',

    title:
      'Innovations in RNA Therapeutics: A Review of Recent Advances and Emerging Technologies',

    authors:
      'Dweh, T. J., Wulu, G. J. E., Jallah, J. K., Miller, D. L., & Sahoo, J. P.',

    journal:
      'Nucleosides, Nucleotides & Nucleic Acids',

    publication_year: 2025,

    volume: null,

    issue: null,

    pages: '1–25',

    doi:
      '10.1080/15257770.2025.2451377',

    doi_url:
      'https://doi.org/10.1080/15257770.2025.2451377',

    pmid:
      '39804615',

    category:
      'Biomedical Research',

    featured: true,

    abstract:
      'A review of recent advances and emerging technologies in RNA therapeutics.',
  },

  {
    id: 'pub-6',

    title:
      'Nanoparticles in Biomedical Implants: Pioneering Progress in Healthcare',

    authors:
      'Raymond, D., Weerarathna, I. N., Jallah, J. K., & Kumar, P.',

    journal:
      'AIMS Bioengineering',

    publication_year: 2024,

    volume: '11',

    issue: '3',

    pages: '391–438',

    doi:
      '10.3934/bioeng.2024019',

    doi_url:
      'https://doi.org/10.3934/bioeng.2024019',

    category:
      'Biomedical Engineering',

    featured: false,

    abstract:
      'A review exploring the role of nanoparticles in biomedical implants and their contribution to progress in healthcare.',
  },
];

export const researchInterests = [
  {
    id: 'research-1',

    title:
      'Public Health Research',

    description:
      'Improving population health and addressing health disparities through evidence-based research.',

    icon: 'Activity',
  },

  {
    id: 'research-2',

    title:
      'Health Data & Analytics',

    description:
      'Using data, health indicators, and analytical approaches to support informed health decisions.',

    icon: 'BarChart3',
  },

  {
    id: 'research-3',

    title:
      'Healthcare Innovation',

    description:
      'Exploring emerging technologies and innovative approaches to improve healthcare delivery.',

    icon: 'Microscope',
  },

  {
    id: 'research-4',

    title:
      'Maternal & Child Health',

    description:
      'Supporting nutrition, maternal, adolescent, and child health interventions.',

    icon: 'Baby',
  },

  {
    id: 'research-5',

    title:
      'Cancer & Population Health',

    description:
      'Research focused on cancer prevention, treatment, patient experience, and public health approaches.',

    icon: 'HeartPulse',
  },

  {
    id: 'research-6',

    title:
      'Digital Health',

    description:
      'Exploring digital tools, emerging technologies, and data systems in healthcare.',

    icon: 'Smartphone',
  },
];

export const certifications = [
  {
    id: 'cert-1',
    title: 'Data and Health Indicator in Public Health',
    provider: 'Coursera',
    date: 'May 2024',
    credential_url:
      'https://www.coursera.org/account/accomplishments/verify/GW5CCQBLDEPP',
  },

  {
    id: 'cert-2',
    title: 'Environmental Hazards and Global Public Health',
    provider: 'Coursera',
    date: 'May 2024',
    credential_url:
      'https://www.coursera.org/account/accomplishments/verify/QKZXVXW8CZJA',
  },

  {
    id: 'cert-3',
    title: 'Developing a Winning Marketing Strategy',
    provider: 'Coursera',
    date: 'May 2024',
    credential_url:
      'https://www.coursera.org/account/accomplishments/verify/P3LMEYQCCEPH',
  },

  {
    id: 'cert-4',
    title: 'Essential Epidemiologic Tools for Public Health Practice',
    provider: 'Coursera',
    date: 'May 2024',
    credential_url:
      'https://www.coursera.org/account/accomplishments/verify/UY9BDLTD2HM5',
  },

  {
    id: 'cert-5',
    title: 'Summary Statistics in Public Health',
    provider: 'Coursera',
    date: 'May 2024',
    credential_url:
      'https://www.coursera.org/account/accomplishments/verify/XTVEAAH9YHBN',
  },

  {
    id: 'cert-6',
    title: 'Epidemiology: The Basic Science of Public Health',
    provider: 'Coursera',
    date: 'January 2024',
    credential_url:
      'https://www.coursera.org/account/accomplishments/verify/MQ75ZX7UJNE3',
  },

  {
    id: 'cert-7',
    title: 'Scientific Writing in Health Research',
    provider: 'Indian Council of Medical Research',
    date: 'June 2023',
  },

  {
    id: 'cert-8',
    title: 'University of Liberia Health Symposium Seminar',
    provider: 'University of Liberia',
    date: 'July 2022',
  },

  {
    id: 'cert-9',
    title: 'Peace Building and Social Entrepreneurship',
    provider: 'UNITAR',
    date: 'December 2019',
  },

  {
    id: 'cert-10',
    title: 'GBV Training',
    provider: 'International Rescue Committee',
    date: 'January 2021',
  },

  {
    id: 'cert-11',
    title: 'Computer Certificate (Beginner Level)',
    provider:
      'Faith International School of Technology (FINSTEC)',
    date: 'September 2017',
  },
];

export const leadership = [
  {
    id: 'leadership-1',

    role:
      'Peer Research Mentor',

    organization:
      'School of Allied Health Sciences',

    period:
      '2024–2025',
  },

  {
    id: 'leadership-2',

    role:
      'International Students Representative',

    organization:
      'Datta Meghe Institute of Higher Education and Research',

    period:
      '2023–2025',
  },

  {
    id: 'leadership-3',

    role:
      'Assistant Secretary (Literature Committee)',

    organization:
      'School of Allied Health Sciences',

    period:
      '2023–2024',
  },
];

export const achievements = [
  {
    id: 'achievement-1',

    title:
      'Gold Medal Award and Certificate of Participation',

    organization:
      'DMIHER Essay Competition',

    date:
      'August 2023',
  },

  {
    id: 'achievement-2',

    title:
      'Indian Government Scholarship',

    organization:
      'Merit Scholarship',

    details:
      '863,338 INR',

    date:
      'August 2022',
  },

  {
    id: 'achievement-3',

    title:
      'Senior High School Dux (Valedictorian)',

    organization:
      'Amos T. Taybior Institute',

    date:
      'August 2018',
  },
];

export const skills = {
  dataAnalytics: [
    'Basic SPSS',
    'Literature Synthesis',
    'Repository Data Extraction',
    'Zotero',
    'Mendeley',
  ],

  computer: [
    'Microsoft Excel',
    'Microsoft Word',
    'Microsoft PowerPoint',
    'Canva',
  ],

  clinical: [
    'Electronic Health Records (EHR)',
  ],

  language: [
    'English (Native Language)',
  ],
};

export const iconMap: Record<string, typeof Activity> = {
  Activity,
  BarChart3,
  Microscope,
  HeartPulse,
  Baby,
  Smartphone,
  Network,
  Globe2,
};