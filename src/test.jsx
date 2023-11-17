import axios from "axios";
import React, { useEffect, useState } from "react";
import "./test.css";

const Test = () => {
  const [table, setTable] = useState([]);
  const [value, setValue] = useState("");
  const [category, setCategory] = useState("All");
  const fetchData = async () => {
    const res = await axios("https://northwind.vercel.app/api/products");
    setTable(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const SearchData = (e) => {
    setValue(e.target.value);
  };

  const SortDataA_Z = () => {
    setTable(
      [...table].sort((a, b) =>
        a.name > b.name ? 1 : b.name > a.name ? -1 : 0
      )
    );
  };

  function handleCategButton(id) {
    setCategory(id);
  }

  const SortDataZ_A = () => {
    setTable(
      [...table].sort((a, b) =>
        a.name > b.name ? -1 : b.name > a.name ? 1 : 0
      )
    );
  };

  return (
    <>
      <input
        placeholder="Search..."
        type="text"
        onChange={(e) => {
          SearchData(e);
        }}
      />
      <button onClick={SortDataA_Z}>Sort(a-z)</button>
      <button onClick={SortDataZ_A}>Sort(z-a)</button>
      <button onClick={(e) => handleCategButton(1)}>category1</button>
      <button onClick={(e) => handleCategButton(2)}>category2</button>
      <button onClick={(e) => handleCategButton(3)}>category3</button>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>supplierId</th>
            <th>categoryId</th>
            <th>Name</th>
            <th>QuantityPerUnit</th>
          </tr>
        </thead>
        <tbody>
          {table &&
            table
              .filter((x) => x.categoryId === category || category==="All")
              .filter((x) => x.name.toLowerCase().includes(value.toLowerCase()))
              .map((item) => {
                return (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.supplierId}</td>
                    <td>{item.categoryId}</td>
                    <td>{item.name}</td>
                    <td>{item.quantityPerUnit}</td>
                  </tr>
                );
              })}
        </tbody>
      </table>
    </>
  );
};

export default Test;
