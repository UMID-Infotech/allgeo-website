const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

export const adminLogin = async (email, password) => {
  const response = await fetch(
    `${API_BASE_URL}/api/admin/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email,
        password,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed.");
  }

  return data;
};

export const getAdminProfile = async () => {
  const response = await fetch(
    `${API_BASE_URL}/api/admin/auth/me`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Authentication failed.");
  }

  return data;
};

export const adminLogout = async () => {
  const response = await fetch(
    `${API_BASE_URL}/api/admin/auth/logout`,
    {
      method: "POST",
      credentials: "include",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Logout failed.");
  }

  return data;
};