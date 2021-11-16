// package: cosmos.group.v1beta1
// file: cosmos/group/v1beta1/query.proto

import * as jspb from "google-protobuf";
import * as cosmos_group_v1beta1_types_pb from "../../../cosmos/group/v1beta1/types_pb";
import * as gogoproto_gogo_pb from "../../../gogoproto/gogo_pb";
import * as cosmos_base_query_v1beta1_pagination_pb from "../../../cosmos/base/query/v1beta1/pagination_pb";
import * as cosmos_proto_cosmos_pb from "../../../cosmos_proto/cosmos_pb";

export class QueryGroupInfoRequest extends jspb.Message {
  getGroupId(): number;
  setGroupId(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): QueryGroupInfoRequest.AsObject;
  static toObject(includeInstance: boolean, msg: QueryGroupInfoRequest): QueryGroupInfoRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: QueryGroupInfoRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): QueryGroupInfoRequest;
  static deserializeBinaryFromReader(message: QueryGroupInfoRequest, reader: jspb.BinaryReader): QueryGroupInfoRequest;
}

export namespace QueryGroupInfoRequest {
  export type AsObject = {
    groupId: number,
  }
}

export class QueryGroupInfoResponse extends jspb.Message {
  hasInfo(): boolean;
  clearInfo(): void;
  getInfo(): cosmos_group_v1beta1_types_pb.GroupInfo | undefined;
  setInfo(value?: cosmos_group_v1beta1_types_pb.GroupInfo): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): QueryGroupInfoResponse.AsObject;
  static toObject(includeInstance: boolean, msg: QueryGroupInfoResponse): QueryGroupInfoResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: QueryGroupInfoResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): QueryGroupInfoResponse;
  static deserializeBinaryFromReader(message: QueryGroupInfoResponse, reader: jspb.BinaryReader): QueryGroupInfoResponse;
}

export namespace QueryGroupInfoResponse {
  export type AsObject = {
    info?: cosmos_group_v1beta1_types_pb.GroupInfo.AsObject,
  }
}

export class QueryGroupAccountInfoRequest extends jspb.Message {
  getAddress(): string;
  setAddress(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): QueryGroupAccountInfoRequest.AsObject;
  static toObject(includeInstance: boolean, msg: QueryGroupAccountInfoRequest): QueryGroupAccountInfoRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: QueryGroupAccountInfoRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): QueryGroupAccountInfoRequest;
  static deserializeBinaryFromReader(message: QueryGroupAccountInfoRequest, reader: jspb.BinaryReader): QueryGroupAccountInfoRequest;
}

export namespace QueryGroupAccountInfoRequest {
  export type AsObject = {
    address: string,
  }
}

export class QueryGroupAccountInfoResponse extends jspb.Message {
  hasInfo(): boolean;
  clearInfo(): void;
  getInfo(): cosmos_group_v1beta1_types_pb.GroupAccountInfo | undefined;
  setInfo(value?: cosmos_group_v1beta1_types_pb.GroupAccountInfo): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): QueryGroupAccountInfoResponse.AsObject;
  static toObject(includeInstance: boolean, msg: QueryGroupAccountInfoResponse): QueryGroupAccountInfoResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: QueryGroupAccountInfoResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): QueryGroupAccountInfoResponse;
  static deserializeBinaryFromReader(message: QueryGroupAccountInfoResponse, reader: jspb.BinaryReader): QueryGroupAccountInfoResponse;
}

export namespace QueryGroupAccountInfoResponse {
  export type AsObject = {
    info?: cosmos_group_v1beta1_types_pb.GroupAccountInfo.AsObject,
  }
}

export class QueryGroupMembersRequest extends jspb.Message {
  getGroupId(): number;
  setGroupId(value: number): void;

  hasPagination(): boolean;
  clearPagination(): void;
  getPagination(): cosmos_base_query_v1beta1_pagination_pb.PageRequest | undefined;
  setPagination(value?: cosmos_base_query_v1beta1_pagination_pb.PageRequest): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): QueryGroupMembersRequest.AsObject;
  static toObject(includeInstance: boolean, msg: QueryGroupMembersRequest): QueryGroupMembersRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: QueryGroupMembersRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): QueryGroupMembersRequest;
  static deserializeBinaryFromReader(message: QueryGroupMembersRequest, reader: jspb.BinaryReader): QueryGroupMembersRequest;
}

export namespace QueryGroupMembersRequest {
  export type AsObject = {
    groupId: number,
    pagination?: cosmos_base_query_v1beta1_pagination_pb.PageRequest.AsObject,
  }
}

export class QueryGroupMembersResponse extends jspb.Message {
  clearMembersList(): void;
  getMembersList(): Array<cosmos_group_v1beta1_types_pb.GroupMember>;
  setMembersList(value: Array<cosmos_group_v1beta1_types_pb.GroupMember>): void;
  addMembers(value?: cosmos_group_v1beta1_types_pb.GroupMember, index?: number): cosmos_group_v1beta1_types_pb.GroupMember;

  hasPagination(): boolean;
  clearPagination(): void;
  getPagination(): cosmos_base_query_v1beta1_pagination_pb.PageResponse | undefined;
  setPagination(value?: cosmos_base_query_v1beta1_pagination_pb.PageResponse): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): QueryGroupMembersResponse.AsObject;
  static toObject(includeInstance: boolean, msg: QueryGroupMembersResponse): QueryGroupMembersResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: QueryGroupMembersResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): QueryGroupMembersResponse;
  static deserializeBinaryFromReader(message: QueryGroupMembersResponse, reader: jspb.BinaryReader): QueryGroupMembersResponse;
}

export namespace QueryGroupMembersResponse {
  export type AsObject = {
    membersList: Array<cosmos_group_v1beta1_types_pb.GroupMember.AsObject>,
    pagination?: cosmos_base_query_v1beta1_pagination_pb.PageResponse.AsObject,
  }
}

export class QueryGroupsByAdminRequest extends jspb.Message {
  getAdmin(): string;
  setAdmin(value: string): void;

  hasPagination(): boolean;
  clearPagination(): void;
  getPagination(): cosmos_base_query_v1beta1_pagination_pb.PageRequest | undefined;
  setPagination(value?: cosmos_base_query_v1beta1_pagination_pb.PageRequest): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): QueryGroupsByAdminRequest.AsObject;
  static toObject(includeInstance: boolean, msg: QueryGroupsByAdminRequest): QueryGroupsByAdminRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: QueryGroupsByAdminRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): QueryGroupsByAdminRequest;
  static deserializeBinaryFromReader(message: QueryGroupsByAdminRequest, reader: jspb.BinaryReader): QueryGroupsByAdminRequest;
}

export namespace QueryGroupsByAdminRequest {
  export type AsObject = {
    admin: string,
    pagination?: cosmos_base_query_v1beta1_pagination_pb.PageRequest.AsObject,
  }
}

export class QueryGroupsByAdminResponse extends jspb.Message {
  clearGroupsList(): void;
  getGroupsList(): Array<cosmos_group_v1beta1_types_pb.GroupInfo>;
  setGroupsList(value: Array<cosmos_group_v1beta1_types_pb.GroupInfo>): void;
  addGroups(value?: cosmos_group_v1beta1_types_pb.GroupInfo, index?: number): cosmos_group_v1beta1_types_pb.GroupInfo;

  hasPagination(): boolean;
  clearPagination(): void;
  getPagination(): cosmos_base_query_v1beta1_pagination_pb.PageResponse | undefined;
  setPagination(value?: cosmos_base_query_v1beta1_pagination_pb.PageResponse): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): QueryGroupsByAdminResponse.AsObject;
  static toObject(includeInstance: boolean, msg: QueryGroupsByAdminResponse): QueryGroupsByAdminResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: QueryGroupsByAdminResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): QueryGroupsByAdminResponse;
  static deserializeBinaryFromReader(message: QueryGroupsByAdminResponse, reader: jspb.BinaryReader): QueryGroupsByAdminResponse;
}

export namespace QueryGroupsByAdminResponse {
  export type AsObject = {
    groupsList: Array<cosmos_group_v1beta1_types_pb.GroupInfo.AsObject>,
    pagination?: cosmos_base_query_v1beta1_pagination_pb.PageResponse.AsObject,
  }
}

export class QueryGroupAccountsByGroupRequest extends jspb.Message {
  getGroupId(): number;
  setGroupId(value: number): void;

  hasPagination(): boolean;
  clearPagination(): void;
  getPagination(): cosmos_base_query_v1beta1_pagination_pb.PageRequest | undefined;
  setPagination(value?: cosmos_base_query_v1beta1_pagination_pb.PageRequest): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): QueryGroupAccountsByGroupRequest.AsObject;
  static toObject(includeInstance: boolean, msg: QueryGroupAccountsByGroupRequest): QueryGroupAccountsByGroupRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: QueryGroupAccountsByGroupRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): QueryGroupAccountsByGroupRequest;
  static deserializeBinaryFromReader(message: QueryGroupAccountsByGroupRequest, reader: jspb.BinaryReader): QueryGroupAccountsByGroupRequest;
}

export namespace QueryGroupAccountsByGroupRequest {
  export type AsObject = {
    groupId: number,
    pagination?: cosmos_base_query_v1beta1_pagination_pb.PageRequest.AsObject,
  }
}

export class QueryGroupAccountsByGroupResponse extends jspb.Message {
  clearGroupAccountsList(): void;
  getGroupAccountsList(): Array<cosmos_group_v1beta1_types_pb.GroupAccountInfo>;
  setGroupAccountsList(value: Array<cosmos_group_v1beta1_types_pb.GroupAccountInfo>): void;
  addGroupAccounts(value?: cosmos_group_v1beta1_types_pb.GroupAccountInfo, index?: number): cosmos_group_v1beta1_types_pb.GroupAccountInfo;

  hasPagination(): boolean;
  clearPagination(): void;
  getPagination(): cosmos_base_query_v1beta1_pagination_pb.PageResponse | undefined;
  setPagination(value?: cosmos_base_query_v1beta1_pagination_pb.PageResponse): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): QueryGroupAccountsByGroupResponse.AsObject;
  static toObject(includeInstance: boolean, msg: QueryGroupAccountsByGroupResponse): QueryGroupAccountsByGroupResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: QueryGroupAccountsByGroupResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): QueryGroupAccountsByGroupResponse;
  static deserializeBinaryFromReader(message: QueryGroupAccountsByGroupResponse, reader: jspb.BinaryReader): QueryGroupAccountsByGroupResponse;
}

export namespace QueryGroupAccountsByGroupResponse {
  export type AsObject = {
    groupAccountsList: Array<cosmos_group_v1beta1_types_pb.GroupAccountInfo.AsObject>,
    pagination?: cosmos_base_query_v1beta1_pagination_pb.PageResponse.AsObject,
  }
}

export class QueryGroupAccountsByAdminRequest extends jspb.Message {
  getAdmin(): string;
  setAdmin(value: string): void;

  hasPagination(): boolean;
  clearPagination(): void;
  getPagination(): cosmos_base_query_v1beta1_pagination_pb.PageRequest | undefined;
  setPagination(value?: cosmos_base_query_v1beta1_pagination_pb.PageRequest): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): QueryGroupAccountsByAdminRequest.AsObject;
  static toObject(includeInstance: boolean, msg: QueryGroupAccountsByAdminRequest): QueryGroupAccountsByAdminRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: QueryGroupAccountsByAdminRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): QueryGroupAccountsByAdminRequest;
  static deserializeBinaryFromReader(message: QueryGroupAccountsByAdminRequest, reader: jspb.BinaryReader): QueryGroupAccountsByAdminRequest;
}

export namespace QueryGroupAccountsByAdminRequest {
  export type AsObject = {
    admin: string,
    pagination?: cosmos_base_query_v1beta1_pagination_pb.PageRequest.AsObject,
  }
}

export class QueryGroupAccountsByAdminResponse extends jspb.Message {
  clearGroupAccountsList(): void;
  getGroupAccountsList(): Array<cosmos_group_v1beta1_types_pb.GroupAccountInfo>;
  setGroupAccountsList(value: Array<cosmos_group_v1beta1_types_pb.GroupAccountInfo>): void;
  addGroupAccounts(value?: cosmos_group_v1beta1_types_pb.GroupAccountInfo, index?: number): cosmos_group_v1beta1_types_pb.GroupAccountInfo;

  hasPagination(): boolean;
  clearPagination(): void;
  getPagination(): cosmos_base_query_v1beta1_pagination_pb.PageResponse | undefined;
  setPagination(value?: cosmos_base_query_v1beta1_pagination_pb.PageResponse): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): QueryGroupAccountsByAdminResponse.AsObject;
  static toObject(includeInstance: boolean, msg: QueryGroupAccountsByAdminResponse): QueryGroupAccountsByAdminResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: QueryGroupAccountsByAdminResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): QueryGroupAccountsByAdminResponse;
  static deserializeBinaryFromReader(message: QueryGroupAccountsByAdminResponse, reader: jspb.BinaryReader): QueryGroupAccountsByAdminResponse;
}

export namespace QueryGroupAccountsByAdminResponse {
  export type AsObject = {
    groupAccountsList: Array<cosmos_group_v1beta1_types_pb.GroupAccountInfo.AsObject>,
    pagination?: cosmos_base_query_v1beta1_pagination_pb.PageResponse.AsObject,
  }
}

export class QueryProposalRequest extends jspb.Message {
  getProposalId(): number;
  setProposalId(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): QueryProposalRequest.AsObject;
  static toObject(includeInstance: boolean, msg: QueryProposalRequest): QueryProposalRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: QueryProposalRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): QueryProposalRequest;
  static deserializeBinaryFromReader(message: QueryProposalRequest, reader: jspb.BinaryReader): QueryProposalRequest;
}

export namespace QueryProposalRequest {
  export type AsObject = {
    proposalId: number,
  }
}

export class QueryProposalResponse extends jspb.Message {
  hasProposal(): boolean;
  clearProposal(): void;
  getProposal(): cosmos_group_v1beta1_types_pb.Proposal | undefined;
  setProposal(value?: cosmos_group_v1beta1_types_pb.Proposal): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): QueryProposalResponse.AsObject;
  static toObject(includeInstance: boolean, msg: QueryProposalResponse): QueryProposalResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: QueryProposalResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): QueryProposalResponse;
  static deserializeBinaryFromReader(message: QueryProposalResponse, reader: jspb.BinaryReader): QueryProposalResponse;
}

export namespace QueryProposalResponse {
  export type AsObject = {
    proposal?: cosmos_group_v1beta1_types_pb.Proposal.AsObject,
  }
}

export class QueryProposalsByGroupAccountRequest extends jspb.Message {
  getAddress(): string;
  setAddress(value: string): void;

  hasPagination(): boolean;
  clearPagination(): void;
  getPagination(): cosmos_base_query_v1beta1_pagination_pb.PageRequest | undefined;
  setPagination(value?: cosmos_base_query_v1beta1_pagination_pb.PageRequest): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): QueryProposalsByGroupAccountRequest.AsObject;
  static toObject(includeInstance: boolean, msg: QueryProposalsByGroupAccountRequest): QueryProposalsByGroupAccountRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: QueryProposalsByGroupAccountRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): QueryProposalsByGroupAccountRequest;
  static deserializeBinaryFromReader(message: QueryProposalsByGroupAccountRequest, reader: jspb.BinaryReader): QueryProposalsByGroupAccountRequest;
}

export namespace QueryProposalsByGroupAccountRequest {
  export type AsObject = {
    address: string,
    pagination?: cosmos_base_query_v1beta1_pagination_pb.PageRequest.AsObject,
  }
}

export class QueryProposalsByGroupAccountResponse extends jspb.Message {
  clearProposalsList(): void;
  getProposalsList(): Array<cosmos_group_v1beta1_types_pb.Proposal>;
  setProposalsList(value: Array<cosmos_group_v1beta1_types_pb.Proposal>): void;
  addProposals(value?: cosmos_group_v1beta1_types_pb.Proposal, index?: number): cosmos_group_v1beta1_types_pb.Proposal;

  hasPagination(): boolean;
  clearPagination(): void;
  getPagination(): cosmos_base_query_v1beta1_pagination_pb.PageResponse | undefined;
  setPagination(value?: cosmos_base_query_v1beta1_pagination_pb.PageResponse): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): QueryProposalsByGroupAccountResponse.AsObject;
  static toObject(includeInstance: boolean, msg: QueryProposalsByGroupAccountResponse): QueryProposalsByGroupAccountResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: QueryProposalsByGroupAccountResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): QueryProposalsByGroupAccountResponse;
  static deserializeBinaryFromReader(message: QueryProposalsByGroupAccountResponse, reader: jspb.BinaryReader): QueryProposalsByGroupAccountResponse;
}

export namespace QueryProposalsByGroupAccountResponse {
  export type AsObject = {
    proposalsList: Array<cosmos_group_v1beta1_types_pb.Proposal.AsObject>,
    pagination?: cosmos_base_query_v1beta1_pagination_pb.PageResponse.AsObject,
  }
}

export class QueryVoteByProposalVoterRequest extends jspb.Message {
  getProposalId(): number;
  setProposalId(value: number): void;

  getVoter(): string;
  setVoter(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): QueryVoteByProposalVoterRequest.AsObject;
  static toObject(includeInstance: boolean, msg: QueryVoteByProposalVoterRequest): QueryVoteByProposalVoterRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: QueryVoteByProposalVoterRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): QueryVoteByProposalVoterRequest;
  static deserializeBinaryFromReader(message: QueryVoteByProposalVoterRequest, reader: jspb.BinaryReader): QueryVoteByProposalVoterRequest;
}

export namespace QueryVoteByProposalVoterRequest {
  export type AsObject = {
    proposalId: number,
    voter: string,
  }
}

export class QueryVoteByProposalVoterResponse extends jspb.Message {
  hasVote(): boolean;
  clearVote(): void;
  getVote(): cosmos_group_v1beta1_types_pb.Vote | undefined;
  setVote(value?: cosmos_group_v1beta1_types_pb.Vote): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): QueryVoteByProposalVoterResponse.AsObject;
  static toObject(includeInstance: boolean, msg: QueryVoteByProposalVoterResponse): QueryVoteByProposalVoterResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: QueryVoteByProposalVoterResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): QueryVoteByProposalVoterResponse;
  static deserializeBinaryFromReader(message: QueryVoteByProposalVoterResponse, reader: jspb.BinaryReader): QueryVoteByProposalVoterResponse;
}

export namespace QueryVoteByProposalVoterResponse {
  export type AsObject = {
    vote?: cosmos_group_v1beta1_types_pb.Vote.AsObject,
  }
}

export class QueryVotesByProposalRequest extends jspb.Message {
  getProposalId(): number;
  setProposalId(value: number): void;

  hasPagination(): boolean;
  clearPagination(): void;
  getPagination(): cosmos_base_query_v1beta1_pagination_pb.PageRequest | undefined;
  setPagination(value?: cosmos_base_query_v1beta1_pagination_pb.PageRequest): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): QueryVotesByProposalRequest.AsObject;
  static toObject(includeInstance: boolean, msg: QueryVotesByProposalRequest): QueryVotesByProposalRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: QueryVotesByProposalRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): QueryVotesByProposalRequest;
  static deserializeBinaryFromReader(message: QueryVotesByProposalRequest, reader: jspb.BinaryReader): QueryVotesByProposalRequest;
}

export namespace QueryVotesByProposalRequest {
  export type AsObject = {
    proposalId: number,
    pagination?: cosmos_base_query_v1beta1_pagination_pb.PageRequest.AsObject,
  }
}

export class QueryVotesByProposalResponse extends jspb.Message {
  clearVotesList(): void;
  getVotesList(): Array<cosmos_group_v1beta1_types_pb.Vote>;
  setVotesList(value: Array<cosmos_group_v1beta1_types_pb.Vote>): void;
  addVotes(value?: cosmos_group_v1beta1_types_pb.Vote, index?: number): cosmos_group_v1beta1_types_pb.Vote;

  hasPagination(): boolean;
  clearPagination(): void;
  getPagination(): cosmos_base_query_v1beta1_pagination_pb.PageResponse | undefined;
  setPagination(value?: cosmos_base_query_v1beta1_pagination_pb.PageResponse): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): QueryVotesByProposalResponse.AsObject;
  static toObject(includeInstance: boolean, msg: QueryVotesByProposalResponse): QueryVotesByProposalResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: QueryVotesByProposalResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): QueryVotesByProposalResponse;
  static deserializeBinaryFromReader(message: QueryVotesByProposalResponse, reader: jspb.BinaryReader): QueryVotesByProposalResponse;
}

export namespace QueryVotesByProposalResponse {
  export type AsObject = {
    votesList: Array<cosmos_group_v1beta1_types_pb.Vote.AsObject>,
    pagination?: cosmos_base_query_v1beta1_pagination_pb.PageResponse.AsObject,
  }
}

export class QueryVotesByVoterRequest extends jspb.Message {
  getVoter(): string;
  setVoter(value: string): void;

  hasPagination(): boolean;
  clearPagination(): void;
  getPagination(): cosmos_base_query_v1beta1_pagination_pb.PageRequest | undefined;
  setPagination(value?: cosmos_base_query_v1beta1_pagination_pb.PageRequest): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): QueryVotesByVoterRequest.AsObject;
  static toObject(includeInstance: boolean, msg: QueryVotesByVoterRequest): QueryVotesByVoterRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: QueryVotesByVoterRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): QueryVotesByVoterRequest;
  static deserializeBinaryFromReader(message: QueryVotesByVoterRequest, reader: jspb.BinaryReader): QueryVotesByVoterRequest;
}

export namespace QueryVotesByVoterRequest {
  export type AsObject = {
    voter: string,
    pagination?: cosmos_base_query_v1beta1_pagination_pb.PageRequest.AsObject,
  }
}

export class QueryVotesByVoterResponse extends jspb.Message {
  clearVotesList(): void;
  getVotesList(): Array<cosmos_group_v1beta1_types_pb.Vote>;
  setVotesList(value: Array<cosmos_group_v1beta1_types_pb.Vote>): void;
  addVotes(value?: cosmos_group_v1beta1_types_pb.Vote, index?: number): cosmos_group_v1beta1_types_pb.Vote;

  hasPagination(): boolean;
  clearPagination(): void;
  getPagination(): cosmos_base_query_v1beta1_pagination_pb.PageResponse | undefined;
  setPagination(value?: cosmos_base_query_v1beta1_pagination_pb.PageResponse): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): QueryVotesByVoterResponse.AsObject;
  static toObject(includeInstance: boolean, msg: QueryVotesByVoterResponse): QueryVotesByVoterResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: QueryVotesByVoterResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): QueryVotesByVoterResponse;
  static deserializeBinaryFromReader(message: QueryVotesByVoterResponse, reader: jspb.BinaryReader): QueryVotesByVoterResponse;
}

export namespace QueryVotesByVoterResponse {
  export type AsObject = {
    votesList: Array<cosmos_group_v1beta1_types_pb.Vote.AsObject>,
    pagination?: cosmos_base_query_v1beta1_pagination_pb.PageResponse.AsObject,
  }
}

