// src/services/timetableService.js
const API_URL = "http://localhost:5000"; // Update with your API URL

export const createTimetable = async (timetableData) => {
    try {
        console.log("Time table data",timetableData)
        const response = await fetch(`${API_URL}/create_timetable`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-token': localStorage.getItem("token"),
            },
            body: JSON.stringify(timetableData),
        });
        if (!response.ok) {
            const errorData = await response.text(); 
            console.error("Error response body:", errorData);
            throw new Error(errorData || 'Network response was not ok');
        }
        console.log("response",response)
        return await response.json();
    } catch (error) {
        console.error("Error creating timetable:", error);
        throw error;
    }
};


export const getTeacherClasses = async (teacherId) => {
    try {
        const response = await fetch(`${API_URL}/teacher_classes/${teacherId}`, {
            headers: {
                'x-token': localStorage.getItem("token"),
            },
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching teacher's classes:", error);
        throw error;
    }
};
