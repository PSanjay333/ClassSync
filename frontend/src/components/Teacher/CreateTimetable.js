import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { createTimetable } from './timetableService';

const CreateTimetable = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    const searchParams = new URLSearchParams(location.search);
    const teacherId = searchParams.get('teacherId');

    const [classroomId, setClassroomId] = useState('');
    const [subject, setSubject] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [day, setDay] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setAlertMessage('');
        setAlertType('');
    
        if (!classroomId || !subject || !startTime || !endTime || !day) {
            setAlertMessage('All fields are required');
            setAlertType('danger');
            return;
        }
    
        try {
            await createTimetable({
                teacher_id: teacherId,
                classroom_id: classroomId,
                subject,
                start_time: startTime,
                end_time: endTime,
                day,
            });
            setAlertMessage('Timetable created successfully');
            setAlertType('success');
            
            // Reset form fields
            setClassroomId('');
            setSubject('');
            setStartTime('');
            setEndTime('');
            setDay('');

            // Redirect to the Teacher Dashboard after a delay
            setTimeout(() => navigate("/Teacher_Dashboard"), 3000);
        } catch (err) {
            setAlertMessage(err.message || 'An error occurred');
            setAlertType('danger');
        }
    };
    
    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <main className="form-signin w-50">
                <form onSubmit={handleSubmit}>
                    <h1 className="h3 mb-3 fw-normal">Create Timetable</h1>
                    
                    {alertMessage && (
                        <div className={`alert alert-${alertType}`} role="alert">
                            {alertMessage}
                        </div>
                    )}

                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="classroomId"
                            placeholder="Classroom ID"
                            value={classroomId}
                            onChange={(e) => setClassroomId(e.target.value)}
                            required
                        />
                        <label htmlFor="classroomId">Classroom ID</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="subject"
                            placeholder="Subject"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            required
                        />
                        <label htmlFor="subject">Subject</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="time"
                            className="form-control"
                            id="startTime"
                            placeholder="Start Time"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                            required
                        />
                        <label htmlFor="startTime">Start Time</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="time"
                            className="form-control"
                            id="endTime"
                            placeholder="End Time"
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                            required
                        />
                        <label htmlFor="endTime">End Time</label>
                    </div>
                    <div className="form-floating mb-3">
                        <select
                            className="form-select"
                            id="day"
                            value={day}
                            onChange={(e) => setDay(e.target.value)}
                            required
                        >
                            <option value="">Select Day</option>
                            <option value="Monday">Monday</option>
                            <option value="Tuesday">Tuesday</option>
                            <option value="Wednesday">Wednesday</option>
                            <option value="Thursday">Thursday</option>
                            <option value="Friday">Friday</option>
                            <option value="Saturday">Saturday</option>
                            <option value="Sunday">Sunday</option>
                        </select>
                        <label htmlFor="day">Day</label>
                    </div>
                    
                    <button type="submit" className="btn btn-dark w-100 py-2">
                        Create Timetable
                    </button>
                </form>
            </main>
        </div>
    );
};

export default CreateTimetable;
