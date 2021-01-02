export const refreshTokenSetup = (res) => {
  let refreshTiming = getRefreshTiming(res);

  const refreshToken = async () => {
    const newAuthRes = await res.reloadAuthResponse();
    refreshTiming = getRefreshTiming(newAuthRes);
    console.log('mewAuthRes: ', newAuthRes);
    console.log(' new auth Token: ', newAuthRes.id_token);
    setTimeout(refreshToken, refreshTiming);
  };
  setTimeout(refreshToken, refreshTiming);
};

const getRefreshTiming = (res) => {
  return (res.tokenObj.expires_in || 3600 - 5 * 60) * 1000;
};
