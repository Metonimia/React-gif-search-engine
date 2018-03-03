Search = React.createClass({

  getInitialState() {
    return {
      searchingText: ""
    };
  },

  handleChange(event) {
    const searchingText = event.target.value;
    this.setState({ searchingText: searchingText });

    if (searchingText.length > 2) {
      this.props.onSearch(searchingText);
    }
  },

  handleKeyUp(event) {
    if (event.keyCode === 13) {
      this.props.onSearch(this.state.searchingText);
    }
  },

  render() {
    const divStyle = {
      fontSize: "1.5em",
      width: "90%",
      maxWidth: "350px"
    };

    return (
      <input
        style={divStyle}
        type="text"
        onChange={this.handleChange}
        onKeyUp={this.handleKeyUp}
        placeholder="Tutaj wpisz wyszukiwaną frazę"
        value={this.state.searchTerm}
      />
    );
  }
});
