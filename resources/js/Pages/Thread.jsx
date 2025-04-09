import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

export default function Dashboard({thread, comments}) {
    useEffect(() => {
        console.log(comments);
    }, [comments]);
    return (
        <AuthenticatedLayout>
            {thread.title}<br/>
            {thread.id}<br/>
            {comments.length != 0 
                ? comments.map(comment => (<div className='text-white'>{comment.comment}</div>))
                : <div>No comments here yet</div>
            }
            <Head title={thread.title} />
        </AuthenticatedLayout>
    );
}
