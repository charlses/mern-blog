import { Button } from './components/ui/button'
import { useState } from 'react'

const App = () => {
  const [counter, setCounter] = useState(0)

  const increment = () => setCounter((prev) => prev + 1)
  const decrement = () => setCounter((prev) => prev - 1)
  return (
    <div>
      <Button variant='outline' onClick={increment}>
        +
      </Button>
      {counter}
      <Button variant='outline' onClick={decrement}>
        -
      </Button>
    </div>
  )
}

export default App
