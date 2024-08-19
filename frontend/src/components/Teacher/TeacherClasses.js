import React, { useEffect, useState } from 'react';
import { getTeacherClasses } from './timetableService';

const TeacherClasses = ({ teacherId }) => {
    const [classes, setClasses] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const result = await getTeacherClasses(teacherId);
                setClasses(result);
            } catch (error) {
                setError(error.message || 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchClasses();
    }, [teacherId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div>
            <h3>Your Classes assigned by principal</h3>
            <div className="table-responsive">
                <table className="table table-dark table-striped">
                    <thead>
                        <tr>
                            <th>Class ID</th>
                            <th>Subject</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                            <th>Day</th>
                        </tr>
                    </thead>
                    <tbody>
                        {classes.length > 0 ? (
                            classes.map((cls) => (
                                <tr key={cls._id}>
                                    <td>{cls.class_id}</td>
                                    <td>{cls.subject}</td>
                                    <td>{cls.start_time}</td>
                                    <td>{cls.close_time}</td>
                                    <td>{cls.day}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">No classes assigned</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TeacherClasses;
