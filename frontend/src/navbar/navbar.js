import React    from "react";
import template from "./navbar.jsx";

class navbar extends React.Component {
  render() {
    return template.call(this);
  }
}

export default navbar;
