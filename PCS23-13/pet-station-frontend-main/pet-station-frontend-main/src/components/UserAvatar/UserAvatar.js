// importing components
import { Avatar } from '@mui/material';

// Avatar component
export default function UserAvatar(props) {
	// deconstructing props
	const { profilePictureUrl, width = 100, height = 100, name } = props;

	return (
		<div className="avatar">
			{profilePictureUrl === null ? (
				<Avatar sx={{ width, height }}>{name.charAt(0)}</Avatar>
			) : (
				<Avatar sx={{ width, height }} src={profilePictureUrl} alt={name} />
			)}
		</div>
	);
}
