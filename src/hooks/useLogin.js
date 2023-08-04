import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { dispatch } = useAuthContext()
    const login = async (email, password) => {
        setError(null);
        setLoading(true)
        const user = { email, password };
        const response = await fetch("http://localhost:5000/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });

        const json = await response.json();
        if (!response.ok) {
            console.log(json.error);
            setError(json.error);
            setLoading(false)
            return;
        }
        setLoading(false)
        localStorage.setItem('user', JSON.stringify(json))
        dispatch({ type: "LOGIN", payload: json })
    }
    return { login, error, loading };
}

