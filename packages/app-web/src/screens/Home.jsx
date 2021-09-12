import Navbar from '../containers/Navbar/Navbar'
import Footer from '../containers/Footer/Footer'
import Hero from '../containers/Home/Hero'
import FeatureList from '../containers/Home/FeatureList'

export default function Home() {
    return(
        <>
            <Hero />
            <FeatureList />
            <Footer />
        </>
    );
}
