import React, {useContext, useState} from 'react';
import {Formik } from 'formik'
import * as Yup from 'yup';
import {Axios} from '../utils';
import {GlobalStateContext} from '../App';
import { useHistory } from "react-router-dom";
import {FaReact} from "react-icons/fa";
import { Redirect  } from "react-router-dom";



const Register = () => {
    const globalState = useContext(GlobalStateContext);
    let history = useHistory();

    const registerUser = async (values, setSubmitting, setErrors) => {
        try{
            let result = await Axios.post('/accounts/', values);
            globalState.setSuccess(true);
            setSubmitting(false);
            history.push('/login/');
        } catch(err){
            if(!err.response){
                console.log(err.response)
            }
            setErrors(err.response.data);
            setSubmitting(false);
        }
    }

    
    return(
        <>
            <div className="container">
                <div className="card-container">
                    <h1 className="lg-heading">Signup for TikTak</h1>
                    <Formik
                    initialValues={
                        {
                            username: "",
                            email: "",
                            first_name: "",
                            last_name: "",
                            password: "",
                            password2: "",
                        }
                    }
                    validationSchema={
                        Yup.object({
                            username: Yup.string().required('Required.'),
                            email: Yup.string().email('Please enter a valid email address.').required('Required.'),
                            first_name: Yup.string(),
                            last_name: Yup.string(),
                            password: Yup.string().required('Required.').min(8,'Password is too short, at least make it 8 characters long.').matches(/[a-zA-Z]/, 'Password must contain small case and upper case letters').matches(/\d/, 'Must contain a number').matches(/[!@#$%^&*]/, 'Must contain a special character'),   
                            password2: Yup.string().required('Required.').oneOf([Yup.ref('password'), null], "Passwords don't match")
                        })
                    }
                    onSubmit={ (values, {setSubmitting, setErrors}) =>  {
                        registerUser(values, setSubmitting, setErrors)
                    }}
                    >
                        {formik => (
                            
                            <form onSubmit={formik.handleSubmit}>
                                <div className="field-flex">
        
                                    <div className="field-container">
                                        <input type="text" id="username" {...formik.getFieldProps('username')} />
                                        <label htmlFor="username" className="field-required">Username</label>
                                        {formik.touched.username && formik.errors.username ? (
                                        <div className="field-error">{formik.errors.username}</div>
                                        ) : null}
                                       
                                    </div>
                                    
                                    <div className="field-container">
                                        <input type="email" id="email" {...formik.getFieldProps('email')}/>
                                        <label htmlFor="email" className="field-required">Email</label>
                                        {formik.touched.email && formik.errors.email ? (
                                        <div className="field-error">{formik.errors.email}</div>
                                        ) : null}
                                        
                                    </div>
                                </div>
        
                                <div className="field-flex">
                                    <div className="field-container">
                                        <input type="text" id="first_name" {...formik.getFieldProps('first_name')} />
                                        <label htmlFor="first_name">First Name</label>
                                        {formik.touched.first_name && formik.errors.first_name ? (
                                        <div className="field-error">{formik.errors.first_name}</div>
                                        ) : null}
                                    </div>
                                    <div className="field-container">
                                        <input type="text" id="last_name" {...formik.getFieldProps('last_name')} />
                                        <label htmlFor="last_name">Last Name</label>
                                        {formik.touched.last_name && formik.errors.last_name ? (
                                        <div className="field-error">{formik.errors.last_name}</div>
                                        ) : null}
                                    </div>
                                </div>
        
                                <div className="field-flex">
                                    <div className="field-container">
                                        <input type="password" id="password" {...formik.getFieldProps('password')}/>
                                        <label htmlFor="password" className="field-required">Password</label>
                                        {formik.touched.password && formik.errors.password ? (
                                            <div className="field-error">{formik.errors.password}</div>
                                        ) : null}
                                    </div>
                                    <div className="field-container">
                                        <input type="password" id="password2" {...formik.getFieldProps('password2')}/>
                                        <label htmlFor="password2" className="field-required">Password Confirmation</label>
                                        {formik.touched.password2 && formik.errors.password2 ? (
                                        <div className="field-error">{formik.errors.password2}</div>
                                        ) : null}
                                    </div>
                                </div>
        
                                <button className="button-small primary-button" type="submit" disabled={formik.isSubmitting}>
                                    {formik.isSubmitting ? <span className="btn-spinner"><FaReact /></span>: "Submit"}
                                </button>
                            </form>
                        )}
                    </Formik>
                    
                </div>
            </div>
            {globalState.isAuthenticated ? <Redirect to="/" /> : null}
        </>
    )
}

export default Register;