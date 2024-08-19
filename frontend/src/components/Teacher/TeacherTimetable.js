import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TeacherTimetable = ({ teacherId }) => {
    const [timetable, setTimetable] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTimetable = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/teacher_timetable/${teacherId}`, {
                    headers: {
                        "x-token": localStorage.getItem("token")
                    }
                });
                setTimetable(response.data);
            } catch (error) {
                setError(error.response?.data?.message || 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchTimetable();
    }, [teacherId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div>
            <h3>Your Timetable</h3>
            <div className="table-responsive">
                <table className="table table-dark table-striped">
                    <thead>
                        <tr>
                            <th>Classroom ID</th>
                            <th>Subject</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                            <th>Day</th>
                        </tr>
                    </thead>
                    <tbody>
                        {timetable.length > 0 ? (
                            timetable.map((entry) => (
                                <tr key={entry._id}>
                                    <td>{entry.classroom_id}</td>
                                    <td>{entry.subject}</td>
                                    <td>{entry.start_time}</td>
                                    <td>{entry.end_time}</td>
                                    <td>{entry.day}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">No timetable available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TeacherTimetable;
