// package: cosmos.group.v1beta1
// file: cosmos/group/v1beta1/tx.proto

import * as jspb from "google-protobuf";
import * as gogoproto_gogo_pb from "../../../gogoproto/gogo_pb";
import * as cosmos_proto_cosmos_pb from "../../../cosmos_proto/cosmos_pb";
import * as google_protobuf_any_pb from "google-protobuf/google/protobuf/any_pb";
import * as cosmos_group_v1beta1_types_pb from "../../../cosmos/group/v1beta1/types_pb";

export class MsgCreateGroupRequest extends jspb.Message {
  getAdmin(): string;
  setAdmin(value: string): void;

  clearMembersList(): void;
  getMembersList(): Array<cosmos_group_v1beta1_types_pb.Member>;
  setMembersList(value: Array<cosmos_group_v1beta1_types_pb.Member>): void;
  addMembers(value?: cosmos_group_v1beta1_types_pb.Member, index?: number): cosmos_group_v1beta1_types_pb.Member;

  getMetadata(): Uint8Array | string;
  getMetadata_asU8(): Uint8Array;
  getMetadata_asB64(): string;
  setMetadata(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MsgCreateGroupRequest.AsObject;
  static toObject(includeInstance: boolean, msg: MsgCreateGroupRequest): MsgCreateGroupRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: MsgCreateGroupRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MsgCreateGroupRequest;
  static deserializeBinaryFromReader(message: MsgCreateGroupRequest, reader: jspb.BinaryReader): MsgCreateGroupRequest;
}

export namespace MsgCreateGroupRequest {
  export type AsObject = {
    admin: string,
    membersList: Array<cosmos_group_v1beta1_types_pb.Member.AsObject>,
    metadata: Uint8Array | string,
  }
}

export class MsgCreateGroupResponse extends jspb.Message {
  getGroupId(): number;
  setGroupId(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MsgCreateGroupResponse.AsObject;
  static toObject(includeInstance: boolean, msg: MsgCreateGroupResponse): MsgCreateGroupResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: MsgCreateGroupResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MsgCreateGroupResponse;
  static deserializeBinaryFromReader(message: MsgCreateGroupResponse, reader: jspb.BinaryReader): MsgCreateGroupResponse;
}

export namespace MsgCreateGroupResponse {
  export type AsObject = {
    groupId: number,
  }
}

export class MsgUpdateGroupMembersRequest extends jspb.Message {
  getAdmin(): string;
  setAdmin(value: string): void;

  getGroupId(): number;
  setGroupId(value: number): void;

  clearMemberUpdatesList(): void;
  getMemberUpdatesList(): Array<cosmos_group_v1beta1_types_pb.Member>;
  setMemberUpdatesList(value: Array<cosmos_group_v1beta1_types_pb.Member>): void;
  addMemberUpdates(value?: cosmos_group_v1beta1_types_pb.Member, index?: number): cosmos_group_v1beta1_types_pb.Member;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MsgUpdateGroupMembersRequest.AsObject;
  static toObject(includeInstance: boolean, msg: MsgUpdateGroupMembersRequest): MsgUpdateGroupMembersRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: MsgUpdateGroupMembersRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MsgUpdateGroupMembersRequest;
  static deserializeBinaryFromReader(message: MsgUpdateGroupMembersRequest, reader: jspb.BinaryReader): MsgUpdateGroupMembersRequest;
}

export namespace MsgUpdateGroupMembersRequest {
  export type AsObject = {
    admin: string,
    groupId: number,
    memberUpdatesList: Array<cosmos_group_v1beta1_types_pb.Member.AsObject>,
  }
}

export class MsgUpdateGroupMembersResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MsgUpdateGroupMembersResponse.AsObject;
  static toObject(includeInstance: boolean, msg: MsgUpdateGroupMembersResponse): MsgUpdateGroupMembersResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: MsgUpdateGroupMembersResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MsgUpdateGroupMembersResponse;
  static deserializeBinaryFromReader(message: MsgUpdateGroupMembersResponse, reader: jspb.BinaryReader): MsgUpdateGroupMembersResponse;
}

export namespace MsgUpdateGroupMembersResponse {
  export type AsObject = {
  }
}

export class MsgUpdateGroupAdminRequest extends jspb.Message {
  getAdmin(): string;
  setAdmin(value: string): void;

  getGroupId(): number;
  setGroupId(value: number): void;

  getNewAdmin(): string;
  setNewAdmin(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MsgUpdateGroupAdminRequest.AsObject;
  static toObject(includeInstance: boolean, msg: MsgUpdateGroupAdminRequest): MsgUpdateGroupAdminRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: MsgUpdateGroupAdminRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MsgUpdateGroupAdminRequest;
  static deserializeBinaryFromReader(message: MsgUpdateGroupAdminRequest, reader: jspb.BinaryReader): MsgUpdateGroupAdminRequest;
}

export namespace MsgUpdateGroupAdminRequest {
  export type AsObject = {
    admin: string,
    groupId: number,
    newAdmin: string,
  }
}

export class MsgUpdateGroupAdminResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MsgUpdateGroupAdminResponse.AsObject;
  static toObject(includeInstance: boolean, msg: MsgUpdateGroupAdminResponse): MsgUpdateGroupAdminResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: MsgUpdateGroupAdminResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MsgUpdateGroupAdminResponse;
  static deserializeBinaryFromReader(message: MsgUpdateGroupAdminResponse, reader: jspb.BinaryReader): MsgUpdateGroupAdminResponse;
}

export namespace MsgUpdateGroupAdminResponse {
  export type AsObject = {
  }
}

export class MsgUpdateGroupMetadataRequest extends jspb.Message {
  getAdmin(): string;
  setAdmin(value: string): void;

  getGroupId(): number;
  setGroupId(value: number): void;

  getMetadata(): Uint8Array | string;
  getMetadata_asU8(): Uint8Array;
  getMetadata_asB64(): string;
  setMetadata(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MsgUpdateGroupMetadataRequest.AsObject;
  static toObject(includeInstance: boolean, msg: MsgUpdateGroupMetadataRequest): MsgUpdateGroupMetadataRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: MsgUpdateGroupMetadataRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MsgUpdateGroupMetadataRequest;
  static deserializeBinaryFromReader(message: MsgUpdateGroupMetadataRequest, reader: jspb.BinaryReader): MsgUpdateGroupMetadataRequest;
}

export namespace MsgUpdateGroupMetadataRequest {
  export type AsObject = {
    admin: string,
    groupId: number,
    metadata: Uint8Array | string,
  }
}

export class MsgUpdateGroupMetadataResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MsgUpdateGroupMetadataResponse.AsObject;
  static toObject(includeInstance: boolean, msg: MsgUpdateGroupMetadataResponse): MsgUpdateGroupMetadataResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: MsgUpdateGroupMetadataResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MsgUpdateGroupMetadataResponse;
  static deserializeBinaryFromReader(message: MsgUpdateGroupMetadataResponse, reader: jspb.BinaryReader): MsgUpdateGroupMetadataResponse;
}

export namespace MsgUpdateGroupMetadataResponse {
  export type AsObject = {
  }
}

export class MsgCreateGroupAccountRequest extends jspb.Message {
  getAdmin(): string;
  setAdmin(value: string): void;

  getGroupId(): number;
  setGroupId(value: number): void;

  getMetadata(): Uint8Array | string;
  getMetadata_asU8(): Uint8Array;
  getMetadata_asB64(): string;
  setMetadata(value: Uint8Array | string): void;

  hasDecisionPolicy(): boolean;
  clearDecisionPolicy(): void;
  getDecisionPolicy(): google_protobuf_any_pb.Any | undefined;
  setDecisionPolicy(value?: google_protobuf_any_pb.Any): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MsgCreateGroupAccountRequest.AsObject;
  static toObject(includeInstance: boolean, msg: MsgCreateGroupAccountRequest): MsgCreateGroupAccountRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: MsgCreateGroupAccountRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MsgCreateGroupAccountRequest;
  static deserializeBinaryFromReader(message: MsgCreateGroupAccountRequest, reader: jspb.BinaryReader): MsgCreateGroupAccountRequest;
}

export namespace MsgCreateGroupAccountRequest {
  export type AsObject = {
    admin: string,
    groupId: number,
    metadata: Uint8Array | string,
    decisionPolicy?: google_protobuf_any_pb.Any.AsObject,
  }
}

export class MsgCreateGroupAccountResponse extends jspb.Message {
  getAddress(): string;
  setAddress(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MsgCreateGroupAccountResponse.AsObject;
  static toObject(includeInstance: boolean, msg: MsgCreateGroupAccountResponse): MsgCreateGroupAccountResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: MsgCreateGroupAccountResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MsgCreateGroupAccountResponse;
  static deserializeBinaryFromReader(message: MsgCreateGroupAccountResponse, reader: jspb.BinaryReader): MsgCreateGroupAccountResponse;
}

export namespace MsgCreateGroupAccountResponse {
  export type AsObject = {
    address: string,
  }
}

export class MsgUpdateGroupAccountAdminRequest extends jspb.Message {
  getAdmin(): string;
  setAdmin(value: string): void;

  getAddress(): string;
  setAddress(value: string): void;

  getNewAdmin(): string;
  setNewAdmin(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MsgUpdateGroupAccountAdminRequest.AsObject;
  static toObject(includeInstance: boolean, msg: MsgUpdateGroupAccountAdminRequest): MsgUpdateGroupAccountAdminRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: MsgUpdateGroupAccountAdminRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MsgUpdateGroupAccountAdminRequest;
  static deserializeBinaryFromReader(message: MsgUpdateGroupAccountAdminRequest, reader: jspb.BinaryReader): MsgUpdateGroupAccountAdminRequest;
}

export namespace MsgUpdateGroupAccountAdminRequest {
  export type AsObject = {
    admin: string,
    address: string,
    newAdmin: string,
  }
}

export class MsgUpdateGroupAccountAdminResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MsgUpdateGroupAccountAdminResponse.AsObject;
  static toObject(includeInstance: boolean, msg: MsgUpdateGroupAccountAdminResponse): MsgUpdateGroupAccountAdminResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: MsgUpdateGroupAccountAdminResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MsgUpdateGroupAccountAdminResponse;
  static deserializeBinaryFromReader(message: MsgUpdateGroupAccountAdminResponse, reader: jspb.BinaryReader): MsgUpdateGroupAccountAdminResponse;
}

export namespace MsgUpdateGroupAccountAdminResponse {
  export type AsObject = {
  }
}

export class MsgUpdateGroupAccountDecisionPolicyRequest extends jspb.Message {
  getAdmin(): string;
  setAdmin(value: string): void;

  getAddress(): string;
  setAddress(value: string): void;

  hasDecisionPolicy(): boolean;
  clearDecisionPolicy(): void;
  getDecisionPolicy(): google_protobuf_any_pb.Any | undefined;
  setDecisionPolicy(value?: google_protobuf_any_pb.Any): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MsgUpdateGroupAccountDecisionPolicyRequest.AsObject;
  static toObject(includeInstance: boolean, msg: MsgUpdateGroupAccountDecisionPolicyRequest): MsgUpdateGroupAccountDecisionPolicyRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: MsgUpdateGroupAccountDecisionPolicyRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MsgUpdateGroupAccountDecisionPolicyRequest;
  static deserializeBinaryFromReader(message: MsgUpdateGroupAccountDecisionPolicyRequest, reader: jspb.BinaryReader): MsgUpdateGroupAccountDecisionPolicyRequest;
}

export namespace MsgUpdateGroupAccountDecisionPolicyRequest {
  export type AsObject = {
    admin: string,
    address: string,
    decisionPolicy?: google_protobuf_any_pb.Any.AsObject,
  }
}

export class MsgUpdateGroupAccountDecisionPolicyResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MsgUpdateGroupAccountDecisionPolicyResponse.AsObject;
  static toObject(includeInstance: boolean, msg: MsgUpdateGroupAccountDecisionPolicyResponse): MsgUpdateGroupAccountDecisionPolicyResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: MsgUpdateGroupAccountDecisionPolicyResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MsgUpdateGroupAccountDecisionPolicyResponse;
  static deserializeBinaryFromReader(message: MsgUpdateGroupAccountDecisionPolicyResponse, reader: jspb.BinaryReader): MsgUpdateGroupAccountDecisionPolicyResponse;
}

export namespace MsgUpdateGroupAccountDecisionPolicyResponse {
  export type AsObject = {
  }
}

export class MsgUpdateGroupAccountMetadataRequest extends jspb.Message {
  getAdmin(): string;
  setAdmin(value: string): void;

  getAddress(): string;
  setAddress(value: string): void;

  getMetadata(): Uint8Array | string;
  getMetadata_asU8(): Uint8Array;
  getMetadata_asB64(): string;
  setMetadata(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MsgUpdateGroupAccountMetadataRequest.AsObject;
  static toObject(includeInstance: boolean, msg: MsgUpdateGroupAccountMetadataRequest): MsgUpdateGroupAccountMetadataRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: MsgUpdateGroupAccountMetadataRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MsgUpdateGroupAccountMetadataRequest;
  static deserializeBinaryFromReader(message: MsgUpdateGroupAccountMetadataRequest, reader: jspb.BinaryReader): MsgUpdateGroupAccountMetadataRequest;
}

export namespace MsgUpdateGroupAccountMetadataRequest {
  export type AsObject = {
    admin: string,
    address: string,
    metadata: Uint8Array | string,
  }
}

export class MsgUpdateGroupAccountMetadataResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MsgUpdateGroupAccountMetadataResponse.AsObject;
  static toObject(includeInstance: boolean, msg: MsgUpdateGroupAccountMetadataResponse): MsgUpdateGroupAccountMetadataResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: MsgUpdateGroupAccountMetadataResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MsgUpdateGroupAccountMetadataResponse;
  static deserializeBinaryFromReader(message: MsgUpdateGroupAccountMetadataResponse, reader: jspb.BinaryReader): MsgUpdateGroupAccountMetadataResponse;
}

export namespace MsgUpdateGroupAccountMetadataResponse {
  export type AsObject = {
  }
}

export class MsgCreateProposalRequest extends jspb.Message {
  getAddress(): string;
  setAddress(value: string): void;

  clearProposersList(): void;
  getProposersList(): Array<string>;
  setProposersList(value: Array<string>): void;
  addProposers(value: string, index?: number): string;

  getMetadata(): Uint8Array | string;
  getMetadata_asU8(): Uint8Array;
  getMetadata_asB64(): string;
  setMetadata(value: Uint8Array | string): void;

  clearMsgsList(): void;
  getMsgsList(): Array<google_protobuf_any_pb.Any>;
  setMsgsList(value: Array<google_protobuf_any_pb.Any>): void;
  addMsgs(value?: google_protobuf_any_pb.Any, index?: number): google_protobuf_any_pb.Any;

  getExec(): ExecMap[keyof ExecMap];
  setExec(value: ExecMap[keyof ExecMap]): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MsgCreateProposalRequest.AsObject;
  static toObject(includeInstance: boolean, msg: MsgCreateProposalRequest): MsgCreateProposalRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: MsgCreateProposalRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MsgCreateProposalRequest;
  static deserializeBinaryFromReader(message: MsgCreateProposalRequest, reader: jspb.BinaryReader): MsgCreateProposalRequest;
}

export namespace MsgCreateProposalRequest {
  export type AsObject = {
    address: string,
    proposersList: Array<string>,
    metadata: Uint8Array | string,
    msgsList: Array<google_protobuf_any_pb.Any.AsObject>,
    exec: ExecMap[keyof ExecMap],
  }
}

export class MsgCreateProposalResponse extends jspb.Message {
  getProposalId(): number;
  setProposalId(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MsgCreateProposalResponse.AsObject;
  static toObject(includeInstance: boolean, msg: MsgCreateProposalResponse): MsgCreateProposalResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: MsgCreateProposalResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MsgCreateProposalResponse;
  static deserializeBinaryFromReader(message: MsgCreateProposalResponse, reader: jspb.BinaryReader): MsgCreateProposalResponse;
}

export namespace MsgCreateProposalResponse {
  export type AsObject = {
    proposalId: number,
  }
}

export class MsgVoteRequest extends jspb.Message {
  getProposalId(): number;
  setProposalId(value: number): void;

  getVoter(): string;
  setVoter(value: string): void;

  getChoice(): cosmos_group_v1beta1_types_pb.ChoiceMap[keyof cosmos_group_v1beta1_types_pb.ChoiceMap];
  setChoice(value: cosmos_group_v1beta1_types_pb.ChoiceMap[keyof cosmos_group_v1beta1_types_pb.ChoiceMap]): void;

  getMetadata(): Uint8Array | string;
  getMetadata_asU8(): Uint8Array;
  getMetadata_asB64(): string;
  setMetadata(value: Uint8Array | string): void;

  getExec(): ExecMap[keyof ExecMap];
  setExec(value: ExecMap[keyof ExecMap]): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MsgVoteRequest.AsObject;
  static toObject(includeInstance: boolean, msg: MsgVoteRequest): MsgVoteRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: MsgVoteRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MsgVoteRequest;
  static deserializeBinaryFromReader(message: MsgVoteRequest, reader: jspb.BinaryReader): MsgVoteRequest;
}

export namespace MsgVoteRequest {
  export type AsObject = {
    proposalId: number,
    voter: string,
    choice: cosmos_group_v1beta1_types_pb.ChoiceMap[keyof cosmos_group_v1beta1_types_pb.ChoiceMap],
    metadata: Uint8Array | string,
    exec: ExecMap[keyof ExecMap],
  }
}

export class MsgVoteResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MsgVoteResponse.AsObject;
  static toObject(includeInstance: boolean, msg: MsgVoteResponse): MsgVoteResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: MsgVoteResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MsgVoteResponse;
  static deserializeBinaryFromReader(message: MsgVoteResponse, reader: jspb.BinaryReader): MsgVoteResponse;
}

export namespace MsgVoteResponse {
  export type AsObject = {
  }
}

export class MsgExecRequest extends jspb.Message {
  getProposalId(): number;
  setProposalId(value: number): void;

  getSigner(): string;
  setSigner(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MsgExecRequest.AsObject;
  static toObject(includeInstance: boolean, msg: MsgExecRequest): MsgExecRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: MsgExecRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MsgExecRequest;
  static deserializeBinaryFromReader(message: MsgExecRequest, reader: jspb.BinaryReader): MsgExecRequest;
}

export namespace MsgExecRequest {
  export type AsObject = {
    proposalId: number,
    signer: string,
  }
}

export class MsgExecResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MsgExecResponse.AsObject;
  static toObject(includeInstance: boolean, msg: MsgExecResponse): MsgExecResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: MsgExecResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MsgExecResponse;
  static deserializeBinaryFromReader(message: MsgExecResponse, reader: jspb.BinaryReader): MsgExecResponse;
}

export namespace MsgExecResponse {
  export type AsObject = {
  }
}

export interface ExecMap {
  EXEC_UNSPECIFIED: 0;
  EXEC_TRY: 1;
}

export const Exec: ExecMap;

