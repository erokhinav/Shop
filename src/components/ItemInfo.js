import React from 'react';
import * as UI from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import '../style/iteminfo.css';
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import {setActivePanel, addToCart, goBack, goForward} from "../redux/actions";
import {connect} from "react-redux";
import {colors} from "@vkontakte/vkui/dist/vkui";

const mapStateToProps = state => {
    // console.log(state);
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

    render() {
        let itemData = this.props.itemData;
        let self = this;

        return (
            <div className='iteminfo-container'>
                <div className='iteminfo-info-container'>
                    <UI.Group>
                        <UI.Gallery slideWidth='300px' style={{ height: 240 }} bullets="dark" className='gallery-wrap'>
                            {
                                <img className='iteminfo-gallery'
                                     src={itemData.picture}/>
                            }
                            {
                                <img className='iteminfo-gallery'
                                     src={itemData.picture}/>
                            }
                        </UI.Gallery>
                    </UI.Group>

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

                    <div className='iteminfo-option'>Количество</div>
                    <UI.FormLayout v="new">
                        <UI.Select>
                            <option>2 пары</option>
                        </UI.Select>
                    </UI.FormLayout>
                </div>

                <div id='cart-button-item' className='cart-button-container-item'>
                    <UI.Button appearance="vk-rich" className='cart-button-item'
                               onClick={() => {
                                    self.props.addToCart(itemData);
                               } }>Добавить в корзину</UI.Button>
                </div>
            </div>
        );
    }
}

const ItemInfo = connect(mapStateToProps, mapDispatchToProps)(ConnectedItemInfo);

export default ItemInfo;
