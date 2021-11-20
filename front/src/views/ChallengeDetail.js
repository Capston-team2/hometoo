import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/font-awesome/css/font-awesome.min.css";
import "assets/scss/argon-design-system-react.scss";

import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  ListGroup,
  ListGroupItem,
  Row,
} from "reactstrap";
import React, { useEffect, useState } from "react";

import Hero from "./Hero";
import axios from "axios";
import { useLocation } from "react-router";

export default function ChallengeCardList() {
  const location = useLocation();
  const url = "http://221.143.144.143:80/";
  const [challengeDeatil, setchallengeDeatil] = useState({
    url: "",
    username: "",
    title: "",
    context: "",
    trial_user_List: [],
  });

  useEffect(() => {
    // console.log("/challenges/" + String(location.state.cid));
    axios.get("/challenges/" + String(location.state.cid)).then((res) => {
      console.log(res.data);
      setchallengeDeatil(res.data);
    });
  }, []);

  return (
    <>
      {/* <DemoNavbar /> */}
      <div className="position-relative">
        <Hero />
      </div>
      <section className="section section-components pb-0">
        <Container className="justify-content-md-center" fluid>
          <Row className="justify-content-center mt--300">
            <Col lg="8">
              <Card className="bg-gradient-secondary shadow">
                <CardBody className="p-lg-5">
                  <Col className="d-flex justify-content-between">
                    {/* <video
                      src="C:\Users\jin\Downloads\다빈치스포츠-10.mp4"
                      crossOrigin="anonymous"
                      type="type/mp4"
                      controls
                      width="50%"
                    >
                      비디오 재생 중 에러가 발생했습니다.
                    </video> */}
                    <img
                      src={url + challengeDeatil.url}
                      crossOrigin="anonymous"
                      type="type/jpg"
                      controls
                      width="50%"
                    ></img>
                    <div className="w-50 px-2">
                      <div className="d-flex justify-content-between">
                        <h5>
                          <i className="ni ni-notification-70 px-3" />
                          명예의 전당
                          <i className="ni ni-notification-70 px-3" />
                        </h5>
                        <Button color="danger">지금 참가하기</Button>
                      </div>
                      <ListGroup>
                        <ListGroupItem className="d-flex justify-content-between">
                          Cras justo odio
                          <i className="ni ni-favourite-28 text-danger" />
                        </ListGroupItem>
                        <ListGroupItem className="d-flex justify-content-between">
                          Dapibus ac facilisis in
                          <i className="ni ni-favourite-28 text-danger" />
                        </ListGroupItem>
                        <ListGroupItem className="d-flex justify-content-between">
                          Cras justo odio
                          <i className="ni ni-favourite-28 text-danger" />
                        </ListGroupItem>
                        <ListGroupItem className="d-flex justify-content-between">
                          Cras justo odio
                          <i className="ni ni-favourite-28 text-danger" />
                        </ListGroupItem>
                        <ListGroupItem className="d-flex justify-content-between">
                          Cras justo odio
                          <i className="ni ni-favourite-28 text-danger" />
                        </ListGroupItem>
                      </ListGroup>
                    </div>
                  </Col>
                  <FormGroup className="mt-5">
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-single-copy-04" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder={challengeDeatil.title}
                        type="text"
                        disabled={true}
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-circle-08" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder={challengeDeatil.username}
                        type="text"
                        disabled={true}
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup className="mb-5">
                    <Input
                      className="form-control-alternative"
                      cols="80"
                      name="name"
                      placeholder={challengeDeatil.context}
                      rows="5"
                      type="textarea"
                      disabled={true}
                    />
                  </FormGroup>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
