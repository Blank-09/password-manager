import React from 'react'
import { CommandDialogDemo } from './components/Command'

function App(): JSX.Element {
  return (
    <div className="flex justify-center p-10 items-start">
      {/* <h1 className="text-5xl">Hello Password Manager 👋</h1> */}
      <CommandDialogDemo />
    </div>
  )
}

export default App
