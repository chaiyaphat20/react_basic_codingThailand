import Footer from "./components/Footer_old";
import Header from "./components/Header";
import style from '../src/styles/style.module.css'
import Menu from "./components/Menu";
function AppV1() {
  return (
    <div>
      <Header
        data={[
          { id: 1, name: "art1" },
          { id: 2, name: "art2" },
          { id: 3, name: "art3" },
        ]}
      />
      <Menu />
      <Footer />
      <h1 className={style.hello}>CSS Modules</h1>
    </div>
  );
}

export default AppV1;
