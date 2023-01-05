// importing components
import { useContext } from 'react';

// importing custom components
import Heading from '../Heading/Heading';
import PutForAdoption from '../PutForAdoption/PutForAdoption';
import AdoptionPetsDisplay from '../AdoptionPetsDisplay/AdoptionPetsDisplay';

// importing context
import AuthContext from '../../context/auth';

// user pets adoption component
export default function UserPetsAdoption() {
    // auth context
    const authCtx = useContext(AuthContext);
    const { token } = authCtx;

	return (
		<div className="userPetsAdoption">
			{/* header */}
			<div className="userPetsAdoption-header">
				<Heading
					sticker="/assets/profile3.png"
					heading={`Your Pet's Adoption`}
					subheading="Find a new family for your pets"
				>
					<PutForAdoption
                        token={token}
                    />
				</Heading>
			</div>

            {/* pets available for adoption display */}
            <div className="userPetsAdoption-display">
                <AdoptionPetsDisplay
                    token={token}
                />
            </div>
		</div>
	);
}
