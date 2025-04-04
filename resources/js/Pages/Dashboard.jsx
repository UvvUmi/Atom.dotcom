import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Cookies from 'js-cookie';

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    {Cookies.get('language') === "lt" ? "Kategorijos" : "Categories"}
                </h2>
            }
        >
            <Head title={Cookies.get('language') === 'lt' ? "Kategorijos" : "Categories"} />

        </AuthenticatedLayout>
    );
}
