const GIPHY_LOADING_URL = 'http://www.ifmo.ru/images/loader.gif';

Gif = React.createClass ({

  getUrl () {
    return this.props.sourceUrl || GIPHY_LOADING_URL;
  },

  render() {
    const url = this.props.loading ? GIPHY_LOADING_URL : this.props.url;

    const divStyle = {
      minHeight: '310px',
      margin: '0.5em'
    };
    
    return (
      <div style={divStyle}>
        <a href={this.getUrl()} title='view this on giphy' target='new'>
          <img id='gif' src={url} style={{width: '100%', maxWidth: '350px'}}/>
        </a>
      </div>
    );
  }
})