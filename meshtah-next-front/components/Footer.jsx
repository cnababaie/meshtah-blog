import NavLink from '../components/navLink';


export default function Footer() {

  return (
    <footer className="w-full">
      <div className="w-full py-2 bg-silver">
        <nav className="max-w-screen-lg mx-auto flex flex-col md:flex-row px-4">
          <div className="flex justify-between p-4 flex-col space-y-4 md:ml-16">
            <span className="font-bold text-md">طرق</span>
            <ol>
              <li>
                <NavLink text="درگاه اصلی" href="/"></NavLink>
              </li>
              <li>
                <NavLink text="مقالات" href="/articles"></NavLink>
              </li>
              <li>
                <NavLink text="اشعار" href="/poems"></NavLink>
              </li>
            </ol>
          </div>
          <div className="flex justify-between p-4 flex-col space-y-4">
            <span className="font-bold text-xl"></span>
            <ol>
              <li>
                <NavLink text="تعامل" href="/mutual-aid"></NavLink>
              </li>
              <li>
                <NavLink text="چیستی" href="/about"></NavLink>
              </li>
              <li>
                <NavLink text="کیستی" href="/who"></NavLink>
              </li>
            </ol>
          </div>
        </nav>
      </div>
      <div className="w-full py-2 bg-nightblue">
        <div className="text-center text-md text-white">
          <p><span className="copyleft"></span> تمامی حقوق مرموز است.</p>
        </div>
      </div>
    </footer>
  );
}