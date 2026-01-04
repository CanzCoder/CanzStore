const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'canzstore-main',
  location: 'us-east4'
};
exports.connectorConfig = connectorConfig;

const addNewWishlistItemRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddNewWishlistItem', inputVars);
}
addNewWishlistItemRef.operationName = 'AddNewWishlistItem';
exports.addNewWishlistItemRef = addNewWishlistItemRef;

exports.addNewWishlistItem = function addNewWishlistItem(dcOrVars, vars) {
  return executeMutation(addNewWishlistItemRef(dcOrVars, vars));
};

const listProductsByCategoryRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListProductsByCategory', inputVars);
}
listProductsByCategoryRef.operationName = 'ListProductsByCategory';
exports.listProductsByCategoryRef = listProductsByCategoryRef;

exports.listProductsByCategory = function listProductsByCategory(dcOrVars, vars) {
  return executeQuery(listProductsByCategoryRef(dcOrVars, vars));
};

const updateProductPriceRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateProductPrice', inputVars);
}
updateProductPriceRef.operationName = 'UpdateProductPrice';
exports.updateProductPriceRef = updateProductPriceRef;

exports.updateProductPrice = function updateProductPrice(dcOrVars, vars) {
  return executeMutation(updateProductPriceRef(dcOrVars, vars));
};

const getStoreByIdRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetStoreById', inputVars);
}
getStoreByIdRef.operationName = 'GetStoreById';
exports.getStoreByIdRef = getStoreByIdRef;

exports.getStoreById = function getStoreById(dcOrVars, vars) {
  return executeQuery(getStoreByIdRef(dcOrVars, vars));
};
