import ajax from "../common";
const create = ({ params }) => {
  return ajax({
    url: "/api/orgs/create",
    method: "post",
    data: params
  });
};
const getOrgsList = ({ params }) => {
  return ajax({
    url: "/api/orgs/list",
    method: "get",
    params
  });
};
const removeOrg = ({ params }) => {
  return ajax({
    url: "/api/orgs/remove",
    method: "post",
    data: params
  });
};
export default {
  create,
  getOrgsList,
  removeOrg
};
