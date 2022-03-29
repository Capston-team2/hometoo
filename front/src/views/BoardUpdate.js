import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/font-awesome/css/font-awesome.min.css";
import "assets/scss/argon-design-system-react.scss";

import {
  Badge,
  Button,
  Card,
  CardBody,
  CardImg,
  Col,
  Container,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
} from "reactstrap";

import BoardService from "../service/BoardService";
import CardsFooter from "components/Footers/CardsFooter.js";
import CommentsBlock from "simple-react-comments";
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import Download from "../components/IndexSections/Download";
import React from "react";
import classnames from "classnames";

// nodejs library that concatenates classes


// reactstrap components


// core components



//css




// 댓글기능


// index page sections
// import Download from "../IndexSections/Download.js";


class BoardUpdate extends React.Component {
  state = {};

  constructor(props) {
    super(props);

    this.state = {
      no: this.props.match.params.no,
      title: "",
      writer: "",
      contents: "",
      type: "F",
      delYn: "N",
    };

    this.changeWriterHandler = this.changeWriterHandler.bind(this);
    this.changeContentsHandler = this.changeContentsHandler.bind(this);
    this.changeTitleHandler = this.changeTitleHandler.bind(this);
    this.createBoard = this.createBoard.bind(this);
  }

  changeTitleHandler = (event) => {
    this.setState({ title: event.target.value });
  };

  changeWriterHandler = (event) => {
    this.setState({ writer: event.target.value });
  };

  changeContentsHandler = (event) => {
    this.setState({ contents: event.target.value });
  };

  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;

    BoardService.getUpdateBoard(this.state.no).then((res) => {
      let board = res.data;
      // this.setState({board: res.data});
      console.log("board => " + JSON.stringify(board));

      this.setState({
        title: board.title,
        contents: board.contents,
        writer: board.writer,
      });
    });
  }

  createBoard = (event) => {
    event.preventDefault();
    let board = {
      type: this.state.type,
      title: this.state.title,
      writer: this.state.writer,
      contents: this.state.contents,
      delYn: this.state.delYn,
    };
    console.log("board => " + JSON.stringify(board));
    BoardService.updateBoard(this.state.no, board).then((res) => {
      this.props.history.push("/board");
    });
  };

  render() {
    return (
      <>
        <DemoNavbar />
        <main ref="main">
          <div className="position-relative">
            {/* shape Hero */}
            <section className="section section-lg section-shaped pb-250">
              <div className="shape shape-style-1 shape-default">
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
              <Container className="py-lg-md d-flex">
                {/*      <div className="col px-0">*/}
                {/*          <Row>*/}
                {/*              <Col lg="6">*/}
                {/*                  <h1 className="display-3 text-white">*/}
                {/*                      모두의 홈트 게시판{" "}*/}
                {/*                      <span></span>*/}
                {/*                  </h1>*/}
                {/*                  <p className="lead text-white">*/}
                {/*                      홈트레이닝에 관한 자유로운 토론 게시판입니다.<br />*/}
                {/*                      필요한 정보들이나 팁들을 자유롭게 공유해주세요.<br />*/}
                {/*                      화상채팅에 같이할 동료들을 구해도 좋습니다.*/}
                {/*                  </p>*/}
                {/*                  <div className="btn-wrapper">*/}
                {/*                      <Button*/}
                {/*                          className="btn-icon mb-3 mb-sm-0"*/}
                {/*                          color="info"*/}
                {/*                          href="http://localhost:3000/sample"*/}
                {/*                      >*/}
                {/*<span className="btn-inner--icon mr-1">*/}
                {/*  <i className="ni ni-user-run" />*/}
                {/*</span>*/}
                {/*                          <span className="btn-inner--text">화상채팅 홈트</span>*/}
                {/*                      </Button>*/}
                {/*                      <Button*/}
                {/*                          className="btn-white btn-icon mb-3 mb-sm-0 ml-1"*/}
                {/*                          color="default"*/}
                {/*                          href="http://localhost:3000/login"*/}
                {/*                      >*/}
                {/*<span className="btn-inner--icon mr-1">*/}
                {/*  <i className="ni ni-trophy" />*/}
                {/*</span>*/}
                {/*                          <span className="btn-inner--text">*/}
                {/*  홈트 챌린지*/}
                {/*</span>*/}
                {/*                      </Button>*/}
                {/*                  </div>*/}
                {/*              </Col>*/}
                {/*          </Row>*/}
                {/*      </div>*/}
              </Container>
              {/* SVG separator */}
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
            {/* 1st Hero Variation */}
          </div>
          {/*이름, 이메일, 메모 카드 섹션*/}
          <section className="section section-components pb-0">
            <Container className="justify-content-md-center" fluid>
              <Row className="justify-content-center mt--300">
                <Col lg="8">
                  <Card className="bg-gradient-secondary shadow">
                    <CardBody className="p-lg-5">
                      <h4 className="display-3 text-black">게시판 수정</h4>
                      <p className="mt-0">
                        운동 정보, 트레이닝에 관한 정보를 자유롭게 대화해주세요.
                      </p>
                      <FormGroup
                        className={classnames("mt-5", {
                          focused: this.state.nameFocused,
                        })}
                      >
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-single-copy-04" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="제목을 입력해주세요."
                            value={this.state.title}
                            type="text"
                            onFocus={(e) =>
                              this.setState({ nameFocused: true })
                            }
                            onBlur={(e) =>
                              this.setState({ nameFocused: false })
                            }
                            onChange={this.changeTitleHandler}
                          />
                        </InputGroup>
                      </FormGroup>
                      <FormGroup
                        className={classnames({
                          focused: this.state.emailFocused,
                        })}
                      >
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-circle-08" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            // placeholder={this.state.board.writer}
                            value={this.state.writer}
                            type="email"
                            onFocus={(e) =>
                              this.setState({ emailFocused: true })
                            }
                            onBlur={(e) =>
                              this.setState({ emailFocused: false })
                            }
                            disabled={true}
                          />
                        </InputGroup>
                      </FormGroup>
                      <FormGroup className="mb-5">
                        <Input
                          className="form-control-alternative"
                          cols="80"
                          name="name"
                          placeholder="내용을 입력해주세요."
                          value={this.state.contents}
                          rows="10"
                          type="textarea"
                          onChange={this.changeContentsHandler}
                        />
                      </FormGroup>
                      <div>
                        <Button
                          block
                          className="btn-round"
                          color="default"
                          size="lg"
                          type="button"
                          onClick={this.createBoard}
                        >
                          저장
                        </Button>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
          </section>
        </main>
      </>
    );
  }
}

export default BoardUpdate;
