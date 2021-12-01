import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/font-awesome/css/font-awesome.min.css";
import "assets/scss/argon-design-system-react.scss";

import { Button, Card, Col, Container, Row } from "reactstrap";

import BoardService from "../service/BoardService";
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import React from "react";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import UserService from "../service/UserService";

// reactstrap components


// core components



//css




//user
import axios from "axios";




class Profile extends React.Component {
  state = {};

  constructor(props) {
    super(props);
    this.state = {
      email: localStorage.getItem("authenticatedUserEmail"),
      name: localStorage.getItem("authenticatedUserName"),
      posts: "",
      comments: "",
      challenges: "",
      photo: localStorage.getItem("authenticatedUserEmail").length % 7,
    };
  }

  logoutUser = (event) => {
    event.preventDefault();
    UserService.logout();
    this.props.history.push("/board");
  };

  clickBoard = (event) => {
    event.preventDefault();
    this.props.history.push("/board");
  };

  // withdrawUser = (event) => {
  //   event.preventDefault();
  //   UserService.withdrawUser(this.state.name).then(res =>{
  //     if (res.data == "SUCCESS") {
  //       this.props.history.push('/register');
  //       BoardService.
  //     } else {
  //       alert("회원 탈퇴에 실패하였습니다.");
  //     }
  //   });
  // }

  // clickChanllenge 메소드 필요

  componentDidMount() {
    UserService.pageLoginCheck();
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;

    BoardService.getForumCount(this.state.name).then((res) => {
      this.setState({ posts: res.data });
    });
    BoardService.getCommentCount(this.state.name).then((res) => {
      this.setState({ comments: res.data });
    });
    // axios.get("/myRoutines/" + localStorage.getItem("authenticatedUserName"))
    //     .then((res)=>{
    //       res.data;
    //     })
    const temp = this.state.photo;
    const img_url = "${temp}";
  }

  render() {
    return (
      <>
        <DemoNavbar />
        <main className="profile-page" ref="main">
          <section className="section-profile-cover section-shaped my-0">
            <div className="shape shape-style-1 shape-default alpha-4">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            <div className="separator separator-bottom separator-skew">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="fill-white"
                  points="2560 0 2560 100 0 100"
                />
              </svg>
            </div>
          </section>
          <section className="section">
            <Container>
              <Card className="card-profile shadow mt--300">
                <div className="px-4">
                  <Row className="justify-content-center">
                    <Col className="order-lg-2" lg="3">
                      <div className="card-profile-image">
                        <a href="/#" onClick={(e) => e.preventDefault()}>
                          <img
                            alt="..."
                            className="rounded-circle"
                            src={require("assets/img/theme/" +
                              this.state.photo +
                              ".jpg")}
                          />
                        </a>
                      </div>
                    </Col>
                    <Col
                      className="order-lg-3 text-lg-right align-self-lg-center"
                      lg="4"
                    >
                      <div className="card-profile-actions py-4 mt-lg-0">
                        <Button
                          className="mr-4"
                          color="info"
                          onClick={(e) => e.preventDefault()}
                          size="sm"
                        >
                          회원탈퇴
                        </Button>
                        <Button
                          className="mr-4"
                          color="default"
                          onClick={()=> {
                            window.location.href = "/myRoutineList"
                          }}
                          size="sm"
                        >
                          Routines
                        </Button>
                        {/*<Button*/}
                        {/*    className="float-right"*/}
                        {/*    color="default"*/}
                        {/*    onClick={e => e.preventDefault()}*/}
                        {/*    size="sm"*/}
                        {/*>*/}
                        {/*  Trials*/}
                        {/*</Button>*/}
                      </div>
                    </Col>
                    <Col className="order-lg-1" lg="4">
                      <div className="card-profile-stats d-flex justify-content-center">
                        <div>
                          <span className="heading">22개</span>
                          <span className="description">Chanllenge</span>
                        </div>
                        <div
                          onClick={this.clickBoard}
                          style={{ cursor: "pointer" }}
                        >
                          <span className="heading">{this.state.posts}개</span>
                          <span className="description">Posts</span>
                        </div>
                        <div
                          onClick={this.clickBoard}
                          style={{ cursor: "pointer" }}
                        >
                          <span className="heading">
                            {this.state.comments}개
                          </span>
                          <span className="description">Comments</span>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <div className="text-center mt-5">
                    <h3>이름 : {this.state.name}</h3>
                    <div className="h6 font-weight-300">
                      <i className="ni location_pin mr-2" />
                      이메일 : {this.state.email}
                    </div>
                    {/*<div className="h6 mt-4">*/}
                    {/*  <i className="ni business_briefcase-24 mr-2" />*/}
                    {/*  Solution Manager - Creative Tim Officer*/}
                    {/*</div>*/}
                    {/*<div>*/}
                    {/*  <i className="ni education_hat mr-2" />*/}
                    {/*  University of Computer Science*/}
                    {/*</div>*/}
                  </div>
                  <div className="mt-5 py-5 border-top text-center">
                    {/*<Row className="justify-content-center">*/}
                    {/*  <Col lg="9">*/}
                    {/*    <p>*/}
                    {/*      An artist of considerable range, Ryan — the name taken*/}
                    {/*      by Melbourne-raised, Brooklyn-based Nick Murphy —*/}
                    {/*      writes, performs and records all of his own music,*/}
                    {/*      giving it a warm, intimate feel with a solid groove*/}
                    {/*      structure. An artist of considerable range.*/}
                    {/*    </p>*/}
                    {/*    <a href="#pablo" onClick={e => e.preventDefault()}>*/}
                    {/*      Show more*/}
                    {/*    </a>*/}
                    {/*  </Col>*/}
                    {/*</Row>*/}
                  </div>
                </div>
              </Card>
              {/*<div className="">*/}
              {/*  <Button value="1"*/}
              {/*      onClick={window.location.href="/"}>*/}
              {/*    Give me Routines*/}
              {/*  </Button>*/}
              {/*  <Button value="2"*/}
              {/*      onClick={window.location.href="/"}>*/}
              {/*    Give me Challenges*/}
              {/*  </Button>*/}
              {/*  <Button value="3"*/}
              {/*      onClick={window.location.href="/"}>*/}
              {/*    Give me Trials*/}
              {/*  </Button>*/}
              {/*</div>*/}
            </Container>
          </section>
        </main>
        {/*<SimpleFooter />*/}
      </>
    );
  }
}

export default Profile;
