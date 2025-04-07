import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import Cookies from 'js-cookie';

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout
        >
            <Head title={Cookies.get('language') === "lt" ? "Paskyra" : "Profile"} />

            <div className='mt-3 pb-3'>
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className='flex justify-center align-middle'>
                        <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                            <UpdatePasswordForm className="" />
                            <div className='mt-5' ><hr/><DeleteUserForm className="mt-1" /></div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
