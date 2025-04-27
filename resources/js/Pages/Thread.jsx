import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import TextInput from '../Components/TextInput';
import SendButton from '../../../public/sendBtn.svg';
import CommentsCountIcon from '../Components/CommentsCount';
import ArrowUp from '../Components/ArrowUp';
import UploadIcon from '../Components/UploadIcon';
import CloseOverlayButton from '../Components/CloseOverlayButton';

export default function Dashboard({thread, comments, comment_count}) {
    console.log(comments);
    console.log(thread);

    const bgObject = {
        '0': 'bg-gradient-to-r from-[#374151] via-[#f43f5e] to-[#fb923c]',
        '1': 'bg-gradient-to-br from-[#323232] via-[#8559a5] to-[#6db193]',
        '2': 'bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-[#9ca3af] via-[#4b5563] to-[#1e40af]',
        '3': 'bg-gradient-to-tr from-[#00204a] via-[#005792] to-[#00bbf0]',
    };

    const { data, setData, post, patch, processing, reset, delete:destroy } = useForm({
        comment: '',
        commentFile: null,
        commentFilename: '',
        editedComment: '',

    });

    const user = usePage().props.auth.user;

    const postComment = (e) => {
        e.preventDefault();

        post(`/thread/${thread.id}/post_comment`, {
            onFinish: () => {
                reset('comment');
                e.target.reset();
                if(data.commentFile != null) {
                    location.reload();
                }
            },
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

            document.getElementById('closeEditOverlay')?.addEventListener('click', ()=> {
                document.getElementById('editOverlay').className = 'hidden';
            });
    }, [])

    let commentImgName = document.getElementById('commentImgUpload');

    const [commentValue, setCommentValue] = useState(null);

    const [commentID, setCommentID] = useState(null);

    const patchComment = (e) => {
        e.preventDefault();

        patch(route('comment.update', commentID)), {
            onFinish: () => {
                setCommentID(null);
                setCommentValue(null);
            }
        };
    }

    return (
        <AuthenticatedLayout>

        <div className="hidden" id="editOverlay">
            <div className="flex items-center">
                <form className='bg-white p-3 rounded-[15px] border-2 border-atom' onSubmit={patchComment}>
                    <div className='flex justify-center' id='closeEditOverlay'>
                        <CloseOverlayButton/>
                    </div>
                    <div>
                    <TextInput
                        id='editComment'
                        name='editComment'
                        value={commentValue}
                        className="block md:w-[450px] my-2"
                        isFocused={true}
                        onChange={(e) => {
                            setCommentValue(e.target.value);
                            setData('editedComment', e.target.value);
                        }}
                        maxLength='40'/>
                    </div>
                    <div className="flex justify-center hover:underline">
                        <button type="submit" className='text-center' onClick={()=> {
                            document.getElementById('editOverlay').className = 'hidden';
                        }}>
                            {Cookies.get('language') === 'lt' ? 
                                "Keisti" : "Edit"}
                        </button>
                    </div>
                </form>
            </div>
        </div>

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
                                })}
                                <Link href={route('profile.show', thread.user_id)} className="font-extrabold inline-flex ms-1 items-center">
                                    {thread.user.name}
                                    <img className="rounded-[5px] w-[20px] h-[20px] ms-1 border-atomWhite border-1"
                                        alt='threader pic'
                                        src={ 
                                            thread.user.avatar_url === null ? '../uploads/avatars/null_avatar.png'
                                            : thread.user.avatar_url.substring(0,4) === 'http' ? thread.user.avatar_url
                                            : `../uploads/avatars/${thread.user.avatar_url}`}
                                    />
                                </Link>
                                {user.id === thread.user_id ? <span onClick={() => {destroy(`/thread/${thread.id}/destroy_thread`)}} className='ms-2 text-atomRed cursor-pointer'>[{Cookies.get('language') === 'lt' ? 'Trinti įrašą' : 'Remove thread'}]</span> : ''}</span>
                    <div className=""><button onClick={()=> {window.history.back();}} className="font-[900] text-[2em] sm:ms-3 lg:ms-6 absolute cursor-pointer">←</button></div>
                    <div className='flex justify-center'>
                        <div className='flex flex-col mt-2 text-center'>
                            {thread.img_name != null ? <a href={`../uploads/${thread.img_url}`} download={thread.user_id + '_' + thread.img_name} className='flex justify-center underline'>{thread.img_name} 400x350</a>  : <span>{thread.img_url} 400x350</span>}
                            <a href={thread.img_name != null ?
                                `../uploads/${thread.img_url}` : thread.img_url}
                                target="_blank"><img src={thread.img_url.substring(0, 4) === 'http' ? thread.img_url : `/uploads/${thread.img_url}` } alt="thread img" className='w-[400px] h-[350px] border-2 border-double'/>
                            </a>
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
                <div>
                    <form onSubmit={postComment} className='flex items-center'>
                            <TextInput
                                id="comment"
                                name="comment"
                                type='text'
                                value={data.comment}
                                className="md:ms-2 mt-2 md:w-[450px]"
                                placeholder={Cookies.get('language') === 'lt' ? 'Palikti komentarą' : 'Leave comment'}
                                onChange={(e) => setData('comment', e.target.value)}
                                maxLength='255'
                                isFocused={true}/>
                            { data.comment != '' ?
                                <div className='flex items-center ms-1'>
                                    <label htmlFor="commentImgUpload">
                                        <UploadIcon text=''/>
                                    </label>
                                    <input
                                        id='commentImgUpload'
                                        className="hidden"
                                        type="file"
                                        name="commentFile"
                                        onChange={(e) =>setData("commentFile", e.target.files[0],)}
                                    />
                                    <button onClick={()=>{setData('commentFilename', commentImgName.value.replace("C:\\fakepath\\", ""))}} title="Send ME!!!" disabled={processing} type='submit' value='Submit' className="bg-transparent border-0 w-[45px] hover:scale-[120%]" style={{transition: 'transform 1s ease'}}>
                                        <img src={SendButton} className="mt-2" alt="send me!"/>
                                    </button>
                                </div>
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
                    {commentImgName != null && commentImgName.value != '' 
                    ? <div className='ms-3'>{commentImgName.value.replace("C:\\fakepath\\", "")} 
                        <span className='ms-1 font-extrabold text-metroAlert cursor-pointer' onClick={()=> {
                            setData('commentFile', null);
                            commentImgName.value = '';
                        }}>X</span>
                    </div> 
                    : ''}          
                </div>
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
                            })} <Link href={route('profile.show', comment.user_id)} className='font-extrabold inline-flex items-center'>
                                    {comment.user_name}
                                    <img className="rounded-[15px] w-[18px] h-[18px] ms-1 border-atomWhite border-1"
                                        alt='commenter pic'
                                        src={
                                            comment.avatar_url === null ? '../uploads/avatars/null_avatar.png'
                                            : comment.avatar_url.substring(0,4) === 'http' ? comment.avatar_url
                                            : `../uploads/avatars/${comment.avatar_url}`
                                        }/>
                                </Link>
                            {user.id === comment.user_id ?
                            <span>
                                <span onClick={() => {destroy(`/destroy_comment/${comment.id}`)}} 
                                    className="text-atomRed cursor-pointer font-semibold ms-2">
                                        [{Cookies.get('language') === 'lt' ? 'Trinti' : 'Remove'}]
                                </span>
                                <span onClick={() => {
                                    setCommentValue(comment.comment);
                                    setCommentID(comment.id);
                                    document.getElementById('editOverlay').className = 'fixed justify-center align-middle z-30 flex w-[100%] h-[50%]';
                                }} 
                                    className="text-atomBlue cursor-pointer font-semibold ms-2">
                                        [{Cookies.get('language') === 'lt' ? 'Keisti' : 'Edit'}]
                                </span>
                            </span>
                            : ''}
                        </div>
                        
                        <a href={`/uploads/comments/${comment.img_url}`} download={comment.user_id + "_" + comment.img_name} className='underline ms-1'>
                            {comment.img_name}
                        </a>
                            {comment.img_url != null ?
                            <div className='overflow-hidden'>
                                <a href={`/uploads/comments/${comment.img_url}`} target='_blank' className='float-left me-3'>
                                    <img src={`/uploads/comments/${comment.img_url}`} alt={comment.img_name} className='w-[250px] shadow-lg mt-1 mb-3 rounded-[15px]'/>
                                </a>
                                <span className='block my-2 flow-text break-words'>{comment.comment}</span>
                            </div>
                            : <span className='flow-text break-words'>{comment.comment}</span>}
                    </div>
                ))
                    : <div className='ms-3 text-white font-black bg-micronesia w-[50%] mt-3 indent-3 rounded-[15px] p-2'>{Cookies.get('language') === 'lt' ? 'Komentarų nėra' : 'No comments here yet'}</div>
                }
            </div>
            <Head title={thread.title} />
        </div>
        </AuthenticatedLayout>
    );
}
