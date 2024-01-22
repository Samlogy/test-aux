const apiUrl = "localhost:3001/api/v1";

// GET Request
const getData = async (route: string) => {
  try {
    const response = await fetch(`${apiUrl}/${route}`);
    if (!response.ok) {
      throw new Error(`GET request failed with status ${response.status}`);
    }
    const data = await response.json();
    console.log("GET Data:", data);
  } catch (error) {
    console.error("Error during GET request:", error);
  }
};

// POST Request ${apiUrl}/${route}
const postData = async (route: string, payload: any, isFormData = false) => {
  try {
    const response = await fetch(`${apiUrl}/${route}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: isFormData ? payload : JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error(`POST request failed with status ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error during POST request:", error);
  }
};

// PUT Request
const putData = async (route: string, payload: any, isFormData = false) => {
  try {
    const response = await fetch(`${apiUrl}/${route}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: isFormData ? payload : JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error(`PUT request failed with status ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error during PUT request:", error);
  }
};

// DELETE Request
const deleteData = async (route: string) => {
  try {
    const response = await fetch(`${apiUrl}/${route}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`DELETE request failed with status ${response.status}`);
    }
    console.log("DELETE request successful");
  } catch (error) {
    console.error("Error during DELETE request:", error);
  }
};

export default {
  getData,
  postData,
  putData,
  deleteData,
};
