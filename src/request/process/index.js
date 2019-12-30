import ajax from "../common";
const create = ({ params }) => {
  return ajax({
    url: "/api/process/create",
    method: "post",
    data: params
  });
};
const getOwnList = ({ params }) => {
  return ajax({
    url: "/api/process/list",
    method: "get",
    params
  });
};
const getAuditList = ({ params }) => {
  return ajax({
    url: "/api/process/audit",
    method: "get",
    params
  });
};
const getAuditDetail = ({ params }) => {
  return ajax({
    url: "/api/process/auditDetail",
    method: "get",
    params
  });
};
// 指派给
const assign = ({ params }) => {
  return ajax({
    url: "/api/process/assign",
    method: "post",
    data: params
  });
};
const myList = ({ params }) => {
  return ajax({
    url: "/api/process/my",
    method: "get",
    params
  });
};
const update = ({ params }) => {
  return ajax({
    url: "/api/process/update",
    method: "post",
    data: params
  });
};
export default {
  create,
  getOwnList,
  getAuditList,
  getAuditDetail,
  assign,
  myList,
  update
};
