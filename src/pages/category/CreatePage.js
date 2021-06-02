import { Button, Col, Container, Form, Row } from "react-bootstrap";
import axios from "axios";

//validationA
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useHistory } from "react-router";

const schema = Yup.object().shape({
  name: Yup.string().required("ชื่อหมวดหมู่ห้ามว่าง"),
  email: Yup.string().required("กรุณากรอก email"),
});
//validationB

function CreatePage() {
  const history = useHistory();

  //validationA
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    const apiURL = "https://api.codingthailand.com/api/category";

    const res = await axios.post(apiURL, { name: data.name });
    alert(res.data.message);
    history.replace("/category");
  };
  //validationB

  console.log(errors.name);
  const showErrorClassName = errors.name ? "is-invalid" : "";
  const showErrorClassNameEmail = errors.email ? "is-invalid" : "";
  return (
    <Container className="mt-5">
      <Col xs={12} md={8}>
        <Row>
          {/* {validationB} */}
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="formBasicEmail" className="is-invalid">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="text"
                name="email"
                {...register("email")}
                className={showErrorClassNameEmail}
              />
              <p>{errors.email?.message}</p>
            </Form.Group>

            <Form.Group controlId="formBasicEmail" className="is-invalid">
              <Form.Label>หมวดหมุ่ข่าว</Form.Label>
              <Form.Control
                type="text"
                name="name"
                {...register("name")}
                className={showErrorClassName}
              />
              <p>{errors.name?.message}</p>
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

export default CreatePage;
