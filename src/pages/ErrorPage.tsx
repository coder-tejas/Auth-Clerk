import { useRouteError, isRouteErrorResponse } from 'react-router-dom';

export function ErrorPage() {
  const error = useRouteError();
  
  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        {isRouteErrorResponse(error) ? (
          <i>{error.statusText || error.statusText}</i>
        ) : (
          <i>Unknown error</i>
        )}
      </p>
    </div>
  );
}