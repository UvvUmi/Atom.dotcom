import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

export default function Dashboard({threads}) {
    useEffect(()=> {
        console.log(threads.data);
        console.log(threads);
    }, [threads]);


    return (
        <AuthenticatedLayout>
        {threads.data.length === 0 ? <div>JSON is empty</div> : <div className="text-white">NOT EMPTY({threads.data.length} rows)</div>}
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
        {threads.data.length === 0 ?  <div className="text-white font-bold text-center text-[3rem] italic">OOOPS!<br/>Nothing to show here</div> :
            <div className="row flex justify-center flex-wrap">
                {threads.data.map(thread => (
                        <div className="card w-[20rem] m-[30px] text-white p-0 border-0 border-transparent bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-[#f33535] via-[#d8e9f0] to-[#33425b]" key={thread.id}>
                            <img className="card-img-top w-[100%] h-[150px]" src={thread.img_url} alt="Card image cap"/>
                            <div className="card-body">
                                <h5 className="card-title">{thread.title}</h5>
                                <p className="card-text">{thread.content}</p>
                                <Link href={route('thread', thread.id)} className="btn btn-primary">Visit Thread</Link>
                                <p>By {thread.user.name}</p>
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
    );
}
