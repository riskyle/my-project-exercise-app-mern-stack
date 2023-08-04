import { useEffect, useState } from "react";
import { useWorkoutsContext } from "./useWorkoutsContext";
import { useAuthContext } from "./useAuthContext";


const useFetch = ({ url }) => {
    const { workouts, dispatch } = useWorkoutsContext();
    const { user } = useAuthContext();
    const [isLoading, setLoading] = useState(false);
    const [isError, setError] = useState(null);
    const fetchdata = async () => {
        try {
            const response = await fetch(url, {
                headers: { 'Authorization': `Bearer ${user.token}` }
            });
            const json = await response.json();
            if (!response.ok) {
                setError(json.error);
                throw Error('response is not okay.');
            }
            dispatch({ type: "SET_WORKOUTS", payload: json })
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error.message)
        }
    }

    useEffect(() => {
        setLoading(true);
        if (user && user) {
            fetchdata()
        } else {
            setLoading(false);
            setError('You must be logged in')
        }
    }, [user])

    return { workouts, isLoading, isError };
}

export default useFetch