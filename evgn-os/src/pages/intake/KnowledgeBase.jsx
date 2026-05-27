import React, { useState } from 'react'
import { knowledgeBase } from '../../data/mockData'

const SECTIONS = ['The Business as It Exists Today', 'Growth Drivers and Tradeoffs', 'Constraints and Leverage', '2025 Learnings', 'Looking Ahead']

export default function KnowledgeBase() {
  const [selected, setSelected] = useState(knowledgeBase.questions.find(q => q.answered)?.id || null)
  const kb = knowledgeBase
  const selectedQ = kb.questions.find(q => q.id === selected)

  return (
    <div style={styles.page} className="page-enter">
      <div style={styles.topBar}>
        <div>
          <div style={styles.pageLabel}>Intake</div>
          <h1 style={styles.pageTitle}>Knowledge Base</h1>
        </div>
        <div style={styles.topRight}>
          <span className="phase-badge phase-badge--live">Live · Phase 1</span>
        </div>
      </div>

      <div style={styles.transcriptBanner}>
        <div style={styles.transcriptLeft}>
          <div style={styles.transcriptIcon}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="1.5" y="1.5" width="11" height="11" rx="1.5" stroke="var(--color-sage)" strokeWidth="1.3"/>
              <path d="M4 5h6M4 7.5h4" stroke="var(--color-sage)" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <div style={styles.transcriptTitle}>
              Otter.ai transcript uploaded — {kb.transcript.name}, {kb.transcript.date}
            </div>
            <div style={styles.transcriptSub}>
              <span style={styles.transcriptCount}>{kb.answered} of {kb.total}</span> priority questions addressed
            </div>
          </div>
        </div>
        <button style={styles.uploadBtn}>
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none" style={{ marginRight: '6px' }}>
            <path d="M5.5 7.5V2M3 4.5l2.5-2.5 2.5 2.5M2 9.5h7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Upload New Transcript
        </button>
      </div>

      <div style={styles.layout}>
        <div style={styles.questionPanel}>
          <div style={styles.questionPanelHeader}>Strategic Planning Questions</div>
          {SECTIONS.map(section => {
            const qs = kb.questions.filter(q => q.section === section)
            return (
              <div key={section} style={styles.questionSection}>
                <div style={styles.questionSectionLabel}>{section}</div>
                {qs.map(q => (
                  <button
                    key={q.id}
                    style={{
                      ...styles.questionItem,
                      ...(selected === q.id ? styles.questionItemActive : {}),
                    }}
                    onClick={() => setSelected(q.id)}
                  >
                    <span style={styles.questionIndicator}>
                      {q.answered ? (
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <circle cx="5" cy="5" r="4.25" fill="rgba(139,158,137,0.18)" stroke="var(--color-sage)" strokeWidth="1.1"/>
                          <path d="M3 5l1.5 1.5L7 3.5" stroke="var(--color-sage)" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      ) : (
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <circle cx="5" cy="5" r="4.25" stroke="var(--color-border)" strokeWidth="1.1"/>
                        </svg>
                      )}
                    </span>
                    <span style={styles.questionText}>{q.question}</span>
                  </button>
                ))}
              </div>
            )
          })}
        </div>

        <div style={styles.answerPanel}>
          {selectedQ ? (
            <AnswerView question={selectedQ} transcript={kb.transcript} />
          ) : (
            <div style={styles.emptyAnswer}>
              <div style={styles.emptyAnswerIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="3" width="18" height="18" rx="2" stroke="var(--color-border)" strokeWidth="1.5"/>
                  <path d="M8 9h8M8 12h5" stroke="var(--color-border)" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <p style={styles.emptyAnswerText}>Select a question to view extracted insights</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function AnswerView({ question, transcript }) {
  return (
    <div style={styles.answerView}>
      <div style={styles.answerSection}>
        <div style={styles.answerSectionLabel}>{question.section}</div>
        <h2 style={styles.answerQuestion}>{question.question}</h2>
      </div>

      {question.answered ? (
        <div style={styles.answerExtracted}>
          <div style={styles.extractedHeader}>
            <span style={styles.extractedBadge}>
              <svg width="9" height="9" viewBox="0 0 9 9" fill="none" style={{ marginRight: '4px' }}>
                <circle cx="4.5" cy="4.5" r="3.75" fill="var(--color-sage)" fillOpacity="0.2" stroke="var(--color-sage)" strokeWidth="1"/>
                <path d="M2.5 4.5l1.5 1.5L6.5 3" stroke="var(--color-sage)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Extracted from transcript
            </span>
            <span style={styles.extractedMeta}>— {transcript.name}, {transcript.date}</span>
          </div>
          <blockquote style={styles.answerBlockquote}>
            {question.excerpt}
          </blockquote>
          <div style={styles.answerActions}>
            <button style={styles.answerActionBtn}>Add Note</button>
            <button style={styles.answerActionBtn}>Flag for Follow-up</button>
          </div>
        </div>
      ) : (
        <div style={styles.answerMissing}>
          <div style={styles.missingIcon}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="6.5" stroke="var(--color-border)" strokeWidth="1.25"/>
              <path d="M8 5v4M8 11v.5" stroke="var(--color-text-tertiary)" strokeWidth="1.25" strokeLinecap="round"/>
            </svg>
          </div>
          <p style={styles.missingText}>Not addressed in transcript.</p>
          <p style={styles.missingSubText}>Consider asking in next session.</p>
          <button style={styles.addToAgendaBtn}>Add to Next Agenda</button>
        </div>
      )}
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
  transcriptBanner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '16px',
    margin: '24px 40px 0',
    background: 'rgba(139,158,137,0.08)',
    border: '1px solid rgba(139,158,137,0.2)',
    borderRadius: '4px',
    padding: '14px 18px',
    flexShrink: 0,
  },
  transcriptLeft: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
  },
  transcriptIcon: {
    marginTop: '2px',
    flexShrink: 0,
  },
  transcriptTitle: {
    fontFamily: 'var(--font-body)',
    fontSize: '13px',
    fontWeight: '500',
    color: 'var(--color-text-primary)',
    marginBottom: '3px',
  },
  transcriptSub: {
    fontFamily: 'var(--font-body)',
    fontSize: '12px',
    fontWeight: '300',
    color: 'var(--color-text-secondary)',
  },
  transcriptCount: {
    fontWeight: '500',
    color: 'var(--color-sage)',
  },
  uploadBtn: {
    display: 'flex',
    alignItems: 'center',
    fontFamily: 'var(--font-body)',
    fontSize: '12px',
    fontWeight: '500',
    color: 'var(--color-brown-deep)',
    background: 'var(--color-white)',
    border: '1px solid var(--color-border)',
    borderRadius: '3px',
    padding: '8px 14px',
    cursor: 'pointer',
    flexShrink: 0,
    whiteSpace: 'nowrap',
    transition: 'background 200ms ease',
  },
  layout: {
    flex: 1,
    display: 'flex',
    gap: '0',
    overflow: 'hidden',
    margin: '20px 40px 40px',
    border: '1px solid var(--color-border)',
    borderRadius: '4px',
    background: 'var(--color-white)',
  },
  questionPanel: {
    width: '360px',
    flexShrink: 0,
    borderRight: '1px solid var(--color-border-subtle)',
    overflowY: 'auto',
    padding: '0 0 24px',
  },
  questionPanelHeader: {
    fontFamily: 'var(--font-body)',
    fontSize: '10px',
    fontWeight: '600',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: 'var(--color-text-tertiary)',
    padding: '20px 20px 12px',
    borderBottom: '1px solid var(--color-border-subtle)',
    position: 'sticky',
    top: 0,
    background: 'var(--color-white)',
    zIndex: 1,
  },
  questionSection: {
    padding: '16px 0 4px',
  },
  questionSectionLabel: {
    fontFamily: 'var(--font-body)',
    fontSize: '9.5px',
    fontWeight: '600',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: 'var(--color-text-tertiary)',
    padding: '0 20px 8px',
    opacity: 0.7,
  },
  questionItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '10px',
    width: '100%',
    padding: '10px 20px',
    textAlign: 'left',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    transition: 'background 150ms ease',
    borderLeft: '2px solid transparent',
  },
  questionItemActive: {
    background: 'var(--color-cream)',
    borderLeftColor: 'var(--color-gold)',
  },
  questionIndicator: {
    flexShrink: 0,
    marginTop: '2px',
  },
  questionText: {
    fontFamily: 'var(--font-body)',
    fontSize: '12.5px',
    fontWeight: '400',
    color: 'var(--color-text-primary)',
    lineHeight: '1.5',
  },
  answerPanel: {
    flex: 1,
    overflowY: 'auto',
    padding: '32px',
  },
  emptyAnswer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    gap: '12px',
    opacity: 0.5,
  },
  emptyAnswerIcon: {},
  emptyAnswerText: {
    fontFamily: 'var(--font-body)',
    fontSize: '13px',
    color: 'var(--color-text-tertiary)',
    fontStyle: 'italic',
  },
  answerView: {},
  answerSection: {
    marginBottom: '24px',
  },
  answerSectionLabel: {
    fontFamily: 'var(--font-body)',
    fontSize: '9.5px',
    fontWeight: '600',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: 'var(--color-text-tertiary)',
    marginBottom: '8px',
  },
  answerQuestion: {
    fontFamily: 'var(--font-display)',
    fontSize: '20px',
    fontWeight: '400',
    color: 'var(--color-text-primary)',
    lineHeight: '1.35',
  },
  answerExtracted: {
    background: 'var(--color-cream)',
    border: '1px solid var(--color-border-subtle)',
    borderRadius: '4px',
    padding: '20px 22px',
  },
  extractedHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '14px',
  },
  extractedBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    fontFamily: 'var(--font-body)',
    fontSize: '10px',
    fontWeight: '600',
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    color: 'var(--color-sage)',
  },
  extractedMeta: {
    fontFamily: 'var(--font-body)',
    fontSize: '11px',
    fontWeight: '300',
    color: 'var(--color-text-tertiary)',
    fontStyle: 'italic',
  },
  answerBlockquote: {
    fontFamily: 'var(--font-display)',
    fontSize: '17px',
    fontWeight: '400',
    fontStyle: 'italic',
    color: 'var(--color-text-primary)',
    lineHeight: '1.65',
    borderLeft: '3px solid var(--color-gold-muted)',
    paddingLeft: '18px',
    margin: '0 0 16px',
  },
  answerActions: {
    display: 'flex',
    gap: '8px',
  },
  answerActionBtn: {
    fontFamily: 'var(--font-body)',
    fontSize: '11.5px',
    fontWeight: '400',
    color: 'var(--color-text-secondary)',
    background: 'var(--color-white)',
    border: '1px solid var(--color-border)',
    borderRadius: '3px',
    padding: '6px 12px',
    cursor: 'pointer',
    transition: 'background 200ms ease',
  },
  answerMissing: {
    background: 'var(--color-cream)',
    border: '1px solid var(--color-border-subtle)',
    borderRadius: '4px',
    padding: '28px 24px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '6px',
  },
  missingIcon: {
    marginBottom: '4px',
  },
  missingText: {
    fontFamily: 'var(--font-body)',
    fontSize: '14px',
    fontWeight: '400',
    color: 'var(--color-text-secondary)',
  },
  missingSubText: {
    fontFamily: 'var(--font-body)',
    fontSize: '13px',
    fontWeight: '300',
    color: 'var(--color-text-tertiary)',
    fontStyle: 'italic',
    marginBottom: '12px',
  },
  addToAgendaBtn: {
    fontFamily: 'var(--font-body)',
    fontSize: '12px',
    fontWeight: '500',
    color: 'var(--color-brown-deep)',
    background: 'var(--color-white)',
    border: '1px solid var(--color-border)',
    borderRadius: '3px',
    padding: '7px 14px',
    cursor: 'pointer',
    transition: 'background 200ms ease',
  },
}
