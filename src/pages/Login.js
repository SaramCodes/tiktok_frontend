import React, {useContext, useState, useEffect} from 'react';
import Popup from '../components/Popup';
import {GlobalStateContext} from '../App';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {FaReact} from "react-icons/fa";
import {Axios} from "../utils";
import { Redirect  } from "react-router-dom";
import jwt from 'jwt-decode';


const Login = () => {
     
    const globalState = useContext(GlobalStateContext);

    const authenticateUser = async (values, setSubmitting, setErrors) => {
        setSubmitting(false)
        try{
            let result = await Axios.post('/token/', values);
            localStorage.setItem('access_token', result.data.access);
            localStorage.setItem('refresh_token', result.data.refresh);
            globalState.setIsAuthenticated(true);
            let decodedToken = jwt(result.data.access);
            globalState.setAuthenicatedUser({user_id: decodedToken.user_id, username: decodedToken.username, user_image: `http://localhost:8000${decodedToken.user_image}` })
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
            {globalState.success ? <Popup redirect="/login" message={"User Created Successfully!"} close={() => globalState.setSuccess(false)} /> : null}

            <div className="container">
                <div className="card-container">
                    <h1 className="lg-heading">Log in to your TikTak account.</h1>
                    <Formik
                    initialValues={
                        {
                            username: "",
                            password: "",
                            detail: "",
                        }
                    }
                    validationSchema={
                        Yup.object({
                            username: Yup.string().required('Required.'),
                            password: Yup.string().required('Required.')
                        })
                    }
                    onSubmit={
                        (values, {setSubmitting, setErrors}) => {
                            authenticateUser(values, setSubmitting, setErrors);
                         }
                    }
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
                                        <input type="password" id="password" {...formik.getFieldProps('password')}/>
                                        <label htmlFor="password" className="field-required">Password</label>
                                        {formik.touched.password && formik.errors.password ? (
                                        <div className="field-error">{formik.errors.password}</div>
                                        ) : null}
                                    </div>
                                </div>

                                {formik.errors.detail ? 
                                <div className="field-error form-error">Username or Password don't match!</div>
                                :
                                null
                                }
                                
        
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

export default Login;