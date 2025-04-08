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

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    const { data, setData, post, processing, reset } = useForm({
        title: '',
        content: '',
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
            onFinish: () => reset('title', 'content'),
        });
    };

    return (

        <div className="min-h-screen bg-gradient-to-t from-[#0f172a]  to-[#334155]">
            <div id="overlay" className="hidden">
            <div className='bg-white flex items-center my-[210px] px-3 rounded-[25px]'>  
                    <form onSubmit={submit}>
                        <div className='flex justify-center mt-1' id='closeOverlay'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="red" className="bi bi-x-circle cursor-pointer hover:bg-metroAlert hover:rounded-[15px]" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                            </svg>
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
                                maxLength='21'
                            />
                        </div>
                        <div>
                            <InputLabel htmlFor='content' className="mt-2" value={Cookies.get('language') === 'lt' ? "Turinys" : "Content"}/>
                            <TextInput
                                id="content"
                                name='content'
                                value={data.content}
                                className="mt-1 block w-full"
                                onChange={(e) => setData('content', e.target.value)}
                                maxLength='51'
                            />
                            <PrimaryButton className="mt-2" style={{transform: "translate(35%, 20%)"}} disabled={processing}>
                                {Cookies.get('language') === "lt" ? "Paskelbti" : "Publish"}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>  
            </div>

            <nav className="dark:bg-gradient-to-br from-[#0f172a]  to-[#334155] sticky top-0 z-40 border-b-2 border-groove border-white">
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
                                        <Dropdown.Link
                                            href={route('profile.edit')}
                                        >
                                            {Cookies.get("language") === "lt" ? "Kurti įrašą" : "Create thread"}
                                        </Dropdown.Link>
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
                            <ResponsiveNavLink
                                method="get"
                                href={route('dashboard')}
                                as="button"
                                className="text-white">
                                {Cookies.get('language') === "lt" ? "Kurti įrašą" : "Create thread"}
                            </ResponsiveNavLink>
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
            
            <main>{children}</main>
        </div>
    );
}
