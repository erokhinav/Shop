import React from 'react';
import * as UI from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import '../style/main.css';
import PropTypes from "prop-types";
import { colors } from '@vkontakte/vkui';
import {setActivePanel, setItemData, setCategory, setCategoryIndex,
    addToCart, viewForward, goForward, goBack} from "../redux/actions";
import {connect} from "react-redux";

const mapStateToProps = state => {
    return {
        activePanel: state.activePanel,
        itemData: state.itemData,
        categoryIndex: state.categoryIndex,
        category: state.category,
        panelBack: state.panelBack,
        panelForward: state.panelForward,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setActivePanel: panel => dispatch(setActivePanel(panel)),
        setItemData: data => dispatch(setItemData(data)),
        setCategoryIndex: index => dispatch(setCategoryIndex(index)),
        setCategory: category => dispatch(setCategory(category)),
        addToCart: item => dispatch(addToCart(item)),
        viewForward: newView => dispatch(viewForward(newView)),
        goForward: () => dispatch(goForward()),
        goBack: () => dispatch(goBack()),
    };
};

class ConnectedMain extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            categoryPopular: {},
            categoryForyou: {},
            categorySpecial: {},
        };

        let category = this.props.mainCategories[this.props.categoryIndex];
        this.state.categoryPopular.offers = ConnectedMain.shuffle(category.offers.slice()).slice(0, 10);
        this.state.categoryForyou.offers = ConnectedMain.shuffle(category.offers.slice()).slice(0, 10);
        this.state.categoryForyou.formatted = ConnectedMain.formatForyou(this.state.categoryForyou.offers);
        this.state.categorySpecial.offers = ConnectedMain.shuffle(category.offers.slice()).slice(0, 3);
        this.state.categoryPopular.name = 'Популярное';
        this.state.categoryForyou.name = 'Подобрано для вас';
        this.state.categorySpecial.name = 'Специальное предложение';
    }

    static shuffle(array) {
        let currentIndex = array.length, temporaryValue, randomIndex;

        while (0 !== currentIndex) {

            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    static formatForyou(array) {
        let newArray = [];

        for (let ind = 0; ind < array.length; ind += 2) {
            newArray[ind / 2] = [array[ind], array[ind + 1]];
        }

        return newArray;
    }

    viewForward(panelName) {
        this.props.viewForward(panelName);
        this.props.connect.send('VKWebAppViewUpdateNavigationState', {"canBack": true, "canForward": false});
    }

    render() {
        let mainCategories = this.props.mainCategories;
        let categories = this.props.categories;
        let self = this;
        let offers = this.props.offers;
        let offersKeys = Object.keys(offers);
        let popular = {offers: [offers[offersKeys[300]], offers[offersKeys[297]], offers[offersKeys[323]], offers[offersKeys[27]]],
                        name: 'Популярное'};

        return (
            <div className='main'>
                    <UI.Gallery slideWidth='100%' align="left" style={{ height: '60vw' }} bullets="light" className='gallery-wrap'>
                        <img className='banner-image' src="https://pp.userapi.com/c824700/v824700840/14da65/q7P4C73ERDU.jpg"/>
                        <img className='banner-image' src="https://productcenter.ru/images/187730-ubtan-1280x768.jpg"/>
                        <img className='banner-image' src="https://shkolazhizni.ru/img/content/i104/104244_or.jpg"/>
                    </UI.Gallery>

                <UI.Group>
                    <UI.Header className='group-header' level='1' aside={
                        <span className='all-items'
                              style={{ color: colors.accentBlue }}
                              onClick={ () => {} }>
                                Показать все
                            </span>
                    }>
                        <div className='group-title font'>
                            Для вас
                        </div>
                    </UI.Header>

                    <UI.Gallery slideWidth='300px' style={{ height: 205 }} className='gallery-wrap'>
                    {
                        <div className='gallery-container'>
                                <img className='foryou-image'
                                    src="https://avatars.mds.yandex.net/get-pdb/28866/0a61c110-5024-40fd-a98c-3af1f1048943/s800"/>
                            <div className='gallery-item-name'>Попробуй новинку</div>
                            <div className='gallery-item-description'>Мыло из Германии</div>
                        </div>
                    }
                        <div className='gallery-container'>
                            <img className='foryou-image'
                                 src="https://www.passion.ru/imgs/2017/05/12/13/735426/72d63a4e3215f9d571830210bef72b54f3f286b1.jpg"/>
                            <div className='gallery-item-name'>Эфирные масла IRIS</div>
                            <div className='gallery-item-description'>Только натуральные ингредиенты</div>
                        </div>
                    </UI.Gallery>
                </UI.Group>

                <UI.Group>
                    <UI.Header className='group-header' level='1' aside={
                        <span className='all-items'
                              style={{ color: colors.accentBlue }}
                              onClick={ () => {
                                  self.props.setCategory(popular);
                                  self.viewForward('Category');
                              } }>
                                Показать все
                            </span>
                    }>
                        <div className='group-title font'>
                            Популярное
                        </div>
                    </UI.Header>

                    <UI.Gallery slideWidth='150px' style={{ height: 245 }} className='gallery-wrap'>
                        {
                            popular.offers.map(function(itemData) {
                                return (
                                    <div className='gallery-container' onClick={() => {
                                        self.props.setItemData(itemData);
                                        self.viewForward('ItemInfo');
                                    }}>
                                        <img className='popular-image'
                                             src={itemData.picture}/>
                                        <div className='popular-name'>{itemData.name === null ?
                                            itemData.model : itemData.name}</div>
                                        <div className='popular-description'>{itemData.description}</div>
                                    </div>
                                );
                            })
                        }
                    </UI.Gallery>
                </UI.Group>

                <UI.Group>
                    <UI.Header className='group-header' level='1' aside={
                        <span className='all-items'
                              style={{ color: colors.accentBlue }}
                              onClick={ () => {} }>
                                Показать все
                            </span>
                    }>
                        <div className='group-title font'>
                            Для вас
                        </div>
                    </UI.Header>

                    <UI.Gallery initialSlideIndex='1' align="center" slideWidth='300px' style={{ height: 193 }} className='gallery-wrap'>
                            <img className='promo-image'
                                 src="https://i.ytimg.com/vi/6vt5JuQfafo/maxresdefault.jpg"/>
                            <img className='promo-image'
                                 src="https://i.pinimg.com/originals/90/25/b4/9025b45604170aaa412f5759f3704203.jpg"/>
                            <img className='promo-image'
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRARIJcALP0vAJm1oTE1106ZTI7LRcYG3MuaGmNsli9VFbklL03bw"/>

                    </UI.Gallery>
                </UI.Group>

                <UI.Pane>
                    <div className='categories-container'>
                        {
                            mainCategories.map(function(itemData) {
                                return (
                                    <div className='category-main'
                                         style={
                                             {'backgroundColor':
                                                     itemData.key === self.props.categoryIndex ? '#E0E9F3' : 'white'}}
                                        onClick={() => {
                                            self.props.setCategoryIndex(itemData.key);
                                            self.props.setCategory(mainCategories[self.props.categoryIndex])
                                        }}>
                                        <div className='category-wrap' >
                                            <div className='category-text'>{itemData.name === null ?
                                                itemData.model : itemData.name}</div>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                </UI.Pane>

                <UI.Group>
                    <UI.Header className='group-header' level='1' aside={
                        <span className='all-items'
                              style={{ color: colors.accentBlue }}
                              onClick={ () => {
                                  self.viewForward('Category');
                              }}>
                                Показать все
                            </span>
                    }>
                        <div className='group-title font'>
                            {mainCategories[self.props.categoryIndex].name}
                        </div>
                    </UI.Header>

                    <UI.List>
                        {
                            mainCategories[self.props.categoryIndex].offers.slice(0, 4).map(function(itemData) {
                                return (
                                    <UI.ListItem onClick={() => {
                                        self.props.setItemData(itemData);
                                        self.viewForward('ItemInfo');
                                    }}>
                                        <div>
                                            <img className='category-main-image' src={itemData.picture}/>
                                            <div className='category-main-info'>
                                                <div className='category-main-name'>{itemData.name === null ?
                                                    itemData.model : itemData.name}</div>
                                                <div className='category-main-description'>{mainCategories[self.props.categoryIndex].name}</div>
                                                <div className='category-main-price'>
                                                    <div className='category-main-price-current'>{itemData.price} {itemData.currencyId}</div>
                                                    {itemData.oldprice === null ? null :
                                                        <div className='category-main-price-old'>{itemData.oldprice} {itemData.currencyId}</div>}
                                                </div>
                                            </div>
                                        </div>
                                    </UI.ListItem>
                                );
                            })
                        }
                    </UI.List>
                </UI.Group>

                <UI.Group>
                    <UI.Header className='group-header' level='1' aside={
                        <span className='all-items'
                              style={{ color: colors.accentBlue }}
                              onClick={ () => {
                                  self.props.setCategory(self.state.categoryPopular);
                                  self.viewForward('Category');
                              } }>
                                Показать все
                            </span>
                    }>
                        <div className='group-title font'>
                            {self.state.categoryPopular.name}
                        </div>
                    </UI.Header>

                    <UI.Gallery slideWidth='158px' style={{ height: 205 }} className='gallery-wrap'>
                        {
                            self.state.categoryPopular.offers.map(function(itemData) {
                                return (
                                    <div className='gallery-container' onClick={() => {
                                        self.props.setItemData(itemData);
                                        self.viewForward('ItemInfo');
                                    }}>
                                        <img className='category-popular-image' src={itemData.picture}/>
                                        <div className='gallery-item-name'>{itemData.name === null ?
                                            itemData.model : itemData.name}</div>
                                        <div className='gallery-item-description'>{itemData.description}</div>
                                    </div>
                                );
                            })
                        }
                    </UI.Gallery>
                </UI.Group>

                <UI.Group>
                    <UI.Header className='group-header' level='1' aside={
                        <span className='all-items'
                              style={{ color: colors.accentBlue }}
                              onClick={ () => {
                                  self.props.setCategory(self.state.categoryForyou);
                                  self.viewForward('Category');
                              } }>
                                Показать все
                            </span>
                    }>
                        <div className='group-title font'>
                            {self.state.categoryForyou.name}
                        </div>
                    </UI.Header>

                    <UI.Gallery slideWidth='330px' style={{ height: 220 }} className='gallery-wrap'>
                        {
                            self.state.categoryForyou.formatted.map(function(itemData) {
                                let item1 = itemData[0];
                                let item2 = itemData[1];
                                return (
                                    <UI.List>
                                        <UI.ListItem>
                                            <div onClick={() => {
                                                self.props.setItemData(item1);
                                                self.viewForward('ItemInfo');
                                            }}>
                                                <img className='category-main-image' src={item1.picture}/>
                                                <div className='category-main-info'>
                                                    <div className='category-main-name'>{item1.name === null ?
                                                        item1.model : item1.name}</div>
                                                    <div className='category-main-description'>{categories[item1.categoryId].text}</div>
                                                    <div className='category-main-price'>
                                                        <div className='category-main-price-current'>{item1.price} {item1.currencyId}</div>
                                                        {item1.oldprice === null ? null :
                                                            <div className='category-main-price-old'>{item1.oldprice} {item1.currencyId}</div>}
                                                    </div>
                                                </div>
                                            </div>
                                        </UI.ListItem>
                                        <UI.ListItem>
                                            <div onClick={() => {
                                                self.props.setItemData(itemData);
                                                self.viewForward('ItemInfo');
                                            }}>
                                                <img className='category-main-image' src={item2.picture}/>
                                                <div className='category-main-info'>
                                                    <div className='category-main-name'>{item2.name === null ?
                                                        item2.model : item2.name}</div>
                                                    <div className='category-main-description'>{categories[item2.categoryId].text}</div>
                                                    <div className='category-main-price'>
                                                        <div className='category-main-price-current'>{item2.price} {item2.currencyId}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </UI.ListItem>
                                    </UI.List>
                                );
                            })
                        }
                    </UI.Gallery>
                </UI.Group>

                <UI.Group>
                    <UI.Header className='group-header' level='1' aside={
                        <span className='all-items'
                              style={{ color: colors.accentBlue }}
                              onClick={ () => {
                                  self.props.setCategory(self.state.categorySpecial);
                                  self.viewForward('Category');
                              }
                              }>
                                Показать все
                            </span>
                    }>
                        <div className='group-title font'>
                            {self.state.categorySpecial.name}
                        </div>
                    </UI.Header>

                    <UI.List>
                        {
                            self.state.categorySpecial.offers.map(function(itemData) {
                                return (
                                    <UI.ListItem onClick={() => {
                                        self.props.setItemData(itemData);
                                        self.viewForward('ItemInfo');
                                    }}>
                                        <div>
                                            <img className='category-main-image' src={itemData.picture}/>
                                            <div className='category-main-info'>
                                                <div className='category-special-name'>{itemData.name === null ?
                                                    itemData.model : itemData.name}</div>
                                                <div className='category-special-price'>
                                                    <div className='category-main-price-current'>{itemData.price} {itemData.currencyId}</div>
                                                    {itemData.oldprice === null ? null :
                                                    <div className='category-main-price-old'>{itemData.oldprice} {itemData.currencyId}</div>}
                                                </div>
                                                <div className='add-to-cart'
                                                     onClick={ (e) => {
                                                         if (!e) var e = window.event;
                                                         e.cancelBubble = true;
                                                         if (e.stopPropagation) e.stopPropagation();
                                                         self.props.addToCart(itemData)
                                                     } }>
                                                    В корзину
                                                </div>
                                            </div>
                                        </div>
                                    </UI.ListItem>
                                );
                            })
                        }
                    </UI.List>
                </UI.Group>
            </div>
        )
    }
}

const Main = connect(mapStateToProps, mapDispatchToProps)(ConnectedMain);

export default Main;

