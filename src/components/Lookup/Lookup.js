import React, { Component, PropTypes } from 'react';
import { Input } from 'react-bootstrap';
import cx from 'classnames';
import connectToStores from 'alt-utils/lib/connectToStores';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Lookup.scss';
import LookupStore from '../../stores/LookupStore';

class Lookup extends Component {

    static propTypes = {
        className: PropTypes.string,
        lookupData: PropTypes.object.isRequired,
    };

    constructor() {
        super();

        this.onChange = this.onChange.bind(this);
    }

    onChange() {
        console.log(this.refs.year.getInputDOMNode().value);
    }

    static getStores() {
        return [LookupStore];
    }

    static getPropsFromStores() {
        const st = LookupStore.getState();
        return st;
    }

    displayYears() {
        if (this.props.lookupData && this.props.lookupData.availableYears) {
            return (
                <Input type="select" label="Select Year" ref="year" onChange={this.onChange} placeholder="Select Year">
                    <option value="">- Select Year -</option>
                    {this.props.lookupData.availableYears.map((y, i) =>
                        <option key={i}>{y}</option>)}
                </Input>
            );
        }

        return [];
    }

    render() {
        return (
            <div className={cx(s.root, this.props.className)} role="navigation">
                {this.displayYears()}
            </div>
        );
    }

}

export default withStyles(connectToStores(Lookup), s);
