import React from 'react';
import * as UI from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import PropTypes from 'prop-types';
import '../style/category.css';
import {setActivePanel, setCategory, setItemData} from "../redux/actions";
import {connect} from "react-redux";

const mapStateToProps = state => {
    return {
        itemData: state.itemData,
        category: state.category,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setActivePanel: panel => dispatch(setActivePanel(panel)),
        setItemData: data => dispatch(setItemData(data)),
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
                                            self.props.setActivePanel('ItemInfo')}}>
                                        <div className='item-container'>
                                            <div className='item'>
                                                <img className='item-photo' src={itemData.picture}/>
                                                <div className='item-info'>
                                                    <div className='item-name'>{itemData.name}</div>
                                                    <div className='item-price'>{itemData.price} {itemData.currencyId}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        {/*<div className='item-wrap'>*/}
                            {/*<div className='item-container'>*/}
                                {/*<div className='item'>*/}
                                    {/*<img className='item-photo' src="https://content.nike.com/content/dam/one-nike/en_us/Jordan/sp18/slp/desktop/0328-jordan-slp-p4-iridescent.jpg.transform/full-screen/0328-jordan-slp-p4-iridescent.jpg"/>*/}
                                    {/*<div className='item-info'>*/}
                                        {/*<div className='item-name'>Nike Air Max 270 Flyknit</div>*/}
                                        {/*<div className='item-price'>8 800 руб.</div>*/}
                                    {/*</div>*/}
                                {/*</div>*/}
                            {/*</div>*/}
                        {/*</div>*/}
                        {/*<div className='item-wrap'>*/}
                            {/*<div className='item-container'>*/}
                                {/*<div className='item'>*/}
                                    {/*<img className='item-photo' src="https://content.nike.com/content/dam/one-nike/en_us/Jordan/sp18/slp/desktop/0328-jordan-slp-p4-iridescent.jpg.transform/full-screen/0328-jordan-slp-p4-iridescent.jpg"/>*/}
                                    {/*<div className='item-info'>*/}
                                        {/*<div className='item-name'>Nike Air Max 270 Flyknit</div>*/}
                                        {/*<div className='item-price'>8 800 руб.</div>*/}
                                    {/*</div>*/}
                                {/*</div>*/}
                            {/*</div>*/}
                        {/*</div>*/}
                    </div>
                </UI.List>
            </UI.Group>
        )
    }
}

const Category = connect(mapStateToProps, mapDispatchToProps)(ConnectedCategory);

export default Category;

