import { WorkoutContext } from "../context/WorkoutsContext";
import { useContext } from "react";

export const useWorkoutsContext = () => {
    const context = useContext(WorkoutContext)
    if (!context) {
        throw Error("useWorkoutContext must be used inside an WorkoutContext provider");
    }
    return context;
}