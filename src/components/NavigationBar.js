import React from 'react';
import * as UI from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import '../style/navigationbar.css';
import { colors } from '@vkontakte/vkui';
import IconChevron_back28 from '@vkontakte/vkui/dist/icons/28/chevron_back';
import IconReply_outline24 from '@vkontakte/vkui/dist/icons/24/reply_outline';
import Icon24Market from '@vkontakte/vkui/dist/icons/24/market';
import {connect} from "react-redux";
import {
    goBack, goForward, setActivePanel, setCategory, setCategoryIndex, setItemData,
    viewForward
} from "../redux/actions";

const mapStateToProps = state => {
    return {
        activePanel: state.activePanel,
        cart: state.cart,
        panelBack: state.panelBack,
        panelForward: state.panelForward,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setActivePanel: panel => dispatch(setActivePanel(panel)),
        viewForward: newView => dispatch(viewForward(newView)),
        goForward: () => dispatch(goForward()),
        goBack: () => dispatch(goBack()),
    };
};

class ConnectedNavigationBar extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let cart = this.props.cart;
        let self = this;
        let connect = this.props.connect;

        return (
            <div>
                <div className='header-pain'>
                    <UI.Pane>
                        <div className='select-box'>
                            <select className='select-city'>
                                <option>Москва</option>
                            </select>
                        </div>
                        {/*<UI.FormLayout v="new">*/}
                            {/*<UI.Select>*/}
                                {/*<option>Экспресс-доставка</option>*/}
                            {/*</UI.Select>*/}
                        {/*</UI.FormLayout>*/}
                        <div className='cart-button' onClick={() => {
                            // this.props.setActivePanel('Cart')
                            if (this.props.activePanel != 'Cart') {
                                self.props.viewForward('Cart');
                                connect.send('VKWebAppViewUpdateNavigationState', {canBack: true, canForward: false});
                            }
                        }
                        }>
                            <div className='cart-button-text'>{cart.length} товаров</div>
                            <Icon24Market fill={colors.captionGray} className='cart-button-icon'/>
                        </div>
                    </UI.Pane>
                </div>

                {/*<div className='bottom-pane'>*/}
                    {/*<UI.Pane className='footer'>*/}
                        {/*<div className='navigation'>*/}
                            {/*<IconChevron_back28 className='back-icon'*/}
                                                {/*fill={this.props.backView === undefined ?*/}
                                                    {/*colors.placeholderForeground : colors.accentBlue}/>*/}
                            {/*<IconChevron_back28 className='forward-icon'*/}
                                            {/*fill={colors.accentBlue}/>*/}
                        {/*</div>*/}
                        {/*<div className='share'>*/}
                            {/*<IconReply_outline24 className='share-icon'*/}
                                                {/*fill={colors.accentBlue}/>*/}
                        {/*</div>*/}
                    {/*</UI.Pane>*/}
                {/*</div>*/}
            </div>
        )
    }
}

const NavigationBar = connect(mapStateToProps, mapDispatchToProps)(ConnectedNavigationBar);

export default NavigationBar;

