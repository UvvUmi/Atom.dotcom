import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head,  } from '@inertiajs/react';
import nullAvatar from '../../../../public/uploads/avatars/null_avatar.png';
import Cookies from 'js-cookie';
import { useEffect } from 'react';

export default function Profile({user, threads, thread_count}) {
    console.log(user);
    console.log(threads);

    
    return (
        <AuthenticatedLayout>
            <div className=""><button onClick={()=> {window.history.back();}} className="font-[900] text-[2em] text-atomWhite md:ms-6 absolute cursor-pointer">←</button></div>
            <div className="flex justify-center items-center mt-3 text-atomWhite">
                <a href={user.avatar_url === null ? nullAvatar 
                    : user.avatar_url.substring(0,4) === 'http' ? user.avatar_url
                    : `../uploads/avatars/${user.avatar_url}`} target="_blank">
                    <img alt="Profile avatar" className="w-[200px] h-[200px] rounded-[15px] border-transparent border-2 border-dashed"
                        src={
                            user.avatar_url === null ? nullAvatar
                            : user.avatar_url.substring(0,4) === 'http' ? user.avatar_url
                            : `../uploads/avatars/${user.avatar_url}`
                        }
                    />
                </a>
                <div className="ms-2">
                    <p><span className="font-extrabold">{Cookies.get('language') === 'lt' ? 'Vartotojo ID' : 'User ID'}</span>: {user.id}</p>
                    <hr/>
                    <p><span className="font-extrabold">{Cookies.get('language') === 'lt' ? 'Vartotojo vardas' : 'User name'}</span>: {user.name}</p>
                    <hr/>
                    <p><span className="font-extrabold">{Cookies.get('language') === 'lt' ? 'El. paštas' : 'Email'}</span>: {user.email}</p>
                    <hr/>
                    <p><span className="font-extrabold">{Cookies.get('language') === 'lt' ? 'Vartotojo kūrimo data' : 'User created at'}</span>: {new Date(user.email_verified_at).toLocaleString('lt-LT', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                    })}</p>
                    <hr/>
                    <p><span className="font-extrabold">{Cookies.get('language') === 'lt' ? 'Įrašų kiekis' : 'Threads created'}</span>: {thread_count}</p>
                    <hr/>
                </div>
            </div>
            {threads.length > 0 ?        
                <div className="flex justify-center mt-4 text-atomWhite row font-extrabold">
                    {Cookies.get('language') === 'lt' ? 'Vartotojo įrašai' : "User's threads"}: {thread_count}
                        {threads.map(thread => (
                            <div className="flex justify-center mt-2">
                                <a href={route('thread', thread.id)} className='text-atomWhite bg-micronesia hover:bg-transparent cursor-pointer w-[250px] text-center rounded-[15px] py-1 font-extrabold'>
                                    {thread.title}
                                </a>
                            </div>
                        ))}
                </div>
            : <div className='flex justify-center mt-4 text-atomWhite font-extrabold'>{Cookies.get('language') === 'lt' ? 'Nėra įrašų' : 'No threads'}</div>}
            <Head title={user.name}/>
            
        </AuthenticatedLayout>
    );
}