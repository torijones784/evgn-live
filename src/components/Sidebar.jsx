import React from 'react'

const NAV = [
  {
    key: 'home',
    label: 'Home',
    path: '/',
    phase: 1,
  },
  {
    key: 'intake',
    label: 'Intake',
    children: [
      { key: 'pipeline', label: 'Pipeline', path: '/intake/pipeline', phase: 1 },
      { key: 'knowledge-base', label: 'Knowledge Base', path: '/intake/knowledge-base', phase: 1 },
    ],
  },
  {
    key: 'operations',
    label: 'Operations',
    children: [
      { key: 'ops-all', label: 'All Clients', path: '/operations/all', phase: 1 },
      { key: 'ops-client', label: 'Client View', path: '/operations/client', phase: 1 },
    ],
  },
  {
    key: 'marketing',
    label: 'Marketing',
    children: [
      { key: 'mkt-all', label: 'All Clients', path: '/marketing/all', phase: 1 },
      { key: 'mkt-client', label: 'Client View', path: '/marketing/client', phase: 1 },
    ],
  },
  {
    key: 'finance',
    label: 'Finance',
    phase: 2,
    children: [
      { key: 'finance-all', label: 'All Clients', path: '/finance', phase: 2 },
    ],
  },
  {
    key: 'coo',
    label: 'COO Suite',
    phase: 2,
    children: [
      { key: 'coo-scaling', label: 'Scaling Infrastructure', path: '/coo', phase: 2 },
    ],
  },
]

export default function Sidebar({ currentPath, onNavigate, activeClient, onClientChange, clients }) {
  return (
    <aside style={styles.sidebar}>
      <div style={styles.wordmark} onClick={() => onNavigate('/')}>
        evgn
      </div>

      <div style={styles.clientSwitcher}>
        <div style={styles.clientLabel}>Viewing</div>
        <select
          value={activeClient}
          onChange={e => onClientChange(e.target.value)}
          style={styles.clientSelect}
        >
          {clients.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <nav style={styles.nav}>
        {NAV.map(section => (
          <div key={section.key} style={styles.navSection}>
            {!section.children ? (
              <NavItem
                label={section.label}
                phase={section.phase}
                active={currentPath === section.path}
                onClick={() => onNavigate(section.path)}
              />
            ) : (
              <>
                <div style={styles.navGroupLabel}>{section.label}</div>
                {section.children.map(child => (
                  <NavItem
                    key={child.key}
                    label={child.label}
                    phase={child.phase}
                    active={currentPath === child.path}
                    onClick={() => child.phase !== 2 && onNavigate(child.path)}
                    indent
                  />
                ))}
              </>
            )}
          </div>
        ))}
      </nav>

      <div style={styles.footer}>
        <div style={styles.footerDot} />
        <span style={styles.footerText}>Phase 1</span>
      </div>
    </aside>
  )
}

function NavItem({ label, phase, active, onClick, indent }) {
  const isP2 = phase === 2
  return (
    <button
      onClick={onClick}
      style={{
        ...styles.navItem,
        ...(indent ? styles.navItemIndent : {}),
        ...(active ? styles.navItemActive : {}),
        ...(isP2 ? styles.navItemP2 : {}),
      }}
    >
      {active && <span style={styles.activeBar} />}
      <span style={styles.navItemText}>{label}</span>
      {isP2 && <span style={styles.p2Badge}>Phase 2</span>}
    </button>
  )
}

const styles = {
  sidebar: {
    width: '220px',
    minWidth: '220px',
    height: '100vh',
    background: 'var(--color-brown-deep)',
    display: 'flex',
    flexDirection: 'column',
    padding: '0',
    position: 'sticky',
    top: 0,
    overflowY: 'auto',
  },
  wordmark: {
    fontFamily: 'var(--font-display)',
    fontSize: '22px',
    fontWeight: '400',
    color: 'var(--color-cream)',
    letterSpacing: '0.1em',
    padding: '28px 24px 20px',
    cursor: 'pointer',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
  },
  clientSwitcher: {
    padding: '16px 24px',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
  },
  clientLabel: {
    fontFamily: 'var(--font-body)',
    fontSize: '9px',
    fontWeight: '600',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: 'rgba(248,244,238,0.35)',
    marginBottom: '6px',
  },
  clientSelect: {
    background: 'rgba(255,255,255,0.07)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '4px',
    color: 'var(--color-cream)',
    fontFamily: 'var(--font-body)',
    fontSize: '12px',
    fontWeight: '400',
    padding: '6px 8px',
    width: '100%',
    cursor: 'pointer',
    appearance: 'none',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='rgba(248,244,238,0.4)' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 10px center',
    paddingRight: '28px',
  },
  nav: {
    flex: 1,
    padding: '12px 0',
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  navSection: {
    marginBottom: '4px',
  },
  navGroupLabel: {
    fontFamily: 'var(--font-body)',
    fontSize: '9px',
    fontWeight: '600',
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    color: 'rgba(248,244,238,0.3)',
    padding: '10px 24px 4px',
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    padding: '8px 24px',
    fontFamily: 'var(--font-body)',
    fontSize: '12px',
    fontWeight: '400',
    letterSpacing: '0.03em',
    color: 'rgba(248,244,238,0.55)',
    textAlign: 'left',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    position: 'relative',
    transition: 'color 200ms ease, background 200ms ease',
    minHeight: '36px',
    borderRadius: '2px',
  },
  navItemIndent: {
    paddingLeft: '32px',
    fontSize: '11.5px',
  },
  navItemActive: {
    color: 'var(--color-cream)',
    background: 'rgba(248,244,238,0.07)',
  },
  navItemP2: {
    opacity: 0.45,
    cursor: 'default',
  },
  navItemText: {
    flex: 1,
  },
  activeBar: {
    position: 'absolute',
    left: 0,
    top: '50%',
    transform: 'translateY(-50%)',
    width: '2px',
    height: '60%',
    background: 'var(--color-gold)',
    borderRadius: '0 2px 2px 0',
  },
  p2Badge: {
    fontSize: '9px',
    fontWeight: '500',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    color: 'rgba(248,244,238,0.3)',
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.1)',
    padding: '1px 5px',
    borderRadius: '10px',
    flexShrink: 0,
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '16px 24px',
    borderTop: '1px solid rgba(255,255,255,0.06)',
  },
  footerDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: 'var(--color-sage)',
    flexShrink: 0,
  },
  footerText: {
    fontFamily: 'var(--font-body)',
    fontSize: '10px',
    fontWeight: '500',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: 'rgba(248,244,238,0.3)',
  },
}
