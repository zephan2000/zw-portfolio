// ── Types ──────────────────────────────────────────────

export type NavItem = { label: string; href: string };

export type MetadataItem = { label: string; value: string };

export type CalloutData = {
  quote: string;
  attribution: string;
  variant: "client" | "self";
};

export type PivotData = {
  before: { label: string; description: string };
  after: { label: string; description: string };
};

export type MetricData = {
  value: string;
  label: string;
};

export type BeforeAfterStep = {
  id: number;
  before: string;
  after: string | null;
  badge: string | null;
  afterBadge?: string | null;
  transition: "keep" | "elim" | "mod" | "auto";
};

export type BeforeAfterStat = {
  label: string;
  before: string;
  after: string;
};

export type JourneyNode = {
  id: string;
  abbr: string;
  label: string;
  title: string;
  description: string;
  note?: string;
  hasBadge?: boolean;
};

export type JourneyTrack = {
  label: string;
  sublabel: string;
  variant: "setup" | "post";
  nodes: JourneyNode[];
};

// ── Navigation ─────────────────────────────────────────

export const NAV_ITEMS: NavItem[] = [
  { label: "Introduction", href: "#hero" },
  { label: "Walkthrough", href: "#video" },
  { label: "Problem", href: "#problem" },
  { label: "Diagnosis", href: "#diagnosis-1" },
  { label: "Technical gap", href: "#diagnosis-2a" },
  { label: "Operational gap", href: "#diagnosis-2b" },
  { label: "Build", href: "#build" },
  { label: "Pivots", href: "#pivots" },
  { label: "Impact", href: "#impact" },
  { label: "Gaps", href: "#gaps" },
  { label: "Reflection", href: "#reflection" },
];

// ── Zone 1 — Hero ──────────────────────────────────────

export const HERO = {
  title: "Notion Workspace Agent",
  subheading:
    "How we bought back 2 hours per week for a solo social media manager",
  metadata: [
    {
      label: "Client type",
      value: "Solo social media manager \u00b7 5\u20137 active client retainers",
    },
    {
      label: "Role",
      value: "End-to-end \u2014 discovery, solution design, technical build",
    },
    {
      label: "Timeline",
      value: "4\u20138 weeks, first call to working product",
    },
    {
      label: "Status",
      value: "Client reviewed, approved. Onboarding underway.",
    },
  ] as MetadataItem[],
  stack: [
    "Notion API Integrations",
    "Agent Skills",
    "n8n",
    "Supabase",
    "Facebook Graph API",
    "Custom OAuth Handlers",
    "Claude MCP",
    
  ],
};

// ── Zone 2 — Video ─────────────────────────────────────

export const VIDEO_CAPTION =
  "3\u20134 min walkthrough \u2014 problem, diagnosis, pivot, outcome";

// ── Zone 3 — Problem ───────────────────────────────────

export const PROBLEM_PROSE = [
  "Alika manages social media for five to seven clients at any given time. Each client gets a content calendar in Notion \u2014 it\u2019s where she drafts captions, tracks approvals, and stores visual assets. Notion is the single source of truth.",
  "The problem isn\u2019t the planning. The planning works. The problem is that once a post is ready, Alika has to leave Notion entirely. She opens Instagram Creator Studio, re-enters the caption, uploads the image, sets the schedule time \u2014 all manually. For every single post.",
  "Multiply that by five clients, four posts per week each, and you get a person spending two hours a week on copy-paste logistics. Not strategy. Not creative. Logistics.",
];

export const PROBLEM_CALLOUT: CalloutData = {
  quote:
    "It\u2019s like double work \u2014 I plan it in Notion, then I still have to go into Instagram and do the whole thing again.",
  attribution: "Alika, Discovery Call 1",
  variant: "client",
};

export const BEFORE_AFTER_STEPS: BeforeAfterStep[] = [
  { id: 1, before: "Draft post in Notion", after: null, badge: "Notion", transition: "keep" },
  { id: 2, before: "Screenshot caption for WhatsApp", after: null, badge: null, transition: "elim" },
  { id: 3, before: "Message client on WhatsApp \u00b7 wait for approval", after: "Get approval \u00b7 mark \u201CReady to Post\u201D", badge: "WhatsApp", afterBadge: "WhatsApp", transition: "mod" },
  { id: 4, before: "Re-open Notion", after: null, badge: "Notion", transition: "elim" },
  { id: 5, before: "Copy caption to clipboard", after: null, badge: null, transition: "elim" },
  { id: 6, before: "Open Instagram \u00b7 find correct account", after: null, badge: "Instagram", transition: "elim" },
  { id: 7, before: "Upload media \u00b7 paste caption \u00b7 set time \u00b7 post", after: "Instagram schedules \u00b7 Telegram confirms", badge: "Instagram", afterBadge: "Automated", transition: "auto" },
];

export const BEFORE_AFTER_STATS: BeforeAfterStat[] = [
  { label: "Steps", before: "7", after: "3" },
  { label: "App switches", before: "4", after: "1" },
  { label: "Time per post", before: "~15 min", after: "0 min" },
];

// ── Zone 4 — Diagnosis 1 ──────────────────────────────

export const DIAGNOSIS_1_PROSE = [
  "The first instinct was to look at existing scheduling tools \u2014 Buffer, Later, Hootsuite. They all solve the scheduling problem, but they all introduce a new interface. A new place for content to live.",
  "Alika had already tried Later. The problem wasn\u2019t feature gaps \u2014 it was that the tool sat outside her workflow. She\u2019d have to export from Notion, import into Later, and maintain two sources of truth. The friction wasn\u2019t reduced. It was relocated.",
  "The real requirement wasn\u2019t \u2018a scheduling tool.\u2019 It was \u2018scheduling that lives inside Notion.\u2019 And none of the existing tools could do that.",
];

export const DIAGNOSIS_1_CALLOUT: CalloutData = {
  quote:
    "I don\u2019t want my client to have to download another app, or go to another website.",
  attribution: "Alika, Discovery Call 1",
  variant: "client",
};

// ── Zone 5A — Technical diagnosis ──────────────────────

export const DIAGNOSIS_2A_PROSE = [
  "Notion\u2019s API is read-write for databases, pages, and blocks. You can query, create, update. But it has no push mechanism \u2014 no webhooks, no event subscriptions, no way to say \u2018when this status changes, do something.\u2019",
  "This is the architectural constraint that shaped the entire project. You can pull from Notion. You can\u2019t be pushed to by Notion. The scheduling pipeline needed a bridge between Notion\u2019s polling model and Instagram\u2019s push-based API.",
];

export const DIAGNOSIS_2A_CALLOUT: CalloutData = {
  quote:
    "Wait \u2014 so the Notion isn\u2019t for storage. They actually see this? It\u2019s the deliverable?",
  attribution: "Zephan, Discovery Call 1",
  variant: "self",
};

// ── Zone 5B — Operational diagnosis ────────────────────

export const DIAGNOSIS_2B_PROSE = [
  "Beyond the technical gap, there was an operational one. Alika\u2019s process for each client wasn\u2019t documented \u2014 it lived in her head. Which hashtag sets for which client. Which accounts get Reels vs. carousels. Which clients need approval before publishing.",
  "You can\u2019t automate a process that isn\u2019t externalized. Before building any pipeline, I had to help Alika articulate her per-client rules in a structured format that a system could consume.",
  "This is where the Notion workspace design became critical. Each client database wasn\u2019t just a content calendar \u2014 it was a rule engine. Properties for post type, hashtag groups, approval status, publish time. The workspace was the specification.",
];

// ── Zone 6 — Build ─────────────────────────────────────

export const BUILD_INTRO_PROSE =
  "The system has three structural components, each solving a specific part of the constraint chain. Plus a state management layer that emerged mid-build when complexity outgrew the original architecture.";

export const BUILD_SUBSECTIONS = [
  {
    heading: "The workspace generator",
    paragraphs: [
      "A templating system that creates per-client Notion workspaces from a configuration object. Databases, properties, views, and template pages \u2014 all generated programmatically via the Notion API. Onboarding a new client takes minutes, not hours.",
    ],
  },
  {
    heading: "The scheduling pipeline",
    paragraphs: [
      "An n8n workflow that polls Notion databases for posts with \u2018Ready to publish\u2019 status, fetches the associated image, constructs the Instagram API payload, and publishes. Runs on a configurable schedule. Includes retry logic and error notifications via Telegram.",
    ],
  },
  {
    heading: "The image selection layer",
    paragraphs: [
      "A Notion-native interface for selecting cover images. Rather than uploading to a separate tool, Alika attaches images directly in Notion. The pipeline extracts the first image from the page content and uses it as the post\u2019s media.",
    ],
  },
  {
    heading: "The state management system",
    paragraphs: [
      "This component wasn\u2019t in the original design. It emerged when the workspace generator and scheduling pipeline needed to share state \u2014 which clients are active, which posts have been published, which failed and need retry.",
      "Initially, state lived in Notion properties. But Notion\u2019s API rate limits and eventual consistency model made this fragile. A Supabase table now serves as the state layer \u2014 synced with Notion, but authoritative for the pipeline.",
      "The state block protocol gives the AI assistant a structured way to read and write system state. Instead of parsing natural language, it reads a JSON block at the top of each phase file. Deterministic, auditable, version-controlled.",
      "This was the most significant architectural pivot in the project. It moved the system from \u2018scripts that call APIs\u2019 to \u2018a stateful orchestration layer with clear boundaries.\u2019",
    ],
  },
];

export const JOURNEY_TRACKS: JourneyTrack[] = [
  {
    label: "Setup",
    sublabel: "runs once",
    variant: "setup",
    nodes: [
      {
        id: "discovery",
        abbr: "D",
        label: "Discovery",
        title: "Discovery \u2014 brand intake & service mapping",
        description:
          "Claude asks structured diagnostic questions covering brand aesthetic, service offering, target platforms, and content frequency. The answers shape the workspace schema and the image search brief for Phase 2. Key variables \u2014 client name and Google Drive link \u2014 are carried as critical state through all subsequent phases.",
      },
      {
        id: "oauth",
        abbr: "IG",
        label: "Instagram OAuth",
        title: "Instagram OAuth \u2014 token storage & verification",
        description:
          "Claude calls the Vercel backend to initiate OAuth, receiving a workspace_id and a Facebook OAuth URL. The client authorises in their own browser \u2014 Claude never handles credentials directly. Claude polls the verify endpoint until confirmed. The workspace_id is the deduplication key across all backend systems and is never fabricated or guessed.",
      },
      {
        id: "cover-studio",
        abbr: "CS",
        label: "Cover Studio",
        title: "Cover Studio \u2014 AI image search & preview",
        description:
          "An AI agent queries Unsplash, Pexels, and Pixabay APIs for CDN-ready URLs, collecting at least 15 unique images. A Vercel-hosted preview app lets Alika review, reposition (focal point), and select a cover image for each workspace page before build begins. This replaced a fragile web-scraping approach that produced broken links and wasted tokens.",
      },
      {
        id: "workspace-build",
        abbr: "WB",
        label: "Workspace Build",
        title: "Workspace Build \u2014 phased construction with state management",
        description:
          "The most variable-heavy phase. Claude creates the root page, Dashboard database, Feed Plan page, Months DB, and sub-pages in strict sequence. The Posts database is exclusively created by n8n via an MCP call \u2014 never by Notion tools directly \u2014 because the n8n workflow enforces the correct schema server-side. A build ledger tracks each sub-step.",
        note: "State management: the original monolithic instruction document degraded in production \u2014 by Phase 3, the context window was exhausted and the agent hallucinated Notion IDs. Solution: a router + lazy-loaded phase files so each phase loads only when needed, keeping the context budget free for live API calls. State blocks written before every transition make failures resumable, not terminal.",
        hasBadge: true,
      },
      {
        id: "handoff",
        abbr: "HO",
        label: "Handoff",
        title: "Verification & handoff",
        description:
          "A verification matrix confirms: Posts DB exists and is linked to the workspace, n8n scheduling webhook responds correctly, Telegram bot is connected and receiving, and at least one test post has been queued. Claude generates a client summary and confirms all systems are live before closing the session.",
      },
    ],
  },
  {
    label: "Per post",
    sublabel: "ongoing",
    variant: "post",
    nodes: [
      {
        id: "draft",
        abbr: "01",
        label: "Draft in Notion",
        title: "Draft \u2014 content creation stays in Notion",
        description:
          "Alika creates a new entry in the Posts database: caption, post type (Image / Carousel / Reel), a Google Drive media link, and a scheduled date and time. Everything stays inside Notion \u2014 she never opens Instagram at any point in this workflow.",
      },
      {
        id: "status-change",
        abbr: "02",
        label: "Status change",
        title: "Status change \u2014 the only trigger",
        description:
          "When Alika marks a post as \u2018Ready to Post,\u2019 the n8n workflow is triggered via a Notion webhook. This is the only action required from Alika after drafting. The status property is the sole control signal for the entire automation pipeline.",
      },
      {
        id: "n8n-webhook",
        abbr: "03",
        label: "n8n webhook",
        title: "n8n webhook \u2014 media retrieval & credential lookup",
        description:
          "n8n detects the status change, retrieves the full post record from Notion, and downloads the media from the Google Drive link in the record. Instagram credentials are looked up via workspace_id, which links the Posts database to stored OAuth tokens in Supabase \u2014 no credentials are stored in Notion itself.",
      },
      {
        id: "instagram-api",
        abbr: "04",
        label: "Instagram API",
        title: "Instagram Creator API \u2014 scheduled posting",
        description:
          "n8n calls the Instagram Creator API via the Facebook Graph API to schedule the post at the exact time specified in Notion. For carousels it handles multi-media upload in the correct sequence; for reels it sets the video container properties. The post_id returned by Instagram is written back to the Notion record.",
      },
      {
        id: "telegram",
        abbr: "05",
        label: "Telegram",
        title: "Telegram \u2014 confirmation & error alerts",
        description:
          "On successful scheduling, n8n sends Alika a Telegram message confirming the post type, scheduled time, and a link to the Notion record. If any step fails, Telegram receives an error notification with the failure reason \u2014 so Alika is never dependent on checking Instagram or Notion to know something went wrong.",
      },
    ],
  },
];

// ── Zone 7 — Pivots ───────────────────────────────────

export const PIVOTS: PivotData[] = [
  {
    before: {
      label: "Cloudflare Workers",
      description:
        "Initial plan was to use Cloudflare Workers for the webhook handler and API bridge. Fast, cheap, edge-deployed.",
    },
    after: {
      label: "n8n + Notion API bridge",
      description:
        "Cloudflare Workers couldn\u2019t handle the multi-step orchestration needed. n8n gave us visual debugging, retry logic, and a GUI Alika could eventually inspect.",
    },
  },
  {
    before: {
      label: "Monolithic SKILL.md",
      description:
        "One large instruction file for the AI assistant \u2014 all phases, all context, all rules in a single document.",
    },
    after: {
      label: "Router + lazy-loaded phase files + state block protocol",
      description:
        "The monolith caused context drift. A router pattern with phase-specific files and a state block protocol kept the AI focused and auditable.",
    },
  },
];

// ── Zone 8 — Impact ────────────────────────────────────

export const METRICS: MetricData[] = [
  { value: "2hr \u2192 20min", label: "Weekly scheduling time" },
  { value: "15 min", label: "Eliminated per post" },
  { value: "5\u20137 clients", label: "One workflow" },
];

export const IMPACT_PROSE = [
  "The numbers tell part of the story. Weekly scheduling dropped from two hours to twenty minutes. Per-post overhead dropped from fifteen minutes of app-switching to near zero. The same workflow handles all five to seven clients.",
  "But the structural outcome matters more than the time savings. Alika now has a system that scales with her business. Adding a new client means running the workspace generator and configuring a few properties \u2014 not rebuilding a workflow from scratch.",
  "The system also created a path toward delegation. Because the process is externalized in Notion, Alika could hand content scheduling to an assistant without explaining her mental model. The workspace is the documentation.",
];

export const IMPACT_CALLOUT: CalloutData = {
  quote:
    "If I can streamline my processes, I don\u2019t think I will need a lot of headcount.",
  attribution: "Alika, Solutioning Call",
  variant: "client",
};

// ── Zone 9 — Gaps ──────────────────────────────────────

export const GAPS_PROSE = [
  "The system doesn\u2019t handle multi-image carousel posts yet. Instagram\u2019s API supports them, but the Notion-side interface for ordering multiple images needs design work.",
  "Reels aren\u2019t supported. The Instagram API for Reels has different requirements \u2014 video processing, cover frame selection \u2014 that would need a separate pipeline branch.",
  "Analytics aren\u2019t pulled back into Notion. Post performance data stays in Instagram Insights. Closing that loop would require a reverse sync pipeline.",
  "The AI assistant\u2019s state protocol is functional but verbose. A future iteration would compress the state block format and add validation.",
];

// ── Zone 10 — Reflection ───────────────────────────────

export const REFLECTION_PROSE = [
  "If I rebuilt this project, I\u2019d spend even more time in discovery. The two calls I had with Alika were dense and productive, but I made assumptions about her image workflow that required a pivot mid-build. A third call focused specifically on the visual asset pipeline would have saved a week.",
  "Discovery isn\u2019t a phase you complete and leave. It\u2019s a mode of thinking you maintain throughout the build. Every technical decision is a hypothesis about the user\u2019s workflow \u2014 and hypotheses need validation, not just implementation.",
];
