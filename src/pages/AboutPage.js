import axios from "axios";
import React, { useState } from "react";
function AboutPage() {
  const [version] = useState("");
  React.useEffect(() => {
    async function getData() {
      const res = await axios.get("https://api.codingthailand.com/api/version");
    }
    getData();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h2>เกี่ยวกับเรา</h2>
          <p>Backend {version}</p>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
