import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Home from './Home'
import DeveryExplorer from './Explorer'

function App() {
  return (
    <Router>
      <Route exact path='/' component={Home} />
      <Route path='/explorer' component={DeveryExplorer} />
    </Router>
  )
}

export default App;
