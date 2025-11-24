import localFont from 'next/font/local';
import Link from 'next/link';
const API = process.env.NEXT_PUBLIC_API;
export const dynamic = "force-dynamic";




async function getAllPoems() {
    const poemsPromise = await fetch(`${API}poems?populate[0]=image&populate[1]=writers`)
    const poems = await poemsPromise.json()
    return poems.data
}

const amiri = localFont({
  src: '../../public/fonts/Amiri-Regular.ttf',
  variable: '--font-amiri',
});

export default async function Page() {
    const poems = await getAllPoems();
    
    const allPosts = [
        ...poems.map(poem => ({ 
            ...poem, 
            type: 'poem',
            url: `/poems/${poem.slug}`
        }))
    ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    return (
        <div>
            <div className="all-posts md:my-16 md:mx-64 p-8 bg-white/70 md:rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">اشعار</h2>
                
                <div className="grid grid-cols-1 gap-6 text-white">
                    {allPosts.map((post) => (
                        <div key={post.id} className="card border rounded-lg hover:shadow-2xl transition-shadow relative">
                            <Link href={post.url}>
                                <span className='pubdate absolute bg-dustyred z-10 p-1 rounded left-2 top-2'>
                                    {new Date(post.createdAt || post.attributes?.createdAt).toLocaleDateString('fa-IR', {year: 'numeric', month: 'long', day: 'numeric'})}
                                </span>
                                
                                <img 
                                    src={`http://localhost:1337${post.image?.formats?.thumbnail?.url || post.attributes?.image?.data?.attributes?.formats?.thumbnail?.url}`} 
                                    alt={post.name || post.attributes?.name} 
                                    className="inline-block md:max-w-[40%] sm:w-full object-cover"
                                />

                                <div className='md:inline-block max-w-[60%] text-black align-top px-4 py-12 text-lg h-full bg-white sm:none'>
                                    <p>
                                        {post.description}
                                    </p>
                                        
                                </div>
                                
                                <div className='details p-2 bg-dustyred rounded-t-xl'>
                                    <span className="text-md md:text-xl font-semibold">
                                        {post.name || post.attributes?.name} - {(post.writers ?? []).map(w => w.name).join(", ")}
                                    </span>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}