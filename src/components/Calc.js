import React, { Component } from 'react';
import '../calc.css';
import RealmsList from './Realms';
import Reputation from './Reputations';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import blue from '@material-ui/core/colors/blue';
//Multi Select Code: Reputation Types to Hide: <Select options={this.state.options} isMulti onChange={e=>console.log(e)}/>

const theme = createMuiTheme({
    palette: {
      primary: { main: purple[700] },
      secondary: { main: blue[700] },
    },
});

class Calc extends Component {
    constructor(props) {
        super(props);
        this.setRealmState = this.setRealmState.bind(this);
        this.setHistory = this.setHistory.bind(this);
        this.setRegionState = this.setRegionState.bind(this);
        this.showReputations = this.showReputations.bind(this);
        this.setThumbnail = this.setThumbnail.bind(this);
        this.setName = this.setName.bind(this);
        this.setRealm = this.setRealm.bind(this);
        this.setCompletedCount = this.setCompletedCount.bind(this);
        this.showSearch = this.showSearch.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.enterPressed = this.enterPressed.bind(this);
        this.state = {
            isSubmitted: false,
            isCompleted: false,
            showSearch: true,
            thumbnail: "",
            formattedName: "",
            formattedRealm: "",
            submittedRegion: "",
            submittedRealm: "",
            submittedName: "",
            completedCount: 0
        }
    }

    componentDidMount() {
        if(this.props.match.params.name) {
            this.setState({submittedName:this.props.match.params.name, submittedRealm:this.props.match.params.realm, submittedRegion:this.props.match.params.region, submittedisChecked:this.state.isChecked, isSubmitted:true,showSearch:false});
        }
    }

    setHistory(a) {
        this.props.history.push(a);
    }

    setRealmState(a) {
        this.setState({realm: a});
    }

    setRegionState(b) {
        this.setState({region: b});
    }

    setThumbnail(url) {
        this.setState({thumbnail:url});
    }

    setName(name) {
        this.setState({formattedName:name});
    }

    setRealm(name) {
        this.setState({formattedRealm:name});
    }

    setCompletedCount(number) {
        this.setState({completedCount:number});
    }

    showReputations(e) {
        //console.log("Submitted");
        this.setState({isSubmitted:true, showSearch:false})
        this.setState({submittedName:this.state.name, submittedRealm:this.state.realm, submittedRegion:this.state.region, isCompleted:this.state.completed, });
        this.setHistory('/'+this.state.region+'/'+this.state.realm+'/'+this.state.name);
    }

    showSearch(e) {
        this.setState((prevState => ({
            showSearch: !prevState.showSearch
        })))
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };

    enterPressed(event) {
        var code = event.keyCode || event.which;
        if(code === 13) { //13 is the enter keycode
            this.showReputations();
        }
    }

    render() {
        let style = {};
        if(this.state.isSubmitted) {
            style.height = 0;
        }

        return (
            <div className="calc" id="calc">
                <Paper>
                    <MuiThemeProvider theme={theme}>
                        <div id="buttonDiv">
                            {this.state.isSubmitted && <Button variant="contained" id="inputButton" onClick={this.showSearch}>New Character Search</Button> }
                        </div>

                                <div className="user-input-wrapper" onKeyPress={this.enterPressed}>
                                    <Collapse in={this.state.showSearch} style={{style}} className="input-wrapper-collapse">
                                    <Paper className={`user-input-box ${this.state.isSubmitted ? "" : "popout"} `}>
                                    <div id="selectionBoxes">
                                        <RealmsList realmSelection={this.setRealmState} regionSelection={this.setRegionState} history={this.setHistory} />
                                        <div id="name">
                                        <TextField id="characterName" label="Character Name" variant="outlined" required={true} onChange={e=>this.setState({name:e.target.value})} fullWidth/>
                                        </div>
                                    </div>
                                    <div id="hiddenTypes">
                                        <FormControlLabel control={ <Checkbox checked={this.state.completed} onChange={this.handleChange('completed')} value="completed" /> } label="Hide Completed Reputations" />
                                    </div>
                                    <Button variant="contained" id="submitButton" onClick={this.showReputations} >Submit</Button>
                                    </Paper>
                                </Collapse>
                                </div>

                        <Card className={`characterCard ${this.state.isSubmitted ? "" : "hidden"}`}>
                            <CardContent>
                                <Typography component="h2" variant="headline">{this.state.formattedName}</Typography>
                                <Typography variant="subheading" color="textSecondary">
                                {this.state.formattedRealm}
                                </Typography>
                                <Typography variant="subheading" color="textSecondary">
                                {this.state.completedCount && this.state.completedCount + " Completed Reputations"}
                                </Typography>
                            </CardContent>
                            {this.state.thumbnail && <Avatar alt="character thumbnail" src={['https://render-us.worldofwarcraft.com/character/',this.state.thumbnail].join('')} />}
                        </Card>
                        {this.state.submittedName && this.state.submittedRealm && <Reputation name={this.state.submittedName} realm={this.state.submittedRealm} region={this.state.submittedRegion} completed={this.state.isCompleted} setThumbnail={this.setThumbnail} setName={this.setName} setRealm={this.setRealm} setCompletedCount={this.setCompletedCount} />}
                    </MuiThemeProvider>
                </Paper>
            </div>
    );}


}

export default Calc;
