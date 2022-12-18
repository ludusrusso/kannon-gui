import { Dialog, Transition } from "@headlessui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { Field, Form } from "react-final-form";
import { z } from "zod";
import { Nav } from "../../../components/navbar";
import { TemplateSchema } from "../../../src/api/schemas";
import type { Domain } from "../../../src/proto/kannon/admin/apiv1/adminapiv1";
import { trpc } from "../../../utils/trpc";
import { zodValidate } from "../../../utils/zod-validate";

const DomainPage = () => {
  const router = useRouter();
  const domain = router.query.domain as string;
  const { data, isLoading, error } = trpc.useQuery([
    "kube.getDomain",
    { domain: domain },
  ]);

  if (isLoading) {
    return <p>loading ...</p>;
  }

  if (error) {
    return <p>error</p>;
  }

  if (!data) {
    return <p>data not found</p>;
  }

  return (
    <div>
      <Nav />
      <div className="max-w-4xl m-auto">
        <DomainDNS domain={data} />
      </div>
      <div>
        <TemplatesList domain={data?.domain} />
      </div>
    </div>
  );
};

export default DomainPage;

const DNSRecord = ({ dns, value }: { dns: string; value: string }) => {
  return (
    <>
      <p className="bg-gray-900 rounded-t-lg p-2">{dns}</p>
      <div className="p-2 bg-gray-700 rounded-b-lg">
        <code className="max-w-full break-words">{value}</code>
      </div>
    </>
  );
};

const DomainDNS = ({ domain }: { domain: Domain }) => {
  return (
    <>
      <div className="mt-10">
        <DNSRecord
          dns={`TXT ${domain.domain}`}
          value={`v=spf1 include:${process.env.NEXT_PUBLIC_BASE_DOMAIN} ~all`}
        />
      </div>
      <div className="mt-10">
        <DNSRecord
          dns={`TXT kannon._domainkey.${domain.domain}`}
          value={`k=rsa; p=${domain.dkimPubKey}`}
        />
      </div>
      <div className="mt-10">
        <DNSRecord
          dns={`TXT stats.${domain.domain}`}
          value={`${process.env.NEXT_PUBLIC_BASE_DOMAIN}.`}
        />
      </div>
    </>
  );
};

const TemplatesList = ({ domain }: { domain: string }) => {
  const [openCreateDialog, setOpenCreateDialog] = useState(false);

  const q = trpc.useQuery([
    "kube.getDomainTemplates",
    { domain, take: 100, skip: 0 },
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
    <>
      <div className="overflow-x-auto mx-auto max-w-4xl my-10 ring-slate-700 ring-2 rounded-lg">
        <table className="table w-full">
          <thead>
            <tr>
              <th>title</th>
              <th>id</th>
              <th className="text-right">
                <button
                  className="btn btn-circle btn-sm"
                  onClick={() => setOpenCreateDialog(true)}
                >
                  +
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {q.data.templates.map((template) => (
              <tr key={template.templateId}>
                <th>{template.title}</th>
                <td>{template.templateId}</td>
                <td className="text-right">
                  <Link
                    href={`/domains/${domain}/templates/${template.templateId}`}
                  >
                    <a className="btn btn-circle btn-sm">i</a>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <CreateTemplateModal
        isOpen={openCreateDialog}
        setIsOpen={setOpenCreateDialog}
        domain={domain}
      />
    </>
  );
};

const CreateTemplateModal = ({
  isOpen,
  setIsOpen,
  domain,
}: {
  isOpen: boolean;
  setIsOpen: (b: boolean) => void;
  domain: string;
}) => {
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Create Domain
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Insert your new domain to handle in Kannon
                    </p>
                    <CreateTemplatenForm
                      closeModal={closeModal}
                      domain={domain}
                    />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

const CreateTemplatenForm = ({
  closeModal,
  domain,
}: {
  closeModal: () => void;
  domain: string;
}) => {
  const createTemplate = trpc.useMutation(["kube.createDomainTemplate"]);
  return (
    <Form<z.TypeOf<typeof TemplateSchema>>
      initialValues={{
        domain: domain,
      }}
      onSubmit={async (value) => {
        await createTemplate.mutateAsync({
          ...value,
        });
        closeModal();
      }}
      validate={zodValidate(TemplateSchema)}
      render={({ handleSubmit, invalid }) => {
        return (
          <form onSubmit={handleSubmit}>
            <Field
              type="text"
              name="title"
              id="title"
              autoComplete="title"
              render={({ input, meta }) => {
                return (
                  <div>
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Title
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <input
                        className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        {...input}
                      />
                    </div>
                    <div className="mt-1 flex h-5 justify-between text-xs">
                      <span className="text-sm text-red-400">{meta.error}</span>
                    </div>
                  </div>
                );
              }}
            />
            <Field
              type="text"
              name="html"
              id="html"
              autoComplete="html"
              render={({ input, meta }) => {
                return (
                  <div>
                    <label
                      htmlFor="html"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Html
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <textarea
                        className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        {...input}
                        rows={10}
                      />
                    </div>
                    <div className="mt-1 flex h-5 justify-between text-xs">
                      <span className="text-sm text-red-400">{meta.error}</span>
                    </div>
                  </div>
                );
              }}
            />
            <div className="mt-4 flex justify-end space-x-2">
              <button
                type="button"
                className="btn btn-warning btn-xs btn-outline"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary btn-xs"
                disabled={invalid}
              >
                Create
              </button>
            </div>
          </form>
        );
      }}
    />
  );
};
