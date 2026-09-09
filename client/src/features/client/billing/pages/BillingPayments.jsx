import { useEffect, useState } from "react";
import { CreditCard, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

import TransactionCard from "../components/TransactionCard";
import { getMyTransactions } from "../services/billing.service";

export default function ClientBillingPayments() {
  const navigate = useNavigate();

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadTransactions() {
      try {
        setLoading(true);

        const data = await getMyTransactions();

        setTransactions(data);
      } catch (error) {
        console.error(error);
        setError("Unable to load your billing information.");
      } finally {
        setLoading(false);
      }
    }

    loadTransactions();
  }, []);

  const handleViewTransaction = (transaction) => {
    navigate(`/client/billing/${transaction.id}`);
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />
          Loading billing information...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 px-4 py-6 lg:px-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
            <CreditCard className="h-5 w-5" />
          </div>

          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Billing & Payments
            </h1>

            <p className="mt-1 text-sm text-muted-foreground">
              View your payment history and transaction details.
            </p>
          </div>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      {/* Transactions */}
      <section>
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Transaction History</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Select a transaction to view its details.
          </p>
        </div>

        {transactions.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border p-10 text-center">
            <CreditCard className="mx-auto h-8 w-8 text-muted-foreground" />

            <p className="mt-3 text-sm text-muted-foreground">
              You don't have any transactions yet.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {transactions.map((transaction) => (
              <TransactionCard
                key={transaction.id}
                transaction={transaction}
                onView={handleViewTransaction}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
