import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import HeaderStrasbourg from './HeaderStrasbourg';
import FooterStrasbourg from './FooterStrasbourg';
import { runtimeConfig } from '../config/runtime';

const isStrasbourg = runtimeConfig.tenant === 'strasbourg';

const MainLayout = () => {
    return (
        <>
            {isStrasbourg ? <HeaderStrasbourg /> : <Header />}
            <div className="mx-5 my-5">
                <Outlet />
            </div>
            {isStrasbourg ? <FooterStrasbourg /> : <Footer />}
        </>
    );
};
export default MainLayout;