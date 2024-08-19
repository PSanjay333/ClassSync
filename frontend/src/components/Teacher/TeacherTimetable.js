import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TeacherTimetable = ({ teacherId }) => {
    const [timetable, setTimetable] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTimetable = async () => {
            try {
                const response = await axios.get(
                    `https://classsync-backend.onrender.com/teacher_timetable/${teacherId}`,
                    {
                        headers: {
                            "x-token": localStorage.getItem("token"),
                        },
                    }
                );
                setTimetable(response.data);
            } catch (err) {
                setError('Failed to fetch timetable');
            } finally {
                setLoading(false);
            }
        };

        fetchTimetable();
    }, [teacherId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2>Timetable</h2>
            <div className="table-responsive">
                <table className="table table-dark table-striped">
                    <thead>
                        <tr>
                            <th>Day</th>
                            <th>Class ID</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {timetable.length > 0 ? (
                            timetable.map((item) => (
                                <tr key={item._id}>
                                    <td>{item.day}</td>
                                    <td>{item.classroom_id}</td>
                                    <td>{item.start_time}</td>
                                    <td>{item.end_time}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">No timetable available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TeacherTimetable;
