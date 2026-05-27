import React from 'react'
import { marketingMetrics, marketingClientView } from '../../data/mockData'

function TrendArrow({ direction }) {
  const isGood = direction === 'up' || direction === 'down-good'
  const isBad = direction === 'down' || direction === 'up-bad'
  const color = isGood ? '#5a7a58' : isBad ? '#8a4030' : 'var(--color-text-tertiary)'
  if (direction === 'flat') return <span style={{ color, marginLeft: '4px', fontSize: '12px' }}>→</span>
  return (
    <svg width="11" height="11" viewBox="0 0 10 10" fill="none" style={{ display: 'inline-block', marginLeft: '4px', verticalAlign: 'middle' }}>
      {isGood ? (
        <path d="M5 8V2M2 5l3-3 3 3" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      ) : (
        <path d="M5 2v6M2 5l3 3 3-3" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      )}
    </svg>
  )
}

export default function MarketingClient({ activeClient }) {
  const metrics = marketingMetrics[activeClient] || marketingMetrics['My Neighbors']
  const view = marketingClientView[activeClient] || marketingClientView['My Neighbors']

  return (
    <div style={styles.page} className="page-enter">
      <div style={styles.topBar}>
        <div>
          <div style={styles.pageLabel}>Marketing</div>
          <h1 style={styles.pageTitle}>Marketing Performance</h1>
          <div style={styles.sprintLabel}>{activeClient} · {metrics.period}</div>
        </div>
        <span className="phase-badge phase-badge--live">Live · Phase 1</span>
      </div>

      <div style={styles.content}>
        <p style={styles.lede}>{view.lede}</p>

        <div style={styles.metricsRow}>
          {metrics.metrics.map((m, i) => (
            <div key={i} style={{ ...styles.metricTile, ...(m.flagged ? styles.metricFlagged : {}) }}>
              <div style={styles.metricLabel}>{m.label}</div>
              <div style={styles.metricValue}>
                {m.value}
                <TrendArrow direction={m.direction} />
              </div>
              <div style={styles.metricPrev}>prev {m.prev}</div>
              {m.flagged && <div style={styles.flagBar} />}
            </div>
          ))}
        </div>

        <div style={styles.campaignCard}>
          <div style={styles.campaignHeader}>
            <div style={styles.campaignLabel}>Active Campaign</div>
            <h2 style={styles.campaignName}>{view.campaign.name}</h2>
          </div>
          <div style={styles.campaignBody}>
            <div style={styles.campaignMeta}>
              <CampaignRow label="Objective" value={view.campaign.objective} />
              <CampaignRow label="Timeline" value={view.campaign.timeline} />
              <CampaignRow label="Status" value={view.campaign.status} />
            </div>
            <div style={styles.campaignChannels}>
              <div style={styles.campaignChannelLabel}>Channels</div>
              {view.campaign.channels.map((ch, i) => (
                <div key={i} style={styles.campaignChannel}>
                  <span style={styles.channelDot} />
                  {ch}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={styles.channelBreakdown}>
          <div style={styles.breakdownLabel}>Channel Performance</div>
          <div style={styles.channelBars}>
            {view.channels.map((ch, i) => (
              <div key={i} style={styles.channelRow}>
                <div style={styles.channelName}>{ch.name}</div>
                <div style={styles.channelBarWrap}>
                  <div style={styles.channelBarTrack}>
                    <div style={{ ...styles.channelBarFill, width: `${ch.performance}%` }} />
                  </div>
                  <span style={styles.channelPerf}>{ch.performance}%</span>
                </div>
                <div style={styles.channelAlloc}>{ch.allocation}% budget</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function CampaignRow({ label, value }) {
  return (
    <div style={styles.campaignMetaRow}>
      <span style={styles.campaignMetaLabel}>{label}</span>
      <span style={styles.campaignMetaValue}>{value}</span>
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
  },
  lede: {
    fontFamily: 'var(--font-display)',
    fontSize: '18px',
    fontWeight: '300',
    fontStyle: 'italic',
    color: 'var(--color-text-secondary)',
    lineHeight: '1.5',
    marginBottom: '32px',
    maxWidth: '640px',
  },
  metricsRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '16px',
    marginBottom: '32px',
  },
  metricTile: {
    background: 'var(--color-white)',
    border: '1px solid var(--color-border)',
    borderRadius: '4px',
    padding: '20px 20px 18px',
    position: 'relative',
    overflow: 'hidden',
  },
  metricFlagged: {
    background: 'rgba(201,168,76,0.05)',
    borderColor: 'rgba(201,168,76,0.22)',
  },
  flagBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '2px',
    background: 'rgba(201,168,76,0.6)',
  },
  metricLabel: {
    fontFamily: 'var(--font-body)',
    fontSize: '10px',
    fontWeight: '600',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: 'var(--color-text-tertiary)',
    marginBottom: '10px',
  },
  metricValue: {
    fontFamily: 'var(--font-display)',
    fontSize: '28px',
    fontWeight: '400',
    color: 'var(--color-text-primary)',
    display: 'flex',
    alignItems: 'center',
    lineHeight: '1',
    marginBottom: '6px',
  },
  metricPrev: {
    fontFamily: 'var(--font-body)',
    fontSize: '11px',
    fontWeight: '300',
    color: 'var(--color-text-tertiary)',
  },
  campaignCard: {
    background: 'var(--color-white)',
    border: '1px solid var(--color-border)',
    borderRadius: '4px',
    marginBottom: '24px',
    overflow: 'hidden',
  },
  campaignHeader: {
    padding: '22px 26px 18px',
    borderBottom: '1px solid var(--color-border-subtle)',
  },
  campaignLabel: {
    fontFamily: 'var(--font-body)',
    fontSize: '10px',
    fontWeight: '600',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: 'var(--color-text-tertiary)',
    marginBottom: '8px',
  },
  campaignName: {
    fontFamily: 'var(--font-display)',
    fontSize: '22px',
    fontWeight: '400',
    color: 'var(--color-text-primary)',
  },
  campaignBody: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '0',
  },
  campaignMeta: {
    padding: '20px 26px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    borderRight: '1px solid var(--color-border-subtle)',
  },
  campaignMetaRow: {
    display: 'flex',
    gap: '12px',
  },
  campaignMetaLabel: {
    fontFamily: 'var(--font-body)',
    fontSize: '10px',
    fontWeight: '600',
    letterSpacing: '0.07em',
    textTransform: 'uppercase',
    color: 'var(--color-text-tertiary)',
    width: '72px',
    flexShrink: 0,
    paddingTop: '2px',
  },
  campaignMetaValue: {
    fontFamily: 'var(--font-body)',
    fontSize: '13px',
    fontWeight: '300',
    color: 'var(--color-text-primary)',
    lineHeight: '1.5',
  },
  campaignChannels: {
    padding: '20px 26px',
  },
  campaignChannelLabel: {
    fontFamily: 'var(--font-body)',
    fontSize: '10px',
    fontWeight: '600',
    letterSpacing: '0.07em',
    textTransform: 'uppercase',
    color: 'var(--color-text-tertiary)',
    marginBottom: '12px',
  },
  campaignChannel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontFamily: 'var(--font-body)',
    fontSize: '13px',
    fontWeight: '300',
    color: 'var(--color-text-primary)',
    marginBottom: '8px',
  },
  channelDot: {
    display: 'inline-block',
    width: '5px',
    height: '5px',
    borderRadius: '50%',
    background: 'var(--color-sage)',
    flexShrink: 0,
  },
  channelBreakdown: {
    background: 'var(--color-white)',
    border: '1px solid var(--color-border)',
    borderRadius: '4px',
    padding: '22px 26px',
  },
  breakdownLabel: {
    fontFamily: 'var(--font-body)',
    fontSize: '10px',
    fontWeight: '600',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: 'var(--color-text-tertiary)',
    marginBottom: '20px',
  },
  channelBars: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  },
  channelRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  channelName: {
    fontFamily: 'var(--font-body)',
    fontSize: '12.5px',
    fontWeight: '400',
    color: 'var(--color-text-primary)',
    width: '110px',
    flexShrink: 0,
  },
  channelBarWrap: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    flex: 1,
  },
  channelBarTrack: {
    flex: 1,
    height: '4px',
    background: 'var(--color-border)',
    borderRadius: '2px',
    overflow: 'hidden',
  },
  channelBarFill: {
    height: '100%',
    background: 'var(--color-gold-muted)',
    borderRadius: '2px',
    transition: 'width 600ms ease',
  },
  channelPerf: {
    fontFamily: 'var(--font-body)',
    fontSize: '11.5px',
    fontWeight: '500',
    color: 'var(--color-text-secondary)',
    width: '36px',
    textAlign: 'right',
  },
  channelAlloc: {
    fontFamily: 'var(--font-body)',
    fontSize: '11px',
    fontWeight: '300',
    color: 'var(--color-text-tertiary)',
    width: '72px',
    flexShrink: 0,
    textAlign: 'right',
  },
}
