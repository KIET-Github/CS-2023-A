// importing components
import PetCard from "../PetCard/PetCard";

import Empty from "../Empty/Empty";

// adoption pets list component
export default function AdoptionPetsList(props) {
    // props
    const { petsList, filter } = props;

    return (
        <div className="adoptionPetsList my-10">
            {
                petsList.length === 0
                    ?
                    <div className="adoptionPetsList-empty">
                        <Empty
                            label="Experience the joy and companionship of pet adoption."
                            image="/assets/empty1.gif"
                            alt="empty"
                        />
                    </div>
                    :
                    <div className="adoptionPetsList-display grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-5 bg-stone-200 rounded-md">
                        {
                            petsList.filter(pet => pet.category === filter).map(pet => <PetCard key={pet.petId} pet={pet} />)
                        }
                    </div>
            }
        </div>
    )
}