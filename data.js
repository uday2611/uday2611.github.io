/* ==========================================================================
   PORTFOLIO CONTENT — edit everything here.
   Empty strings ("") are intentionally left blank; sections show a subtle
   placeholder until you fill them in. Nothing else needs to change.
   ========================================================================== */
window.PORTFOLIO = {
  name: "Uday Chahal",
  initials: "UC",

  // Rotating words in the hero ("A creative ___"). The previous word stays
  // faded above the current one.
  roles: ["Data Scientist", "AI Engineer", "Developer"],

  location: "Gurugram · Chennai, India",

  // Hero 3D character. Leave model "" to use the built-in stylised character.
  // To use YOUR OWN avatar: export a .glb (Blender, or a half-body avatar from an
  // avatar maker), put it at models/avatar.glb and set model: "models/avatar.glb".
  // height = how tall it appears; offsetY moves it up/down. A bone/object named
  // "Head" is turned automatically to follow the cursor.
  avatar: { model: "", height: 4.4, offsetY: -0.9 },

  // Link to your resume PDF (placed in this folder). "" hides the button.
  resume: "resume.pdf",

  // About paragraph
  about:
    "I'm Uday Chahal, a Computer Science and Engineering student specialising in Data Science at SRM IST. I build things with data and AI — from a Transformer language model written from scratch in PyTorch to GenAI-powered analytics dashboards and question-answering systems. I'm AWS and Oracle certified, and I enjoy turning raw data into clear insights and useful products.",

  // Small stats under About. Leave value "" to hide a stat.
  stats: [
    { value: "8.72", label: "CGPA at SRM IST" },
    { value: "5", label: "Oracle & AWS certifications" },
    { value: "3", label: "AI / ML projects built" },
  ],

  // Words that scroll in the marquee band AND behind the loading pill
  marquee: ["Data Science", "Generative AI", "Machine Learning", "Deep Learning", "Data Analytics", "Cloud & AWS"],

  // "What I do" cards (title · subtitle · description · tags)
  services: [
    {
      title: "AI & ML",
      subtitle: "Generative AI · Deep Learning · NLP",
      description:
        "Building and training models end to end — from a Transformer language model written from scratch to fine-tuned question-answering systems with Hugging Face.",
      tags: ["Python", "PyTorch", "NumPy", "Hugging Face", "Transformers", "DistilBERT", "Machine Learning", "Prompt Engineering"],
    },
    {
      title: "Data Analytics",
      subtitle: "EDA · Visualisation · Dashboards",
      description:
        "Cleaning, exploring and visualising data, and turning it into interactive dashboards that surface clear, data-driven insights.",
      tags: ["Pandas", "Matplotlib", "Streamlit", "Power BI", "SQL", "EDA", "Data Cleaning", "Statistical Analysis"],
    },
    {
      title: "Backend & Cloud",
      subtitle: "APIs · Databases · AWS",
      description:
        "Building REST APIs and database-backed applications, and designing data pipelines on the cloud as an AWS-certified data engineer.",
      tags: ["Flask", "REST APIs", "MySQL", "SQLite", "AWS", "Oracle Cloud", "Git", "C++"],
    },
  ],

  // Education & certifications timeline — oldest first.
  // role = title, company = issuer / place (shown in accent), year = big number on the right.
  career: [
    {
      role: "Oracle Certifications — OCA, OCP & OCI Foundations",
      company: "Oracle · Jan 2025",
      year: "2025",
      description: "Certified in Oracle's associate and professional tracks and Oracle Cloud Infrastructure Foundations.",
    },
    {
      role: "AWS Certified Cloud Practitioner",
      company: "Amazon Web Services · May 2026",
      year: "2026",
      description: "Validates foundational knowledge of AWS cloud concepts, core services, security, pricing and support. Credential ID: 27253b62f454b66ab00c541cdc910e8",
    },
    {
      role: "AWS Certified Data Engineer — Associate",
      company: "Amazon Web Services · May 2026",
      year: "2026",
      description: "Validates designing and running data pipelines on AWS — ingestion, transformation, storage, governance and monitoring. Credential ID: f2dcdb4f31ef4cdd9e802c1df62cb3e2",
    },
    {
      role: "B.Tech — CSE (Data Science)",
      company: "SRM Institute of Science and Technology, Kattankulathur · 2023 – 2027",
      year: "2027",
      description: "Pursuing Computer Science and Engineering with a specialisation in Data Science (expected graduation 2027). CGPA 8.72 / 10.",
    },
  ],

  // Projects (shown in the "My Work" slider).
  // image: path or URL, e.g. "images/llm.png" (leave "" for a generated placeholder). link: URL or "".
  projects: [
    {
      title: "LLM From Scratch",
      category: "Generative AI / Deep Learning · Jul – Aug 2026",
      tools: "Python, PyTorch, NumPy, Transformers, OpenWebText",
      description: "A Transformer language model built from scratch with self-attention, trained on OpenWebText for next-token prediction and evaluated on training and validation loss.",
      image: "images/llm-from-scratch.svg",
      link: "https://github.com/uday2611/llm-from-scratch",
    },
    {
      title: "GenAI Data Analytics Dashboard",
      category: "Generative AI / Data Analytics · Jun – Aug 2026",
      tools: "Python, Streamlit, Pandas, NumPy, Matplotlib",
      description: "An interactive Streamlit dashboard for data exploration and visualisation, with Generative AI producing data-driven insights from uploaded datasets.",
      image: "images/genai-dashboard.svg",
      link: "https://github.com/uday2611/GenAI-Data-Analytics",
    },
    {
      title: "AI-Powered FAQ Generator",
      category: "Generative AI / NLP · Oct – Nov 2025",
      tools: "Python, PyTorch, Hugging Face Transformers, DistilBERT, Pandas, Streamlit",
      description: "An extractive question-answering system using DistilBERT fine-tuned on SQuAD, with a Streamlit interface that answers questions from user-provided text in real time.",
      image: "images/faq-generator.svg",
      link: "https://github.com/uday2611/auto-faq-generator",
    },
  ],

  // Balls in the interactive tech-stack section
  techStack: ["Python", "PyTorch", "C++", "SQL", "Pandas", "NumPy", "Hugging Face", "Streamlit", "Flask", "Power BI", "MySQL", "SQLite", "AWS", "Oracle", "Git", "Matplotlib"],

  // Contact — leave "" to show a placeholder
  contact: {
    email: "2611uday.chahal@gmail.com",
    phone: "+91 88826 53667",
  },

  // Social links — leave url "" to hide that icon
  socials: {
    github: "https://github.com/uday2611",
    linkedin: "https://www.linkedin.com/in/uday-chahal-663b36279/",
    x: "",
    instagram: "",
  },
};
