import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

export default function Dashboard({thread}) {
    return (
        <AuthenticatedLayout>
            {thread.title}<br/>
            {thread.id}
            <Head title={thread.title} />
        </AuthenticatedLayout>
    );
}
