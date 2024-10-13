import { BrowserRouter as Router } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import AppRouter from "./router";
// import Footer from "./components/Footer";

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-6">
          <AppRouter />
        </main>
        {/* <Footer /> */}
      </div>
    </Router>
  );
};

export default App;
