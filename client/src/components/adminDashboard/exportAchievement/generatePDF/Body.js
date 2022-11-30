
import React, { Fragment } from 'react';
import { Text, View, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    body: {
        paddingTop: 40,
        paddingBottom: 65,
        paddingHorizontal: 25,
        alignItems: 'center'
        // display:"table"
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

    cong: {
        color: "#0070C0",
        width: '100%',
        textAlign: 'center',
        fontSize: 26,
        fontWeight: "bold",
        paddingTop: 5,
        paddingBottom: 17,
    },
    name: {
        width: '100%',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: "bold",
        paddingTop: 5,
        paddingBottom: 17,
    },
    desc: {
        width: '100%',
        textAlign: 'center',
        fontSize: 18,
        paddingTop: 5,
        paddingBottom: 17,
    },
    date: {
        width: '100%',
        textAlign: 'center',
        fontSize: "17.0pt",
        paddingTop: 5,
        paddingBottom: 17,
    },


    image: {
        width: "120px",
        height: "95px",
        textAlign: 'center',
        paddingTop: 5,
        paddingBottom: 12,
    },


});

const Body = ({name,description,date,link}) => (
    <View style={styles.body}>
        <Text style={styles.cong}>Congratulations!! </Text>
        <Text style={styles.name}>{name}</Text>

        <Text style={styles.desc}>{description}
        </Text>
        <Text style={styles.date}>On {date}</Text>

        <Image style={styles.image} src={link} />


    </View>
);


export default Body;
