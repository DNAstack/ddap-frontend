export const identityProviders = {
  google: {
    imagePath: '/assets/images/google_identity.jpg',
  },
  elixir: {
    imagePath: '/assets/images/elixir_identity.png',
  },
  era_commons: {
    imagePath: '/assets/images/era_commons_identity.jpg',
  },
  nci_researcher: {
    imagePath: '/assets/images/nih_identity.png',
  },
  dr_joe_elixir: {
    imagePath: '/assets/images/elixir_identity.png',
  },
  dr_joe_era_commons: {
    imagePath: '/assets/images/era_commons_identity.jpg',
  },
};

export const identityProviderMetadataExists = (provider) => {
  return identityProviders[provider];
};
