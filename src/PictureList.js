import _ from "lodash";
import React from "react";
import { flickrSearchByTag } from "./apis";

class PictureList extends React.Component {
  state = {
    hundredList: []
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { page } = nextProps;
    return {
      page
    };
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    const { page: prevPage } = prevProps;
    const { page } = this.props;

    if (prevPage !== page) {
      await this.searchByTag();
    }
  }

  async componentDidMount() {
    await this.searchByTag();
    console.log(this.state.hundredList);
  }

  searchByTag = async isPrev => {
    const { page } = this.state;
    const response = await flickrSearchByTag("cat", page);

    this.setState(prevState => ({
      hundredList: isPrev
        ? [
            ...response.photos.photo,
            ...this.getHalfArray(prevState.hundredList)
          ]
        : [
            ...this.getHalfArray(prevState.hundredList),
            ...response.photos.photo
          ]
    }));
  };

  getHalfArray = array => {
    if (array.length === 0) {
      return [];
    }
    return _.slice(array, array.length / 2 - 1);
  };

  render() {
    const { hundredList } = this.state;
    return (
      <div>
        <ul>
          {_.map(hundredList, (item, index) => (
            <li key={`${item.id}${index}`}>{item.title}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default PictureList;
