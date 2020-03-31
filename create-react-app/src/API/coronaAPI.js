import React, { Component} from 'react';
import Title from '../Title';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

const axios = require('axios').default;
const endpoint = 'http://rki-covid-api.now.sh/api/states';

export default class Corona extends React.Component{
    state = {data: ''}
    
    constructor(props) {
        super(props);
        this.state = { count: '',
                        difference: '',
                        city: props.children };
    }

    async componentDidMount() {
        const response = await fetch(endpoint);
        const json = await response.json();
        console.log(json);
        let states = json["states"];
        states.forEach(s => {
            if (s["name"] == this.state.city) {
                let cases = s["count"];
                let diff = s["difference"]
                this.setState({ count: cases,
                        difference: diff
                });
            }
        });
      }
    
    render(){
        return(
            <div>
                <Title>{this.state.city}</Title>
                {this.state.count} (+ {this.state.difference})
            </div>
        );
    }
}



