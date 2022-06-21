import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions';

const filter_reducer = (state, action) => {
  switch (action.type) {
    case LOAD_PRODUCTS:
      let maxPrice = action.payload.reduce(
        (total, item) => (item.price > total ? item.price : total),
        0
      );
      return {
        ...state,
        all_products: [...action.payload],
        filtered_products: [...action.payload],
        filters: {
          ...state.filters,
          max_price: maxPrice,
          price: maxPrice,
        },
      };

    case SET_GRIDVIEW:
      return {
        ...state,
        grid_view: true,
      };

    case SET_LISTVIEW:
      return {
        ...state,
        grid_view: false,
      };

    case UPDATE_SORT:
      return {
        ...state,
        sort: action.payload,
      };

    case SORT_PRODUCTS:
      const { sort, filtered_products } = state;
      let tempProducts = [...filtered_products];
      switch (sort) {
        case 'price-lowest':
          tempProducts = tempProducts.sort((a, b) => a.price - b.price);
          break;
        case 'price-highest':
          tempProducts = tempProducts.sort((a, b) => b.price - a.price);
          break;
        case 'name-a':
          tempProducts = tempProducts.sort((a, b) =>
            a.name.localeCompare(b.name)
          );
          break;
        case 'name-z':
          tempProducts = tempProducts.sort((a, b) =>
            b.name.localeCompare(a.name)
          );
          break;
        default:
          console.log('sort option not found');
      }
      return {
        ...state,
        filtered_products: tempProducts,
      };

    case UPDATE_FILTERS:
      const { name, value } = action.payload;
      return {
        ...state,
        filters: {
          ...state.filters,
          [name]: value,
        },
      };

    case FILTER_PRODUCTS:
      const { all_products } = state;
      const { text, category, company, color, price, shipping } = state.filters;
      let filterProducts = [...all_products];

      if (text) {
        filterProducts = filterProducts.filter((product) =>
          product.name.toLowerCase().startsWith(text)
        );
      }
      if (category !== 'all') {
        filterProducts = filterProducts.filter(
          (product) => product.category === category
        );
      }
      if (company !== 'all') {
        filterProducts = filterProducts.filter(
          (product) => product.company === company
        );
      }
      if (color !== 'all') {
        filterProducts = filterProducts.filter((product) =>
          product.colors.find((c) => c === color)
        );
      }
      if (price) {
        filterProducts = filterProducts.filter(
          (product) => product.price <= price
        );
      }
      if (shipping) {
        filterProducts = filterProducts.filter((product) => product.shipping);
      }

      return { ...state, filtered_products: filterProducts };

    case CLEAR_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          text: '',
          company: 'all',
          category: 'all',
          color: 'all',
          price: state.filters.max_price,
          shipping: false,
        },
      };

    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default filter_reducer;
