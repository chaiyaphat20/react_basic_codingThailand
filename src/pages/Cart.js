import { useDispatch, useSelector } from "react-redux";
import { clearAllCart } from "../redux/actions/cartAction";
function Cart() {
  const dataFromRedux = useSelector((state) => state.cartState);
  const dispatch = useDispatch()
  
  let comp = <div />;
  if (dataFromRedux) {
    comp = dataFromRedux.cart.map((e) => {
      return (
        <div style={{ fontSize: 16 }}>
          <p> id : {e.id}</p>
          <p>price : {e.price}</p>
          <p>qty: {e.qty}</p>
          <hr />
        </div>
      );
    });
  }
  return <div>
    <button onClick={()=>dispatch(clearAllCart())}>Clear all cart</button>
    {comp}</div>;
}

export default Cart;
