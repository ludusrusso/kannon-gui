import { useRouter } from "next/router";
import { Nav } from "../../../../../components/navbar";
import { trpc } from "../../../../../utils/trpc";

const TemplatePage = () => {
  const router = useRouter();
  const domain = router.query.domain as string;
  const templateId = router.query.templateId as string;
  const q = trpc.useQuery([
    "kube.getDomainTemplate",
    { templateId: templateId },
  ]);

  if (q.isLoading) {
    return <p>loading ...</p>;
  }

  if (q.error) {
    return <p>error</p>;
  }

  if (!q.data) {
    return <p>data not found</p>;
  }

  return (
    <div>
      <Nav />
      {q.data.template?.html && (
        <div className="mockup-window border bg-base-300 max-w-4xl m-auto mt-10">
          <div className="flex justify-center bg-base-200">
            <div
              dangerouslySetInnerHTML={{
                __html: q.data.template?.html,
              }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplatePage;
