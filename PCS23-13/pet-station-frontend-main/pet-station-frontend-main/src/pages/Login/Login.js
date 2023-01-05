// importing css
import './Login.css';

// importing components
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Checkbox, TextField, FormControlLabel, FormControl, CircularProgress } from '@mui/material';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Banner from '../../components/Banner/Banner';

// importing helper functions
import { handleLogin } from '../../utilities/helper';

// importing context
import AuthContext from '../../context/auth';

// validation schema
const validationSchema = Yup.object({
    email: Yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: Yup
        .string('Enter your password')
        .min(8, 'Password should be minimum of 8 characters.')
        .required('Password is required')
})

// login form component
function LoginForm() {
    // state
    const [showPassword, setShowPassword] = useState(false);
    const authCtx = useContext(AuthContext);    // context
    const navigator = useNavigate();

    // handle form submission
    const handleSubmit = async (values, { resetForm }) => {
        // login user 
        const res = await handleLogin(values);

        console.log(res);

        if (res.status === 'error' || res.status === 'fail') {
            alert(res.message);

            resetForm();
        } else {
            alert(res.data.msg);

            authCtx.login(res.data.token);    // login user
            navigator('/', { replace: true });
        }
    }

    // formik state
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema,
        onSubmit: handleSubmit
    });

    return (
        <div className="loginForm flex flex-col items-center my-10">
            <div className="loginForm-heading font-bold text-3xl mb-5">
                Login.
            </div>

            <div className="loginForm-subheading text-center mb-10">
                Hey, Enter your details to get sign in to your account
            </div>

            <div className="loginForm-form w-4/5 md:w-3/5 lg:w-2/5">
                <FormControl>
                    <div className="loginForm-form-inputField mb-3">
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

                    <div className="loginForm-form-inputField mb-3">
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

                        <FormControlLabel
                            onChange={() => { setShowPassword(!showPassword); }}
                            control={<Checkbox />}
                            label="Show Password"
                        />
                    </div>

                    <div className="loginForm-form-reset mb-3">
                        <Link to="/forgot-password">
                            Having trouble signing in?
                        </Link>
                    </div>

                    <div className="loginForm-form-loginButton my-5">
                        {
                            formik.isSubmitting
                                ?
                                <CircularProgress color='inherit' />
                                :
                                <button
                                    onClick={formik.handleSubmit}
                                    className="loginForm-form-submitButton hover:shadow-2xl p-2"
                                    type="submit"
                                    disabled={formik.isSubmitting}
                                >

                                    Login
                                </button>
                        }
                    </div>
                </FormControl>
            </div>

            <div className="loginForm-form-signup font-lighter text-neutral-800">
                {
                    `Don't have an account? `
                }
                <span className="font-semibold">
                    <Link to="/signup">
                        Sign up
                    </Link>
                </span>
            </div>
        </div >
    )
}

// Login component
export default function LoginPage() {
    return (
        <div className="loginPage flex h-screen">
            <div className="loginPage-content p-10 md:w-3/5">
                <div className="loginPage-content-banner">
                    <Banner />
                </div>

                <div className="loginPage-content-form">
                    <LoginForm />
                </div>

                <div className="loginPage-content-copyright font-lighter text-xs text-center text-neutral-800 mt-5">
                    {
                        `Copyright © ${new Date().getFullYear()} Pet Station. All rights reserved.`
                    }
                </div>
            </div>

            <div className="loginPage-image hidden md:block md:w-2/5">
                <img
                    className="h-full w-full object-cover"
                    src='/assets/login1.png'
                    alt='dog sitting'
                />
            </div>
        </div>
    )
}