import axios from "axios";

export const AddClientByadmin = async (props) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BASEURL}/add_clients`,
    props
  );
  return response.data;
};

export const AddUsers = async (props) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BASEURL}/add_users`,
    props
  );
  return response.data;
};

export const getAllClientswithFilter = async (id, name, type, currentPage) => {
  var limit = 5;
  const response = await axios.post(
    `${process.env.REACT_APP_BASEURL}/search_clients?admin_id=${id}&page=${currentPage}&limit=${limit}`,
    {
      name: name,
      type: type,
    }
  );
  return response.data;
};
export const Admin_login_function = async (email, password) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BASEURL}/super_admin_login`,
    {
      email: email,
      password: password,
    }
  );
  return response.data;
};

export const getUserByID = async (id) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BASEURL}/getUserById`,
    {
      id: id,
    }
  );
  return response.data;
};

export const deleteUserfunction = async (id) => {
  const response = await axios.put(
    `${process.env.REACT_APP_BASEURL}/delete_user`,
    {
      id: id,
      is_deleted: "1",
    }
  );
  return response.data;
};

export const getAllEmployeeswithFilter = async (id, name, currentPage) => {
  var limit = 5;
  currentPage = 1;
  const response = await axios.post(
    `${process.env.REACT_APP_BASEURL}/get_all_employee?admin_id=${id}&page=${currentPage}&limit=${limit}`,
    {
      name: name,
    }
  );
  return response.data;
};

export const getAllAdminwithFilter = async (name, currentPage) => {
  var limit = 5;
  // currentPage = 1;
  const response = await axios.post(
    `${process.env.REACT_APP_BASEURL}/get_all_admin?page=${currentPage}&limit=${limit}`,
    {
      name: name,
    }
  );
  return response.data;
};

export const getClientByID = async (id) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BASEURL}/get_client_by_Id`,
    {
      id: id,
    }
  );
  return response.data;
};

export const UpdateClient = async (props) => {
  const response = await axios.put(
    `${process.env.REACT_APP_BASEURL}/update_client`,
    props
  );
  return response.data;
};

export const deleteClientfunction = async (id) => {
  const response = await axios.put(
    `${process.env.REACT_APP_BASEURL}/delete_client`,
    {
      id: id,
      is_deleted: "1",
    }
  );
  return response.data;
};

export const AddDocument = async (props) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BASEURL}/document_upload`,
    props
  );
  return response.data;
};

export const getDocument = async (id, name, type, currentPage, limit) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BASEURL}/search_document?client_id=${id}&page=${currentPage}&limit=${limit}`,
    {
      document_title: name,
      document_type: type,
    }
  );
  return response.data;
};

export const deleteDocumentfunction = async (id) => {
  const response = await axios.put(
    `${process.env.REACT_APP_BASEURL}/delete_document`,
    {
      id: id,
      is_deleted: "1",
    }
  );
  return response.data;
};

export const createZipAndUpload = async (email, content, clientNmae) => {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("file", content, `${clientNmae}.zip`);
  formData.append("client_name", clientNmae);
  const response = await axios.post(
    `${process.env.REACT_APP_BASEURL}/send_mail`,
    formData
  );
  return response.data;
};

export const ForgetPasswordFunction = async (email) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BASEURL}/forget_password`,
    { email: email }
  );
  return response.data;
};

export const ResetPasswordFunction = async (password, token) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BASEURL}/reset_password`,
    { password: password },
    {
      headers: { email_token: token },
    }
  );
  return response.data;
};

export const GetDashBoardDetails = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_BASEURL}/get_superAdmin_dashboard_details`
  );
  return response.data;
};

export const AddDocumentAnotherUser = async (clientToken, props) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BASEURL}/document_upload_another_user`,
    props,
    {
      headers: { client_token: clientToken },
    }
  );
  return response.data;
};

export const GetDocumentAnotherUser = async (clientToken) => {
  console.log(" token in  get api another user--" + clientToken);
  const response = await axios.get(
    `${process.env.REACT_APP_BASEURL}/get_document__another_user`,
    {
      headers: { client_token: clientToken },
    }
  );
  return response.data;
};

export const UpdateAdmin = async (props) => {
  const response = await axios.put(
    `${process.env.REACT_APP_BASEURL}/update_admin`,
    props
  );
  return response.data;
};

export const AddEmployee = async (id, props) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BASEURL}/add_employee?admin_id=${id}`,
    props
  );
  return response.data;
};

export const UpdateEmployee = async (id, props) => {
  const response = await axios.put(
    `${process.env.REACT_APP_BASEURL}/update_employee?admin_id=${id}`,
    props
  );
  return response.data;
};
