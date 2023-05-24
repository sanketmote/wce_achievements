// import "./Main.css";
import React, { useEffect, useState, useContext } from "react";
import {
  PDFViewer,
  Page,
  Document,
  StyleSheet,
  Image,
  Text,
} from "@react-pdf/renderer";
import { MultiSelect } from "react-multi-select-component";
import { useQuery } from "@tanstack/react-query";
import PDFHeader from "./generatePDF/Header";
import Body from "./generatePDF/Body";
import _ from "lodash";

// import { DateRangePicker } from "rsuite";
// import "rsuite/dist/rsuite.min.css";
import { AuthContext } from "../../../context/authContext";
// import Chart from "../charts/Chart";

import { makeRequest } from "../../../axios";
// import { Helmet } from 'react-helmet-async';
// import { filter } from 'lodash';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  TableRow,
  TableBody,
  TableCell,
  Autocomplete,
  Popper,
  TextField,
  Container,
  InputAdornment,
  Typography,
  TableContainer,
  TablePagination,
} from "@mui/material";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#fff",
    fontFamily: "Helvetica",
    fontSize: 11,
    paddingTop: 30,
    paddingLeft: 50,
    paddingRight: 50,
    lineHeight: 1.5,
    flexDirection: "column",
  },
  logo: {
    width: 84,
    height: 70,
    marginLeft: "auto",
    marginRight: "auto",
  },
  viewer: {
    width: window.innerWidth, //the pdf viewer will take up all of the width and height
    height: window.innerHeight,
  },
});

const convert = (str) => {
  var date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
  const date1 = new Date([date.getFullYear(), mnth, day].join("-"));
  console.log(date1);
  const timestamp = date1.getTime();
  return timestamp;
};

const options = [
  { label: "Sports Achievements", value: "sport" },
  { label: "Academic Achievements", value: "edu" },
  { label: "Extracurricular Achievements", value: "extra" },
  {
    label: "Internships, Certificate area and Work Experience",
    value: "intern",
  },
  { label: "Research and Innovation", value: "res" },
  { label: "Artistic and Creative Achievements:", value: "creat" },
  { label: "Organizational Achievements", value: "org" },
  { label: "Other", value: "other" },
];
const convert1 = (str) => {
  var date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);

  return [date.getFullYear(), mnth, day].join("-");
};

const ExportAchievement = () => {
  const { currentUser, logOut, isAdmin } = useContext(AuthContext);
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  //   const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);
  const [homePosts, sethomePosts] = useState([]);
  const [selected, setSelected] = useState([]);
  //   if (homePosts.length > 0) {
  //     console.log(homePosts.posts);
  //   }
  const [value, setValue] = useState("");

  const handleInputChange = (event, newValue) => {
    setValue(newValue);
    localStorage.setItem("repouser", newValue);
  };
  const { isLoading, error, data } = useQuery(["posts"], () =>
    makeRequest
      .get("/posts")
      .then((res) => {
        console.log(res.status);
        return res.data;
      })
      .catch((err) => {
        if (err.response.status === 401) {
          logOut();
        }
        console.log("err", err.response.status);
      })
  );
  const FetchData = async () => {
    setLoad(true);
    var data = await makeRequest.get("/posts/").then((res) => {
      console.log(res.status);
      return res.data;
    });
    console.log(data);
    sethomePosts(data);
    setLoad(false);
  };
  useEffect(() => {
    FetchData();
    // setadmin(admin);
  }, []);
  // const handleLoadMore = async () => {
  //     setLoad(true);
  //     const res = await getDataAPI(`posts?limit=${homePosts.page * 9}`, auth.token);
  //     console.log(res)
  //     dispatch({ type: POST_TYPES.GET_POSTS, payload: { ...res.data, page: homePosts.page + 1 } });
  //     setLoad(false);
  // };

  const checkSameObject = (array1, array2) => {
    return array1.some((obj1) => {
      return array2.some((obj2) => _.isEqual(obj1, obj2));
    });
  };

  return (
    <>
      <div className="nav_admin">
        <Container maxWidth="xl">
          <br />
          <Stack>
            <Typography variant="h4" sx={{ mb: 2 }}>
              WCE Achievements
            </Typography>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mb={5}
          >
            <Autocomplete
              sx={{ width: 280 }}
              autoHighlight
              popupIcon={null}
              // PopperComponent={StyledPopper}
              options={options}
              getOptionLabel={(user) => user.label}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              inputValue={value}
              onInputChange={handleInputChange}
              renderInput={(params) => (
                <MultiSelect
                  key={5}
                  isMulti
                  options={options}
                  value={selected}
                  onChange={setSelected}
                  labelledBy="Select Achievement Type"
                />
                // <TextField
                //   {...params}
                //   placeholder="Search Category ..."
                //   // onChange={fetchSuggestions}
                //   InputProps={{
                //     ...params.InputProps,
                //     startAdornment: (
                //       <InputAdornment position="start">
                //         {/* <Iconify
                //           icon={"eva:search-fill"}
                //           sx={{
                //             ml: 1,
                //             width: 20,
                //             height: 20,
                //             color: "text.disabled",
                //           }}
                //         /> */}
                //       </InputAdornment>
                //     ),
                //   }}
                // />
              )}
            />
          </Stack>
        </Container>
      </div>
      <div className="main_admin">
        {/* <div style={{ textAlign: "center" }}>
          <h1> Export Achievement </h1>
          <br />
          Apply Filter :
          <br />
          <h5 style={{ padding: "15px" }}>
            <label>
              Select Range{" "}
              <DateRangePicker
                placeholder="Select Date"
                onChange={(e) => {
                  setMin(convert(e[0]));
                  setMax(convert(e[1]));
                }}
              />
            </label>
          </h5>
        </div> */}

        <div className="main__container">
          <div className="main__title">
            <PDFViewer style={styles.viewer}>
              <Document>
                <Page size="A4" style={styles.page}>
                  <PDFHeader title={"Invoice"} />
                  {homePosts
                    .filter((item) => {
                      const selData = JSON.parse(item.type);
                      const hasSameObject = checkSameObject(selData, selected);
                      return (hasSameObject  || selected.length==0)
                    })
                    .map((item) => {
                      return (
                        <Body
                          name={item.teammate}
                          description={item.desc + " at " + item.area}
                          date={convert1(item.startDate)}
                          link={JSON.parse(item.images)[0]}
                        />
                      );
                    })}
                  {/* <Body
                    name={"Prof. Sunil Deshpande (Electronics Dept)"}
                    description={" "}
                    date=""
                    link={"https://react-pdf.org/images/logo.png"}
                  /> */}
                </Page>
              </Document>
            </PDFViewer>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExportAchievement;
