// importing components
import { Backdrop, CircularProgress, Skeleton, Stack } from '@mui/material';

// Big Loading Component
export function FullScreenLoading() {
	return (
		<div className="fullScreenLoading">
			<Backdrop
				sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
				open
			>
				<CircularProgress color="inherit" />
			</Backdrop>
		</div>
	);
}

// card loading component 
export function CardLoading() {
	return (
		<div className="cardLoading p-5">
			<Stack spacing={1}>
				<Skeleton variant="text" sx={{ fontSize: '1rem' }} />
				<Skeleton variant="circular" width={40} height={40} />
				<Skeleton variant="rectangular" width={210} height={60} />
				<Skeleton variant="rounded" width={210} height={60} />
			</Stack>
		</div>
	);
}

// card grid component
export function DisplayLoading(){
    return(
        <div className="p-5 displayLoading grid grid-cols-1 md:grid-cols-3">
            <CardLoading />
            <CardLoading />
            <CardLoading />
        </div>
    )
}