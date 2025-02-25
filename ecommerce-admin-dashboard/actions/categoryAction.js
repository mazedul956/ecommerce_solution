"use server";

export const createCategory = async (formData, accessToken) => {
    try {
        const response = await fetch(`https://8080-mazedul956-ecommercesol-vh0txgc5lvq.ws-us118.gitpod.io/api/category`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error("Failed to create post");
        }
    
        return response.json();
    } catch (error) {
        console.log(error);
        return { error: "Failed to create post" };
    }
}