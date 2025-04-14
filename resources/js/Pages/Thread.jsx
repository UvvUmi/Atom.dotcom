import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import TextInput from '../Components/TextInput';
import PrimaryButton from '../Components/PrimaryButton';
import SendButton from '../../../public/sendBtn.svg';
import CommentsCountIcon from '../Components/CommentsCount';
import ArrowUp from '../Components/ArrowUp';

export default function Dashboard({thread, comments, comment_count}) {
    console.log(comments);
    console.log(thread);

    const bgObject = {
        '0': 'bg-gradient-to-r from-[#374151] via-[#f43f5e] to-[#fb923c]',
        '1': 'bg-gradient-to-br from-[#323232] via-[#8559a5] to-[#6db193]',
        '2': 'bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-[#9ca3af] via-[#4b5563] to-[#1e40af]',
        '3': 'bg-gradient-to-tr from-[#00204a] via-[#005792] to-[#00bbf0]',
    };

    const { data, setData, post, processing, reset, delete:destroy } = useForm({
        comment: '',
    });

    const user = usePage().props.auth.user;

    const postComment = (e) => {
        e.preventDefault();

        post(`/thread/${thread.id}/post_comment`, {
            comment: data.comment,
            onFinish: () => reset('comment'),
        });
    };

    useEffect(()=>{
            window.onscroll = function() {
                if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
                    document.getElementById('toTop').className = 'bottom-10 right-10 fixed bg-micronesia p-3 rounded-[50%] hover:scale-[1.1] active:scale-[0.9]';
                } else {
                    document.getElementById('toTop').className = 'hidden';
                }
            };
    }, [])

    return (
        <AuthenticatedLayout>
        <div className={bgObject[thread.themeId].concat(" ", "flex justify-center")}>
            <div className="w-[100%] h-[100%] pb-[14%]">
                <div className="flex justify-center flex-col text-white font-medium">
                    <span className='flex justify-center bg-atom w-[100%]'>{new Date(thread.created_at).toLocaleString(Cookies.get('language') === "lt" ? 'lt-LT' : 'en-US', {
                                    year: 'numeric',
                                    month: '2-digit',
                                    day: '2-digit',
                                    weekday: 'short',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })} [ {thread.user['name']} ]
                                {user.id === thread.user_id ? <span onClick={() => {destroy(`/thread/${thread.id}/destroy_thread`)}} className='ms-2 text-atomRed cursor-pointer'>[{Cookies.get('language') === 'lt' ? 'Trinti įrašą' : 'Remove thread'}]</span> : ''}</span>
                    <div className=""><button onClick={()=> {window.history.back();}} className="font-[900] text-[2em] sm:ms-3 lg:ms-6 absolute cursor-pointer">←</button></div>
                    <div className='flex justify-center'>
                        <div className='flex flex-col mt-2 text-center'>
                            {thread.img_name != null ? thread.img_name : thread.img_url} 400x350
                            <img src={thread.img_url.substring(0, 4) === 'http' ? thread.img_url : `/uploads/${thread.img_url}` } alt="thread img" className='w-[400px] h-[350px] border-2 border-double'/>
                        </div>
                    </div>
                    <div className='flex justify-center'>
                        
                        <div className='text-wrap mt-2 p-2 rounded-[15px] bg-atomTransparent w-[75%]'>
                            <span className="font-black">{thread.title}</span><br/>
                            <span className="font-light">{thread.content}</span>
                        </div>
                    </div>
                </div>
                
                    <div onClick={()=>{window.scrollTo(0, 0)}} id="toTop" style={{transition: 'transform 0.2s ease-in-out'}}>
                        <ArrowUp/>
                    </div>

            {comments.length >= 200 ? 
                <div className='text-metroAlert flex gap-3 font-medium items-center justify-center mt-1'>{Cookies.get('language') === 'lt' ? 'Įrašas viršijo komentarų limitą' : 'Comment limit reached'}
                    <CommentsCountIcon 
                        count={comment_count}
                    />
                </div> 
                :                  
                <form onSubmit={postComment} className='flex items-center'>
                        <TextInput
                            id="comment"
                            name="comment"
                            type='text'
                            value={data.comment}
                            className="md:ms-2 mt-2 md:w-[450px]"
                            placeholder={Cookies.get('language') === 'lt' ? 'Palikti komentarą' : 'Leave comment'}
                            onChange={(e) => setData('comment', e.target.value)}
                            maxLength='50'
                            isFocused={true}
                        />
                        { data.comment != '' ?
                            <button title="Send ME!!!" disabled={processing} type='submit' value='Submit' className="bg-transparent border-0 w-[45px] hover:scale-[120%]" style={{transition: 'transform 1s ease'}}>
                                <img src={SendButton} className="mt-2" alt="send me!"/>
                            </button>
                        : ''}
                        <div className='md:ms-1 flex gap-2'>
                            <CommentsCountIcon
                                    count={comment_count}
                            />
                            <span onClick={()=> {
                                window.scrollTo(0, document.body.scrollHeight);
                            }} className="text-atomWhite font-medium underline cursor-pointer">{Cookies.get('language') === 'lt' ? 'Į Apačią' : 'To Bottom'}</span>
                        </div>     
                </form>
            }
          
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
                            {user.id === comment.user_id ? 
                                <span onClick={() => {destroy(`/destroy_comment/${comment.id}`)}} className="text-atomRed cursor-pointer font-semibold ms-2">[{Cookies.get('language') === 'lt' ? 'Trinti' : 'Remove'}]</span> 
                            : ''}
                            
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
