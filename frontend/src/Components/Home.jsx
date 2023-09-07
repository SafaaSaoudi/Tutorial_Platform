import logoLight from '../assets/img/light.svg';
import logoDark from '../assets/img/dark.svg';
import sceneIllustration from '../assets/1.png';
import sceneIllustration2 from '../assets/2.png';
import sceneIllustration3 from '../assets/3.png';
import sceneIllustration4 from '../assets/4.png';
import airbnbLogo from '../assets/img/clients/airbnb.svg';
import corsairLogo from '../assets/img/clients/corsair.svg';
import paypalLogo from '../assets/img/clients/paypal.svg';
import ebayLogo from '../assets/img/clients/ebay.svg';
import northwesternLogo from '../assets/img/clients/northwestern.svg';
import elasticLogo from '../assets/img/clients/elastic.svg';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import '../assets/css/swipe.css';



    const Home = () => {
    return (
        <div>
        <header className="header-global" id="home">
        <nav id="navbar-main" aria-label="Primary navigation" className="navbar navbar-main navbar-expand-lg navbar-theme-primary headroom navbar-light navbar-theme-secondary">
        <div className="container position-relative">
            <a className="navbar-brand mr-lg-4" href="http://127.0.0.1:5173/">
            <img className="navbar-brand-dark" src={logoLight} alt="Logo light" />
            <img className="navbar-brand-light" src={logoDark} alt="Logo dark" />
            </a>
            <div className="navbar-collapse collapse mr-auto" id="navbar_global">
                <div className="navbar-collapse-header">
                    <div className="row">
                        <div className="col-6 collapse-brand">
                            <a href="http://127.0.0.1:5173/">
                            <img src={logoDark} alt="Logo dark" />
                            </a>
                        </div>
                        <div className="col-6 collapse-close">
                            <a href="#navbar_global" className="fas fa-times" data-toggle="collapse" data-target="#navbar_global" aria-controls="navbar_global" aria-expanded="false" title="close" aria-label="Toggle navigation"></a>
                        </div>
                    </div>
                </div>
                <ul className="navbar-nav navbar-nav-hover align-items-lg-center">
                    <li className="nav-item">
                        <a href="http://127.0.0.1:5173/Tutorials" className="nav-link">
                            Tutorials
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#testimonials" className="nav-link">
                            Testimonials
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#faq" className="nav-link">
                            FAQ
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#download" className="nav-link">
                            Download
                        </a>
                    </li>
                </ul>
            </div>
            <div className="d-flex align-items-center">
              <a href="http://127.0.0.1:5173/login" className="btn btn-outline-soft d-none d-md-inline mr-md-3 animate-up-2">Sign In</a>

                <a href="http://127.0.0.1:5173/SignUp" className="btn btn-md btn-tertiary text-white d-none d-md-inline animate-up-2">Sign Up</a>
                <button className="navbar-toggler ml-2" type="button" data-toggle="collapse" data-target="#navbar_global" aria-controls="navbar_global" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                </div>
                </div>
                </nav>
                </header>



    <main>
        
        <section className="section section-header text-dark pb-md-8">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-10 text-center mb-5 mb-md-7">
                        <h1 className="display-2 font-weight-bolder mb-4">
                            Simple & Reliable.
                        </h1>
                        <p className="lead mb-4 mb-lg-5">Explore a diverse range of tutorials and courses on Skillio. Discover in-depth learning resources to enhance your skills and knowledge.</p>
                        <img className="d-none d-md-inline-block" src={sceneIllustration} alt="Mobile App Mockup" style={{ marginTop: '-150px' }} />

                        
                    </div>

                    
                </div>
            </div>
        </section>
        <section className="section section-lg py-0" style={{ marginTop: '-300px' }} >
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-6 col-lg-4 mb-4 mb-lg-0">
                        <div className="card border-0 bg-white text-center p-1">
                            <div className="card-header bg-white border-0 pb-0">
                                <div className="icon icon-lg icon-primary mb-4">
                                    <span className="fa-solid fa-graduation-cap"></span>
                                </div>
                                <h2 className="h3 text-dark m-0">Extensive Tutorial Selection</h2>
                            </div>
                            <div className="card-body">
                                <p>
                                An extensive library of high-quality tutorials covering a variety of subjects.                
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4 mb-4 mb-lg-0">
                        <div className="card border-0 bg-white text-center p-1">
                            <div className="card-header bg-white border-0 pb-0">
                                <div className="icon icon-lg icon-primary mb-4">
                                    <span className="fa-solid fa-filter-circle-dollar"></span>
                                </div>
                                <h2 className="h3 text-dark m-0">Smart Filtering</h2>
                            </div>
                            <div className="card-body">
                                <p>
                                Quickly find tutorials that match your skill level, budget, and learning style.                
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                        <div className="card border-0 bg-white text-center p-1">
                            <div className="card-header bg-white border-0 pb-0">
                                <div className="icon icon-lg icon-primary mb-4">
                                    <span className="fa-solid fa-chalkboard-user"></span>
                                </div>
                                <h2 className="h3 text-dark m-0">Personalized Experience</h2>
                            </div>
                            <div className="card-body">
                                <p>
                                Craft your learning journey by creating a profile to track your tutorials.                
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section className="section section-lg" id="about">
            <div className="container">
                <div className="row justify-content-center mb-5 mb-lg-7">
                    <div className="col-12 col-lg-8 text-center">
                        <h2 className="h1 mb-4">Better in every way</h2>
                        <p className="lead">Elevate your skills and knowledge effortlessly. Find the perfect tutorials and courses, all in one place.</p>
                    </div>
                </div>
                <div className="row row-grid align-items-center mb-5 mb-lg-7">
                    <div className="col-12 col-lg-5">
                        <h2 className="mb-4">Diverse Learning Resources</h2>
                        <p> Immerse yourself in a world of knowledge with our website. Access a rich variety of tutorials, courses, and documents that cater to all learning preferences. </p>
                        <p>Whether you're a visual learner or prefer in-depth reading, we have you covered.</p>
                        <a href="#" className="btn btn-dark mt-3 animate-up-2">
                            Learn More
                            <span className="icon icon-xs ml-2">
                                <i className="fas fa-external-link-alt"></i>
                            </span>
                        </a>
                    </div>
                    <div className="col-12 col-lg-6 ml-lg-auto">
                    <img src={sceneIllustration3} className="w-100" alt="" />
</div>

                </div>
                <div className="row row-grid align-items-center mb-5 mb-lg-7">
                    <div className="col-12 col-lg-5 order-lg-2">
                        <h2 className="mb-4">Real-Time Updates</h2>
                        <p>Stay ahead of the curve with real-time updates and the latest tutorials. </p>
                        <p>Our website keeps you informed about the most recent trends and technologies, helping you acquire skills that are always in demand.</p>
                        <a href="#" className="btn btn-dark mt-3 animate-up-2">
                            Learn More
                            <span className="icon icon-xs ml-2">
                                <i className="fas fa-external-link-alt"></i>
                            </span>
                        </a>
                    </div>
                    <div className="col-12 col-lg-6 mr-lg-auto">
                    <img src={sceneIllustration2} className="w-100" alt="" />
</div>

                </div>
                <div className="row">
                    <div className="col-12 col-md-6 col-lg-4 mb-4">
                        <div className="card border-light p-4">
                            <div className="card-body">
                                <h2 className="display-2 mb-2">98%</h2>
                                <span>Average satisfaction rating received in the past year.</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4 mb-4">
                        <div className="card border-light p-4">
                            <div className="card-body">
                                <h2 className="display-2 mb-2">24/7</h2>
                                <span> Our support team is a quick chat or email away.</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4 mb-4">
                        <div className="card border-light p-4">
                            <div className="card-body">
                                <h2 className="display-2 mb-2">22k+</h2>
                                <span>Our ever-growing community of satisfied users.</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <div className="section section-sm py-0">
            <div className="container">
                <div className="row text-center mb-5">
                    <div className="col">
                        <h2 className="h6 font-weight-bold text-brown">We're proudly featured by</h2>
                    </div>
                </div>
                <div className="row text-center">
                    <div className="col d-flex justify-content-center flex-wrap">
                        <a href="#" aria-label="Stripe brand logo" className="icon icon-xl icon-dark mr-4 mr-sm-5"
                        data-toggle="tooltip" data-placement="top" title="Stripe">
                            <span className="fab fa-stripe"></span>
                        </a>
                        <a href="#" aria-label="Digg brand logo" className="icon icon-xl icon-dark mr-4 mr-sm-5"
                        data-toggle="tooltip" data-placement="top" title="Digg">
                            <span className="fab fa-digg"></span>
                        </a>
                        <a href="#" aria-label="FedEx brand logo" className="icon icon-xl icon-dark mr-4 mr-sm-5"
                        data-toggle="tooltip" data-placement="top" title="FedEx">
                            <span className="fab fa-fedex"></span>
                        </a>
                        <a href="#" aria-label="Ember brand logo" className="icon icon-xl icon-dark mr-4 mr-sm-5"
                        data-toggle="tooltip" data-placement="top" title="Ember">
                            <span className="fab fa-ember"></span>
                        </a>
                        <a href="#" aria-label="Beyond brand logo" className="icon icon-xl icon-dark mr-4 mr-sm-5"
                        data-toggle="tooltip" data-placement="top" title="Beyond">
                            <span className="fab fa-d-and-d-beyond"></span>
                        </a>
                        <a href="#" aria-label="AngryCreative brand logo" className="icon icon-xl icon-dark"
                        data-toggle="tooltip" data-placement="top" title="AngryCreative">
                            <span className="fab fa-angrycreative"></span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <section className="section section-lg pb-0" id="testimonials">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-10 text-center mb-5 mb-lg-6">
                        <h2 className="display-3 mb-4">Customers love it</h2>
                        <p className="lead">The final result of our formula at work. Check out what our clients <br className="d-none d-lg-inline-block" /> have to say about our website and our support team.</p>
                    </div>
                </div>
                <div className="row mt-lg-6">
                    <div className="col-12 col-md-6 col-lg-4 mb-4 mb-lg-0">
                    <div className="card border-light">
                    <div className="card-body text-center py-5">
                    <img className="image-sm img-fluid mx-auto mb-3" src={airbnbLogo} alt="Airbnb brand" />
                                <span className="d-block">
                                    <span className="star fas fa-star text-warning"></span>
                                    <span className="star fas fa-star text-warning"></span>
                                    <span className="star fas fa-star text-warning"></span>
                                    <span className="star fas fa-star text-warning"></span>
                                    <span className="star far fa-star text-warning"></span>
                                </span>
                                <p className="px-2 my-4">Absolutely love this website! It's a goldmine of knowledge and tutorials. Highly recommended!"</p>
                                <a href="#" className="btn btn-link text-black">
                                    <span className="mr-2"><span className="fas fa-book-open"></span></span> 
                                    <span className="font-weight-bold">Read story</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4 mb-4 mb-lg-0">
                        <div className="card border-light mt-lg-n6">
                        <div className="card-body text-center py-5">
                        <img className="image-sm img-fluid mx-auto mb-3" src={corsairLogo} alt="Corsair brand" />
                                <span className="d-block">
                                    <span className="star fas fa-star text-warning"></span>
                                    <span className="star fas fa-star text-warning"></span>
                                    <span className="star fas fa-star text-warning"></span>
                                    <span className="star fas fa-star text-warning"></span>
                                    <span className="star far fa-star text-warning"></span>
                                </span>
                                <p className="px-2 my-4">Skillio is a game-changer! The vast selection of tutorials, user-friendly interface, and responsive support team make learning a breeze.</p>
                                <a href="#" className="btn btn-link text-black">
                                    <span className="mr-2"><span className="fas fa-book-open"></span></span> 
                                    <span className="font-weight-bold">Read story</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4 mb-4 mb-lg-0">
                        <div className="card border-light">
                        <div className="card-body text-center py-5">
                        <img className="image-sm img-fluid mx-auto mb-3" src={paypalLogo} alt="Paypal brand" />
                                <span className="d-block">
                                    <span className="star fas fa-star text-warning"></span>
                                    <span className="star fas fa-star text-warning"></span>
                                    <span className="star fas fa-star text-warning"></span>
                                    <span className="star fas fa-star text-warning"></span>
                                    <span className="star far fa-star text-warning"></span>
                                </span>
                                <p className="px-2 my-4">Amazing website! The search filters are a lifesaver, helping me find exactly what I need quickly. Kudos to the developers!</p>
                                <a href="#" className="btn btn-link text-black">
                                    <span className="mr-2"><span className="fas fa-book-open"></span></span> 
                                    <span className="font-weight-bold">Read story</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4 mb-4 mb-lg-0 mt-lg-4">
                        <div className="card border-light">
                        <div className="card-body text-center py-5">
                        <img className="image-sm img-fluid mx-auto mb-3" src={ebayLogo} alt="Ebay brand" />
                                <span className="d-block">
                                    <span className="star fas fa-star text-warning"></span>
                                    <span className="star fas fa-star text-warning"></span>
                                    <span className="star fas fa-star text-warning"></span>
                                    <span className="star fas fa-star text-warning"></span>
                                    <span className="star far fa-star text-warning"></span>
                                </span>
                                <p className="px-2 my-4">I've tried several tutorial websites, but this one takes the cake. The variety of content is impressive, and the community is so welcoming.</p>
                                <a href="#" className="btn btn-link text-black">
                                    <span className="mr-2"><span className="fas fa-book-open"></span></span> 
                                    <span className="font-weight-bold">Read story</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4 mb-4 mb-lg-0 mt-lg-n5">
                        <div className="card border-light">
                        <div className="card-body text-center py-5">
                        <img className="image-sm img-fluid mx-auto mb-3" src={northwesternLogo} alt="Northwestern brand" />
                                <span className="d-block">
                                    <span className="star fas fa-star text-warning"></span>
                                    <span className="star fas fa-star text-warning"></span>
                                    <span className="star fas fa-star text-warning"></span>
                                    <span className="star fas fa-star text-warning"></span>
                                    <span className="star far fa-star text-warning"></span>
                                </span>
                                <p className="px-2 my-4">I've never felt so motivated to learn. The website's design and features are a game-changer for anyone on a learning journey.</p>
                                <a href="#" className="btn btn-link text-black">
                                    <span className="mr-2"><span className="fas fa-book-open"></span></span> 
                                    <span className="font-weight-bold">Read story</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4 mt-lg-4">
                        <div className="card border-light">
                        <div className="card-body text-center py-5">
                        <img className="image-sm img-fluid mx-auto mb-3" src={elasticLogo} alt="Elastic brand" />
                                <span className="d-block">
                                    <span className="star fas fa-star text-warning"></span>
                                    <span className="star fas fa-star text-warning"></span>
                                    <span className="star fas fa-star text-warning"></span>
                                    <span className="star fas fa-star text-warning"></span>
                                    <span className="star far fa-star text-warning"></span>
                                </span>
                                <p className="px-2 my-4">I've never been more excited about learning new skills. This website has reignited my passion for personal growth.</p>
                                <a href="#" className="btn btn-link text-black">
                                    <span className="mr-2"><span className="fas fa-book-open"></span></span> 
                                    <span className="font-weight-bold">Read story</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section className="section section-lg" id="faq">
            <div className="container">
                <div className="row justify-content-center mb-5">
                    <div className="col-12 text-center mb-4 mb-lg-5">
                        <h2 className="display-3 mb-4">Facts & Questions</h2>
                        <p className="lead">Have a question? Read through our FAQ below. If you can't find an answer, <br className="d-none d-lg-inline-block" /> please email our support team. We're here to help.</p>

                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-12 col-md-10">
                        
                        <div className="accordion" id="accordionExample">
                            <div className="card border-light mb-0">
                                <div className="card-header" id="headingOne">
                                    <h2 className="mb-0">
                                        <button className="btn btn-link btn-block d-flex justify-content-between text-left" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                            <span className="h6 mb-0 font-weight-bold">What is the primary purpose of this website ?</span>
                                            <span className="icon"><span className="fas fa-plus"></span></span>
                                        </button>
                                    </h2>
                                </div>
                                <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                                    <div className="card-body">
                                        <p className="mb-0">
                                        Skillio is dedicated to helping users find high-quality tutorials across various subjects. Whether you're learning a new skill or seeking in-depth knowledge, we provide a vast collection of tutorials to cater to your needs.
                                        </p>                           
                                    </div>
                                </div>
                            </div>
                            <div className="card border-light mb-0">
                                <div className="card-header" id="headingTwo">
                                    <h2 className="mb-0">
                                        <button className="btn btn-link btn-block d-flex justify-content-between text-left" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                            <span className="h6 mb-0 font-weight-bold">How do I search for tutorials on a specific topic ?</span>
                                            <span className="icon"><span className="fas fa-plus"></span></span>
                                        </button>
                                    </h2>
                                </div>
                                <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                                    <div className="card-body">
                                        <p className="mb-0">
                                        To find tutorials on a specific topic, simply use our search bar and enter keywords related to your area of interest. Our advanced search filters will help you narrow down your results for a more tailored learning experience.
                                        </p>                           
                                    </div>
                                </div>
                            </div>
                            <div className="card border-light mb-0">
                                <div className="card-header" id="headingThree">
                                    <h2 className="mb-0">
                                        <button className="btn btn-link btn-block d-flex justify-content-between text-left" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                            <span className="h6 mb-0 font-weight-bold">How often is the tutorial content updated ?</span>
                                            <span className="icon"><span className="fas fa-plus"></span></span>
                                        </button>
                                    </h2>
                                </div>
                                <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                                    <div className="card-body">
                                        <p className="mb-0">
                                        We continuously update our tutorial library to provide you with the latest and most relevant content. You can expect new tutorials, revisions, and improvements on a regular basis.
                                        </p>                           
                                    </div>
                                </div>
                            </div>
                            <div className="card border-light mb-0">
                                <div className="card-header" id="headingFour">
                                    <h2 className="mb-0">
                                        <button className="btn btn-link btn-block d-flex justify-content-between text-left" type="button" data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                            <span className="h6 mb-0 font-weight-bold">Is my personal data safe on this website ?</span>
                                            <span className="icon"><span className="fas fa-plus"></span></span>
                                        </button>
                                    </h2>
                                </div>
                                <div id="collapseFour" className="collapse" aria-labelledby="headingFour" data-parent="#accordionExample">
                                    <div className="card-body">
                                        <p className="mb-0">
                                        Yes, we take user data privacy seriously. We use industry-standard security measures to protect your information. You can review our detailed privacy policy to learn more about how we handle data.
                                        </p>                           
                                    </div>
                                </div>
                            </div>
                            <div className="card border-light mb-0">
                                <div className="card-header" id="headingFive">
                                    <h2 className="mb-0">
                                        <button className="btn btn-link btn-block d-flex justify-content-between text-left" type="button" data-toggle="collapse" data-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                                            <span className="h6 mb-0 font-weight-bold">Are the tutorials free to access ?</span>
                                            <span className="icon"><span className="fas fa-plus"></span></span>
                                        </button>
                                    </h2>
                                </div>
                                <div id="collapseFive" className="collapse" aria-labelledby="headingFive" data-parent="#accordionExample">
                                    <div className="card-body">
                                        <p className="mb-0">
                                        Yes, the majority of our tutorials are free to access. However, some premium content may require a subscription or a one-time purchase. We believe in offering a balance of free and premium content to enhance your learning experience.
                                        </p>                           
                                    </div>
                                </div>
                            </div>
                        </div>
                       
                    </div>
                </div>
            </div>
        </section>
        <div className="section bg-soft" id="download">
            <figure className="position-absolute top-0 left-0 w-100 d-none d-md-block mt-n3">
            <svg className="fill-soft" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1920 43.4" style={{ enableBackground: 'new 0 0 1920 43.4' }} xmlSpace="preserve">
              <path d="M0,23.3c0,0,405.1-43.5,697.6,0c316.5,1.5,108.9-2.6,480.4-14.1c0,0,139-12.2,458.7,14.3 c0,0,67.8,19.2,283.3-22.7v35.1H0V23.3z"></path>
            </svg>
          </figure>
            <div className="container">
                <div className="row row-grid align-items-center">
                    <div className="col-12 col-lg-6">
                        <span className="h5 text-muted mb-2 d-block">Download App</span>
                        <h2 className="display-3 mb-4">Get started in seconds</h2>
                        <p className="lead text-muted">Quickly connect to tools and services such as Google Analytics, Intercom or Github to track, measure and optimize performance. </p>
                        <div className="mt-4 mt-lg-5">
                            <a href="#" className="btn btn-dark btn-download-app mb-xl-0 mr-2 mr-md-3">
                                <span className="d-flex align-items-center">
                                    <span className="icon icon-brand mr-2 mr-md-3"><span className="fab fa-apple"></span></span>
                                    <span className="d-inline-block text-left">
                                        <small className="font-weight-normal d-none d-md-block">Available on</small> App Store 
                                    </span> 
                                </span>
                            </a>
                            <a href="#" className="btn btn-dark btn-download-app">
                                <span className="d-flex align-items-center">
                                    <span className="icon icon-brand mr-2 mr-md-3"><span className="fab fa-google-play"></span></span>
                                    <span className="d-inline-block text-left">
                                        <small className="font-weight-normal d-none d-md-block">Available on</small> Google Play
                                    </span> 
                                </span>
                            </a>
                        </div>
                    </div>
                    <div className="col-12 col-lg-5 ml-lg-auto">
                    <img className="d-none d-lg-inline-block" src={sceneIllustration4} alt="Mobile App Illustration"  />
                    </div>
                </div>
            </div>
        </div>
    </main>


<HelmetProvider>
  <div>
    <Helmet>
    <script src="src/assets/vendor/bootstrap/dist/js/bootstrap.min.js"></script>
    <script src="src/assets/vendor/headroom.js/dist/headroom.min.js"></script>
    <script src="src/assets/vendor/onscreen/dist/on-screen.umd.min.js"></script>
    <script src="src/assets/vendor/smooth-scroll/dist/smooth-scroll.polyfills.min.js"></script>
    <script async defer src="https://buttons.github.io/buttons.js"></script>
    <script src="src/assets/js/swipe.js"></script>
    
    </Helmet>
  </div>
</HelmetProvider>


    </div>
  );
};

export default Home;
