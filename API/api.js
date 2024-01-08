const apiURL = "https://task-manager-api3.p.rapidapi.com/";
const apiKey = "e06b49b241mshbb0998450e52f0cp1e2b57jsn6d6d20bac635";

// const url = 'https://task-manager-api3.p.rapidapi.com/3tHcSthvj4mjh3CtpnkJ';

const api_URL = "https://task-manager-api3.p.rapidapi.com/3tHcSthvj4mjh3CtpnkJ";
const api_key = "e06b49b241mshbb0998450e52f0cp1e2b57jsn6d6d20bac635";

const headers = {
  "content-type": "application/json",
  "X-RapidAPI-Key": apiKey,
  "X-RapidAPI-Host": "task-manager-api3.p.rapidapi.com",
};

export const createTask = async (taskData) => {
  try {
    const response = await fetch(apiURL, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(taskData),
    });

    if (response.ok) {
      const createdTask = await response.json();
      return createdTask;
    } else {
      console.log("failed to create task");
      return null;
    }
  } catch (error) {
    console.log("error", error);
    return null;
  }
};

export const getTask = async () => {
  try {
    const response = await fetch(apiURL, {
      headers: headers,
    });
    if (response.ok) {
      const tasks = await response.json();
      return tasks;
    } else {
      console.log("failed to fetch tasks");
      return null;
    }
  } catch (error) {
    console.log("error", error);
    return null;
  }
};

export const DeleteTask = async (id) => {
  try {
    const response = await fetch(`${api_URL}/${id}`, {
      method: "DELETE",
      headers: headers,
    });
    if (response.ok) {
      console.log("task deleted");
    } else {
      console.log("could not delete task");
    }
  } catch (error) {
    console.log("error", error);
  }
};
