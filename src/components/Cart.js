import React from 'react';
import * as UI from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import '../style/cart.css';
import {goBack, goForward, setActivePanel, setItemData, setPhoneNumber, setName, setAddress} from '../redux/actions';
import {connect} from 'react-redux';
import {parse} from '../lib/yandex';

const mapStateToProps = state => {
    return {
        activePanel: state.activePanel,
        itemData: state.itemData,
        category: state.category,
        cart: state.cart,
        panelBack: state.panelBack,
        panelForward: state.panelForward,
        phoneNumber: state.phoneNumber,
        name: state.name,
        address: state.address,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setActivePanel: panel => dispatch(setActivePanel(panel)),
        setItemData: data => dispatch(setItemData(data)),
        goForward: () => dispatch(goForward()),
        goBack: () => dispatch(goBack()),
        setPhoneNumber: phoneNumber => dispatch(setPhoneNumber(phoneNumber)),
        setName: name => dispatch(setName(name)),
        setAddress: address => dispatch(setAddress(address)),
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

        let connect = this.props.connect;
        this.navigationListener = this.props.parent.navigationListener.bind(this);
        connect.subscribe(this.navigationListener);

        if (this.props.cart.length > 0) {
            let self = this;
            if (this.props.phoneNumber === null) {
                connect.subscribe((e) => {
                    e = e.detail;
                    if (e['type'] === 'VKWebAppGetPhoneNumberResult' && e['data']['phone_number'] !== null) {
                        self.props.setPhoneNumber(e['data']['phone_number']);
                    } else if (e['type'] === 'VKWebAppGetPhoneNumberFailed') {
                        self.props.setPhoneNumber('');
                    }
                });
                connect.send('VKWebAppGetPhoneNumber');
            }

            if (this.props.name === null) {
                connect.subscribe((e) => {
                    e = e.detail;
                    if (e['type'] === 'VKWebAppGetUserInfoResult') {
                        self.props.setName(e['data']['first_name'] + ' ' + e['data']['last_name']);
                    } else if (e['type'] === 'VKWebAppGetUserInfoFail') {
                        self.props.setName('');
                    }
                });
                connect.send('VKWebAppGetUserInfo');
            }

            if (this.props.address === null) {
                console.log('subscribe');
                connect.subscribe((e) => {
                    e = e.detail;
                    if (e['type'] === 'VKWebAppGeodataResult') {
                        self.props.setName(e['data']['first_name'] + ' ' + e['data']['last_name']);
                    } else if (e['type'] === 'VKWebAppGeodataFail') {
                        self.getAddress([e['data']['lat'], e['data']['long']]);
                    }
                });
                connect.send('VKWebAppGetGeodata');
            }
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.activePanel !== this.props.activePanel) {
            this.props.connect.unsubscribe(this.navigationListener);
        }
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

    getAddress(coords) {
        let self = this;
        window.ymaps.geocode(coords).then(function (res) {
            self.props.setAddress(res.geoObjects.get(0).getAddressLine());
        });
    }

    render() {
        let cart = this.props.cart;
        let self = this;

        return (
            <div>
                {cart.length > 0 ?
                    <div className='cart'>
                        <UI.Group>
                            <UI.Header className='group-header' level='1'>
                                <div className='group-title'>
                                    Корзина
                                </div>
                            </UI.Header>

                            <UI.List>
                                {
                                    cart.map(function (itemData) {
                                        return (
                                            <UI.ListItem>
                                                <div className='cart-item'>
                                                    <img className='cart-item-image' src={itemData.picture}/>
                                                    <div className='cart-item-info'>
                                                        <div className='cart-item-name'>{itemData.name === null ?
                                                            itemData.model : itemData.name}</div>
                                                        <div className='cart-item-options'>
                                                            <div className='cart-select-container'>
                                                                <select className='cart-select'>
                                                                    <option className='cart-select-option'>US 8 (RU
                                                                        40)
                                                                    </option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className='cart-item-price'>
                                                            <div
                                                                className='cart-item-price-current'>{itemData.price} {itemData.currencyId}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </UI.ListItem>
                                        )
                                    })
                                }
                            </UI.List>

                            <div className='cart-sum'>
                                {cart.length} товаров на сумму (без доставки) <div
                                className='cart-sum-value'>{this.state.sum} {this.state.currency}</div>
                            </div>
                        </UI.Group>

                        <UI.Group>
                            <UI.Pane>
                                <div className='cart-group-title'>Оформление заказа</div>
                                <div className='iteminfo-option'>Имя и фамилия</div>
                                <UI.FormLayout v="new">
                                    <UI.Input placeholder={self.props.name === null ? '' : self.props.name}/>
                                </UI.FormLayout>
                                <div className='iteminfo-option'>Мобильный телефон</div>
                                <UI.FormLayout v="new">
                                    <UI.Input
                                        placeholder={self.props.phoneNumber === null ? '' : self.props.phoneNumber}/>
                                </UI.FormLayout>
                            </UI.Pane>
                            <UI.Pane>
                                <div className='cart-group-title'>Доставка</div>
                                <div className='iteminfo-option'>Способ доставки</div>
                                {/*<div className='iteminfo-select-container'>*/}
                                {/*<select className='iteminfo-select'>*/}
                                {/*<option className='iteminfo-select-option'>Экспресс-доставка</option>*/}
                                {/*</select>*/}
                                {/*</div>*/}
                                <UI.FormLayout v="new">
                                    <UI.Select>
                                        <option>Экспресс-доставка</option>
                                    </UI.Select>
                                </UI.FormLayout>
                                <div className='iteminfo-option'>Адрес доставки</div>
                                <UI.FormLayout v="new">
                                    <UI.Input/>
                                </UI.FormLayout>
                                <div className='iteminfo-option'>Почтовый индекс</div>
                                <UI.FormLayout v="new">
                                    <UI.Input/>
                                </UI.FormLayout>
                            </UI.Pane>
                            <UI.Pane>
                                <div className='cart-group-title'>Оплата</div>
                                <div className='iteminfo-option'>Способ оплаты</div>
                                <UI.FormLayout v="new">
                                    <UI.Select>
                                        <option>VK Pay</option>
                                    </UI.Select>
                                </UI.FormLayout>
                                {/*<div className='checkbox-container'>*/}
                                {/*<input type='checkbox' className='checkbox' checked='checked' />*/}
                                {/*<div className='checkbox-text'>У меня есть промокод на скидку</div>*/}
                                {/*</div>*/}

                                {/*<label className="container">One*/}
                                {/*<input type="checkbox" checked="checked" />*/}
                                {/*<span className="checkmark"/>*/}
                                {/*</label>*/}
                                <div className='checkbox-wrapper'>
                                    <UI.List>
                                        <UI.ListItem asideContent={<UI.Switch/>}>
                                            <div className='checkbox-text'>У меня есть промокод на скидку</div>
                                        </UI.ListItem>
                                    </UI.List>
                                </div>
                                {/*<div className='checkbox-container'>*/}
                                {/*<div className='checkbox-text-container'>*/}
                                {/*<div className='checkbox-text'>У меня есть промокод на скидку</div>*/}
                                {/*</div>*/}
                                {/*<UI.Switch className='checkbox'/>*/}
                                {/*</div>*/}
                            </UI.Pane>
                        </UI.Group>

                        <div id='cart-button-item' className='cart-button-container-item'>
                            <UI.Button appearance='vk-rich' className='cart-button-item'
                                       onClick={() => {
                                           this.openNotifyDialog();
                                       }}>Оформить заказ</UI.Button>
                        </div>
                    </div> :
                    <div className='hint'>Корзина пуста</div>
                }
            </div>
        )
    }
}

const Cart = connect(mapStateToProps, mapDispatchToProps)(ConnectedCart);

export default Cart;

