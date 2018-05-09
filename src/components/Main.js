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
        this.props.connect.send('VKWebAppViewUpdateNavigationState', {canBack: true, canForward: false});
    }

    render() {
        let mainCategories = this.props.mainCategories;
        let categories = this.props.categories;
        let self = this;
        let offers = this.props.offers;
        let offersKeys = Object.keys(offers);
        let popular = {offers: [offers[offersKeys[100]], offers[offersKeys[15]], offers[offersKeys[325]], offers[offersKeys[247]]],
                        name: 'Популярное'};

        return (
            <div className='main'>
                    <UI.Gallery slideWidth='100%' align="left" style={{ height: '60vw' }} bullets="light" className='gallery-wrap'>
                        <img className='banner-image' src="https://sun9-7.userapi.com/c840423/v840423615/80696/85IZK-KeoOc.jpg"/>
                        <img className='banner-image' src="https://pp.userapi.com/c844520/v844520489/35e73/Madv2qJ_Mww.jpg"/>
                        <img className='banner-image' src="https://pp.userapi.com/c845218/v845218489/35a39/H2I9jGOvxqE.jpg"/>
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
                                    src="https://pp.userapi.com/c847216/v847216002/30757/glikqebLHPg.jpg"/>
                            <div className='gallery-item-name'>Штанги из Германии</div>
                            <div className='gallery-item-description'>Удобство и комфорт в новом исполнении</div>
                        </div>
                    }
                        <div className='gallery-container'>
                            <img className='foryou-image'
                                 src="https://www.life-fitness.ru/pictures/articles/IM-009-13-HammerBanner-About_copy1.jpg"/>
                            <div className='gallery-item-name'>Тренажёры Hammer Strength</div>
                            <div className='gallery-item-description'>Один из мировых лидеров на рынке профессиональных силовых тренажёров</div>
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
                                 src="https://static1.squarespace.com/static/565bb3cbe4b0060cdb73f1c8/t/5784968bbebafb5680d6f2c8/1468307092696/The+Gym+banner.jpg?format=1500w"/>
                            <img className='promo-image'
                                 src="https://simplygym.co.uk/wp-content/uploads/2017/01/clubs-hero-banner.png"/>
                            <img className='promo-image'
                                 src="http://spingym.com.mx/wp-content/uploads/2014/02/Fotolia_64649337_L.jpg"/>
                            <img className='promo-image'
                                src="https://matrixfitness.co.za/wp-content/uploads/2015/04/Home-Page-Shop-Category-Banners-Specials2.png"/>

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
                                                     itemData.key === self.props.categoryIndex ? '#F2F6FA' : 'white'}}
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
                                                    <div className='category-main-price-old'>{itemData.oldprice === null ?
                                                        itemData.price : itemData.oldprice} {itemData.currencyId}</div>
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
                                                    <div className='category-main-name'>{item1.name}</div>
                                                    <div className='category-main-description'>{categories[item1.categoryId].text}</div>
                                                    <div className='category-main-price'>
                                                        <div className='category-main-price-current'>{item1.price} {item1.currencyId}</div>
                                                        <div className='category-main-price-old'>{item1.oldprice === null ?
                                                            item1.price : item1.oldprice} {item1.currencyId}</div>
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
                                                    <div className='category-main-name'>{item2.name}</div>
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
                                                    <div className='category-main-price-old'>{itemData.oldprice === null ?
                                                        itemData.price : itemData.oldprice} {itemData.currencyId}</div>
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

