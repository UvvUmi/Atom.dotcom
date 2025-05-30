import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import Cookies from 'js-cookie';
import UploadIcon from '../../Components/UploadIcon';
import { useEffect, useState } from 'react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        avatar: null,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    let avatarUpload = document.getElementById('avatarUpload');

    const [isChecked, setIsChecked] = useState(false);

    const handlePolicyboxChange = (event) => {
        setIsChecked(event.target.checked);
    };
    

    return (
        <GuestLayout>
            <Head title={Cookies.get('language') === "lt" ? "Registruotis" : "Register"} />

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="name" value={Cookies.get('language') === 'lt' ? "Vardas" : "Name"} />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                    />

                    {errors.name ? <InputError message={Cookies.get('language') === 'lt' ? "Įveskite vardą" : errors.name} className="mt-2" /> : null}
                </div>
                
                <div className="mt-4">
                    <InputLabel htmlFor="email" value={Cookies.get('language') === 'lt' ? "El. Paštas": "Email"}/>

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    {errors.email ? 
                    <InputError message={Cookies.get('language') === 'lt' ? 'Įveskite el. paštą' : errors.email} className="mt-2" /> 
                    : null}
                    
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value={Cookies.get('language') === 'lt' ? "Slaptažodis": "Password"} />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    {errors.password ? <InputError message={Cookies.get('language') === 'lt' ? 'Įveskite/Patvirtinkite slaptažodį' : errors.password} className="mt-2" />
                    : null}
                </div>

                <div className="mt-4">
                    <InputLabel
                        htmlFor="password_confirmation"
                        value={Cookies.get('language') === 'lt' ? "Patvirtinkite slaptažodį" : "Confirm Password"}
                    />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                    />
                {errors.password_confirmation ? 
                    <InputError
                        message={Cookies.get('language') === 'lt' ? 'Neteisingas slaptažodis' : errors.password_confirmation}
                        className="mt-2"
                    />
                    : null }
                </div>
                
                <div className='flex justify-center mt-3 mb-1'>
                    <label htmlFor='avatarUpload'>
                        <UploadIcon text={Cookies.get('language') === 'lt' ? 'Profilio nuotrauką' : 'Avatar image'}/>
                    </label>
                    <input
                    id='avatarUpload'
                    className="hidden"
                    type="file"
                    name="avatar"
                    onChange={(e) =>
                        setData(
                            "avatar", e.target.files[0],
                        )
                    }
                    />
                </div>
                {avatarUpload != null && avatarUpload.value != '' ? <div className='ms-3 text-center'>{avatarUpload.value.replace("C:\\fakepath\\", "")} 
                        <span className='ms-1 font-extrabold text-metroAlert cursor-pointer' onClick={()=> {
                            setData('avatar', null);
                            avatarUpload.value = '';
                        }}>X</span>
                    </div>  : ''}
                <span className='text-xs'>
                    {Cookies.get('language') === 'lt' ? 'Max dydis: 10 MB | Formatai: jpeg jpg png gif webm | Raiška < 3200x3200' 
                        : 'Max filesize: 10 MB | File formats: jpeg jpg png gif webm | Resolution < 3200x3200'}
                </span>

                { document.getElementById('email')?.value != '' 
                    && document.getElementById('password_confirmation')?.value != '' ?
                    <div className="mt-2 flex items-center">
                        <input id="policyBox" type='checkbox' checked={isChecked} onChange={handlePolicyboxChange} className="rounded-[5px]"/>
                        <label htmlFor="policyBox" className="ms-1">
                            {Cookies.get('language') === 'lt' 
                                ? 'Sutinku su duomenų ir slapukų naudojimo politika'
                                : 'I Agree with the use of data and cookies policy'
                            }
                        </label>
                    </div> : ''
                }

                <div className="mt-2 flex items-center justify-end">
                    <Link
                        href={route('login')}
                        className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#334155] focus:ring-offset-2"
                    >
                        {Cookies.get('language') === "lt" ? "Turite paskyrą?" : "Already registered?"}
                    </Link>

                { isChecked ?
                    <PrimaryButton className="ms-4" disabled={processing}>
                        {Cookies.get('language') === "lt" ? "Kurti paskyrą" : "Create Account"}
                    </PrimaryButton>
                    : ''
                }
                </div>
            </form>
        </GuestLayout>
    );
}
