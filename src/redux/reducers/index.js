import { SET_ACTIVE_PANEL } from "../constants/action-types";
import { SET_ITEM_DATA } from "../constants/action-types";
import { SET_CATEGORY_INDEX } from "../constants/action-types";
import { SET_CATEGORY } from "../constants/action-types";
import { ADD_TO_CART } from "../constants/action-types";
import { GO_BACK } from "../constants/action-types";
import { GO_FORWARD } from "../constants/action-types";
import { VIEW_FORWARD } from "../constants/action-types";
import { SET_PHONE_NUMBER } from "../constants/action-types";
import { SET_NAME } from "../constants/action-types";
import { SET_ADDRESS } from "../constants/action-types";

const initialState = {
    activePanel: 'Main',
    itemData: null,
    categoryIndex: 0,
    category: null,
    cart: [],
    panelBack: [],
    panelForward: [],
    phoneNumber: null,
    name: null,
    address: null,
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ACTIVE_PANEL:
        return { ...state,
                activePanel: action.payload };
        case SET_ITEM_DATA:
            return { ...state,
                itemData: action.payload };
        case SET_CATEGORY_INDEX:
            return { ...state,
                categoryIndex: action.payload };
        case SET_CATEGORY:
            return { ...state,
                category: action.payload };
        case ADD_TO_CART:
            if (state.cart.indexOf(action.payload) !== -1) return state;
            return { ...state,
                cart: [...state.cart, action.payload] };
        case GO_BACK:
            return { ...state,
                panelBack: state.panelBack.slice(0, -1),
                panelForward: [...state.panelForward, state.activePanel],
                activePanel: state.panelBack[state.panelBack.length - 1], };
        case GO_FORWARD:
            return { ...state,
                panelBack: [...state.panelBack, state.activePanel],
                panelForward: state.panelForward.slice(0, -1),
                activePanel: state.panelForward[state.panelForward.length - 1] };
        case VIEW_FORWARD:
            let newPanelBack = state.panelBack.slice();
            newPanelBack.push(state.activePanel);
            return { ...state,
                panelBack: newPanelBack,
                panelForward: [],
                activePanel: action.payload };
        case SET_PHONE_NUMBER:
            return { ...state,
                phoneNumber: action.payload };
        case SET_NAME:
            return { ...state,
                name: action.payload };
        case SET_ADDRESS:
            return { ...state,
                address: action.payload };
        default:
            return state;
    }
};

export default rootReducer;