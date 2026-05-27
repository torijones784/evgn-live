import React from 'react'
import { operationsAll, meetingCadence } from '../../data/mockData'

export default function OperationsAll() {
  return (
    <div style={styles.page} className="page-enter">
      <div style={styles.topBar}>
        <div>
          <div style={styles.pageLabel}>Operations</div>
          <h1 style={styles.pageTitle}>All Clients</h1>
        </div>
        <span className="phase-badge phase-badge--live">Live · Phase 1</span>
      </div>

      <div style={styles.content}>
        <div style={styles.tableWrap}>
          <table style={styles.table}>
            <thead>
              <tr>
                {['Client', 'Current Workstream', 'Owner', 'Status', 'Due', ''].map((h, i) => (
                  <th key={i} style={styles.th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {operationsAll.map((row, i) => (
                <tr key={row.id} style={{ ...styles.tr, ...(i % 2 === 0 ? styles.trEven : {}) }}>
                  <td style={styles.td}>
                    <span style={styles.clientName}>{row.client}</span>
                  </td>
                  <td style={styles.td}>
                    <span style={styles.workstream}>{row.workstream}</span>
                  </td>
                  <td style={styles.td}>
                    <span style={styles.owner}>{row.owner}</span>
                  </td>
                  <td style={styles.td}>
                    <StatusTag status={row.status} />
                  </td>
                  <td style={styles.td}>
                    <span style={styles.due}>{row.due}</span>
                  </td>
                  <td style={styles.td}>
                    <button style={styles.rowAction}>View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={styles.insightCard}>
          <div style={styles.insightHeader}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ marginRight: '6px' }}>
              <circle cx="6" cy="6" r="5" stroke="var(--color-gold)" strokeWidth="1.2"/>
              <path d="M6 4v3M6 8.5v.5" stroke="var(--color-gold)" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            Cross-client flag
          </div>
          <p style={styles.insightText}>
            Megan is carrying three simultaneous campaign builds (My Neighbors, George Rings, Foxy Cakes) with overlapping deadlines in the June 3–13 window. Consider sequencing or redistributing the George Rings brand refresh.
          </p>
        </div>

        <div style={styles.cadenceSection}>
          <div style={styles.cadenceLabel}>Upcoming Syncs</div>
          <div style={styles.cadenceList}>
            {meetingCadence.map((m, i) => (
              <div key={i} style={styles.cadenceItem}>
                <div style={styles.cadenceClient}>{m.client}</div>
                <div style={styles.cadenceType}>{m.type}</div>
                <div style={styles.cadenceDate}>{m.date}</div>
                <button style={styles.cadenceBtn}>Prep Agenda</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function StatusTag({ status }) {
  const map = {
    'On Track': 'on-track',
    'Needs Attention': 'needs-attention',
    'Blocked': 'blocked',
  }
  return <span className={`status-tag status-tag--${map[status] || 'on-track'}`}>{status}</span>
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
    alignItems: 'flex-end',
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
  },
  content: {
    padding: '28px 40px 60px',
  },
  tableWrap: {
    background: 'var(--color-white)',
    border: '1px solid var(--color-border)',
    borderRadius: '4px',
    overflow: 'hidden',
    marginBottom: '24px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    fontFamily: 'var(--font-body)',
    fontSize: '9.5px',
    fontWeight: '600',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: 'var(--color-text-tertiary)',
    textAlign: 'left',
    padding: '14px 16px',
    borderBottom: '1px solid var(--color-border-subtle)',
    background: 'var(--color-cream)',
    whiteSpace: 'nowrap',
  },
  tr: {
    transition: 'background 150ms ease',
    borderBottom: '1px solid var(--color-border-subtle)',
  },
  trEven: {
    background: 'rgba(248,244,238,0.4)',
  },
  td: {
    padding: '13px 16px',
    verticalAlign: 'middle',
  },
  clientName: {
    fontFamily: 'var(--font-body)',
    fontSize: '13px',
    fontWeight: '500',
    color: 'var(--color-text-primary)',
    whiteSpace: 'nowrap',
  },
  workstream: {
    fontFamily: 'var(--font-body)',
    fontSize: '13px',
    fontWeight: '300',
    color: 'var(--color-text-primary)',
  },
  owner: {
    fontFamily: 'var(--font-body)',
    fontSize: '12.5px',
    fontWeight: '400',
    color: 'var(--color-text-secondary)',
    whiteSpace: 'nowrap',
  },
  due: {
    fontFamily: 'var(--font-body)',
    fontSize: '12px',
    fontWeight: '400',
    color: 'var(--color-text-secondary)',
    whiteSpace: 'nowrap',
  },
  rowAction: {
    fontFamily: 'var(--font-body)',
    fontSize: '11px',
    fontWeight: '400',
    color: 'var(--color-text-secondary)',
    background: 'var(--color-cream)',
    border: '1px solid var(--color-border)',
    borderRadius: '3px',
    padding: '4px 10px',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
  insightCard: {
    background: 'var(--color-white)',
    border: '1px solid var(--color-border)',
    borderLeft: '3px solid var(--color-gold)',
    borderRadius: '2px',
    padding: '18px 22px',
    marginBottom: '32px',
  },
  insightHeader: {
    display: 'flex',
    alignItems: 'center',
    fontFamily: 'var(--font-body)',
    fontSize: '10px',
    fontWeight: '600',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: 'var(--color-gold)',
    marginBottom: '10px',
  },
  insightText: {
    fontFamily: 'var(--font-body)',
    fontSize: '13.5px',
    fontWeight: '300',
    color: 'var(--color-text-secondary)',
    lineHeight: '1.65',
    fontStyle: 'italic',
  },
  cadenceSection: {
    background: 'var(--color-white)',
    border: '1px solid var(--color-border)',
    borderRadius: '4px',
    padding: '20px 24px',
  },
  cadenceLabel: {
    fontFamily: 'var(--font-body)',
    fontSize: '10px',
    fontWeight: '600',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: 'var(--color-text-tertiary)',
    marginBottom: '16px',
  },
  cadenceList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0',
  },
  cadenceItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '12px 0',
    borderBottom: '1px solid var(--color-border-subtle)',
  },
  cadenceClient: {
    fontFamily: 'var(--font-body)',
    fontSize: '13px',
    fontWeight: '500',
    color: 'var(--color-text-primary)',
    width: '140px',
    flexShrink: 0,
  },
  cadenceType: {
    fontFamily: 'var(--font-body)',
    fontSize: '12.5px',
    fontWeight: '300',
    color: 'var(--color-text-secondary)',
    flex: 1,
  },
  cadenceDate: {
    fontFamily: 'var(--font-body)',
    fontSize: '12px',
    fontWeight: '400',
    color: 'var(--color-text-tertiary)',
    whiteSpace: 'nowrap',
  },
  cadenceBtn: {
    fontFamily: 'var(--font-body)',
    fontSize: '11px',
    fontWeight: '400',
    color: 'var(--color-text-secondary)',
    background: 'var(--color-cream)',
    border: '1px solid var(--color-border)',
    borderRadius: '3px',
    padding: '5px 10px',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    flexShrink: 0,
  },
}
