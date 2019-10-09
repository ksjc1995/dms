import React from "react";
import {
  Button,
  Form,
  Segment,
  Grid,
  Header,
  Icon,
  Message
} from "semantic-ui-react";
import { withRouter, Redirect } from "react-router-dom";
import axios from "axios";
class Home extends React.Component {
  state = {
    userEmail: "",
    userPassword: "",
    redirectToReferrer: false,
    apiResponseMessage: "",
    isApiResponseMessageHidden: true,
    submitdisabled:true
  };

  handleChange = (e, { name, value }) => {
    const {userPassword, userEmail} = this.state;
    if(userPassword.length >1 && userEmail.length  >1){
      this.setState({submitdisabled:false});
    }
    else {
      this.setState({submitdisabled:true});
    }
  
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { userEmail, userPassword } = this.state;
    axios
      .post("http://localhost:3000/login", {
        userEmail: userEmail,
        userPassword: userPassword
      })
      .then(response => {
        console.log(response);
        localStorage.setItem("token", response.data.token);
        this.setState({
          redirectToReferrer: true,
          apiResponseMessage: response.data.message,
          isApiResponseMessageHidden: false
        });
        setTimeout(() => {
          this.setState({
            isApiResponseMessageHidden: true,
            apiResponseMessage: ""
          });
        }, 2000);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const {
      redirectToReferrer,
      apiResponseMessage,
      isApiResponseMessageHidden,
      submitdisabled
    } = this.state;
    if (redirectToReferrer) <Redirect to="/user" />;
    return (
      <div>
        <Grid
          textAlign="center"
          style={{ height: "100vh" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" icon>
              <Icon name="dochub" color="blue" />
              Database Management System
              <Header.Subheader>Login to your account</Header.Subheader>
            </Header>
            <Form size="large" onSubmit={this.handleSubmit}>
              <Segment basic padded="very" textAlign="left">
                <Form.Input
                  name="userEmail"
                  type="email"
                  icon="user"
                  iconPosition="left"
                  placeholder="Enter your email address"
                  onChange={this.handleChange}
                ></Form.Input>
                <Form.Input
                  name="userPassword"
                  type="password"
                  icon="lock"
                  iconPosition="left"
                  placeholder="Enter Password"
                  onChange={this.handleChange}
                ></Form.Input>
                <Form.Checkbox label="Login as admin"></Form.Checkbox>
                <Button disabled= {submitdisabled}fluid basic color="blue" type="submit">
                  Login
                </Button>
              </Segment>
            </Form>
            <div style={{ height: "50px" }}>
              <Message compact hidden={isApiResponseMessageHidden}>
                {apiResponseMessage}
              </Message>
            </div>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default withRouter(Home);
