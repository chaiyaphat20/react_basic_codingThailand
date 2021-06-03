import { Button, Col, Container, Form, Row } from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router";

//Notifications
import { useToasts } from "react-toast-notifications";

//validationA
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
const schema = Yup.object().shape({
  username: Yup.string().required("username ห้ามว่าง"),
  email: Yup.string()
    .required("email ห้ามว่าง")
    .email("รูปแบบ email บ้ถูกเด้อ"),
  password: Yup.string()
    .required("password ห้ามว่าง")
    .min(3, "password ต้อง 3 ตัวนะ"),
});
//validationB

function RegisterPage() {
  const history = useHistory();
  const { addToast } = useToasts();
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
      const apiURL = "https://api.codingthailand.com/api/register";
      const res = await axios.post(apiURL, {
        name: data.username,
        email: data.email,
        password: data.password,
      });
      addToast(res.data.message, { appearance: "success" });
      history.replace("/login");
    } catch (error) {
      addToast(error.response.data.errors.email[0],{appearance:"error"})
    }
  };
  //validationB

  const showErrorClassNameUsername = errors.username ? "is-invalid" : "";
  const showErrorClassNameEmail = errors.email ? "is-invalid" : "";
  const showErrorClassNamePassword = errors.password ? "is-invalid" : "";
  return (
    <Container className="mt-5">
      <Col xs={12} md={8}>
        <Row>
          {/* {validationB} */}
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="formBasicEmail" className="is-invalid">
              <Form.Label>username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                {...register("username")}
                className={showErrorClassNameUsername}
              />
              <p style={{ color: "red" }}>{errors.username?.message}</p>
            </Form.Group>

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

export default RegisterPage;
