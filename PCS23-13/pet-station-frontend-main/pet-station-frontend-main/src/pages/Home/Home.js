// importing css
import './Home.css';

// importing components
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Banner from '../../components/Banner/Banner';

// importing context
import AuthContext from '../../context/auth';

function HomeFeatures() {
    const features = [
        {
            id: 1,
            img: '/assets/feature1.png',
            description: 'Find new home for your pets easily',
        },
        {
            id: 2,
            img: '/assets/feature2.png',
            description: 'Look for pets based on your preference',
        },
        {
            id: 3,
            img: '/assets/feature3.png',
            description: 'Direct interaction with owners',
        }
    ];

    return (
        <div className='homePage__features p-10 flex items-center justify-around'>
            {
                features.map(feature => (
                    <div key={feature.id} className='feature flex flex-col items-center justify-center'>
                        <div className='feature__image'>
                            <img src={feature.img} alt={feature.description} />
                        </div>

                        <div className='feature__description mt-5 text-white text-xl text-center px-10'>
                            {
                                feature.description
                            }
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

// Home component
export default function HomePage() {
    // context
    const authCtx = useContext(AuthContext);

    // available links
    const socialLink = [
        {
            id: 1,
            icon: '/assets/mail.png',
            link: '#',
            description: 'Mail'
        },
        {
            id: 2,
            icon: '/assets/instagram.png',
            link: '#',
            description: 'Instagram'
        },
        {
            id: 3,
            icon: '/assets/twitter.png',
            link: '#',
            description: 'Twitter'
        }
    ]

    return (
        <div className='homePage'>
            {/* section one */}
            <section className='flex h-screen'>
                <div className='homePage__left md:w-3/5'>
                    <div className='homePage__left__banner m-12'>
                        <Banner />
                    </div>

                    <div className='homePage__left__content px-14'>
                        <div className='homePage__left__content__heading font-bold text-7xl'>
                            <div className='mb-5'>We provide</div>
                            <div className='flex items-center mb-5'>
                                <div> you <span className='text-blue-600'>Pets</span></div>
                                <div className='mx-3'><img src="/assets/paw2.png" alt="paw" /></div>
                            </div>
                        </div>

                        <div className='homePage__left__content__subheading my-10 text-2xl font-light text-neutral-800'>
                            With us, you can find pets more easily and quickly.
                        </div>

                        <div className='homePage__left__content my-5'>
                            <Link to={authCtx.isLoggedIn ? '/dashboard' : '/login'}>
                                <button className='homePage__left__content__button shadow-lg' type="button">
                                    Get Started
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className='homePage__right md:w-2/5'>
                    <img
                        className='object-cover w-full h-full'
                        src='/assets/home1.jpg'
                        alt='dog'
                    />
                </div>
            </section>

            {/* section two */}
            <section className='flex flex-col md:flex-row md:items-center md:justify-around'>
                <div className='homepage__left w-2/4 flex justify-center items-center'>
                    <img
                        width={400}
                        height={400}
                        src='/assets/home2.png'
                        alt='cat holding finger'
                    />
                </div>

                <div className='homepage__right text-2xl font-semibold w-2/4 md:p-20'>
                    <div className='homepage__right__quote italic'>
                        {
                            `"No matter how little money and how few possessions you own, having a pet makes you rich."`
                        }
                    </div>

                    <div className='homepage__right__speaker my-10'>
                        Louis Sabin
                    </div>
                </div>
            </section>

            {/* section three */}
            <section className='flex justify-center'>
                <HomeFeatures />
            </section>

            {/* section four */}
            <section>
                <div className='homePage__footer md:flex md:flex-col md:justify-center'>
                    <div className='flex flex-col md:flex-row justify-around items-center'>
                        <div className='homePage__footer__left'>
                            <div className='homePage__footer__left__heading text-3xl font-bold mb-2'>
                                Pet Station
                            </div>

                            <div className='homePage__footer__left__subheading font-lighter text-lg text-neutral-500 mb-10'>
                                Your only stop to adopt pet.
                            </div>

                            <div className='hidden md:block text-neutral-500 font-lighter text-sm pb-5'>
                                Copyright © {new Date().getFullYear()}. All rights reserved.
                            </div>
                        </div>

                        <div className='homePage__footer__middle'>
                            <img src='/assets/paw2.png' alt='paw' />
                        </div>

                        <div className='homePage__footer__right'>
                            <div className='homePage__footer__right__social text-2xl mb-5'>
                                Find Us
                            </div>

                            <div className='homePage__footer__right__links flex'>
                                {
                                    socialLink.map(social => (
                                        <div key={social.description} className='mr-5'>
                                            <a href={social.link}>
                                                <img
                                                    height={25}
                                                    width={25}
                                                    src={social.icon}
                                                    alt={social.link}
                                                />
                                            </a>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div >
    )
}