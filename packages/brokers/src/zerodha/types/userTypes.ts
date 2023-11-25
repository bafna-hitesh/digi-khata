interface IKiteUserProfile {
  user_id: string; // The unique, permanent user id registered with the broker and the exchanges
  user_name: string; // User's real name
  user_shortname: string; // Shortened version of the user's real name
  email: string; // User's email
  user_type: string; // User's registered role at the broker (e.g., 'individual' for retail users)
  broker: string; // The broker ID
  exchanges: string[]; // Exchanges enabled for trading on the user's account
  products: string[]; // Margin product types enabled for the user
  order_types: string[]; // Order types enabled for the user
  api_key: string; // The API key for which the authentication was performed
  access_token: string; // The authentication token used with every subsequent request
  public_token: string; // A token for public session validation where requests may be exposed to the public
  refresh_token?: string; // A token for getting long-standing read permissions (optional)
  login_time: string; // User's last login time
  meta: Record<string, unknown>; // Additional metadata (e.g., demat_consent)
  avatar_url?: string; // Full URL to the user's avatar (PNG image), if available (optional)
}

export default IKiteUserProfile;
