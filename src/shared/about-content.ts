export type TeamMember = {
  id: string;
  name: string;
  nameAr: string;
  role: string;
  roleAr: string;
  motto: string;
  mottoAr: string;
  quote: string;
  quoteAr: string;
  bio: string;
  bioAr: string;
  linkedin?: string;
  initials: string;
  accent: string;
};

export const aboutQuote = {
  text: "Research on Natural Science. At SNP, we are dedicated to advancing genomics through open research and rigorous data. We believe in open science, global collaboration, and providing researchers with the tools they need to decode the fundamental building blocks of life.",
  textAr: "البحث في العلوم الطبيعية. في SNP، نكرس جهودنا لتطوير علم الجينوم من خلال البحث المفتوح والبيانات الدقيقة. نحن نؤمن بالعلم المفتوح والتعاون العالمي وتزويد الباحثين بالأدوات التي يحتاجونها لفك شفرة اللبنات الأساسية للحياة.",
};

export const peopleSection = {
  title: "Our People",
  titleAr: "فريقنا",
  intro:
    "Even the best science needs the best people behind it. Across the world, we have a team of researchers and builders ready to help bring genomics to everyone. Here are the folks leading the charge.",
  introAr:
    "حتى أفضل العلوم تحتاج إلى أفضل الأشخاص خلفها. في جميع أنحاء العالم، لدينا فريق من الباحثين والمبتكرين جاهزون لجلب علم الجينوم للجميع. هؤلاء هم القادة الذين يقودون المبادرة.",
};

export const teamMembers: TeamMember[] = [
  {
    id: "ceo",
    name: "Dr. Amira Al-Rashid",
    nameAr: "د. أميرة الراشد",
    role: "Chief Executive Officer",
    roleAr: "الرئيس التنفيذي",
    motto: "Bringing science to everyone",
    mottoAr: "جلب العلم للجميع",
    quote:
      "As head of SNP, my job is to ensure everyone is focused and aligned with a single goal — making genomics research accessible, open, and impactful for all.",
    quoteAr:
      "كرئيسة لـ SNP، مهمتي ضمان تركيز الجميع وتوافقهم على هدف واحد — جعل أبحاث علم الجينوم متاحة ومفتوحة ومؤثرة للجميع.",
    bio: "Dr. Al-Rashid founded SNP with a vision to democratize genomics research across the MENA region. With a PhD in molecular biology and over fifteen years in biotech leadership, she steers the company's strategy, partnerships, and commitment to open science.",
    bioAr:
      "أسست د. الراشد SNP برؤية لجعل أبحاث علم الجينوم في متناول الجميع في منطقة الشرق الأوسط وشمال أفريقيا. حاصلة على دكتوراه في الأحياء الجزيئية وأكثر من خمس عشرة سنة في قيادة التكنولوجيا الحيوية، تقود استراتيجية الشركة وشراكاتها والتزامها بالعلم المفتوح.",
    linkedin: "https://linkedin.com",
    initials: "AA",
    accent: "from-sky-400/80 to-blue-600/80",
  },
  {
    id: "coo",
    name: "Omar Hassan",
    nameAr: "عمر حسن",
    role: "Chief Operating Officer",
    roleAr: "مدير العمليات",
    motto: "Enabling our future",
    mottoAr: "تمكين مستقبلنا",
    quote:
      "My number one job is getting things done. I focus on supporting the broader SNP team so that we can offer the best research tools and service possible.",
    quoteAr:
      "مهمتي الأولى هي إنجاز الأمور. أركز على دعم فريق SNP الأوسع حتى نقدم أفضل أدوات وخدمات بحثية ممكنة.",
    bio: "Omar oversees day-to-day operations, logistics, and the peptide supply chain across the UAE and GCC. His background in pharmaceutical operations ensures every product meets strict quality and cold-chain standards.",
    bioAr:
      "يشرف عمر على العمليات اليومية واللوجستيات وسلسلة توريد الببتيدات في الإمارات ودول مجلس التعاون. خلفيته في عمليات الأدوية تضمن أن كل منتج يلبي معايير الجودة وسلسلة التبريد الصارمة.",
    linkedin: "https://linkedin.com",
    initials: "OH",
    accent: "from-teal-400/80 to-cyan-600/80",
  },
  {
    id: "cto",
    name: "Dr. Elena Vasquez",
    nameAr: "د. إيلينا فاسكيز",
    role: "Chief Technology Officer",
    roleAr: "مديرة التكنولوجيا",
    motto: "Humanizing technology",
    mottoAr: "إنسانية التكنولوجيا",
    quote:
      "Through my passion for enhancing the interaction between people and technology, I oversee SNP's data infrastructure, lab tools, and open-source projects.",
    quoteAr:
      "من خلال شغفي بتعزيز التفاعل بين الناس والتكنولوجيا، أشرف على البنية التحتية للبيانات وأدوات المختبر والمشاريع مفتوحة المصدر في SNP.",
    bio: "Dr. Vasquez leads SNP's engineering and bioinformatics teams. She architected the SNP Library platform and contributes to several open-source genomics tools used by researchers worldwide.",
    bioAr:
      "تقود د. فاسكيز فرق الهندسة والمعلوماتية الحيوية في SNP. صممت منصة مكتبة SNP وتساهم في عدة أدوات جينومية مفتوحة المصدر يستخدمها باحثون حول العالم.",
    linkedin: "https://linkedin.com",
    initials: "EV",
    accent: "from-indigo-400/80 to-violet-600/80",
  },
];
