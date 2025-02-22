import React from "react";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p style={styles.text}>
        © {new Date().getFullYear()} SnapURL. All rights reserved.
      </p>
    </footer>
  );
};

const styles = {
  footer: {
    color: "black",
    textAlign: "center",
    padding: "10px",
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
  },
  text: {
    margin: 0,
  },
};

export default Footer;
