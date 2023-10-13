import {
  Container,
  NotVerified,
  TopRatedMovies,
  TopRatedWebSeries,
} from "../components";

const Home = () => {
  return (
    <div className="dark:bg-primary bg-white min-h-screen">
      <Container>
        <NotVerified />
        {/* slider */}
        {/* most rated movies */}
        <TopRatedMovies />
        <TopRatedWebSeries />
      </Container>
    </div>
  );
};

export default Home;
