// importing components
import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { MdDelete } from "react-icons/md";
import { 
    FormControl, 
    InputLabel, 
    Select, 
    MenuItem, 
    CircularProgress 
} from '@mui/material';

// importing custom components
import Empty from '../Empty/Empty';
import { DisplayLoading } from '../Loading/Loading';

// importing helper functions
import {  
    removePetFromAdoption, 
    getAdoptionRequest, 
    completeAdoption,
    fetchPetsData
} from "../../utilities/helper";

// adoption request component
function AdoptionRequest(props) {
    const { petId, token } = props;
    const [requests, setRequests] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        getAdoptionRequest(petId, token)
            .then(res => setRequests(res.data.requests))
            .catch(err => console.log(err))
    }, [])

    // function to complete adoption 
    const handleCompleteAdoption = async (e) => {
        setIsSubmitting(true);

        const userId = e.target.value;

        const res = await completeAdoption(userId, petId, token);

        if (res.status === 'fail' || res.status === 'error') {
            alert('Pet adoption cannot be completed.');
            setIsSubmitting(false);
        }

        else {
            alert('Pet adoption complete.');
        }
    }

    return (
        <FormControl fullWidth>
            {
                isSubmitting
                    ?
                    <CircularProgress />
                    :
                    <>
                        <InputLabel id="complete">Complete</InputLabel>
                        <Select
                            disabled={requests.length === 0}
                            labelId="complete"
                            id="complete"
                            label="Complete"
                            defaultValue=""
                            onChange={handleCompleteAdoption}
                        >
                            {
                                requests.map(request =>
                                    <MenuItem key={request.userId} value={request.userId}>
                                        {
                                            request.name
                                        }
                                    </MenuItem>
                                )
                            }
                        </Select>
                    </>
            }
        </FormControl>
    );
}

// pet card component
function PetCard(props) {
    // props
    const { pet, token } = props;

    // state
    const [isSubmitting, setIsSubmitting] = useState(false);

    // function to handle adoption removal
    const handleRemoveFromAdoption = async () => {
        setIsSubmitting(true);
        const res = await removePetFromAdoption(pet.petId, token);

        if (res.status === 'fail' || res.status === 'error') {
            alert('Pet cannot be removed from adoption.');
        }

        else {
            alert('Pet removed from adoption.');
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

                    <div className="petCard-content-delete">
                        {
                            isSubmitting
                                ?
                                <CircularProgress />
                                :
                                <button type="button">
                                    <MdDelete
                                        onClick={handleRemoveFromAdoption}
                                    />
                                </button>
                        }
                    </div>
                </div>

                <div className="pet-content-breed text-sm text-center my-3 bg-slate-800 rounded-md p-1 text-white">
                    {
                        pet.breed
                    }
                </div>

                <div className="pet-content-complete">
                    <AdoptionRequest
                        petId={pet.petId}
                        token={token}
                    />
                </div>
            </div>
        </div>
    );
}

// adoption pets display component
export default function AdoptionPetsDisplay(props) {
    // props
    const { token } = props;

    // fetch pet information
    const { isLoading, error, data } = useQuery('pets', () => fetchPetsData(token));

    if (isLoading)
        return <DisplayLoading />

    if (error)
        return <div>Normal Error</div>

    return (
        <div className="petsDisplay my-10">
            {
                    data.data.data.count !== 0
                    ?
                    <div className="rounded-md bg-neutral-300 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
                        {
                            data.data.data.pets.filter(pet => pet.adoptionStatus === 'pending').map(pet => <PetCard key={pet.petId} token={token} pet={pet} />)
                        }
                    </div>
                    :
                    <div className="petDisplay-empty">
                        <Empty
                            image="/assets/empty3.gif"
                            label="Help make room for more animals in need by adopting from us."
                        />
                    </div>
            }
        </div>
    );
}