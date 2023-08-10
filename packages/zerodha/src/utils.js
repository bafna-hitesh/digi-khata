function formatKiteProfile(kiteUserProfile) {
    if(kiteUserProfile.access_token)    delete kiteUserProfile.access_token;
    if(kiteUserProfile.public_token)    delete kiteUserProfile.public_token;
    if(kiteUserProfile.refresh_token)   delete kiteUserProfile.refresh_token;
    if(kiteUserProfile.enctoken)    delete kiteUserProfile.enctoken;
    if(kiteUserProfile.login_time)  delete kiteUserProfile.login_time;
    return kiteUserProfile;
}

export {
    formatKiteProfile
}