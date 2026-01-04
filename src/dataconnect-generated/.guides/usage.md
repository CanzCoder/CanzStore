# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.





## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { addNewWishlistItem, listProductsByCategory, updateProductPrice, getStoreById } from '@dataconnect/generated';


// Operation AddNewWishlistItem:  For variables, look at type AddNewWishlistItemVars in ../index.d.ts
const { data } = await AddNewWishlistItem(dataConnect, addNewWishlistItemVars);

// Operation ListProductsByCategory:  For variables, look at type ListProductsByCategoryVars in ../index.d.ts
const { data } = await ListProductsByCategory(dataConnect, listProductsByCategoryVars);

// Operation UpdateProductPrice:  For variables, look at type UpdateProductPriceVars in ../index.d.ts
const { data } = await UpdateProductPrice(dataConnect, updateProductPriceVars);

// Operation GetStoreById:  For variables, look at type GetStoreByIdVars in ../index.d.ts
const { data } = await GetStoreById(dataConnect, getStoreByIdVars);


```