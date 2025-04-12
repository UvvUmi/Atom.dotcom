import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import React from 'react';

export default function Dashboard({threads}) {
    const user = usePage().props.auth.user;
    useEffect(()=> {
        console.log(threads.data);
        console.log(threads);
    }, [threads]);

    const { delete:destroy } = useForm({});

    return (
        <AuthenticatedLayout>
        {threads.data.length === 0 ? '' :
            <nav className="flex justify-center pt-3">
                <ul className="pagination justify-content-end flex-wrap mx-3">
                    {threads.links.map((link, index) => (
                        <li className={link.active ? "page-item opacity-80" : "page-item"}><a className="page-link" key={link.label} href={link.url}>
                            {index === 0 ? '←' : index === threads.links.length - 1 ? '→'
                            : link.label}
                        </a></li>
                    ))}
                </ul>
            </nav> 
        }
        {threads.data.length === 0 ?  <div className="text-white font-bold text-center text-[3rem] italic">{Cookies.get('language') === 'lt' ? (<React.Fragment>O, ne!<br/>Čia nieko nėra :(</React.Fragment>) : <React.Fragment>OOOPS!<br/>Nothing to show here :(</React.Fragment>} </div> :
            <div className="row flex justify-center flex-wrap mx-3">
                {threads.data.map(thread => (
                        <div key={thread.id} className="card w-[20rem] h-auto overflow-hidden m-[30px] text-white p-0 border-0 border-transparent bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-[#f33535] via-[#d8e9f0] to-[#33425b]" key={thread.id}>
                            <img className="card-img-top w-[100%] h-[350px] p-2 rounded-[15px]" src={thread.img_url.substring(0, 4) === 'http' ? thread.img_url : `/uploads/${thread.img_url}` } alt="Card image cap"/>
                            <div className="card-body">
                                <h5 className="card-title font-black text-center">{thread.title}</h5>
                                <p className="card-text text-justify">{thread.content}</p>
                                <hr className="mt-3"/>
                                <p className='font-medium mt-2'>{new Date(thread.created_at).toLocaleDateString('lt-LT')} ({new Date(thread.created_at).toLocaleString(Cookies.get('language') === 'lt' ? 'lt-LT' : 'en-US', {
                                    weekday: 'long'
                                })}) {new Date(thread.created_at).toLocaleTimeString('lt-LT', {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })} 
                                <br/>{Cookies.get('language') === 'lt' ? 'sukūrė' : 'by'} {thread.user.name}</p>
                                {user.id === thread.user_id ?
                                    <span onClick={() => {destroy(`/destroy/${thread.id}`)}} className='text-atomRed font-medium cursor-pointer'>[{Cookies.get('language') === 'lt' ? 'Trinti' : 'Remove'}]</span>
                                : ''}
                                <div className='flex justify-center'>
                                    <Link href={route('thread', thread.id)} className="btn text-white mt-3 w-[95%] bg-atom border-atom hover:bg-micronesia">
                                    {Cookies.get('language') === 'lt' ? "Peržiūrėti" : "View"}
                                    </Link>
                                </div>
                            </div>
                        </div>
                ))}
            </div>
        }
        {threads.data.length === 0 ? '' :
            <nav className="flex justify-center pb-3">
                <ul className="pagination justify-content-end  flex-wrap mx-3">
                    {threads.links.map((link, index) => (
                        <li className={link.active ? "page-item opacity-80" : "page-item"}><a className="page-link" key={link.label} href={link.url}>
                            {index === 0 ? '←' : index === threads.links.length - 1 ? '→'
                            : link.label}
                        </a></li>
                    ))}
                </ul>
            </nav> 
        }
            <Head title={Cookies.get('language') === 'lt' ? "Temos" : "Threads"} />
        </AuthenticatedLayout>
    )
}
