const API_URL = "http://localhost:5000"; 


export const getTeacherById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/teacher/${id}`, {
            headers: {
                'x-token': localStorage.getItem("token"),
            },
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching teacher details:", error);
        throw error;
    }
};

export const getTeachers = async () => {
    try {
        const response = await fetch(`${API_URL}/teachers`, {
            headers: {
                "x-token": localStorage.getItem("token"),
            },
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching teachers:", error);
        throw error;
    }
};


export const updateTeacher = async (id, updatedDetails) => {
    try {
        const response = await fetch(`${API_URL}/update_teacher/${id}`, {
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
        console.error("Error updating teacher:", error);
        throw error;
    }
};


export const deleteTeacher = async (id) => {
    try {
        const response = await fetch(`${API_URL}/delete_teacher/${id}`, {
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
        console.error("Error deleting teacher:", error);
        throw error;
    }
};
