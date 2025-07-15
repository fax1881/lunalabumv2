'use client'
import { useRouter } from 'next/navigation'
import PhotoEditor from '../../../components/PhotoEditor'

export default function EditorPage(){
  const router=useRouter()
  return <div className="p-4 max-w-4xl mx-auto">
    <PhotoEditor onComplete={(file)=>{
      // TODO: upload to storage then add to cart
      console.log('Design ready',file)
      router.push('/sepet')
    }} />
  </div>
} 