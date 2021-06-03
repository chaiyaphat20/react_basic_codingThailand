import axios from "axios";
import React, { useState } from "react";
function AboutPage() {
  const [version,setVersion] = useState("");
  React.useEffect(() => {
    async function getData() {
      const res = await axios.get("https://api.codingthailand.com/api/version");
      setVersion(res.data.data.version)
    }
    getData();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h2>เกี่ยวกับเรา</h2>
          <p>Backend Version  {version}</p>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
