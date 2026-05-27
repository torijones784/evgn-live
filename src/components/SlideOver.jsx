import React, { useEffect } from 'react'

export default function SlideOver({ open, onClose, title, subtitle, children, width = '520px' }) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  return (
    <>
      <div className="overlay" onClick={onClose} />
      <div style={{ ...styles.panel, width, maxWidth: '95vw' }}>
        <div style={styles.header}>
          <div>
            {subtitle && <div style={styles.subtitle}>{subtitle}</div>}
            <h2 style={styles.title}>{title}</h2>
          </div>
          <button onClick={onClose} style={styles.closeBtn} aria-label="Close">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
        <div style={styles.body}>
          {children}
        </div>
      </div>
    </>
  )
}

const styles = {
  panel: {
    position: 'fixed',
    top: 0,
    right: 0,
    height: '100vh',
    background: 'var(--color-white)',
    zIndex: 50,
    display: 'flex',
    flexDirection: 'column',
    animation: 'slideInRight 280ms cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '-4px 0 32px rgba(44, 24, 16, 0.12)',
  },
  header: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: '28px 32px 24px',
    borderBottom: '1px solid var(--color-border-subtle)',
    gap: '16px',
  },
  subtitle: {
    fontFamily: 'var(--font-body)',
    fontSize: '10px',
    fontWeight: '600',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: 'var(--color-text-tertiary)',
    marginBottom: '6px',
  },
  title: {
    fontFamily: 'var(--font-display)',
    fontSize: '22px',
    fontWeight: '400',
    color: 'var(--color-text-primary)',
    lineHeight: '1.2',
  },
  closeBtn: {
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--color-text-tertiary)',
    background: 'var(--color-cream)',
    border: '1px solid var(--color-border)',
    borderRadius: '50%',
    cursor: 'pointer',
    flexShrink: 0,
    transition: 'color 200ms ease',
    marginTop: '2px',
  },
  body: {
    flex: 1,
    overflowY: 'auto',
    padding: '28px 32px',
  },
}
