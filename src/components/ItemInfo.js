import React from 'react';
import * as UI from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import '../style/iteminfo.css';
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import {setActivePanel, addToCart, goBack, goForward} from "../redux/actions";
import {connect} from "react-redux";
import {colors} from "@vkontakte/vkui/dist/vkui";

const mapStateToProps = state => {
    console.log(state);
    return {
        activePanel: state.activePanel,
        itemData: state.itemData,
        panelBack: state.panelBack,
        panelForward: state.panelForward,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setActivePanel: panel => dispatch(setActivePanel(panel)),
        addToCart: item => dispatch(addToCart(item)),
        goForward: () => dispatch(goForward()),
        goBack: () => dispatch(goBack()),
    };
};

class ConnectedItemInfo extends React.Component {
    constructor(props) {
        super(props);

        this.navigationListener = this.props.parent.navigationListener.bind(this);
        this.props.connect.subscribe(this.navigationListener);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.activePanel !== this.props.activePanel) {
            this.props.connect.unsubscribe(this.navigationListener);
        }
    }

    render() {
        let itemData = this.props.itemData;

        return (
            <div className='iteminfo-container'>
                <div className='iteminfo-info-container'>
                    <UI.Group>
                        <UI.Gallery slideWidth='300px' style={{ height: 240 }} bullets="dark" className='gallery-wrap'>
                            {
                                <img className='iteminfo-gallery'
                                     src={itemData.picture}/>
                            }
                            {/*{*/}
                                {/*<img className='iteminfo-gallery'*/}
                                     {/*src="https://content.nike.com/content/dam/one-nike/en_us/Jordan/sp18/slp/desktop/0328-jordan-slp-p4-iridescent.jpg.transform/full-screen/0328-jordan-slp-p4-iridescent.jpg"/>*/}
                            {/*}*/}
                            {
                                <img className='iteminfo-gallery'
                                     src={itemData.picture}/>
                            }
                        </UI.Gallery>
                    </UI.Group>

                    {/*<div className='iteminfo-name'>Nike Free X Metcon</div>*/}
                    {/*<div className='iteminfo-price'>8 840 руб.</div>*/}
                    {/*<div className='iteminfo-description'>Мужские кроссовки для тренинга Nike Free X Metcon - это сочетание гибкости и легкости в каждом движении.</div>*/}
                    <div className='iteminfo-name'>{itemData.name === null ?
                        itemData.model : itemData.name}</div>
                    <div className='iteminfo-price'>{itemData.price} {itemData.currencyId}</div>
                    <div className='iteminfo-description'>{itemData.description}</div>


                    <div className='iteminfo-info'>
                        <div>Цвет модели: Atmosphere Grey</div>
                        <div>Модель: AH8141-004</div>
                        <div>Страна происхождения: Вьетнам</div>
                    </div>

                    <div className='iteminfo-option'>Размер</div>
                    <UI.FormLayout v="new">
                        <UI.Select>
                            <option>US 8 (RU 40)</option>
                        </UI.Select>
                    </UI.FormLayout>
                    {/*<div className='iteminfo-select-container'>*/}
                        {/*<select className='iteminfo-select'>*/}
                            {/*<option className='iteminfo-select-option'>US 8 (RU 40)</option>*/}
                        {/*</select>*/}
                    {/*</div>*/}

                    <div className='iteminfo-option'>Количество</div>
                    <UI.FormLayout v="new">
                        <UI.Select>
                            <option>2 пары</option>
                        </UI.Select>
                    </UI.FormLayout>
                    {/*<div className='iteminfo-select-container'>*/}
                        {/*<select className='iteminfo-select'>*/}
                            {/*<option className='iteminfo-select-option'>2 пары</option>*/}
                        {/*</select>*/}
                    {/*</div>*/}
                </div>

                <div id='cart-button-item' className='cart-button-container-item'>
                    <UI.Button appearance="vk-rich" className='cart-button-item'
                               onClick={() => {
                                    this.props.addToCart(itemData);
                               } }>Добавить в корзину</UI.Button>
                </div>
            </div>
        );
    }
}

const ItemInfo = connect(mapStateToProps, mapDispatchToProps)(ConnectedItemInfo);

export default ItemInfo;
