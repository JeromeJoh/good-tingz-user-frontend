// TODO: re-encapsulation axios?

async function request(method, url, data = {}) {
  const baseURL = `${import.meta.env.VITE_API_BASE_URL}`;

  const res = await fetch(baseURL + url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      withCredentials: "true",
    },
    ...(method === "get" ? {} : { body: JSON.stringify(data) }),
  }).then(async (response) => {
    if (response.status >= 200 && response.status < 300) {
      return response.json();
    }
    throw await response.json();
  });

  return res;
}

export function get(url) {
  return request("get", url);
}

export function post(url, data) {
  return request("post", url, data);
}
