import storage from "../lib/storage";

const apiUrl = "http://localhost:3001/api/v1";

const token = storage.getStorage("auth--chadopt")?.token;

const fetechRequest = async (
  method: string,
  route: string,
  payload?: any,
  isFormData = false
) => {
  try {
    const headers: Record<string, string> = {
      Authorization: token ? `Bearer ${token}` : "",
    };

    if (!isFormData) {
      headers["Content-Type"] = "application/json";
    }

    const requestOptions: RequestInit = {
      method,
      headers,
      body: isFormData ? payload : JSON.stringify(payload),
    };

    const response = await fetch(`${apiUrl}/${route}`, requestOptions);

    if (!response.ok) {
      throw new Error(
        `${method} request failed with status ${response.status}`
      );
    }

    const res = await response.json();
    return res.data;
  } catch (error) {
    console.error(`Error during ${method} request:`, error);
  }
};

export default fetechRequest;
