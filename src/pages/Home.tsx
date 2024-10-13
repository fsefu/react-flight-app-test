import SearchForm from "../components/SearchForm";

const Home = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-6">
        Search for Flights
      </h1>
      <SearchForm />
    </div>
  );
};

export default Home;
