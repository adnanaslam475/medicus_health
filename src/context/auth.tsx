import React from "react";
import Router from "next/router";

const authenticatedRoute = (Component: any = null, options = {}) => {
  class AuthenticatedRoute extends React.Component {
    state = {
      userData: null,
      loading: true,
      authorized: false,
    };

    publicRoutes = ["/login"];

    componentDidMount() {
      const hideContent = () => this.setState({ authorized: false });
      Router.events.on("routeChangeStart", hideContent);

      this.setState({ loading: true });
      let userData: any;
      if (
        typeof window !== "undefined" &&
        localStorage?.getItem("loggedInUserData")
      ) {
        userData = JSON.parse(localStorage?.getItem("loggedInUserData") || "");
      }
      this.setState({ userData: userData?.access_token });
      if (
        this.publicRoutes.includes(Router.pathname) &&
        userData?.access_token
      ) {
        Router.push("/");
        this.setState({ loading: false });
        this.setState({ authorized: true });
      } else if (!userData?.access_token) {
        Router.push("/login");
      this.setState({ authorized: true });
        this.setState({ loading: false });
      } else {
        this.setState({ loading: false });
      }

      Router.events.off("routeChangeStart", hideContent);
    }

    render() {
      return this.state.loading ? (
        <div>loading</div>
      ) : (
        this.state.authorized && <Component {...this.props} />
      );
    }
  }
  return AuthenticatedRoute;
};

export default authenticatedRoute;
