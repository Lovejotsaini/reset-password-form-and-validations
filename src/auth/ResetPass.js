import React, { useState } from "react";
import styled from "styled-components";
import validator from "validator";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from 'react-router-dom'

const ResetPass = (props) => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("");

    const [formError, setFormError] = useState({});
    const errors = {};

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleCancelButton = () => {

        setEmail("");

    };
    const runValidation = () => {
        //username validation

        // email validation
        if (validator.isEmpty(email)) {
            errors.email = "email can't be empty";
        } else if (!validator.isEmail(email)) {
            errors.email = "invalid email formate";
        }
        // password validation

    };
    const handleSubmit = (e) => {
        e.preventDefault();
        runValidation();
        if (Object.keys(errors).length === 0) {
            setFormError({});
            axios
                .post("http://dct-user-auth.herokuapp.com/users/register", {

                    email: email,

                })
                .then((response) => {
                    const result = response.data;
                    if (result) {

                        setEmail("");

                        swal("Good job!", "Email sent successfully", "success", {
                            buttons: false,
                            timer: 2950,
                        });
                                 setTimeout(() => {
                                    navigate("/confirmpassword")
                                //  props.history.push(
                                //    "/confirmpassword",
                               //       "Your account has been successfully created"
                               //    );
                              }, 3000);
                    }
                })
                .catch((err) => {
                    alert(err.message);
                });
        } else {
            setFormError(errors);
        }
    };
    return (
        <div className="card login-form">
            <div className="card-body">
                <h3 className="card-title text-center">Reset password</h3>

                <div className="card-text">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label >Enter your email address and we will send you a link to reset your password.</label>
                            <input type="email"

                                value={email}
                                onChange={handleEmailChange}
                                className="form-control form-control-sm" placeholder="Enter your email address" />
                            {formError.email && <span>{formError.email}</span>}
                        </div>

                        <button type="submit" className="btn btn-primary btn-block">Send password reset email</button>
                        <button 
                            className="btn btn-primary btn-block"
                            type="button" onClick={handleCancelButton}>
                            Cancel
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default ResetPass;