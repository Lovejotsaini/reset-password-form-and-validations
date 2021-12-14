import React, { useState } from "react";
import styled from "styled-components";
import validator from "validator";
import axios from "axios";
import swal from "sweetalert";

const Register = (props) => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [formError, setFormError] = useState({});
    const errors = {};
    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };
    const handleCancelButton = () => {
        setNewPassword("");
        setConfirmPassword("");
    };
    const runValidation = () => {
        //newPassword validation
        if (newPassword === confirmPassword) {
            if (validator.isEmpty(newPassword)) {
                errors.newPassword = "Password can't be empty";
            } else if (!validator.isLength(confirmPassword, [8, 15])) {
                errors.newPassword = "confirmPassword must have atleast 8-15 characters";
            }
            // confirmPassword validation
            if (validator.isEmpty(confirmPassword)) {
                errors.confirmPassword = "Password can't be empty";
            } else if (!validator.isLength(confirmPassword, [8, 15])) {
                errors.confirmPassword = "confirmPassword must have atleast 8-15 characters";
            }
        } else {
            errors.confirmPassword = "confirmPassword must be same"
        }

    };
    const handleSubmit = (e) => {
        e.preventDefault();
        runValidation();
        if (Object.keys(errors).length === 0) {
            setFormError({});
            axios
                .post("http://dct-user-auth.herokuapp.com/users/register", {
                    newPassword: newPassword,
                    confirmPassword: confirmPassword,
                })
                .then((response) => {
                    const result = response.data;
                    if (result) {
                        setNewPassword("");

                        setConfirmPassword("");
                        swal("Good job!", " Submit Successfull", "success", {
                            buttons: false,
                            timer: 2950,
                        });
                        //      setTimeout(() => {
                        //        props.history.push(
                        //          "/login",
                        //         "Your account has been successfully created"
                        //        );
                        //       }, 3000);
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
                <h3 className="card-title text-center">Reset Password</h3>

                <div className="card-text">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            
                            <div>
                                <input
                                    type="password"
                                    placeholder="Enter new Password"
                                    value={newPassword}
                                    onChange={handleNewPasswordChange}
                                    className="form-control form-control-sm" />
                                {formError.newPassword && <span>{formError.newPassword}</span>}
                            </div>
                            <br />
                            <div>
                                <input
                                    type="password"
                                    placeholder="Confirm confirmPassword"
                                    value={confirmPassword}
                                    onChange={handleConfirmPasswordChange}
                                    className="form-control form-control-sm"
                                />
                                {formError.confirmPassword && <span>{formError.confirmPassword}</span>}
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary btn-block">Submit</button>
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
export default Register;