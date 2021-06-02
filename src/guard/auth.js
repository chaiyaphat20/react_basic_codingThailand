import { Route, Redirect } from "react-router-dom";

function PrivateRoute({ children, ...rest }) {
  let isAuth = false
  const token = JSON.parse(localStorage.getItem('token'))
  //ให้แปลง token แล้วเช็คจาก expireIn ว่าหมดอายุยัง
  if(token){
    isAuth = true
  }

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
