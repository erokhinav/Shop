import React from 'react';
import * as UI from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import '../style/cart.css';
import {setActivePanel, setCategory, setItemData} from "../redux/actions";
import {connect} from "react-redux";
import {parse} from "../lib/yandex";

const mapStateToProps = state => {
    return {
        itemData: state.itemData,
        category: state.category,
        cart: state.cart,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setActivePanel: panel => dispatch(setActivePanel(panel)),
        setItemData: data => dispatch(setItemData(data)),
    };
};

class ConnectedCart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sum: 0,
            currency: '',
        };

        let sum = 0;
        let currency = '';
        let cart = this.props.cart;
        for (let index in cart) {
            sum += parseInt(cart[index].price);
            currency = cart[index].currencyId;
        }

        this.state.sum = sum;
        this.state.currency = currency;
    }

    openNotifyDialog() {
        let self = this;
        let parent = this.props.parent;
        parent.setState({ popout:
                <UI.Alert
                    actions={[{
                        title: 'OK',
                        autoclose: true,
                        style: 'destructive'
                    }]}
                    onClose={ () => {
                        parent.setState({popout: null}, () => {
                            self.props.setActivePanel('Main'); }
                        )}
                    }
                >
                    <h2>Заказ оформлен</h2>
                    <p>Ожидайте сообщения о подтверждении заказа.</p>
                </UI.Alert>
        });
    }

    render() {
        let cart = this.props.cart;

        return (
            <div className='cart'>
                <UI.Group>
                    <UI.Header className='group-header' level='1'>
                        <div className='group-title'>
                            Корзина
                        </div>
                    </UI.Header>

                    <UI.List>
                        {
                            cart.map(function(itemData) {
                                return (
                                    <UI.ListItem>
                                        <div className='cart-item'>
                                            <img className='cart-item-image' src={itemData.picture}/>
                                            <div className='cart-item-info'>
                                                <div className='cart-item-name'>{itemData.name}</div>
                                                <div className='cart-item-options'>
                                                    <div className='cart-select-container'>
                                                        <select className='cart-select'>
                                                            <option className='cart-select-option'>US 8 (RU 40)</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className='cart-item-price'>
                                                    <div className='cart-item-price-current'>{itemData.price} {itemData.currencyId}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </UI.ListItem>
                                )
                            })
                        }
                        {/*<UI.ListItem>*/}
                            {/*<div className='cart-item'>*/}
                                {/*<img className='cart-item-image' src="https://content.nike.com/content/dam/one-nike/en_us/Jordan/sp18/slp/desktop/0328-jordan-slp-p4-iridescent.jpg.transform/full-screen/0328-jordan-slp-p4-iridescent.jpg"/>*/}
                                {/*<div className='cart-item-info'>*/}
                                    {/*<div className='cart-item-name'>Nike Air Max 270 Flyknit</div>*/}
                                    {/*<div className='cart-item-options'>*/}
                                        {/*<div className='cart-select-container'>*/}
                                            {/*<select className='cart-select'>*/}
                                                {/*<option className='cart-select-option'>M</option>*/}
                                            {/*</select>*/}
                                        {/*</div>*/}
                                        {/*<div className='cart-select-container'>*/}
                                            {/*<select className='cart-select'>*/}
                                                {/*<option className='cart-select-option'>2 пары</option>*/}
                                            {/*</select>*/}
                                        {/*</div>*/}
                                    {/*</div>*/}
                                    {/*<div className='cart-item-price'>*/}
                                        {/*<div className='cart-item-price-current'>4 840 руб.</div>*/}
                                    {/*</div>*/}
                                {/*</div>*/}
                            {/*</div>*/}
                        {/*</UI.ListItem>*/}
                    </UI.List>

                    <div className='cart-sum'>
                        {cart.length} товаров на сумму (без доставки) <div className='cart-sum-value'>{this.state.sum} {this.state.currency}</div>
                    </div>
                </UI.Group>

                <div id='cart-button-item' className='cart-button-container-item'>
                    <UI.Button appearance="vk-rich" className='cart-button-item'
                               onClick={() => {
                                   this.openNotifyDialog();
                               }}>Оформить заказ</UI.Button>
                </div>
            </div>
        )
    }
}

const Cart = connect(mapStateToProps, mapDispatchToProps)(ConnectedCart);

export default Cart;
