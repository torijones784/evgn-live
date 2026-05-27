import React from 'react'
import { operationsClient } from '../../data/mockData'

export default function OperationsClient({ activeClient }) {
  const data = operationsClient[activeClient] || operationsClient['My Neighbors']

  return (
    <div style={styles.page} className="page-enter">
      <div style={styles.topBar}>
        <div>
          <div style={styles.pageLabel}>Operations</div>
          <h1 style={styles.pageTitle}>Your Work With evgn</h1>
          <div style={styles.sprintLabel}>{data.sprintLabel}</div>
        </div>
        <span className="phase-badge phase-badge--live">Live · Phase 1</span>
      </div>

      <div style={styles.content}>
        <div style={styles.clientHeader}>
          <span style={styles.clientName}>{activeClient}</span>
        </div>

        <div style={styles.workstreams}>
          {data.workstreams.map((ws, i) => (
            <WorkstreamCard key={i} ws={ws} />
          ))}
        </div>

        <div style={styles.actionSection}>
          <div style={styles.actionHeader}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ marginRight: '7px' }}>
              <circle cx="6" cy="6" r="5" stroke="var(--color-gold)" strokeWidth="1.2"/>
              <path d="M4 6h4M6 4v4" stroke="var(--color-gold)" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            Your Action Items
          </div>
          <div style={styles.actionList}>
            {data.actionItems.map((item, i) => (
              <div key={i} style={styles.actionItem}>
                <span style={styles.actionNum}>{i + 1}</span>
                <span style={styles.actionText}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function WorkstreamCard({ ws }) {
  const statusMap = {
    'In Review': 'in-review',
    'Needs Attention': 'needs-attention',
    'Blocked': 'blocked',
    'On Track': 'on-track',
    'Drafting': 'drafting',
  }

  return (
    <div style={styles.card}>
      <div style={styles.cardTop}>
        <div style={styles.cardLeft}>
          <h3 style={styles.wsName}>{ws.name}</h3>
          <div style={styles.wsOwner}>{ws.owner}</div>
        </div>
        <div style={styles.cardRight}>
          <span className={`status-tag status-tag--${statusMap[ws.status] || 'in-review'}`}>
            {ws.status}
          </span>
          <span style={styles.dueDate}>Due {ws.due}</span>
        </div>
      </div>

      <p style={styles.wsUpdate}>{ws.update}</p>

      <div style={styles.progressWrap}>
        <div style={styles.progressTrack}>
          <div
            style={{
              ...styles.progressFill,
              width: `${ws.progress * 100}%`,
            }}
          />
        </div>
      </div>
    </div>
  )
}

const styles = {
  page: {
    flex: 1,
    overflowY: 'auto',
    background: 'var(--color-cream)',
    minHeight: '100vh',
  },
  topBar: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: '40px 40px 0',
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
    marginBottom: '6px',
  },
  sprintLabel: {
    fontFamily: 'var(--font-body)',
    fontSize: '12px',
    fontWeight: '300',
    color: 'var(--color-text-tertiary)',
    fontStyle: 'italic',
  },
  content: {
    padding: '28px 40px 60px',
    maxWidth: '800px',
  },
  clientHeader: {
    marginBottom: '24px',
    paddingBottom: '20px',
    borderBottom: '1px solid var(--color-border-subtle)',
  },
  clientName: {
    fontFamily: 'var(--font-display)',
    fontSize: '24px',
    fontWeight: '300',
    color: 'var(--color-text-secondary)',
    fontStyle: 'italic',
  },
  workstreams: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    marginBottom: '36px',
  },
  card: {
    background: 'var(--color-white)',
    border: '1px solid var(--color-border)',
    borderRadius: '4px',
    padding: '24px 26px',
  },
  cardTop: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: '16px',
    marginBottom: '14px',
  },
  cardLeft: {},
  wsName: {
    fontFamily: 'var(--font-display)',
    fontSize: '20px',
    fontWeight: '400',
    color: 'var(--color-text-primary)',
    marginBottom: '4px',
  },
  wsOwner: {
    fontFamily: 'var(--font-body)',
    fontSize: '11.5px',
    fontWeight: '400',
    color: 'var(--color-text-tertiary)',
  },
  cardRight: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '6px',
    flexShrink: 0,
  },
  dueDate: {
    fontFamily: 'var(--font-body)',
    fontSize: '11px',
    fontWeight: '400',
    color: 'var(--color-text-tertiary)',
  },
  wsUpdate: {
    fontFamily: 'var(--font-body)',
    fontSize: '14px',
    fontWeight: '300',
    color: 'var(--color-text-secondary)',
    lineHeight: '1.65',
    marginBottom: '18px',
    fontStyle: 'italic',
  },
  progressWrap: {
    paddingTop: '4px',
  },
  progressTrack: {
    height: '2px',
    background: 'var(--color-border)',
    borderRadius: '1px',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    background: 'var(--color-gold)',
    borderRadius: '1px',
    transition: 'width 600ms ease',
  },
  actionSection: {
    background: 'var(--color-white)',
    border: '1px solid var(--color-border)',
    borderLeft: '3px solid var(--color-gold)',
    borderRadius: '2px',
    padding: '22px 26px',
  },
  actionHeader: {
    display: 'flex',
    alignItems: 'center',
    fontFamily: 'var(--font-body)',
    fontSize: '10px',
    fontWeight: '600',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: 'var(--color-gold)',
    marginBottom: '16px',
  },
  actionList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  actionItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
  },
  actionNum: {
    fontFamily: 'var(--font-body)',
    fontSize: '11px',
    fontWeight: '600',
    color: 'var(--color-white)',
    background: 'var(--color-gold)',
    width: '18px',
    height: '18px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    marginTop: '1px',
  },
  actionText: {
    fontFamily: 'var(--font-body)',
    fontSize: '14px',
    fontWeight: '400',
    color: 'var(--color-text-primary)',
    lineHeight: '1.5',
  },
}
