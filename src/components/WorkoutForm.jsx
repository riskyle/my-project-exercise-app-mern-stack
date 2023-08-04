import { useState } from "react";

import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const CreateWorkouts = () => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();
  const [workout, setWorkout] = useState({
    title: "",
    reps: "",
    loads: "",
  });
  const [isAdding, setAdding] = useState(false);
  const [isError, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("You must Logged In");
      alert("You must Logged In");
      return;
    }

    const title = workout.title;
    const reps = workout.reps;
    const loads = workout.loads;
    const workoutData = { title, reps, loads };

    setAdding(true);

    const response = await fetch("http://localhost:5000/workouts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(workoutData),
    });
    const json = await response.json();

    if (!response.ok) {
      setAdding(false);
      return setError(json.error);
    }

    setAdding(false);
    setError(null);
    setWorkout({
      ...workout,
      title: "",
      reps: "",
      loads: "",
    });
    console.log("workout added.", json);
    dispatch({ type: "CREATE_WORKOUT", payload: json });
  };

  return (
    <>
      <div>
        <form
          className="create"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <h3>Add a New Workout</h3>
          <label style={{ color: isError && !workout.title ? "#e7195a" : "" }}>
            Exercise Title:
          </label>
          <input
            type="text"
            value={workout.title}
            onChange={(e) => {
              setWorkout({ ...workout, title: e.target.value });
            }}
            style={{ borderColor: isError && !workout.title ? "#e7195a" : "" }}
          />

          <label style={{ color: isError && !workout.reps ? "#e7195a" : "" }}>
            Reps:{" "}
          </label>
          <input
            min={0}
            type="number"
            value={workout.reps}
            onChange={(e) => {
              setWorkout({ ...workout, reps: e.target.value });
            }}
            style={{ borderColor: isError && !workout.reps ? "#e7195a" : "" }}
          />
          <label style={{ color: isError && !workout.loads ? "#e7195a" : "" }}>
            Loads (in kg):{" "}
          </label>
          <input
            type="number"
            min={0}
            value={workout.loads}
            onChange={(e) => {
              setWorkout({ ...workout, loads: e.target.value });
            }}
            style={{ borderColor: isError && !workout.loads ? "#e7195a" : "" }}
          />
          {isAdding && <button>Adding...</button>}
          {!isAdding && <button>Add Workout</button>}
          {isError && <div className="error">{isError}</div>}
        </form>
      </div>
    </>
  );
};

export default CreateWorkouts;
