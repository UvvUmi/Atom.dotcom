import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { Atom } from '../Components/Atom';
import Cookies from 'js-cookie';
import { LanguageMenu } from '../Components/LanguageMenu';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import { transform } from 'motion';
import UploadIcon from '../Components/UploadIcon';
import CloseOverlayButton from '../Components/CloseOverlayButton';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    const { data, setData, post, processing, reset } = useForm({
        title: '',
        content: '',
        file: null,
        filename: '',
    });

    useEffect(()=> {
        let overlay = document.getElementById("overlay");
        document.getElementById("threadBtn")?.addEventListener('click', function(){
            if (overlay && overlay.className === 'hidden') {
                overlay.className = 'fixed justify-center align-middle w-[100%] h-[100%] bg-overlay z-50 flex';
            }
        });
        document.getElementById('closeOverlay')?.addEventListener('click', function() {
            if (overlay && overlay.className != 'hidden') {
                overlay.className = 'hidden';
            }
        });

    }, [])

    const submit = (e) => {
        e.preventDefault();
        
        post(route('post'), {
            onFinish: () => {
                reset('title', 'content', 'filename');
                e.target.reset();
            },
        });
        
    };



    let imgUpload = document.getElementById('threadImgUpload');

    return (

        <div className="min-h-screen bg-gradient-to-t from-[#0f172a] to-[#334155]">
            <div id="overlay" className="hidden">
            <div className='flex items-center'>  
                    <form className='bg-white p-3 rounded-[25px]' onSubmit={submit}>
                        <div className='flex justify-center mt-1' id='closeOverlay'>
                            <CloseOverlayButton/>
                        </div>
                        <div>
                            <InputLabel htmlFor="title" value={Cookies.get('language') === 'lt' ? 'Antraštė' : 'Title'}/>
                            <TextInput
                                id='title'
                                name='title'
                                value={data.title}
                                className="mt-1 block w-full"
                                isFocused={true}
                                onChange={(e) => setData('title', e.target.value)}
                                maxLength='40'
                            />
                        </div>
                        <div>
                            <InputLabel htmlFor='content' className="mt-2" value={Cookies.get('language') === 'lt' ? "Turinys" : "Content"}/>
                            <textarea
                                id="content"
                                name='content'
                                value={data.content}
                                className="mt-1 block w-full h-[100px] text-wrap items-top rounded-[15px]"
                                onChange={(e) => setData('content', e.target.value)}
                                maxLength='100'
                                style={{resize: 'none'}}
                            />
                            <p>{Cookies.get('language') === 'lt' ? 'Max dydis: 10 MB | Formatai: jpeg jpg png gif webm | Raiška < 3200x3200' 
                            : 'Max filesize: 10 MB | File formats: jpeg jpg png gif webm | Resolution < 3200x3200'} </p>
                            <label htmlFor='threadImgUpload' className='flex'>
                                <UploadIcon text={Cookies.get('language') === 'lt' ? 'Paveiksliuką' : 'Image'}/>
                            </label>
                            {imgUpload != null && imgUpload.value != '' ? imgUpload.value.replace("C:\\fakepath\\", '') : ''}
                            <input
                                id='threadImgUpload'
                                className="hidden"
                                type="file"
                                name="file"
                                onChange={(e) =>
                                    setData(
                                        "file", e.target.files[0],
                                    )
                                }
                            />
                            <div className="flex">
                                {data.content != '' && data.title != '' && data.file != null ?
                                <PrimaryButton id="submitBtn" className="mt-1" disabled={processing} 
                                onClick={()=> {
                                    document.getElementById('overlay').className='hidden'; 
                                    setData('filename', document.getElementById('threadImgUpload').value.replace("C:\\fakepath\\", ""))
                                }}>
                                    {Cookies.get('language') === "lt" ? "Paskelbti" : "Publish"}
                                </PrimaryButton>
                                : ''}
                            </div>
                        </div>
                    </form>
                </div>  
            </div>

            <nav className="dark:bg-gradient-to-br from-[#0f172a] to-[#334155] sticky z-40 top-0 border-b-2 border-groove border-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-20 justify-between">

                        <div className="flex">
                            <div className="flex shrink-0 items-center">
                                <Atom className="block h-12 w-auto" />
                            </div>
                        </div>

                        <div className="hidden md:flex text-white items-center cursor-pointer" id="threadBtn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-chat-square-dots-fill me-1" viewBox="0 0 16 16">
                                <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.5a1 1 0 0 0-.8.4l-1.9 2.533a1 1 0 0 1-1.6 0L5.3 12.4a1 1 0 0 0-.8-.4H2a2 2 0 0 1-2-2zm5 4a1 1 0 1 0-2 0 1 1 0 0 0 2 0m4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
                            </svg>
                            {Cookies.get('language') === 'lt' ? "Kurti įrašą" : "Create thread"}
                        </div>

                        <div className="hidden sm:ms-3 sm:flex sm:items-center">
                            <div><LanguageMenu/></div>
                            <div className="relative ms-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-900 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
                                            >
                                            {user.name}

                                                <svg
                                                    className="-me-0.5 ms-2 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route('profile.edit')}
                                        >
                                            {Cookies.get("language") === "lt" ? "Paskyra" : "Profile"}
                                        </Dropdown.Link>
                                        <span
                                            className='cursor-pointer block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:bg-gray-100 focus:outline-none ' 
                                            onClick={() => {
                                                document.getElementById('overlay').className='fixed justify-center align-middle w-[100%] h-[100%] bg-overlay z-50 flex';
                                            }}>{Cookies.get("language") === "lt" ? "Kurti įrašą" : "Create thread"}  
                                        </span>
                                        <Dropdown.Link
                                            href={route('dashboard')}
                                        >{Cookies.get("language") === "lt" ? "Pagrindinis" : "Homepage"}
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                        >
                                            {Cookies.get("language") === "lt" ? "Atsijungti" : "Log Out"}
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState,
                                    )
                                }
                                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out bg-white text-gray-500 focus:text-gray-500 focus:outline-none"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={
                        (showingNavigationDropdown ? 'block' : 'hidden') +
                        ' sm:hidden'
                    }
                >
                    <div className="space-y-1 pb-3 pt-2 text-micronesiaOpaque">
                        <ResponsiveNavLink
                            href={route('profile.edit')}
                            active={route().current('dashboard')}
                            className=" bg-micronesia"
                        >{user.name}
                        </ResponsiveNavLink>
                    </div>

                    <div className="pb-3 border-t border-white">
                        <div className="flex w-full items-start py-1 pe-4">
                            <LanguageMenu/>
                        </div>
                        <div className="mt-2">
                            <span
                                onClick={() => {
                                    document.getElementById('overlay').className='fixed justify-center align-middle w-[100%] h-[100%] bg-overlay z-50 flex';
                                }}
                                className="flex w-full items-start border-l-4 py-2 pe-4 ps-3 border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800 focus:border-gray-300 focus:bg-gray-50 focus:text-gray-800 text-base font-medium transition duration-150 ease-in-out focus:outline-none text-white">
                                {Cookies.get('language') === "lt" ? "Kurti įrašą" : "Create thread"}
                            </span>
                        </div>
                        <div className="mt-2">
                            <ResponsiveNavLink
                                method="get"
                                href={route('dashboard')}
                                as="button"
                                className="text-white">
                                {Cookies.get('language') === "lt" ? "Pagrindinis" : "Homepage"}
                            </ResponsiveNavLink>
                        </div>
                        <div className="mt-2 text-metroAlert">
                            <ResponsiveNavLink
                                method="post"
                                href={route('logout')}
                                as="button"
                                className="bg-alertTransparent"
                                >
                                {Cookies.get('language') === "lt" ? "Atsijungti" : "Log Out"}
                            </ResponsiveNavLink>
                        </div>
                    </div>

                </div>
            </nav>
            {user.email_verified_at === null 
                ?
                <div className="z-30 w-[100%] bg-atomYellow font-bold text-center border-2 sticky top-[82px] fixed border-atom border-dashed rounded-[5px]">
                    
                        {Cookies.get('language') === 'lt' ?
                            <span>Patvirtinkite el. paštą!
                                [<span className="text-atomRed cursor-pointer hover:underline"
                                    onClick={()=> {post(route('verification.send'))}}>negavote laiško?</span>]
                            </span>
                            
                            : <span>Confirm Your email address!
                                [<span className="text-atomRed cursor-pointer hover:underline" 
                                    onClick={()=> {post(route('verification.send'))}}> resend </span>]
                            </span>}
                    
                </div>
                : ''}
            <main>{children}</main>
        </div>
    );
}
