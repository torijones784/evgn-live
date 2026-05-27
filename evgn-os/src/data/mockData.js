export const CLIENTS = ['My Neighbors', 'George Rings', 'Foxy Cakes']

export const mondayBriefs = {
  'My Neighbors': {
    company: 'My Neighbors',
    weekOf: 'Week of May 27, 2026',
    greeting: 'The team has been heads-down this week. Here\'s where things stand.',
    done: [
      'Q2 campaign performance report delivered',
      'Instagram content calendar approved through June',
      'Vendor negotiation on fulfillment pricing resolved',
      'Paid media budget reallocation complete',
    ],
    inMotion: [
      { item: 'Google Ads strategy refresh', owner: 'Megan', dept: 'Marketing', status: 'In review' },
      { item: 'Q3 operational SOP update', owner: 'Alex', dept: 'Operations', status: 'Drafting' },
      { item: 'Influencer partnership evaluation', owner: 'Carly', dept: 'Marketing', status: 'Awaiting your input' },
    ],
    priority: {
      headline: 'Review the Q3 campaign brief and mark your feedback by Thursday.',
      body: 'Megan has drafted the full strategy — your perspective on the two audience segments is the only missing piece before we go to production.',
      owner: 'Megan · Marketing',
    },
  },
  'George Rings': {
    company: 'George Rings',
    weekOf: 'Week of May 27, 2026',
    greeting: 'A productive week of strategic work behind the scenes. Here\'s your update.',
    done: [
      '2026 strategic planning session notes distributed',
      'Brand positioning research deck completed',
      'Corporate gifting segment analysis delivered',
      'Email list segmentation update finalized',
    ],
    inMotion: [
      { item: '2026 strategic planning session', owner: 'Carly', dept: 'Operations', status: 'In review' },
      { item: 'Brand positioning refresh', owner: 'Megan', dept: 'Marketing', status: 'Drafting' },
      { item: 'June email campaign build', owner: 'Megan', dept: 'Marketing', status: 'Awaiting your input' },
    ],
    priority: {
      headline: 'Approve the subject line test for your June email campaign by Friday.',
      body: 'Megan has prepared three subject line variants based on your audience segments. Your selection determines which goes to the full list.',
      owner: 'Megan · Marketing',
    },
  },
  'Foxy Cakes': {
    company: 'Foxy Cakes',
    weekOf: 'Week of May 27, 2026',
    greeting: 'Strong execution week — here\'s a clear picture of where things are.',
    done: [
      'Q3 Instagram content calendar drafted and submitted',
      'Wholesale outreach list compiled (47 contacts)',
      'Photography brief sent to creative partner',
      'June packaging copy finalized',
    ],
    inMotion: [
      { item: 'Instagram content calendar Q3', owner: 'Megan', dept: 'Marketing', status: 'In review' },
      { item: 'Wholesale outreach tracker', owner: 'Alex', dept: 'Operations', status: 'Blocked' },
      { item: 'Paid social creative refresh', owner: 'Megan', dept: 'Marketing', status: 'Drafting' },
    ],
    priority: {
      headline: 'Unblock the wholesale outreach — your distributor contact is needed.',
      body: 'Alex has the tracker ready but needs your direct contact at Pacific Northwest Specialty Foods to proceed. This is holding up 14 outreach threads.',
      owner: 'Alex · Operations',
    },
  },
}

export const pipelineLeads = [
  { id: 1, company: 'My Neighbors', contact: 'Jess Harmon', stage: 'Execution', status: 'Won', source: 'Referral', daysInStage: 12 },
  { id: 2, company: 'George Rings', contact: 'Claire Nguyen', stage: 'Execution', status: 'Won', source: 'LinkedIn', daysInStage: 8 },
  { id: 3, company: 'Foxy Cakes', contact: 'Maya Ross', stage: 'Execution', status: 'Won', source: 'Instagram', daysInStage: 3 },
  { id: 4, company: 'Bloom & Co', contact: 'Rachel Kim', stage: 'Discovery', status: 'Open', source: 'Networking Event', daysInStage: 2 },
  { id: 5, company: 'The Salt House', contact: 'Priya Mehta', stage: 'Quote', status: 'Open', source: 'Referral', daysInStage: 6 },
  { id: 6, company: 'Studio Vane', contact: 'Lauren Ellis', stage: 'Intake', status: 'Open', source: 'Instagram', daysInStage: 1 },
  { id: 7, company: 'Maison Briar', contact: 'Sofia Delaney', stage: 'Contract', status: 'Open', source: 'Cold Outreach', daysInStage: 4 },
  { id: 8, company: 'Wren & Wild', contact: 'Dana Cole', stage: 'Lost', status: 'Lost', source: 'Website', daysInStage: 14 },
  { id: 9, company: 'Poppy Lane', contact: 'Asha Thomas', stage: 'Onboarding', status: 'Won', source: 'Referral', daysInStage: 2 },
]

export const PIPELINE_STAGES = ['Intake', 'Discovery', 'Quote', 'Contract', 'Onboarding', 'Execution', 'Renewal']

export const emailTemplates = {
  Intake: {
    subject: 'Thank You for Reaching Out — Let\'s Talk Strategy',
    body: `Thank you for reaching out to EVGN. We'd like to invite you to a complimentary Discovery Call — a dedicated space to understand where your brand is today, where you're headed, and how EVGN's expertise can accelerate that path.

Reserve your time here: [link to calendar]

Please complete the intake questions upon booking so we can arrive fully prepared.`,
  },
  Discovery: {
    subject: 'What to Expect Next — EVGN',
    body: `Thank you for taking the time to connect with us today. It was great to learn more about [Brand Name] and where you're headed.

Here's what to expect next: We'll review everything discussed and begin outlining a tailored scope of work. You'll receive a formal proposal within [X business days].`,
  },
  Quote: {
    subject: 'Your Custom Proposal from EVGN',
    body: `Please find attached your custom proposal from EVGN, built around the goals and priorities we discussed.

We'd like to schedule a call to walk you through it together. You can book a time here: [calendar link]`,
  },
  'Quote Follow-up': {
    subject: 'Following Up — EVGN Proposal',
    body: `Wanted to follow up on the proposal we sent over on [date]. We're holding space for [Brand Name] and want to make sure we can get started on your timeline.`,
  },
  Onboarding: {
    subject: 'Welcome to EVGN — Your Engagement is Active',
    body: `Payment received — thank you. Your engagement with EVGN is now active.

Attached is your Client Onboarding Document, which covers everything you need to know as we get started. We're excited to be in this with you.`,
  },
  Contract: {
    subject: 'Your EVGN Agreement — Ready for Signature',
    body: `Attached you'll find the EVGN engagement agreement for your review. We've structured it around the scope we discussed.

Please review at your convenience and sign via DocuSign when ready. Don't hesitate to reach out with any questions before you do.`,
  },
}

export const journeyChecklist = [
  { id: 1, stage: 'Intake', item: 'Initial contact — email/share calendar link', docusign: null },
  { id: 2, stage: 'Intake', item: 'Pre-Qualification: Collect client info and background / intake form', docusign: null },
  { id: 3, stage: 'Discovery', item: 'Schedule initial discovery call', docusign: null },
  { id: 4, stage: 'Discovery', item: 'Initial "Discovery" Call (confirm scope, schedule next call)', docusign: null },
  { id: 5, stage: 'Quote', item: 'Draft Proposal / Strategy Sprint', docusign: null },
  { id: 6, stage: 'Quote', item: 'Follow-up if no reply in 3 days', docusign: null },
  { id: 7, stage: 'Quote', item: 'Share proposal with client; schedule estimate call', docusign: null },
  { id: 8, stage: 'Quote', item: 'Quote review and revision + send updated quote', docusign: null },
  { id: 9, stage: 'Contract', item: 'Generate & Send Legal Agreement', docusign: null },
  { id: 10, stage: 'Contract', item: 'Contract review and Signature', docusign: 'signature' },
  { id: 11, stage: 'Onboarding', item: 'Invoice First Payment / Deposit', docusign: null },
  { id: 12, stage: 'Onboarding', item: 'Shared Google Drive Folder Set-up', docusign: null },
  { id: 13, stage: 'Onboarding', item: 'Create Client Invoice Schedule', docusign: null },
  { id: 14, stage: 'Onboarding', item: 'Send Client Onboarding doc', docusign: null },
  { id: 15, stage: 'Onboarding', item: 'Kickoff Call Scheduled', docusign: null },
  { id: 16, stage: 'Execution', item: 'Request Brand Guide & Access', docusign: null },
  { id: 17, stage: 'Execution', item: 'Launch First Sprint Execution', docusign: null },
  { id: 18, stage: 'Execution', item: '30-Day Performance Review', docusign: null },
  { id: 19, stage: 'Renewal', item: 'Client Testimonial', docusign: null },
  { id: 20, stage: 'Renewal', item: 'Negotiate Contract Renewal', docusign: null },
]

const stageOrder = { Intake: 1, Discovery: 2, Quote: 3, Contract: 4, Onboarding: 5, Execution: 6, Renewal: 7 }

export function getCheckedItems(lead) {
  const leadStageOrder = stageOrder[lead.stage] || 0
  return journeyChecklist.map(item => {
    const itemStageOrder = stageOrder[item.stage] || 0
    const isChecked = itemStageOrder < leadStageOrder || (itemStageOrder === leadStageOrder && lead.status === 'Won')
    let docusignStatus = null
    if (item.docusign === 'signature') {
      if (['My Neighbors', 'George Rings', 'Foxy Cakes', 'Poppy Lane'].includes(lead.company)) {
        docusignStatus = 'Signed'
      } else if (lead.stage === 'Contract') {
        docusignStatus = 'Awaiting Signature'
      } else if (itemStageOrder < leadStageOrder) {
        docusignStatus = 'Signed'
      }
    }
    return { ...item, checked: isChecked, docusignStatus }
  })
}

export const knowledgeBase = {
  transcript: { name: 'Strategy Call', date: 'May 14, 2026' },
  answered: 3,
  total: 12,
  questions: [
    {
      id: 1,
      section: 'The Business as It Exists Today',
      question: 'Where does revenue truly come from today? (By channel, product type, client type)',
      answered: true,
      excerpt: '"We\'re primarily product-driven — about 70% comes from our retail partnerships, the remaining 30% from direct. The custom work is beautiful but unpredictable month to month."',
    },
    {
      id: 2,
      section: 'The Business as It Exists Today',
      question: 'Which product offerings feel most reliable? Which feel fragile or unpredictable?',
      answered: false,
      excerpt: null,
    },
    {
      id: 3,
      section: 'The Business as It Exists Today',
      question: 'Where is revenue concentrated in ways that may not be obvious day-to-day?',
      answered: false,
      excerpt: null,
    },
    {
      id: 4,
      section: 'Growth Drivers and Tradeoffs',
      question: 'What growth vectors are working — and which are deprioritized?',
      answered: false,
      excerpt: null,
    },
    {
      id: 5,
      section: 'Growth Drivers and Tradeoffs',
      question: 'How are you segmenting and nurturing customers currently?',
      answered: false,
      excerpt: null,
    },
    {
      id: 6,
      section: 'Constraints and Leverage',
      question: 'What is the primary constraint today: demand, manufacturing capacity, capital, or leadership bandwidth?',
      answered: true,
      excerpt: '"Honestly it\'s my bandwidth. The team is lean and I\'m still in too many decisions."',
    },
    {
      id: 7,
      section: 'Constraints and Leverage',
      question: 'Which parts of the business generate the highest return on attention?',
      answered: false,
      excerpt: null,
    },
    {
      id: 8,
      section: '2025 Learnings',
      question: 'What were you hoping to prove or learn in 2025?',
      answered: false,
      excerpt: null,
    },
    {
      id: 9,
      section: '2025 Learnings',
      question: 'What surprised you — positively or negatively?',
      answered: true,
      excerpt: '"We didn\'t expect the corporate gifting segment to perform the way it did. That\'s been the biggest upside."',
    },
    {
      id: 10,
      section: '2025 Learnings',
      question: 'Which assumptions about clients, pricing, throughput, or retail changed this year?',
      answered: false,
      excerpt: null,
    },
    {
      id: 11,
      section: 'Looking Ahead',
      question: 'Which 2026 decisions would be hardest to reverse?',
      answered: false,
      excerpt: null,
    },
    {
      id: 12,
      section: 'Looking Ahead',
      question: 'If 2026 is successful, what capabilities will the business have that it does not have today?',
      answered: false,
      excerpt: null,
    },
  ],
}

export const operationsAll = [
  { id: 1, client: 'My Neighbors', workstream: 'Q3 Marketing Campaign Build', owner: 'Megan', status: 'On Track', due: 'Jun 6' },
  { id: 2, client: 'My Neighbors', workstream: 'Fulfillment SOP Update', owner: 'Alex', status: 'Needs Attention', due: 'May 30' },
  { id: 3, client: 'George Rings', workstream: '2026 Strategic Planning Session', owner: 'Carly', status: 'On Track', due: 'Jun 13' },
  { id: 4, client: 'George Rings', workstream: 'Brand Positioning Refresh', owner: 'Megan', status: 'On Track', due: 'Jun 20' },
  { id: 5, client: 'Foxy Cakes', workstream: 'Instagram Content Calendar Q3', owner: 'Megan', status: 'On Track', due: 'Jun 3' },
  { id: 6, client: 'Foxy Cakes', workstream: 'Wholesale Outreach Tracker', owner: 'Alex', status: 'Blocked', due: 'May 28' },
]

export const meetingCadence = [
  { client: 'My Neighbors', type: 'Monthly Strategy Call', date: 'Jun 3, 2026' },
  { client: 'George Rings', type: 'Bi-weekly Check-in', date: 'May 29, 2026' },
  { client: 'Foxy Cakes', type: 'Weekly Sprint', date: 'May 28, 2026' },
]

export const operationsClient = {
  'My Neighbors': {
    sprintLabel: 'Sprint 4 — May–June 2026',
    workstreams: [
      {
        name: 'Q3 Marketing Campaign Build',
        owner: 'Megan',
        status: 'In Review',
        due: 'Jun 6',
        update: 'The campaign strategy is drafted and in internal review. We\'ll share the brief for your feedback by Thursday.',
        progress: 0.6,
      },
      {
        name: 'Fulfillment SOP Update',
        owner: 'Alex',
        status: 'Needs Attention',
        due: 'May 30',
        update: 'We\'ve identified the bottleneck in your current process. Needs attention — we\'re waiting on your vendor contact to confirm the new terms.',
        progress: 0.35,
      },
    ],
    actionItems: [
      'Review Q3 campaign brief and share feedback by Thursday, May 29',
      'Confirm fulfillment vendor contact: forward the thread with Pacific Supply',
    ],
  },
  'George Rings': {
    sprintLabel: 'Sprint 3 — May–June 2026',
    workstreams: [
      {
        name: '2026 Strategic Planning Session',
        owner: 'Carly',
        status: 'In Review',
        due: 'Jun 13',
        update: 'The session notes have been synthesized and the strategic framework is being finalized. You\'ll receive the full document next week.',
        progress: 0.75,
      },
      {
        name: 'Brand Positioning Refresh',
        owner: 'Megan',
        status: 'In Review',
        due: 'Jun 20',
        update: 'Competitive analysis is complete. Megan is now drafting the positioning statements for your review.',
        progress: 0.45,
      },
    ],
    actionItems: [
      'Approve subject line variants for June email campaign by Friday',
      'Share your top three retail partner priorities for Q3 positioning work',
    ],
  },
  'Foxy Cakes': {
    sprintLabel: 'Sprint 5 — May–June 2026',
    workstreams: [
      {
        name: 'Instagram Content Calendar Q3',
        owner: 'Megan',
        status: 'In Review',
        due: 'Jun 3',
        update: 'The full Q3 content calendar is drafted and in review. Expect it in your inbox for approval by end of week.',
        progress: 0.8,
      },
      {
        name: 'Wholesale Outreach Tracker',
        owner: 'Alex',
        status: 'Blocked',
        due: 'May 28',
        update: 'The outreach tracker is built and ready — we\'re waiting on your distributor contact before we can begin.',
        progress: 0.2,
      },
    ],
    actionItems: [
      'Send Pacific Northwest Specialty Foods contact to Alex today',
      'Confirm photography direction: seasonal or core product focus for Q3',
    ],
  },
}

export const marketingAlerts = [
  {
    client: 'Foxy Cakes',
    metric: 'Paid Social ROAS',
    message: 'Paid Social ROAS dropped 34% week-over-week.',
    action: 'Review media mix before next budget cycle.',
    date: 'May 26',
  },
  {
    client: 'George Rings',
    metric: 'Email Open Rate',
    message: 'Email open rate down to 18% (benchmark: 28%).',
    action: 'Subject line testing recommended for June campaign.',
    date: 'May 26',
  },
]

export const marketingMetrics = {
  'My Neighbors': {
    period: 'May 2026',
    metrics: [
      { label: 'Paid Social ROAS', value: '3.2x', prev: '2.8x', direction: 'up', flagged: false },
      { label: 'Email Open Rate', value: '31%', prev: '27%', direction: 'up', flagged: false },
      { label: 'New Leads (MTD)', value: '48', prev: '31', direction: 'up', flagged: false },
      { label: 'CAC', value: '$84', prev: '$102', direction: 'down-good', flagged: false },
    ],
  },
  'George Rings': {
    period: 'May 2026',
    metrics: [
      { label: 'Paid Social ROAS', value: '1.9x', prev: '2.9x', direction: 'down', flagged: true },
      { label: 'Email Open Rate', value: '18%', prev: '28%', direction: 'down', flagged: true },
      { label: 'New Leads (MTD)', value: '22', prev: '22', direction: 'flat', flagged: false },
      { label: 'CAC', value: '$138', prev: '$119', direction: 'up-bad', flagged: true },
    ],
  },
  'Foxy Cakes': {
    period: 'May 2026',
    metrics: [
      { label: 'Paid Social ROAS', value: '2.1x', prev: '3.2x', direction: 'down', flagged: true },
      { label: 'Email Open Rate', value: '24%', prev: '21%', direction: 'up', flagged: false },
      { label: 'New Leads (MTD)', value: '37', prev: '29', direction: 'up', flagged: false },
      { label: 'CAC', value: '$91', prev: '$108', direction: 'down-good', flagged: false },
    ],
  },
}

export const marketingClientView = {
  'My Neighbors': {
    period: 'May 2026',
    lede: 'Your paid campaigns are outperforming last month, and your email list is growing. Here\'s where things stand.',
    campaign: {
      name: 'Q3 Campaign — "Summer Giving"',
      objective: 'Drive neighborhood gifting purchases through community targeting',
      timeline: 'Jun 15 – Aug 31, 2026',
      status: 'In production — Brief in review',
      channels: ['Instagram + Facebook Paid', 'Email (3-part sequence)', 'Organic content (8 posts)'],
    },
    channels: [
      { name: 'Paid Social', allocation: 42, performance: 88 },
      { name: 'Email', allocation: 28, performance: 76 },
      { name: 'Organic', allocation: 20, performance: 62 },
      { name: 'Partnerships', allocation: 10, performance: 45 },
    ],
  },
  'George Rings': {
    period: 'May 2026',
    lede: 'Your email metrics need attention this month — we\'re already working on a fix. Here\'s the full picture.',
    campaign: {
      name: 'June Brand Refresh Campaign',
      objective: 'Re-engage lapsed customers with updated brand positioning',
      timeline: 'Jun 1 – Jun 30, 2026',
      status: 'In planning — Positioning work in progress',
      channels: ['Email (4-part sequence)', 'Organic Social', 'Paid Social (retargeting)'],
    },
    channels: [
      { name: 'Email', allocation: 45, performance: 42 },
      { name: 'Organic', allocation: 30, performance: 68 },
      { name: 'Paid Social', allocation: 15, performance: 38 },
      { name: 'Partnerships', allocation: 10, performance: 55 },
    ],
  },
  'Foxy Cakes': {
    period: 'May 2026',
    lede: 'Email and organic are performing well — paid social is the focus area for June. Here\'s your full picture.',
    campaign: {
      name: 'Q3 Content Push — "Baked with Love"',
      objective: 'Grow organic reach and wholesale brand awareness',
      timeline: 'Jul 1 – Sep 30, 2026',
      status: 'Pre-production — Content calendar in review',
      channels: ['Instagram Organic (12 posts)', 'Email (2-part sequence)', 'Paid Social'],
    },
    channels: [
      { name: 'Organic', allocation: 40, performance: 72 },
      { name: 'Email', allocation: 25, performance: 65 },
      { name: 'Paid Social', allocation: 25, performance: 38 },
      { name: 'Partnerships', allocation: 10, performance: 58 },
    ],
  },
}
