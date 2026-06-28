import {
  Bot,
  Brain,
  Braces,
  Cloud,
  Code2,
  Database,
  FileCode2,
  GitBranch,
  MessageSquareText,
  Network,
  Server,
  Sigma
} from "lucide-react";

import type {
  InterviewCategory,
  InterviewDifficulty,
  InterviewResource,
  InterviewResourceType,
  InterviewTopic
} from "@/features/interviews/types";

const targetRoles = [
  "Backend Developer (.NET)",
  "Full Stack Developer (.NET + React)",
  "Python Developer",
  "Generative AI Engineer",
  "Software Engineer (Product Companies)"
];

function topic(
  categoryId: string,
  title: string,
  difficulty: InterviewDifficulty,
  questionCount: number,
  revisionEveryDays = 7
): InterviewTopic {
  return {
    id: `${categoryId}-${title.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`,
    title,
    difficulty,
    estimatedMinutes:
      difficulty === "Foundation" ? 45 : difficulty === "Intermediate" ? 70 : 95,
    questionCount,
    revisionEveryDays
  };
}

function resource(
  id: string,
  label: string,
  provider: string,
  type: InterviewResourceType,
  url: string
): InterviewResource {
  return {
    id,
    label,
    provider,
    type,
    url
  };
}

const youtubeSearch = (query: string) =>
  `https://www.youtube.com/results?search_query=${encodeURIComponent(`${query} interview preparation playlist`)}`;

const top50Search = (query: string) =>
  `https://www.google.com/search?q=${encodeURIComponent(`top 50 ${query} interview questions`)}`;

const top20Search = (query: string) =>
  `https://www.google.com/search?q=${encodeURIComponent(`top 20 ${query} coding interview questions`)}`;

export const interviewCategories: InterviewCategory[] = [
  {
    id: "csharp",
    title: "C#",
    description:
      "Core backend interview depth for C#, OOP, runtime behavior, language features, and practical coding discussions.",
    targetRoles,
    difficulty: "Intermediate",
    estimatedHours: 18,
    questionCount: 86,
    icon: Code2,
    topics: [
      topic("csharp", "OOP", "Foundation", 8),
      topic("csharp", "SOLID", "Intermediate", 7),
      topic("csharp", "Delegates", "Intermediate", 6),
      topic("csharp", "Events", "Intermediate", 5),
      topic("csharp", "LINQ", "Intermediate", 8),
      topic("csharp", "Collections", "Foundation", 8),
      topic("csharp", "Async Await", "Advanced", 8),
      topic("csharp", "Memory Management", "Advanced", 6),
      topic("csharp", "Garbage Collection", "Advanced", 6),
      topic("csharp", "Exception Handling", "Foundation", 5),
      topic("csharp", "Dependency Injection", "Intermediate", 6),
      topic("csharp", "Multithreading", "Advanced", 7),
      topic("csharp", "File Handling", "Foundation", 3),
      topic("csharp", "Interview Questions", "Intermediate", 3)
    ],
    resources: [
      resource("csharp-youtube", "Top YouTube Playlist", "YouTube", "youtube", youtubeSearch("C# .NET")),
      resource("csharp-ms-learn", "Microsoft Learn", "Microsoft Learn", "microsoft-learn", "https://learn.microsoft.com/en-us/dotnet/csharp/"),
      resource("csharp-docs", "Official Documentation", "Microsoft Learn", "official-docs", "https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/"),
      resource("csharp-roadmap", "Roadmap", "roadmap.sh", "roadmap", "https://roadmap.sh/backend"),
      resource("csharp-cheat", "Cheat Sheet", "Microsoft Learn", "cheat-sheet", "https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/"),
      resource("csharp-top50", "Top 50 Interview Questions", "Google Search", "interview-questions", top50Search("C#")),
      resource("csharp-top20", "Top 20 Coding Questions", "Google Search", "coding-questions", top20Search("C#")),
      resource("csharp-mock", "Mock Interview Button", "Pramp", "mock-interview", "https://www.pramp.com/")
    ],
    mockPrompts: [
      "Explain delegates and events with one production use case.",
      "How does async/await work internally in C#?",
      "What is dependency injection and why does ASP.NET Core use it heavily?"
    ]
  },
  {
    id: "aspnet-core",
    title: "ASP.NET Core",
    description:
      "Production API preparation across middleware, security, EF Core, caching, logging, SignalR, and clean architecture.",
    targetRoles,
    difficulty: "Advanced",
    estimatedHours: 24,
    questionCount: 112,
    icon: Server,
    topics: [
      topic("aspnet-core", "REST APIs", "Foundation", 8),
      topic("aspnet-core", "Middleware", "Intermediate", 8),
      topic("aspnet-core", "Authentication", "Intermediate", 7),
      topic("aspnet-core", "Authorization", "Intermediate", 7),
      topic("aspnet-core", "JWT", "Intermediate", 7),
      topic("aspnet-core", "Filters", "Intermediate", 5),
      topic("aspnet-core", "Swagger", "Foundation", 4),
      topic("aspnet-core", "Configuration", "Foundation", 5),
      topic("aspnet-core", "Dependency Injection", "Intermediate", 7),
      topic("aspnet-core", "Logging", "Foundation", 5),
      topic("aspnet-core", "Caching", "Intermediate", 7),
      topic("aspnet-core", "Background Services", "Advanced", 7),
      topic("aspnet-core", "Rate Limiting", "Advanced", 6),
      topic("aspnet-core", "SignalR", "Advanced", 7),
      topic("aspnet-core", "Entity Framework", "Intermediate", 8),
      topic("aspnet-core", "Repository Pattern", "Intermediate", 5),
      topic("aspnet-core", "Clean Architecture", "Advanced", 8),
      topic("aspnet-core", "Interview Questions", "Intermediate", 6)
    ],
    resources: [
      resource("aspnet-youtube", "Top YouTube Playlist", "YouTube", "youtube", youtubeSearch("ASP.NET Core Web API")),
      resource("aspnet-ms-learn", "Microsoft Learn", "Microsoft Learn", "microsoft-learn", "https://learn.microsoft.com/en-us/aspnet/core/"),
      resource("aspnet-docs", "Official Documentation", "Microsoft Learn", "official-docs", "https://learn.microsoft.com/en-us/aspnet/core/web-api/"),
      resource("aspnet-roadmap", "Roadmap", "roadmap.sh", "roadmap", "https://roadmap.sh/aspnet-core"),
      resource("aspnet-cheat", "Cheat Sheet", "Microsoft Learn", "cheat-sheet", "https://learn.microsoft.com/en-us/aspnet/core/fundamentals/"),
      resource("aspnet-top50", "Top 50 Interview Questions", "Google Search", "interview-questions", top50Search("ASP.NET Core")),
      resource("aspnet-top20", "Top 20 Coding Questions", "Google Search", "coding-questions", top20Search("ASP.NET Core API")),
      resource("aspnet-mock", "Mock Interview Button", "Pramp", "mock-interview", "https://www.pramp.com/")
    ],
    mockPrompts: [
      "Walk through the ASP.NET Core request pipeline.",
      "Design JWT authentication and role-based authorization for a restaurant API.",
      "How would you implement caching and rate limiting in a Web API?"
    ]
  },
  {
    id: "sql-server",
    title: "SQL Server",
    description:
      "Database interview preparation for schema design, query writing, performance tuning, locking, and execution plans.",
    targetRoles,
    difficulty: "Intermediate",
    estimatedHours: 20,
    questionCount: 84,
    icon: Database,
    topics: [
      topic("sql-server", "Joins", "Foundation", 7),
      topic("sql-server", "Indexes", "Intermediate", 8),
      topic("sql-server", "Stored Procedures", "Intermediate", 6),
      topic("sql-server", "Normalization", "Foundation", 6),
      topic("sql-server", "Transactions", "Intermediate", 7),
      topic("sql-server", "Views", "Foundation", 4),
      topic("sql-server", "CTEs", "Intermediate", 6),
      topic("sql-server", "Window Functions", "Advanced", 8),
      topic("sql-server", "Execution Plans", "Advanced", 8),
      topic("sql-server", "Optimization", "Advanced", 8),
      topic("sql-server", "Locking", "Advanced", 7),
      topic("sql-server", "Deadlocks", "Advanced", 6),
      topic("sql-server", "Interview Questions", "Intermediate", 3)
    ],
    resources: [
      resource("sql-youtube", "Top YouTube Playlist", "YouTube", "youtube", youtubeSearch("SQL Server")),
      resource("sql-ms-learn", "Microsoft Learn", "Microsoft Learn", "microsoft-learn", "https://learn.microsoft.com/en-us/sql/sql-server/"),
      resource("sql-docs", "Official Documentation", "Microsoft Learn", "official-docs", "https://learn.microsoft.com/en-us/sql/relational-databases/"),
      resource("sql-roadmap", "Roadmap", "roadmap.sh", "roadmap", "https://roadmap.sh/sql"),
      resource("sql-cheat", "Cheat Sheet", "Microsoft Learn", "cheat-sheet", "https://learn.microsoft.com/en-us/sql/t-sql/language-reference/"),
      resource("sql-top50", "Top 50 Interview Questions", "Google Search", "interview-questions", top50Search("SQL Server")),
      resource("sql-top20", "Top 20 Coding Questions", "Google Search", "coding-questions", top20Search("SQL")),
      resource("sql-mock", "Mock Interview Button", "Pramp", "mock-interview", "https://www.pramp.com/")
    ],
    mockPrompts: [
      "Explain clustered versus nonclustered indexes.",
      "How would you diagnose a slow SQL Server query?",
      "What causes deadlocks and how do you reduce them?"
    ]
  },
  {
    id: "react",
    title: "React",
    description:
      "Full-stack frontend readiness for React fundamentals, TypeScript, API screens, performance, and authentication flows.",
    targetRoles,
    difficulty: "Intermediate",
    estimatedHours: 18,
    questionCount: 78,
    icon: Braces,
    topics: [
      topic("react", "Hooks", "Intermediate", 8),
      topic("react", "State Management", "Intermediate", 7),
      topic("react", "Context API", "Intermediate", 5),
      topic("react", "Performance", "Advanced", 7),
      topic("react", "Lifecycle", "Foundation", 5),
      topic("react", "Memoization", "Advanced", 6),
      topic("react", "Lazy Loading", "Intermediate", 5),
      topic("react", "Routing", "Foundation", 5),
      topic("react", "Forms", "Intermediate", 6),
      topic("react", "API Calls", "Foundation", 6),
      topic("react", "Authentication", "Intermediate", 6),
      topic("react", "TypeScript", "Intermediate", 7),
      topic("react", "Interview Questions", "Intermediate", 5)
    ],
    resources: [
      resource("react-youtube", "Top YouTube Playlist", "YouTube", "youtube", youtubeSearch("React TypeScript")),
      resource("react-ms-learn", "Microsoft Learn", "Microsoft Learn", "microsoft-learn", "https://learn.microsoft.com/en-us/training/paths/react/"),
      resource("react-docs", "Official Documentation", "React", "official-docs", "https://react.dev/learn"),
      resource("react-roadmap", "Roadmap", "roadmap.sh", "roadmap", "https://roadmap.sh/react"),
      resource("react-cheat", "Cheat Sheet", "React TypeScript Cheatsheets", "cheat-sheet", "https://react-typescript-cheatsheet.netlify.app/"),
      resource("react-top50", "Top 50 Interview Questions", "Google Search", "interview-questions", top50Search("React")),
      resource("react-top20", "Top 20 Coding Questions", "Google Search", "coding-questions", top20Search("React JavaScript")),
      resource("react-mock", "Mock Interview Button", "Pramp", "mock-interview", "https://www.pramp.com/")
    ],
    mockPrompts: [
      "When would you use Context API versus a dedicated store?",
      "Explain useMemo, useCallback, and React.memo with tradeoffs.",
      "How would you protect routes and handle token expiry?"
    ]
  },
  {
    id: "javascript",
    title: "JavaScript",
    description:
      "Core JavaScript interview readiness for language mechanics, async behavior, browser APIs, and ES modules.",
    targetRoles,
    difficulty: "Intermediate",
    estimatedHours: 16,
    questionCount: 74,
    icon: FileCode2,
    topics: [
      topic("javascript", "Closures", "Intermediate", 8),
      topic("javascript", "Promises", "Intermediate", 7),
      topic("javascript", "Event Loop", "Advanced", 8),
      topic("javascript", "Prototype", "Advanced", 7),
      topic("javascript", "Async Await", "Intermediate", 6),
      topic("javascript", "Hoisting", "Foundation", 5),
      topic("javascript", "Call Apply Bind", "Intermediate", 5),
      topic("javascript", "ES6", "Foundation", 7),
      topic("javascript", "Modules", "Foundation", 5),
      topic("javascript", "DOM", "Foundation", 6),
      topic("javascript", "Interview Questions", "Intermediate", 10)
    ],
    resources: [
      resource("js-youtube", "Top YouTube Playlist", "YouTube", "youtube", youtubeSearch("JavaScript")),
      resource("js-ms-learn", "Microsoft Learn", "Microsoft Learn", "microsoft-learn", "https://learn.microsoft.com/en-us/training/paths/web-development-101/"),
      resource("js-docs", "Official Documentation", "MDN Web Docs", "official-docs", "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"),
      resource("js-roadmap", "Roadmap", "roadmap.sh", "roadmap", "https://roadmap.sh/javascript"),
      resource("js-cheat", "Cheat Sheet", "MDN Web Docs", "cheat-sheet", "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference"),
      resource("js-top50", "Top 50 Interview Questions", "Google Search", "interview-questions", top50Search("JavaScript")),
      resource("js-top20", "Top 20 Coding Questions", "Google Search", "coding-questions", top20Search("JavaScript")),
      resource("js-mock", "Mock Interview Button", "Pramp", "mock-interview", "https://www.pramp.com/")
    ],
    mockPrompts: [
      "Explain closures with a practical use case.",
      "Walk through the event loop with promises and setTimeout.",
      "How does prototype-based inheritance work?"
    ]
  },
  {
    id: "python",
    title: "Python",
    description:
      "Python preparation for backend, automation, FastAPI basics, language features, and GenAI workflow scripting.",
    targetRoles,
    difficulty: "Intermediate",
    estimatedHours: 17,
    questionCount: 70,
    icon: Sigma,
    topics: [
      topic("python", "Functions", "Foundation", 5),
      topic("python", "Decorators", "Advanced", 7),
      topic("python", "Generators", "Advanced", 7),
      topic("python", "AsyncIO", "Advanced", 8),
      topic("python", "OOP", "Intermediate", 7),
      topic("python", "File Handling", "Foundation", 5),
      topic("python", "Collections", "Foundation", 7),
      topic("python", "FastAPI Basics", "Intermediate", 8),
      topic("python", "Automation", "Intermediate", 8),
      topic("python", "Interview Questions", "Intermediate", 8)
    ],
    resources: [
      resource("python-youtube", "Top YouTube Playlist", "YouTube", "youtube", youtubeSearch("Python backend automation")),
      resource("python-ms-learn", "Microsoft Learn", "Microsoft Learn", "microsoft-learn", "https://learn.microsoft.com/en-us/training/paths/beginner-python/"),
      resource("python-docs", "Official Documentation", "Python", "official-docs", "https://docs.python.org/3/tutorial/"),
      resource("python-roadmap", "Roadmap", "roadmap.sh", "roadmap", "https://roadmap.sh/python"),
      resource("python-cheat", "Cheat Sheet", "Python", "cheat-sheet", "https://docs.python.org/3/library/"),
      resource("python-top50", "Top 50 Interview Questions", "Google Search", "interview-questions", top50Search("Python")),
      resource("python-top20", "Top 20 Coding Questions", "Google Search", "coding-questions", top20Search("Python")),
      resource("python-mock", "Mock Interview Button", "Pramp", "mock-interview", "https://www.pramp.com/")
    ],
    mockPrompts: [
      "Explain decorators and where you used them.",
      "How do generators help with memory usage?",
      "How would you build a small FastAPI service for automation?"
    ]
  },
  {
    id: "azure",
    title: "Azure",
    description:
      "Cloud interview readiness mapped to your Azure Fundamentals certification and .NET deployment path.",
    targetRoles,
    difficulty: "Intermediate",
    estimatedHours: 15,
    questionCount: 58,
    icon: Cloud,
    topics: [
      topic("azure", "App Service", "Intermediate", 7),
      topic("azure", "Azure SQL", "Intermediate", 6),
      topic("azure", "Storage", "Foundation", 6),
      topic("azure", "Key Vault", "Intermediate", 6),
      topic("azure", "Functions", "Intermediate", 6),
      topic("azure", "Application Insights", "Intermediate", 7),
      topic("azure", "Identity", "Advanced", 8),
      topic("azure", "Deployment", "Intermediate", 7),
      topic("azure", "Interview Questions", "Intermediate", 5)
    ],
    resources: [
      resource("azure-youtube", "Top YouTube Playlist", "YouTube", "youtube", youtubeSearch("Azure App Service SQL interview")),
      resource("azure-ms-learn", "Microsoft Learn", "Microsoft Learn", "microsoft-learn", "https://learn.microsoft.com/en-us/azure/"),
      resource("azure-docs", "Official Documentation", "Microsoft Learn", "official-docs", "https://learn.microsoft.com/en-us/azure/app-service/"),
      resource("azure-roadmap", "Roadmap", "Microsoft Learn", "roadmap", "https://learn.microsoft.com/en-us/credentials/certifications/azure-fundamentals/"),
      resource("azure-cheat", "Cheat Sheet", "Microsoft Learn", "cheat-sheet", "https://learn.microsoft.com/en-us/azure/architecture/guide/"),
      resource("azure-top50", "Top 50 Interview Questions", "Google Search", "interview-questions", top50Search("Azure")),
      resource("azure-top20", "Top 20 Coding Questions", "Google Search", "coding-questions", top20Search("Azure cloud")),
      resource("azure-mock", "Mock Interview Button", "Pramp", "mock-interview", "https://www.pramp.com/")
    ],
    mockPrompts: [
      "How would you deploy an ASP.NET Core API to Azure App Service?",
      "When would you use Key Vault?",
      "What would you monitor after a production release?"
    ]
  },
  {
    id: "devops",
    title: "DevOps",
    description:
      "Delivery preparation for Git, Docker, CI/CD, Linux, NGINX, GitHub Actions, Azure DevOps, and deployability.",
    targetRoles,
    difficulty: "Intermediate",
    estimatedHours: 18,
    questionCount: 68,
    icon: GitBranch,
    topics: [
      topic("devops", "Git", "Foundation", 6),
      topic("devops", "GitHub", "Foundation", 5),
      topic("devops", "Docker", "Intermediate", 8),
      topic("devops", "Docker Compose", "Intermediate", 6),
      topic("devops", "CI/CD", "Intermediate", 7),
      topic("devops", "GitHub Actions", "Intermediate", 7),
      topic("devops", "Linux", "Foundation", 7),
      topic("devops", "NGINX", "Intermediate", 6),
      topic("devops", "Azure DevOps", "Intermediate", 6),
      topic("devops", "Interview Questions", "Intermediate", 10)
    ],
    resources: [
      resource("devops-youtube", "Top YouTube Playlist", "YouTube", "youtube", youtubeSearch("DevOps Docker GitHub Actions")),
      resource("devops-ms-learn", "Microsoft Learn", "Microsoft Learn", "microsoft-learn", "https://learn.microsoft.com/en-us/devops/"),
      resource("devops-docs", "Official Documentation", "Docker Docs", "official-docs", "https://docs.docker.com/get-started/"),
      resource("devops-roadmap", "Roadmap", "roadmap.sh", "roadmap", "https://roadmap.sh/devops"),
      resource("devops-cheat", "Cheat Sheet", "GitHub Docs", "cheat-sheet", "https://docs.github.com/en/actions"),
      resource("devops-top50", "Top 50 Interview Questions", "Google Search", "interview-questions", top50Search("DevOps")),
      resource("devops-top20", "Top 20 Coding Questions", "Google Search", "coding-questions", top20Search("DevOps scripting")),
      resource("devops-mock", "Mock Interview Button", "Pramp", "mock-interview", "https://www.pramp.com/")
    ],
    mockPrompts: [
      "Explain a CI/CD pipeline for an ASP.NET Core API.",
      "How do Docker images, containers, and volumes differ?",
      "What would you check when NGINX returns 502?"
    ]
  },
  {
    id: "system-design",
    title: "System Design",
    description:
      "Product-company preparation for web fundamentals, distributed systems, data design, scale, and reliability.",
    targetRoles,
    difficulty: "Advanced",
    estimatedHours: 28,
    questionCount: 95,
    icon: Network,
    topics: [
      topic("system-design", "HTTP", "Foundation", 5),
      topic("system-design", "TCP", "Foundation", 5),
      topic("system-design", "DNS", "Foundation", 5),
      topic("system-design", "Caching", "Intermediate", 8),
      topic("system-design", "Redis", "Intermediate", 7),
      topic("system-design", "Kafka", "Advanced", 7),
      topic("system-design", "RabbitMQ", "Intermediate", 6),
      topic("system-design", "CDN", "Intermediate", 5),
      topic("system-design", "API Gateway", "Intermediate", 6),
      topic("system-design", "Load Balancer", "Intermediate", 6),
      topic("system-design", "CAP", "Advanced", 6),
      topic("system-design", "Microservices", "Advanced", 8),
      topic("system-design", "Scaling", "Advanced", 8),
      topic("system-design", "Database Design", "Advanced", 8),
      topic("system-design", "Interview Questions", "Advanced", 5)
    ],
    resources: [
      resource("sd-youtube", "Top YouTube Playlist", "YouTube", "youtube", youtubeSearch("system design")),
      resource("sd-ms-learn", "Microsoft Learn", "Microsoft Learn", "microsoft-learn", "https://learn.microsoft.com/en-us/azure/architecture/"),
      resource("sd-docs", "Official Documentation", "Azure Architecture Center", "official-docs", "https://learn.microsoft.com/en-us/azure/architecture/guide/"),
      resource("sd-roadmap", "Roadmap", "roadmap.sh", "roadmap", "https://roadmap.sh/system-design"),
      resource("sd-cheat", "Cheat Sheet", "Microsoft Learn", "cheat-sheet", "https://learn.microsoft.com/en-us/azure/architecture/patterns/"),
      resource("sd-top50", "Top 50 Interview Questions", "Google Search", "interview-questions", top50Search("system design")),
      resource("sd-top20", "Top 20 Coding Questions", "Google Search", "coding-questions", top20Search("system design coding")),
      resource("sd-mock", "Mock Interview Button", "Pramp", "mock-interview", "https://www.pramp.com/")
    ],
    mockPrompts: [
      "Design a URL shortener.",
      "Design a restaurant ordering platform with kitchen updates.",
      "How would you scale reads and writes separately?"
    ]
  },
  {
    id: "dsa",
    title: "DSA",
    description:
      "Interview coding preparation around your personal DSA Google Doc and product-company coding patterns.",
    targetRoles,
    difficulty: "Advanced",
    estimatedHours: 35,
    questionCount: 120,
    icon: Brain,
    topics: [
      topic("dsa", "Arrays", "Foundation", 10, 5),
      topic("dsa", "Strings", "Foundation", 8, 5),
      topic("dsa", "HashMap", "Foundation", 8, 5),
      topic("dsa", "Linked List", "Intermediate", 8, 6),
      topic("dsa", "Trees", "Intermediate", 12, 6),
      topic("dsa", "Graphs", "Advanced", 14, 6),
      topic("dsa", "Heap", "Intermediate", 8, 7),
      topic("dsa", "Trie", "Advanced", 7, 7),
      topic("dsa", "Dynamic Programming", "Advanced", 18, 5),
      topic("dsa", "Greedy", "Intermediate", 9, 6),
      topic("dsa", "Binary Search", "Intermediate", 8, 5),
      topic("dsa", "Interview Questions", "Advanced", 10, 4)
    ],
    resources: [
      resource("dsa-youtube", "Top YouTube Playlist", "YouTube", "youtube", youtubeSearch("DSA coding interview")),
      resource("dsa-ms-learn", "Microsoft Learn", "Microsoft Learn", "microsoft-learn", "https://learn.microsoft.com/en-us/training/modules/web-development-101-introduction-programming/"),
      resource("dsa-docs", "Official Documentation", "CP-Algorithms", "official-docs", "https://cp-algorithms.com/"),
      resource("dsa-roadmap", "Roadmap", "roadmap.sh", "roadmap", "https://roadmap.sh/datastructures-and-algorithms"),
      resource("dsa-cheat", "Cheat Sheet", "Big-O Cheat Sheet", "cheat-sheet", "https://www.bigocheatsheet.com/"),
      resource("dsa-top50", "Top 50 Interview Questions", "Google Search", "interview-questions", top50Search("DSA")),
      resource("dsa-top20", "Top 20 Coding Questions", "Google Search", "coding-questions", top20Search("DSA")),
      resource("dsa-mock", "Mock Interview Button", "Pramp", "mock-interview", "https://www.pramp.com/")
    ],
    mockPrompts: [
      "Solve a sliding window problem and explain your invariant.",
      "How do you identify a DP state and transition?",
      "When do you choose BFS over DFS?"
    ]
  },
  {
    id: "generative-ai",
    title: "Generative AI",
    description:
      "Interview preparation for your IntelliApply profile: LLM apps, RAG, embeddings, agents, OpenAI, Gemini, Claude, MCP, and evaluation.",
    targetRoles,
    difficulty: "Advanced",
    estimatedHours: 26,
    questionCount: 104,
    icon: Bot,
    topics: [
      topic("generative-ai", "Prompt Engineering", "Foundation", 7),
      topic("generative-ai", "LLMs", "Intermediate", 8),
      topic("generative-ai", "RAG", "Advanced", 9),
      topic("generative-ai", "Embeddings", "Advanced", 7),
      topic("generative-ai", "Vector Databases", "Advanced", 7),
      topic("generative-ai", "AI Agents", "Advanced", 8),
      topic("generative-ai", "LangChain", "Intermediate", 7),
      topic("generative-ai", "LangGraph", "Advanced", 7),
      topic("generative-ai", "OpenAI APIs", "Intermediate", 8),
      topic("generative-ai", "Gemini APIs", "Intermediate", 6),
      topic("generative-ai", "Claude APIs", "Intermediate", 6),
      topic("generative-ai", "MCP", "Advanced", 6),
      topic("generative-ai", "Tool Calling", "Advanced", 5),
      topic("generative-ai", "Function Calling", "Advanced", 5),
      topic("generative-ai", "Memory", "Advanced", 4),
      topic("generative-ai", "Evaluation", "Advanced", 4),
      topic("generative-ai", "Interview Questions", "Advanced", 5)
    ],
    resources: [
      resource("genai-youtube", "Top YouTube Playlist", "YouTube", "youtube", youtubeSearch("Generative AI RAG agents")),
      resource("genai-ms-learn", "Microsoft Learn", "Microsoft Learn", "microsoft-learn", "https://learn.microsoft.com/en-us/azure/ai-services/openai/"),
      resource("genai-docs", "Official Documentation", "OpenAI", "official-docs", "https://platform.openai.com/docs/overview"),
      resource("genai-roadmap", "Roadmap", "roadmap.sh", "roadmap", "https://roadmap.sh/ai-engineer"),
      resource("genai-cheat", "Cheat Sheet", "OpenAI Cookbook", "cheat-sheet", "https://cookbook.openai.com/"),
      resource("genai-top50", "Top 50 Interview Questions", "Google Search", "interview-questions", top50Search("Generative AI")),
      resource("genai-top20", "Top 20 Coding Questions", "Google Search", "coding-questions", top20Search("LLM RAG Python")),
      resource("genai-mock", "Mock Interview Button", "Pramp", "mock-interview", "https://www.pramp.com/")
    ],
    mockPrompts: [
      "Design a RAG pipeline for resume tailoring.",
      "How would you evaluate hallucination risk?",
      "Explain tool calling, function calling, and MCP in practical terms."
    ]
  },
  {
    id: "hr",
    title: "HR Interview",
    description:
      "Role-fit preparation for communication, projects, current job, behavioral answers, notice period, and salary negotiation.",
    targetRoles,
    difficulty: "Foundation",
    estimatedHours: 10,
    questionCount: 45,
    icon: MessageSquareText,
    topics: [
      topic("hr", "Tell me about yourself", "Foundation", 5),
      topic("hr", "Projects", "Foundation", 5),
      topic("hr", "Current Job", "Foundation", 4),
      topic("hr", "Challenges", "Intermediate", 5),
      topic("hr", "Strengths", "Foundation", 4),
      topic("hr", "Weaknesses", "Foundation", 4),
      topic("hr", "Notice Period", "Foundation", 3),
      topic("hr", "Salary Negotiation", "Intermediate", 5),
      topic("hr", "Behavioral Questions", "Intermediate", 6),
      topic("hr", "STAR Method", "Foundation", 4)
    ],
    resources: [
      resource("hr-youtube", "Top YouTube Playlist", "YouTube", "youtube", youtubeSearch("HR interview software engineer")),
      resource("hr-ms-learn", "Microsoft Learn", "Microsoft Learn", "microsoft-learn", "https://learn.microsoft.com/en-us/training/career-paths/"),
      resource("hr-docs", "Official Documentation", "MIT Career Advising", "official-docs", "https://capd.mit.edu/resources/the-star-method-for-behavioral-interviews/"),
      resource("hr-roadmap", "Roadmap", "roadmap.sh", "roadmap", "https://roadmap.sh/software-design-architecture"),
      resource("hr-cheat", "Cheat Sheet", "MIT Career Advising", "cheat-sheet", "https://capd.mit.edu/resources/the-star-method-for-behavioral-interviews/"),
      resource("hr-top50", "Top 50 Interview Questions", "Google Search", "interview-questions", top50Search("HR software engineer")),
      resource("hr-top20", "Top 20 Coding Questions", "Google Search", "coding-questions", top20Search("software engineer behavioral coding")),
      resource("hr-mock", "Mock Interview Button", "Pramp", "mock-interview", "https://www.pramp.com/")
    ],
    mockPrompts: [
      "Tell me about yourself for a .NET backend role.",
      "Describe a challenging project using STAR.",
      "How will you negotiate for a 7-15 LPA role?"
    ]
  }
];

export function getInterviewCategory(categoryId: InterviewCategory["id"]) {
  return interviewCategories.find((category) => category.id === categoryId);
}

export function getAllInterviewTopics() {
  return interviewCategories.flatMap((category) =>
    category.topics.map((topicItem) => ({
      ...topicItem,
      categoryId: category.id,
      categoryTitle: category.title
    }))
  );
}
