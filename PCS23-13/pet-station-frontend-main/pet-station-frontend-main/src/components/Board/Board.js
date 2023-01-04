/* eslint-disable react/prop-types */
// importing components
import { useEffect } from 'react';
import Profile from '../Profile/Profile';
import Adoption from '../Adoption/Adoption';
import MessageContainer from '../MessageContainer/MessageContainer';
import Settings from '../Settings/Settings';

// importing socket
import socket from '../../websocket/socketio';

// board component
export default function Board(props) {
	const { option, authCtx, user } = props;
	
	useEffect(() => { // function to make socket connection 
		function socketConnection() { 
			socket.connect(); 
			localStorage.setItem('userId', authCtx.user.userId); 
		} 
		socketConnection(); 
		// invoke socket connection 
	}, []);

	return (
		<>
			<div className="board flex items-center justify-center">
				{option === 'profile' ? (
					<Profile authCtx={authCtx} user={user} />
				) : null}
				{option === 'adoption' ? (
					<Adoption authCtx={authCtx} user={user} />
				) : null}
				{option === 'messages' ? (
					<MessageContainer authCtx={authCtx} user={user} />
				) : null}
				{option === 'settings' ? (
					<Settings authCtx={authCtx} user={user} />
				) : null}
			</div>

			<div className="profile-copyright font-lighter text-xs text-center text-neutral-800 py-10">
				{`Copyright © ${new Date().getFullYear()} Pet Station. All rights reserved.`}
			</div>
		</>
	);
}
