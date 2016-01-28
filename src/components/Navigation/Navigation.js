import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import connectToStores from 'alt-utils/lib/connectToStores';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Navigation.scss';
import Link from '../Link';
import CategoryStore from '../../stores/CategoryStore';

class Navigation extends Component {

    static propTypes = {
        className: PropTypes.string,
        categories: PropTypes.array.isRequired,
    };

    static getStores() {
        return [CategoryStore];
    }

    static getPropsFromStores() {
        const st = CategoryStore.getState();
        return st;
    }

    showCategories() {
        const categories = [];
        if (this.props.categories && this.props.categories.length > 0) {
            this.props.categories.map((cat, i) => {
                const link = `/category/${cat.title}`;
                categories.push(<Link key={i} className={s.link} to={link}>{cat.title}</Link>);
            });
        }

        return categories;
    }

    render() {
        return (
            <div className={cx(s.root, this.props.className)} role="navigation">
                {this.showCategories()}
            </div>
        );
    }

}

export default withStyles(connectToStores(Navigation), s);
