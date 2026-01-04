# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*ListProductsByCategory*](#listproductsbycategory)
  - [*GetStoreById*](#getstorebyid)
- [**Mutations**](#mutations)
  - [*AddNewWishlistItem*](#addnewwishlistitem)
  - [*UpdateProductPrice*](#updateproductprice)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## ListProductsByCategory
You can execute the `ListProductsByCategory` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listProductsByCategory(vars: ListProductsByCategoryVariables): QueryPromise<ListProductsByCategoryData, ListProductsByCategoryVariables>;

interface ListProductsByCategoryRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListProductsByCategoryVariables): QueryRef<ListProductsByCategoryData, ListProductsByCategoryVariables>;
}
export const listProductsByCategoryRef: ListProductsByCategoryRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listProductsByCategory(dc: DataConnect, vars: ListProductsByCategoryVariables): QueryPromise<ListProductsByCategoryData, ListProductsByCategoryVariables>;

interface ListProductsByCategoryRef {
  ...
  (dc: DataConnect, vars: ListProductsByCategoryVariables): QueryRef<ListProductsByCategoryData, ListProductsByCategoryVariables>;
}
export const listProductsByCategoryRef: ListProductsByCategoryRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listProductsByCategoryRef:
```typescript
const name = listProductsByCategoryRef.operationName;
console.log(name);
```

### Variables
The `ListProductsByCategory` query requires an argument of type `ListProductsByCategoryVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListProductsByCategoryVariables {
  categoryId: UUIDString;
}
```
### Return Type
Recall that executing the `ListProductsByCategory` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListProductsByCategoryData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListProductsByCategoryData {
  products: ({
    id: UUIDString;
    name: string;
    description?: string | null;
    price: number;
    imageUrl?: string | null;
  } & Product_Key)[];
}
```
### Using `ListProductsByCategory`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listProductsByCategory, ListProductsByCategoryVariables } from '@dataconnect/generated';

// The `ListProductsByCategory` query requires an argument of type `ListProductsByCategoryVariables`:
const listProductsByCategoryVars: ListProductsByCategoryVariables = {
  categoryId: ..., 
};

// Call the `listProductsByCategory()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listProductsByCategory(listProductsByCategoryVars);
// Variables can be defined inline as well.
const { data } = await listProductsByCategory({ categoryId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listProductsByCategory(dataConnect, listProductsByCategoryVars);

console.log(data.products);

// Or, you can use the `Promise` API.
listProductsByCategory(listProductsByCategoryVars).then((response) => {
  const data = response.data;
  console.log(data.products);
});
```

### Using `ListProductsByCategory`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listProductsByCategoryRef, ListProductsByCategoryVariables } from '@dataconnect/generated';

// The `ListProductsByCategory` query requires an argument of type `ListProductsByCategoryVariables`:
const listProductsByCategoryVars: ListProductsByCategoryVariables = {
  categoryId: ..., 
};

// Call the `listProductsByCategoryRef()` function to get a reference to the query.
const ref = listProductsByCategoryRef(listProductsByCategoryVars);
// Variables can be defined inline as well.
const ref = listProductsByCategoryRef({ categoryId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listProductsByCategoryRef(dataConnect, listProductsByCategoryVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.products);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.products);
});
```

## GetStoreById
You can execute the `GetStoreById` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getStoreById(vars: GetStoreByIdVariables): QueryPromise<GetStoreByIdData, GetStoreByIdVariables>;

interface GetStoreByIdRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetStoreByIdVariables): QueryRef<GetStoreByIdData, GetStoreByIdVariables>;
}
export const getStoreByIdRef: GetStoreByIdRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getStoreById(dc: DataConnect, vars: GetStoreByIdVariables): QueryPromise<GetStoreByIdData, GetStoreByIdVariables>;

interface GetStoreByIdRef {
  ...
  (dc: DataConnect, vars: GetStoreByIdVariables): QueryRef<GetStoreByIdData, GetStoreByIdVariables>;
}
export const getStoreByIdRef: GetStoreByIdRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getStoreByIdRef:
```typescript
const name = getStoreByIdRef.operationName;
console.log(name);
```

### Variables
The `GetStoreById` query requires an argument of type `GetStoreByIdVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetStoreByIdVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetStoreById` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetStoreByIdData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetStoreById`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getStoreById, GetStoreByIdVariables } from '@dataconnect/generated';

// The `GetStoreById` query requires an argument of type `GetStoreByIdVariables`:
const getStoreByIdVars: GetStoreByIdVariables = {
  id: ..., 
};

// Call the `getStoreById()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getStoreById(getStoreByIdVars);
// Variables can be defined inline as well.
const { data } = await getStoreById({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getStoreById(dataConnect, getStoreByIdVars);

console.log(data.store);

// Or, you can use the `Promise` API.
getStoreById(getStoreByIdVars).then((response) => {
  const data = response.data;
  console.log(data.store);
});
```

### Using `GetStoreById`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getStoreByIdRef, GetStoreByIdVariables } from '@dataconnect/generated';

// The `GetStoreById` query requires an argument of type `GetStoreByIdVariables`:
const getStoreByIdVars: GetStoreByIdVariables = {
  id: ..., 
};

// Call the `getStoreByIdRef()` function to get a reference to the query.
const ref = getStoreByIdRef(getStoreByIdVars);
// Variables can be defined inline as well.
const ref = getStoreByIdRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getStoreByIdRef(dataConnect, getStoreByIdVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.store);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.store);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## AddNewWishlistItem
You can execute the `AddNewWishlistItem` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
addNewWishlistItem(vars: AddNewWishlistItemVariables): MutationPromise<AddNewWishlistItemData, AddNewWishlistItemVariables>;

interface AddNewWishlistItemRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddNewWishlistItemVariables): MutationRef<AddNewWishlistItemData, AddNewWishlistItemVariables>;
}
export const addNewWishlistItemRef: AddNewWishlistItemRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
addNewWishlistItem(dc: DataConnect, vars: AddNewWishlistItemVariables): MutationPromise<AddNewWishlistItemData, AddNewWishlistItemVariables>;

interface AddNewWishlistItemRef {
  ...
  (dc: DataConnect, vars: AddNewWishlistItemVariables): MutationRef<AddNewWishlistItemData, AddNewWishlistItemVariables>;
}
export const addNewWishlistItemRef: AddNewWishlistItemRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the addNewWishlistItemRef:
```typescript
const name = addNewWishlistItemRef.operationName;
console.log(name);
```

### Variables
The `AddNewWishlistItem` mutation requires an argument of type `AddNewWishlistItemVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AddNewWishlistItemVariables {
  productId: UUIDString;
  shopperId: UUIDString;
}
```
### Return Type
Recall that executing the `AddNewWishlistItem` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AddNewWishlistItemData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AddNewWishlistItemData {
  wishlistItem_insert: WishlistItem_Key;
}
```
### Using `AddNewWishlistItem`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, addNewWishlistItem, AddNewWishlistItemVariables } from '@dataconnect/generated';

// The `AddNewWishlistItem` mutation requires an argument of type `AddNewWishlistItemVariables`:
const addNewWishlistItemVars: AddNewWishlistItemVariables = {
  productId: ..., 
  shopperId: ..., 
};

// Call the `addNewWishlistItem()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await addNewWishlistItem(addNewWishlistItemVars);
// Variables can be defined inline as well.
const { data } = await addNewWishlistItem({ productId: ..., shopperId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await addNewWishlistItem(dataConnect, addNewWishlistItemVars);

console.log(data.wishlistItem_insert);

// Or, you can use the `Promise` API.
addNewWishlistItem(addNewWishlistItemVars).then((response) => {
  const data = response.data;
  console.log(data.wishlistItem_insert);
});
```

### Using `AddNewWishlistItem`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, addNewWishlistItemRef, AddNewWishlistItemVariables } from '@dataconnect/generated';

// The `AddNewWishlistItem` mutation requires an argument of type `AddNewWishlistItemVariables`:
const addNewWishlistItemVars: AddNewWishlistItemVariables = {
  productId: ..., 
  shopperId: ..., 
};

// Call the `addNewWishlistItemRef()` function to get a reference to the mutation.
const ref = addNewWishlistItemRef(addNewWishlistItemVars);
// Variables can be defined inline as well.
const ref = addNewWishlistItemRef({ productId: ..., shopperId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = addNewWishlistItemRef(dataConnect, addNewWishlistItemVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.wishlistItem_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.wishlistItem_insert);
});
```

## UpdateProductPrice
You can execute the `UpdateProductPrice` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateProductPrice(vars: UpdateProductPriceVariables): MutationPromise<UpdateProductPriceData, UpdateProductPriceVariables>;

interface UpdateProductPriceRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateProductPriceVariables): MutationRef<UpdateProductPriceData, UpdateProductPriceVariables>;
}
export const updateProductPriceRef: UpdateProductPriceRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateProductPrice(dc: DataConnect, vars: UpdateProductPriceVariables): MutationPromise<UpdateProductPriceData, UpdateProductPriceVariables>;

interface UpdateProductPriceRef {
  ...
  (dc: DataConnect, vars: UpdateProductPriceVariables): MutationRef<UpdateProductPriceData, UpdateProductPriceVariables>;
}
export const updateProductPriceRef: UpdateProductPriceRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateProductPriceRef:
```typescript
const name = updateProductPriceRef.operationName;
console.log(name);
```

### Variables
The `UpdateProductPrice` mutation requires an argument of type `UpdateProductPriceVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateProductPriceVariables {
  id: UUIDString;
  price: number;
}
```
### Return Type
Recall that executing the `UpdateProductPrice` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateProductPriceData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateProductPriceData {
  product_update?: Product_Key | null;
}
```
### Using `UpdateProductPrice`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateProductPrice, UpdateProductPriceVariables } from '@dataconnect/generated';

// The `UpdateProductPrice` mutation requires an argument of type `UpdateProductPriceVariables`:
const updateProductPriceVars: UpdateProductPriceVariables = {
  id: ..., 
  price: ..., 
};

// Call the `updateProductPrice()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateProductPrice(updateProductPriceVars);
// Variables can be defined inline as well.
const { data } = await updateProductPrice({ id: ..., price: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateProductPrice(dataConnect, updateProductPriceVars);

console.log(data.product_update);

// Or, you can use the `Promise` API.
updateProductPrice(updateProductPriceVars).then((response) => {
  const data = response.data;
  console.log(data.product_update);
});
```

### Using `UpdateProductPrice`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateProductPriceRef, UpdateProductPriceVariables } from '@dataconnect/generated';

// The `UpdateProductPrice` mutation requires an argument of type `UpdateProductPriceVariables`:
const updateProductPriceVars: UpdateProductPriceVariables = {
  id: ..., 
  price: ..., 
};

// Call the `updateProductPriceRef()` function to get a reference to the mutation.
const ref = updateProductPriceRef(updateProductPriceVars);
// Variables can be defined inline as well.
const ref = updateProductPriceRef({ id: ..., price: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateProductPriceRef(dataConnect, updateProductPriceVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.product_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.product_update);
});
```

