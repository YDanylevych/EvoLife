import "./style.css"

import icon1 from "./../../assets/icon1.png"
import icon2 from "./../../assets/icon2.png"

const Main = () => {
    return (
        <main>
            {/*Services section*/}
            <section className="service" id="service-section">
                <div className="container">
                    <div className = "name">
                        The best self-development tools for you
                    </div>
                    <div className="service-offfer flex">
                        <div id="service1" className="boxes-service1">
                            <div className="boxes-service">
                                <div className="service-heading">
                                    <h3>Knowledge</h3>
                                </div>
                                <p className="intro" id="introText1">Knowledge is power. 
                                    We diligently gather and expand our 
                                    library of knowledge to ease your journey. Get this knowledge!</p>
                                <div className="btn-box">
                                    <a href="#" className="small-btn" id="readMoreBtn1">Read more</a>
                                </div>
                            </div>
                
                        </div>
                        <div id="service2" className="boxes-service1">
                            <div className="boxes-service">
                                <div className="service-heading">
                                    <h3>Features</h3>
                                </div>
                                <p className="intro" id="introText2">Our features and our products will help you a lot. 
                                    For example, your own diary, our books and exclusive video content. Use it!</p>
                                <div className="btn-box">
                                    <a href="#" className="small-btn" id="readMoreBtn2">Read more</a>
                                </div>
                            </div>
                        </div>

                        <div id="service3" className="boxes-service1">
                            <div className="boxes-service">
                                <div className="service-heading">
                                    <h3>Community</h3>
                                </div>
                                <p className="intro" id="introText3">Modern people lack the support 
                                    of an environment where others do not remain indifferent. It is easier to move together!</p>
                                <div className="btn-box">
                                    <a href="#" className="small-btn" id="readMoreBtn3">Read more</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className = 'container'>
                    <div className = "name">
                        Products
                    </div>
                    <div className="text-smaller">
                        There are no products yet, but they will be in the future.
                    </div>

                    <div className = "name">
                        The year of your development
                    </div>
                    <div className = 'container1'>
                        <div className = 'blocks'>
                            <div className="block">
                                <div className="words">
                                    <div className='word'>January</div>
                                    <div className='word1'>Sport</div>
                                </div>
                            </div>
                        
                            <div className="block">
                                <div className="words">
                                    <div className='word'>February</div>
                                    <div className='word1'>Managing time</div>
                                </div>
                            </div>
                        
                            <div className="block">
                                <div className="words">
                                    <div className='word'>March</div>
                                    <div className='word1'>Appearance</div>
                                </div>
                            </div>
                        
                            <div className="block">
                                <div className="words">
                                    <div className='word'>April</div>
                                    <div className='word1'>Sleep</div>
                                </div>
                            </div>
                        
                            <div className="block">
                                <div className="words">
                                    <div className='word'>May</div>
                                    <div className='word1'>Nutrition</div>
                                </div>
                            </div>
                        
                            <div className="block">
                                <div className="words">
                                    <div className='word'>June</div>
                                    <div className='word1'>Concentration</div>
                                </div>
                            </div>
                        
                            <div className="block">
                                <div className="words">
                                    <div className='word'>July</div>
                                    <div className='word1'>Imagination</div>
                                </div>
                            </div>
                        
                            <div className="block">
                                <div className="words">
                                    <div className='word'>August</div>
                                    <div className='word1'>Habits</div>
                                </div>
                            </div>
                        
                            <div className="block">
                                <div className="words">
                                    <div className='word'>September</div>
                                    <div className='word1'>Education</div>
                                </div>
                            </div>
                        
                            <div className="block">
                                <div className="words">
                                    <div className='word'>October</div>
                                    <div className='word1'>Recreation</div>
                                </div>
                            </div>
                        
                            <div className="block">
                                <div className="words">
                                    <div className='word'>November</div>
                                    <div className='word1'>Purpose</div>
                                </div>
                            </div>
                        
                            <div className="block">
                                <div className="words">
                                    <div className='word'>December</div>
                                    <div className='word1'>Motivation</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/*About section*/}
            <section className="section-about" id="">
                <div className="container flex about-section" id="about-section">
                    <div className=" about-content ">
                        <div className="name1">
                            About me
                        </div>
                        <div className="text-smaller">
                            My name is Yurii Danylevych. I believe that 
                            each has the potential to achieve great 
                            heights and secure a bright future. My brand reveals 
                            the secrets this and teaches you how to build a solid 
                            foundation for greater life. I am the author of the EvoLife channel.
                            I help people systemize their workflow and also develope their life.
                        </div>

                        <div className="links">
                            <div className="btn-box">
                                <a href="https://t.me/EvoLife1" className="small-btn1" target="_blank">Contact me</a>
                            </div>
        
                            <div className="icons">
                                <a href="https://www.youtube.com/channel/UCuNku5TQ1o68-Q9gbYKMUwg" className="social-link" target="_blank">
                                    <img src={icon1} alt=""/>
                                </a>
                                <a href="https://twitter.com/evolife_" className="social-link" target="_blank">
                                    <img src={icon2} alt=""/>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/*Tariffs section*/}
            {/*<section className="tariffs" id="tariffs-section">
                <div className="container">
                    <div className="name">
                        Tariffs
                    </div>
                    <div className="service-offfer flex">
                        <div className="boxes-service">
                            <div className="service-heading">
                                <h3>Month</h3>
                            </div>
                            <p className="intro1">$15</p>
                            <div className="btn-box">
                                <a href="#" className="small-btn">Enter</a>
                            </div>
                        </div>
                        <div className="boxes-service">
                            <div className="service-heading">
                                <h3>Year</h3>
                            </div>
                            <p className="intro1">$150</p>
                            <div className="btn-box">
                                <a href="#" className="small-btn">Enter</a>
                            </div>
                        </div>
                        <div className="boxes-service">
                            <div className="service-heading">
                                <h3>Annual</h3>
                            </div>
                            <p className="intro1">$300</p>
                            <div className="btn-box">
                                <a href="#" className="small-btn">Enter</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>*/}

            <div className= 'container'>
                <div className="name1">
                    Answers to the questions
                </div>
                <div className="accordion">
                    <div className="accordion-item">
                        <div className="accordion-title">What platform is used for the community?</div>
                        <div className="accordion-content">Discord</div>
                    </div>
                    <div className="accordion-item">
                        <div className="accordion-title">Is it difficult to understand all the features?</div>
                        <div className="accordion-content">No, very simple</div>
                    </div>
                    <div className="accordion-item">
                        <div className="accordion-title">Are there any plans to develop the brand?</div>
                        <div className="accordion-content">Yes, of course. We will make more functions and products</div>
                    </div>
                    <div className="accordion-item">
                        <div className="accordion-title">What topics are discussed in the community?</div>
                        <div className="accordion-content">Different, but all are useful</div>
                    </div>
                    <div className="accordion-item">
                        <div className="accordion-title">What are the goals of the brand?</div>
                        <div className="accordion-content">To improve the lives of the members of our community</div>
                    </div>
                </div>
            </div>
        </main>
    )
}
 
export default Main;