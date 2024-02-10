import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { formatDate } from "../utils/utils";
import DataNotFound from "../assets/notFound.png";

const RepoTable = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/data");
      const data = await response.json();
      setData(data);
      setSearchResults(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (!searchTerm) {
      setSearchResults(data);
      return;
    }
    const results = data.filter((item) => {
      return Object.values(item).some((val) =>
        val?.toString()?.toLowerCase()?.includes(searchTerm.toLowerCase())
      );
    });
    setSearchResults(results);
  };

  return (
    <>
      <div style={{ width: "500px", margin: "0 auto", marginBottom: "1rem" }}>
        <InputGroup className="mb-3">
          <Form.Control
            type="text"
            id="search"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            onChange={(e) => {
              if (e.target.value === "") {
                setSearchResults(data);
              }
              setSearchTerm(e.target.value);
            }}
          />
          <InputGroup.Text id="basic-addon2" onClick={handleSearch}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
            </svg>
          </InputGroup.Text>
        </InputGroup>
      </div>
      {searchResults.length > 0 ? (
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Owner</th>
              <th>Repository</th>
              <th>Title</th>
              <th>Reviewers</th>
              <th>Status</th>
              <th>Head Branch</th>
              <th>Merge Date</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {searchResults.map((record) => {
              return (
                <tr key={record.id}>
                  <td>{record.owner}</td>
                  <td>{record.repo}</td>
                  <td>{record.title}</td>
                  <td>{record.reviewers?.toString()}</td>
                  <td>{record.status}</td>
                  <td>{record.headBranch}</td>
                  <td>{formatDate(record.mergedAt)}</td>
                  <td>{formatDate(record.createdAt)}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      ) : (
        <div className="errorContainer">
          <img src={DataNotFound} />
          <h6 style={{ textAlign: "center" }}>
            No Data found for {searchTerm}
          </h6>
        </div>
      )}
    </>
  );
};

export default RepoTable;
