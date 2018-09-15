window.Lobby = React.createClass({
    propTypes: {
        gameSelected:   React.PropTypes.func,
        defaultGameID: React.PropTypes.string,
    },

    getInitialState: function() {
        return {
            newGameName: this.props.defaultGameID,
            selectedGame: null,
        };
    },

    newGameTextChange: function(e) {
        this.setState({newGameName: e.target.value});
    },

    newGameImagesLinkChange: function(e) {
        this.setState({newGameImagesLink: e.target.value});
    },

    handleNewGame: function(e) {
        e.preventDefault();
        if (!this.state.newGameName) {
            return;
        }

        let delimiter = "^";
        var params = this.state.newGameName;
        if (this.state.newGameImagesLink) {
            params += delimiter + this.state.newGameImagesLink;
        }
        $.post('/game/'+params, this.joinGame);
        this.setState({newGameName: ''});
        this.setState({newGameImagesLink: ''});
    },

    joinGame: function(g) {
        this.setState({selectedGame: g});
        if (this.props.gameSelected) {
            this.props.gameSelected(g);
        }
    },

    render: function() {
        return (
            <div id="lobby">
                <div id="available-games">
                    <form id="new-game">
                        <p className="intro">
                           Play Codenames Pictures online across multiple devices on a shared board.
                           To create a new game or join an existing
                           game, enter a game identifier and click 'GO'.
                        </p>
                        <input type="text" id="game-name" autoFocus
                            onChange={this.newGameTextChange} value={this.state.newGameName} />
                        <button onClick={this.handleNewGame}>Go</button>
                        <input type="text" id="user-images" placeholder="Link to folder of images..."
                            onChange={this.newGameImagesLinkChange} value={this.state.newGameImagesLink} />
                    </form>
                </div>
            </div>
        );
    }
});
