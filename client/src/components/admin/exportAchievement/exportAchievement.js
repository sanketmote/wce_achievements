// import "./Main.css";
import React, { useEffect, useState, useContext, useRef } from "react";
import {
  PDFViewer,
  Page,
  Document,
  StyleSheet,
  Image,
  Text,
} from "@react-pdf/renderer";
import "./style.css";
import { MultiSelect } from "react-multi-select-component";
import { useQuery } from "@tanstack/react-query";
import PDFHeader from "./generatePDF/Header";
import Body from "./generatePDF/Body";
import _ from "lodash";
import { DateRangePicker } from "rsuite";
import jsPDF from "jspdf";
import { styled } from "@mui/material/styles";

import { startOfDay, endOfDay, subDays, subMonths } from "date-fns";

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
  Toolbar,
  TableContainer,
  TablePagination,
} from "@mui/material";
import PdfTemplate2 from "./pdf2";

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

const Ranges = [
  {
    label: "Last 7 Days",
    value: [startOfDay(subDays(new Date(), 6)), endOfDay(new Date())],
  },
  {
    label: "Last 30 Days",
    value: [startOfDay(subMonths(new Date(), 1)), endOfDay(new Date())],
  },
  {
    label: "Last 60 Days",
    value: [startOfDay(subMonths(new Date(), 2)), endOfDay(new Date())],
  },
  { label: "Reset", value: [new Date(), new Date()] },
];

const StyledRoot = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: "flex",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1, 0, 3),
}));

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

const optionFormat = [
  { label: "A4 size with wce college stamp", value: "wcestamp" },
  { label: "landscape format", value: "landscape" },
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
  const [format, setFormat] = useState([]);
  const reportTemplateRef = useRef(null);
  //   if (homePosts.length > 0) {
  //     console.log(homePosts.posts);
  //   }
  const [value, setValue] = useState("");
  const [valuef, setValuef] = useState("");

  const handleInputChange = (event, newValue) => {
    setValue(newValue);
    localStorage.setItem("repouser", newValue);
  };
  const handleInputChangef = (event, newValue) => {
    console.log(newValue);
    setValuef(newValue);
    // localStorage.setItem("repouser", newValue);
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

  const handleGeneratePdf = () => {
    const doc = new jsPDF("l", "pt", "a4");

    // Adding the fonts.
    doc.setFont("Inter-Regular", "normal");
    doc.setFontSize(9);
    var pdfjs = document.querySelector("#downloadpdf");
    doc.setLineWidth(300);
    doc.html(pdfjs, {
      async callback(doc) {
        await doc.save("document");
      },
      x: 10,
      y: 10,
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
            // justifyContent="space-between"
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
            <StyledRoot
              sx={{
                color: "primary.main",
              }}
            >
              <Typography variant="h5">Select Date :</Typography>
              &nbsp;&nbsp;
              <DateRangePicker
                value={value}
                onChange={setValue}
                ranges={Ranges}
                format="yyyy-MM-dd"
                defaultCalendarValue={[
                  startOfDay(subMonths(new Date(), 1)),
                  endOfDay(new Date()),
                ]}
              />
            </StyledRoot>
            <Autocomplete
              sx={{ width: 280 }}
              autoHighlight
              popupIcon={null}
              // PopperComponent={StyledPopper}
              options={optionFormat}
              getOptionLabel={(user) => user.label}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              inputValue={valuef}
              onInputChange={handleInputChangef}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Search Format ..."
                  onChange={handleInputChangef}
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <InputAdornment position="start">
                        {/* <Iconify
                          icon={"eva:search-fill"}
                          sx={{
                            ml: 1,
                            width: 20,
                            height: 20,
                            color: "text.disabled",
                          }}
                        /> */}
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
            &nbsp; &nbsp; &nbsp;
            <Button
              variant="contained"
              // startIcon={<Iconify icon="eva:search-outline" />}
              onClick={handleGeneratePdf}
            >
              Exports
            </Button>
          </Stack>
        </Container>
      </div>
      <div className="main_admin">
        <div className="main__container">
          <div className="main__title">
            {valuef == "landscape format" ? (
              <div id="downloadpdf" ref={reportTemplateRef}>
                <p className="c4 c5 c32">
                  <span className="c18 c6" />
                </p>
                <p className="c4">
                  <span className="c28 c0">
                    WCE (Achievements) Activity Report: 1
                  </span>
                  {/* <span className="c24">st</span>
                  <span className="c28 c0">&nbsp;December 2019 to 01</span>
                  <span className="c24">st</span>
                  <span className="c0 c28">&nbsp;February 2020</span>
                  <span className="c0 c30">
                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;C
                  </span> */}
                  {/* <span className="c6 c30">Compiled by A.R. Surve &nbsp;</span> */}
                </p>
                <p className="c4 c5">
                  <span className="c1" />
                </p>
                <a id="t.5e692b0a79874cffc2f2f9abd8345f9d88459598" />
                <a id="t.0" />
                <table className="c22">
                  <tbody>
                    {homePosts
                      .filter((item) => {
                        const selData = JSON.parse(item.type);
                        const hasSameObject = checkSameObject(
                          selData,
                          selected
                        );
                        return hasSameObject || selected.length == 0;
                      })
                      .map((item, index) => {
                        return (
                          <PdfTemplate2
                            id={index}
                            name={item.teammate}
                            area={item.area}
                            description={item.desc + " at " + item.area}
                            date={convert1(item.startDate)}
                            link={JSON.parse(item.images)[0]}
                          />
                        );
                      })}
                  </tbody>
                </table>
                <p className="c16">
                  <span className="c0">&nbsp;</span>
                </p>
                <p className="c4 c8 c5">
                  <span className="c29 c6 c35" />
                </p>
                <div>
                  <p className="c38" id="h.gjdgxs">
                    <span className="c29 c6 c31">&nbsp;</span>
                    <span
                      style={{
                        overflow: "hidden",
                        display: "inline-block",
                        margin: "0.00px 0.00px",
                        border: "0.00px solid #000000",
                        transform: "rotate(0.00rad) translateZ(0px)",
                        WebkitTransform: "rotate(0.00rad) translateZ(0px)",
                        width: "1124.27px",
                        height: "6.60px",
                      }}
                    >
                      <img
                        alt=""
                        src="images/image17.png"
                        style={{
                          width: "1124.27px",
                          height: "6.60px",
                          marginLeft: "0.00px",
                          marginTop: "0.00px",
                          transform: "rotate(0.00rad) translateZ(0px)",
                          WebkitTransform: "rotate(0.00rad) translateZ(0px)",
                        }}
                        title
                      />
                    </span>
                  </p>
                  <p className="c17">
                    <span className="c7 c21 c9">&nbsp;</span>
                  </p>
                  <p className="c17 c5">
                    <span className="c7 c9 c21" />
                  </p>
                  <p className="c5 c37">
                    <span className="c7 c21 c9" />
                  </p>
                </div>
              </div>
            ) : (
              <PDFViewer style={styles.viewer}>
                <Document>
                  <Page size="A4" style={styles.page}>
                    <PDFHeader title={"Invoice"} />
                    {homePosts
                      .filter((item) => {
                        const selData = JSON.parse(item.type);
                        const hasSameObject = checkSameObject(
                          selData,
                          selected
                        );
                        return hasSameObject || selected.length == 0;
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
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ExportAchievement;
