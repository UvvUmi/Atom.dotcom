import { Link } from '@inertiajs/react';
import { Atom }  from '@/Components/Atom.tsx';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-gray-100 dark:bg-gradient-to-br from-[#0f172a]  to-[#334155] pt-6 sm:justify-center sm:pt-0">
            
            <div className="flex flex-row justify-center items-center space-x-4">
                <Atom className='h-[120px] w-[120px]'/>
            </div>

            <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
