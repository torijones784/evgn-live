import React, { useState } from 'react'
import Sidebar from './components/Sidebar'
import Home from './pages/Home'
import Pipeline from './pages/intake/Pipeline'
import KnowledgeBase from './pages/intake/KnowledgeBase'
import OperationsAll from './pages/operations/OperationsAll'
import OperationsClient from './pages/operations/OperationsClient'
import MarketingAll from './pages/marketing/MarketingAll'
import MarketingClient from './pages/marketing/MarketingClient'
import { CLIENTS } from './data/mockData'

export default function App() {
  const [currentPath, setCurrentPath] = useState('/')
  const [activeClient, setActiveClient] = useState('My Neighbors')

  function renderPage() {
    switch (currentPath) {
      case '/':
        return <Home activeClient={activeClient} />
      case '/intake/pipeline':
        return <Pipeline />
      case '/intake/knowledge-base':
        return <KnowledgeBase />
      case '/operations/all':
        return <OperationsAll />
      case '/operations/client':
        return <OperationsClient activeClient={activeClient} />
      case '/marketing/all':
        return <MarketingAll />
      case '/marketing/client':
        return <MarketingClient activeClient={activeClient} />
      default:
        return <Home activeClient={activeClient} />
    }
  }

  return (
    <div style={styles.shell}>
      <Sidebar
        currentPath={currentPath}
        onNavigate={setCurrentPath}
        activeClient={activeClient}
        onClientChange={setActiveClient}
        clients={CLIENTS}
      />
      <main style={styles.main} key={currentPath + activeClient}>
        {renderPage()}
      </main>
    </div>
  )
}

const styles = {
  shell: {
    display: 'flex',
    height: '100vh',
    overflow: 'hidden',
    background: 'var(--color-cream)',
  },
  main: {
    flex: 1,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    animation: 'pageFadeIn 180ms ease',
  },
}
