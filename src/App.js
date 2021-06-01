import Footer from "./components/Footer";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import NavbarCompo from "./components/Navbar";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ProductPage from "./pages/ProductPage";
import DetailPage from "./pages/DetailPage";
function App() {
  return (
    <Router>
      <NavbarCompo />
      <Switch>
        <Route path="/" exact>
        <HomePage />
        </Route>
        <Route path="/about" >
        <AboutPage  />
        </Route>
        <Route path="/product" >
        <ProductPage  />
        </Route>
        <Route path="/detail/:id/title/:title" > 
        <DetailPage  />
        </Route>
      </Switch>
      
      <Footer />
    </Router>
  );
}

export default App;
