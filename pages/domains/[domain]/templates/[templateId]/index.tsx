import { useRouter } from "next/router";
import { Field, Form } from "react-final-form";
import { Nav } from "../../../../../components/navbar";
import { TemplateSchema } from "../../../../../src/api/schemas";
import { trpc } from "../../../../../utils/trpc";
import { z } from "zod";
import { zodValidate } from "../../../../../utils/zod-validate";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

const TemplatePage = () => {
  const router = useRouter();
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
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

  if (!q.data?.template) {
    return <p>data not found</p>;
  }

  return (
    <div className="h-screen grid grid-rows-[auto_1fr]">
      <div>
        <Nav />
        <button onClick={() => setOpenUpdateDialog(true)}> update </button>
      </div>
      {q.data.template?.html && (
        <div className="mockup-window border bg-base-300 max-w-4xl m-auto mt-10 w-full h-full ">
          <iframe
            className="w-full h-full mb-10"
            src={"data:text/html," + encodeURIComponent(q.data.template.html)}
          />
        </div>
      )}

      <CreateTemplateModal
        isOpen={openUpdateDialog}
        setIsOpen={setOpenUpdateDialog}
        domain={domain}
        id={q.data.template.templateId}
        value={q.data.template}
      />
    </div>
  );
};

export default TemplatePage;

const CreateTemplateModal = ({
  isOpen,
  setIsOpen,
  domain,
  id,
  value,
}: {
  isOpen: boolean;
  setIsOpen: (b: boolean) => void;
  domain: string;
  id: string;
  value: any;
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
                    <UpdateTemplatenForm
                      closeModal={closeModal}
                      domain={domain}
                      id={id}
                      value={value}
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

const UpdateTemplatenForm = ({
  closeModal,
  domain,
  id,
  value,
}: {
  closeModal: () => void;
  domain: string;
  id: string;
  value: any;
}) => {
  const updateTemplate = trpc.useMutation(["kube.updateDomainTemplate"]);
  return (
    <Form<z.TypeOf<typeof TemplateSchema>>
      initialValues={{
        domain: domain,
        ...value,
      }}
      onSubmit={async (value) => {
        await updateTemplate.mutateAsync({
          id: id,
          template: value,
        });
        closeModal();
      }}
      validate={zodValidate(TemplateSchema)}
      initialValuesEqual={() => true}
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
                Update
              </button>
            </div>
          </form>
        );
      }}
    />
  );
};
