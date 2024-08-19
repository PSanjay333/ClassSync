import React, { useState } from 'react';
import { updateTeacher } from './teacherService';
import { useLocation, useNavigate } from 'react-router-dom';

const UpdateTeacher = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const teacher = location.state?.teacher;

    
    const [name, setName] = useState(teacher?.Name || '');
    const [teacherId, setTeacherId] = useState(teacher?.teacherId || '');
    const [department, setDepartment] = useState(teacher?.dept || '');
    const [email, setEmail] = useState(teacher?.email || '');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

   
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !teacherId || !department || !email) {
            setAlertMessage('Please fill in all required fields');
            setAlertType('danger');
            setTimeout(() => setAlertMessage(''), 1000);
            return;
        }

        if (password && password !== confirmPassword) {
            setAlertMessage('Passwords do not match');
            setAlertType('danger');
            setTimeout(() => setAlertMessage(''), 1000);
            return;
        }

        try {
            const updatedDetails = {
                Name: name,
                teacherId,
                dept: department,
                email,
                ...(password && { password })
            };

            await updateTeacher(teacher._id, updatedDetails);
            setAlertMessage('Teacher updated successfully');
            setAlertType('success');
            setTimeout(() => navigate(-1), 1000);
        } catch (err) {
            setAlertMessage('Failed to update teacher');
            setAlertType('danger');
            setTimeout(() => setAlertMessage(''), 1000);
        }
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Update Teacher</h2>
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
                    <label htmlFor="teacherId" className="form-label">Teacher ID:</label>
                    <input
                        type="text"
                        id="teacherId"
                        className="form-control"
                        value={teacherId}
                        onChange={(e) => setTeacherId(e.target.value)}
                        required
                        readOnly
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="department" className="form-label">Department:</label>
                    <input
                        type="text"
                        id="department"
                        className="form-control"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        required
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
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        className="form-control"
                        value={confirmPassword}
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

export default UpdateTeacher;
