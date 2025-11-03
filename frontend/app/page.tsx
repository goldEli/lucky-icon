"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { MintERC20 } from "./components/MintERC20";

const truncateAddress = (address: string) =>
  `${address.slice(0, 6)}…${address.slice(-4)}`;

export default function Home() {
  const [account, setAccount] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const connectWallet = useCallback(async () => {
    setError(null);
    if (typeof window === "undefined") {
      setError("Wallet connections are disabled in SSR.");
      return;
    }

    const { ethereum } = window;
    if (!ethereum) {
      setError("No Ethereum provider detected. Install MetaMask or similar.");
      return;
    }

    setIsConnecting(true);
    try {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(Array.isArray(accounts) && accounts.length ? accounts[0] : null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to connect wallet. Try again."
      );
    } finally {
      setIsConnecting(false);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const { ethereum } = window;
    if (!ethereum) {
      return;
    }

    const handleAccountsChanged = (accounts: unknown) => {
      if (Array.isArray(accounts) && accounts.length > 0) {
        setAccount(accounts[0]);
      } else {
        setAccount(null);
      }
    };

    ethereum.request({ method: "eth_accounts" }).then((accounts) => {
      if (Array.isArray(accounts) && accounts.length > 0) {
        setAccount(accounts[0]);
      }
    });

    ethereum.on?.("accountsChanged", handleAccountsChanged);
    return () => {
      ethereum.removeListener?.("accountsChanged", handleAccountsChanged);
    };
  }, []);

  const connectLabel = useMemo(() => {
    if (isConnecting) {
      return "Connecting…";
    }
    if (account) {
      return truncateAddress(account);
    }
    return "Connect Wallet";
  }, [account, isConnecting]);

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 font-sans dark:bg-black">
      <div className="flex justify-end p-4">
        <button
          onClick={connectWallet}
          disabled={isConnecting}
          className="rounded-full bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
        >
          {connectLabel}
        </button>
      </div>
      <MintERC20 account={account} />
      {error ? (
        <p className="px-4 pt-2 text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
