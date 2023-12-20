import React, { useEffect } from "react";

import Smalltag from "../../SmallTag/smalltag";
import { useNavigate,useLocation, Link  } from 'react-router-dom';
import { useState } from "react";
import axios from "axios";
import moment from "moment/moment";
import { Breadcrumb, Row, Card } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faArrowRight } from '@fortawesome/free-solid-svg-icons';
function Minutes() {
  let navigate = useNavigate();
  let convenorStatus = localStorage.getItem("ConvenorStatus");
  const [loading, setLoading] = useState({
    add: false,
    apply: false,
    save: false,
    del: false,
  });
  const [editId, set_editId] = useState("-1");
  const [allMinutes, set_allMinutes] = useState([]);
  const [from, set_from] = useState(null);
  const [to, set_to] = useState(null);
  const [fileInput, set_fileInput] = useState(false);

  const fetchAllData = async (fromDate, toDate) => {
    setLoading({
      ...loading,
      apply: true,
    });
    axios
      .get(
        process.env.REACT_APP_BASE_URL +
          `/api/v1/getMinutes?fromDate=${fromDate}&toDate=${toDate}`
      )
      .then((res) => {
        set_allMinutes(
          res.data.content.map((item) => ({
            ...item,
          }))
        );
        console.log(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading({
          ...loading,
          apply: false,
        });
      });
  };
  // useEffect(() => {

  //   fetchAllData()
  //   console.log("oxo");
  // }, [])

  const editRow = (e, index) => {
    e.preventDefault();
    const arr = allMinutes;
    arr.splice(index, 1, {
      ...allMinutes[index],
      edit: true,
    });
    set_allMinutes([...arr]);
  };
  const [dateValue, set_dateValue] = useState("");
  const changeRowData = (e, index) => {
    const { name, value, files } = e.target;

    if (name === "date") {
      set_newObj({
        ...newObj,
        minutesDate: value,
      });
      set_dateValue();
      console.log(value, getDateInFormart_yyyymmdd("05-06-2023 31-07-2023"));
    } else if (name === "subj") {
      console.log("kkkkk");
      set_newObj({
        ...newObj,
        minutesSubject: value,
      });
    } else if (name === "file") {
      if (files[0].size > 25 * 1000 * 1000) {
        alert("File size be under 25MB");
      }
      set_newObj({
        ...newObj,
        file: [...files],
      });
    }
  };
  const updateRow = async (e) => {
    e.preventDefault();
    let Data = {
      filePath: newObj.filePath,
      fileTypeCode: "24",
      minutesDate: getDateInFormart_ddmmyyyy(newObj.minutesDate),
      minutesNo: newObj.minutesNo,
      minutesSubject: newObj.minutesSubject,
    };
    setLoading({
      ...loading,
      save: true,
    });
    console.log(newObj.file);
    if (newObj.file.length) {
      if (newObj.file[0].size > 25 * 1000 * 1000) {
        alert("File size be under 25MB");
        return;
      }

      let formData = new FormData();
      formData.append("vfile", newObj.file[0]);
      await axios
        .post(process.env.REACT_APP_BASE_URL + "/common/filemgr", formData)
        .then((res) => {
          if (res.data.code === 0) {
            Data = {
              ...Data,
              filePath: res.data.content.fileUri,
            };
          } else {
            setLoading({
              ...loading,
              save: false,
            });
          }
        })
        .catch((err) => {
          console.log(err, "err");
          setLoading(false);
        });
    }
    await axios
      .put(process.env.REACT_APP_BASE_URL + "/api/v1/minuteDetailupdate", Data)
      .then((res) => {
        let fromDate = getDateInFormart_ddmmyyyy(from);
        let toDate = getDateInFormart_ddmmyyyy(to);
        fetchAllData(fromDate, toDate);
        set_editId("-1");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading({
          ...loading,
          save: false,
        });
      });

    console.log(Data);
  };
  const cancleEdit = (e, index) => {
    e.preventDefault();
    const arr = allMinutes;
    arr.splice(index, 1, {
      ...allMinutes[index],
      edit: false,
    });
    set_allMinutes([...arr]);
  };
  const deleteRow = async (e, index) => {
    e.preventDefault();
    const arr = allMinutes;
    // setLoading(true)
    await axios
      .delete(
        process.env.REACT_APP_BASE_URL +
          "/api/v1/{minutesNo}?minutesNo=" +
          allMinutes[index].minutesNo
      )
      .then((res) => {
        arr.splice(index, 1);
        set_allMinutes([...arr]);
        alert("Deleted Successfully")
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        //setLoading(false)
      });
  };

  const [newObj, set_newObj] = useState({
    fileTypeCode: "24",
    minutesDate: "",
    minutesSubject: "",
  });

  const filterMinutes = (e) => {
    e.preventDefault();
    console.log("ooooo");

    if (from && to) {
      let err = 1000 * 60 * 60 * 5 + 1000 * 60 * 30;
      let hr23_min59_sec59_miSec999 =
        1000 * 60 * 60 * 23 + 1000 * 60 * 59 + 1000 * 59 + 999;
      let start = new Date(from).getTime() - err;
      let end = new Date(to).getTime() - err + hr23_min59_sec59_miSec999;

      if (start <= end) {
        let fromDate = getDateInFormart_ddmmyyyy(from);
        let toDate = getDateInFormart_ddmmyyyy(to);
        fetchAllData(fromDate, toDate);
        console.log(
          getDateInFormart_ddmmyyyy(from),
          getDateInFormart_ddmmyyyy(to)
        );
      } else {
        alert("START date must be lesser than END date");
      }
    } else {
      alert("Please select both date");
    }
  };

  const [obj, set_obj] = useState({
    filePath: "",
    fileTypeCode: "24",
    minutesDate: "",
    minutesSubject: "",
  });
  const getDateInFormart_ddmmyyyy = (yyyymmdd) => {
    const date = new Date(yyyymmdd);
    const month =
      Number(date.getMonth()) < 9
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
  const getDateInFormart_yyyymmdd = (ddmmyyyy) => {
    console.log(ddmmyyyy);

    const day = ddmmyyyy.slice(0, 2);
    const month = ddmmyyyy.slice(3, 5);
    const year = ddmmyyyy.slice(6, 10);
    console.log(`${year}-${month}-${day}`);
    return `${year}-${month}-${day}`;
  };

  const [file, set_file] = useState([]);
  const uploadMinutes = async (e) => {
    e.preventDefault();
    const date = new Date(obj.minutesDate);
    const month =
      Number(date.getMonth() + 1) < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    console.log(`${day}-${month}-${year}`);
    let uploadData = {
      filePath: "",
      fileTypeCode: "24",
      minutesDate: `${day}-${month}-${year}`,
      minutesSubject: obj.minutesSubject,
    };
    console.log(file.length);
    if (!file.length) {
      alert("Please insert file");
      return;
    }
    if (file[0].size > 25 * 1000 * 1000) {
      alert("File size be under 25MB");
      return;
    }
    setLoading({
      ...loading,
      add: true,
    });
    let formData = new FormData();
    formData.append("vfile", file[0]);
    await axios
      .post(process.env.REACT_APP_BASE_URL + "/common/filemgr", formData)
      .then((res) => {
        if (res.data.code === 0) {
          uploadData = {
            ...uploadData,
            filePath: res.data.content.fileUri,
          };
        } else {
          setLoading({
            ...loading,
            add: false,
          });
        }
      })
      .catch((err) => {
        console.log(err, "err");
      });

    await axios
      .post(process.env.REACT_APP_BASE_URL + "/api/v1/minuteDetail", uploadData)
      .then((res) => {
        alert("Uploded Successfully");
        set_obj({
          filePath: "",
          fileTypeCode: "24",
          minutesDate: "",
          minutesSubject: "",
        });
        document.getElementById("upldFile").value = null;
      })
      .catch((err) => {
        console.log(err, "err");
      })
      .finally(() => {
        setLoading({
          ...loading,
          add: false,
        });
      });
    console.log(obj);
  };
  const handleFileChange = (e) => {
    const { files } = e.target;
    if (files[0].size <= 25 * 1000 * 1000) {
      set_file([...files]);
      console.log(files[0].size);
    }
  };

  return (
    <>

<div className="page-header">
        <div>
          <h1 className="page-title">Minutes</h1>
          <Breadcrumb className="breadcrumb">
            <Breadcrumb.Item className="breadcrumb-item" href="#">
              Home
            </Breadcrumb.Item>
            <Breadcrumb.Item
              className="breadcrumb-item active breadcrumds"
              aria-current="page"
            >
              Minutes
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="ms-auto pageheader-btn">
         {/*  <Link
            to={`${process.env.PUBLIC_URL}/BillList`}
            className="btn btn-success btn-icon text-white me-3"
          >
            <span>
              <i className="fe fe-plus"></i>&nbsp;
            </span>
            Button
          </Link> */}
        </div>
      </div>
      <div className="main-body-pannel">
        <div className="right-pannel-div">
          <div className="right-pannel-div-inner">
            <div className="inner-vendor">
              <div className="card" style={{  overflowY: 'auto' }}>
                <div className="pd-15 side-menu__item active active">
                  <h4 style={{ padding: 0, margin: 0 }}>Add Minutes</h4>
                </div>
                <div className="card-body">
                  <form onSubmit={uploadMinutes}>
                    <table class="table w-100 table-bordered ">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th style={{ width: "50%" }}>Subject</th>
                          <th>Files</th>
                          <th>Add</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          <tr>
                            <td>
                              <input
                                required
                                value={obj.minutesDate}
                                onChange={(e) =>
                                  set_obj({
                                    ...obj,
                                    minutesDate: e.target.value,
                                  })
                                }
                                className="form-control"
                                type="date"
                              />
                            </td>
                            <td>
                              <input
                                required
                                onChange={(e) =>
                                  set_obj({
                                    ...obj,
                                    minutesSubject: e.target.value,
                                  })
                                }
                                className="form-control"
                                value = {obj.minutesSubject}
                                type="text"
                              />
                            </td>
                            <td>
                              <input
                                id="upldFile"
                                required
                                onChange={handleFileChange}
                                className="form-control"
                                type="file"
                              />
                            </td>
                            <td>
                              <button type="submit" class="btn btn-success">
                                {loading.add ? (
                                  "Loading..."
                                ) : (
                                    <FontAwesomeIcon icon={faPlus} />
                                )}
                              </button>
                            </td>
                          </tr>
                        }
                      </tbody>
                    </table>
                  </form>
                </div>
              </div>
            </div>



            <div className="inner-vendor">
             <div className="card"style={{  overflowY: 'auto' }}>
                <div className="pd-15 side-menu__item active active">
                  <h4 style={{ padding: 0, margin: 0 }}>Table</h4> 
                </div>
             

              <div className="card-body">
                <form>
                  <table class="table  w-100 table-bordered ">
                    <thead>
                      <tr>
                        <th>From</th>
                        <th>To</th>
                        <th>Apply</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <input
                            value={from}
                            onChange={(e) => set_from(e.target.value)}
                            type="date"
                            className="form-control"
                          />
                        </td>
                        <td>
                          <input
                            value={to}
                            onChange={(e) => set_to(e.target.value)}
                            type="date"
                            className="form-control"
                          />
                        </td>

                        <td>
                          <button
                            onClick={filterMinutes}
                            style={{ width: "100%" }}
                            type="submit"
                            class="btn btn-success"
                          >
                            {loading.apply ? (
                              "Loading..."
                            ) : (
                                <FontAwesomeIcon icon={faArrowRight} /> 
                            )}
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </form>
                {/* <form> */}
                <table class="table w-100 table-bordered ">
                  <thead>
                    <tr>
                      <th>Sl No.</th>
                      <th>Minutes number</th>
                      <th>Date</th>
                      <th>Subject</th>
                      <th style={{ width: "15%" }}>Files</th>
                      <th style={{ width: "18%" }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allMinutes.map((item, index) => {
                      return (
                        <tr>
                          <td>{index + 1}</td>

                          <td>{item.minutesNo}</td>

                          <td className="date">
                            {editId === item.minutesNo ? (
                              <input
                                value={newObj.minutesDate}
                                className="form-control"
                                name="date"
                                onChange={(e) => changeRowData(e)}
                                type="date"
                              />
                            ) : (
                              item.minutesDate
                            )}
                          </td>

                          <td className="subj">
                            {editId === item.minutesNo ? (
                              <input
                                value={newObj.minutesSubject}
                                className="form-control"
                                name="subj"
                                onChange={(e) => changeRowData(e)}
                                type="text"
                              />
                            ) : (
                              item.minutesSubject
                            )}
                          </td>
                          <td style={{ width: "15%" }}>
                            {editId === item.minutesNo ? (
                              <>
                                {!fileInput ? (
                                  <div className="file-div">
                                    
                                      <Smalltag onClick={()=> 
                                      navigate(process.env.REACT_APP_BASE_URL +
                                        item.filePath)}
                                        fontAwsmIcon={"fa-solid fa-file"}
                                        lable={"File "}
                                      />
                                    
                                    <i
                                      onClick={() => set_fileInput(!fileInput)}
                                      class="cross-icon fa-solid fa-xmark"
                                      style={{ color: "#1f2632" }}
                                    ></i>
                                  </div>
                                ) : (
                                  <div className="file-div">
                                    <input
                                      multiple
                                      name="file"
                                      onChange={(e) => changeRowData(e)}
                                      type="file"
                                    />
                                    <i
                                      onClick={() => set_fileInput(!fileInput)}
                                      class="cross-icon fa-solid fa-xmark"
                                      style={{ color: "#1f2632" }}
                                    ></i>
                                  </div>
                                )}
                              </>
                            ) : (
                              <Link
                                target="_blank"
                                to={
                                  process.env.REACT_APP_BASE_URL + item.filePath
                                }
                              >
                                <Smalltag 
                                handleClick={() =>
                                  window.open(
                                    process.env.REACT_APP_BASE_URL + item.filePath,
                                    "_blank",
                                    
                                  )}

                                  fontAwsmIcon={"fa-solid fa-file"}
                                  lable={"File "}
                                />
                              </Link>
                            )}
                          </td>
                          <td>
                            {editId === item.minutesNo ? (
                              <>
                                <button
                                  onClick={updateRow}
                                  type="button"
                                  class="btn btn-success"
                                >
                                  {loading.save ? "Loading..." : "Save"}
                                </button>
                                <button
                                  onClick={(e) => set_editId("-1")}
                                  type="button"
                                  class="btn btn-light"
                                >
                                  Cancel
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  onClick={(e) => {
                                    set_editId(item.minutesNo);
                                    set_fileInput(false);
                                    set_newObj({
                                      ...item,
                                      minutesDate: getDateInFormart_yyyymmdd(
                                        item.minutesDate
                                      ),
                                      file: [],
                                    });
                                  }}
                                  type="button"
                                  class="btn btn-primary"
                                >
                                  <i className="fa-regular fa-pen-to-square"></i>{" "}
                                  Edit
                                </button>
                                <button
                                  onClick={(e) => deleteRow(e, index)}
                                  type="button"
                                  class="btn btn-danger"
                                >
                                  <i className="fa-solid fa-trash-can"></i>{" "}
                                  Delete
                                </button>
                              </>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                {/* </form> */}
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Minutes;
