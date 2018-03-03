class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchingText: ''
    };
  }

  handleChange(event) {
    const searchingText = event.target.value;
    this.setState({searchingText: searchingText});
        
    if (searchingText.length > 2) {
      this.props.onSearch(searchingText);
    }
  }
  
  handleKeyUp(event) {
    if (event.keyCode === 13) {
      this.props.onSearch(this.state.searchingText);
    }
  }

  
  // const divStyle = {
  //   fontSize: '1.5em',
  //   width: '90%',
  //   maxWidth: '350px'
  // };

  render () {
    return  (
      <input style={divStyle}
        type="text"
        onChange={this.handleChange}
        onKeyUp={this.handleKeyUp}
        placeholder="Tutaj wpisz wyszukiwaną frazę"
        style={styles}
        value={this.state.searchTerm}
      />
    );
  }
}
