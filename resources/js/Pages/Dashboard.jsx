import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Cookies from 'js-cookie';

export default function Dashboard() {
    return (
        <AuthenticatedLayout>
        <div className="row flex justify-center">
            <div className="card" style={{width: '18rem', margin: '30px'}}>
                <img className="card-img-top" src="..." alt="Card image cap"/>
                <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" className="btn btn-primary">Go somewhere</a>
                </div>
            </div>
            <div className="card" style={{width: '18rem', margin: '30px'}}>
                <img className="card-img-top" src="..." alt="Card image cap"/>
                <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" className="btn btn-primary">Go somewhere</a>
                </div>
            </div>
            <div className="card w-[18rem] m-[30px]">
                <img className="card-img-top" src="..." alt="Card image cap"/>
                <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" className="btn btn-primary">Go somewhere</a>
                </div>
            </div>

            <div className="card" style={{width: '18rem', margin: '30px'}}>
                <img className="card-img-top" src="..." alt="Card image cap"/>
                <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" className="btn btn-primary">Go somewhere</a>
                </div>
            </div>
            <div className="card w-[18rem] m-[30px]">
                <img className="card-img-top" src="..." alt="Card image cap"/>
                <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" className="btn btn-primary">Go somewhere</a>
                </div>
            </div>
            <div className="card" style={{width: '18rem', margin: '30px'}}>
                <img className="card-img-top" src="..." alt="Card image cap"/>
                <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" className="btn btn-primary">Go somewhere</a>
                </div>
            </div>
            <div className="card w-[18rem] m-[30px]">
                <img className="card-img-top" src="..." alt="Card image cap"/>
                <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" className="btn btn-primary">Go somewhere</a>
                </div>
            </div>
        </div>

            <Head title={Cookies.get('language') === 'lt' ? "Temos" : "Threads"} />
        </AuthenticatedLayout>
    );
}
