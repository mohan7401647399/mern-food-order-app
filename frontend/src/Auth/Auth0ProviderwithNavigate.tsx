import { AppState, Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

export default function Auth0ProviderWithNavigate({ children }: props) {
  const navigate = useNavigate();
  const domain = import.meta.env.VITE_AUTH0_DOMAIN,
    clientId = import.meta.env.VITE_AUTH0_CLIENT_ID,
    redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL,
    audience = import.meta.env.VITE_AUTH0_AUDIENCE;

  //  if does not below details
  if (!domain || !clientId || !redirectUri || !audience)
    throw new Error("Unable to initialise auth");

  //  redirect to /auth-callback page
  const onRedirectCallback = (appState?: AppState) => {
    navigate(appState?.returnTo || "/auth-callback");
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{ redirect_uri: redirectUri, audience }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
}

type props = {
  children: React.ReactNode;
};
