// importing components
import { Typography, CircularProgress } from '@mui/material';
import { useQuery } from 'react-query';
import { useContext } from 'react';
import UserAvatar from '../UserAvatar/UserAvatar';

// importing context
import AuthContext from '../../context/auth';

// importing helper functions
import { getUserFriend } from '../../utilities/helper';

// friend brick component
function FriendBrick(props) {
	// props
	const { friend, currentChat, setCurrentChat } = props;

	// function to select receiver
	const handleClick = () => {
		const { userId } = friend;
		setCurrentChat(userId);
	};

	return (
		// eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
		<div
			onClick={handleClick}
			className={`friendBrick h-22 p-3 cursor-pointer flex ${
				currentChat === friend.userId ? 'bg-blue-200 rounded-lg' : ''
			}`}
		>
			{/* content */}
			<div className="friendBrick-content flex items-center w-4/5">
				<div className="friendBrick-content-avatar">
					{/* avatar */}
					<UserAvatar
						profilePictureUrl={friend.profilePictureUrl}
						name={friend.name}
						height={50}
						width={50}
					/>
				</div>

				<div className="friendBrick-content-title mx-3">
					{/* label */}
					<Typography variant="h6" className="friendBrick-content-title-label">
						{friend.name}
					</Typography>
				</div>
			</div>
		</div>
	);
}

// friend box component
export default function FriendBox(props) {
	// props
	const { currentChat, setCurrentChat } = props;
	const authCtx = useContext(AuthContext);

	// fetch data
	const { isLoading, error, data } = useQuery('friends', () =>
		getUserFriend(authCtx.token)
	);

	if (isLoading)
		return (
			<div className="flex items-center justify-center">
				<CircularProgress />
			</div>
		);

	if (error) return <div>error</div>;

	return (
		<div className="friendBox rounded-lg overflow-auto p-2 h-full w-full">
			{data.data.friends.map((friend) => (
				<FriendBrick
					key={friend.userId}
					currentChat={currentChat}
					friend={friend}
					setCurrentChat={setCurrentChat}
				/>
			))}
		</div>
	);
}
