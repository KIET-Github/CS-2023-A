// importing components
import Heading from "../Heading/Heading";
import NewPet from "../NewPet/NewPet";
import PetsDisplay from "../PetsDisplay/PetsDisplay";

// user pets component
export default function UserPets() {
    return (
        <div className="userPets">
            {/* header */}
            <div className="userPets-header flex items-center">
                {/* heading */}
                <Heading
                    sticker="/assets/profile2.png"
                    heading="Your Pets"
                    subheading="Checkout your pets below"
                >
                    {/* new pet button */}
                    <NewPet />
                </Heading>
            </div>

            {/* pet display */}
            <div className="userPets-display">
                <PetsDisplay />
            </div>
        </div>
    )
}