import React from 'react';
import * as UI from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import PropTypes from 'prop-types';
import '../style/category.css';
import {goBack, goForward, setActivePanel, setItemData, viewForward} from "../redux/actions";
import {connect} from "react-redux";

const mapStateToProps = state => {
    return {
        activePanel: state.activePanel,
        itemData: state.itemData,
        category: state.category,
        panelBack: state.panelBack,
        panelForward: state.panelForward,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setActivePanel: panel => dispatch(setActivePanel(panel)),
        setItemData: data => dispatch(setItemData(data)),
        viewForward: newView => dispatch(viewForward(newView)),
        goForward: () => dispatch(goForward()),
        goBack: () => dispatch(goBack()),
    };
};

class ConnectedCategory extends React.Component {

    render() {
        let title = this.props.category.name;
        let items = this.props.category.offers;
        let size = items.length;
        let self = this;

        return (
            <UI.Group className='category'>
                <UI.Header className='group-header' level='1'>
                    <div className='group-title'>{title}</div>
                    <div className='group-title-count'>{size}</div>
                </UI.Header>

                <UI.List>
                    <div className='items-container'>
                        {
                            items.map(function(itemData) {
                                return (
                                    <div className='item-wrap' onClick={() => {
                                            self.props.setItemData(itemData);
                                            self.props.viewForward('ItemInfo');
                                            self.props.connect.send('VKWebAppViewUpdateNavigationState', {canBack: true, canForward: false});
                                    }}>
                                        <div className='item-container'>
                                            <div className='item'>
                                                <img className='item-photo' src={itemData.picture}/>
                                                <div className='item-info'>
                                                    <div className='item-name'>{itemData.name === null ?
                                                        itemData.model : itemData.name}</div>
                                                    <div className='item-price'>{itemData.price} {itemData.currencyId}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </UI.List>
            </UI.Group>
        )
    }
}

const Category = connect(mapStateToProps, mapDispatchToProps)(ConnectedCategory);

export default Category;

