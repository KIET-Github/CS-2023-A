// importing css
import './Signup.css';

// importing components
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
	TextField,
	CircularProgress,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

import Banner from '../../components/Banner/Banner';

// importing helper functions
import { handleSignup } from '../../utilities/helper';

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

// signup form component
function SignupForm() {
	// state
	const navigator = useNavigate();

	// handle form submission
	const handleSubmit = async (values, { resetForm }) => {
		const res = await handleSignup(values);

		if (res.status === 'error' || res.status === 'fail') {
			alert(res.message);

			resetForm();
		} else {
			alert(res.data.msg);

			navigator('/login', { replace: true });
		}
	};

	// formik state
	const formik = useFormik({
		initialValues: {
			firstName: '',
			lastName: '',
			gender: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
		validationSchema,
		onSubmit: handleSubmit,
	});

	return (
		<div className="signupForm flex flex-col items-center my-10">
			<div className="signupForm-heading font-bold text-3xl mb-5">Sign Up</div>

			<div className="signupForm-subheading text-center mb-10">
				Hey, Enter your details to create a new account
			</div>

			<div className="signupForm-form w-4/5 md:w-3/5 lg:w-2/5">
				<FormControl fullWidth>
					<div className="flex flex-col md:flex-row">
						<div className="signupForm-form-inputField mb-3 md:mr-2">
							<TextField
								fullWidth
								id="firstName"
								name="firstName"
								label="First Name"
								type="text"
								value={formik.values.firstName}
								onChange={formik.handleChange}
								error={
									formik.touched.firstName && Boolean(formik.errors.firstName)
								}
								helperText={formik.touched.firstName && formik.errors.firstName}
							/>
						</div>

						<div className="signupForm-form-inputField mb-3">
							<TextField
								fullWidth
								id="lastName"
								name="lastName"
								label="Last Name"
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

					<div className="signupForm-form-inputField mb-3">
						<FormControl fullWidth>
							<InputLabel id="gender">Gender</InputLabel>
							<Select
								labelId="gender"
								id="gender"
								value={formik.values.gender}
								label="Gender"
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

					<div className="signupForm-form-inputField mb-3">
						<TextField
							fullWidth
							id="email"
							name="email"
							label="Email"
							type="text"
							value={formik.values.email}
							onChange={formik.handleChange}
							error={formik.touched.email && Boolean(formik.errors.email)}
							helperText={formik.touched.email && formik.errors.email}
						/>
					</div>

					<div className="signupForm-form-inputField mb-3">
						<TextField
							fullWidth
							id="password"
							name="password"
							label="Password"
							type="password"
							value={formik.values.password}
							onChange={formik.handleChange}
							error={formik.touched.password && Boolean(formik.errors.password)}
							helperText={formik.touched.password && formik.errors.password}
						/>
					</div>

					<div className="signupForm-form-inputField mb-3">
						<TextField
							fullWidth
							id="confirmPassword"
							name="confirmPassword"
							label="Confirm Password"
							type="password"
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

					<div className="signupForm-form-loginButton my-5">
						{formik.isSubmitting ? (
							<CircularProgress color="inherit" />
						) : (
							<button
								onClick={formik.handleSubmit}
								className="signupForm-form-submitButton hover:shadow-2xl p-2"
								type="submit"
								disabled={formik.isSubmitting}
							>
								Sign up
							</button>
						)}
					</div>
				</FormControl>
			</div>

			<div className="signupForm-form-signup font-lighter text-neutral-800">
				{`Already have an account? `}
				<span className="font-semibold">
					<Link to="/login">Log in</Link>
				</span>
			</div>
		</div>
	);
}

// Signup component
export default function SignupPage() {
	return (
		<div className="signupPage flex h-screen">
			<div className="signupPage-content p-10 md:w-3/5">
				<div className="signupPage-content-banner">
					<Banner />
				</div>

				<div className="signupPage-content-form">
					<SignupForm />
				</div>
			</div>

			<div className="signupPage-image hidden md:block md:w-2/5">
				<img
					className="h-full w-full object-cover"
					src="/assets/signup1.png"
					alt="dog running"
				/>
			</div>
		</div>
	);
}
