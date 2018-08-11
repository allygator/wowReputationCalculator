import React, { Component } from 'react';
import Select from 'react-select';

class RealmList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            realms: [],
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
        fetch('https://us.api.battle.net/wow/realm/status?locale=en_US' + process.env.blizzardKey)
            .then(response => response.json(),othererror => console.log(othererror))
            .then((realmList) => {
                this.setState({
                    isLoaded: true,
                    realms: realmList.realms
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

    realmSelection(option) {
        //console.log(event.target.value);
        this.props.setRealmState(option);
    }

    render() {
        const { error, isLoaded, realms } = this.state;
        const { selectedOption } = this.state;
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
                        options={[{value: this.props.specificRealm, label:this.props.specificRealm}]}
                    />
                )
            }
          return (
              <Select id="realmSelector"
                value={selectedOption}
                onChange={this.handleChange}
                options={realms.map(
                    function(realm) {
                      return {
                        value: realm.name,
                        label: realm.name
                      };
                    }
                  )
              } />

            /*<select id="realmSelector" onChange={this.realmSelection}>
              /*{realms.map((realm) => (
                <option key={realm.name}>{realm.name}
                </option>
            ))}
            </select>*/
          );
        }
    }
}

export default RealmList
