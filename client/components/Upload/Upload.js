import React from "react";
import { Button, Grid, Segment, Header, Message } from "semantic-ui-react";
import AppMenu from "../Sidebar/Sidebar";
const upload = props => {
  const {
    fileInputRef,
    fileChange,
    file,
    onFormSubmit,
    showApiResponseMessage,
    apiResponseMessage,
    formatBytes
  } = props;
  return (
    <Segment basic textAlign="center">
      <AppMenu />
      <Grid
        textAlign="center"
        verticalAlign="middle"
        style={{ height: "70vh" }}
        columns={2}
        stackable
      >
        <Grid.Column>
          <Header as="h1">Select a file from your device</Header>
          <Segment basic padded>
            <Grid columns={2} stackable>
              <Grid.Row>
                <Grid.Column>
                  <Button
                    size="big"
                    fluid
                    content="Choose File"
                    labelPosition="left"
                    icon="file"
                    onClick={() => fileInputRef.current.click()}
                    style={{ marginBottom: "8px" }}
                  />
                  <input
                    ref={fileInputRef}
                    type="file"
                    hidden
                    onChange={fileChange}
                  />
                </Grid.Column>
                <Grid.Column>
                  <Button
                    disabled={file === null}
                    size="big"
                    fluid
                    content="Upload"
                    labelPosition="left"
                    icon="upload"
                    primary
                    onClick={onFormSubmit}
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <br />
            <br />
            <div>
              <span>
                <Header>Name: </Header>
                {!file ? "-" : file.name}
              </span>
              <br />
              <br />
              <span>
                <Header>Size: </Header>
                {!file ? "-" : formatBytes(file.size)}
              </span>
            </div>
            <br />
            <br />
            <div style={{ height: "50px" }}>
              <Message compact hidden={showApiResponseMessage}>
                {apiResponseMessage}
              </Message>
            </div>
          </Segment>
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default upload;
