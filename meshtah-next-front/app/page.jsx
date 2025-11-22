import localFont from 'next/font/local';
import Link from 'next/link';
const API = process.env.NEXT_PUBLIC_API;
export const dynamic = "force-dynamic";


async function getAllArticles() {
    const articlesPromise = await fetch(`${API}/api/articles?populate[0]=image&populate[1]=writers&pagination[limit]=3`)
    const articles = await articlesPromise.json()
    return articles.data
}

async function getAllPoems() {
    const poemsPromise = await fetch(`${API}/api/poems?populate[0]=image&populate[1]=writers&pagination[limit]=3`)
    const poems = await poemsPromise.json()
    return poems.data
}


const amiri = localFont({
  src: '../public/fonts/Amiri-Regular.ttf',
  variable: '--font-amiri',
});


export default async function Page() {
    const poems = await getAllPoems();
    const articles = await getAllArticles();
    
    return (
        <div className='md:px-8'>
            <div className="head py-4 md:w-[55%] w-[80%] mx-auto">
            <svg preserveAspectRatio="none" className='w-full absolute h-full overflow-visible' version="1.1" id="svg1" width="309.32358" height="82.532181" viewBox="0 0 309.32358 82.532181">
              <defs id="defs1"/>
                 <g id="g1" transform="translate(55.760426,-130.14957)">
                   <path style={{fill:'#fff',fillOpacity:0.7}} d="m -50.968149,208.12981 c -2.710459,-1.12569 -2.207151,-1.16779 -3.415331,-4.10638 -1.720551,-4.18479 -1.907537,-4.3131 -6.291121,-4.31673 -7.547914,-0.006 -10.679173,-2.81722 -20.381,-18.29615 -2.020086,-3.22298 -5.199557,-6.71815 -7.16768,-7.87937 l -3.537143,-2.08696 2.801844,-1.7376 c 3.748951,-2.32496 6.287334,-5.32585 10.57658,-12.50367 5.869349,-9.82205 12.208903,-14.5 19.650368,-14.5 2.105565,0 3.018295,-0.83357 4.600776,-4.20175 3.937745,-8.38116 91.562079,-7.86166 125.87668,-8.29825 32.641506,-0.41531 160.246136,1.63252 169.861926,4.7521 2.21342,0.71808 4.17676,2.32615 4.87243,4.25 1.05716,2.92352 1.76554,3.51039 4.31397,3.57398 7.40938,0.18487 14.11265,5.00915 19.15441,13.78524 4.09021,7.11975 7.33592,11.13233 10.62048,13.12979 l 2.99412,1.82083 -2.33931,1.25197 c -3.38504,1.81163 -4.32819,2.91647 -11.18851,13.10683 -7.41553,11.01509 -9.88999,13.00875 -16.90061,13.6167 -5.05195,0.4381 -5.382,0.6456 -7.29147,4.58428 -4.11083,8.47943 -140.78032,8.63145 -173.897876,8.60531 -27.983358,-0.0221 -119.203051,-3.00916 -122.913533,-4.55017 z" id="path3"/>
                 </g>
            </svg>
              <span className='text-center md:text-3xl top-4 block relative z-10'>درگاه</span>
                <p className={`${amiri.className} poem md:text-2xl text-xs block m-auto text-black md:mt-0 mt-4`}>
                    <span className='pl-8 md:text-right md:w-[45%] w-[40%]'>خوش‌آمد گل وز آن خوش‌تر نباشد</span>    
                    <span className='pr-8 md:text-left md:w-[45%] w-[40%]'>که در دستت به جز ساغر نباشد</span>
                </p>
            </div>
            <div className="flex flex-col md:flex-row gap-8 my-8 md:mx-64 p-8 bg-white/90 md:rounded-lg shadow-md">
                <div className="articles flex-1">
                    <h2 className="text-2xl font-bold mb-4 md:w-[80%] w-[60%] inline-block">مقالات اخیر</h2>
                    <ul className="space-y-4">
                          {[...articles]
                            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                            .map(article => (
                            <li key={article.id} className="card border rounded-lg hover:shadow-2xl transition-shadow relative md:my-4">
                                <Link className="text-white" href={`/articles/${article.slug}`}>
                                    <span className='pubdate absolute bg-dustyred z-10 p-1 rounded left-0'>{new Date(article.createdAt).toLocaleDateString('fa-IR', {year: 'numeric', month: 'long', day: 'numeric'})}</span>
                                    <img src={`http://localhost:1337${article.image.formats.thumbnail.url}`} alt={article.name} />
                                    <div className='details p-2 bg-dustyred rounded-t-xl'>
                                        <span className="text-md md:text-xl font-semibold">{article.name} - {(article.writers ?? []).map(w => w.name).join(", ")}</span>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <Link className='viewall bg-silver p-1 rounded float-left relative top-2' href="/articles">مشاهده همه</Link>
                </div>
                <div className="poems flex-1">
                    <h2 className="text-2xl font-bold mb-4 md:w-[80%] w-[60%] inline-block">اشعار اخیر</h2>
                    
                    <ul className="space-y-4">
                        {[...poems]
                            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                            .map(poem => (
                            <li key={poem.id} className="card border rounded-lg hover:shadow-2xl transition-shadow relative md:my-4">
                                <Link className="text-white" href={`/poems/${poem.slug}`}>
                                <span className='pubdate absolute bg-dustyred z-10 p-1 rounded left-0'>{new Date(poem.createdAt).toLocaleDateString('fa-IR', {year: 'numeric', month: 'long', day: 'numeric'})}</span>
                                    <img src={`http://localhost:1337${poem.image.formats.thumbnail.url}`} alt={poem.name} />
                                    <div className='details p-2 bg-dustyred rounded-t-xl'>
                                        <span className="text-md md:text-xl font-semibold">{poem.name} - {(poem.writers ?? []).map(w => w.name).join(", ")}</span>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <Link className='viewall bg-silver p-1 rounded float-left relative top-2' href="/poems">مشاهده همه</Link>
                </div>
            </div>
        </div>
    )
}