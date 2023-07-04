import React, { Component } from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { Route, Link, NavLink, Redirect } from "react-router-dom";
import DataFromGeneratedLink from "./Components/DataFromGeneratedLink/DataFromGeneratedLink";
import * as actions from "../src/store/store/actions/index";
import AllQuestions from "./Components/DataFromServer/AllPapers";
import Frontside from "./Components/FrontSide/Frontside";
import MainPage from "./Components/FrontSide/MainPage";
import CreateElement from "./Components/QuestionPaper/CreateElement";
import AdminElement from "./Components/QuestionPaper/AdminElement";
import PaperCreatedSuccessfully from "./Components/MakeSuccessfully/MakeSuccessfully";
import Auth from "./Components/Login_Form/Auth";
import AllResponces from "../src/Components/QuestionButtons/Responce/AllResponces";
import DataFromAndToServer from "./Components/DataFromServer/DataFromAndToServer";
import ResponceFromServer from "./Components/QuestionButtons/Responce/ResponceFromServer";

class App extends Component {
  componentDidMount() {
    this.props.onAuthSignIn();
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route
              exact
              path="/GenerateLink/:id/:userId"
              component={DataFromGeneratedLink}
            />
            {!this.props.isAuth ? <Auth isSignUp={false} /> : null}
            {/* <Route
              exact
              path="/Auth"
              component={() => }
            /> */}

            {/* <Route exact path="/mainPage" component={MainPage} /> */}
            <Route exact path="/createPapers" component={CreateElement} />
            <Route
              exact
              path="/SeePapersAndResponce"
              component={AdminElement}
            />
            <Route
              exact
              path="/allResponces"
              component={() => <AllResponces userId={this.props.userId} />}
            />
            <Route
              exact
              path="/allPapers"
              component={() => (
                <AllQuestions
                  idToken={this.props.idToken}
                  userId={this.props.userId}
                />
              )}
            />
            <Route
              exact
              path="/perticularPaper/:id"
              component={DataFromAndToServer}
            />
            <Route
              exact
              path="/perticularResponce/:id"
              component={ResponceFromServer}
            />
            <Route
              exact
              path="/getAnswer"
              component={() => (
                <PaperCreatedSuccessfully
                  content="Answer is Recorded Successfully"
                  show={true}
                />
              )}
            />
            <Route
              exact
              path="/succfull"
              component={() => (
                <PaperCreatedSuccessfully content="Your Paper is Created Successfully" />
              )}
            />
            <Route path="/" component={MainPage} />
            <Route path="/mainPage" component={MainPage} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.reducer.idToken != null,
    isAuth: state.reducer.idToken !== null,
    Random_No: state.reducer.randomNo,
    idToken: state.reducer.idToken,
    userId: state.reducer.userId,
    RandomNo: state.reducer.randomNo,
  };
};

const mapDispathchToProps = (dispatch) => {
  return {
    onAuthSignIn: () => dispatch(actions.authCheckState()),
  };
};

export default connect(mapStateToProps, mapDispathchToProps)(App);
