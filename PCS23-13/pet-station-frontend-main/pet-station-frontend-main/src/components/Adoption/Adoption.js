// importing components
import { useState, useContext } from 'react';
import { useQuery } from 'react-query';
import { FormControl, Select, MenuItem, InputLabel } from '@mui/material';

// importing custom components
import AdoptionPetsList from '../AdoptionPetsList/AdoptionPetsList';
import Heading from '../Heading/Heading';
import { DisplayLoading } from '../Loading/Loading';

// importing helper function
import { fetchPetsForAdoptionData } from '../../utilities/helper';

// importing context
import AuthContext from '../../context/auth';

// filter component
function AdoptionFilter(props) {
	const { setFilter } = props;

	return (
		<div className="adoptionFilter">
			<FormControl fullWidth>
				<InputLabel>Filter</InputLabel>
				<Select
					label="Filter"
					defaultValue="dog"
					onChange={(e) => setFilter(e.target.value)}
				>
					<MenuItem value="cat">Cat</MenuItem>
					<MenuItem value="dog">Dog</MenuItem>
				</Select>
			</FormControl>
		</div>
	);
}

function AdoptionSection(props) {
	// props
	const { filter } = props;

	// context
	const authCtx = useContext(AuthContext);

	// query
	const { isLoading, error, data } = useQuery('adoptionPet', () =>
		fetchPetsForAdoptionData(authCtx.token)
	);

	if (isLoading) return <DisplayLoading />;

	if (error) return <div>Normal Error</div>;

	return (
		<div className="adoptionSection">
			{/* filter */}
			<div className="adoption-pets-list">
				<AdoptionPetsList petsList={data.data.pets} filter={filter} />
			</div>
		</div>
	);
}

// adoption component
export default function Adoption() {
	// state
	const [filter, setFilter] = useState('dog');

	return (
		<div className="adoption box-container md:w-4/5 rounded-2xl p-5">
			{/* heading */}
			<div className="adoption-header flex justify-around items-center">
				<div className="adoption-header-heading">
					<Heading
						sticker="/assets/adoption1.png"
						heading="Adoption"
						subheading="Nice and Easy"
					/>
				</div>

				<div className="adoption-header-filter w-24">
					<AdoptionFilter setFilter={setFilter} />
				</div>
			</div>

			{/* content */}
			<div className="adoption-content">
				<AdoptionSection filter={filter} />
			</div>
		</div>
	);
}
