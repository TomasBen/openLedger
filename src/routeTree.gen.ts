/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'
import { Route as SalesDocumentsImport } from './routes/sales/documents'
import { Route as ProductsInventoryImport } from './routes/products/inventory'

// Create/Update Routes

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const SalesDocumentsRoute = SalesDocumentsImport.update({
  id: '/sales/documents',
  path: '/sales/documents',
  getParentRoute: () => rootRoute,
} as any)

const ProductsInventoryRoute = ProductsInventoryImport.update({
  id: '/products/inventory',
  path: '/products/inventory',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/products/inventory': {
      id: '/products/inventory'
      path: '/products/inventory'
      fullPath: '/products/inventory'
      preLoaderRoute: typeof ProductsInventoryImport
      parentRoute: typeof rootRoute
    }
    '/sales/documents': {
      id: '/sales/documents'
      path: '/sales/documents'
      fullPath: '/sales/documents'
      preLoaderRoute: typeof SalesDocumentsImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/products/inventory': typeof ProductsInventoryRoute
  '/sales/documents': typeof SalesDocumentsRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/products/inventory': typeof ProductsInventoryRoute
  '/sales/documents': typeof SalesDocumentsRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/products/inventory': typeof ProductsInventoryRoute
  '/sales/documents': typeof SalesDocumentsRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/products/inventory' | '/sales/documents'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/products/inventory' | '/sales/documents'
  id: '__root__' | '/' | '/products/inventory' | '/sales/documents'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  ProductsInventoryRoute: typeof ProductsInventoryRoute
  SalesDocumentsRoute: typeof SalesDocumentsRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  ProductsInventoryRoute: ProductsInventoryRoute,
  SalesDocumentsRoute: SalesDocumentsRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/products/inventory",
        "/sales/documents"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/products/inventory": {
      "filePath": "products/inventory.tsx"
    },
    "/sales/documents": {
      "filePath": "sales/documents.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
