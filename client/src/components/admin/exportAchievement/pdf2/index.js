import React, { useEffect, useState, useContext } from "react";
import "./index.css"
var PdfTemplate2 = ({ id,name, description, area,date, link }) => {
  return (
    <tr className="c3">
      <td className="c15" colSpan={1} rowSpan={1}>
        <p className="c4">
          <span className="c0">{id+1}</span>
        </p>
      </td>
      <td className="c2" colSpan={1} rowSpan={1}>
        <p className="c16">
          <span className="c6">
            {name} attended IEEE
            International Conference on High Performance Computing, Data, and
            Analytics (HiPC 2019)&amp; {description}” &nbsp;at
            {area} During date
          </span>
          <span className="c6 c39">{date}</span>
        </p>
      </td>
      <td className="c11" colSpan={1} rowSpan={1}>
        <p className="c4 c5">
          <span className="c1" />
        </p>
        <p className="c4">
          <span
            style={{
              overflow: "hidden",
              display: "inline-block",
              margin: "0.00px 0.00px",
              border: "0.00px solid #000000",
              transform: "rotate(0.00rad) translateZ(0px)",
              WebkitTransform: "rotate(0.00rad) translateZ(0px)",
              width: "367.67px",
              height: "237.20px",
            }}
          >
            <img
              alt=""
              src={link}
              style={{
                width: "367.67px",
                height: "237.20px",
                marginLeft: "-0.00px",
                marginTop: "-0.00px",
                transform: "rotate(0.00rad) translateZ(0px)",
                WebkitTransform: "rotate(0.00rad) translateZ(0px)",
              }}
              title
            />
          </span>
        </p>
        <p className="c4 c5">
          <span className="c1" />
        </p>
        <p className="c4 c5">
          <span className="c1" />
        </p>
        <p className="c4 c5">
          <span className="c1" />
        </p>
      </td>
    </tr>
  );
};

export default PdfTemplate2;
