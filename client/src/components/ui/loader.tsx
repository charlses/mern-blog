import { LoaderCircle } from 'lucide-react'
const Loader = () => {
  return (
    <div className='flex items-center justify-center gap-4'>
      <LoaderCircle className={`w-6 h-6 animate-spin`} />
      <p>Loading...</p>
    </div>
  )
}

export default Loader
