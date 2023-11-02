import { formatToUSD } from "../helpers/formatToUSD";
import { type IWallet } from "../models/wallet";
import WalletInfoIcon from "@/public/svgs/wallet-info.svg?svgr";
import ActivityIndicator from "./UI/ActivityIndicator";
import ErrorMessage from "./UI/ErrorMessage";

interface Props {
  wallet: IWallet | undefined;
  loading: boolean;
  error: boolean;
}

export default function WalletInfo({
  wallet,
  loading,
  error,
}: Props): JSX.Element {
  if (wallet === undefined && loading) {
    return <ActivityIndicator text="Loading wallet data" />;
  }
  if (wallet === undefined && error) {
    return <ErrorMessage className="max-w-xxs" />;
  }
  return (
    <ul className="w-full space-y-8 md:max-w-xxs">
      <li>
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm text-gray-400">Ledger Balance</p>
          <WalletInfoIcon />
        </div>
        <h1 className="text-2xl font-bold xs:text-2.5xl">
          {formatToUSD(wallet?.ledger_balance)}
        </h1>
      </li>
      <li>
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm text-gray-400">Total Payout</p>
          <WalletInfoIcon />
        </div>
        <h1 className="text-2xl font-bold xs:text-2.5xl">
          {formatToUSD(wallet?.total_payout)}
        </h1>
      </li>
      <li>
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm text-gray-400">Total Revenue</p>
          <WalletInfoIcon />
        </div>
        <h1 className="text-2xl font-bold xs:text-2.5xl">
          {formatToUSD(wallet?.total_revenue)}
        </h1>
      </li>
      <li>
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm text-gray-400">Pending Payout</p>
          <WalletInfoIcon />
        </div>
        <h1 className="text-2xl font-bold xs:text-2.5xl">
          {formatToUSD(wallet?.pending_payout)}
        </h1>
      </li>
    </ul>
  );
}
