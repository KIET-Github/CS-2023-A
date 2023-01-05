// importing css
import './MessageContainer.css';

// importing components
import { useState } from 'react';

// importing custom components
import Heading from '../Heading/Heading';
import FriendBox from '../FriendBox/FriendBox';
import MessageBox from '../MessageBox/MessageBox';

// importing friend list
import friends from '../../utilities/friendSeed';

// message container component
export default function MessageContainer() {
	// state
	const [currentChat, setCurrentChat] = useState(null);

	return (
		<div className="messageContainer box-container md:w-4/5 rounded-2xl">
			{/* header */}
			<div className="messageContainer-header mb-5">
				<Heading
					sticker="/assets/messages1.png"
					heading="Messages"
					subheading="Message with your friends"
				/>
			</div>

			{/* message section */}
			<div className="messageContainer-section rounded-lg flex">
				{/* friend box */}
				<div className="messageContainer-section-friendBox w-full md:w-2/5">
					<FriendBox
						currentChat={currentChat}
						setCurrentChat={setCurrentChat}
						friends={friends}
					/>
				</div>

				{/* message box */}
				<div className="messageContainer-section-messageBox hidden md:flex md:items-center md:justify-center md:w-3/5">
					{currentChat === null ? (
						<img
							className="messageContainer h-full"
							src="/assets/message1.gif"
							alt="svg"
						/>
					) : (
						<MessageBox currentChat={currentChat} />
					)}
				</div>
			</div>
		</div>
	);
}
