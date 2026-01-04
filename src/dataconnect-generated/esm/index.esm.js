import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'example',
  service: 'canzstore-main',
  location: 'us-east4'
};

export const addNewWishlistItemRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddNewWishlistItem', inputVars);
}
addNewWishlistItemRef.operationName = 'AddNewWishlistItem';

export function addNewWishlistItem(dcOrVars, vars) {
  return executeMutation(addNewWishlistItemRef(dcOrVars, vars));
}

export const listProductsByCategoryRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListProductsByCategory', inputVars);
}
listProductsByCategoryRef.operationName = 'ListProductsByCategory';

export function listProductsByCategory(dcOrVars, vars) {
  return executeQuery(listProductsByCategoryRef(dcOrVars, vars));
}

export const updateProductPriceRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateProductPrice', inputVars);
}
updateProductPriceRef.operationName = 'UpdateProductPrice';

export function updateProductPrice(dcOrVars, vars) {
  return executeMutation(updateProductPriceRef(dcOrVars, vars));
}

export const getStoreByIdRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetStoreById', inputVars);
}
getStoreByIdRef.operationName = 'GetStoreById';

export function getStoreById(dcOrVars, vars) {
  return executeQuery(getStoreByIdRef(dcOrVars, vars));
}

