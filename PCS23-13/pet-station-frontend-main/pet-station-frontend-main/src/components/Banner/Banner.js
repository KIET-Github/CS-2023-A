// importing components
import { Link } from 'react-router-dom';
import { GiBoatHorizon } from 'react-icons/gi';

// Banner component
export default function Banner() {
    return (
        <Link to="/">
            <div className="banner inline-flex items-center p-2">
                <div className="banner-logo">
                    <GiBoatHorizon
                        className="w-8 h-8"
                    />
                </div>

                <div className="banner-name text-lg mx-4">
                    Pet Station
                </div>
            </div>
        </Link>
    )
}               