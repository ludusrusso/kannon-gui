import { useRouter } from "next/router";
import { useState } from "react";
import { Nav } from "../../../components/navbar";
import { trpc } from "../../../utils/trpc";

const DomainStatsPage = () => {
  const router = useRouter();
  const domain = router.query.domain as string;

  return (
    <div>
      <Nav />
      <DomainStats domain={domain} />
    </div>
  );
};

export default DomainStatsPage;

const DomainStats = ({ domain }: { domain: string }) => {
  const [now] = useState(new Date());
  const q = trpc.useQuery([
    "kube.domainStats",
    {
      domain,
      fromDate: datePlusDays(now, -100),
      skip: 0,
      take: 100,
      toDate: now,
    },
  ]);

  if (q.error) {
    return <p>error</p>;
  }
  if (q.isLoading) {
    return <p>isLoading</p>;
  }

  if (!q.data) {
    return <p>something strange</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="table table-compact w-full">
        <thead>
          <tr>
            <th>Type</th>
            <th>Email</th>
            <th>Timestamp</th>
            <th>Message ID</th>
          </tr>
        </thead>
        <tbody>
          {q.data.stats.map((s, id) => {
            return (
              <tr key={id}>
                <th>{typeMap[s.type] || s.type}</th>
                <td>{s.email}</td>
                <td>{s.timestamp?.toISOString()}</td>
                <td>{s.messageId}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

function datePlusDays(date: Date, days: number) {
  return new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
}

const typeMap: { [k: string]: string } = {
  opened: "👀 Opened",
  clicked: "🔗 Clicked",
  delivered: "✅ Delivered",
};
