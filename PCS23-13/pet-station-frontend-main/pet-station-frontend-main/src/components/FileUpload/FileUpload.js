/* eslint-disable react/prop-types */
// importing components
import { useState } from 'react';
import { TextField, Button, CircularProgress } from '@mui/material';
import { AiOutlineCloudUpload } from 'react-icons/ai';

export default function FileUpload(props) {
	// states
	const [image, setImage] = useState(null);

	// props
	const { setFile } = props;

	const [isSubmitting, setIsSubmitting] = useState(false);

	// handle upload
	const handleImageUpload = () => {
		// set submitting
		setIsSubmitting(true);

		const data = new FormData();
		data.append('file', image);
		data.append('upload_preset', 'ghost32');
		data.append('cloud_name', 'ghost32');

		fetch('https://api.cloudinary.com/v1_1/ghost32/image/upload', {
			method: 'POST',
			body: data,
		})
			.then((res) => res.json())
			.then((d) => {
				alert('Image is uploaded.');

				setFile(d.url);
				setIsSubmitting(false);
			})
			.catch((err) => {
				alert(err);
				console.log(err);
			});
	};

	return (
		<div className="fileUpload">
			<TextField
				fullWidth
				id="picture"
				type="file"
				onChange={(e) => setImage(e.target.files[0])}
			/>
			<div className="my-2">
				{isSubmitting ? (
					<CircularProgress />
				) : (
					<Button
						disabled={image === null}
						variant="contained"
						onClick={handleImageUpload}
					>
						<AiOutlineCloudUpload />
					</Button>
				)}
			</div>
		</div>
	);
}
