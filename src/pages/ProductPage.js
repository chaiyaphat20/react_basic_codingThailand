import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { Table, Badge, Spinner } from "react-bootstrap";
import { BsEyeFill } from "react-icons/bs";
import { Link } from "react-router-dom";

//redux
import { addToCart } from "../redux/actions/cartAction";
import { useDispatch, useSelector } from "react-redux";

function ProductPage() {
  const [product, setProduct] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const cancelToken = useRef(null);

  //redux
  const dispatch = useDispatch();
  const data = useSelector((state) => state.cartState);
  const { cart, total } = data;
  console.log(cart)
  const addToCartFn = (e) => {
    // console.log(e)
    const product = {
      id: e.id,
      titleL: e.name,
      price: e.view, //สมมุติว่า p.view คือ ราคา
      qty: 1,
    };

    dispatch(addToCart(product,cart));
  };

  const getData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://api.codingthailand.com/api/course", {
        cancelToken: cancelToken.current.token,
      });
      setProduct(res.data.data);
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }, [setProduct]);
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
        <h>เกิดข้อผิดพลาดจาก server กรุณาลองใหม่</h>
        <br />
        <h>{error}</h>
      </div>
    );
  }

  //step3  result จริง
  let comp = <div />;
  if (product.length !== 0) {
    comp = product.map((e) => (
      <tr key={e.id}>
        <td>{e.id}</td>
        <td>{e.title}</td>
        <td>{e.detail}</td>
        <td>{e.date}</td>
        <td>
          <Badge variant="success">{e.view}</Badge>
        </td>
        <td>
          <img
            src={e.picture}
            alt=""
            style={{ objectFit: "fill", width: 60 }}
          />
        </td>
        <td>
          <Link to={`/detail/${e.id}/title/${e.title}`}>
            <BsEyeFill />
          </Link>
          <button
            onClick={() => addToCartFn(e)}
            className="ml-2 btn btn-outline-success"
          >
            Add to Cart
          </button>
        </td>
      </tr>
    ));
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h2>Product : {count}</h2>
          <button onClick={() => setCount(count + 1)}>Click</button>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name Course</th>
                <th>Details</th>
                <th>Created</th>
                <th>View</th>
                <th>Picture</th>
                <th>เครื่องมือ</th>
              </tr>
            </thead>
            <tbody>{comp}</tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
