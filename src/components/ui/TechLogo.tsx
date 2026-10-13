import { CSSProperties, ReactNode } from "react";

/**
 * Brand logos live in /public/logos (devicon "original" SVGs, MIT; a few
 * simple-icons paths, CC0 — see public/logos/LICENSE-*). `tint` is the
 * official brand colour, only used for a soft glow behind the logo.
 */
export const BRAND: Record<string, { file: string; label: string; tint: string }> = {
  java: { file: "java.svg", label: "Java", tint: "#E76F00" },
  javascript: { file: "javascript.svg", label: "JavaScript", tint: "#F0DB4F" },
  typescript: { file: "typescript.svg", label: "TypeScript", tint: "#3178C6" },
  python: { file: "python.svg", label: "Python", tint: "#3776AB" },
  html5: { file: "html5.svg", label: "HTML5", tint: "#E44D26" },
  css3: { file: "css3.svg", label: "CSS3", tint: "#1572B6" },
  apachespark: { file: "apachespark.svg", label: "Apache Spark", tint: "#E25A1C" },
  react: { file: "react.svg", label: "React", tint: "#61DAFB" },
  nextjs: { file: "nextjs.svg", label: "Next.js", tint: "#000000" },
  bootstrap: { file: "bootstrap.svg", label: "Bootstrap", tint: "#7952B3" },
  springboot: { file: "springboot.svg", label: "Spring Boot", tint: "#6DB33F" },
  spring: { file: "spring.svg", label: "Spring", tint: "#6DB33F" },
  nodejs: { file: "nodejs.svg", label: "Node.js", tint: "#83CD29" },
  apachekafka: { file: "apachekafka.svg", label: "Apache Kafka", tint: "#231F20" },
  palantir: { file: "palantir.svg", label: "Palantir", tint: "#101113" },
  openapi: { file: "openapi.svg", label: "OpenAPI", tint: "#6BA539" },
  swagger: { file: "swagger.svg", label: "Swagger", tint: "#85EA2D" },
  postgresql: { file: "postgresql.svg", label: "PostgreSQL", tint: "#336791" },
  mysql: { file: "mysql.svg", label: "MySQL", tint: "#00758F" },
  dynamodb: { file: "dynamodb.svg", label: "DynamoDB", tint: "#4053D6" },
  cassandra: { file: "cassandra.svg", label: "Cassandra", tint: "#1287B1" },
  mongodb: { file: "mongodb.svg", label: "MongoDB", tint: "#47A248" },
  aws: { file: "aws.svg", label: "AWS", tint: "#FF9900" },
  azure: { file: "azure.svg", label: "Azure", tint: "#0089D6" },
  googlecloud: { file: "googlecloud.svg", label: "Google Cloud", tint: "#4285F4" },
  docker: { file: "docker.svg", label: "Docker", tint: "#2496ED" },
  kubernetes: { file: "kubernetes.svg", label: "Kubernetes", tint: "#326CE5" },
  helm: { file: "helm.svg", label: "Helm", tint: "#0F1689" },
  githubactions: { file: "githubactions.svg", label: "GitHub Actions", tint: "#2088FF" },
  jenkins: { file: "jenkins.svg", label: "Jenkins", tint: "#D33833" },
  gitlab: { file: "gitlab.svg", label: "GitLab", tint: "#FC6D26" },
  terraform: { file: "terraform.svg", label: "Terraform", tint: "#7B42BC" },
  opentelemetry: { file: "opentelemetry.svg", label: "OpenTelemetry", tint: "#F5A800" },
  prometheus: { file: "prometheus.svg", label: "Prometheus", tint: "#E6522C" },
  grafana: { file: "grafana.svg", label: "Grafana", tint: "#F46800" },
  junit: { file: "junit.svg", label: "JUnit", tint: "#25A162" },
  k6: { file: "k6.svg", label: "k6", tint: "#7D64FF" },
  redis: { file: "redis.svg", label: "Redis", tint: "#DC382D" },
  angular: { file: "angular.svg", label: "Angular", tint: "#DD0031" },
  kotlin: { file: "kotlin.svg", label: "Kotlin", tint: "#7F52FF" },
  tailwindcss: { file: "tailwindcss.svg", label: "Tailwind CSS", tint: "#38BDF8" },
  github: { file: "github.svg", label: "GitHub", tint: "#181717" },
  sumologic: { file: "sumologic.svg", label: "Sumo Logic", tint: "#000099" },
  jmeter: { file: "jmeter.svg", label: "Apache JMeter", tint: "#D22128" },
};

const p = (d: string) => <path d={d} />;

/** Thin line icons for concepts that have no brand. 24×24 grid, 1.5 px non-scaling stroke. */
export const CONCEPT: Record<string, ReactNode> = {
  database: (
    <>
      <ellipse cx="12" cy="5.5" rx="7" ry="2.5" />
      {p("M5 5.5v13c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-13")}
      {p("M5 12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5")}
    </>
  ),
  api: (
    <>
      {p("M8 7l-5 5 5 5")}
      {p("M16 7l5 5-5 5")}
      {p("M13.5 5l-3 14")}
    </>
  ),
  versions: (
    <>
      <rect x="3" y="7" width="12" height="13" rx="2" />
      {p("M7 4h11a2 2 0 0 1 2 2v11")}
    </>
  ),
  contract: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      {p("M8.5 8h7M8.5 11.5h7M8.5 15h4")}
    </>
  ),
  lock: (
    <>
      <rect x="5" y="10.5" width="14" height="10" rx="2" />
      {p("M8 10.5V7.5a4 4 0 0 1 8 0v3")}
      {p("M12 14.5v2.5")}
    </>
  ),
  id: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <circle cx="9" cy="11" r="2.2" />
      {p("M5.8 16.3c.6-1.7 1.8-2.6 3.2-2.6s2.6.9 3.2 2.6M14.5 10h4M14.5 13.5h3")}
    </>
  ),
  key: (
    <>
      <circle cx="8" cy="12" r="4" />
      {p("M12 12h9M18 12v3M15.5 12v2")}
    </>
  ),
  nodes: (
    <>
      <rect x="3" y="3" width="6" height="6" rx="1.5" />
      <rect x="15" y="3" width="6" height="6" rx="1.5" />
      <rect x="9" y="15" width="6" height="6" rx="1.5" />
      {p("M9 6h6M6 9v3.5h6V15M18 9v3.5h-6")}
    </>
  ),
  network: (
    <>
      <circle cx="12" cy="5" r="2" />
      <circle cx="5" cy="18" r="2" />
      <circle cx="19" cy="18" r="2" />
      <circle cx="12" cy="13" r="2" />
      {p("M12 7v4M10.4 14.2 6.6 16.8M13.6 14.2l3.8 2.6M7 18h10")}
    </>
  ),
  bolt: p("M13 2.5 5 13.5h6l-1 8 8-11h-6z"),
  flow: (
    <>
      <circle cx="5" cy="6" r="2" />
      <circle cx="19" cy="12" r="2" />
      <circle cx="5" cy="18" r="2" />
      {p("M7 6h4a4 4 0 0 1 4 4v.5M7 18h4a4 4 0 0 0 4-4v-.5M15 12h2")}
    </>
  ),
  outbox: (
    <>
      {p("M4 13v6a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-6")}
      {p("M4 13h4.5l1.5 2.5h4l1.5-2.5H20")}
      {p("M12 3v8M8.5 6.5 12 3l3.5 3.5")}
    </>
  ),
  breaker: (
    <>
      {p("M2 12h6M16 12h6")}
      <circle cx="8" cy="12" r="1.3" />
      <circle cx="16" cy="12" r="1.3" />
      {p("M9 11.4 15 6.5")}
    </>
  ),
  shield: (
    <>
      {p("M12 3 4.5 6v5.5c0 4.6 3.2 8.2 7.5 9.5 4.3-1.3 7.5-4.9 7.5-9.5V6z")}
      {p("m8.8 12 2.3 2.3 4.3-4.6")}
    </>
  ),
  radar: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      {p("M12 12 18 6")}
      <circle cx="12" cy="12" r="0.8" />
    </>
  ),
  equal: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
      {p("M8 10h8M8 14h8")}
    </>
  ),
  one: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      {p("M10 9l2.5-2v10M10 17h5")}
    </>
  ),
  plusone: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      {p("M6.5 12h5M9 9.5v5M14 9.5l2-1.5v8")}
    </>
  ),
  retry: (
    <>
      {p("M20 12a8 8 0 1 1-2.4-5.7")}
      {p("M20 4v4.5h-4.5")}
    </>
  ),
  layers: (
    <>
      {p("M12 3 3 8l9 5 9-5z")}
      {p("m3 12.5 9 5 9-5M3 16.5l9 5 9-5")}
    </>
  ),
  index: (
    <>
      {p("M4 6h10M4 12h16M4 18h7")}
      <circle cx="18" cy="6" r="2" />
    </>
  ),
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      {p("m15.5 15.5 5 5")}
    </>
  ),
  cloud: p("M7 18.5h10.5a4 4 0 0 0 .6-8 6 6 0 0 0-11.6 1.3A3.4 3.4 0 0 0 7 18.5z"),
  pipeline: (
    <>
      <circle cx="4.5" cy="12" r="2" />
      <circle cx="12" cy="12" r="2" />
      <circle cx="19.5" cy="12" r="2" />
      {p("M6.5 12h3.5M14 12h3.5")}
    </>
  ),
  trace: (
    <>
      {p("M3 6h8M7 12h10M13 18h8")}
      {p("M3 4v4M7 10v4M13 16v4")}
    </>
  ),
  logs: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      {p("M7.5 8h2M11.5 8h5M7.5 12h2M11.5 12h5M7.5 16h2M11.5 16h3")}
    </>
  ),
  bell: (
    <>
      {p("M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 1.5h-15z")}
      {p("M10 20.5a2 2 0 0 0 4 0")}
    </>
  ),
  siren: (
    <>
      {p("M6 18v-6a6 6 0 0 1 12 0v6")}
      {p("M4 18h16v2.5H4zM12 2.5v2M4.2 5.2l1.4 1.4M19.8 5.2l-1.4 1.4")}
    </>
  ),
  check: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      {p("m8.2 12.2 2.6 2.6 5-5.4")}
    </>
  ),
  box: (
    <>
      {p("M12 3 4 7.5v9L12 21l8-4.5v-9z")}
      {p("M4 7.5 12 12l8-4.5M12 12v9")}
    </>
  ),
  flask: (
    <>
      {p("M9.5 3h5M10.5 3v6L5 18.5A1.7 1.7 0 0 0 6.5 21h11a1.7 1.7 0 0 0 1.5-2.5L13.5 9V3")}
      {p("M7.5 15h9")}
    </>
  ),
  gauge: (
    <>
      {p("M4 17a8 8 0 1 1 16 0")}
      {p("m12 17 4-5")}
      <circle cx="12" cy="17" r="1" />
    </>
  ),
  timer: (
    <>
      <circle cx="12" cy="13.5" r="7.5" />
      {p("M12 9.5v4l2.5 2M9.5 2.5h5")}
    </>
  ),
  uptime: (
    <>
      {p("M3 12h4l2-5 4 10 2-5h6")}
    </>
  ),
  scale: (
    <>
      {p("M4 20h16M6 20v-4M10 20v-7M14 20v-10M18 20V5")}
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      {p("m15.5 8.5-2 5-5 2 2-5z")}
    </>
  ),
  chat: p("M4 5.5h16v10H9l-5 4z"),
  bulb: (
    <>
      {p("M9 17.5h6M10 21h4")}
      {p("M12 3a6 6 0 0 0-3.5 10.9c.5.4.5.9.5 1.6v2h6v-2c0-.7 0-1.2.5-1.6A6 6 0 0 0 12 3z")}
    </>
  ),
  people: (
    <>
      <circle cx="9" cy="8" r="3" />
      <circle cx="17" cy="9.5" r="2.4" />
      {p("M3.5 19.5c.6-3 2.8-5 5.5-5s4.9 2 5.5 5M15 14.6c2.5-.4 4.8 1.3 5.5 4.4")}
    </>
  ),
};

export function isBrand(key: string): boolean {
  return key in BRAND;
}

type Props = {
  icon: string;
  size?: number;
  className?: string;
  style?: CSSProperties;
  /** decorative logos get alt="" */
  decorative?: boolean;
};

export default function TechLogo({ icon, size = 24, className = "", style, decorative = true }: Props) {
  const brand = BRAND[icon];
  if (brand) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={`/logos/${brand.file}`}
        alt={decorative ? "" : brand.label}
        width={size}
        height={size}
        loading="lazy"
        decoding="async"
        className={className}
        style={{ width: size, height: size, objectFit: "contain", ...style }}
      />
    );
  }
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={decorative ? true : undefined}
      role={decorative ? undefined : "img"}
      className={`ci ${className}`}
      style={style}
    >
      {CONCEPT[icon] ?? CONCEPT.check}
    </svg>
  );
}
