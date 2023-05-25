import {
  StyleSheet,
  Text,
  View,
  Document,
  Page,
  Image,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  body: {
    paddingTop: 40,
    paddingBottom: 65,
    paddingHorizontal: 25,
    alignItems: "center",
    // display:"table"
  },
  table: {
    display: "table",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
  },
  tableRow: {
    // margin: "auto",
    flexDirection: "row",
  },
  tableCol1: {
    width: "5%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 1,
    borderTopWidth: 1,
  },
  tableCol: {
    width: "45%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 1,
    borderTopWidth: 1,
  },
  tableCell: {
    // margin: "auto",
    marginTop: 5,
    fontSize: 14,
  },

  image: {
    width: "400px",
    height: "200px",
    textAlign: "center",
    paddingTop: 5,
    paddingBottom: 12,
  },
});

const ReportTable = ({ data }) => {
  return (
    <Document size="A4" orientation="landscape">
      <Page style={styles.body} orientation="landscape">

      <Text >WCE (Achievements) Activity Report</Text>
        <View style={styles.table}>
         
          {data.map((row, index) => {
            return (
              <View style={styles.tableRow}>
                <View style={styles.tableCol1}>
                  <Text style={styles.tableCell}>{index + 1}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}> {row.teammate} attended {row.desc + " at " + row.area} During {(new Date(row.startDate)).toUTCString() + " to " + (new Date(row.endDate)).toUTCString()}</Text>
                </View>

                <View style={styles.tableCol}>
                  <Image style={styles.image} src={JSON.parse(row.images)[0]} />
                </View>
              </View>
            );
          })}
        </View>
      </Page>
    </Document>
  );
};

export default ReportTable;
