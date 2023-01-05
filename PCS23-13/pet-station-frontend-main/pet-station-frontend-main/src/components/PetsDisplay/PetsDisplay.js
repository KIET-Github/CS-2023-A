// importing components
import { CircularProgress } from '@mui/material';
import { useState, useContext } from 'react';
import { useQuery } from 'react-query';
import { MdDelete } from "react-icons/md";

// importing custom components
import Empty from '../Empty/Empty';
import { DisplayLoading } from '../Loading/Loading';

// importing context
import AuthContext from '../../context/auth';

// importing helper functions
import { deletePet, fetchPetsData } from "../../utilities/helper";

export function PetCard(props) {
    const { pet, token } = props;

    // state
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleDelete = async () => {
        setIsSubmitting(true);
        const res = await deletePet(pet.petId, token);

        if (res.status === 'fail' || res.status === 'error') {
            console.log(res);
            alert('Pet cannot be deleted.');
        }

        else {
            alert('Pet deleted.');
        }

        setIsSubmitting(false);
    }

    return (
        <div className="petCard flex bg-white p-2 rounded-md items-center shadow-2xl m-3">
            <div className="petCard-image w-2/5">
                <img
                    className="rounded-full"
                    src={pet.imageUrl}
                    alt={pet.name}
                />
            </div>

            <div className="petCard-content w-3/5 ml-3 p-2">
                <div className="petCard-content-header flex justify-around items-center">
                    <div className="petCard-content-name font-bold text-lg">
                        {
                            pet.name
                        }
                    </div>

                    {
                        pet.adoptionStatus === 'none'
                            ?
                            <div className="petCard-content-delete">
                                {
                                    isSubmitting
                                        ?
                                        <CircularProgress />
                                        :
                                        <button type="button">
                                            <MdDelete
                                                onClick={handleDelete}
                                            />
                                        </button>
                                }
                            </div>
                            :
                            null
                    }
                </div>

                <div className="pet-content-breed text-sm text-center my-3 bg-slate-800 rounded-md p-1 text-white">
                    {
                        pet.breed
                    }
                </div>

                <div className="pet-content-attributes flex items-center justify-around">
                    <div className="pet-content-attributes-weight flex flex-col items-center bg-red-200 p-2 rounded-md shadow-md w-15">
                        <div className="pet-content-attributes-weight-value font-lighter">
                            {
                                `${pet.weight} kg`
                            }
                        </div>

                        <div className="pet-content-attributes-weight-label">
                            Weight
                        </div>
                    </div>

                    <div className="pet-content-attributes-age">
                        <div className="pet-content-attributes-age flex flex-col items-center bg-blue-200 p-2 rounded-md shadow-md w-16">
                            <div className="pet-content-attributes-age-value ">
                                {
                                    `${pet.age} yr`
                                }
                            </div>

                            <div className="pet-content-attributes-age-label">
                                Age
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

// pets display component
export default function PetsDisplay() {
    // context
    const authCtx = useContext(AuthContext);

    // query
    const { isLoading, error, data } = useQuery('pets', () => fetchPetsData(authCtx.token));

    if (isLoading)
        return <DisplayLoading />

    if (error)
        return <div>Error</div>

    return (
        <div className="petsDisplay my-10">
            {
                data.data.data.pets.length !== 0
                    ?
                    <div className="petsDisplay-cards rounded-md bg-neutral-300 grid grid-cols-1 md:grid-cols-3">
                        {
                            data.data.data.pets.map(pet => (
                                <PetCard
                                    key={pet.petId}
                                    token={authCtx.token}
                                    pet={pet}
                                />
                            ))
                        }
                    </div>
                    :
                    <div className="petDisplay-empty">
                        <Empty
                            image="/assets/empty2.gif"
                            label="When you adopt a pet, you are giving a second chance to an animal in need and providing them with a loving home."
                        />
                    </div>
            }
        </div>
    );
}