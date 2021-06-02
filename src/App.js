import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Footer from "./components/Footer";
import NavbarCompo from "./components/Navbar";
import AboutPage from "./pages/AboutPage";
import CreatePage from "./pages/category/CreatePage";
import EditPage from "./pages/category/EditPage";
import IndexPage from "./pages/category/IndexPage";
import DetailPage from "./pages/DetailPage";
import HomePage from "./pages/HomePage";
import HospitalPage from "./pages/hospital/HospitalPage";
import ProductPage from "./pages/ProductPage";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <NavbarCompo />
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/about">
            <AboutPage />
          </Route>
          <Route path="/product">
            <ProductPage />
          </Route>
          <Route path="/detail/:id/title/:title">
            <DetailPage />
          </Route>
          <Route path="/hospital">
            <HospitalPage />
          </Route>
          <Route
            path="/category"
            render={({ match: { url } }) => (
              <>
                <Route path={`${url}/`} exact>
                  <IndexPage />
                </Route>
                <Route path={`${url}/create`}>
                  <CreatePage />
                </Route>
                <Route path={`${url}/edit/:id`}>
                  <EditPage />
                </Route>
              </>
            )}
          ></Route>
        </Switch>
        <Footer />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
