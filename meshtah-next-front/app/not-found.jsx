import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='flex flex-col md:flex-row gap-8 md:my-16 md:mx-64 p-8 bg-white/70 md:rounded-lg shadow-md'>
      <h2 className='font-bold text-3xl'>چارصدچار</h2>
      <p className='poem'>
      هیچ از مقصود اثر 
      <strong> پیدا نشد </strong>
      <br /> <br />
      زان غرض غیر خبر 
      <strong> پیدا نشد </strong>
      </p>
      <Link className='text-niceblue hover:underline' href="/">برگشت به درگاه</Link>
      
    </div>
    
  )
}