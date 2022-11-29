// import "./Main.css";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDataAPI } from "../../../utils/fetchData";
import { PDFViewer, Page, Document, StyleSheet, Image, Text } from "@react-pdf/renderer";
import {
    POST_TYPES
} from "../../../redux/actions/postAction";
import logo from "../../../images/logo.png";

import PDFHeader from './generatePDF/Header'



const styles = StyleSheet.create({
    page: {
        backgroundColor: '#fff',
        fontFamily: 'Helvetica',
        fontSize: 11,
        paddingTop: 30,
        paddingLeft: 50,
        paddingRight: 50,
        lineHeight: 1.5,
        flexDirection: 'column',
    },
    logo: {
        width: 84,
        height: 70,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    viewer: {
        width: window.innerWidth, //the pdf viewer will take up all of the width and height
        height: window.innerHeight,
    },
});


const ExportAchievement = () => {
    const { auth, admin, socket, homePosts, theme } = useSelector((state) => state);
    const dispatch = useDispatch();

    const [load, setLoad] = useState(false);

    const handleLoadMore = async () => {
        setLoad(true);
        const res = await getDataAPI(`posts?limit=${homePosts.page * 9}`, auth.token);
        console.log(res)
        dispatch({ type: POST_TYPES.GET_POSTS, payload: { ...res.data, page: homePosts.page + 1 } });
        setLoad(false);
    };
    return (
        <>
            <div className="main_admin">
                <div className="main__container">
                    <div className="main__title">
                        <PDFViewer style={styles.viewer}>
                            <Document>
                                <Page size="A4" style={styles.page}>
                                    <PDFHeader title={'Invoice'}/>
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
