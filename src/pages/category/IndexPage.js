import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { Spinner, Table, Button } from "react-bootstrap";
import { BsPencil, BsTrash } from "react-icons/bs";
import { useHistory } from "react-router";

function IndexPage() {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const cancelToken = useRef(null);

  const history = useHistory();

  const getData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://api.codingthailand.com/api/category`,
        {
          cancelToken: cancelToken.current.token,
        }
      );
      setCategory(res.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [setCategory]);

  useEffect(() => {
    cancelToken.current = axios.CancelToken.source(); //cancel token
    getData();
    return () => {
      cancelToken.current.cancel();
    };
  }, [getData]);

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
        <h1>{JSON.stringify(error)}</h1>
      </div>
    );
  }

  //step3  result จริง
  let comp = (
    <div className="mt-5 text-center">
      <h1>ไม่พบข้อมูล</h1>
    </div>
  );
  if (category.length !== 0) {
    comp = (
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>เครื่องมือ</th>
          </tr>
        </thead>
        <tbody>
          {category.map((e) => (
            <tr key={e.id}>
              <td>{e.id}</td>
              <td>{e.name}</td>
              <td>
                <Button
                  className="ml-3"
                  variant="outline-danger"
                  size="sm"
                  onClick={() => history.push(`/category/edit/${e.id}`)}
                >
                  <BsPencil />
                </Button>
                <Button
                  className="ml-3"
                  variant="outline-info"
                  size="sm"
                  onClick={async () => {
                    const isConfirm = window.confirm(
                      "แน่ใจว่าจะลบข้อมูล" + e.name
                    );
                    if (isConfirm) {
                      const res = await axios.delete(
                        `https://api.codingthailand.com/api/category/${e.id}`
                      );
                      alert(res.data.message);
                      history.go(0); //เป็นการ refresh หน้า**
                    }
                  }}
                >
                  <BsTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }

  return (
    <div className="container">
      <div className="mt-4 row">
        <div className="col-md-12">
          <Button
            className="mb-3"
            variant="primary"
            onClick={() => history.push("/category/create")}
          >
            เพิ่มข้อมูล
          </Button>
          <h2>Category </h2>
          {comp}
        </div>
      </div>
    </div>
  );
}

export default IndexPage;
