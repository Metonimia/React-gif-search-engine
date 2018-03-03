import Search from "./search.js";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            searchingText: '',
            gif: {}
        };
    }

    handleSearch(searchingText) {
        this.setState({
          loading: true
        });
        this.getGif(searchingText)
            .then(response => {
                this.setState({
                    gif: response,
                    loading: false
                    });
            })
        .catch(error => console.error('Something went wrong', error));
    }

    // getGif(searchingText, callback) {
    //     const url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;
    //     const xhr = new XMLHttpRequest(); 
    //     xhr.open('GET', url);
    //     xhr.onload() {
    //         if (xhr.status === 200) {
    //            const data = JSON.parse(xhr.responseText).data;
    //             const gif = {  
    //                 url: data.fixed_width_downsampled_url,
    //                 sourceUrl: data.url
    //             };
    //             callback(gif);
    //         }
    //     };
    //     xhr.send();
    // },

    getGif(searchingText) {
        const url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;
        return new Promise(
            function(resolve, reject) {
                const request = new XMLHttpRequest(); 
                request.onload = function() {
                    if (this.status === 200) {
                        const data = JSON.parse(xhr.responseText).data;
                        const gif = {  
                            url: data.fixed_width_downsampled_url,
                            sourceUrl: data.url
                        };
                        resolve(gif);
                    } else {
                        reject(new Error(this.statusText));
                    };
                };
                request.onerror = function () {
                reject(new Error(
                   `XMLHttpRequest Error: ${this.statusText}`));
                };
                request.open('GET', url);
                request.send();
            });
    }

    render() {

        const divStyle = {
            margin: "0 auto",
            textAlign: "center",
            width: "90%"
        };

        return (
            <div style={divStyle}>
                <h1>Wyszukiwarka GIFow!</h1>
                <p>
                    Znajdź gifa na <a href="http://giphy.com">giphy</a>.
                    Naciskaj enter, aby pobrać kolejne gify.
                </p>
                <Search onSearch={this.handleSearch}/>
                <Gif
                    loading={this.state.loading}
                    url={this.state.gif.url}
                    sourceUrl={this.state.gif.sourceUrl}
                />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("app"));
