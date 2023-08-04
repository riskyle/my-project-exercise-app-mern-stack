import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const WorkoutDetails = ({ workouts }) => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  const handleDelete = async () => {
    const response = await fetch(
      `http://localhost:5000/workouts/${workouts._id}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${user.token}` },
      }
    );
    const json = await response.json();
    if (!response.ok) throw Error("response is not okay");
    dispatch({ type: "DELETE_WORKOUT", payload: json });
  };
  return (
    <div className="workout-details">
      <h4>{workouts.title}</h4>
      <p>
        <strong>Reps: </strong>
        {workouts.reps}
      </p>
      <p>
        <strong>Loads(kg): </strong>
        {workouts.loads}
      </p>
      <p>
        {formatDistanceToNow(new Date(workouts.createdAt), {
          addSuffix: true,
        })}
      </p>
      <span className="material-symbols-outlined" onClick={handleDelete}>
        delete
      </span>
    </div>
  );
};

export default WorkoutDetails;
