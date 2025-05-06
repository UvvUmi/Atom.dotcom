import FilterIcon from "./FilterIcon"
import Cookies from "js-cookie";
import {useState, useEffect} from "react";
export default function DashboardFilter() {
    
    const [commentChecked, setCommentChecked] = useState(false);
    const [oldChecked, setOldChecked] = useState(false);
    const [newChecked, setNewChecked] = useState(false);

    const filterCookie = Cookies.get('filter');

    useEffect (()=> {
        if(filterCookie != undefined && filterCookie === 'comment') {
            setCommentChecked(true);
        }
        else if(filterCookie != undefined && filterCookie === 'old') {
            setOldChecked(true);
        }
        else {
            setNewChecked(true);
        }
    }, [])

    function setNewFilter() {
        setCommentChecked(false);
        setOldChecked(false);
        setNewChecked(true);

        Cookies.set('filter', 'new', {expires: 14});
        window.location.reload();
    }
    function setOldFilter() {
        setCommentChecked(false);
        setOldChecked(true);
        setNewChecked(false);

        Cookies.set('filter', 'old', {expires: 14});
        window.location.reload();
    }
    function setCommentFilter() {
        setCommentChecked(true);
        setOldChecked(false);
        setNewChecked(false);

        Cookies.set('filter', 'comment', {expires: 14});
        window.location.reload();
    }
// Filters could use better implementation someday
    return (
        <div className="flex justify-center mt-1 relative">
            <FilterIcon text={Cookies.get('language') === 'lt' ? 'Filtruoti pagal' : 'Filter by'}/>

            <div className="absolute top-[100%] bg-atomWhite rounded-[15px] p-2">
                <ul className='flex gap-3'>
                    <li className="flex items-center">
                        <input type="radio" id="filter_comment" name="filter" value="comment" checked={commentChecked} onChange={() => {setCommentFilter()}}/>
                        <label htmlFor='filter_comment' className="ms-1">{Cookies.get('language') === 'lt' ? 'Komentarus' : 'Comments'}</label>
                    </li>
                    <li className="flex items-center">
                        <input type="radio" id="filter_new" name="filter" value="new" checked={newChecked} onChange={() => {setNewFilter()}}/>
                        <label htmlFor="filter_new" className="ms-1">{Cookies.get('language') === 'lt' ? 'Naujausi' : 'Newest'}</label>
                    </li>
                    <li className="flex items-center">
                        <input type="radio" id="filter_old" name="filter" value="old" checked={oldChecked} onChange={() => {setOldFilter()}}/>
                        <label htmlFor="filter_old" className="ms-1">{Cookies.get('language') === 'lt' ? 'Seniausi' : 'Oldest'}</label>
                    </li>
                </ul>
            </div>
        
        </div>
    );
}
