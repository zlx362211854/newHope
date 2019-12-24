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
    method: "post",
    params
  });
};
export default {
  create,
  getOwnList
};
