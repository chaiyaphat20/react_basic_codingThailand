import { useSelector } from "react-redux";
function Cart() {
  const dataFromRedux = useSelector((state) => state.cartState);
  console.log(dataFromRedux)
  let comp = <div />;
  if (dataFromRedux) {
    comp = dataFromRedux.cart.map((e) => {
      return (
        <div style={{fontSize:16}}>
          <p> id : {e.id}</p>
          <p>price : {e.price}</p>
          <p>qty: {e.qty}</p>
          <hr />
        </div>
      );
    });
  }
  return <div>{comp}</div>;
}

export default Cart;
