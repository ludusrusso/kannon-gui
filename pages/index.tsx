import { Nav } from "../components/navbar";
import { trpc } from "../utils/trpc";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { Field, Form } from "react-final-form";
import { z } from "zod";
import { zodValidate } from "../utils/zod-validate";
import { Domain, GetDomainsResponse } from "../src/proto/kannon/api";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Nav />
      <DomainsList />
    </>
  );
}

const DomainsList = () => {
  const { data, isLoading } = trpc.useQuery(["kube.getDomains"]);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [currentDomain, setCurrentDomain] = useState<
    GetDomainsResponse["domains"][number] | null
  >(null);

  if (isLoading) {
    return <p>loading...</p>;
  }

  return (
    <>
      <CreateDomainModal
        isOpen={openCreateDialog}
        setIsOpen={setOpenCreateDialog}
      />
      {!!currentDomain && (
        <DomainInfoModal
          domain={currentDomain}
          closeModal={() => setCurrentDomain(null)}
        />
      )}
      <div className="overflow-x-auto mx-auto max-w-4xl my-10 ring-slate-700 ring-2 rounded-lg">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Domain</th>
              <th>Api KEY</th>
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
            {data?.domains.map((domain) => (
              <tr key={domain.domain}>
                <th>{domain.domain}</th>
                <td>{domain.key}</td>
                <td className="text-right">
                  <Link href={`/domains/${domain.domain}`}>
                    <a className="btn btn-circle btn-sm">i</a>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

const DomainInfoModal = ({
  closeModal,
  domain,
}: {
  closeModal: () => void;
  domain: GetDomainsResponse["domains"][number];
}) => {
  return (
    <>
      <Transition appear show={!!domain} as={Fragment}>
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
                    Domain DNS
                  </Dialog.Title>
                  <div className="mt-2">
                    <p>TXT {domain.domain}</p>
                    <pre>v=spf1 include:kannon.ludusrusso.dev ~all</pre>
                  </div>
                  <div className="mt-2">
                    <p>TXT kannon._domainkey.{domain.domain}</p>
                    <pre>k=rsa; p={domain.dkimPubKey}</pre>
                  </div>
                  <div className="mt-2">
                    <p>TXT stats.{domain.domain}</p>
                    <pre>kannon.ludusrusso.dev.</pre>
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

const CreateDomainModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (b: boolean) => void;
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
                    <CreateDomainForm closeModal={closeModal} />
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

const CreateDomainSchema = z.object({
  domain: z
    .string()
    .regex(
      /^[a-zA-Z0-9][a-zA-Z0-9-\.]{0,61}[a-zA-Z0-9]?\.[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/,
      "should be a domain of third level or more"
    ),
});

const CreateDomainForm = ({ closeModal }: { closeModal: () => void }) => {
  const createDomain = trpc.useMutation(["kube.createDomain"]);
  return (
    <Form<z.TypeOf<typeof CreateDomainSchema>>
      onSubmit={async (value) => {
        await createDomain.mutateAsync({
          domain: value.domain,
        });
        closeModal();
      }}
      validate={zodValidate(CreateDomainSchema)}
      render={({ handleSubmit, invalid }) => {
        return (
          <form onSubmit={handleSubmit}>
            <Field
              type="text"
              name="domain"
              id="domain"
              autoComplete="domain"
              render={({ input, meta }) => {
                return (
                  <div>
                    <label
                      htmlFor="domain"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Domain
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
