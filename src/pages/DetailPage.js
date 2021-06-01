import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { Card, CardDeck, Spinner, Button } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
function DetailPage() {
  const { id, title } = useParams();
  const [detail, setDetail] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const cancelToken = useRef(null);
  const history = useHistory()  //ทำย่้อนกลับแบบไม่ใช่ Link , history.push("/about") = <Link to="/about" />

  const getData = useCallback(
    async (id) => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://api.codingthailand.com/api/course/${id}`,
          {
            cancelToken: cancelToken.current.token,
          }
        );
        console.log(res.data.data);
        setDetail(res.data.data);
      } catch (error) {
        setError(error.response.data.message);
      } finally {
        setLoading(false);
      }
    },
    [setDetail, detail]
  );

  useEffect(() => {
    cancelToken.current = axios.CancelToken.source(); //cancel token
    getData(id);
    return () => {
      cancelToken.current.cancel();
    };
  }, [id]);

  //step1
  if (loading) {
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
        <h>เกิดข้อผิดพลาดจาก server กรุณาลองใหม่</h>
        <br />
        <h>{error}</h>
      </div>
    );
  }

  // step3  result จริง
  let comp = (
    <div className="text-center mt-5">
      <h1>ไม่พบข้อมูล</h1>
    </div>
  );
  if (detail.length !== 0) {
    comp = (
      <CardDeck>
        {detail.map((e) => (
          <div className="col-md-4" key={e.ch_id}>
            <Card className="mb-4 shadow-sm">
              <Card.Body>
                <Card.Title>{e.ch_title}</Card.Title>
                <Card.Title>{e.ch_dateadd}</Card.Title>
                <Card.Title>{e.ch_view}</Card.Title>
              </Card.Body>
            </Card>
          </div>
        ))}
      </CardDeck>
    );
  }
  return (
    <div style={{ padding: 10 }}>
      <h1>
        {id} - {title}
      </h1>
      <Button variant="secondary" onClick={()=>history.push("/product")}>ย้อนกลับ</Button>
      {comp}
    </div>
  );
}

export default DetailPage;
