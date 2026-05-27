import React, { useState } from 'react'
import { pipelineLeads, PIPELINE_STAGES, emailTemplates, journeyChecklist, getCheckedItems } from '../../data/mockData'
import SlideOver from '../../components/SlideOver'

const STAGE_GROUPS = [
  { label: 'Active Pipeline', stages: ['Intake', 'Discovery', 'Quote', 'Contract', 'Onboarding'] },
  { label: 'Engaged', stages: ['Execution'] },
  { label: 'Closed', stages: ['Lost'] },
]

const JOURNEY_STAGE_ORDER = ['Intake', 'Discovery', 'Quote', 'Contract', 'Onboarding', 'Execution', 'Renewal']

export default function Pipeline() {
  const [emailSlide, setEmailSlide] = useState(null)
  const [journeySlide, setJourneySlide] = useState(null)

  const byStage = (stage) => pipelineLeads.filter(l => l.stage === stage)
  const lostLeads = pipelineLeads.filter(l => l.status === 'Lost')

  return (
    <div style={styles.page} className="page-enter">
      <div style={styles.topBar}>
        <div>
          <div style={styles.pageLabel}>Intake</div>
          <h1 style={styles.pageTitle}>Pipeline</h1>
        </div>
        <div style={styles.topRight}>
          <span className="phase-badge phase-badge--live">Live · Phase 1</span>
        </div>
      </div>

      {lostLeads.length > 0 && (
        <div style={styles.reEngageBanner}>
          <div style={styles.reEngageLabel}>Follow-Up Reminders</div>
          {lostLeads.map(lead => (
            <div key={lead.id} style={styles.reEngageCard}>
              <div style={styles.reEngageText}>
                <span style={styles.reEngageCompany}>{lead.company}</span>
                {' — '}{lead.contact} marked lost {lead.daysInStage} days ago (reason: Timing).
                {' '}Schedule a re-engagement check-in for August 2026?
              </div>
              <div style={styles.reEngageActions}>
                <button style={styles.snoozeBtn}>Snooze 30 days</button>
                <button
                  style={styles.scheduleBtn}
                  onClick={() => setEmailSlide({ lead, template: emailTemplates['Quote Follow-up'], type: 'Re-engagement' })}
                >
                  Schedule Email
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={styles.boardScroll}>
        <div style={styles.board}>
          {['Intake', 'Discovery', 'Quote', 'Contract', 'Onboarding', 'Execution'].map(stage => (
            <div key={stage} style={styles.column}>
              <div style={styles.colHeader}>
                <span style={styles.colTitle}>{stage}</span>
                <span style={styles.colCount}>{byStage(stage).length}</span>
              </div>
              <div style={styles.colCards}>
                {byStage(stage).length === 0 ? (
                  <div style={styles.emptyCol}>—</div>
                ) : (
                  byStage(stage).map(lead => (
                    <LeadCard
                      key={lead.id}
                      lead={lead}
                      onEmail={() => setEmailSlide({ lead, template: emailTemplates[stage] || emailTemplates['Intake'], type: stage })}
                      onJourney={() => setJourneySlide(lead)}
                    />
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <SlideOver
        open={!!emailSlide}
        onClose={() => setEmailSlide(null)}
        title={emailSlide?.lead?.company}
        subtitle={`${emailSlide?.type} Email Template`}
        width="540px"
      >
        {emailSlide && <EmailPanel template={emailSlide.template} lead={emailSlide.lead} />}
      </SlideOver>

      <SlideOver
        open={!!journeySlide}
        onClose={() => setJourneySlide(null)}
        title={journeySlide?.company}
        subtitle="Client Journey"
        width="580px"
      >
        {journeySlide && <JourneyPanel lead={journeySlide} />}
      </SlideOver>
    </div>
  )
}

function LeadCard({ lead, onEmail, onJourney }) {
  const isWon = lead.status === 'Won'
  const isLost = lead.status === 'Lost'

  return (
    <div style={{ ...styles.card, ...(isLost ? styles.cardLost : {}) }}>
      <div style={styles.cardTop}>
        <div style={styles.cardCompany}>{lead.company}</div>
        {isWon && <span style={styles.wonDot} title="Won" />}
      </div>
      <div style={styles.cardContact}>{lead.contact}</div>
      <div style={styles.cardMeta}>
        <span style={styles.cardSource}>{lead.source}</span>
        <span style={styles.cardDays}>Day {lead.daysInStage}</span>
      </div>
      <div style={styles.cardActions}>
        <button style={styles.cardBtn} onClick={onEmail}>Approve Email</button>
        <button style={styles.cardBtnOutline} onClick={onJourney}>View Journey</button>
      </div>
    </div>
  )
}

function EmailPanel({ template, lead }) {
  const [approved, setApproved] = useState(false)
  if (!template) {
    return <p style={styles.noTemplate}>No template available for this stage.</p>
  }
  return (
    <div>
      <div style={styles.emailMeta}>
        <div style={styles.emailMetaRow}>
          <span style={styles.emailMetaLabel}>To</span>
          <span style={styles.emailMetaValue}>{lead.contact} · {lead.company}</span>
        </div>
        <div style={styles.emailMetaRow}>
          <span style={styles.emailMetaLabel}>Stage</span>
          <span style={styles.emailMetaValue}>{lead.stage}</span>
        </div>
        <div style={styles.emailMetaRow}>
          <span style={styles.emailMetaLabel}>Subject</span>
          <span style={styles.emailMetaValue}>{template.subject}</span>
        </div>
      </div>
      <div style={styles.emailBody}>
        {template.body.split('\n\n').map((para, i) => (
          <p key={i} style={styles.emailPara}>{para}</p>
        ))}
      </div>
      <div style={styles.emailFooter}>
        {approved ? (
          <div style={styles.approvedMsg}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="6" fill="var(--color-sage)"/>
              <path d="M4 7l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Email approved and queued
          </div>
        ) : (
          <button style={styles.approveBtn} onClick={() => setApproved(true)}>
            Approve &amp; Queue Email
          </button>
        )}
        <button style={styles.editBtn}>Edit Draft</button>
      </div>
    </div>
  )
}

function JourneyPanel({ lead }) {
  const items = getCheckedItems(lead)
  const grouped = JOURNEY_STAGE_ORDER.reduce((acc, stage) => {
    acc[stage] = items.filter(i => i.stage === stage)
    return acc
  }, {})

  return (
    <div>
      {JOURNEY_STAGE_ORDER.map((stage, si) => (
        <div key={stage} style={styles.journeyGroup}>
          <div style={styles.journeyGroupHeader}>
            <span style={styles.journeyStageNum}>{si + 1}</span>
            <span style={styles.journeyStageLabel}>{stage}</span>
          </div>
          <div style={styles.journeyItems}>
            {grouped[stage]?.map(item => (
              <div key={item.id} style={styles.journeyItem}>
                <div style={styles.journeyCheck}>
                  {item.checked ? (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <circle cx="6" cy="6" r="5.25" fill="var(--color-sage)" fillOpacity="0.15" stroke="var(--color-sage)" strokeWidth="1.25"/>
                      <path d="M3.5 6l2 2 3-3.5" stroke="var(--color-sage)" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ) : (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <circle cx="6" cy="6" r="5.25" stroke="var(--color-border)" strokeWidth="1.25"/>
                    </svg>
                  )}
                </div>
                <span style={{ ...styles.journeyItemText, ...(item.checked ? styles.journeyItemChecked : {}) }}>
                  {item.item}
                </span>
                {item.docusign === 'signature' && item.docusignStatus && (
                  <DocuSignBadge status={item.docusignStatus} />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function DocuSignBadge({ status }) {
  const isSigned = status === 'Signed'
  return (
    <div style={{ ...styles.docusignBadge, ...(isSigned ? styles.docusignSigned : styles.docusignPending) }}>
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ marginRight: '4px' }}>
        <rect x="1" y="1" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M3 5l1.5 1.5L7 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      DocuSign · {status}
    </div>
  )
}

const styles = {
  page: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    background: 'var(--color-cream)',
    minHeight: '100vh',
    overflow: 'hidden',
  },
  topBar: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    padding: '40px 40px 0',
    flexShrink: 0,
  },
  topRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    paddingBottom: '4px',
  },
  pageLabel: {
    fontFamily: 'var(--font-body)',
    fontSize: '10px',
    fontWeight: '600',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: 'var(--color-text-tertiary)',
    marginBottom: '6px',
  },
  pageTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: '36px',
    fontWeight: '400',
    color: 'var(--color-text-primary)',
  },
  reEngageBanner: {
    margin: '24px 40px 0',
    background: 'var(--color-white)',
    border: '1px solid var(--color-border)',
    borderRadius: '4px',
    padding: '18px 20px',
    flexShrink: 0,
  },
  reEngageLabel: {
    fontFamily: 'var(--font-body)',
    fontSize: '10px',
    fontWeight: '600',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: 'var(--color-text-tertiary)',
    marginBottom: '12px',
  },
  reEngageCard: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '20px',
  },
  reEngageText: {
    fontFamily: 'var(--font-body)',
    fontSize: '13.5px',
    fontWeight: '300',
    color: 'var(--color-text-secondary)',
    lineHeight: '1.5',
    fontStyle: 'italic',
  },
  reEngageCompany: {
    fontWeight: '500',
    fontStyle: 'normal',
    color: 'var(--color-text-primary)',
  },
  reEngageActions: {
    display: 'flex',
    gap: '8px',
    flexShrink: 0,
  },
  snoozeBtn: {
    fontFamily: 'var(--font-body)',
    fontSize: '11.5px',
    fontWeight: '400',
    color: 'var(--color-text-secondary)',
    background: 'var(--color-cream)',
    border: '1px solid var(--color-border)',
    borderRadius: '3px',
    padding: '6px 12px',
    cursor: 'pointer',
    transition: 'background 200ms ease',
  },
  scheduleBtn: {
    fontFamily: 'var(--font-body)',
    fontSize: '11.5px',
    fontWeight: '500',
    color: 'var(--color-brown-deep)',
    background: 'var(--color-gold-muted)',
    border: '1px solid rgba(201,168,76,0.3)',
    borderRadius: '3px',
    padding: '6px 12px',
    cursor: 'pointer',
    transition: 'background 200ms ease',
  },
  boardScroll: {
    flex: 1,
    overflowX: 'auto',
    padding: '28px 40px 40px',
  },
  board: {
    display: 'flex',
    gap: '16px',
    alignItems: 'flex-start',
    minWidth: 'max-content',
  },
  column: {
    width: '220px',
    flexShrink: 0,
  },
  colHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '14px',
    paddingBottom: '10px',
    borderBottom: '1px solid var(--color-border)',
  },
  colTitle: {
    fontFamily: 'var(--font-body)',
    fontSize: '10px',
    fontWeight: '600',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: 'var(--color-text-secondary)',
  },
  colCount: {
    fontFamily: 'var(--font-body)',
    fontSize: '11px',
    fontWeight: '500',
    color: 'var(--color-text-tertiary)',
    background: 'var(--color-cream-warm)',
    border: '1px solid var(--color-border)',
    borderRadius: '20px',
    padding: '1px 7px',
  },
  colCards: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  emptyCol: {
    fontFamily: 'var(--font-body)',
    fontSize: '13px',
    color: 'var(--color-text-tertiary)',
    textAlign: 'center',
    padding: '24px 0',
    opacity: 0.4,
  },
  card: {
    background: 'var(--color-white)',
    border: '1px solid var(--color-border)',
    borderRadius: '4px',
    padding: '14px 16px',
    transition: 'box-shadow 200ms ease, border-color 200ms ease',
  },
  cardLost: {
    opacity: 0.55,
    background: 'var(--color-cream)',
  },
  cardTop: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '4px',
  },
  cardCompany: {
    fontFamily: 'var(--font-body)',
    fontSize: '13px',
    fontWeight: '600',
    color: 'var(--color-text-primary)',
  },
  wonDot: {
    display: 'inline-block',
    width: '7px',
    height: '7px',
    borderRadius: '50%',
    background: 'var(--color-sage)',
  },
  cardContact: {
    fontFamily: 'var(--font-body)',
    fontSize: '11.5px',
    fontWeight: '400',
    color: 'var(--color-text-secondary)',
    marginBottom: '8px',
  },
  cardMeta: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '12px',
  },
  cardSource: {
    fontFamily: 'var(--font-body)',
    fontSize: '10.5px',
    color: 'var(--color-text-tertiary)',
    background: 'var(--color-cream)',
    border: '1px solid var(--color-border-subtle)',
    borderRadius: '20px',
    padding: '2px 7px',
  },
  cardDays: {
    fontFamily: 'var(--font-body)',
    fontSize: '10.5px',
    fontWeight: '500',
    color: 'var(--color-text-tertiary)',
  },
  cardActions: {
    display: 'flex',
    gap: '6px',
  },
  cardBtn: {
    flex: 1,
    fontFamily: 'var(--font-body)',
    fontSize: '10.5px',
    fontWeight: '500',
    color: 'var(--color-brown-deep)',
    background: 'var(--color-cream-warm)',
    border: '1px solid var(--color-border)',
    borderRadius: '3px',
    padding: '5px 8px',
    cursor: 'pointer',
    transition: 'background 200ms ease',
    textAlign: 'center',
  },
  cardBtnOutline: {
    flex: 1,
    fontFamily: 'var(--font-body)',
    fontSize: '10.5px',
    fontWeight: '400',
    color: 'var(--color-text-secondary)',
    background: 'transparent',
    border: '1px solid var(--color-border)',
    borderRadius: '3px',
    padding: '5px 8px',
    cursor: 'pointer',
    transition: 'background 200ms ease',
    textAlign: 'center',
  },
  noTemplate: {
    fontFamily: 'var(--font-body)',
    fontSize: '14px',
    color: 'var(--color-text-tertiary)',
    fontStyle: 'italic',
  },
  emailMeta: {
    background: 'var(--color-cream)',
    border: '1px solid var(--color-border-subtle)',
    borderRadius: '4px',
    padding: '14px 16px',
    marginBottom: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  emailMetaRow: {
    display: 'flex',
    gap: '12px',
  },
  emailMetaLabel: {
    fontFamily: 'var(--font-body)',
    fontSize: '10px',
    fontWeight: '600',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: 'var(--color-text-tertiary)',
    width: '52px',
    flexShrink: 0,
    paddingTop: '1px',
  },
  emailMetaValue: {
    fontFamily: 'var(--font-body)',
    fontSize: '13px',
    fontWeight: '400',
    color: 'var(--color-text-primary)',
  },
  emailBody: {
    marginBottom: '24px',
    padding: '20px 0',
    borderTop: '1px solid var(--color-border-subtle)',
    borderBottom: '1px solid var(--color-border-subtle)',
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  },
  emailPara: {
    fontFamily: 'var(--font-body)',
    fontSize: '14px',
    fontWeight: '300',
    color: 'var(--color-text-primary)',
    lineHeight: '1.7',
  },
  emailFooter: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
  },
  approveBtn: {
    fontFamily: 'var(--font-body)',
    fontSize: '13px',
    fontWeight: '500',
    color: 'var(--color-white)',
    background: 'var(--color-brown-deep)',
    border: 'none',
    borderRadius: '3px',
    padding: '10px 20px',
    cursor: 'pointer',
  },
  approvedMsg: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontFamily: 'var(--font-body)',
    fontSize: '13px',
    fontWeight: '500',
    color: 'var(--color-sage)',
  },
  editBtn: {
    fontFamily: 'var(--font-body)',
    fontSize: '13px',
    fontWeight: '400',
    color: 'var(--color-text-secondary)',
    background: 'var(--color-cream)',
    border: '1px solid var(--color-border)',
    borderRadius: '3px',
    padding: '10px 16px',
    cursor: 'pointer',
  },
  journeyGroup: {
    marginBottom: '28px',
  },
  journeyGroupHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '12px',
    paddingBottom: '8px',
    borderBottom: '1px solid var(--color-border-subtle)',
  },
  journeyStageNum: {
    fontFamily: 'var(--font-body)',
    fontSize: '10px',
    fontWeight: '600',
    color: 'var(--color-white)',
    background: 'var(--color-brown-mid)',
    width: '18px',
    height: '18px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  journeyStageLabel: {
    fontFamily: 'var(--font-body)',
    fontSize: '11px',
    fontWeight: '600',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: 'var(--color-text-secondary)',
  },
  journeyItems: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  journeyItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '10px',
    padding: '6px 0',
  },
  journeyCheck: {
    flexShrink: 0,
    marginTop: '1px',
  },
  journeyItemText: {
    fontFamily: 'var(--font-body)',
    fontSize: '13px',
    fontWeight: '400',
    color: 'var(--color-text-primary)',
    lineHeight: '1.5',
    flex: 1,
  },
  journeyItemChecked: {
    color: 'var(--color-text-tertiary)',
    textDecoration: 'line-through',
    textDecorationColor: 'var(--color-sage-light)',
  },
  docusignBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    flexShrink: 0,
    fontFamily: 'var(--font-body)',
    fontSize: '10px',
    fontWeight: '500',
    letterSpacing: '0.03em',
    padding: '2px 8px',
    borderRadius: '20px',
    border: '1px solid',
    whiteSpace: 'nowrap',
  },
  docusignSigned: {
    color: '#5a7a58',
    background: 'rgba(139,158,137,0.12)',
    borderColor: 'rgba(139,158,137,0.3)',
  },
  docusignPending: {
    color: '#9a7a2c',
    background: 'rgba(201,168,76,0.1)',
    borderColor: 'rgba(201,168,76,0.25)',
  },
}
