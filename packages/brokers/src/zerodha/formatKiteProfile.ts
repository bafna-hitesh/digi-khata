// delete un necessary values
const formatKiteProfile = (kiteUserProfile: any) => {
  delete kiteUserProfile?.access_token;
  delete kiteUserProfile?.public_token;
  delete kiteUserProfile?.refresh_token;
  delete kiteUserProfile?.enctoken;
  delete kiteUserProfile?.login_time;
  return kiteUserProfile;
};

export { formatKiteProfile };
