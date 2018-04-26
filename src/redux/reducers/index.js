import { SET_ACTIVE_PANEL } from "../constants/action-types";
import { SET_ITEM_DATA } from "../constants/action-types";
import { SET_CATEGORY_INDEX } from "../constants/action-types";
import { SET_CATEGORY } from "../constants/action-types";
import { ADD_TO_CART } from "../constants/action-types";

const initialState = {
    activePanel: 'Main',
    itemData: null,
    categoryIndex: 0,
    category: null,
    cart: [],
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
        default:
            return state;
    }
};

export default rootReducer;