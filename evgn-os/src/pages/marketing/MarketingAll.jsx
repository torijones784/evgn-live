import React from 'react'
import { marketingAlerts, marketingMetrics, CLIENTS } from '../../data/mockData'

function TrendArrow({ direction }) {
  if (direction === 'up' || direction === 'down-good') {
    return (
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ display: 'inline-block', marginLeft: '4px' }}>
        <path d="M5 8V2M2 5l3-3 3 3" stroke="#5a7a58" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  }
  if (direction === 'down' || direction === 'up-bad') {
    return (
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ display: 'inline-block', marginLeft: '4px' }}>
        <path d="M5 2v6M2 5l3 3 3-3" stroke="#8a4030" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  }
  return <span style={{ marginLeft: '4px', color: 'var(--color-text-tertiary)', fontSize: '10px' }}>→</span>
}

export default function MarketingAll() {
  return (
    <div style={styles.page} className="page-enter">
      <div style={styles.topBar}>
        <div>
          <div style={styles.pageLabel}>Marketing</div>
          <h1 style={styles.pageTitle}>All Clients</h1>
        </div>
        <span className="phase-badge phase-badge--live">Live · Phase 1</span>
      </div>

      <div style={styles.content}>
        <div style={styles.alertStrip}>
          {marketingAlerts.map((alert, i) => (
            <div key={i} style={styles.alertCard}>
              <div style={styles.alertTop}>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ marginRight: '6px', flexShrink: 0 }}>
                  <path d="M5 1.5L9 8.5H1L5 1.5z" stroke="var(--color-gold)" strokeWidth="1.2" strokeLinejoin="round"/>
                  <path d="M5 4.5v2M5 7.5v.4" stroke="var(--color-gold)" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
                <span style={styles.alertClient}>{alert.client}</span>
                <span style={styles.alertDate}>— Flagged {alert.date}</span>
              </div>
              <p style={styles.alertMessage}>{alert.message}</p>
              <p style={styles.alertAction}>{alert.action}</p>
            </div>
          ))}
        </div>

        <div style={styles.clientCards}>
          {CLIENTS.map(client => (
            <ClientCard key={client} client={client} data={marketingMetrics[client]} />
          ))}
        </div>
      </div>
    </div>
  )
}

function ClientCard({ client, data }) {
  if (!data) return null
  return (
    <div style={styles.clientCard}>
      <div style={styles.clientCardHeader}>
        <h2 style={styles.clientCardName}>{client}</h2>
        <div style={styles.clientCardPeriod}>{data.period}</div>
      </div>
      <div style={styles.metricsGrid}>
        {data.metrics.map((m, i) => (
          <div key={i} style={{ ...styles.metricTile, ...(m.flagged ? styles.metricFlagged : {}) }}>
            <div style={styles.metricLabel}>{m.label}</div>
            <div style={styles.metricValue}>
              {m.value}
              <TrendArrow direction={m.direction} />
            </div>
            <div style={styles.metricPrev}>prev: {m.prev}</div>
            {m.flagged && <div style={styles.flagBar} />}
          </div>
        ))}
      </div>
      <div style={styles.clientCardFooter}>
        <button style={styles.reportLink}>View Full Report →</button>
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
    padding: '24px 40px 60px',
  },
  alertStrip: {
    display: 'flex',
    gap: '12px',
    marginBottom: '32px',
    flexWrap: 'wrap',
  },
  alertCard: {
    background: 'rgba(201,168,76,0.08)',
    border: '1px solid rgba(201,168,76,0.25)',
    borderRadius: '4px',
    padding: '16px 18px',
    flex: '1 1 340px',
    minWidth: '300px',
  },
  alertTop: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '8px',
  },
  alertClient: {
    fontFamily: 'var(--font-body)',
    fontSize: '12px',
    fontWeight: '600',
    color: 'var(--color-text-primary)',
  },
  alertDate: {
    fontFamily: 'var(--font-body)',
    fontSize: '11px',
    fontWeight: '300',
    color: 'var(--color-text-tertiary)',
    marginLeft: '6px',
    fontStyle: 'italic',
  },
  alertMessage: {
    fontFamily: 'var(--font-body)',
    fontSize: '13px',
    fontWeight: '500',
    color: 'var(--color-text-primary)',
    lineHeight: '1.5',
    marginBottom: '4px',
  },
  alertAction: {
    fontFamily: 'var(--font-body)',
    fontSize: '12.5px',
    fontWeight: '300',
    color: 'var(--color-text-secondary)',
    lineHeight: '1.5',
    fontStyle: 'italic',
  },
  clientCards: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  clientCard: {
    background: 'var(--color-white)',
    border: '1px solid var(--color-border)',
    borderRadius: '4px',
    padding: '24px 28px',
  },
  clientCardHeader: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '12px',
    marginBottom: '20px',
    paddingBottom: '16px',
    borderBottom: '1px solid var(--color-border-subtle)',
  },
  clientCardName: {
    fontFamily: 'var(--font-display)',
    fontSize: '26px',
    fontWeight: '400',
    color: 'var(--color-text-primary)',
  },
  clientCardPeriod: {
    fontFamily: 'var(--font-body)',
    fontSize: '12px',
    fontWeight: '300',
    color: 'var(--color-text-tertiary)',
    fontStyle: 'italic',
  },
  metricsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '16px',
    marginBottom: '20px',
  },
  metricTile: {
    padding: '14px 16px',
    background: 'var(--color-cream)',
    border: '1px solid var(--color-border-subtle)',
    borderRadius: '3px',
    position: 'relative',
    overflow: 'hidden',
  },
  metricFlagged: {
    background: 'rgba(201,168,76,0.06)',
    borderColor: 'rgba(201,168,76,0.2)',
  },
  flagBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '2px',
    background: 'var(--color-gold)',
    opacity: 0.5,
  },
  metricLabel: {
    fontFamily: 'var(--font-body)',
    fontSize: '10px',
    fontWeight: '600',
    letterSpacing: '0.07em',
    textTransform: 'uppercase',
    color: 'var(--color-text-tertiary)',
    marginBottom: '8px',
  },
  metricValue: {
    fontFamily: 'var(--font-display)',
    fontSize: '24px',
    fontWeight: '400',
    color: 'var(--color-text-primary)',
    display: 'flex',
    alignItems: 'center',
    marginBottom: '4px',
  },
  metricPrev: {
    fontFamily: 'var(--font-body)',
    fontSize: '10.5px',
    fontWeight: '300',
    color: 'var(--color-text-tertiary)',
  },
  clientCardFooter: {
    borderTop: '1px solid var(--color-border-subtle)',
    paddingTop: '14px',
  },
  reportLink: {
    fontFamily: 'var(--font-body)',
    fontSize: '12px',
    fontWeight: '400',
    color: 'var(--color-brown-mid)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '0',
    letterSpacing: '0.02em',
    transition: 'color 200ms ease',
  },
}
