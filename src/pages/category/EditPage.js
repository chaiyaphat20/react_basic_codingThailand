import { Button, Col, Container, Form, Row } from "react-bootstrap";
import axios from "axios";

//validationA
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useHistory, useParams } from "react-router";
import { useCallback, useEffect } from "react";

const schema = Yup.object().shape({
  name: Yup.string().required("ชื่อหมวดหมู่ห้ามว่าง"),
});
//validationB

function EditPage() {
  const history = useHistory();
  const { id } = useParams();

  //validationA
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    const apiURL = `https://api.codingthailand.com/api/category`;
    const res = await axios.put(apiURL, { name: data.name ,id});
    alert(res.data.message);
    history.replace("/category");
  };
  //validationB

  const getData = useCallback(
    async (id) => {
      const res = await axios.get(
        `https://api.codingthailand.com/api/category/${id}`
      );
      setValue("name",res.data.name);
    },
    [setValue]
  );

  useEffect(() => {
    getData(id);
  }, [id,getData]);

  const showErrorClassName = errors.name ? "is-invalid" : "";

  return (
    <Container className="mt-5">
      Edit
      <Col xs={12} md={8}>
        <Row>
          {/* {validationB} */}
          <Form onSubmit={handleSubmit(onSubmit)}>
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

export default EditPage;
