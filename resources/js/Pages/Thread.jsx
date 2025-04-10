import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import TextInput from '../Components/TextInput';
import PrimaryButton from '../Components/PrimaryButton';
import SendButton from '../../../public/sendBtn.svg';

export default function Dashboard({thread, comments}) {
    console.log(comments);
    console.log(thread);

    const bgObject = {
        '0': 'bg-gradient-to-r from-[#374151] via-[#f43f5e] to-[#fb923c]',
        '1': 'bg-gradient-to-br from-[#323232] via-[#8559a5] to-[#6db193]',
        '2': 'bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-[#9ca3af] via-[#4b5563] to-[#1e40af]',
        '3': 'bg-gradient-to-tr from-[#00204a] via-[#005792] to-[#00bbf0]',
    };

    const { data, setData, post, processing, reset } = useForm({
        comment: '',
    });

    const postComment = (e) => {
        e.preventDefault();

        post(`/thread/${thread.id}/post_comment`, {
            comment: data.comment,
            onFinish: () => reset('comment'),
        });
    };

    return (
        <AuthenticatedLayout>
        <div className={bgObject[thread.themeId].concat("", " flex justify-center pb-5")}>
            <div className="w-[100%] pb-[26vh]">
                <div className="flex justify-center flex-col text-white font-medium">
                    <span className='flex justify-center bg-atom w-[100%]'>{new Date(thread.created_at).toLocaleString(Cookies.get('language') === "lt" ? 'lt-LT' : 'en-US', {
                                    year: 'numeric',
                                    month: '2-digit',
                                    day: '2-digit',
                                    weekday: 'short',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })} [ {thread.user['name']} ]</span>
                    <div className=""><a href={route('dashboard')} className="font-black text-[2em] sm:ms-3 lg:ms-6 absolute">←</a></div>
                    <div className='flex justify-center mt-2'>
                        <img src={thread.img_url} alt="thread img" className='w-[300px] h-[200px] rounded-[15px]'/>
                    </div>
                    <div className='flex justify-center'>
                        <div className='text-wrap mt-2 p-2 rounded-[15px] bg-atomTransparent w-[75%]'>
                            <span className="font-black">{thread.title}</span><br/>
                            <span className="font-light">{thread.content}</span>
                        </div>
                    </div>
                </div>

                <form onSubmit={postComment} className='flex items-center'>
                        <TextInput
                            id="comment"
                            name="comment"
                            type='text'
                            value={data.comment}
                            className="ms-3 mt-2 w-[450px]"
                            placeholder={Cookies.get('language') === 'lt' ? 'Palikti komentarą' : 'Leave comment'}
                            onChange={(e) => setData('comment', e.target.value)}
                            maxLength='30'
                            isFocused={true}
                        />
                        <button title="Send ME!!!" disabled={processing} type='submit' value='Submit' className="bg-transparent border-0 w-[45px] hover:scale-[120%]" style={{transition: 'transform 1s ease'}}>
                            <img src={SendButton} className="mt-2" alt="send me!"/>
                        </button>
                </form>

                {comments.length != 0 
                    ? comments.map(comment => 
                (
                    <div key={comment.id} className='ms-5 w-[80%] bg-micronesia text-white my-3 indent-1 px-3 rounded-[15px]'>
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
                        <span className='ms-1'>{comment.comment}</span>
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
