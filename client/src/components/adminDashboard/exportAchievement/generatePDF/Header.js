import React, { Fragment } from 'react';
import logo from "../../../../images/logo.png";
import { Text, View, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        fontStyle: 'bold',
        paddingBottom: 10,
    },
    rowdash: {
        paddingTop: 1,
        paddingBottom: 2,
        flexDirection: 'row',
        alignItems: 'center',
        fontStyle: 'bold',
        borderTopColor: "#3778C2",
        borderBottomColor: '#3778C2',
        borderBottomWidth: 2,
        borderTopWidth: 2,

    },
    column: {
        flexDirection: 'column',
        alignItems: 'center',
        display: "table-row",
        position: "left",
        width: "880px",
    },
    description: {
        color: "#CC0000",
        width: '100%',
        textAlign: 'center',
        fontSize: 24,
        fontWeight: "bold",
    },
    anai: {
        color: "#CC0000",
        width: '100%',
        textAlign: 'center',
        fontSize: "13.0pt",
        paddingTop: 5,
        paddingBottom: 5,
    },
    location: {
        color: "#CC0000",
        width: '100%',
        textAlign: 'center',
        fontSize: "17.0pt",
    },
    email: {
        paddingTop: 5,
        color: "#CC0000",
        width: '100%',
        textAlign: 'center',
        fontSize: "13.0pt",
    },
    dir: {
        color: "#CC0000",
        width: '100%',
        textAlign: 'center',
        fontSize: "10.0pt",
        paddingTop: 5,
    },

    image: {
        width: 240,
        display: "table-row",
        position: "relative",
        textAlign: 'left',
    },


});

const PDFHeader = ({ title }) => {
    return (
        <Fragment>
            <View style={styles.row}>
                <Image style={styles.image} src={logo} />
                <View style={styles.column} >
                    <Text style={styles.description}>Walchand College of Engineering,</Text>
                    <Text style={styles.description}>Sangli</Text>

                    <Text style={styles.anai}>(An Autonomous Institute)</Text>
                    <Text style={styles.location}>Vishrambag, SANGLI-416415 (M.S.), India</Text>
                    <Text style={styles.email}>Website : www.walchandsangli.ac.in</Text>
                    <Text style={styles.dir}>Email : director@walchandsangli.ac.in, walchand@rediffmail.com</Text>

                </View>
            </View>

            <View style={styles.rowdash}>
                <Text style={styles.dir}>Director +91-233-2303433 </Text>
                <Text style={styles.dir}>Office +91-233-2300383 </Text>
                <Text style={styles.dir}>Fax : +91-233-2300831</Text>
            </View>

        </Fragment>
    )
};

export default PDFHeader;

/** 
 

const borderColor = '#3778C2'

const styles = StyleSheet.create({
  body: {
    paddingTop: 40,
    paddingBottom: 65,
    paddingHorizontal: 25,
    // display:"table"
  },

  header: {
    fontSize: 12,
    display: "table-row",
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
  row: {
        flexDirection: 'row',
        alignItems: 'center',
        fontStyle: 'bold',
    paddingBottom:10,
    },
  rowdash: {
        paddingTop: 1,
        paddingBottom:2,
        flexDirection: 'row',
        alignItems: 'center',
        fontStyle: 'bold',
        borderTopColor:"#3778C2",
        borderBottomColor: '#3778C2',
        borderBottomWidth: 2,
        borderTopWidth: 2,

    },
  column:{
    flexDirection: 'column',
    alignItems: 'center',
    display: "table-row",
    position:"left",
    width:"880px",
  },
    description: {
      color:"#CC0000",
      width: '100%',
      textAlign: 'center',
      fontSize: 24,
      fontWeight: "bold",
    },
  anai:{
    color:"#CC0000",
      width: '100%',
    textAlign: 'center',
    fontSize: "13.0pt",
    paddingTop: 5,
    paddingBottom: 5,
  },
  location:{
    color:"#CC0000",
    width: '100%',
    textAlign: 'center',
    fontSize: "17.0pt",
  },
  email:{
    paddingTop: 5,
    color:"#CC0000",
    width: '100%',
    textAlign: 'center',
    fontSize: "13.0pt",
  },
  dir:{
    color:"#CC0000",
    width: '100%',
    textAlign: 'center',
    fontSize: "14.0pt",
    paddingTop: 5,
  },
  
  image: {
    width: "120px",
    height: "95px",
    display: "table-row",
      position: "relative",
    textAlign:'left'
  },

    
});

const Quixote = () => (
  <Document>
    <Page style={styles.body}>
      <View style={styles.row}>
            <Image style={styles.image} src={"https://react-pdf.org/images/logo.png"} />
            <View style={styles.column} >
                    <Text style={styles.description}>Walchand College of Engineering,</Text>
                    <Text style={styles.description}>Sangli</Text>
              
                <Text style={styles.anai}>(An Autonomous Institute)</Text>
              <Text style={styles.location}>Vishrambag, SANGLI-416415 (M.S.), India</Text>
              <Text style={styles.email}>Website : www.walchandsangli.ac.in</Text>
              <Text style={styles.dir}>Email : director@walchandsangli.ac.in, walchand@rediffmail.com</Text>
      
            </View>      
    </View>
      
      <View style={styles.rowdash}>
      <Text style={styles.dir}>Director +91-233-2303433 </Text>
         <Text style={styles.dir}>Office +91-233-2300383 </Text>
        <Text style={styles.dir}>Fax : +91-233-2300831</Text>
      </View>
      
        
      <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
        `${pageNumber} / ${totalPages}`
      )} fixed />
    </Page>
  </Document>
);


ReactPDF.render(<Quixote />);

*/