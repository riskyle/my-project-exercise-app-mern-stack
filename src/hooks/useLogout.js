import { useAuthContext } from "./useAuthContext";
import { useWorkoutsContext } from "./useWorkoutsContext";

export const useLogout = () => {
    const { dispatch: authDispatch } = useAuthContext();
    const { dispatch: workoutsDispatch } = useWorkoutsContext();
    const logout = () => {
        //remove user from localStorage
        localStorage.removeItem('user');

        //dispatch logout action
        authDispatch({ type: "LOGOUT" })

        //clear the global state once logout
        workoutsDispatch({ type: "SET_WORKOUTS", payload: null })

    }

    return { logout };
}
