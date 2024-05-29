import React, { useState, useEffect } from "react";
import httpClient from "../../additional/httpClient";

const Logout = () => {
  const [user, setUser] = useState(null);

  const logoutUser = async () => {
    await httpClient.post("http://localhost:5000/logout");
    window.location.href = "/";
  };

  useEffect(() => {
    (async () => {
      try {
        const resp = await httpClient.get("http://localhost:5000/");
        setUser(resp.data);
      } catch (error) {
        console.log("Not authenticated");
      }
    })();
  }, []);

};

export default Logout;
