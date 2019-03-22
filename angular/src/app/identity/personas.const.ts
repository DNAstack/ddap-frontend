export const personas = {
  nci_researcher: {
    imagePath: '/assets/images/nih_identity.png',
  },
};

export const personaMetadataExists = (persona) => {
  return personas[persona];
};
