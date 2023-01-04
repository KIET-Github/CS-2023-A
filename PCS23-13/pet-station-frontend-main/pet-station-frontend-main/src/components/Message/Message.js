// message component
export default function Message(props) {
	// props
	const { content, type } = props;

	return (
		<div
			className={`message mb-3 p-3 rounded-md ${
				type === 'sent' ? 'bg-neutral-600 text-white' : 'bg-white text-black'
			} `}
		>
			<div className="message-content">{content}</div>
		</div>
	);
}
