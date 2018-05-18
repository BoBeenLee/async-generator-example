import React from "react";
import { render } from "react-dom";
import { Scrollbars } from "react-custom-scrollbars";
import PictureList from "./PictureList";
import _ from "lodash";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

class App extends React.Component {
  state = {
    page: 0
  };

  onScrollFrame = values => {
    const { top, scrollTop, clientHeight } = values;
    const { page } = this.state;
    if (page !== 0 && top <= 0) {
      this.prevPage();
    }
    if (top >= 1) {
      this.nextPage();
    }
  };

  prevPage = _.throttle(() => {
    const { page } = this.state;
    if (page === 0) {
      return;
    }
    this.setState(prevState => {
      return {
        page: prevState.page - 1
      };
    }, _.partial(this.moveToHalf, true));
  }, 1000);

  nextPage = _.throttle(() => {
    this.setState(prevState => {
      return {
        page: prevState.page + 1
      };
    }, this.moveToHalf);
  }, 1000);

  moveToHalf = isPrev => {
    const scrollHeight = this.refs.scrollbars.getScrollHeight();
    const scrollTop = this.refs.scrollbars.getScrollTop();

    console.log(scrollHeight, scrollTop);
    this.refs.scrollbars.scrollTop(
      isPrev
        ? scrollHeight * 0.75
        : scrollHeight * 0.25 + scrollHeight - scrollTop
    );
  };

  render() {
    return (
      <React.Fragment>
        <Scrollbars
          ref="scrollbars"
          onScrollFrame={this.onScrollFrame}
          style={{ width: 500, height: 500 }}
        >
          <PictureList page={this.state.page} />
        </Scrollbars>
        <button onClick={this.moveToHalf}>Hello</button>
      </React.Fragment>
    );
  }
}

render(<App />, document.getElementById("root"));
