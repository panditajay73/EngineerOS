import {
  BriefcaseBusiness,
  Code2,
  GitBranch,
  Layers3,
  Network,
} from "lucide-react";

import type { StudyModule, StudyResource, StudyTrack } from "@/features/study/types";

const resource = (
  id: string,
  title: string,
  provider: string,
  url: string,
  durationMinutes: number,
  type: StudyResource["type"] = "docs"
): StudyResource => ({
  id,
  title,
  provider,
  type,
  url,
  durationMinutes
});

export const studyTracks: StudyTrack[] = [
  {
    id: "dsa",
    title: "DSA Tracker",
    eyebrow: "DSA",
    description:
      "Pattern-first practice across arrays, strings, maps, linked lists, trees, graphs, backtracking, and dynamic programming.",
    icon: Network
  },
  {
    id: "development",
    title: "Development Roadmap",
    eyebrow: "Development",
    description:
      "A .NET backend-heavy roadmap with React, SQL Server, Azure, clean architecture, GenAI, testing, and production API skills.",
    icon: Code2
  },
  {
    id: "system-design",
    title: "System Design",
    eyebrow: "Architecture",
    description:
      "Core web mechanics, distributed systems, caching, messaging, scaling, reliability, and database design.",
    icon: Layers3
  },
  {
    id: "devops",
    title: "DevOps",
    eyebrow: "Delivery",
    description:
      "Git, GitHub, Docker, Linux, NGINX, CI/CD, Azure hosting, monitoring, logging, and release discipline.",
    icon: GitBranch
  },
  {
    id: "projects",
    title: "Projects",
    eyebrow: "Portfolio",
    description:
      "Portfolio-grade build plans for a task management API and a restaurant management platform.",
    icon: BriefcaseBusiness
  }
];

export const studyModules: StudyModule[] = [
  {
    id: "dsa-arrays",
    trackId: "dsa",
    title: "Arrays",
    category: "Linear Data Structures",
    description:
      "Master two pointers, sliding window, prefix sums, intervals, and in-place transforms.",
    difficulty: "Foundation",
    targetDayStart: 1,
    targetDayEnd: 8,
    resources: [
      resource(
        "dsa-arrays-lc-array",
        "Array and string problem set",
        "LeetCode",
        "https://leetcode.com/tag/array/",
        45,
        "practice"
      ),
      resource(
        "dsa-arrays-prefix",
        "Prefix sums and range queries",
        "CP-Algorithms",
        "https://cp-algorithms.com/data_structures/fenwick.html",
        40,
        "guide"
      ),
      resource(
        "dsa-arrays-window",
        "Sliding window problems",
        "LeetCode",
        "https://leetcode.com/problem-list/sliding-window/",
        60,
        "practice"
      )
    ],
    tasks: [
      {
        id: "dsa-arrays-two-sum",
        title: "Solve Two Sum, Best Time to Buy/Sell Stock, and Product Except Self",
        outcome: "Explain brute force, hash map, and prefix/suffix tradeoffs.",
        estimateMinutes: 80
      },
      {
        id: "dsa-arrays-window-task",
        title: "Solve three sliding window problems without looking at hints",
        outcome: "Write the invariant before coding each solution.",
        estimateMinutes: 90
      }
    ],
    interviewPrompts: [
      "When do you choose sorting plus two pointers over a hash map?",
      "How do you prove a sliding window only moves forward?"
    ]
  },
  {
    id: "dsa-strings-hashmap",
    trackId: "dsa",
    title: "Strings and HashMap",
    category: "Frequency Patterns",
    description:
      "Handle frequency counting, anagrams, character windows, encoding, and lookup-heavy problems.",
    difficulty: "Foundation",
    targetDayStart: 6,
    targetDayEnd: 15,
    resources: [
      resource(
        "dsa-strings-lc",
        "String problems",
        "LeetCode",
        "https://leetcode.com/tag/string/",
        45,
        "practice"
      ),
      resource(
        "dsa-hash-table-lc",
        "Hash table problems",
        "LeetCode",
        "https://leetcode.com/tag/hash-table/",
        45,
        "practice"
      )
    ],
    tasks: [
      {
        id: "dsa-valid-anagram",
        title: "Solve Valid Anagram, Group Anagrams, and Longest Substring",
        outcome: "Use frequency maps and sliding windows confidently.",
        estimateMinutes: 95
      },
      {
        id: "dsa-string-edge-cases",
        title: "Write edge-case notes for Unicode, empty strings, and repeated chars",
        outcome: "Build a reusable checklist for string interviews.",
        estimateMinutes: 35
      }
    ],
    interviewPrompts: [
      "What changes when input is Unicode instead of lowercase English letters?",
      "How do you reduce memory when the alphabet is bounded?"
    ]
  },
  {
    id: "dsa-linked-stack-queue",
    trackId: "dsa",
    title: "Linked List, Stack, and Queue",
    category: "Pointer and Order",
    description:
      "Practice pointer mutation, sentinel nodes, monotonic stacks, BFS queues, and deque patterns.",
    difficulty: "Intermediate",
    targetDayStart: 12,
    targetDayEnd: 24,
    resources: [
      resource(
        "dsa-linked-list-lc",
        "Linked list problems",
        "LeetCode",
        "https://leetcode.com/tag/linked-list/",
        45,
        "practice"
      ),
      resource(
        "dsa-stack-lc",
        "Stack problems",
        "LeetCode",
        "https://leetcode.com/tag/stack/",
        45,
        "practice"
      ),
      resource(
        "dsa-queue-lc",
        "Queue problems",
        "LeetCode",
        "https://leetcode.com/tag/queue/",
        35,
        "practice"
      )
    ],
    tasks: [
      {
        id: "dsa-linked-reversal",
        title: "Solve Reverse Linked List, Merge Two Lists, and Linked List Cycle",
        outcome: "Draw pointer movement before writing code.",
        estimateMinutes: 100
      },
      {
        id: "dsa-monotonic-stack",
        title: "Solve Daily Temperatures and Next Greater Element",
        outcome: "Explain why popped items never return.",
        estimateMinutes: 75
      }
    ],
    interviewPrompts: [
      "Why are dummy nodes useful in linked list problems?",
      "What invariant does a monotonic stack maintain?"
    ]
  },
  {
    id: "dsa-trees",
    trackId: "dsa",
    title: "Tree and BST",
    category: "Hierarchical Data",
    description:
      "Cover DFS, BFS, recursion, iterative traversal, BST properties, and lowest common ancestor.",
    difficulty: "Intermediate",
    targetDayStart: 20,
    targetDayEnd: 36,
    resources: [
      resource(
        "dsa-tree-lc",
        "Tree problems",
        "LeetCode",
        "https://leetcode.com/tag/tree/",
        50,
        "practice"
      ),
      resource(
        "dsa-binary-search-tree-lc",
        "Binary search tree problems",
        "LeetCode",
        "https://leetcode.com/tag/binary-search-tree/",
        45,
        "practice"
      )
    ],
    tasks: [
      {
        id: "dsa-tree-traversals",
        title: "Implement preorder, inorder, postorder, and level-order traversal",
        outcome: "Know both recursive and iterative versions.",
        estimateMinutes: 110
      },
      {
        id: "dsa-lca",
        title: "Solve Diameter of Binary Tree, Validate BST, and LCA",
        outcome: "Return useful state from recursive calls.",
        estimateMinutes: 100
      }
    ],
    interviewPrompts: [
      "How do you decide what a recursive tree function should return?",
      "What are the failure cases for validating a BST?"
    ]
  },
  {
    id: "dsa-heap-trie",
    trackId: "dsa",
    title: "Heap and Trie",
    category: "Priority and Prefix",
    description:
      "Use priority queues for top-k and scheduling, then build prefix trees for search-heavy workloads.",
    difficulty: "Intermediate",
    targetDayStart: 32,
    targetDayEnd: 45,
    resources: [
      resource(
        "dsa-heap-lc",
        "Heap priority queue problems",
        "LeetCode",
        "https://leetcode.com/tag/heap-priority-queue/",
        45,
        "practice"
      ),
      resource(
        "dsa-trie-lc",
        "Trie problems",
        "LeetCode",
        "https://leetcode.com/tag/trie/",
        45,
        "practice"
      )
    ],
    tasks: [
      {
        id: "dsa-top-k",
        title: "Solve Kth Largest Element, Top K Frequent Elements, and Merge K Lists",
        outcome: "Compare heap, sorting, and bucket strategies.",
        estimateMinutes: 110
      },
      {
        id: "dsa-trie-impl",
        title: "Implement Trie with insert, search, and startsWith",
        outcome: "Explain memory tradeoffs for prefix search.",
        estimateMinutes: 70
      }
    ],
    interviewPrompts: [
      "When is a heap better than sorting?",
      "How would you compress a trie for production memory use?"
    ]
  },
  {
    id: "dsa-graph-backtracking-dp",
    trackId: "dsa",
    title: "Graph, Backtracking, and Dynamic Programming",
    category: "Advanced Patterns",
    description:
      "Build confidence in BFS/DFS, topological sort, recursion trees, memoization, and tabulation.",
    difficulty: "Advanced",
    targetDayStart: 42,
    targetDayEnd: 75,
    resources: [
      resource(
        "dsa-graph-lc",
        "Graph problems",
        "LeetCode",
        "https://leetcode.com/tag/graph/",
        60,
        "practice"
      ),
      resource(
        "dsa-backtracking-lc",
        "Backtracking problems",
        "LeetCode",
        "https://leetcode.com/tag/backtracking/",
        55,
        "practice"
      ),
      resource(
        "dsa-dp-lc",
        "Dynamic programming problems",
        "LeetCode",
        "https://leetcode.com/tag/dynamic-programming/",
        70,
        "practice"
      )
    ],
    tasks: [
      {
        id: "dsa-graph-core",
        title: "Solve Number of Islands, Clone Graph, and Course Schedule",
        outcome: "Choose BFS, DFS, or topological sort intentionally.",
        estimateMinutes: 140
      },
      {
        id: "dsa-dp-core",
        title: "Solve Climbing Stairs, House Robber, Coin Change, and LIS",
        outcome: "Write state, transition, base case, and order for each problem.",
        estimateMinutes: 160
      }
    ],
    interviewPrompts: [
      "How do you identify the state in a DP problem?",
      "When does DFS recursion need a visiting state instead of a visited set?"
    ]
  },
  {
    id: "dev-csharp-aspnet",
    trackId: "development",
    title: "C#, .NET, and ASP.NET Core APIs",
    category: "Backend",
    description:
      "Strengthen C# fundamentals, request pipelines, controllers, minimal APIs, validation, and error contracts.",
    difficulty: "Foundation",
    targetDayStart: 1,
    targetDayEnd: 14,
    resources: [
      resource(
        "dev-dotnet-intro",
        ".NET introduction",
        "Microsoft Learn",
        "https://learn.microsoft.com/en-us/dotnet/core/introduction",
        45
      ),
      resource(
        "dev-csharp-docs",
        "C# language documentation",
        "Microsoft Learn",
        "https://learn.microsoft.com/en-us/dotnet/csharp/",
        60
      ),
      resource(
        "dev-aspnet-core-docs",
        "ASP.NET Core documentation",
        "Microsoft Learn",
        "https://learn.microsoft.com/en-us/aspnet/core/",
        70
      ),
      resource(
        "dev-web-api",
        "Create web APIs with ASP.NET Core",
        "Microsoft Learn",
        "https://learn.microsoft.com/en-us/aspnet/core/web-api/",
        80,
        "guide"
      )
    ],
    tasks: [
      {
        id: "dev-api-skeleton",
        title: "Build a clean Web API skeleton with controllers, DTOs, and validation",
        outcome: "A running API with Swagger and consistent problem responses.",
        estimateMinutes: 150
      },
      {
        id: "dev-api-errors",
        title: "Add global exception handling and request logging",
        outcome: "Readable errors without leaking internals.",
        estimateMinutes: 75
      }
    ],
    interviewPrompts: [
      "Explain the ASP.NET Core request pipeline.",
      "What belongs in controllers versus services?"
    ]
  },
  {
    id: "dev-data-auth",
    trackId: "development",
    title: "Entity Framework, SQL Server, Auth, and RBAC",
    category: "Backend",
    description:
      "Model relational data, write practical SQL, secure APIs, and handle JWT-based authorization.",
    difficulty: "Intermediate",
    targetDayStart: 10,
    targetDayEnd: 30,
    resources: [
      resource(
        "dev-ef-core",
        "Entity Framework Core documentation",
        "Microsoft Learn",
        "https://learn.microsoft.com/en-us/ef/core/",
        70
      ),
      resource(
        "dev-sql-server",
        "SQL Server documentation",
        "Microsoft Learn",
        "https://learn.microsoft.com/en-us/sql/sql-server/",
        60
      ),
      resource(
        "dev-aspnet-auth",
        "Authentication in ASP.NET Core",
        "Microsoft Learn",
        "https://learn.microsoft.com/en-us/aspnet/core/security/authentication/",
        55
      ),
      resource(
        "dev-aspnet-authz",
        "Authorization in ASP.NET Core",
        "Microsoft Learn",
        "https://learn.microsoft.com/en-us/aspnet/core/security/authorization/introduction",
        55
      )
    ],
    tasks: [
      {
        id: "dev-ef-repository",
        title: "Add EF Core migrations, seed data, and optimized read queries",
        outcome: "Database-backed API with predictable migrations.",
        estimateMinutes: 150
      },
      {
        id: "dev-rbac",
        title: "Implement JWT auth with Admin/User policies",
        outcome: "Protected endpoints with role-based access control.",
        estimateMinutes: 130
      }
    ],
    interviewPrompts: [
      "What causes N+1 queries and how do you avoid them?",
      "How are authentication and authorization different?"
    ]
  },
  {
    id: "dev-react-frontend",
    trackId: "development",
    title: "React Frontend for API Products",
    category: "Frontend",
    description:
      "Use React to build typed forms, route-driven screens, API state, and resilient UX around backend services.",
    difficulty: "Intermediate",
    targetDayStart: 18,
    targetDayEnd: 38,
    resources: [
      resource(
        "dev-react-learn",
        "React Learn",
        "React",
        "https://react.dev/learn",
        80
      ),
      resource(
        "dev-react-router",
        "React Router docs",
        "React Router",
        "https://reactrouter.com/home",
        45
      ),
      resource(
        "dev-tanstack-query",
        "TanStack Query overview",
        "TanStack",
        "https://tanstack.com/query/latest",
        45
      )
    ],
    tasks: [
      {
        id: "dev-react-crud",
        title: "Build CRUD screens for tasks with loading, empty, and error states",
        outcome: "Frontend can consume your ASP.NET Core API cleanly.",
        estimateMinutes: 150
      },
      {
        id: "dev-react-forms",
        title: "Add typed forms with validation and optimistic updates",
        outcome: "Polished data entry workflow for real users.",
        estimateMinutes: 120
      }
    ],
    interviewPrompts: [
      "How do server state and client state differ?",
      "What makes a component reusable without over-abstracting?"
    ]
  },
  {
    id: "dev-architecture-testing-ai",
    trackId: "development",
    title: "Clean Architecture, Testing, Redis, SignalR, and GenAI",
    category: "Advanced Backend",
    description:
      "Move from feature coding to resilient architecture, automated tests, realtime workflows, caching, and AI integration.",
    difficulty: "Advanced",
    targetDayStart: 30,
    targetDayEnd: 65,
    resources: [
      resource(
        "dev-architecture",
        ".NET architecture guides",
        "Microsoft Learn",
        "https://learn.microsoft.com/en-us/dotnet/architecture/",
        70
      ),
      resource(
        "dev-signalr",
        "ASP.NET Core SignalR",
        "Microsoft Learn",
        "https://learn.microsoft.com/en-us/aspnet/core/signalr/introduction",
        45
      ),
      resource(
        "dev-redis",
        "Redis documentation",
        "Redis",
        "https://redis.io/docs/latest/",
        45
      ),
      resource(
        "dev-azure-ai",
        "Azure OpenAI Service documentation",
        "Microsoft Learn",
        "https://learn.microsoft.com/en-us/azure/ai-services/openai/",
        60
      )
    ],
    tasks: [
      {
        id: "dev-clean-architecture-refactor",
        title: "Refactor one API feature into Domain, Application, Infrastructure, and API layers",
        outcome: "Business logic can be tested without web or database dependencies.",
        estimateMinutes: 180
      },
      {
        id: "dev-ai-feature",
        title: "Build a resume feedback endpoint using an AI provider abstraction",
        outcome: "GenAI feature with prompt versioning and safe API boundaries.",
        estimateMinutes: 160
      }
    ],
    interviewPrompts: [
      "Why should dependencies point inward in clean architecture?",
      "How would you cache a personalized dashboard safely?"
    ]
  },
  {
    id: "system-web-foundations",
    trackId: "system-design",
    title: "HTTP, DNS, TCP, OSI, and API Gateway Basics",
    category: "Foundations",
    description:
      "Understand the path from client request to backend service and how gateways shape traffic.",
    difficulty: "Foundation",
    targetDayStart: 5,
    targetDayEnd: 20,
    resources: [
      resource(
        "sd-http-mdn",
        "HTTP overview",
        "MDN Web Docs",
        "https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview",
        45
      ),
      resource(
        "sd-dns-mdn",
        "What is a domain name?",
        "MDN Web Docs",
        "https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/What_is_a_domain_name",
        35
      ),
      resource(
        "sd-azure-architecture",
        "Azure Architecture Center",
        "Microsoft Learn",
        "https://learn.microsoft.com/en-us/azure/architecture/",
        60,
        "reference"
      )
    ],
    tasks: [
      {
        id: "sd-request-path",
        title: "Draw a browser-to-API request path with DNS, TLS, gateway, app, and database",
        outcome: "A clear whiteboard explanation for interview warmups.",
        estimateMinutes: 60
      },
      {
        id: "sd-status-codes",
        title: "Write response contract examples for 200, 201, 400, 401, 403, 404, and 500",
        outcome: "Practical API design vocabulary.",
        estimateMinutes: 45
      }
    ],
    interviewPrompts: [
      "What happens after a user enters a URL?",
      "Where would you put authentication, rate limiting, and request routing?"
    ]
  },
  {
    id: "system-cache-messaging",
    trackId: "system-design",
    title: "Caching, Redis, Kafka, RabbitMQ, and Event-Driven Flows",
    category: "Distributed Systems",
    description:
      "Use cache and messaging deliberately for latency, throughput, resilience, and decoupling.",
    difficulty: "Intermediate",
    targetDayStart: 18,
    targetDayEnd: 45,
    resources: [
      resource(
        "sd-redis-docs",
        "Redis documentation",
        "Redis",
        "https://redis.io/docs/latest/",
        45
      ),
      resource(
        "sd-kafka-docs",
        "Apache Kafka documentation",
        "Apache Kafka",
        "https://kafka.apache.org/documentation/",
        60
      ),
      resource(
        "sd-rabbitmq-docs",
        "RabbitMQ documentation",
        "RabbitMQ",
        "https://www.rabbitmq.com/docs",
        55
      )
    ],
    tasks: [
      {
        id: "sd-cache-aside",
        title: "Design cache-aside for a product catalog with invalidation rules",
        outcome: "Explain stale reads, TTL, and write-through alternatives.",
        estimateMinutes: 75
      },
      {
        id: "sd-events",
        title: "Design order-created events for inventory, payment, email, and analytics",
        outcome: "Separate sync API work from async business workflows.",
        estimateMinutes: 90
      }
    ],
    interviewPrompts: [
      "How do you avoid cache stampedes?",
      "When would you choose Kafka over RabbitMQ?"
    ]
  },
  {
    id: "system-scaling-data",
    trackId: "system-design",
    title: "Scaling, CAP, Replication, Sharding, and Database Design",
    category: "Scale",
    description:
      "Reason about consistency, read/write scaling, partition keys, query patterns, and schema design.",
    difficulty: "Advanced",
    targetDayStart: 40,
    targetDayEnd: 75,
    resources: [
      resource(
        "sd-azure-data-architecture",
        "Data architecture guide",
        "Microsoft Learn",
        "https://learn.microsoft.com/en-us/azure/architecture/data-guide/",
        65
      ),
      resource(
        "sd-cloud-design-patterns",
        "Cloud design patterns",
        "Microsoft Learn",
        "https://learn.microsoft.com/en-us/azure/architecture/patterns/",
        75
      ),
      resource(
        "sd-sql-indexes",
        "SQL Server indexes",
        "Microsoft Learn",
        "https://learn.microsoft.com/en-us/sql/relational-databases/indexes/indexes",
        50
      )
    ],
    tasks: [
      {
        id: "sd-url-shortener",
        title: "Design a URL shortener with APIs, schema, cache, and scaling plan",
        outcome: "Practice a complete system design interview loop.",
        estimateMinutes: 120
      },
      {
        id: "sd-restaurant-scale",
        title: "Design restaurant order flow under high lunch-hour traffic",
        outcome: "Apply queueing, retries, idempotency, and read models.",
        estimateMinutes: 110
      }
    ],
    interviewPrompts: [
      "How do you choose a sharding key?",
      "What does CAP mean in a practical product decision?"
    ]
  },
  {
    id: "devops-git-docker-linux",
    trackId: "devops",
    title: "Git, GitHub, Docker, Linux, and NGINX",
    category: "Foundations",
    description:
      "Build repeatable development habits and run services in predictable environments.",
    difficulty: "Foundation",
    targetDayStart: 12,
    targetDayEnd: 35,
    resources: [
      resource(
        "devops-git-docs",
        "Git documentation",
        "Git",
        "https://git-scm.com/doc",
        45
      ),
      resource(
        "devops-github-docs",
        "GitHub documentation",
        "GitHub Docs",
        "https://docs.github.com/",
        45
      ),
      resource(
        "devops-docker-start",
        "Docker get started",
        "Docker Docs",
        "https://docs.docker.com/get-started/",
        60
      ),
      resource(
        "devops-nginx-docs",
        "NGINX documentation",
        "NGINX",
        "https://nginx.org/en/docs/",
        45
      )
    ],
    tasks: [
      {
        id: "devops-dockerize-api",
        title: "Dockerize the Task Management API with environment-based config",
        outcome: "API runs locally with a reproducible container command.",
        estimateMinutes: 110
      },
      {
        id: "devops-compose-db",
        title: "Add Docker Compose for API plus SQL Server or compatible local database",
        outcome: "One-command local environment for project demos.",
        estimateMinutes: 90
      }
    ],
    interviewPrompts: [
      "How does a Docker image differ from a container?",
      "What should never be committed to Git?"
    ]
  },
  {
    id: "devops-cicd-azure-observability",
    trackId: "devops",
    title: "CI/CD, Azure App Service, Azure SQL, Monitoring, and Logging",
    category: "Delivery",
    description:
      "Ship applications through automated checks and operate them with useful health signals.",
    difficulty: "Intermediate",
    targetDayStart: 35,
    targetDayEnd: 70,
    resources: [
      resource(
        "devops-github-actions",
        "GitHub Actions documentation",
        "GitHub Docs",
        "https://docs.github.com/en/actions",
        65
      ),
      resource(
        "devops-azure-app-service",
        "Azure App Service documentation",
        "Microsoft Learn",
        "https://learn.microsoft.com/en-us/azure/app-service/",
        60
      ),
      resource(
        "devops-azure-sql",
        "Azure SQL documentation",
        "Microsoft Learn",
        "https://learn.microsoft.com/en-us/azure/azure-sql/",
        60
      ),
      resource(
        "devops-monitor",
        "Azure Monitor documentation",
        "Microsoft Learn",
        "https://learn.microsoft.com/en-us/azure/azure-monitor/",
        60
      )
    ],
    tasks: [
      {
        id: "devops-ci-pipeline",
        title: "Create GitHub Actions pipeline for restore, build, test, and Docker image validation",
        outcome: "Every push produces a visible quality gate.",
        estimateMinutes: 120
      },
      {
        id: "devops-azure-deploy",
        title: "Deploy one API to Azure App Service with production settings documented",
        outcome: "A live URL you can discuss in interviews.",
        estimateMinutes: 160
      }
    ],
    interviewPrompts: [
      "What should a CI pipeline block before deployment?",
      "What logs and metrics would you check after a failed release?"
    ]
  },
  {
    id: "project-task-management-api",
    trackId: "projects",
    title: "Project 1: Task Management API",
    category: "Backend Portfolio",
    description:
      "Build a production-minded ASP.NET Core API with auth, RBAC, tasks, projects, reminders, Swagger, Docker, Redis, and CI/CD.",
    difficulty: "Intermediate",
    targetDayStart: 15,
    targetDayEnd: 55,
    resources: [
      resource(
        "project-task-web-api",
        "ASP.NET Core web API guide",
        "Microsoft Learn",
        "https://learn.microsoft.com/en-us/aspnet/core/web-api/",
        70,
        "guide"
      ),
      resource(
        "project-task-docker",
        "Dockerize a .NET app",
        "Microsoft Learn",
        "https://learn.microsoft.com/en-us/dotnet/core/docker/introduction",
        45,
        "guide"
      ),
      resource(
        "project-task-actions",
        "GitHub Actions for .NET",
        "GitHub Docs",
        "https://docs.github.com/en/actions/automating-builds-and-tests/building-and-testing-net",
        45,
        "guide"
      )
    ],
    tasks: [
      {
        id: "project-task-auth",
        title: "Implement registration, login, JWT refresh, and RBAC policies",
        outcome: "Secure API foundation ready for demos.",
        estimateMinutes: 180
      },
      {
        id: "project-task-domain",
        title: "Build task, project, label, reminder, and activity endpoints",
        outcome: "A complete backend feature set with Swagger examples.",
        estimateMinutes: 240
      },
      {
        id: "project-task-devops",
        title: "Add Docker, GitHub Actions, Redis cache, and Azure deployment notes",
        outcome: "Project becomes inspectable as a production-style artifact.",
        estimateMinutes: 220
      }
    ],
    interviewPrompts: [
      "How did you structure layers in the API?",
      "Where did caching help and where would it be risky?"
    ]
  },
  {
    id: "project-restaurant-platform",
    trackId: "projects",
    title: "Project 2: Restaurant Management Platform",
    category: "Full-Stack Portfolio",
    description:
      "Build a restaurant platform with inventory, orders, kitchen display, payments, coupons, analytics, QR ordering, notifications, SignalR, Blob Storage, Docker, CI/CD, and Azure.",
    difficulty: "Advanced",
    targetDayStart: 45,
    targetDayEnd: 90,
    resources: [
      resource(
        "project-restaurant-signalr",
        "SignalR real-time apps",
        "Microsoft Learn",
        "https://learn.microsoft.com/en-us/aspnet/core/signalr/introduction",
        60,
        "guide"
      ),
      resource(
        "project-restaurant-blob",
        "Azure Blob Storage documentation",
        "Microsoft Learn",
        "https://learn.microsoft.com/en-us/azure/storage/blobs/",
        55,
        "docs"
      ),
      resource(
        "project-restaurant-payments",
        "Stripe payments documentation",
        "Stripe Docs",
        "https://docs.stripe.com/payments",
        55,
        "docs"
      )
    ],
    tasks: [
      {
        id: "project-restaurant-core",
        title: "Model menu, inventory, orders, kitchen status, and staff roles",
        outcome: "Domain model supports real restaurant workflows.",
        estimateMinutes: 260
      },
      {
        id: "project-restaurant-realtime",
        title: "Add SignalR kitchen updates and notification events",
        outcome: "Order lifecycle updates feel live and demo-ready.",
        estimateMinutes: 180
      },
      {
        id: "project-restaurant-commerce",
        title: "Add QR ordering, coupons, payment flow, analytics, and Azure Blob images",
        outcome: "A strong full-stack product story for interviews.",
        estimateMinutes: 300
      }
    ],
    interviewPrompts: [
      "How would you prevent duplicate orders after payment retries?",
      "How did you separate operational screens from customer ordering screens?"
    ]
  }
];

export function getTrack(trackId: StudyTrack["id"]) {
  return studyTracks.find((track) => track.id === trackId);
}

export function getTrackModules(trackId: StudyTrack["id"]) {
  return studyModules.filter((module) => module.trackId === trackId);
}

export function getAllStudyMaterials() {
  return studyModules.flatMap((module) => module.resources);
}

export function getAllStudyTasks() {
  return studyModules.flatMap((module) =>
    module.tasks.map((task) => ({
      ...task,
      moduleId: module.id,
      moduleTitle: module.title,
      trackId: module.trackId
    }))
  );
}
