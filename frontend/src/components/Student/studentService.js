// src/services/studentService.js
const API_URL = "https://classsync-backend.onrender.com"; // Update with your API URL

export const getStudentById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/student/${id}`, {
            headers: {
                "x-token": localStorage.getItem("token"),
            },
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching student details:", error);
        throw error;
    }
};

// Fetch all students
export const getStudents = async () => {
    try {
        const response = await fetch(`${API_URL}/students`, {
            headers: {
                "x-token": localStorage.getItem("token"),
            },
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching students:", error);
        throw error;
    }
};

// Update a student's details
export const updateStudent = async (id, updatedDetails) => {
    try {
        const response = await fetch(`${API_URL}/update_student/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-token': localStorage.getItem("token"),
            },
            body: JSON.stringify(updatedDetails),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error("Error updating student:", error);
        throw error;
    }
};

// Delete a student
export const deleteStudent = async (id) => {
    try {
        const response = await fetch(`${API_URL}/delete_student/${id}`, {
            method: 'DELETE',
            headers: {
                'x-token': localStorage.getItem("token"),
            },
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error("Error deleting student:", error);
        throw error;
    }
};
