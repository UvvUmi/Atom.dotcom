import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import Cookies from 'js-cookie';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            
             <Head title={Cookies.get('language') === 'lt' ? "Prisijungti" : "Log In"} />

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="email" value={Cookies.get('language') === 'lt' ? "El. Paštas": "Email"}/>

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    {errors.email? 
                    <InputError message={Cookies.get('language') === 'lt' ? 'Neteisingas el. paštas' : errors.email } className="mt-2" />
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
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />
                    {errors.password ? 
                    <InputError message={Cookies.get('language') === 'lt' ? "Neteisingas slaptažodis" : errors.password} className="mt-2" />
                    : null}
                </div>

                <div className="mt-4 block">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData('remember', e.target.checked)
                            }
                        />
                        <span className="ms-2 text-sm text-gray-600">
                            {Cookies.get('language') === 'lt' ? 'Įsiminti mane' : 'Remember Me'}
                        </span>
                    </label>
                </div>

                <div className="mt-4 flex items-center justify-end">
                    <Link 
                        href={route('register')}
                        className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#334155] focus:ring-offset-2"
                    >{Cookies.get('language') === "lt" ?  'Neturite paskyros?' : 'Not registered?'}</Link>
                    <PrimaryButton className="ms-4" disabled={processing}>
                        {Cookies.get('language') === "lt" ?  'Prisijungti' : 'Log In'}
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
