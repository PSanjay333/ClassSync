const API_URL = "https://classsync-backend.onrender.com";

export const createClassroom = async (classroomDetails) => {
    try {
        const response = await fetch(`${API_URL}/create_classroom`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-token': localStorage.getItem('token')
            },
            body: JSON.stringify(classroomDetails),
        });
        if (response.status !== 200) {
            const errorData = await response.json();
            console.error("Error response data:", errorData);
            throw new Error(errorData.message || 'Failed to create classroom');
        }
        return await response.json();
    } catch (error) {
        console.error("Error creating classroom:", error.message);
        throw error;
    }
};


export const getAvailableTeachers = async ({ start_time, close_time, day }) => {
    try {
        const response = await fetch(`${API_URL}/available_teachers?start_time=${encodeURIComponent(start_time)}&close_time=${encodeURIComponent(close_time)}&day=${encodeURIComponent(day)}`,{
            headers: {
              "x-token": localStorage.getItem("token"),
            },
          });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch available teachers');
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching available teachers:", error);
        throw error;
    }
};
