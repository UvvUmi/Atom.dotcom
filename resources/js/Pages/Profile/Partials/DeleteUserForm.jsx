import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';
import Cookies from 'js-cookie';

export default function DeleteUserForm({ className = '' }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        clearErrors();
        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    {Cookies.get('language') === 'lt' ? "Pašalinti paskyrą" : "Delete Account"} 
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    {Cookies.get("language") === 'lt' ? "Pašalinus paskyrą, visi duomenys bus prarasti" : "Once your account is deleted, all of its resources and data will be lost."}
                </p>
            </header>

            <DangerButton onClick={confirmUserDeletion}>
                {Cookies.get('language') === 'lt' ? "Pašalinti paskyrą" : "Delete Account"} 
            </DangerButton>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                    {Cookies.get("language") === 'lt' ? "Pašalinti paskyrą?" : "Remove account?"}
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                    {Cookies.get("language") === 'lt' ? "Pašalinus paskyrą, visi duomenys bus prarasti" : "Once your account is deleted, all of its resources and data will be lost."}
                    </p>

                    <div className="mt-6">
                        <InputLabel
                            htmlFor="password"
                            value="Password"
                            className="sr-only"
                        />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                            className="mt-1 block w-[100%]"
                            isFocused
                            placeholder={Cookies.get('language') === 'lt' ? "Slaptažodis" : "Password"} 
                        />

                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>
                            {Cookies.get('language') === 'lt' ? "Atšaukti" : "Cancel"} 
                        </SecondaryButton>

                        <DangerButton className="ms-3" disabled={processing}>
                            {Cookies.get('language') === 'lt' ? "Pašalinti paskyrą" : "Delete Account"} 
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
