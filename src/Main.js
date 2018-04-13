import React from 'react';
import * as UI from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import './main.css';
import PropTypes from "prop-types";

import { colors } from '@vkontakte/vkui';

class Main extends React.Component {

    static propTypes = {
        categories: PropTypes.array,
    };

    constructor(props) {
        super(props);
        this.state = {
            categoryIndex: null,
        };

        let categories = this.props.categories;
        let categoryIndex = null;
        for (let index in categories) {
            if (categories.hasOwnProperty(index)) {
                categories[index]['key'] = index;
                if (categoryIndex === null || categoryIndex > index) {
                    categoryIndex = index;
                }
            }
        }

        this.state.categoryIndex = categoryIndex;
    }

    render() {
        let categories = this.props.categories;
        let self = this;

        return (
            <div className='main'>
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
                                 src="https://content.nike.com/content/dam/one-nike/en_us/Jordan/sp18/slp/desktop/0328-jordan-slp-p4-iridescent.jpg.transform/full-screen/0328-jordan-slp-p4-iridescent.jpg"/>
                            <div className='foryou-name'>Air Jordan XI LOW</div>
                            <div className='foryou-description'>Роскошная модель XI возвращается! При покупке</div>
                        </div>
                    }
                        <div className='gallery-container'>
                            <img className='foryou-image'
                                 src="https://content.nike.com/content/dam/one-nike/en_us/Jordan/sp18/slp/desktop/0328-jordan-slp-p4-iridescent.jpg.transform/full-screen/0328-jordan-slp-p4-iridescent.jpg"/>
                            <div className='foryou-name'>Air Jordan XI LOW</div>
                            <div className='foryou-description'>Роскошная модель XI возвращается! При покупке</div>
                        </div>
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
                            Популярное
                        </div>
                    </UI.Header>

                    <UI.Gallery slideWidth='150px' style={{ height: 245 }} className='gallery-wrap'>
                        <div className='gallery-container'>
                            <img className='popular-image'
                                 src="https://content.nike.com/content/dam/one-nike/en_us/Jordan/sp18/slp/desktop/0328-jordan-slp-p4-iridescent.jpg.transform/full-screen/0328-jordan-slp-p4-iridescent.jpg"/>
                            <div className='popular-name'>Особый случай</div>
                            <div className='popular-description'>Как выделиться из толпы</div>
                        </div>
                        <div className='gallery-container'>
                            <img className='popular-image'
                                 src="https://content.nike.com/content/dam/one-nike/en_us/Jordan/sp18/slp/desktop/0328-jordan-slp-p4-iridescent.jpg.transform/full-screen/0328-jordan-slp-p4-iridescent.jpg"/>
                            <div className='popular-name'>ASOS 4505</div>
                            <div className='popular-description'>Спортивная экипировка</div>
                        </div>
                        <div className='gallery-container'>
                            <img className='popular-image'
                                 src="https://content.nike.com/content/dam/one-nike/en_us/Jordan/sp18/slp/desktop/0328-jordan-slp-p4-iridescent.jpg.transform/full-screen/0328-jordan-slp-p4-iridescent.jpg"/>
                            <div className='popular-name'>Особый случай</div>
                            <div className='popular-description'>Как выделиться из толпы</div>
                        </div>
                        <div className='gallery-container'>
                            <img className='popular-image'
                                 src="https://content.nike.com/content/dam/one-nike/en_us/Jordan/sp18/slp/desktop/0328-jordan-slp-p4-iridescent.jpg.transform/full-screen/0328-jordan-slp-p4-iridescent.jpg"/>
                            <div className='popular-name'>Особый случай</div>
                            <div className='popular-description'>Как выделиться из толпы</div>
                        </div>
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
                        <div>
                            <img className='promo-image'
                                 src="https://content.nike.com/content/dam/one-nike/en_us/Jordan/sp18/slp/desktop/0328-jordan-slp-p4-iridescent.jpg.transform/full-screen/0328-jordan-slp-p4-iridescent.jpg"/>
                        </div>
                        <div>
                            <img className='promo-image'
                                 src="https://content.nike.com/content/dam/one-nike/en_us/Jordan/sp18/slp/desktop/0328-jordan-slp-p4-iridescent.jpg.transform/full-screen/0328-jordan-slp-p4-iridescent.jpg"/>
                        </div>
                        <div>
                            <img className='promo-image'
                                 src="https://content.nike.com/content/dam/one-nike/en_us/Jordan/sp18/slp/desktop/0328-jordan-slp-p4-iridescent.jpg.transform/full-screen/0328-jordan-slp-p4-iridescent.jpg"/>
                        </div>
                        <div>
                            <img className='promo-image'
                                src="https://content.nike.com/content/dam/one-nike/en_us/Jordan/sp18/slp/desktop/0328-jordan-slp-p4-iridescent.jpg.transform/full-screen/0328-jordan-slp-p4-iridescent.jpg"/>
                        </div>
                    </UI.Gallery>
                </UI.Group>

                <UI.Pane>
                    <div className='categories-container'>
                        {
                            categories.map(function(itemData) {
                                console.log(itemData.key);
                                return (
                                    <div className='category-main'
                                         style={
                                             {'background-color':
                                                     itemData.key === self.state.categoryIndex ? '#F2F6FA' : 'white'}}
                                        onClick={() => {setCategoryIndexself.state.categoryIndex = itemData.key;
                                                console.log(self.state.categoryIndex)}}>
                                        <div className='category-wrap' >
                                            <div className='category-text'>{itemData.name}</div>
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
                              onClick={ () => {} }>
                                Показать все
                            </span>
                    }>
                        <div className='group-title font'>
                            В спортивном стиле
                        </div>
                    </UI.Header>

                    <UI.List>
                        <UI.ListItem>
                            <div className='sport-item'>
                                <img className='sport-item-image' src="https://content.nike.com/content/dam/one-nike/en_us/Jordan/sp18/slp/desktop/0328-jordan-slp-p4-iridescent.jpg.transform/full-screen/0328-jordan-slp-p4-iridescent.jpg"/>
                                <div className='sport-item-info'>
                                    <div className='sport-item-name'>Nike Air Max 270 Flyknit</div>
                                    <div className='sport-item-description'>Мужская обувь</div>
                                    <div className='sport-item-price'>
                                        <div className='sport-item-price-current'>4 840 руб.</div>
                                        <div className='sport-item-price-old'>4 840 руб.</div>
                                    </div>
                                </div>
                            </div>
                        </UI.ListItem>
                        <UI.ListItem>
                            <div className='sport-item'>
                                <img className='sport-item-image' src="https://content.nike.com/content/dam/one-nike/en_us/Jordan/sp18/slp/desktop/0328-jordan-slp-p4-iridescent.jpg.transform/full-screen/0328-jordan-slp-p4-iridescent.jpg"/>
                                <div className='sport-item-info'>
                                    <div className='sport-item-name'>Nike Air Max 270 Flyknit</div>
                                    <div className='sport-item-description'>Мужская обувь</div>
                                    <div className='sport-item-price'>
                                        <div className='sport-item-price-current'>4 840 руб.</div>
                                    </div>
                                </div>
                            </div>
                        </UI.ListItem>
                    </UI.List>
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

                    <UI.Gallery slideWidth='300px' style={{ height: 205 }} className='gallery-wrap'>
                        {
                            <div className='gallery-container'>
                                <img className='foryou-image'
                                     src="https://content.nike.com/content/dam/one-nike/en_us/Jordan/sp18/slp/desktop/0328-jordan-slp-p4-iridescent.jpg.transform/full-screen/0328-jordan-slp-p4-iridescent.jpg"/>
                                <div className='foryou-name'>Air Jordan XI LOW</div>
                                <div className='foryou-description'>Роскошная модель XI возвращается! При покупке</div>
                            </div>
                        }
                        <div className='gallery-container'>
                            <img className='foryou-image'
                                 src="https://content.nike.com/content/dam/one-nike/en_us/Jordan/sp18/slp/desktop/0328-jordan-slp-p4-iridescent.jpg.transform/full-screen/0328-jordan-slp-p4-iridescent.jpg"/>
                            <div className='foryou-name'>Air Jordan XI LOW</div>
                            <div className='foryou-description'>Роскошная модель XI возвращается! При покупке</div>
                        </div>
                    </UI.Gallery>


                </UI.Group>
            </div>
        )
    }
}

export default Main;

