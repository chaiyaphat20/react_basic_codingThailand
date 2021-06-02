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
        setDetail(res.data.data);
      } catch (error) {
        setError(error.response.data.message);
      } finally {
        setLoading(false);
      }
    },
    [setDetail]
  );

  useEffect(() => {
    cancelToken.current = axios.CancelToken.source(); //cancel token
    getData(id);
    return () => {
      cancelToken.current.cancel();
    };
  }, [id,getData]);

  //step1
  if (loading) {
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
        <h1>{error}</h1>
      </div>
    );
  }

  // step3  result จริง
  let comp = (
    <div className="mt-5 text-center">
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
