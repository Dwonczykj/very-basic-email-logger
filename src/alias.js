const getGmailAliases = () => {
  return [Session.getActiveUser().getEmail(), ...GmailApp.getAliases()];
};

export default getGmailAliases;
