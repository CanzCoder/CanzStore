import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface AddNewWishlistItemData {
  wishlistItem_insert: WishlistItem_Key;
}

export interface AddNewWishlistItemVariables {
  productId: UUIDString;
  shopperId: UUIDString;
}

export interface Category_Key {
  id: UUIDString;
  __typename?: 'Category_Key';
}

export interface GetStoreByIdData {
  store?: {
    id: UUIDString;
    name: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    phoneNumber?: string | null;
  } & Store_Key;
}

export interface GetStoreByIdVariables {
  id: UUIDString;
}

export interface ListProductsByCategoryData {
  products: ({
    id: UUIDString;
    name: string;
    description?: string | null;
    price: number;
    imageUrl?: string | null;
  } & Product_Key)[];
}

export interface ListProductsByCategoryVariables {
  categoryId: UUIDString;
}

export interface Product_Key {
  id: UUIDString;
  __typename?: 'Product_Key';
}

export interface Store_Key {
  id: UUIDString;
  __typename?: 'Store_Key';
}

export interface UpdateProductPriceData {
  product_update?: Product_Key | null;
}

export interface UpdateProductPriceVariables {
  id: UUIDString;
  price: number;
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

export interface WishlistItem_Key {
  id: UUIDString;
  __typename?: 'WishlistItem_Key';
}

interface AddNewWishlistItemRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddNewWishlistItemVariables): MutationRef<AddNewWishlistItemData, AddNewWishlistItemVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AddNewWishlistItemVariables): MutationRef<AddNewWishlistItemData, AddNewWishlistItemVariables>;
  operationName: string;
}
export const addNewWishlistItemRef: AddNewWishlistItemRef;

export function addNewWishlistItem(vars: AddNewWishlistItemVariables): MutationPromise<AddNewWishlistItemData, AddNewWishlistItemVariables>;
export function addNewWishlistItem(dc: DataConnect, vars: AddNewWishlistItemVariables): MutationPromise<AddNewWishlistItemData, AddNewWishlistItemVariables>;

interface ListProductsByCategoryRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListProductsByCategoryVariables): QueryRef<ListProductsByCategoryData, ListProductsByCategoryVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListProductsByCategoryVariables): QueryRef<ListProductsByCategoryData, ListProductsByCategoryVariables>;
  operationName: string;
}
export const listProductsByCategoryRef: ListProductsByCategoryRef;

export function listProductsByCategory(vars: ListProductsByCategoryVariables): QueryPromise<ListProductsByCategoryData, ListProductsByCategoryVariables>;
export function listProductsByCategory(dc: DataConnect, vars: ListProductsByCategoryVariables): QueryPromise<ListProductsByCategoryData, ListProductsByCategoryVariables>;

interface UpdateProductPriceRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateProductPriceVariables): MutationRef<UpdateProductPriceData, UpdateProductPriceVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateProductPriceVariables): MutationRef<UpdateProductPriceData, UpdateProductPriceVariables>;
  operationName: string;
}
export const updateProductPriceRef: UpdateProductPriceRef;

export function updateProductPrice(vars: UpdateProductPriceVariables): MutationPromise<UpdateProductPriceData, UpdateProductPriceVariables>;
export function updateProductPrice(dc: DataConnect, vars: UpdateProductPriceVariables): MutationPromise<UpdateProductPriceData, UpdateProductPriceVariables>;

interface GetStoreByIdRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetStoreByIdVariables): QueryRef<GetStoreByIdData, GetStoreByIdVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetStoreByIdVariables): QueryRef<GetStoreByIdData, GetStoreByIdVariables>;
  operationName: string;
}
export const getStoreByIdRef: GetStoreByIdRef;

export function getStoreById(vars: GetStoreByIdVariables): QueryPromise<GetStoreByIdData, GetStoreByIdVariables>;
export function getStoreById(dc: DataConnect, vars: GetStoreByIdVariables): QueryPromise<GetStoreByIdData, GetStoreByIdVariables>;

