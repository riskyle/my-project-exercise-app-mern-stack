import WorkoutList from "../components/WorkoutList";
import CreateWorkouts from "../components/WorkoutForm";
import useFetch from "../hooks/useFetch";

const Home = () => {
  const { workouts, isLoading, isError } = useFetch({
    url: "http://localhost:5000/workouts",
  });
  return (
    <div className="home">
      <div className="workouts">
        {/* {!isError && isLoading && <h1>Loading. . .</h1>} */}
        {isError && <h1>{isError}</h1>}
        {
          workouts &&
          workouts.map((workout) => (
            <WorkoutList key={workout._id} workouts={workout} />
          ))}
      </div>
      <CreateWorkouts />
    </div>
  );
};

export default Home;
