import ajax from "../common";
const uploadBase64 = ({ params }) => {
  return ajax({
    url: "/api/file/base64",
    method: "post",
    data: params
  });
};
const temporaryFileUpload = ({ params }) => {
  return ajax({
    url: "/api/file/temporaryFileUpload",
    method: "post",
    data: params
  });
};
export default {
  uploadBase64,
  temporaryFileUpload
};
