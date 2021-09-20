import Navbar2 from '../containers/Navbar/AuthNavbar'
import Footer from '../containers/Footer/Footer'
import Hero from '../containers/Home/Hero'
import FeatureList from '../containers/Home/FeatureList'

export default function AuthHome() {
    return(
        <>
            <Navbar2 />
            <Hero />
            <FeatureList />
            <Footer />
        </>
    );
}
