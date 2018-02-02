App = React.createClass({
    render: function() {

        var styles = {
            margin: '0 auto',
            textAlign: 'center',
            width: '90%'
        };

        getInitialState() {
            return {
                loading: false,
                searchingText: '',
                gif: {}
            };
        },

        handleSearch: function(searchingText) {  
          this.setState({
            loading: true  
          });
          this.getGif(searchingText, function(gif) {  
            this.setState({ 
              loading: false, 
              gif: gif, 
              searchingText: searchingText 
            });
          }.bind(this));
        },

        getGif: function(searchingText, callback) {  
            var url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;
            var xhr = new XMLHttpRequest();  
            xhr.open('GET', url);
            xhr.onload = function() {
                if (xhr.status === 200) {
                   var data = JSON.parse(xhr.responseText).data; 
                    var gif = {  
                        url: data.fixed_width_downsampled_url,
                        sourceUrl: data.url
                    };
                    callback(gif);
                }
            };
            xhr.send();
        },


        getGif: function(url) {
            return new Promise(
                function (searchingText, callback) {
                    const url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;
                    const xhr = new XMLHttpRequest();  
                    xhr.onload = function () {
                        if (this.status === 200) {
                            resolve(this.response);
                        } else {
                            reject(this.error);
                        }
                    };
                    xhr.open('GET', url);
                    xhr.send();
                });
        }

        getGif(GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText)
            .then(response => var data = JSON.parse(xhr.responseText).data; 
                            var gif = {  
                            url: data.fixed_width_downsampled_url,
                            sourceUrl: data.url
                    });
            .catch(error => console.log("Something went wrong"));

        return (
          <div style={styles}>
                <h1>Wyszukiwarka GIFow!</h1>
                <p>Znajdź gifa na <a href='http://giphy.com'>giphy</a>. Naciskaj enter, aby pobrać kolejne gify.</p>
                <Search onSearch={this.handleSearch}/>
            <Gif
                loading={this.state.loading}
                url={this.state.gif.url}
                sourceUrl={this.state.gif.sourceUrl}
            />
          </div>
        );
    }
});




function httpGet(url) {
    return new Promise(
        function (resolve, reject) {
            const request = new XMLHttpRequest();
            request.onload = function () {
                if (this.status === 200) {
                    resolve(this.response); // Sukces
                } else {
                    reject(new Error(this.statusText)); // Dostaliśmy odpowiedź, ale jest to np 404
                }
            };
            request.onerror = function () {
                reject(new Error(
                   `XMLHttpRequest Error: ${this.statusText}`));
            };
            request.open('GET', url);
            request.send();
        });
}
