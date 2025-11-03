
type MintERC20Props = {
  account: string | null;
};

export const MintERC20 = ({ account }: MintERC20Props) => {
  const isConnected = Boolean(account);
  return (
    <div className="flex flex-col items-center space-y-4">
      <h2 className="text-2xl font-bold">Mint Your ERC20 Tokens</h2>
      <input
        type="number"
        placeholder="Amount to Mint"
        className="w-64 rounded border p-2"
        disabled={!isConnected}
      />
      <button
        className="rounded bg-green-600 px-4 py-2 text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-green-400"
        disabled={!isConnected}
      >
        {isConnected ? "Mint Lucky Icon Tokens" : "Connect to Mint"}
      </button>
      {/* current balance */}
      <p className="mt-4 text-lg">
        {isConnected
          ? `Connected as ${account}`
          : "Connect your wallet to view your balance."}
      </p>
    </div>
  );
};
