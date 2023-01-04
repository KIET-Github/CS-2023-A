// importing components
import { useState } from 'react';
import { useQuery } from 'react-query';
import { Modal, Button, CircularProgress, Box, Divider } from '@mui/material';
import { GrClose } from "react-icons/gr";

// importing helper function
import { fetchPetsData, putPetOnAdoption } from '../../utilities/helper';

// option brick component
function OptionBrick(props) {
    // props
    const { pet, token, handleClose } = props;

    // state
    const [isSubmitting, setIsSubmitting] = useState(false);

    // put pet for adoption
    const handlePutOnAdopt = async (petId) => {
        setIsSubmitting(true);
        const res = await putPetOnAdoption(petId, token);

        if (res.status === 'fail' || res.status === 'error') {
            alert('Pet cannot be put on adoption.');
        }

        else {
            alert('Pet is put for adoption.');
            handleClose();
        }
    }

    return (
        <div className="adoptPetForm-option flex items-center justify-between px-5 mb-3">
            <div className="adoptPetForm-option font-bold text-lg flex items-center">
                <div className="adoptPetForm-option-img">
                    <img
                        className="rounded-full"
                        src={pet.imageUrl}
                        width={50}
                        height={50}
                        alt={pet.name}
                    />
                </div>

                <div className="adoptPetForm-option-name mx-2">
                    {
                        pet.name
                    }
                </div>
            </div>

            <div className="adoptPetForm-option-button">
                {
                    isSubmitting
                        ?
                        <CircularProgress />
                        :
                        <Button
                            onClick={() => handlePutOnAdopt(pet.petId)}
                            variant="contained"
                            color="success"
                        >
                            Add
                        </Button>
                }
            </div>
        </div>
    );
}

// adopt pet form component
function AdoptPetForm(props) {
    // token
    const { token, handleClose } = props;
    
    // query
    const { isLoading, error, data } = useQuery('pets', () => fetchPetsData(token));

    if(isLoading)
        return <div>... Loading</div>

    if(error)
        return <div>... Error</div>

    return (
        <div className="adoptPetForm">
            {/* header */}
            <div className="adoptPetForm-header flex items-center justify-between px-5">
                <div className="adoptPetForm-header-title text-xl font-bold">
                    Available Pets
                </div>

                <button type="button" onClick={handleClose} className="adoptPetForm-header-close">
                    <GrClose />
                </button>
            </div>

            <div className="my-3">
                <Divider />
            </div>

            {/* available pets modal  */}
            <div className="adoptPetForm-header-options">
                {
                    data.data.data.pets.filter(pet => pet.adoptionStatus === 'none').map(pet =>
                        <OptionBrick
                            key={pet.petId}
                            token={token}
                            handleClose={handleClose}
                            pet={pet}
                        />
                    )
                }
            </div>
        </div>
    );
}

// style
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 2,
};

// User Put for Adoption Pet Button
export default function PutForAdoption(props) {
    // props
    const { token } = props;

    // states
    const [open, setOpen] = useState(false);

    // function to close modal
    const handleClose = () => {
        setOpen(false);
    }

    return (
        <div className="adoptPet">
            <Button
                onClick={() => { setOpen(true); }}
                variant="contained"
            >
                Pet For Adoption
            </Button>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="new pet button"
                aria-describedby="new pet form"
            >
                <Box
                    className='rounded-lg'
                    sx={style}
                >
                    <AdoptPetForm
                        token={token}
                        handleClose={handleClose}
                    />
                </Box>
            </Modal>
        </div>
    );
}