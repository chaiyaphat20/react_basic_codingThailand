import { BsFillBagFill } from "react-icons/bs";
import { Link } from "react-router-dom";
function HomePage() {
  return (
    <>
      <main role="main">
        <div className="jumbotron">
          <div className="container">
            <h1 className="display-3">Hello, world!</h1>
            <p>This Course by art 😻 💌</p>
            <p>
              <Link to="/product">สิ้นค้าทั้งหมด</Link>
            </p>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h2>Heading</h2>
            </div>
            <div className="col-md-4">
              <h2>Heading</h2>
            </div>
            <div className="col-md-4">
              <h2>Heading</h2>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default HomePage;
