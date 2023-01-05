// importing components
import { useContext, useState } from 'react';
import { useQuery } from 'react-query';
import {
	Button,
	CircularProgress,
	FormControl,
	TextField,
	Typography,
	FormControlLabel,
	Checkbox,
	InputLabel,
	Select,
	MenuItem,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { MdModeEditOutline } from 'react-icons/md';

// importing custom components
import Heading from '../Heading/Heading';
import UserAvatar from '../UserAvatar/UserAvatar';
import FileUpload from '../FileUpload/FileUpload';

// importing helper function
import {
	fetchUserData,
	updateUserData,
	updatePassword,
} from '../../utilities/helper';

// importing context
import AuthContext from '../../context/auth';

// header
function Header(props) {
	// props
	const { heading, subheading } = props;

	return (
		<div className="header">
			<Typography variant="h4" className="header-heading">
				{heading}
			</Typography>

			<Typography variant="h6" className="header-subheading">
				{subheading}
			</Typography>
		</div>
	);
}

// personal details setting
function PersonalDetailsSetting(props) {
	const { authCtx } = props;

	const { isLoading, error, data } = useQuery('user', () =>
		fetchUserData(authCtx.token)
	);

	if (isLoading) return <div>... Loading</div>;

	if (error) return <div>Error</div>;

	// handle form submission
	const handleSubmit = async (values, { resetForm }) => {
		const res = await updateUserData(values);

		if (res.status === 'error' || res.status === 'fail') {
			alert(res.message);

			resetForm();
		} else {
			alert(res.data.msg);
		}
	};

	// handler to toggle edit button
	const [formDisabled, setFormDisabled] = useState(true);
	const handleEditToggle = () => {
		setFormDisabled(!formDisabled);
	};

	// validation schema
	const validationSchema = Yup.object().shape({
		firstName: Yup.string('Enter your first name').required(
			'First name is required'
		),
		lastName: Yup.string('Enter your last name').required(
			'Last name is required'
		),
		email: Yup.string('Enter your email')
			.email('Enter a valid email')
			.required('Email is required'),
		password: Yup.string('Enter your password')
			.min(8, 'Password should be minimum of 8 characters.')
			.required('Password is required'),
		confirmPassword: Yup.string('Confirm your password')
			.test(
				'is same',
				'Password does not match',
				(value, ctx) => value === ctx.parent.password
			)
			.required('Password confirmation is required'),
		gender: Yup.string('Select your gender').required('Gender Required'),
	});

	// formik state
	const formik = useFormik({
		initialValues: {
			firstName: data.data.data.firstName,
			lastName: data.data.data.lastName,
			gender: data.data.data.gender,
			email: data.data.data.email,
			phoneNumber:
				data.data.data.phoneNumber === null ? '' : data.data.data.phoneNumber,
		},
		validationSchema,
		onSubmit: handleSubmit,
	});

	return (
		<div className="personalDetailsSetting">
			<div className="personalDetailsSetting mb-5">
				<Header
					heading="Personal Details"
					subheading="Change your personal details"
				/>
			</div>

			<FormControl>
				<div className="personalDetailsSetting-content">
					<div className="flex flex-col md:flex-row">
						<div className="inputField mb-3 md:mr-2">
							<TextField
								fullWidth
								id="firstName"
								name="firstName"
								label="First Name"
								disabled={formDisabled}
								type="text"
								value={formik.values.firstName}
								onChange={formik.handleChange}
								error={
									formik.touched.firstName && Boolean(formik.errors.firstName)
								}
								helperText={formik.touched.firstName && formik.errors.firstName}
							/>
						</div>

						<div className="inputField mb-3">
							<TextField
								fullWidth
								id="lastName"
								name="lastName"
								label="Last Name"
								disabled={formDisabled}
								type="text"
								value={formik.values.lastName}
								onChange={formik.handleChange}
								error={
									formik.touched.lastName && Boolean(formik.errors.lastName)
								}
								helperText={formik.touched.lastName && formik.errors.lastName}
							/>
						</div>
					</div>

					<div className="inputField mb-3">
						<FormControl fullWidth>
							<InputLabel id="gender">Gender</InputLabel>
							<Select
								labelId="gender"
								id="gender"
								value={formik.values.gender}
								label="Gender"
								disabled={formDisabled}
								name="gender"
								onChange={formik.handleChange}
								error={formik.touched.gender && Boolean(formik.errors.gender)}
							>
								<MenuItem value="male">Male</MenuItem>
								<MenuItem value="female">Female</MenuItem>
								<MenuItem value="others">Others</MenuItem>
							</Select>
						</FormControl>
					</div>

					<div className="inputField mb-3">
						<TextField
							fullWidth
							id="email"
							name="email"
							label="Email"
							disabled={formDisabled}
							type="text"
							value={formik.values.email}
							onChange={formik.handleChange}
							error={formik.touched.email && Boolean(formik.errors.email)}
							helperText={formik.touched.email && formik.errors.email}
						/>
					</div>

					<div className="inputField mb-3">
						<TextField
							fullWidth
							id="phoneNumber"
							name="phoneNumber"
							label="Phone Number"
							disabled={formDisabled}
							type="text"
							value={formik.values.phoneNumber}
							onChange={formik.handleChange}
							error={
								formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
							}
							helperText={
								formik.touched.phoneNumber && formik.errors.phoneNumber
							}
						/>
					</div>

					<div className="personalDetailsSetting-button-group flex my-5">
						<div className="personalDetailsSetting-updateButton">
							{formik.isSubmitting ? (
								<CircularProgress color="inherit" />
							) : (
								<Button
									variant="contained"
									color="success"
									onClick={formik.handleSubmit}
									type="submit"
									disabled={formDisabled}
								>
									Update
								</Button>
							)}
						</div>

						<div className="personalDetailsSetting-editButton mx-5">
							<Button
								onClick={handleEditToggle}
								variant="contained"
								color="warning"
							>
								<div>
									<MdModeEditOutline />
								</div>

								<div className="mx-2">Edit</div>
							</Button>
						</div>
					</div>
				</div>
			</FormControl>
		</div>
	);
}

// profile picture setting
function ProfilePictureSetting(props) {
	const { authCtx } = props;

	// state
	const [image, setImage] = useState(null);

	// handle profile upload
	const handleImageUpdate = async () => {
		const payload = {
			profilePictureUrl: image,
		};

		const res = await updateUserData(payload, authCtx.token);

		if (res.error) {
			alert('Pet cannot be created.');
		} else {
			alert(res.data);
			setImage(null);
		}
	};

	// query
	const { isLoading, error, data } = useQuery('user', () =>
		fetchUserData(authCtx.token)
	);

	if (isLoading) return <div>... Loading</div>;

	if (error) return <div>.. Error</div>;

	return (
		<div className="profilePictureSetting">
			<div className="profilePictureSetting-header">
				<Header
					heading="Profile Picture"
					subheading="Change your profile picture"
				/>
			</div>

			<div className="profilePictureSetting-avatar p-10 flex flex-col md:flex-row items-center justify-around">
				<div className="profilePictureSetting-avatar-img mb-5 md:mb-0">
					<UserAvatar
						profilePictureUrl={data.data.data.profilePictureUrl}
						name={data.data.data.firstName}
					/>
				</div>

				<div className="profilePictureSetting-avatar-edit">
					<FileUpload label="Upload" setFile={setImage} />

					<Button
						variant="contained"
						color="success"
						onClick={handleImageUpdate}
						disabled={image === null}
					>
						Update
					</Button>
				</div>
			</div>
		</div>
	);
}

// username setting
// function UsernameSetting() {
// 	return (
// 		<div className="usernameSetting">
// 			<Header heading="Username" subheading="Change your username" />
// 		</div>
// 	);
// }

// reset password setting
function ResetPasswordSetting(props) {
	// props
	const { authCtx } = props;

	// state
	const [showPassword, setShowPassword] = useState(false);

	// validation schema
	const validationSchema = Yup.object().shape({
		password: Yup.string('Enter your password')
			.min(8, 'Password should be minimum of 8 characters.')
			.required('Password is required'),
		confirmPassword: Yup.string('Confirm your password')
			.test(
				'is same',
				'Password does not match',
				(value, ctx) => value === ctx.parent.password
			)
			.required('Password confirmation is required'),
	});

	// handle form submission
	const handleSubmit = async (values, { resetForm }) => {
		const payload = {
			userId: authCtx.user.userId,
			password: values.password,
		};

		const res = await updatePassword(payload, authCtx.token);

		if (res.status === 'error' || res.status === 'fail') {
			alert(res.message);

			resetForm();
		} else {
			alert(res.msg);
		}
	};

	// form
	const formik = useFormik({
		initialValues: {
			password: '',
			confirmPassword: '',
		},
		validationSchema,
		onSubmit: handleSubmit,
	});

	return (
		<div className="resetPasswordSetting">
			<div className="resetPasswordSetting-header">
				<Header heading="Reset Password" subheading="Change your password" />
			</div>

			<div className="resetPasswordSetting-form p-10">
				<FormControl>
					<div className="mb-3">
						<TextField
							fullWidth
							id="password"
							name="password"
							label="Password"
							type={showPassword ? 'text' : 'password'}
							value={formik.values.password}
							onChange={formik.handleChange}
							error={formik.touched.password && Boolean(formik.errors.password)}
							helperText={formik.touched.password && formik.errors.password}
						/>
					</div>

					<div className="mb-3">
						<TextField
							fullWidth
							id="confirmPassword"
							name="confirmPassword"
							label="Confirm Password"
							type={showPassword ? 'text' : 'password'}
							value={formik.values.confirmPassword}
							onChange={formik.handleChange}
							error={
								formik.touched.confirmPassword &&
								Boolean(formik.errors.confirmPassword)
							}
							helperText={
								formik.touched.confirmPassword && formik.errors.confirmPassword
							}
						/>
					</div>

					<div className="mb-3">
						<FormControlLabel
							onChange={() => {
								setShowPassword(!showPassword);
							}}
							control={<Checkbox />}
							label="Show Password"
						/>
					</div>

					<div className="my-3">
						{formik.isSubmitting ? (
							<CircularProgress />
						) : (
							<Button
								onClick={formik.handleSubmit}
								disabled={formik.isSubmitting}
								variant="contained"
								color="success"
								type="submit"
							>
								Update Password
							</Button>
						)}
					</div>
				</FormControl>
			</div>
		</div>
	);
}

// adoption component
export default function Settings() {
	// auth context
	const authCtx = useContext(AuthContext);

	return (
		<div className="settings box-container md:w-4/5 rounded-2xl p-5">
			{/* heading  */}
			<div className="settings-header mb-10">
				<Heading
					sticker="/assets/setting1.png"
					heading="Settings"
					subheading="Personalize your account"
				/>
			</div>

			{/* personal details */}
			<div className="settings-personal-details mb-5">
				<PersonalDetailsSetting authCtx={authCtx} />
			</div>

			{/* profile picture setting */}
			<div className="settings-profilePicture mb-5">
				<ProfilePictureSetting authCtx={authCtx} />
			</div>

			{/* username setting  */}
			{/* <div className="settings-username mb-5">
				<UsernameSetting />
			</div> */}

			{/* password reset setting  */}
			<div className="settings-password mb-5">
				<ResetPasswordSetting authCtx={authCtx} />
			</div>
		</div>
	);
}
