
import { RouteObject } from 'react-router-dom';

declare module 'react-router-dom' {
  interface RouteMeta {
    // Define your route metadata types here
    requiresAuth?: boolean;
    title?: string;
    // Add other meta fields as needed
  }

  interface CustomRouteObject extends RouteObject {
    meta?: RouteMeta;
    children?: CustomRouteObject[];
  }
}

export type AppRoutes = CustomRouteObject[];