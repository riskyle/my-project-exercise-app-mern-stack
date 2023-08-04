import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { dispatch } = useAuthContext();

    const signup = async (email, password) => {
        setError(null);
        setLoading(true);
        const user = { email, password };
        const response = await fetch("http://localhost:5000/user/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });
        const json = await response.json();
        if (!response.ok) {
            setError(json.error);
            console.log(json.error);
            return;
        }
        localStorage.setItem('user', JSON.stringify(json))
        dispatch({ type: "LOGIN", payload: json })
        setLoading(false);
    }
    return { signup, loading, error }
}