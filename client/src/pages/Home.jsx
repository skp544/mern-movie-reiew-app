import {
  Container,
  HeroSlideShow,
  NotVerified,
  TopRatedMovies,
  TopRatedTVSeries,
  TopRatedWebSeries,
} from "../components";

const Home = () => {
  return (
    <div className="dark:bg-primary bg-white min-h-screen">
      <Container>
        <NotVerified />
        {/* slider */}
        <HeroSlideShow />
        {/* most rated movies */}
        <div className=" space-y-3 py-8">
          <TopRatedMovies />
          <TopRatedWebSeries />
          <TopRatedTVSeries />
        </div>
      </Container>
    </div>
  );
};

export default Home;
