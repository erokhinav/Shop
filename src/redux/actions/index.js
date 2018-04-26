import { SET_ACTIVE_PANEL } from "../constants/action-types";
import { SET_ITEM_DATA } from "../constants/action-types";
import { SET_CATEGORY_INDEX } from "../constants/action-types";
import { SET_CATEGORY } from "../constants/action-types";
import { ADD_TO_CART } from "../constants/action-types";

export const setActivePanel = panel => ({ type: SET_ACTIVE_PANEL, payload: panel });
export const setItemData = data => ({ type: SET_ITEM_DATA, payload: data });
export const setCategoryIndex = index => ({ type: SET_CATEGORY_INDEX, payload: index });
export const setCategory = category => ({ type: SET_CATEGORY, payload: category });
export const addToCart = item => ({ type: ADD_TO_CART, payload: item });