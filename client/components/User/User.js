import React from "react";
import { Container } from "semantic-ui-react";
import Upload from "../Upload/Upload";
import Documents from "../Documents/Documents";
import Error404 from "../Error/Error404";
import { post } from "axios";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      apiResponseMessage: "",
      showApiResponseMessage: true
    };
  }

  fileInputRef = React.createRef();

  formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  onFormSubmit = e => {
    e.preventDefault();
    if (this.state.file) {
      this.fileUpload(this.state.file).then(response => {
        console.log(response);

        // fix: after upload same file can't be selected
        this.fileInputRef.current.value = "";

        this.setState({
          apiResponseMessage: response.data.message,
          showApiResponseMessage: false,
          file: null
        });
        // Hide api response message
        setTimeout(() => {
          this.setState({ showApiResponseMessage: true });
        }, 3000);
      });
    }
  };

  fileChange = e => {
    console.log("File changed");
    this.setState({ file: e.target.files[0] }, () => {
      console.log("File chosen --->", this.state.file);
    });
  };

  fileUpload = file => {
    const url = "http://localhost:3000/document/upload";
    const formData = new FormData();
    formData.set("lastModified", file.lastModified);
    formData.set("lastModifiedDate", file.lastModifiedDate);
    formData.append("doc", file);
    const config = {
      headers: {
        "Content-type": "multipart/form-data"
      }
    };
    return post(url, formData, config);
  };

  logoutClickHandler = (e) => {
    
  }

  render() {
    const { apiResponseMessage, showApiResponseMessage, file } = this.state;
    const { location, match } = this.props;
    console.log(location.pathname);
    return (
      <Container>
        {location.pathname === "/user" || location.pathname === '/user/' ? (
          <Redirect
            from={match.path}
            to={`${match.path}/upload`}
          />
        ) : (
          ""
        )}
        <Switch>
          <Route
            path={`${match.path}/docs`}
            render={() => {
              return <Documents />;
            }}
          />
          <Route
            path={`${match.path}/upload`}
            render={() => {
              return (
                <Upload
                  fileInputRef={this.fileInputRef}
                  fileChange={this.fileChange}
                  file={file}
                  onFormSubmit={this.onFormSubmit}
                  showApiResponseMessage={showApiResponseMessage}
                  apiResponseMessage={apiResponseMessage}
                  formatBytes={this.formatBytes}
                />
              );
            }}
          />
          <Route component={Error404} />
        </Switch>
      </Container>
    );
  }
}

export default withRouter(User);
