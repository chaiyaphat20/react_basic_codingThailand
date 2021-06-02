import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { Spinner, Table } from "react-bootstrap";
import Pagination from "react-js-pagination";

const pageSize = 10;
function HospitalPage() {
  const [hospital, setHospital] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const cancelToken = useRef(null);

  const [totalRecode, setTotalRecord] = useState(0);

  // pagination
  const [page, setPage] = useState(1);

  const getData = useCallback(
    async (page) => {
      console.log("getData , Hospital");
      try {
        setLoading(true);
        const res = await axios.get(
          `https://api.codingthailand.com/api/hospital2?page=${page}&page_size=${pageSize}`,
          {
            cancelToken: cancelToken.current.token,
          }
        );
        setHospital(res.data.data);
        setTotalRecord(res.data.meta.pagination.total);
      } catch (error) {
        setError(error.response.data.message);
      } finally {
        setLoading(false);
      }
    },
    [setHospital]
  );

  useEffect(() => {
    console.log("UseEffect , Hospital");
    cancelToken.current = axios.CancelToken.source(); //cancel token
    getData(page);
    return () => {
      cancelToken.current.cancel();
    };
  }, [page, getData]);

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  //step1
  if (loading) {
    return (
      <div className="mt-5 text-center">
        <Spinner animation="border" variant="primary" />;
      </div>
    );
  }

  //step2
  if (error) {
    return (
      <div className="mt-5 text-center">
        <h1>เกิดข้อผิดพลาดจาก server กรุณาลองใหม่</h1>
        <br />
        <h1>{error}</h1>
      </div>
    );
  }

  //step3  result จริง
  let comp = (
    <div className="mt-5 text-center">
      <h1>ไม่พบข้อมูล</h1>
    </div>
  );
  if (hospital.length !== 0) {
    comp = (
      <tbody>
        {hospital.map((e) => (
          <tr key={e.id}>
            <td>{e.id}</td>
            <td>{e.code}</td>
            <td>{e.h_name}</td>
          </tr>
        ))}
      </tbody>
    );
  }

  return (
    <div className="container">
      <div className="mt-4 row">
        <div className="col-md-12">
          <h2>Hospital </h2>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>code</th>
                <th>Place</th>
              </tr>
            </thead>
            {comp}
          </Table>
          <Pagination
            activePage={page}
            itemsCountPerPage={pageSize}
            totalItemsCount={totalRecode}
            pageRangeDisplayed={15} //แสดง 15แถว
            onChange={handlePageChange}
            itemClass="page-item"
            linkClass="page-link"
            prevPageText="ก่อนหน้า"
            nextPageText="ต่อไป"
            firstPageText="หน้าแรก"
            lastPageText="หน้เาสุดท้าย"
          />
        </div>
      </div>
    </div>
  );
}

export default HospitalPage;
