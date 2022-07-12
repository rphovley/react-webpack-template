//@ts-ignore

const supportedProviders = {
  nami: true,
  flint: true,
  yoroi: true,
};

export const selectWalletProvider = async (
  provider = 'nami'
) => {
  if (!supportedProviders[provider]) {
    throw new Error(`Invalid Wallet Provider: ${provider}`);
  }

  const context = window;
  if (!context.cardano || !context.cardano[provider]) {
    throw new Error('cardano provider instance not found in context');
  }

  const walletApi = (await context.cardano[
    provider
  ].enable());
  return walletApi;
};
