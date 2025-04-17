import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head,  } from '@inertiajs/react';
import Placeholder from '../../../../public/uploads/avatars/img_avatar.png';
import Cookies from 'js-cookie';

export default function Profile({user}) {
    console.log(user);
    return (
        <AuthenticatedLayout>
            
            <div className="flex justify-center items-center mt-3 text-atomWhite">
                <img alt="Profile avatar" src={Placeholder} className="w-[200px] rounded-[15px]"/>
                <div className="ms-2">
                    <p><span className="font-extrabold">{Cookies.get('language') === 'lt' ? 'Vartotojo ID' : 'User ID'}</span>: {user.id}</p>
                    <hr/>
                    <p><span className="font-extrabold">{Cookies.get('language') === 'lt' ? 'Vartotojo Vardas' : 'User Name'}</span>: {user.name}</p>
                    <hr/>
                    <p><span className="font-extrabold">{Cookies.get('language') === 'lt' ? 'Kurimo data' : 'Created at'}</span>: {new Date(user.email_verified_at).toLocaleString('lt-LT', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                    })}</p>
                    <hr/>
                </div>
            </div>
            <Head title={user.name}/>
            
        </AuthenticatedLayout>
    );
}