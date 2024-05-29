import "./style.css"

const Header = () => {
    return (    
    <header className = 'header' >
        <div className = 'header-down'>
            <div className = 'header-title'>
                EVOLVE YOUR LIFE
            </div>
            <div className = 'header-title2'>
                Change yourself for the better forever. Everything is in your hands.
            </div>
            <div className='btn-box'>
                <a className = 'bthLogin-popup' href = '/register'>JOIN</a>
            </div>

        </div>
        <div id="container">
                <canvas id="canvas"></canvas>
        </div>
    </header>);
}
 
export default Header;