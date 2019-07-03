export const environment = {
  production: true,
  ddapApiUrl: '/api/v1alpha',
  damApiUrls: new Map<string, string>([
    ['1', '/dam/1/v1alpha'],
  ]),
  idpApiUrl: '/identity/v1alpha',
  claimExpirationWarningThresholdInHours: 48,
};
