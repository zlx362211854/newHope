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
export default {
  create,
  getOwnList,
  getAuditList,
  getAuditDetail
};
