import ajax from "../common";
const create = ({ params }) => {
  return ajax({
    url: "/api/process/create",
    method: "post",
    data: params
  });
};

export default {
  create
};
