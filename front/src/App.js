import React, { useState } from 'react'

import FooterMenu from './components/FooterMenu'

function App() {
  const handleMenuClick = (action) => {
    return () => {
      console.log(action, 'clicked')
    }
  }

  return (
    <div className="content">
      <h1>Content comes here</h1>

      <FooterMenu handleClick={handleMenuClick}/>
    </div>
  )
}

export default App;
