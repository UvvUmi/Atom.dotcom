import { Link } from '@inertiajs/react';
import { Atom }  from '@/Components/Atom.tsx';
import CookieNotice from '@/Components/CookieNotice';
import CurrentYear from '@/Components/CurrentYear';
import { LanguageMenu } from '@/Components/LanguageMenu';
import Cookies from 'js-cookie';


export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center dark:bg-gradient-to-br from-[#0f172a]  to-[#334155] pt-6 sm:justify-center sm:pt-0">
            <button className='top-0 right-5 fixed'><LanguageMenu/></button>

            <div className="flex flex-row justify-center items-center space-x-4">
                <Atom className='h-[100px] w-[100px]'/>
            </div>

            <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">
                {children}
            </div>

            <div className='text-white opacity-75 mt-3 mb-3'><a href="https://github.com/UvvUmi" target="_blank">&copy; Daniilas Komogorcevas <CurrentYear/></a></div>
        
            <div className='fixed bottom-3 right-3'>
                {Cookies.get("cookies") === "1" ? null : <CookieNotice/>}
            </div>
        </div>

    );
}
