import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import HeaderLumiere from './HeaderLumiere';
import FooterLumiere from './FooterLumiere';
import { runtimeConfig } from '../config/runtime';

const isLumiere = runtimeConfig.tenant === 'lumiere';

const MainLayout = () => {
    return (
        <>
            {isLumiere ? <HeaderLumiere /> : <Header />}
            <div className="mx-5 my-5">
                <Outlet />
            </div>
            {isLumiere ? <FooterLumiere /> : <Footer />}
        </>
    );
};
export default MainLayout;