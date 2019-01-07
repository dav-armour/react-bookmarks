import React, { Component } from "react";
import BookmarkForm from "./../forms/BookmarkForm";
import LocalApi from "./../../apis/local";

class BookmarksPage extends Component {
  state = {
    bookmarks: []
  };

  componentDidMount() {
    this.getBookmarks();
  }

  getBookmarks = () => {
    LocalApi.get("/bookmarks")
      .then(response => {
        console.log(response.data);
        const bookmarks = response.data;
        this.setState({ bookmarks });
      })
      .catch(error => console.log(error));
  };

  onBookmarkFormSubmit = bookmarks => {
    this.setState({ bookmarks });
  };

  render() {
    return (
      <div>
        <h2>New Bookmark</h2>
        <BookmarkForm onBookmarkFormSubmit={this.onBookmarkFormSubmit} />
      </div>
    );
  }
}

export default BookmarksPage;
