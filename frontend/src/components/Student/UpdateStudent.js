import React, { useState, useEffect } from 'react';
import { updateStudent } from './studentService';
import { useLocation, useNavigate } from 'react-router-dom';

const UpdateStudent = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const student = location.state?.student;

    const [name, setName] = useState(student?.Name || '');
    const [rollno, setRollNo] = useState(student?.rollno || '');
    const [email, setEmail] = useState(student?.email || '');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');

    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('');

    useEffect(() => {
        if (student) {
            setName(student.Name);
            setRollNo(student.rollno);
            setEmail(student.email);
        }
    }, [student]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmpassword) {
            setAlertMessage('Passwords do not match');
            setAlertType('danger');
            setTimeout(() => setAlertMessage(''), 1000);
            return;
        }

        try {
            const updatedDetails = {
                Name: name,
                rollno,
                email,
                ...(password && { password }),
                ...(confirmpassword && { confirmpassword })
            };

            await updateStudent(student._id, updatedDetails);
            setAlertMessage('Student updated successfully');
            setAlertType('success');
            setTimeout(() => navigate(-1), 1000);
        } catch (err) {
            setAlertMessage('Failed to update student');
            setAlertType('danger');
            setTimeout(() => setAlertMessage(''), 1000);
        }
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Update Student</h2>
            {alertMessage && (
                <div className={`alert alert-${alertType}`} role="alert">
                    {alertMessage}
                </div>
            )}
            <form onSubmit={handleSubmit} className="form-signin w-75 mx-auto">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name:</label>
                    <input
                        type="text"
                        id="name"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="rollno" className="form-label">Roll Number:</label>
                    <input
                        type="text"
                        id="rollno"
                        className="form-control"
                        value={rollno}
                        onChange={(e) => setRollNo(e.target.value)}
                        required
                        readOnly
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input
                        type="email"
                        id="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password:</label>
                    <input
                        type="password"
                        id="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Leave blank if not changing"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmpassword" className="form-label">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirmpassword"
                        className="form-control"
                        value={confirmpassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Leave blank if not changing"
                    />
                </div>
                <div className="d-flex justify-content-between">
                    <button type="button" className="btn btn-secondary" onClick={handleGoBack}>
                        Go Back
                    </button>
                    <button type="submit" className="btn btn-dark">
                        Update
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateStudent;
