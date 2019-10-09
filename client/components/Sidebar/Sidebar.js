import React from "react";
import { Menu, Segment } from "semantic-ui-react";

const AppSidebar = () => {
  return (
      <Menu stackable inverted fluid>
        <Menu.Item name="upload" active />

        <Menu.Item
          name="docs"
          // active={activeItem === "docs"}
        >
          Documents
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item
            name="logout"
            // active={activeItem === 'logout'}
            // onClick={this.handleItemClick}
          />
        </Menu.Menu>
      </Menu>
  );
};

export default AppSidebar;
