import { IconType } from "react-icons";
import { FaChartLine, FaHandsHelping, FaLightbulb } from "react-icons/fa";
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
    title: "Growth Leadership",
    metric: "15%+",
    description:
      "Uplift in engagement after leading an analytics platform overhaul and roadmap reset.",
    icon: MdLeaderboard,
  },
  {
    title: "Revenue Impact",
    metric: "10%",
    description:
      "Incremental revenue captured by steering cross-functional delivery squads at Varahe Analytics.",
    icon: FaChartLine,
  },
  {
    title: "Civic Reach",
    metric: "12 states",
    description:
      "Grassroots political programs activated with data-informed playbooks and field technology.",
    icon: FaHandsHelping,
  },
  {
    title: "Product Velocity",
    metric: "30% faster",
    description:
      "Cycle time reduction from instituting sprint rituals, decision frameworks, and automation.",
    icon: FaLightbulb,
  },
];

export const experience: Experience[] = [
  {
    role: "Product Manager",
    company: "Varahe Analytics Pvt. Ltd.",
    timeframe: "2023 – Present",
    bullets: [
      "Own B2B analytics roadmap spanning research, prioritisation, and GTM alignment.",
      "Scaled discovery cadences with stakeholder councils, lifting activation scores by 18%.",
      "Built KPI instrumentation and experimentation loops to validate feature bets.",
    ],
  },
  {
    role: "Backend Team Lead",
    company: "DeepByte Technology",
    timeframe: "2022 – 2023",
    bullets: [
      "Architected Python services processing 4M+ monthly transactions with strict SLAs.",
      "Mentored a distributed team of 6 engineers across reviews, pairing, and guilds.",
      "Partnered with product to translate civic client briefs into reliable delivery increments.",
    ],
  },
  {
    role: "Associate Software Engineer",
    company: "Kaleyra",
    timeframe: "2021 – 2022",
    bullets: [
      "Shipped communication platform components powering omnichannel customer journeys.",
      "Optimised infrastructure spend by tuning queuing, caching, and observability levers.",
      "Introduced API governance standards to streamline integrations and support.",
    ],
  },
];

export const impactStats: ImpactStat[] = [
  {
    label: "Campaigns Accelerated",
    value: "35",
    sublabel: "Multi-region civic engagements launched end-to-end.",
  },
  {
    label: "Teams Enabled",
    value: "9",
    sublabel: "Cross-functional pods guided through agile rituals and OKR resets.",
  },
  {
    label: "Hours Saved",
    value: "1.4k",
    sublabel: "Annualised ops efficiency from automation and workflow redesigns.",
  },
];

export const projectHighlights: ProjectHighlight[] = [
  {
    name: "My Vote Labs",
    focus: "Data-rich civic platform",
    description:
      "Campaign intelligence stack for political programmes with voter micro-segmentation, field ops automation, and analytics dashboards.",
  },
  {
    name: "Viyaat Consulting",
    focus: "Digital transformation",
    description:
      "Cloud-first knowledge and client delivery ecosystem delivering a 30% lift in consulting throughput and client satisfaction.",
  },
  {
    name: "Aatri Experiential Travel",
    focus: "Experience orchestration",
    description:
      "Operational revamp with automated itineraries, service SLAs, and customer insight loops.",
  },
  {
    name: "SphereTree Analytics",
    focus: "Insight storytelling",
    description:
      "Unified reporting models, interactive KPI canvases, and adoption playbooks for data-driven organisations.",
  },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      "Vinay is the rare product leader who can translate grassroots realities into crisp, data-backed product strategy.",
    name: "Sahana Rao",
    title: "Director, Campaign Operations",
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
