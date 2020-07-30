class Team extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            shots: 0,
            score: 0
        }

        this.shotSound = new Audio('./bat+hit+ball.mp3')
        this.scoreSound = new Audio('./hitcrowdcheer.mp3')

    }

    shotHandler = () => {
        let score = this.state.score
        this.shotSound.play()

        if (Math.random() > 0.5) {
            score += 1
            this.scoreSound.play()
        }


        this.setState((state, props) => ({
            shots: state.shots + 1,
            score: score
        }))

    }

    render() {
        let shotPercentageDiv

        if (this.state.shots) {
            const shotPercentage = Math.round((this.state.score / this.state.shots) * 100)
            shotPercentageDiv = (
                <div>
                    <strong>Shooting %: {shotPercentage}</strong>
                </div>
            )
        }


        return (
            <div>
                <div className="Team">
                    <h2>{this.props.name}</h2>

                    <div className="identity">
                        <img src={this.props.logo} width="200px" alt={this.props.name} />
                    </div>

                    <div>
                        <strong>Shots:</strong> {this.state.shots}
                    </div>

                    <div>
                        <strong>Score:</strong> {this.state.score}
                    </div>

                    {shotPercentageDiv}

                    <button onClick={this.shotHandler}>Shoot!</button>


                </div>
            </div>
        )
    }
}


function Game(props) {
    return (
        <div className="Game">
            <h1>Welcome to {props.venue}</h1>
            <div className="stats">

                <Team
                    name={props.visitingTeam.name}
                    logo={props.visitingTeam.logoSrc}
                />

                <div className="versus">
                    <h1>VS</h1>
                </div>

                <Team
                    name={props.homeTeam.name}
                    logo={props.homeTeam.logoSrc}
                />
            </div>
        </div>
    )

}


// An App component under which all other components will be added
function App(props) {
    const avalanche = {
        name: "Colorado Avalanche",
        logoSrc: "https://www-league.nhlstatic.com/images/logos/teams-current-primary-dark/21.svg"
    }

    const wings = {
        name: "Detroit Red Wings",
        logoSrc: "https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/17.svg"

    }

    const islanders = {
        name: "New York Islanders",
        logoSrc: "https://nhl.bamcontent.com/images/assets/binary/316482732/binary-file/file.svg"
    }

    const senators = {
        name: "Ottawa Senators",
        logoSrc: "https://nhl.bamcontent.com/images/assets/binary/299813882/binary-file/file.svg"

    }


    return (
        <div className="App">
            <Game
                venue="the Pepsi Center"
                homeTeam={wings}
                visitingTeam={avalanche}
            />
            <Game
                venue="Bankers Life and Field Arena"
                homeTeam={islanders}
                visitingTeam={senators}
            />
        </div>
    )
}



// Render the App
ReactDOM.render(
    <App />,
    document.getElementById('root')
)