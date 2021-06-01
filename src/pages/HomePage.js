import { Spinner } from "react-bootstrap";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
function HomePage() {
  const { isLoading, error, data } = useQuery("getData", () =>
    fetch(
      "https://api.codingthailand.com/api/news?page=1&page_size=3"
    ).then((res) => res.json())
  );

  //step1
  if (isLoading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />;
      </div>
    );
  }

  //step2
  if (error) {
    return (
      <div className="text-center mt-5">
        <h1>เกิดข้อผิดพลาดจาก server กรุณาลองใหม่</h1>
        <br />
        <h1>{JSON.stringify(error)}</h1>
      </div>
    );
  }

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
            {data.data.map((news, index) => {
              return (
                <div className="col-md-4" key={index}>
                  <h2>{news.title}</h2>
                  <p>{news.detail}</p>
                  <p>หมวดหมู่ข่าว {news.name}</p>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
}

export default HomePage;
