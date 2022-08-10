/* eslint-disable */
import {
  makeGenericClientConstructor,
  ChannelCredentials,
  ChannelOptions,
  UntypedServiceImplementation,
  handleUnaryCall,
  Client,
  ClientUnaryCall,
  Metadata,
  CallOptions,
  ServiceError,
} from "@grpc/grpc-js";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "kannon";

export interface GetDomainsReq {}

export interface GetDomainsResponse {
  domains: Domain[];
}

export interface CreateDomainRequest {
  domain: string;
}

export interface RegenerateDomainKeyRequest {
  domain: string;
}

export interface Domain {
  domain: string;
  key: string;
  dkimPubKey: string;
}

export interface Template {
  templateId: string;
  html: string;
  title: string;
  type: string;
}

export interface CreateTemplateReq {
  html: string;
  title: string;
  domain: string;
}

export interface CreateTemplateRes {
  template: Template | undefined;
}

export interface UpdateTemplateReq {
  templateId: string;
  html: string;
  title: string;
}

export interface UpdateTemplateRes {
  template: Template | undefined;
}

export interface DeleteTemplateReq {
  templateId: string;
}

export interface DeleteTemplateRes {
  template: Template | undefined;
}

export interface GetTemplateReq {
  templateId: string;
}

export interface GetTemplateRes {
  template: Template | undefined;
}

export interface GetTemplatesReq {
  domain: string;
  skip: number;
  take: number;
}

export interface GetTemplatesRes {
  templates: Template[];
  total: number;
}

function createBaseGetDomainsReq(): GetDomainsReq {
  return {};
}

export const GetDomainsReq = {
  encode(
    _: GetDomainsReq,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetDomainsReq {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetDomainsReq();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): GetDomainsReq {
    return {};
  },

  toJSON(_: GetDomainsReq): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetDomainsReq>, I>>(
    _: I
  ): GetDomainsReq {
    const message = createBaseGetDomainsReq();
    return message;
  },
};

function createBaseGetDomainsResponse(): GetDomainsResponse {
  return { domains: [] };
}

export const GetDomainsResponse = {
  encode(
    message: GetDomainsResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.domains) {
      Domain.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetDomainsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetDomainsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.domains.push(Domain.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetDomainsResponse {
    return {
      domains: Array.isArray(object?.domains)
        ? object.domains.map((e: any) => Domain.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GetDomainsResponse): unknown {
    const obj: any = {};
    if (message.domains) {
      obj.domains = message.domains.map((e) =>
        e ? Domain.toJSON(e) : undefined
      );
    } else {
      obj.domains = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetDomainsResponse>, I>>(
    object: I
  ): GetDomainsResponse {
    const message = createBaseGetDomainsResponse();
    message.domains = object.domains?.map((e) => Domain.fromPartial(e)) || [];
    return message;
  },
};

function createBaseCreateDomainRequest(): CreateDomainRequest {
  return { domain: "" };
}

export const CreateDomainRequest = {
  encode(
    message: CreateDomainRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.domain !== "") {
      writer.uint32(10).string(message.domain);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateDomainRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateDomainRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.domain = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateDomainRequest {
    return {
      domain: isSet(object.domain) ? String(object.domain) : "",
    };
  },

  toJSON(message: CreateDomainRequest): unknown {
    const obj: any = {};
    message.domain !== undefined && (obj.domain = message.domain);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CreateDomainRequest>, I>>(
    object: I
  ): CreateDomainRequest {
    const message = createBaseCreateDomainRequest();
    message.domain = object.domain ?? "";
    return message;
  },
};

function createBaseRegenerateDomainKeyRequest(): RegenerateDomainKeyRequest {
  return { domain: "" };
}

export const RegenerateDomainKeyRequest = {
  encode(
    message: RegenerateDomainKeyRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.domain !== "") {
      writer.uint32(10).string(message.domain);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): RegenerateDomainKeyRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRegenerateDomainKeyRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.domain = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RegenerateDomainKeyRequest {
    return {
      domain: isSet(object.domain) ? String(object.domain) : "",
    };
  },

  toJSON(message: RegenerateDomainKeyRequest): unknown {
    const obj: any = {};
    message.domain !== undefined && (obj.domain = message.domain);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RegenerateDomainKeyRequest>, I>>(
    object: I
  ): RegenerateDomainKeyRequest {
    const message = createBaseRegenerateDomainKeyRequest();
    message.domain = object.domain ?? "";
    return message;
  },
};

function createBaseDomain(): Domain {
  return { domain: "", key: "", dkimPubKey: "" };
}

export const Domain = {
  encode(
    message: Domain,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.domain !== "") {
      writer.uint32(10).string(message.domain);
    }
    if (message.key !== "") {
      writer.uint32(18).string(message.key);
    }
    if (message.dkimPubKey !== "") {
      writer.uint32(26).string(message.dkimPubKey);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Domain {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDomain();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.domain = reader.string();
          break;
        case 2:
          message.key = reader.string();
          break;
        case 3:
          message.dkimPubKey = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Domain {
    return {
      domain: isSet(object.domain) ? String(object.domain) : "",
      key: isSet(object.key) ? String(object.key) : "",
      dkimPubKey: isSet(object.dkimPubKey) ? String(object.dkimPubKey) : "",
    };
  },

  toJSON(message: Domain): unknown {
    const obj: any = {};
    message.domain !== undefined && (obj.domain = message.domain);
    message.key !== undefined && (obj.key = message.key);
    message.dkimPubKey !== undefined && (obj.dkimPubKey = message.dkimPubKey);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Domain>, I>>(object: I): Domain {
    const message = createBaseDomain();
    message.domain = object.domain ?? "";
    message.key = object.key ?? "";
    message.dkimPubKey = object.dkimPubKey ?? "";
    return message;
  },
};

function createBaseTemplate(): Template {
  return { templateId: "", html: "", title: "", type: "" };
}

export const Template = {
  encode(
    message: Template,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.templateId !== "") {
      writer.uint32(10).string(message.templateId);
    }
    if (message.html !== "") {
      writer.uint32(18).string(message.html);
    }
    if (message.title !== "") {
      writer.uint32(26).string(message.title);
    }
    if (message.type !== "") {
      writer.uint32(34).string(message.type);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Template {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTemplate();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.templateId = reader.string();
          break;
        case 2:
          message.html = reader.string();
          break;
        case 3:
          message.title = reader.string();
          break;
        case 4:
          message.type = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Template {
    return {
      templateId: isSet(object.templateId) ? String(object.templateId) : "",
      html: isSet(object.html) ? String(object.html) : "",
      title: isSet(object.title) ? String(object.title) : "",
      type: isSet(object.type) ? String(object.type) : "",
    };
  },

  toJSON(message: Template): unknown {
    const obj: any = {};
    message.templateId !== undefined && (obj.templateId = message.templateId);
    message.html !== undefined && (obj.html = message.html);
    message.title !== undefined && (obj.title = message.title);
    message.type !== undefined && (obj.type = message.type);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Template>, I>>(object: I): Template {
    const message = createBaseTemplate();
    message.templateId = object.templateId ?? "";
    message.html = object.html ?? "";
    message.title = object.title ?? "";
    message.type = object.type ?? "";
    return message;
  },
};

function createBaseCreateTemplateReq(): CreateTemplateReq {
  return { html: "", title: "", domain: "" };
}

export const CreateTemplateReq = {
  encode(
    message: CreateTemplateReq,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.html !== "") {
      writer.uint32(10).string(message.html);
    }
    if (message.title !== "") {
      writer.uint32(18).string(message.title);
    }
    if (message.domain !== "") {
      writer.uint32(26).string(message.domain);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateTemplateReq {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateTemplateReq();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.html = reader.string();
          break;
        case 2:
          message.title = reader.string();
          break;
        case 3:
          message.domain = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateTemplateReq {
    return {
      html: isSet(object.html) ? String(object.html) : "",
      title: isSet(object.title) ? String(object.title) : "",
      domain: isSet(object.domain) ? String(object.domain) : "",
    };
  },

  toJSON(message: CreateTemplateReq): unknown {
    const obj: any = {};
    message.html !== undefined && (obj.html = message.html);
    message.title !== undefined && (obj.title = message.title);
    message.domain !== undefined && (obj.domain = message.domain);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CreateTemplateReq>, I>>(
    object: I
  ): CreateTemplateReq {
    const message = createBaseCreateTemplateReq();
    message.html = object.html ?? "";
    message.title = object.title ?? "";
    message.domain = object.domain ?? "";
    return message;
  },
};

function createBaseCreateTemplateRes(): CreateTemplateRes {
  return { template: undefined };
}

export const CreateTemplateRes = {
  encode(
    message: CreateTemplateRes,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.template !== undefined) {
      Template.encode(message.template, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateTemplateRes {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateTemplateRes();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.template = Template.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateTemplateRes {
    return {
      template: isSet(object.template)
        ? Template.fromJSON(object.template)
        : undefined,
    };
  },

  toJSON(message: CreateTemplateRes): unknown {
    const obj: any = {};
    message.template !== undefined &&
      (obj.template = message.template
        ? Template.toJSON(message.template)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CreateTemplateRes>, I>>(
    object: I
  ): CreateTemplateRes {
    const message = createBaseCreateTemplateRes();
    message.template =
      object.template !== undefined && object.template !== null
        ? Template.fromPartial(object.template)
        : undefined;
    return message;
  },
};

function createBaseUpdateTemplateReq(): UpdateTemplateReq {
  return { templateId: "", html: "", title: "" };
}

export const UpdateTemplateReq = {
  encode(
    message: UpdateTemplateReq,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.templateId !== "") {
      writer.uint32(10).string(message.templateId);
    }
    if (message.html !== "") {
      writer.uint32(18).string(message.html);
    }
    if (message.title !== "") {
      writer.uint32(26).string(message.title);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateTemplateReq {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateTemplateReq();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.templateId = reader.string();
          break;
        case 2:
          message.html = reader.string();
          break;
        case 3:
          message.title = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpdateTemplateReq {
    return {
      templateId: isSet(object.templateId) ? String(object.templateId) : "",
      html: isSet(object.html) ? String(object.html) : "",
      title: isSet(object.title) ? String(object.title) : "",
    };
  },

  toJSON(message: UpdateTemplateReq): unknown {
    const obj: any = {};
    message.templateId !== undefined && (obj.templateId = message.templateId);
    message.html !== undefined && (obj.html = message.html);
    message.title !== undefined && (obj.title = message.title);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<UpdateTemplateReq>, I>>(
    object: I
  ): UpdateTemplateReq {
    const message = createBaseUpdateTemplateReq();
    message.templateId = object.templateId ?? "";
    message.html = object.html ?? "";
    message.title = object.title ?? "";
    return message;
  },
};

function createBaseUpdateTemplateRes(): UpdateTemplateRes {
  return { template: undefined };
}

export const UpdateTemplateRes = {
  encode(
    message: UpdateTemplateRes,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.template !== undefined) {
      Template.encode(message.template, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateTemplateRes {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateTemplateRes();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.template = Template.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpdateTemplateRes {
    return {
      template: isSet(object.template)
        ? Template.fromJSON(object.template)
        : undefined,
    };
  },

  toJSON(message: UpdateTemplateRes): unknown {
    const obj: any = {};
    message.template !== undefined &&
      (obj.template = message.template
        ? Template.toJSON(message.template)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<UpdateTemplateRes>, I>>(
    object: I
  ): UpdateTemplateRes {
    const message = createBaseUpdateTemplateRes();
    message.template =
      object.template !== undefined && object.template !== null
        ? Template.fromPartial(object.template)
        : undefined;
    return message;
  },
};

function createBaseDeleteTemplateReq(): DeleteTemplateReq {
  return { templateId: "" };
}

export const DeleteTemplateReq = {
  encode(
    message: DeleteTemplateReq,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.templateId !== "") {
      writer.uint32(10).string(message.templateId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteTemplateReq {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteTemplateReq();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.templateId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DeleteTemplateReq {
    return {
      templateId: isSet(object.templateId) ? String(object.templateId) : "",
    };
  },

  toJSON(message: DeleteTemplateReq): unknown {
    const obj: any = {};
    message.templateId !== undefined && (obj.templateId = message.templateId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DeleteTemplateReq>, I>>(
    object: I
  ): DeleteTemplateReq {
    const message = createBaseDeleteTemplateReq();
    message.templateId = object.templateId ?? "";
    return message;
  },
};

function createBaseDeleteTemplateRes(): DeleteTemplateRes {
  return { template: undefined };
}

export const DeleteTemplateRes = {
  encode(
    message: DeleteTemplateRes,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.template !== undefined) {
      Template.encode(message.template, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteTemplateRes {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteTemplateRes();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.template = Template.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DeleteTemplateRes {
    return {
      template: isSet(object.template)
        ? Template.fromJSON(object.template)
        : undefined,
    };
  },

  toJSON(message: DeleteTemplateRes): unknown {
    const obj: any = {};
    message.template !== undefined &&
      (obj.template = message.template
        ? Template.toJSON(message.template)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DeleteTemplateRes>, I>>(
    object: I
  ): DeleteTemplateRes {
    const message = createBaseDeleteTemplateRes();
    message.template =
      object.template !== undefined && object.template !== null
        ? Template.fromPartial(object.template)
        : undefined;
    return message;
  },
};

function createBaseGetTemplateReq(): GetTemplateReq {
  return { templateId: "" };
}

export const GetTemplateReq = {
  encode(
    message: GetTemplateReq,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.templateId !== "") {
      writer.uint32(10).string(message.templateId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetTemplateReq {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetTemplateReq();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.templateId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetTemplateReq {
    return {
      templateId: isSet(object.templateId) ? String(object.templateId) : "",
    };
  },

  toJSON(message: GetTemplateReq): unknown {
    const obj: any = {};
    message.templateId !== undefined && (obj.templateId = message.templateId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetTemplateReq>, I>>(
    object: I
  ): GetTemplateReq {
    const message = createBaseGetTemplateReq();
    message.templateId = object.templateId ?? "";
    return message;
  },
};

function createBaseGetTemplateRes(): GetTemplateRes {
  return { template: undefined };
}

export const GetTemplateRes = {
  encode(
    message: GetTemplateRes,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.template !== undefined) {
      Template.encode(message.template, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetTemplateRes {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetTemplateRes();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.template = Template.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetTemplateRes {
    return {
      template: isSet(object.template)
        ? Template.fromJSON(object.template)
        : undefined,
    };
  },

  toJSON(message: GetTemplateRes): unknown {
    const obj: any = {};
    message.template !== undefined &&
      (obj.template = message.template
        ? Template.toJSON(message.template)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetTemplateRes>, I>>(
    object: I
  ): GetTemplateRes {
    const message = createBaseGetTemplateRes();
    message.template =
      object.template !== undefined && object.template !== null
        ? Template.fromPartial(object.template)
        : undefined;
    return message;
  },
};

function createBaseGetTemplatesReq(): GetTemplatesReq {
  return { domain: "", skip: 0, take: 0 };
}

export const GetTemplatesReq = {
  encode(
    message: GetTemplatesReq,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.domain !== "") {
      writer.uint32(10).string(message.domain);
    }
    if (message.skip !== 0) {
      writer.uint32(16).uint32(message.skip);
    }
    if (message.take !== 0) {
      writer.uint32(24).uint32(message.take);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetTemplatesReq {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetTemplatesReq();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.domain = reader.string();
          break;
        case 2:
          message.skip = reader.uint32();
          break;
        case 3:
          message.take = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetTemplatesReq {
    return {
      domain: isSet(object.domain) ? String(object.domain) : "",
      skip: isSet(object.skip) ? Number(object.skip) : 0,
      take: isSet(object.take) ? Number(object.take) : 0,
    };
  },

  toJSON(message: GetTemplatesReq): unknown {
    const obj: any = {};
    message.domain !== undefined && (obj.domain = message.domain);
    message.skip !== undefined && (obj.skip = Math.round(message.skip));
    message.take !== undefined && (obj.take = Math.round(message.take));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetTemplatesReq>, I>>(
    object: I
  ): GetTemplatesReq {
    const message = createBaseGetTemplatesReq();
    message.domain = object.domain ?? "";
    message.skip = object.skip ?? 0;
    message.take = object.take ?? 0;
    return message;
  },
};

function createBaseGetTemplatesRes(): GetTemplatesRes {
  return { templates: [], total: 0 };
}

export const GetTemplatesRes = {
  encode(
    message: GetTemplatesRes,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.templates) {
      Template.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.total !== 0) {
      writer.uint32(16).uint32(message.total);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetTemplatesRes {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetTemplatesRes();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.templates.push(Template.decode(reader, reader.uint32()));
          break;
        case 2:
          message.total = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetTemplatesRes {
    return {
      templates: Array.isArray(object?.templates)
        ? object.templates.map((e: any) => Template.fromJSON(e))
        : [],
      total: isSet(object.total) ? Number(object.total) : 0,
    };
  },

  toJSON(message: GetTemplatesRes): unknown {
    const obj: any = {};
    if (message.templates) {
      obj.templates = message.templates.map((e) =>
        e ? Template.toJSON(e) : undefined
      );
    } else {
      obj.templates = [];
    }
    message.total !== undefined && (obj.total = Math.round(message.total));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetTemplatesRes>, I>>(
    object: I
  ): GetTemplatesRes {
    const message = createBaseGetTemplatesRes();
    message.templates =
      object.templates?.map((e) => Template.fromPartial(e)) || [];
    message.total = object.total ?? 0;
    return message;
  },
};

export type ApiService = typeof ApiService;
export const ApiService = {
  getDomains: {
    path: "/kannon.Api/GetDomains",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: GetDomainsReq) =>
      Buffer.from(GetDomainsReq.encode(value).finish()),
    requestDeserialize: (value: Buffer) => GetDomainsReq.decode(value),
    responseSerialize: (value: GetDomainsResponse) =>
      Buffer.from(GetDomainsResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => GetDomainsResponse.decode(value),
  },
  createDomain: {
    path: "/kannon.Api/CreateDomain",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: CreateDomainRequest) =>
      Buffer.from(CreateDomainRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => CreateDomainRequest.decode(value),
    responseSerialize: (value: Domain) =>
      Buffer.from(Domain.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Domain.decode(value),
  },
  regenerateDomainKey: {
    path: "/kannon.Api/RegenerateDomainKey",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: RegenerateDomainKeyRequest) =>
      Buffer.from(RegenerateDomainKeyRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) =>
      RegenerateDomainKeyRequest.decode(value),
    responseSerialize: (value: Domain) =>
      Buffer.from(Domain.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Domain.decode(value),
  },
  createTemplate: {
    path: "/kannon.Api/CreateTemplate",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: CreateTemplateReq) =>
      Buffer.from(CreateTemplateReq.encode(value).finish()),
    requestDeserialize: (value: Buffer) => CreateTemplateReq.decode(value),
    responseSerialize: (value: CreateTemplateRes) =>
      Buffer.from(CreateTemplateRes.encode(value).finish()),
    responseDeserialize: (value: Buffer) => CreateTemplateRes.decode(value),
  },
  updateTemplate: {
    path: "/kannon.Api/UpdateTemplate",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: UpdateTemplateReq) =>
      Buffer.from(UpdateTemplateReq.encode(value).finish()),
    requestDeserialize: (value: Buffer) => UpdateTemplateReq.decode(value),
    responseSerialize: (value: UpdateTemplateRes) =>
      Buffer.from(UpdateTemplateRes.encode(value).finish()),
    responseDeserialize: (value: Buffer) => UpdateTemplateRes.decode(value),
  },
  deleteTemplate: {
    path: "/kannon.Api/DeleteTemplate",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: DeleteTemplateReq) =>
      Buffer.from(DeleteTemplateReq.encode(value).finish()),
    requestDeserialize: (value: Buffer) => DeleteTemplateReq.decode(value),
    responseSerialize: (value: DeleteTemplateRes) =>
      Buffer.from(DeleteTemplateRes.encode(value).finish()),
    responseDeserialize: (value: Buffer) => DeleteTemplateRes.decode(value),
  },
  getTemplate: {
    path: "/kannon.Api/GetTemplate",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: GetTemplateReq) =>
      Buffer.from(GetTemplateReq.encode(value).finish()),
    requestDeserialize: (value: Buffer) => GetTemplateReq.decode(value),
    responseSerialize: (value: GetTemplateRes) =>
      Buffer.from(GetTemplateRes.encode(value).finish()),
    responseDeserialize: (value: Buffer) => GetTemplateRes.decode(value),
  },
  getTemplates: {
    path: "/kannon.Api/GetTemplates",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: GetTemplatesReq) =>
      Buffer.from(GetTemplatesReq.encode(value).finish()),
    requestDeserialize: (value: Buffer) => GetTemplatesReq.decode(value),
    responseSerialize: (value: GetTemplatesRes) =>
      Buffer.from(GetTemplatesRes.encode(value).finish()),
    responseDeserialize: (value: Buffer) => GetTemplatesRes.decode(value),
  },
} as const;

export interface ApiServer extends UntypedServiceImplementation {
  getDomains: handleUnaryCall<GetDomainsReq, GetDomainsResponse>;
  createDomain: handleUnaryCall<CreateDomainRequest, Domain>;
  regenerateDomainKey: handleUnaryCall<RegenerateDomainKeyRequest, Domain>;
  createTemplate: handleUnaryCall<CreateTemplateReq, CreateTemplateRes>;
  updateTemplate: handleUnaryCall<UpdateTemplateReq, UpdateTemplateRes>;
  deleteTemplate: handleUnaryCall<DeleteTemplateReq, DeleteTemplateRes>;
  getTemplate: handleUnaryCall<GetTemplateReq, GetTemplateRes>;
  getTemplates: handleUnaryCall<GetTemplatesReq, GetTemplatesRes>;
}

export interface ApiClient extends Client {
  getDomains(
    request: GetDomainsReq,
    callback: (error: ServiceError | null, response: GetDomainsResponse) => void
  ): ClientUnaryCall;
  getDomains(
    request: GetDomainsReq,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: GetDomainsResponse) => void
  ): ClientUnaryCall;
  getDomains(
    request: GetDomainsReq,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: GetDomainsResponse) => void
  ): ClientUnaryCall;
  createDomain(
    request: CreateDomainRequest,
    callback: (error: ServiceError | null, response: Domain) => void
  ): ClientUnaryCall;
  createDomain(
    request: CreateDomainRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: Domain) => void
  ): ClientUnaryCall;
  createDomain(
    request: CreateDomainRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: Domain) => void
  ): ClientUnaryCall;
  regenerateDomainKey(
    request: RegenerateDomainKeyRequest,
    callback: (error: ServiceError | null, response: Domain) => void
  ): ClientUnaryCall;
  regenerateDomainKey(
    request: RegenerateDomainKeyRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: Domain) => void
  ): ClientUnaryCall;
  regenerateDomainKey(
    request: RegenerateDomainKeyRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: Domain) => void
  ): ClientUnaryCall;
  createTemplate(
    request: CreateTemplateReq,
    callback: (error: ServiceError | null, response: CreateTemplateRes) => void
  ): ClientUnaryCall;
  createTemplate(
    request: CreateTemplateReq,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: CreateTemplateRes) => void
  ): ClientUnaryCall;
  createTemplate(
    request: CreateTemplateReq,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: CreateTemplateRes) => void
  ): ClientUnaryCall;
  updateTemplate(
    request: UpdateTemplateReq,
    callback: (error: ServiceError | null, response: UpdateTemplateRes) => void
  ): ClientUnaryCall;
  updateTemplate(
    request: UpdateTemplateReq,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: UpdateTemplateRes) => void
  ): ClientUnaryCall;
  updateTemplate(
    request: UpdateTemplateReq,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: UpdateTemplateRes) => void
  ): ClientUnaryCall;
  deleteTemplate(
    request: DeleteTemplateReq,
    callback: (error: ServiceError | null, response: DeleteTemplateRes) => void
  ): ClientUnaryCall;
  deleteTemplate(
    request: DeleteTemplateReq,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: DeleteTemplateRes) => void
  ): ClientUnaryCall;
  deleteTemplate(
    request: DeleteTemplateReq,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: DeleteTemplateRes) => void
  ): ClientUnaryCall;
  getTemplate(
    request: GetTemplateReq,
    callback: (error: ServiceError | null, response: GetTemplateRes) => void
  ): ClientUnaryCall;
  getTemplate(
    request: GetTemplateReq,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: GetTemplateRes) => void
  ): ClientUnaryCall;
  getTemplate(
    request: GetTemplateReq,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: GetTemplateRes) => void
  ): ClientUnaryCall;
  getTemplates(
    request: GetTemplatesReq,
    callback: (error: ServiceError | null, response: GetTemplatesRes) => void
  ): ClientUnaryCall;
  getTemplates(
    request: GetTemplatesReq,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: GetTemplatesRes) => void
  ): ClientUnaryCall;
  getTemplates(
    request: GetTemplatesReq,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: GetTemplatesRes) => void
  ): ClientUnaryCall;
}

export const ApiClient = makeGenericClientConstructor(
  ApiService,
  "kannon.Api"
) as unknown as {
  new (
    address: string,
    credentials: ChannelCredentials,
    options?: Partial<ChannelOptions>
  ): ApiClient;
  service: typeof ApiService;
};

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined;

export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & Record<
        Exclude<keyof I, KeysOfUnion<P>>,
        never
      >;

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
