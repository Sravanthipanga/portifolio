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
      { name: "Cloud Networking", icon: "cloud" },
      { name: "Infrastructure as Code", icon: "layers", match: "infrastructure as code" },
    ],
  },
  {
    family: "Observability",
    skills: [
      { name: "OpenTelemetry", icon: "opentelemetry" },
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
      "Design, code, and debug production-quality full-stack features for customer-facing healthcare software and web services using Java, Spring Boot, React, and TypeScript.",
      "Deployed and supported applications in AWS cloud environments, leveraging cloud-native and serverless services to improve scalability, reliability, and operational efficiency.",
      "Build frontend interfaces in React.js backed by Java services with PostgreSQL, and contribute to a separate project using Kotlin and JavaScript.",
      "Implemented OAuth 2.0 and other authentication and authorization mechanisms, including role-based access control (RBAC) and token-based security, to protect sensitive application data and ensure secure user access.",
      "Leverage Sumo Logic for centralized log aggregation and analysis, building dashboards and proactive alerts that improve visibility into service health and accelerate troubleshooting of production issues.",
      "Partner closely with the Product team to translate healthcare workflows into high-performing software.",
      "Build responsive web pages with HTML/CSS that match given designs; develop and integrate RESTful web services.",
      "Apply SQL and relational database design fundamentals across PostgreSQL and MySQL-backed services.",
      "Contribute to system design discussions and help shape scalable, maintainable architectural patterns.",
      "Improve observability through logging, metrics, dashboards, and alerting best practices.",
      "Plan and execute unit and functional tests to ensure changes meet requirements.",
      "Use AI-assisted tools responsibly to accelerate debugging, log analysis, and code generation.",
      "Deploy and operate containerized services on AWS and Kubernetes; collaborate in sprint planning to improve estimation accuracy and development flow.",
      "Participate in code reviews and sprint ceremonies, upholding high standards of design, implementation, performance, and security.",
    ],
    tech: ["Java", "Spring Boot", "React", "TypeScript", "OAuth2", "JavaScript", "Kotlin", "HTML/CSS", "SQL", "PostgreSQL", "MySQL", "AWS", "Kubernetes", "AI-assisted dev tools"],
  },
  {
    company: "Context4 Healthcare",
    place: "Naperville, IL",
    title: "Full Stack Developer",
    start: "Jan 2025",
    end: "May 2026",
    bullets: [
      "Engineered robust back-end systems using Java 21 and Spring Boot 3, enhancing API performance and ensuring seamless integration with PostgreSQL databases.",
      "Deployed and supported applications in AWS cloud environments, leveraging cloud-native and serverless services to improve scalability, reliability, and operational efficiency.",
      "Modernized an internal CEO application using Java 18, Spring Boot, and PostgreSQL, improving backend performance through query optimization and indexing. Implemented unit and integration testing and leveraged GitHub workflows for source control, code reviews, and collaborative development.",
      "Collaborated with cross-functional teams, including application build teams and stakeholders, to design and implement RESTful APIs for seamless data sharing, ensuring compliance with healthcare messaging protocols like HL7 FHIR.",
      "Collaborated with cross-functional teams to design fault-tolerant systems, implementing automated recovery strategies and ensuring high availability through Resilience4j and Circuit Breaker Pattern.",
      "Developed RESTful APIs with OpenAPI and Swagger, applying OAuth2 for secure authentication and authorization, resulting in improved user experience and data protection.",
      "Implemented CI/CD pipelines using GitHub Actions and Docker, streamlining deployment processes and reducing release time by 30%.",
      "Optimized database queries and indexing strategies in PostgreSQL, achieving a 25% reduction in response time for data retrieval operations.",
      "Facilitated code reviews and mentoring sessions, promoting best practices in software development and enhancing team collaboration.",
      "Designed user interfaces with HTML/CSS and Bootstrap, ensuring mobile-responsive layouts that cater to diverse user needs across devices.",
      "Conducted performance testing using JMeter and k6, identifying bottlenecks and implementing solutions that improved system throughput by 40%.",
      "Led the migration to Jakarta EE, modernizing legacy applications and enhancing maintainability and scalability of the codebase.",
      "Monitored application performance using Prometheus and Grafana, establishing SLOs and SLAs that improved incident response times by 20%.",
      "Engineered robust microservices architecture utilizing Java 21 and Spring Boot 3, enhancing application scalability and performance in healthcare solutions.",
      "Maintained and enhanced a Medicare and Medicaid insurance claims application using Java, Spring Boot, PostgreSQL, and GraphQL, improving backend performance, claims processing workflows, provider and member data management, and overall system scalability through query and database optimization.",
      "Implemented OAuth2 and OpenID Connect (OIDC) for secure user authentication, significantly improving data protection and compliance with healthcare regulations.",
      "Leveraged AWS services, including Amazon RDS and Amazon EKS, to deploy and manage applications, achieving high availability and fault tolerance.",
      "Collaborated with cross-functional teams to design and implement event-driven architecture using Apache Kafka, optimizing data processing and real-time analytics.",
      "Conducted performance tuning and latency optimization, resulting in a 30% reduction in response times for critical healthcare applications.",
      "Mentored junior developers on best practices in secure API design and microservices development, fostering a culture of continuous learning.",
      "Engaged in regular code reviews and integration testing, ensuring high-quality deliverables and adherence to coding standards.",
    ],
    tech: ["Java 21", "Spring Boot 3", "PostgreSQL", "Docker", "GitHub Actions", "Resilience4j", "Circuit Breaker Pattern", "OpenAPI", "Swagger", "AWS", "Apache Kafka", "OAuth2", "OIDC", "GraphQL", "Microservices Architecture", "Event-Driven Architecture", "Jakarta EE"],
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
    description: EXPERIENCE[1].bullets[14],
    features: ["Claims processing workflows", "Provider & member data", "Query & database optimization", "Scalable backend"],
    tech: ["Java", "Spring Boot", "PostgreSQL", "GraphQL"],
    ui: "medicare",
  },
  {
    id: "gemma",
    index: "02",
    title: "GEMMA",
    kicker: "Optum · Enterprise platform",
    description: EXPERIENCE[2].bullets[1],
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
    description: EXPERIENCE[2].bullets[3],
    features: ["Angular-based architecture", "Improved rendering efficiency", "Reusable UI components", "Reduced technical debt"],
    tech: ["Angular", "JavaScript"],
    ui: "components",
  },
  {
    id: "foundry",
    index: "04",
    title: "Foundry Pipelines",
    kicker: "Optum · Healthcare data",
    description: EXPERIENCE[2].bullets[2],
    features: ["HL7/FHIR-based claims data", "Data pipelines", "Workflow-driven applications", "Data accessibility & analytics"],
    tech: ["Palantir Foundry", "HL7/FHIR"],
    ui: "pipeline",
  },
  {
    id: "ceo-app",
    index: "05",
    title: "Internal CEO App",
    kicker: "Context4 Healthcare · Modernization",
    description: EXPERIENCE[1].bullets[2],
    features: ["Query optimization & indexing", "Unit & integration testing", "GitHub workflows", "Code reviews"],
    tech: ["Java 18", "Spring Boot", "PostgreSQL", "GitHub"],
    ui: "queries",
  },
  {
    id: "jakarta",
    index: "06",
    title: "Jakarta EE Migration",
    kicker: "Context4 Healthcare · Legacy modernization",
    description: EXPERIENCE[1].bullets[11],
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
  { value: 40, suffix: "%", label: "Throughput", caption: "Improved system throughput", detail: "Performance testing with JMeter and k6 · Context4", icon: "k6" },
  { value: 30, suffix: "%", label: "Release time", caption: "Reduced release time", detail: "CI/CD with GitHub Actions and Docker · Context4", icon: "githubactions" },
  { value: 30, suffix: "%", label: "Latency", caption: "Decrease in latency for frequently accessed data", detail: "Redis caching · Optum", icon: "redis" },
  { value: 25, suffix: "%", label: "Response time", caption: "Reduction in data-retrieval response time", detail: "PostgreSQL queries & indexing · Context4", icon: "postgresql" },
  { value: 20, suffix: "%", label: "Incident response", caption: "Faster incident response times", detail: "Prometheus & Grafana, SLOs and SLAs · Context4", icon: "grafana" },
  { value: 30, suffix: "%", label: "Critical apps", caption: "Reduction in response times for critical healthcare applications", detail: "Performance tuning & latency optimization · Context4", icon: "gauge" },
  { value: 40, suffix: "%", label: "Manual effort", caption: "Less manual effort in provisioning and deployment", detail: "CI/CD with Jenkins and Terraform · Optum", icon: "jenkins" },
  { value: 20, suffix: "%", label: "App response", caption: "Improvement in application response times", detail: "Performance tuning & latency optimization · Phoenix Global", icon: "gauge" },
];
