import { IconType } from "react-icons";
import { FaChartLine, FaRocket, FaServer } from "react-icons/fa";
import { MdLeaderboard } from "react-icons/md";

export type Highlight = {
  title: string;
  metric: string;
  description: string;
  icon: IconType;
};

export type Experience = {
  role: string;
  company: string;
  timeframe: string;
  bullets: string[];
};

export type ImpactStat = {
  label: string;
  value: string;
  sublabel: string;
};

export type ProjectHighlight = {
  name: string;
  focus: string;
  description: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  title: string;
};

export const highlights: Highlight[] = [
  {
    title: "Product-Led Growth",
    metric: "15% NRR lift",
    description:
      "Unlocked by rearchitecting analytics tiers, bundling activation levers, and sequencing value-focused launches.",
    icon: MdLeaderboard,
  },
  {
    title: "Revenue Influence",
    metric: "$2.3M ARR",
    description:
      "Enterprise revenue supported by prioritising retention-critical insights and monetising premium workflows.",
    icon: FaChartLine,
  },
  {
    title: "Reliability at Scale",
    metric: "99.97% uptime",
    description:
      "Maintained during event-pipeline migrations with automated regression suites and observability guardrails.",
    icon: FaServer,
  },
  {
    title: "Product Velocity",
    metric: "30% faster",
    description:
      "Cycle time reduction from instituting sprint rituals, delivery scorecards, and CI/CD automation.",
    icon: FaRocket,
  },
];

export const experience: Experience[] = [
  {
    role: "Product Manager",
    company: "Varahe Analytics Pvt. Ltd.",
    timeframe: "2023 – Present",
    bullets: [
      "Own the analytics SaaS roadmap from discovery through release planning with executive alignment across sales, CS, and engineering.",
      "Scaled discovery cadences with stakeholder councils, lifting activation scores by 18% quarter-over-quarter.",
      "Built KPI instrumentation and experimentation loops to validate feature bets and sunset low-signal work.",
    ],
  },
  {
    role: "Backend Team Lead",
    company: "DeepByte Technology",
    timeframe: "2022 – 2023",
    bullets: [
      "Architected Python services processing 4M+ monthly transactions with strict SLAs and automated rollback playbooks.",
      "Mentored a distributed team of 6 engineers through reviews, pairing, and engineering excellence guilds.",
      "Partnered with product and design to translate regulatory and scale requirements into iterative releases that improved retention by 9%.",
    ],
  },
  {
    role: "Associate Software Engineer",
    company: "Kaleyra",
    timeframe: "2021 – 2022",
    bullets: [
      "Shipped communication platform components powering omnichannel customer journeys with hardened SLAs.",
      "Optimised infrastructure spend by tuning queuing, caching, and observability levers, trimming latency by 24%.",
      "Introduced API governance standards to streamline integrations and shrink onboarding time for partners.",
    ],
  },
];

export const impactStats: ImpactStat[] = [
  {
    label: "ARR Influenced",
    value: "$4.2M",
    sublabel: "Enterprise revenue tied to analytics capabilities launched across two product lines.",
  },
  {
    label: "Experiments Shipped",
    value: "120+",
    sublabel: "A/B and multivariate tests evaluated to steer roadmap and packaging decisions.",
  },
  {
    label: "Cycle Time",
    value: "30% faster",
    sublabel: "Reduction in idea-to-production through automation and delivery discipline.",
  },
];

export const projectHighlights: ProjectHighlight[] = [
  {
    name: "Signal Insights Platform",
    focus: "Enterprise analytics SaaS",
    description:
      "Delivered go-to-market instrumentation, predictive scoring, and success playbooks that lifted enterprise renewals by 12%.",
  },
  {
    name: "Viyaat Consulting",
    focus: "Digital delivery platform",
    description:
      "Built a cloud-first workbench with intake automation and quality checks, increasing consulting throughput by 30%.",
  },
  {
    name: "Aatri Experiential Travel",
    focus: "Experience orchestration",
    description:
      "Redesigned trip operations with automated itineraries, SLA monitoring, and feedback loops to raise CSAT by 18 points.",
  },
  {
    name: "SphereTree Analytics",
    focus: "Insight storytelling",
    description:
      "Unified reporting models, interactive KPI canvases, and adoption playbooks for data-driven enterprises.",
  },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      "Vinay is the rare product leader who can translate ambiguous problem spaces into crisp, data-backed product strategy.",
    name: "Sahana Rao",
    title: "VP, Product Strategy",
  },
  {
    quote:
      "He creates clarity in complex stakeholder environments and rallies teams around measurable outcomes.",
    name: "Arjun Menon",
    title: "Head of Engineering, DeepByte",
  },
  {
    quote:
      "From roadmap to rollout, Vinay ensures every decision ladders up to user impact and business value.",
    name: "Priya Desai",
    title: "Product Marketing Lead",
  },
];
