import { useState } from 'react'
import './App.css'

function App() {
  const [name, setName] = useState("les gens !")

  return (
      <>
          <h1 className="text-3xl font-bold underline">
              Hello {name}
          </h1>
          <button onClick={() => setName("World !")}>Test</button>
      </>
  )
}

export default App
