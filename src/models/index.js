// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Product, CartProduct, Order, OrderProduct } = initSchema(schema);

export {
  Product,
  CartProduct,
  Order,
  OrderProduct
};