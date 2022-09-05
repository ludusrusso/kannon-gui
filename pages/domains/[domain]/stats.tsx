import { useRouter } from "next/router";
import { useState } from "react";
import { Nav } from "../../../components/navbar";
import { Stats } from "../../../src/proto/kannon/stats/types/stats";
import { trpc } from "../../../utils/trpc";
import days from "dayjs";

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
      fromDate: datePlusDays(now, -1),
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
    <div className="overflow-x-auto m-auto max-w-screen-2xl">
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
                <th>{statasName(s)}</th>
                <td>{s.email}</td>
                <td>{days(s.timestamp).format("YYYY-MM-DD HH:mm:ss")}</td>
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

function statasName(stat: Stats): string {
  if (stat.data?.accepted) {
    return "✅ Accepted";
  }
  if (stat.data?.rejected) {
    return "🛑 Rejected";
  }
  if (stat.data?.delivered) {
    return "🚀 Delivered";
  }
  if (stat.data?.error) {
    return "😱 Error";
  }
  if (stat.data?.bounced) {
    return "💥 Bounced";
  }
  if (stat.data?.clicked) {
    return "🔗 Clicked";
  }
  if (stat.data?.opened) {
    return "🔗 Opened";
  }
  return "🤷‍♀️ unknown";
}
