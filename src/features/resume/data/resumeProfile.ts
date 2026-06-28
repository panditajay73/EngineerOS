export type ResumeExperience = {
  company: string;
  role: string;
  period: string;
  highlights: string[];
};

export type ResumeProject = {
  name: string;
  stack: string[];
  highlights: string[];
};

export type ResumeEducation = {
  institution: string;
  credential: string;
  period: string;
  score: string;
};

export const resumeProfile = {
  name: "Ajay Pandey",
  targetRole: ".NET Backend / Full-Stack Software Engineer",
  email: "pandeyajaysdr@gmail.com",
  phone: "7348115017",
  github: {
    label: "github.com/panditajay73",
    url: "https://github.com/panditajay73"
  },
  linkedin: {
    label: "linkedin.com/in/ajay-pandey-82045319a",
    url: "https://www.linkedin.com/in/ajay-pandey-82045319a"
  },
  skillGroups: [
    {
      label: "Backend",
      skills: ["C#", "ASP.NET Core", "RESTful APIs", "Entity Framework", "Python", "Java basics"]
    },
    {
      label: "Frontend",
      skills: ["React.js", "JavaScript ES6+", "HTML5", "CSS3"]
    },
    {
      label: "Database",
      skills: ["Microsoft SQL Server", "MySQL"]
    },
    {
      label: "Generative AI and Automation",
      skills: [
        "OpenAI API",
        "Claude API",
        "Gemini API",
        "Agentic AI Workflows",
        "AI Agents",
        "Prompt Engineering",
        "Python Automation",
        "Workflow Automation"
      ]
    },
    {
      label: "Cloud and Tools",
      skills: ["Azure App Services", "Git", "GitHub", "Copilot", "Postman"]
    },
    {
      label: "Core Concepts",
      skills: [
        "OOP",
        "Data Structures and Algorithms",
        "DBMS",
        "System Design Fundamentals",
        "Authentication and Authorization"
      ]
    }
  ],
  experience: [
    {
      company: "Wipro Technologies",
      role: "Project Engineer",
      period: "Mar 2025 - Present",
      highlights: [
        "Worked on backend development using ASP.NET Core and SQL Server for internal applications.",
        "Built and maintained REST APIs for user data and application workflows.",
        "Improved API performance by optimizing SQL queries and using indexing.",
        "Implemented authentication and role-based access control.",
        "Collaborated in an Agile environment and used Git for version control."
      ]
    },
    {
      company: "Saral ERP Solutions Pvt Ltd.",
      role: "Software Developer Trainee",
      period: "Jun 2024 - Feb 2025",
      highlights: [
        "Developed an e-commerce web application using ASP.NET Web Forms and SQL Server.",
        "Worked on product listing, order management, and user authentication modules.",
        "Integrated payment and email notification APIs.",
        "Wrote SQL queries and designed simple database structures."
      ]
    },
    {
      company: "Chegg",
      role: "Subject Matter Expert - Computer Science",
      period: "May 2022 - Jan 2023",
      highlights: [
        "Solved student queries related to MySQL, OOP, and Data Structures.",
        "Improved problem-solving and analytical thinking skills."
      ]
    }
  ] satisfies ResumeExperience[],
  projects: [
    {
      name: "The Auction House",
      stack: ["React.js", "ASP.NET Core", "SQL Server"],
      highlights: [
        "Developed a full-stack auction platform where users can list items and place bids.",
        "Built REST APIs for user management, product listings, and bidding functionality.",
        "Implemented bidding logic to track and update the highest bid.",
        "Used SQL Server for user, product, and bid data."
      ]
    },
    {
      name: "IntelliApply - AI Job Application Assistant",
      stack: ["Python", "OpenAI API", "LangGraph", "React.js"],
      highlights: [
        "Built an agentic AI application to tailor resumes based on job descriptions.",
        "Implemented multi-agent workflows for resume analysis and ATS optimization.",
        "Integrated OpenAI APIs for resume enhancement, cover letters, and interview preparation.",
        "Developed automated workflows using Python and REST API integrations."
      ]
    }
  ] satisfies ResumeProject[],
  education: [
    {
      institution: "KIET Group of Institutions, Ghaziabad",
      credential: "B.Tech - Information Technology",
      period: "2021 - 2024",
      score: "CGPA: 8.2"
    },
    {
      institution: "MMIT Siddharthnagar",
      credential: "Diploma - Computer Science and Engineering",
      period: "2018 - 2021",
      score: "Percentage: 79.85"
    }
  ] satisfies ResumeEducation[],
  certifications: [
    "Microsoft Azure Fundamentals (AZ-900)",
    "GitHub Foundations and GitHub Copilot",
    "CISCO CCNA"
  ],
  improvementActions: [
    "Add measurable impact to Wipro bullets, such as latency reduction, query time improvement, users supported, or defect reduction.",
    "Add live deployment links for the auction platform and IntelliApply if they are publicly accessible.",
    "Add testing, Docker, CI/CD, Redis, and Azure details once the StudyOS portfolio projects are implemented.",
    "Create one short project architecture diagram for IntelliApply and one for the .NET API project.",
    "Tailor the headline toward .NET Backend Engineer with React, SQL Server, Azure, and GenAI experience."
  ]
} as const;
