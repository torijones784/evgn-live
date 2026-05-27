import React from 'react'
import { mondayBriefs } from '../data/mockData'

export default function Home({ activeClient }) {
  const brief = mondayBriefs[activeClient] || mondayBriefs['My Neighbors']

  return (
    <div style={styles.page} className="page-enter">
      <div style={styles.container}>
        <header style={styles.header}>
          <div style={styles.headerMeta}>
            <span style={styles.weekLabel}>{brief.weekOf}</span>
            <span style={styles.sep}>·</span>
            <span style={styles.weekLabel}>The Monday Brief</span>
          </div>
          <h1 style={styles.companyName}>{brief.company}</h1>
          <p style={styles.greeting}>{brief.greeting}</p>
        </header>

        <section style={styles.section}>
          <div style={styles.sectionLabel}>
            <CheckIcon /> What's Done
          </div>
          <div style={styles.doneList}>
            {brief.done.map((item, i) => (
              <div key={i} style={styles.doneItem}>
                <span style={styles.doneCheck}>
                  <svg width="11" height="8" viewBox="0 0 11 8" fill="none">
                    <path d="M1 4l3 3 6-6" stroke="var(--color-sage)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span style={styles.doneText}>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <section style={styles.section}>
          <div style={styles.sectionLabel}>
            <PulseIcon /> What's In Motion
          </div>
          <div style={styles.motionList}>
            {brief.inMotion.map((item, i) => (
              <div key={i} style={styles.motionItem}>
                <div style={styles.motionLeft}>
                  <div style={styles.motionDot} />
                  <span style={styles.motionText}>{item.item}</span>
                </div>
                <div style={styles.motionRight}>
                  <span style={styles.motionOwner}>{item.owner} · {item.dept}</span>
                  <StatusPill status={item.status} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={styles.prioritySection}>
          <div style={styles.priorityInner}>
            <div style={styles.priorityLabel}>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ marginRight: '6px' }}>
                <circle cx="5" cy="5" r="4" stroke="var(--color-gold)" strokeWidth="1.5"/>
                <circle cx="5" cy="5" r="2" fill="var(--color-gold)"/>
              </svg>
              Your One Priority This Week
            </div>
            <p style={styles.priorityHeadline}>{brief.priority.headline}</p>
            <p style={styles.priorityBody}>{brief.priority.body}</p>
            <div style={styles.priorityMeta}>{brief.priority.owner}</div>
          </div>
        </section>
      </div>
    </div>
  )
}

function StatusPill({ status }) {
  const map = {
    'In review': 'in-review',
    'Awaiting your input': 'awaiting',
    'Drafting': 'drafting',
    'Blocked': 'blocked',
  }
  return (
    <span className={`status-tag status-tag--${map[status] || 'in-review'}`}>
      {status}
    </span>
  )
}

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ marginRight: '8px', flexShrink: 0 }}>
      <circle cx="6" cy="6" r="5.25" stroke="var(--color-sage)" strokeWidth="1.25"/>
      <path d="M3.5 6l2 2 3-3.5" stroke="var(--color-sage)" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function PulseIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ marginRight: '8px', flexShrink: 0 }}>
      <circle cx="6" cy="6" r="5.25" stroke="var(--color-gold-muted)" strokeWidth="1.25"/>
      <circle cx="6" cy="6" r="2.5" fill="var(--color-gold-muted)" opacity="0.6"/>
    </svg>
  )
}

const styles = {
  page: {
    flex: 1,
    overflowY: 'auto',
    background: 'var(--color-cream)',
    minHeight: '100vh',
  },
  container: {
    maxWidth: '680px',
    margin: '0 auto',
    padding: '64px 40px 80px',
  },
  header: {
    marginBottom: '64px',
  },
  headerMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '16px',
  },
  weekLabel: {
    fontFamily: 'var(--font-body)',
    fontSize: '11px',
    fontWeight: '500',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: 'var(--color-text-tertiary)',
  },
  sep: {
    color: 'var(--color-text-tertiary)',
    opacity: 0.5,
  },
  companyName: {
    fontFamily: 'var(--font-display)',
    fontSize: '46px',
    fontWeight: '300',
    color: 'var(--color-text-primary)',
    letterSpacing: '-0.01em',
    lineHeight: '1.05',
    marginBottom: '20px',
  },
  greeting: {
    fontFamily: 'var(--font-body)',
    fontSize: '15px',
    fontWeight: '300',
    color: 'var(--color-text-secondary)',
    lineHeight: '1.6',
    fontStyle: 'italic',
  },
  section: {
    marginBottom: '56px',
  },
  sectionLabel: {
    display: 'flex',
    alignItems: 'center',
    fontFamily: 'var(--font-body)',
    fontSize: '10px',
    fontWeight: '600',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: 'var(--color-text-tertiary)',
    marginBottom: '24px',
  },
  doneList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0',
  },
  doneItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    padding: '14px 0',
    borderBottom: '1px solid var(--color-border-subtle)',
  },
  doneCheck: {
    marginTop: '3px',
    flexShrink: 0,
    width: '16px',
    height: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  doneText: {
    fontFamily: 'var(--font-body)',
    fontSize: '14.5px',
    fontWeight: '300',
    color: 'var(--color-text-tertiary)',
    textDecoration: 'line-through',
    textDecorationColor: 'rgba(139,158,137,0.4)',
    lineHeight: '1.5',
  },
  motionList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0',
  },
  motionItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '15px 0',
    borderBottom: '1px solid var(--color-border-subtle)',
    gap: '16px',
  },
  motionLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flex: 1,
    minWidth: 0,
  },
  motionDot: {
    width: '7px',
    height: '7px',
    borderRadius: '50%',
    background: 'var(--color-gold-muted)',
    flexShrink: 0,
    boxShadow: '0 0 0 3px rgba(212,184,150,0.2)',
  },
  motionText: {
    fontFamily: 'var(--font-body)',
    fontSize: '14.5px',
    fontWeight: '400',
    color: 'var(--color-text-primary)',
    lineHeight: '1.4',
  },
  motionRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    flexShrink: 0,
  },
  motionOwner: {
    fontFamily: 'var(--font-body)',
    fontSize: '11px',
    fontWeight: '400',
    color: 'var(--color-text-tertiary)',
    whiteSpace: 'nowrap',
  },
  prioritySection: {
    marginTop: '64px',
  },
  priorityInner: {
    background: 'var(--color-white)',
    border: '1px solid var(--color-border)',
    borderLeft: '3px solid var(--color-gold)',
    borderRadius: '2px',
    padding: '32px 36px',
    position: 'relative',
  },
  priorityLabel: {
    display: 'flex',
    alignItems: 'center',
    fontFamily: 'var(--font-body)',
    fontSize: '10px',
    fontWeight: '600',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: 'var(--color-gold)',
    marginBottom: '18px',
  },
  priorityHeadline: {
    fontFamily: 'var(--font-display)',
    fontSize: '22px',
    fontWeight: '500',
    color: 'var(--color-text-primary)',
    lineHeight: '1.3',
    marginBottom: '14px',
  },
  priorityBody: {
    fontFamily: 'var(--font-body)',
    fontSize: '14.5px',
    fontWeight: '300',
    color: 'var(--color-text-secondary)',
    lineHeight: '1.65',
    marginBottom: '18px',
  },
  priorityMeta: {
    fontFamily: 'var(--font-body)',
    fontSize: '11px',
    fontWeight: '500',
    color: 'var(--color-text-tertiary)',
    letterSpacing: '0.04em',
  },
}
