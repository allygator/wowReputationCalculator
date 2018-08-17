import React, { Component } from 'react';
import Select from 'react-select';

class RealmList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            USrealms: [],
            EUrealms: [],
            selectedRealm: "",
            selectedOption: null
        };
        this.realmSelection = this.realmSelection.bind(this);
    }

    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
        this.props.realmSelection(selectedOption.value);
        //console.log(`Option selected:`, selectedOption.value);
    }

    componentDidMount() {
        if(this.props.specificRealm) {

        } else {
            fetch('https://us.api.battle.net/wow/realm/status?locale=en_US' + process.env.REACT_APP_blizzardKey)
                .then(response => response.json(),othererror => console.log(othererror))
                .then((realmList) => {
                    this.setState({
                        isLoaded: true,
                        USrealms: realmList.realms
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
            fetch('https://eu.api.battle.net/wow/realm/status?locale=en_GB' + process.env.REACT_APP_blizzardKey)
                .then(response => response.json(),othererror => console.log(othererror))
                .then((realmList) => {
                    this.setState({
                        isLoaded: true,
                        EUrealms: realmList.realms
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
                )
            }
    }

    realmSelection(option) {
        //console.log(event.target.value);
        this.props.setRealmState(option);
    }

    render() {
        const { error, isLoaded, USrealms, EUrealms } = this.state;
        var USOptions = [];
        var EUOptions = [];
        for(let realm of USrealms) {
            USOptions.push({value: realm.name,label: realm.name})
        }
        for(let realm of EUrealms) {
            EUOptions.push({value: realm.name,label: realm.name})
        }
        const { selectedOption } = this.state;
        const groupedOptions = [
            {
                label: 'US',
                options: USOptions
            },
            {
                label: 'EU',
                options: EUOptions
            }
        ];
        const groupStyles = {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottom: "1px solid grey"
        };
        const formatGroupLabel = data => (
          <div style={groupStyles}>
            <span>{data.label}</span>
          </div>
        );
        if (error) {
          return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
          return <div>Loading...</div>;
        } else {
            if(this.props.specificRealm) {
                return(
                    <Select
                        id="realmSelector"
                        value={selectedOption}
                        onChange={this.handleChange}
                        options={[{value: this.props.specificRealm, label:this.props.specificRealm}]} />
                )
            } else {
                return (
                    <Select id="realmSelector"
                      onChange={this.handleChange}
                      options={groupedOptions}
                      formatGroupLabel={formatGroupLabel} />
                );
            }
        }
    }
}

export default RealmList
