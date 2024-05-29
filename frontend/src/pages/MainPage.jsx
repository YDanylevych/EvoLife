import Dynamic from "../dynamic/Dynamic";
import Header from "../components/header/Header";
import Main from "../components/main/Main";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer"

const MainPage = () => {
    return (<>
        <Dynamic/>
        <Navbar/>
        <Header/>
        <Main/>
        <Footer/>
        </>);
}
 
export default MainPage;