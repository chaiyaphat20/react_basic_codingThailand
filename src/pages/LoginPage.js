import { Button, Col, Container, Form, Row } from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router";
//context api
import { UserStoreContext } from "../context/UseContext";

//redux
import { useDispatch } from "react-redux";
import { updateProfile } from "../redux/actions/authAction"; //action

//Notifications
import { useToasts } from "react-toast-notifications";

//validationA
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useContext } from "react";
const schema = Yup.object().shape({
  email: Yup.string()
    .required("email ห้ามว่าง")
    .email("รูปแบบ email บ้ถูกเด้อ"),
  password: Yup.string()
    .required("password ห้ามว่าง")
    .min(3, "password ต้อง 3 ตัวนะ"),
});
//validationB

function LoginPage() {
  const history = useHistory();
  const { addToast } = useToasts();
  //context api
  const userStore = useContext(UserStoreContext);

  //call redux action
  const dispatch = useDispatch();

  //validationA
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    try {
      const apiURL = "https://api.codingthailand.com/api/login";
      const res = await axios.post(apiURL, {
        email: data.email,
        password: data.password,
      });
      localStorage.setItem("token", JSON.stringify(res.data));

      addToast("เข้าสู่ระบบเรียบร้อยแล้ว", { appearance: "success" });

      //get profile
      const resProfile = await axios.get(
        "https://api.codingthailand.com/api/profile",
        {
          headers: {
            Authorization: `Bearer ${res.data.access_token}`,
          },
        }
      );
      localStorage.setItem("user", JSON.stringify(resProfile.data.data.user));
      // history.push('/')
      // history.go(0)

      // //update Profile by context
      // userStore.updateProfile(resProfile.data.data.user);

      // redux and action
      dispatch(updateProfile(resProfile.data.data.user));

      history.replace("/");
    } catch (error) {
      console.log(errors);
      addToast(error.response.data.message, { appearance: "error" });
    }
  };
  //validationB

  const showErrorClassNameEmail = errors.email ? "is-invalid" : "";
  const showErrorClassNamePassword = errors.password ? "is-invalid" : "";
  return (
    <Container className="mt-5">
      <Col xs={12} md={8}>
        <Row>
          {/* {validationB} */}
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="formBasicEmail" className="is-invalid">
              <Form.Label>email</Form.Label>
              <Form.Control
                type="text"
                name="email"
                {...register("email")}
                className={showErrorClassNameEmail}
              />
              <p style={{ color: "red" }}>{errors.email?.message}</p>
            </Form.Group>

            <Form.Group controlId="formBasicEmail" className="is-invalid">
              <Form.Label>password</Form.Label>
              <Form.Control
                type="text"
                name="password"
                {...register("password")}
                className={showErrorClassNamePassword}
              />
              <p style={{ color: "red" }}>{errors.password?.message}</p>
            </Form.Group>
            {/* {validationB} */}

            <Button variant="primary" type="submit">
              Submit
            </Button>
            <hr />
          </Form>
        </Row>
      </Col>
    </Container>
  );
}

export default LoginPage;
