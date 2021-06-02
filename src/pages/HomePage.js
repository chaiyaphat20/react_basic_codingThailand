import { Spinner } from "react-bootstrap";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
function HomePage() {
  // const { isLoading, error, data, isFetching } = useQuery("getData", () =>
  //   fetch("https://api.codingthailand.com/api/news?page=1&page_size=3").then(
  //     (res) => res.json()
  //   )
  // );

  const query = useQuery("getData", () => {
    const controller = new AbortController() //ประกาศ constant
    const signal = controller.signal
    const promise = fetch(
      "https://api.codingthailand.com/api/news?page=1&page_size=3",{
        method:'get',
        signal:signal
      }
    ).then((res) => res.json());

    //cancel the request
    promise.cancel = () => controller.abort()
    return promise;
  });

  const { isLoading, error, data, isFetching } = query

  //step1
  if (isLoading) {
    return (
      <div className="mt-5 text-center">
        <Spinner animation="border" variant="primary" />;
      </div>
    );
  }

  //step2
  if (error) {
    return (
      <div className="mt-5 text-center">
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
              <Link to="/product">สิ้นค้าทั้งหมด</Link>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="">{isFetching ? "กำลังอัพเดต" : ""}</div>
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
