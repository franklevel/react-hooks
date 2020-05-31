import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Spinner,
  FormGroup,
  Col,
  Row,
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Loader = () => {
  return (
    <div className="text-center" style={{ width: "100%" }}>
      <Spinner color="primary" />
      <span>Cargando...</span>
    </div>
  );
};

const Selector = ({ onChange }) => {
  const userList = [
    { name: "Post #1", value: 1 },
    { name: "Post #2", value: 2 },
    { name: "Post #3", value: 3 },
    { name: "Post #4", value: 4 },
    { name: "Post #5", value: 5 },
  ];
  const options = userList.map((el, key) => {
    return (
      <option value={el.value} key={key}>
        {el.name}
      </option>
    );
  });
  return (
    <FormGroup>
      <select className="form-control" onChange={(e) => onChange(e)}>
        {options}
      </select>
    </FormGroup>
  );
};

const Post = (props) => {
  return (
    <Card>
      <CardHeader>
        Post #{props.data.id} - {props.data.title}
      </CardHeader>
      <CardBody>{props.data.body}</CardBody>
      <CardFooter>Autor:{props.data.userId}</CardFooter>
    </Card>
  );
};

export default function App() {
  const [post, setPost] = useState({});
  const [user, setUser] = useState(1);
  const [loading, setLoading] = useState(true);

  const changeUser = (e) => {
    const userId = e.target.value;
    setUser(userId);
    console.log(userId);
  };

  useEffect(() => {
    const getPost = async () => {
      const path = `https://jsonplaceholder.typicode.com/posts/${user}`;
      setLoading(true);
      console.log(`Attempting to get from ${path}`);
      const result = await axios.get(path).catch((error) => {
        console.log(error);
      });
      if (result) {
        setPost(result.data);
      } else {
        setPost({ title: "Not found", body: "No data" });
      }
      setLoading(false);
    };
    getPost();
  }, [user]);

  return (
    <Container className="pt-5 d-flex container-fluid">
      <Row>
        <Col md>
          {loading ? (
            <Loader />
          ) : (
            <>
              <Selector onChange={changeUser} />
              <Post data={post} />
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
}
