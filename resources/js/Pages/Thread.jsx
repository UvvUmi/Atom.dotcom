import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

export default function Dashboard({thread, comments}) {
    useEffect(() => {
        console.log(comments);
        console.log(thread);
    }, [comments, thread]);
    return (
        <AuthenticatedLayout>
        <div className='flex justify-center'>
            <div className="bg-gradient-to-r from-[#374151] via-[#f43f5e] to-[#fb923c] w-[100%] pb-5">
                <div className="flex justify-center flex-col text-white font-medium">
                    <span className='flex justify-center bg-atom w-[100%]'>{new Date(thread.created_at).toLocaleString(Cookies.get('language') === "lt" ? 'lt-LT' : 'en-US', {
                                    year: 'numeric',
                                    month: '2-digit',
                                    day: '2-digit',
                                    weekday: 'short',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })} [ {thread.user['name']} ]</span>
                    <div className=""><a href={route('dashboard')} className="font-black text-[32px] sm:ms-3 lg:ms-6 absolute">←</a></div>
                    <div className='flex justify-center mt-2'>
                        <img src={thread.img_url} alt="thread img" className='w-[200px]'/>
                    </div>
                    <div className='flex justify-center'>
                        <div className='text-wrap mt-2 p-2 rounded-[15px] bg-atomTransparent w-[75%]'>
                            <span className="font-black">{thread.title}</span><br/>
                            <span className="font-light">{thread.content}</span>
                        </div>
                    </div>
                </div>

                {comments.length != 0 
                    ? comments.map(comment => 
                (
                    <div className='ms-3 w-[80%] bg-micronesia text-white my-3 indent-1 px-3 rounded-[15px]'>
                        <div>
                            {new Date(comment.created_at).toLocaleString(Cookies.get('language') === "lt" ? 'lt-LT' : 'en-US', {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit',
                                weekday: 'short',
                                hour: '2-digit',
                                minute: '2-digit',
                            })} [ {comment.user_name} ]
                        </div>
                        {comment.comment}
                    </div>
                ))
                    : <div className='ms-3 text-white font-black bg-micronesia w-[50%] mt-3 indent-3 rounded-[15px] p-2'>{Cookies.get('language') === 'lt' ? 'Komentarų nėra' : 'No comments here yet'}</div>
                }
            </div>
            {/* {comments.length === 0 ? '' :
            <nav className="flex justify-center pt-3">
                <ul className="pagination justify-content-end flex-wrap mx-3">
                    {comments.links.map((link, index) => (
                        <li className={link.active ? "page-item opacity-80" : "page-item"}><a className="page-link" key={link.label} href={link.url}>
                            {index === 0 ? '←' : index === comments.links.length - 1 ? '→'
                            : link.label}
                        </a></li>
                    ))}
                </ul>
            </nav> 
        } */}
            <Head title={thread.title} />
        </div>
        </AuthenticatedLayout>
    );
}
