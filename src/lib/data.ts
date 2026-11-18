/**
 * Single source of truth for all copy on the site.
 * Every value below is taken from Sravanthi_Panga_Resume.pdf (and the
 * hyperlinks embedded in it). The only addition is the Master's completion
 * date (Dec 2025), supplied directly by Sravanthi.
 */

export type Profile = {
  name: string;
  firstName: string;
  initials: string;
  role: string;
  tagline: string;
  email: string;
  phone: string;
  phoneHref: string;
  location: string;
  resumeSummary: string[];
  github: string;
  linkedin: string;
  resume: string;
};

export const PROFILE: Profile = {
  name: "Sravanthi Panga",
  firstName: "Sravanthi",
  initials: "SP",
  role: "Software Engineer",
  tagline: "Specializing in full-stack development and back-end systems and processes.",
  email: "Sravanthipanga51@gmail.com",
  phone: "815 995 0003",
  phoneHref: "tel:+18159950003",
  location: "Illinois, United States",
  resumeSummary: [
    "6+ years of experience as a Software Engineer specializing in full-stack development and back-end systems and processes, with a strong focus on developing and maintaining cost systems and ensuring seamless API integration with local databases.",
    "Proven expertise in structured software development processes, applying best practices to deliver quality and consistency across projects while collaborating effectively with product and engineering teams.",
    "Hands-on experience in Node.js and Next.js/React, with a solid understanding of SQL and model/ORM tools, particularly PostgreSQL; also strong in Java 17/21, Spring Boot, Python, TypeScript, Apache Kafka, and AWS/Azure cloud environments.",
    "Skilled in designing fault-tolerant systems with a focus on security and scalability, incorporating OAuth2, OpenID Connect, and JWT authentication; experienced with HL7/FHIR-based integrations for healthcare claims intake and review in HIPAA-regulated environments.",
    "Experienced in customer implementation and problem-solving using advanced technologies, including Palantir Foundry data integration, ontologies, and model orchestration.",
    "Demonstrated ability to create mobile-responsive UIs that function seamlessly across various browsers and devices; recognized for technical leadership and mentoring capabilities.",
  ],
  github: "https://github.com/Sravanthipanga",
  linkedin: "https://www.linkedin.com/in/sravanthi-panga-174382204/",
  resume: "/Sravanthi_Panga_Resume.pdf",
};

export type NavItem = { id: string; label: string };

export const NAV: NavItem[] = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Work" },
  { id: "healthcare", label: "Healthcare" },
  { id: "experience", label: "Experience" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
];

/* ------------------------------------------------------------------ */
/* Skills — every item from the résumé's SKILLS section, de-duplicated */
/* ------------------------------------------------------------------ */

export type Skill = {
  name: string;
  /** brand logo key (see TechLogo BRAND) or concept icon key (CONCEPT) */
  icon: string;
  /** regex source used to find where the skill appears in the résumé */
  match?: string;
};

export type SkillGroup = { family: string; skills: Skill[] };

export const SKILL_GROUPS: SkillGroup[] = [
  {
    family: "Languages",
    skills: [
      { name: "Java 17", icon: "java", match: "\\bjava( 17)?\\b(?! ?(21|18))" },
      { name: "Java 21", icon: "java", match: "\\bjava( 21)?\\b(?! ?(17|18))" },
      { name: "JavaScript", icon: "javascript" },
      { name: "TypeScript", icon: "typescript" },
      { name: "Python", icon: "python" },
      { name: "SQL", icon: "database", match: "\\bsql\\b" },
      { name: "HTML", icon: "html5", match: "\\bhtml" },
      { name: "CSS", icon: "css3", match: "\\bcss\\b" },
      { name: "PySpark", icon: "apachespark" },
      { name: "C#", icon: "csharp", match: "c#" },
      { name: "Kotlin", icon: "kotlin" },
      { name: "Ruby", icon: "ruby" },
      { name: "Go", icon: "go", match: "\\bgo\\b(?=,| and| microservices)" },
    ],
  },
  {
    family: "Frontend",
    skills: [
      { name: "React", icon: "react", match: "\\breact" },
      { name: "Next.js", icon: "nextjs", match: "next\\.js" },
      { name: "Bootstrap", icon: "bootstrap" },
      { name: "Angular", icon: "angular" },
      { name: "Vue.js", icon: "vuejs", match: "vue" },
    ],
  },
  {
    family: "Backend",
    skills: [
      { name: "Spring Boot 3", icon: "springboot", match: "spring boot" },
      { name: "Spring Framework 6", icon: "spring", match: "spring framework" },
      { name: "Spring MVC", icon: "spring" },
      { name: "Spring WebFlux", icon: "spring" },
      { name: "Spring Security", icon: "spring" },
      { name: "Node.js", icon: "nodejs", match: "node\\.js" },
      { name: "Apache Kafka", icon: "apachekafka", match: "\\bkafka\\b" },
      { name: "OSDK", icon: "palantir" },
      { name: "Jakarta EE", icon: "box", match: "jakarta ee" },
      { name: ".NET", icon: "dotnet", match: "\\.net\\b" },
      { name: "GraphQL", icon: "graphql" },
    ],
  },
  {
    family: "APIs & Security",
    skills: [
      { name: "REST API Design", icon: "api", match: "restful|rest api" },
      { name: "OpenAPI", icon: "openapi" },
      { name: "Swagger", icon: "swagger" },
      { name: "API Versioning", icon: "versions" },
      { name: "Contract-First APIs", icon: "contract" },
      { name: "OAuth2", icon: "lock", match: "oauth ?2|oauth 2\\.0" },
      { name: "OpenID Connect (OIDC)", icon: "id", match: "openid" },
      { name: "JWT", icon: "key", match: "\\bjwt\\b" },
    ],
  },
  {
    family: "Architecture",
    skills: [
      { name: "Microservices Architecture", icon: "nodes", match: "microservices" },
      { name: "Distributed Systems", icon: "network", match: "distributed systems" },
      { name: "Event-Driven Architecture", icon: "bolt", match: "event-driven" },
      { name: "Saga Pattern", icon: "flow" },
      { name: "Outbox Pattern", icon: "outbox" },
      { name: "Circuit Breaker Pattern", icon: "breaker", match: "circuit breaker" },
      { name: "Resilience4j", icon: "shield" },
      { name: "Service Discovery", icon: "radar" },
      { name: "API Gateway", icon: "gateway" },
      { name: "Distributed Transactions", icon: "flow" },
      { name: "Retry and Backoff Strategies", icon: "retry" },
      { name: "Data Consistency Models", icon: "layers" },
    ],
  },
  {
    family: "Mobile",
    skills: [
      { name: "Android Development", icon: "android", match: "android" },
      { name: "Jetpack Compose", icon: "jetpackcompose" },
      { name: "MVVM Architecture", icon: "layers", match: "mvvm" },
    ],
  },
  {
    family: "AI & Tooling",
    skills: [
      { name: "Generative AI", icon: "spark", match: "generative ai" },
      { name: "AI-assisted Development", icon: "spark", match: "ai-assisted" },
      { name: "Kiro", icon: "api" },
      { name: "MCP Servers", icon: "nodes", match: "\\bmcp\\b" },
    ],
  },
  {
    family: "Event Streaming",
    skills: [
      { name: "Kafka Streams", icon: "apachekafka" },
      { name: "Kafka Connect", icon: "apachekafka" },
      { name: "Schema Registry", icon: "contract" },
      { name: "Avro", icon: "box" },
      { name: "Protobuf", icon: "box" },
      { name: "Idempotent Consumers", icon: "equal" },
      { name: "Exactly-Once Processing", icon: "one" },
      { name: "At-Least-Once Semantics", icon: "plusone" },
    ],
  },
  {
    family: "Data",
    skills: [
      { name: "PostgreSQL", icon: "postgresql", match: "postgresq" },
      { name: "MySQL", icon: "mysql" },
      { name: "NoSQL Databases", icon: "database", match: "nosql" },
      { name: "DynamoDB", icon: "dynamodb" },
      { name: "Cassandra", icon: "cassandra" },
      { name: "MongoDB", icon: "mongodb" },
      { name: "Redis", icon: "redis" },
      { name: "Database Indexing", icon: "index", match: "indexing" },
      { name: "Query Optimization", icon: "search", match: "query optimization|optimized database queries" },
    ],
  },
  {
    family: "Cloud",
    skills: [
      { name: "AWS", icon: "aws", match: "\\baws\\b" },
      { name: "Amazon EKS", icon: "aws" },
      { name: "Amazon ECS", icon: "aws" },
      { name: "Amazon RDS", icon: "aws" },
      { name: "Amazon MSK", icon: "aws" },
      { name: "Azure AKS", icon: "azure" },
      { name: "Azure Key Vault", icon: "azure" },
      { name: "Google GKE", icon: "googlecloud" },
    ],
  },
  {
    family: "DevOps",
    skills: [
      { name: "Docker", icon: "docker" },
      { name: "Kubernetes", icon: "kubernetes" },
      { name: "Helm", icon: "helm" },
      { name: "CI/CD Pipelines", icon: "pipeline", match: "ci/cd" },
      { name: "GitHub Actions", icon: "githubactions" },
      { name: "Jenkins", icon: "jenkins" },
      { name: "GitLab CI", icon: "gitlab" },
      { name: "Terraform", icon: "terraform" },
      { name: "Apache Airflow", icon: "airflow", match: "airflow" },
      { name: "Cloud Networking", icon: "cloud" },
      { name: "Infrastructure as Code", icon: "layers", match: "infrastructure as code" },
    ],
  },
  {
    family: "Observability",
    skills: [
      { name: "OpenTelemetry", icon: "opentelemetry" },
      { name: "Sumo Logic", icon: "sumologic" },
      { name: "Distributed Tracing", icon: "trace" },
      { name: "Prometheus", icon: "prometheus" },
      { name: "Grafana", icon: "grafana" },
      { name: "Centralized Logging", icon: "logs", match: "centralized log" },
      { name: "Structured Logging", icon: "logs" },
      { name: "Monitoring and Alerting", icon: "bell", match: "monitor|alert" },
      { name: "Incident Response", icon: "siren", match: "incident" },
    ],
  },
  {
    family: "Testing",
    skills: [
      { name: "Unit Testing", icon: "check", match: "unit (and|testing|&)" },
      { name: "Integration Testing", icon: "check", match: "integration testing" },
      { name: "Contract Testing", icon: "contract" },
      { name: "Testcontainers", icon: "box" },
      { name: "JUnit", icon: "junit" },
      { name: "Mockito", icon: "flask" },
      { name: "Performance Testing", icon: "gauge", match: "performance testing" },
      { name: "k6", icon: "k6", match: "\\bk6\\b" },
    ],
  },
  {
    family: "Performance",
    skills: [
      { name: "Performance Tuning", icon: "gauge", match: "performance tuning" },
      { name: "Latency Optimization", icon: "timer", match: "latency" },
      { name: "High Availability Systems", icon: "uptime", match: "high availability" },
      { name: "Scalability Engineering", icon: "scale", match: "scalab" },
      { name: "Fault Tolerance", icon: "shield", match: "fault[- ]toleran" },
    ],
  },
  {
    family: "Soft skills",
    skills: [
      { name: "Technical Leadership", icon: "compass", match: "\\bled\\b|leadership" },
      { name: "Communication", icon: "chat", match: "communicat" },
      { name: "Problem-Solving", icon: "bulb", match: "problem-solving|root cause" },
      { name: "Collaboration", icon: "people", match: "collaborat" },
      { name: "Teamwork", icon: "people", match: "team" },
      { name: "Technical Documentation", icon: "book", match: "documentation|knowledge articles" },
      { name: "Learning Content (LMS)", icon: "book", match: "\\blms\\b|learning content" },
      { name: "Adaptability", icon: "retry" },
      { name: "Critical Thinking", icon: "bulb" },
      { name: "Time Management", icon: "timer" },
      { name: "Stakeholder Management", icon: "people", match: "stakeholder" },
      { name: "Conflict Resolution", icon: "equal" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Experience & education                                              */
/* ------------------------------------------------------------------ */

export type Experience = {
  company: string;
  place?: string;
  title: string;
  start: string;
  end: string;
  bullets: string[];
  tech: string[];
};

export const EXPERIENCE: Experience[] = [
  {
    company: "Bamboo Health",
    title: "Software Engineer",
    start: "Jun 2026",
    end: "Present",
    bullets: [
      "Engineered full-stack features for customer-facing healthcare web services across 3 tiers — React/TypeScript frontend, Java/Spring Boot services, and PostgreSQL data layer.",
      "Developed Android-facing healthcare workflows for the Distributed Clearing House platform using Kotlin, integrating backend web services and APIs into mobile views and ensuring reliable functionality, responsive performance, and secure access to healthcare transaction data.",
      "Built Sumo Logic dashboards and proactive alerts on 1 centralized log-aggregation pipeline, improving service-health visibility and accelerating production troubleshooting across all production services.",
      "Built and enhanced mobile application components using Kotlin and Jetpack Compose, integrating RESTful web services and reusable UI components to provide modern, responsive experiences for healthcare claims and transaction workflows.",
      "Supported Android application integration by developing reusable Kotlin components and service-integration patterns, connecting mobile functionality with distributed backend microservices while focusing on performance, scalability, maintainability, and secure healthcare data handling.",
      "Automated workflow orchestration and platform automation for healthcare claims processing at Change Healthcare's Distributed Clearing House using 3 tools: Airflow for scheduling and monitoring, Terraform for AWS infrastructure provisioning, and GitHub Actions for build, test, and deployment pipelines.",
      "Leveraged Generative AI and AI-assisted tools across 4 applications: accelerating content development, refining training materials, generating scenario-based learning activities, and improving the clarity and consistency of technical documentation.",
      "Applied AI-assisted development tools in Kiro across 3 workflows — debugging, log analysis, and code generation — and self-configured MCP servers in the working environment to extend the tool with project context.",
      "Delivered features on 2 parallel project stacks — React/Java/PostgreSQL and Kotlin/JavaScript — deploying containerized services on AWS and Kubernetes and shaping scalable patterns in architecture and design reviews.",
      "Built frontend interfaces in React.js backed by Java services with PostgreSQL, and contributed to a separate project using Kotlin and JavaScript.",
      "Partnered closely with the Product team and subject matter experts (SMEs) to translate healthcare workflows into high-performing software.",
      "Built responsive web pages with HTML/CSS and reusable matching given designs, and developed and integrated RESTful web services.",
      "Applied SQL and relational database design fundamentals across 2 database platforms — PostgreSQL and MySQL-backed services.",
      "Contributed to system design discussions and shaped scalable, maintainable architectural patterns.",
      "Improved observability through logging, metrics, dashboards, and alerting best practices.",
      "Planned and executed unit and functional tests to ensure every change met requirements before release.",
      "Deployed and operated containerized services on AWS and Kubernetes, and improved estimation accuracy and development flow through sprint planning.",
      "Participated in code reviews and sprint ceremonies, upholding high standards of design, implementation, performance, and security.",
    ],
    tech: ["Java", "Kotlin", "Spring Boot", "React", "TypeScript", "JavaScript", "HTML/CSS", "SQL", "PostgreSQL", "MySQL", "AWS", "Kubernetes", "Airflow", "Terraform", "GitHub Actions", "Sumo Logic", "Kiro", "MCP", "AI-assisted dev tools"],
  },
  {
    company: "Context4 Healthcare",
    place: "Naperville, IL",
    title: "Full Stack Developer",
    start: "Jan 2025",
    end: "May 2026",
    bullets: [
      "Boosted user engagement 30% by redesigning REST APIs in Java 21 and Spring Boot 3 integrated with PostgreSQL.",
      "Modernized the internal CEO application with C# and PostgreSQL, Extended capabilities of the CEO Medicare and Medicaid claims application to Android workflows using Kotlin, integrating existing C# backend services through GraphQL APIs and delivering mobile-accessible claims, member, and provider functionality while optimizing service performance and PostgreSQL data access.",
      "Led technical documentation and content development, developing comprehensive knowledge articles and platform-governance documentation that improved onboarding efficiency for new team members.",
      "Developed and maintained structured learning content through Learning Management Systems (LMS), organizing 3 content types — technical training materials, onboarding resources, and knowledge-based content — to improve accessibility and learner adoption.",
      "Provided technical guidance and code reviews for Android development, sharing best practices around Kotlin, Jetpack Compose, reusable component design, API integration, testing, and performance optimization to improve code quality and maintainability across the team.",
      "Built mobile-ready Rules Engine and Rules Editor capabilities using Kotlin, integrating distributed backend services and optimizing rule retrieval, validation, and UI interactions to provide a consistent experience across web and Android environments.",
      "Designed 4 deliverable types — storyboards, training scripts, process documentation, and step-by-step learning materials — in collaboration with subject matter experts, ensuring technical information was accurate, consistent, and aligned with learner needs.",
      "Mentored junior engineers on 2 practice areas — microservices design and API versioning — building a culture of continuous learning.",
      "Applied MVVM architecture in Kotlin-based Android development, separating UI, business logic, and data layers through ViewModels and reusable components to improve maintainability, testability, and scalability of mobile healthcare workflows.",
      "Worked in a lean, fast-paced engineering environment to design, enhance, and support high-volume mobile healthcare features, rapidly delivering new functionality while optimizing application performance, resolving production issues, and collaborating across product and engineering teams.",
      "Diagnosed and resolved real production issues in large-scale production codebases, cutting response times 20% through performance tuning and latency optimization for high-availability systems.",
      "Supported data migration and integration workflows for the claims rules engine across distributed systems, troubleshooting network connectivity between 4 components — Java/Spring Boot services, PostgreSQL databases, REST APIs, and cloud-hosted applications — while validating secure and reliable data transfer.",
      "Designed and supported network-enabled Java/Spring Boot microservices for the claims rules engine, troubleshooting 4 connectivity areas — API connectivity, IP ports, routing, and service-to-service communication — across distributed application environments to improve reliability and resolve integration issues.",
      "Turned production issue resolutions into knowledge articles and job aids, so each resolution became reusable learning content that improved onboarding efficiency for new team members.",
      "Upgraded the internal CEO application frontend by refactoring ReactJS modules to enhance user experience and responsiveness, and optimized Node.js REST APIs for faster data retrieval.",
      "Implemented DevOps best practices for the CEO application — Jenkins-based CI/CD, Docker containerization, environment configuration management, and automated testing — ensuring high availability and streamlined production deployments across 4 practices.",
      "Cut deployment time 25% by engineering a microservices architecture leveraging Spring Framework 6 and Docker, improving system scalability.",
      "Raised release frequency 40% by implementing CI/CD pipelines using GitHub Actions and Jenkins, streamlining the development lifecycle.",
      "Designed and maintained secure APIs utilizing OAuth2 and OpenID Connect (OIDC), ensuring compliance with OWASP API Top 10 standards for enhanced security.",
      "Improved system responsiveness 50% by implementing event-driven architecture using Apache Kafka and Kafka Streams, enabling real-time data processing.",
      "Applied API design best practices across production REST APIs — resource modeling, pagination, rate limiting, versioning and deprecation, idempotency, and error contracts developers can act on.",
      "Improved data retrieval 35% by utilizing Redis caching to enhance application performance and reduce database load.",
      "Reduced post-deployment defects 15% by executing rigorous unit and integration testing using JUnit and Mockito, ensuring high-quality code delivery.",
    ],
    tech: ["C#", ".NET", "ReactJS", "Node.js", "Kotlin", "PostgreSQL", "Docker", "Apache Kafka", "Kafka Streams", "GitHub Actions", "Jenkins", "OAuth2", "OpenID Connect (OIDC)", "Redis", "JUnit", "Mockito", "LMS", "authoring tools"],
  },
  {
    company: "Optum Global Solutions",
    place: "Hyderabad, India",
    title: "Associate Software Engineer",
    start: "Feb 2021",
    end: "Nov 2023",
    bullets: [
      "Developed microservices architecture using Java 17 and Spring Framework 6, facilitating distributed systems that improved scalability and fault tolerance.",
      "Developed 6 core functional screens for the GEMMA enterprise platform at Optum using Java 18, Spring Boot, React, RESTful APIs, and Tailwind CSS Modules, implementing secure role-based access, optimized database interactions, and HIPAA-compliant workflows to support high-volume dental claims processing.",
      "Utilized Palantir Foundry to integrate and transform healthcare datasets, including HL7/FHIR-based claims data, build data pipelines, and develop workflow-driven applications, improving data accessibility, analytics, and operational efficiency in healthcare systems.",
      "Modernized the Atrium application by replacing the legacy JavaScript front-end with an Angular-based architecture, improving rendering efficiency, introducing reusable UI components, and reducing technical debt.",
      "Integrated event-driven architecture with Apache Kafka and Kafka Streams, enabling real-time data processing and enhancing system responsiveness.",
      "Collaborated with product teams to create user-centric applications, applying agile methodologies to ensure timely delivery and high-quality outcomes.",
      "Implemented API versioning and Contract-First APIs, ensuring backward compatibility and seamless upgrades for existing services.",
      "Utilized Redis caching to optimize data retrieval processes, resulting in a 30% decrease in latency for frequently accessed data.",
      "Executed infrastructure as code using Terraform, automating the provisioning of cloud resources on AWS and enhancing deployment efficiency.",
      "Conducted unit and integration testing with JUnit and Mockito, ensuring code reliability and reducing defect rates in production.",
      "Engaged in stakeholder management, effectively communicating project status and aligning development efforts with business objectives.",
      "Enhanced security measures by implementing OWASP API Top 10 guidelines, ensuring compliance and protecting sensitive data.",
      "Participated in knowledge-sharing sessions, fostering a culture of continuous learning and technical excellence within the team.",
      "Developed and enhanced the GEMMA enterprise application at Optum using Go, microservices, React, and RESTful APIs, supporting dental benefits administration and claims processing within the FACETS insurance platform. Designed scalable backend services, optimized transaction workflows, and implemented secure, HIPAA-compliant solutions for eligibility, claims adjudication, and financial processing.",
      "Implemented OAuth 2.0 and other authentication and authorization mechanisms, including role-based access control (RBAC) and token-based security, to protect sensitive application data and ensure secure user access.",
      "Designed and implemented REST API endpoints, utilizing Swagger for documentation and API versioning, enhancing developer experience and usability.",
      "Integrated Redis caching to improve application performance, achieving a 25% increase in data retrieval speeds for high-traffic services.",
      "Collaborated with product teams to gather requirements and translate them into technical specifications, ensuring alignment with business objectives.",
      "Utilized PostgreSQL and MongoDB for data storage solutions, optimizing query performance through effective indexing strategies.",
      "Implemented CI/CD processes with Jenkins and Terraform, automating infrastructure provisioning and application deployment, reducing manual efforts by 40%.",
      "Participated in agile ceremonies, including sprint planning and retrospectives, fostering a collaborative team environment.",
      "Resolved production issues through root cause analysis and incident response, minimizing downtime and enhancing service reliability.",
      "Championed best practices in software development, including secure coding standards and performance optimization techniques.",
    ],
    tech: ["Java 17", "Spring Framework 6", "Apache Kafka", "Redis", "AWS", "Terraform", "JUnit", "Mockito", "API Versioning", "Contract-First APIs", "Go", "React", "PostgreSQL", "MongoDB", "Jenkins", "Swagger", "Microservices Architecture"],
  },
  {
    company: "Phoenix Global",
    place: "Hyderabad, India",
    title: "Software Engineer",
    start: "Aug 2019",
    end: "Feb 2021",
    bullets: [
      "Developed and maintained back-end services using Java and Spring MVC, ensuring efficient interaction with NoSQL databases such as MongoDB.",
      "Collaborated with front-end developers to create cohesive user experiences, leveraging HTML/CSS and CSS frameworks for responsive design.",
      "Implemented automated testing strategies using Testcontainers, enhancing code quality and reducing manual testing efforts.",
      "Engaged in performance tuning and latency optimization, achieving a 20% improvement in application response times.",
      "Assisted in the migration of legacy systems to cloud-based environments, utilizing AWS services to enhance scalability and reliability.",
      "Conducted root cause analysis for production incidents, implementing corrective actions that improved system stability and user satisfaction.",
      "Participated in agile ceremonies, contributing to sprint planning and retrospectives to enhance team productivity and project outcomes.",
      "Documented technical specifications and user guides, ensuring clear communication of system functionalities to stakeholders.",
      "Supported database indexing and query optimization efforts, resulting in improved data access speeds and overall system performance.",
      "Mentored junior developers, providing guidance on best practices in software development and fostering a collaborative team environment.",
      "Developed and maintained web applications using Java and Spring MVC, contributing to the overall architecture and design of client solutions.",
      "Collaborated with UX/UI designers to implement responsive front-end features using React, enhancing user engagement and satisfaction.",
      "Created and documented RESTful APIs, ensuring compliance with industry standards and facilitating integration with third-party services.",
      "Assisted in database management using MySQL, focusing on query optimization and data consistency models to improve application performance.",
      "Engaged in code reviews and provided constructive feedback to peers, promoting a culture of quality and continuous improvement within the team.",
      "Supported the migration of legacy applications to modern frameworks, enhancing maintainability and scalability.",
      "Participated in troubleshooting and debugging efforts, resolving issues to ensure optimal application functionality.",
      "Contributed to the development of internal tools that streamlined workflows and improved team productivity.",
      "Conducted training sessions for new team members, sharing knowledge on best practices and company standards.",
      "Actively participated in team meetings, contributing ideas for process improvements and innovative solutions.",
    ],
    tech: ["Java", "Spring MVC", "MongoDB", "AWS", "Testcontainers", "HTML/CSS", "Agile", "Performance Tuning", "Root Cause Analysis", "Query Optimization", "MySQL", "React", "REST APIs", "Legacy Migration"],
  },
];

export type Education = { degree: string; school: string; score: string; date?: string };

export const EDUCATION: Education[] = [
  { degree: "Masters in Computer Science", school: "Northern Illinois University", score: "3.38 GPA", date: "Dec 2025" },
  { degree: "Bachelors in Computer Science Engineering", school: "Gandhi Institute of Technology", score: "8.94 GPA" },
];

/* ------------------------------------------------------------------ */
/* Work — projects named inside the résumé's experience bullets        */
/* ------------------------------------------------------------------ */

export type ProjectUI = "claims" | "components" | "pipeline" | "queries" | "migration" | "medicare";

export type Project = {
  id: string;
  index: string;
  title: string;
  kicker: string;
  description: string;
  features: string[];
  tech: string[];
  github?: string;
  /** A later phase of the same project, shown after the description. */
  nextPhase?: { title: string; text: string };
  ui: ProjectUI;
};

export const PROJECTS: Project[] = [
  {
    id: "medicare",
    index: "01",
    title: "Medicare & Medicaid Claims",
    kicker: "Context4 Healthcare · Insurance claims",
    description: "Maintained and enhanced a Medicare and Medicaid insurance claims application using Java, Spring Boot, PostgreSQL, and GraphQL, improving backend performance, claims processing workflows, provider and member data management, and overall system scalability through query and database optimization.",
    features: ["Claims processing workflows", "Provider & member data", "Query & database optimization", "Scalable backend"],
    tech: ["Java", "Spring Boot", "PostgreSQL", "GraphQL"],
    ui: "medicare",
  },
  {
    id: "gemma",
    index: "02",
    title: "GEMMA",
    kicker: "Optum · Enterprise platform",
    description: "Developed 6 core functional screens for the GEMMA enterprise platform at Optum using Java 18, Spring Boot, React, RESTful APIs, and Tailwind CSS Modules, implementing secure role-based access, optimized database interactions, and HIPAA-compliant workflows to support high-volume dental claims processing.",
    features: ["6 core functional screens", "Secure role-based access", "Optimized database interactions", "HIPAA-compliant workflows"],
    nextPhase: {
      title: "Go & microservices",
      text: "Developed and enhanced GEMMA using Go, microservices, React, and RESTful APIs, supporting dental benefits administration and claims processing within the FACETS insurance platform.",
    },
    tech: ["Java 18", "Spring Boot", "React", "RESTful APIs", "Tailwind CSS Modules", "Go", "Microservices"],
    ui: "claims",
  },
  {
    id: "atrium",
    index: "03",
    title: "Atrium",
    kicker: "Optum · Front-end modernization",
    description: "Modernized the Atrium application by replacing the legacy JavaScript front-end with an Angular-based architecture, improving rendering efficiency, introducing reusable UI components, and reducing technical debt.",
    features: ["Angular-based architecture", "Improved rendering efficiency", "Reusable UI components", "Reduced technical debt"],
    tech: ["Angular", "JavaScript"],
    ui: "components",
  },
  {
    id: "foundry",
    index: "04",
    title: "Foundry Pipelines",
    kicker: "Optum · Healthcare data",
    description: "Utilized Palantir Foundry to integrate and transform healthcare datasets, including HL7/FHIR-based claims data, build data pipelines, and develop workflow-driven applications, improving data accessibility, analytics, and operational efficiency in healthcare systems.",
    features: ["HL7/FHIR-based claims data", "Data pipelines", "Workflow-driven applications", "Data accessibility & analytics"],
    tech: ["Palantir Foundry", "HL7/FHIR"],
    ui: "pipeline",
  },
  {
    id: "ceo-app",
    index: "05",
    title: "Internal CEO App",
    kicker: "Context4 Healthcare · Modernization",
    description: "Modernized an internal CEO application using Java 18, Spring Boot, and PostgreSQL, improving backend performance through query optimization and indexing. Implemented unit and integration testing and leveraged GitHub workflows for source control, code reviews, and collaborative development.",
    features: ["Query optimization & indexing", "Unit & integration testing", "GitHub workflows", "Code reviews"],
    tech: ["Java 18", "Spring Boot", "PostgreSQL", "GitHub"],
    ui: "queries",
  },
  {
    id: "jakarta",
    index: "06",
    title: "Jakarta EE Migration",
    kicker: "Context4 Healthcare · Legacy modernization",
    description: "Led the migration to Jakarta EE, modernizing legacy applications and enhancing maintainability and scalability of the codebase.",
    features: ["Led the migration", "Modernized legacy applications", "Better maintainability", "Better scalability"],
    tech: ["Jakarta EE", "Java"],
    ui: "migration",
  },
];

export type Certification = { title: string; issuer: string };

export const CERTIFICATIONS: Certification[] = [
  { title: "SQL Foundations", issuer: "Microsoft" },
  { title: "AWS Cloud Technical Essentials", issuer: "Amazon Web Services" },
  { title: "Azure AI and Healthcare Cloud Fundamentals", issuer: "Microsoft" },
  { title: "Foundations of AI and Machine Learning", issuer: "Microsoft" },
];

/* ------------------------------------------------------------------ */
/* Achievements — measured results stated in the résumé                */
/* ------------------------------------------------------------------ */

export type Achievement = {
  value: number;
  suffix: string;
  label: string;
  caption: string;
  detail: string;
  icon: string;
};

export const ACHIEVEMENTS: Achievement[] = [
  { value: 6, suffix: "+", label: "Years", caption: "Experience as a Software Engineer", detail: "Full-stack development & back-end systems", icon: "timer" },
  { value: 50, suffix: "%", label: "Responsiveness", caption: "Improved system responsiveness", detail: "Event-driven architecture with Apache Kafka & Kafka Streams · Context4", icon: "apachekafka" },
  { value: 40, suffix: "%", label: "Release frequency", caption: "Raised release frequency", detail: "CI/CD pipelines with GitHub Actions and Jenkins · Context4", icon: "githubactions" },
  { value: 35, suffix: "%", label: "Data retrieval", caption: "Faster data retrieval, lower database load", detail: "Redis caching · Context4", icon: "redis" },
  { value: 30, suffix: "%", label: "User engagement", caption: "Boosted user engagement", detail: "Redesigned REST APIs in Java 21 & Spring Boot 3 · Context4", icon: "springboot" },
  { value: 25, suffix: "%", label: "Deployment time", caption: "Cut deployment time", detail: "Microservices with Spring Framework 6 and Docker · Context4", icon: "docker" },
  { value: 20, suffix: "%", label: "Response time", caption: "Cut response times in production", detail: "Performance tuning & latency optimization · Context4", icon: "gauge" },
  { value: 15, suffix: "%", label: "Defects", caption: "Fewer post-deployment defects", detail: "Unit & integration testing with JUnit and Mockito · Context4", icon: "junit" },
  { value: 30, suffix: "%", label: "Latency", caption: "Decrease in latency for frequently accessed data", detail: "Redis caching · Optum", icon: "redis" },
  { value: 40, suffix: "%", label: "Manual effort", caption: "Less manual effort in provisioning and deployment", detail: "CI/CD with Jenkins and Terraform · Optum", icon: "jenkins" },
  { value: 20, suffix: "%", label: "App response", caption: "Improvement in application response times", detail: "Performance tuning & latency optimization · Phoenix Global", icon: "gauge" },
];

/* ------------------------------------------------------------------ */
/* Healthcare domain map — how US healthcare systems fit together.     */
/* Structure supplied by Sravanthi; "mine" marks the areas her résumé  */
/* shows she has built for (GEMMA at Optum, Medicare/Medicaid claims   */
/* and HL7 FHIR APIs at Context4 Healthcare).                          */
/* ------------------------------------------------------------------ */

export type DomainSystem = { title: string; detail: string; mine?: string };
export type DomainColumn = { id: string; title: string; tagline: string; systems: DomainSystem[] };

export const HEALTHCARE_COLUMNS: DomainColumn[] = [
  {
    id: "provider",
    title: "Provider systems",
    tagline: "Deliver care and bill for it",
    systems: [
      { title: "EHR / EMR", detail: "Charts, orders, clinical notes" },
      { title: "Practice management", detail: "Scheduling, registration, intake" },
      { title: "Coding and billing", detail: "ICD-10, CPT, charge capture" },
      { title: "Revenue cycle", detail: "Claims, denials, A/R follow-up" },
      { title: "Credentialing", detail: "Licensing, payer enrollment" },
      { title: "Provider portal", detail: "Auth status, remits, eligibility" },
    ],
  },
  {
    id: "payer",
    title: "Payer and claims",
    tagline: "Review, price and pay",
    systems: [
      {
        title: "Clearinghouse",
        detail: "EDI 837 / 835 / 277 routing",
        mine: "Bamboo Health · Change Healthcare's Distributed Clearing House",
      },
      { title: "Eligibility and benefits", detail: "EDI 270 / 271 checks", mine: "GEMMA · eligibility on FACETS" },
      { title: "Prior authorization", detail: "Medical necessity, EDI 278" },
      {
        title: "Adjudication engine",
        detail: "Edits, rules, pricing, pay/deny",
        mine: "GEMMA claims adjudication · Medicare & Medicaid claims · claims rules engine (Context4)",
      },
      { title: "Contracts and pricing", detail: "Fee schedules, rate tables" },
      { title: "Payment and EOB", detail: "Remits, checks, appeals", mine: "GEMMA · financial processing" },
    ],
  },
  {
    id: "member",
    title: "Member systems",
    tagline: "Enroll, inform and support",
    systems: [
      { title: "Enrollment", detail: "Plans, eligibility, EDI 834" },
      { title: "Member portal", detail: "ID card, claims, EOB" },
      { title: "Benefits and plans", detail: "Copay, deductible, limits", mine: "GEMMA · dental benefits administration" },
      { title: "Care management", detail: "Case mgmt, wellness programs" },
      { title: "Customer service", detail: "Calls, grievances, appeals" },
      { title: "Premium billing", detail: "Invoices, payments, renewals" },
    ],
  },
];

export const CLAIM_LIFECYCLE: { title: string; detail: string; mine?: boolean }[] = [
  { title: "Patient visit", detail: "Care, notes, codes" },
  { title: "Claim sent", detail: "837 to payer", mine: true },
  { title: "Adjudication", detail: "Edits, pricing, rules", mine: true },
  { title: "Payment", detail: "835 remit to provider", mine: true },
  { title: "Patient bill", detail: "EOB, balance, appeals" },
];

export const HEALTHCARE_STANDARDS: { label: string; mine?: boolean }[] = [
  { label: "HIPAA", mine: true },
  { label: "X12 EDI" },
  { label: "FHIR APIs", mine: true },
  { label: "CMS rules" },
  { label: "NCQA" },
  { label: "State DOI" },
];

export const PAYER_TYPES: { label: string; mine?: boolean }[] = [
  { label: "Medicare", mine: true },
  { label: "Medicaid", mine: true },
  { label: "Commercial" },
  { label: "Self-funded employers" },
];
