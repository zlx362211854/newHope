import ajax from "../common";
const loginIn = ({ params }) => {
  return ajax({
    url: "/api/signup/login",
    method: "post",
    data: params
  });
};
const signup = ({ params }) => {
  return ajax({
    url: "/api/signup/account",
    method: "post",
    data: params
  });
};
const search = ({ params }) => {
  return ajax({
    url: "/api/signup/search",
    method: "get",
    params
  });
};
const update = ({ params }) => {
  return ajax({
    url: "/api/signup/update",
    method: "post",
    data: params
  });
};
const getUsers = ({ params }) => {
  return ajax({
    url: "/api/signup/list",
    method: "get",
    params
  });
};
const passUser = ({ params }) => {
  return ajax({
    url: "/api/signup/pass",
    method: "post",
    data: params
  });
};
const remove = ({ params }) => {
  return ajax({
    url: "/api/signup/remove",
    method: "post",
    data: params
  });
};
export default {
  loginIn,
  signup,
  search,
  update,
  getUsers,
  passUser,
  remove
};
