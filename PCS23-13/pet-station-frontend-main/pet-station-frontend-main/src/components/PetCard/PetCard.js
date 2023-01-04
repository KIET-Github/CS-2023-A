/* eslint-disable react/prop-types */

// importing components
import { useContext, useState } from 'react';

import { Button, Divider, CircularProgress } from '@mui/material';

// importing context
import AuthContext from '../../context/auth';

// importing helper function
import {
	sendAdoptionRequest,
	cancelAdoptionRequest,
	addUserFriend,
} from '../../utilities/helper';

// pet card component
export default function PetCard(props) {
	const { pet } = props;

	// state
	const [isSubmitting, setIsSubmitting] = useState(false);

	// context
	const authCtx = useContext(AuthContext);

	// handle adoption cancel
	const handleAdoptionRequest = async (petId) => {
		setIsSubmitting(true);

		const res = await sendAdoptionRequest(petId, authCtx.token);

		if (res.status === 'fail' || res.status === 'error') {
			alert('Adoption request is not sent.');
		} else {
			alert('Adoption request is sent.');
		}

		setIsSubmitting(false);
	};

	// handle cancel adoption
	const handleCancelAdoption = async (petId) => {
		setIsSubmitting(true);

		const res = await cancelAdoptionRequest(petId, authCtx.token);

		if (res.status === 'fail' || res.status === 'error') {
			alert('Unable to sent cancel adoption request.');
		} else {
			alert('Sent adoption cancel request.');
		}

		setIsSubmitting(false);
	};

	const handleAddFriend = async () => {
		const res = await addUserFriend(pet.ownerId, authCtx.token);

		if (res.status === 'fail' || res.status === 'error') {
			alert('Unable to add friend');
		} else {
			alert('Added friend');
		}
	};

	return (
		<div className="petCard flex flex-col items-center bg-white rounded-2xl p-5 m-3">
			<div className="petCard-image w-3/5 mb-3">
				<img className="rounded-full" src={pet.imageUrl} alt={pet.name} />
			</div>

			<div className="petCard-content w-full">
				<div className="petCard-content-header flex justify-around items-center">
					<div className="pet-content-header-name text-xl font-bold">
						{pet.name}
					</div>

					<div className="pet-content-header-breed text-sm text-center my-3 bg-slate-800 rounded-md p-1 text-white">
						{pet.breed}
					</div>
				</div>

				<div className="my-3">
					<Divider />
				</div>

				<div className="petCard-content-description text-center text-lg">
					{pet.description}
				</div>

				<div className="my-3">
					<Divider />
				</div>

				<div className="pet-content-attributes flex items-center justify-around mb-5">
					<div className="pet-content-attributes-weight flex flex-col items-center bg-red-200 p-2 rounded-md shadow-md w-15">
						<div className="pet-content-attributes-weight-value font-lighter">
							{`${pet.weight} kg`}
						</div>

						<div className="pet-content-attributes-weight-label">Weight</div>
					</div>

					<div className="pet-content-attributes-age">
						<div className="pet-content-attributes-age flex flex-col items-center bg-blue-200 p-2 rounded-md shadow-md w-16">
							<div className="pet-content-attributes-age-value ">
								{`${pet.age} yr`}
							</div>

							<div className="pet-content-attributes-age-label">Age</div>
						</div>
					</div>

					<div className="pet-content-attributes-gender">
						<div className="pet-content-attributes-gender flex flex-col items-center bg-blue-200 p-2 rounded-md shadow-md w-16">
							<div className="pet-content-attributes-gender">
								{`${pet.gender}`}
							</div>

							<div className="pet-content-attributes-gender-label">Gender</div>
						</div>
					</div>
				</div>

				<div className="flex">
					<div className="petCard-content-adoptionButton px-2">
						{
							// eslint-disable-next-line no-nested-ternary
							pet.adoptionRequest.includes(authCtx.user.userId) ? (
								isSubmitting ? (
									<CircularProgress />
								) : (
									<Button
										onClick={() => handleCancelAdoption(pet.petId)}
										color="error"
										variant="contained"
									>
										Cancel
									</Button>
								)
							) : isSubmitting ? (
								<CircularProgress />
							) : (
								<Button
									onClick={() => handleAdoptionRequest(pet.petId)}
									color="success"
									variant="contained"
								>
									Adopt
								</Button>
							)
						}
					</div>

					<div className="petCard-content-message">
						<Button onClick={handleAddFriend} variant="contained" color="info">
							Message
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
