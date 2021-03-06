import UserService from "./UserService";
import axios from "axios";

const BOARD_API_BASE_URL = "http://localhost:8080/api/forums";

class BoardService {
  getBoards() {
    UserService.setupAxiosInterceptors();
    return axios.get(BOARD_API_BASE_URL);
  }

  createBoard(board) {
    UserService.setupAxiosInterceptors();
    return axios.post(BOARD_API_BASE_URL, board);
  }

  getOneBoard(no) {
    UserService.setupAxiosInterceptors();
    return axios.get(BOARD_API_BASE_URL + "/" + no);
  }

  getUpdateBoard(no) {
    UserService.setupAxiosInterceptors();
    return axios.get(BOARD_API_BASE_URL + "/update/" + no);
  }

  updateBoard(no, board) {
    UserService.setupAxiosInterceptors();
    return axios.patch(BOARD_API_BASE_URL + "/" + no, board);
  }

  deleteBoard(no) {
    UserService.setupAxiosInterceptors();
    return axios.delete(BOARD_API_BASE_URL + "/" + no);
  }

  getComments(no) {
    UserService.setupAxiosInterceptors();
    return axios.get(BOARD_API_BASE_URL + "/" + no + "/comments");
  }

  createComment(no, comment) {
    UserService.setupAxiosInterceptors();
    return axios.post(BOARD_API_BASE_URL + "/" + no + "/comments", comment);
  }

  getForumCount(userName) {
    UserService.setupAxiosInterceptors();
    return axios.get(BOARD_API_BASE_URL + "/count/" + userName);
  }

  getCommentCount(userName) {
    UserService.setupAxiosInterceptors();
    return axios.get(BOARD_API_BASE_URL + "/comments/count/" + userName);
  }

  getTop5Board() {
    return axios.get(BOARD_API_BASE_URL+"/top5");
  }

}

export default new BoardService();
