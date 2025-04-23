import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { useForm, usePage } from '@inertiajs/react';
import Cookies from 'js-cookie';
import UploadIcon from '../../../Components/UploadIcon';

export default function UpdateAvatarForm() {

    const user = usePage().props.auth.user;

    const { data, setData, patch, post, errors, reset, processing, recentlySuccessful, } = useForm({
        avatar: null,
    });

    const updateAvatar = (e) => {
        e.preventDefault();
    
        patch(route('avatar.update'), {
            onSuccess: () => reset(),
        });
    };

    let avatarUpdate = document.getElementById('avatarUpdate');

    return (
        <section>
            <div className="flex justify-between">
                <a className="text-metroAlert" href={route('dashboard')}>← {Cookies.get('language') === 'lt' ? 'Atgal' : 'Back'}</a>
                <a href={route('profile.show', user.id)}>{Cookies.get('language') === 'lt' ? 'Peržiūrėti viešą profilį' : "View public profile"} →</a>
            </div>

            <header>    
                <h2 className="text-lg mt-3 font-medium text-gray-900">
                    {Cookies.get('language') === 'lt' ? "Atnaujinti profilio nuotrauką" : "Update profile picture"}
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    {Cookies.get('language') === 'lt' ? 'Max dydis: 10 MB | Formatai: jpeg jpg png gif webm | Raiška < 3200x3200' 
                    : 'Max filesize: 10 MB | File formats: jpeg jpg png gif webm | Resolution < 3200x3200'}
                </p>
            </header>
            
            <form onSubmit={updateAvatar} className="mt-2 flex items-center gap-2">
                <label htmlFor='avatarUpdate' className=''>
                    <UploadIcon text=''/>
                </label>
                <input
                    id='avatarUpdate'
                    className="hidden"
                    type="file"
                    name="avatar"
                    onChange={(e) =>
                        setData(
                            "avatar", e.target.files[0],
                        )}/>
                
                {avatarUpdate != null && avatarUpdate.value != '' ? 
                    <PrimaryButton disabled={processing}>
                        {Cookies.get('language') === 'lt' ? 'Atnaujinti' : 'Update'}
                    </PrimaryButton>
                : ''}        
            </form>
            {avatarUpdate != null && avatarUpdate.value != ''  
                ?   <div className='mt-2'>{avatarUpdate.value.replace("C:\\fakepath\\", '')}
                        <span className='ms-1 mt-2 font-extrabold text-metroAlert cursor-pointer'
                        onClick={()=>{ 
                            setData('avatar', null);
                            avatarUpdate.value = '';
                        }}>X</span>
                    </div>
                : ''}
        </section>
    );
}
