// package: cosmos.group.v1beta1
// file: cosmos/group/v1beta1/types.proto

import * as jspb from "google-protobuf";
import * as gogoproto_gogo_pb from "../../../gogoproto/gogo_pb";
import * as google_protobuf_duration_pb from "google-protobuf/google/protobuf/duration_pb";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";
import * as cosmos_proto_cosmos_pb from "../../../cosmos_proto/cosmos_pb";
import * as google_protobuf_any_pb from "google-protobuf/google/protobuf/any_pb";

export class Member extends jspb.Message {
  getAddress(): string;
  setAddress(value: string): void;

  getWeight(): string;
  setWeight(value: string): void;

  getMetadata(): Uint8Array | string;
  getMetadata_asU8(): Uint8Array;
  getMetadata_asB64(): string;
  setMetadata(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Member.AsObject;
  static toObject(includeInstance: boolean, msg: Member): Member.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Member, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Member;
  static deserializeBinaryFromReader(message: Member, reader: jspb.BinaryReader): Member;
}

export namespace Member {
  export type AsObject = {
    address: string,
    weight: string,
    metadata: Uint8Array | string,
  }
}

export class Members extends jspb.Message {
  clearMembersList(): void;
  getMembersList(): Array<Member>;
  setMembersList(value: Array<Member>): void;
  addMembers(value?: Member, index?: number): Member;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Members.AsObject;
  static toObject(includeInstance: boolean, msg: Members): Members.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Members, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Members;
  static deserializeBinaryFromReader(message: Members, reader: jspb.BinaryReader): Members;
}

export namespace Members {
  export type AsObject = {
    membersList: Array<Member.AsObject>,
  }
}

export class ThresholdDecisionPolicy extends jspb.Message {
  getThreshold(): string;
  setThreshold(value: string): void;

  hasTimeout(): boolean;
  clearTimeout(): void;
  getTimeout(): google_protobuf_duration_pb.Duration | undefined;
  setTimeout(value?: google_protobuf_duration_pb.Duration): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ThresholdDecisionPolicy.AsObject;
  static toObject(includeInstance: boolean, msg: ThresholdDecisionPolicy): ThresholdDecisionPolicy.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ThresholdDecisionPolicy, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ThresholdDecisionPolicy;
  static deserializeBinaryFromReader(message: ThresholdDecisionPolicy, reader: jspb.BinaryReader): ThresholdDecisionPolicy;
}

export namespace ThresholdDecisionPolicy {
  export type AsObject = {
    threshold: string,
    timeout?: google_protobuf_duration_pb.Duration.AsObject,
  }
}

export class GroupInfo extends jspb.Message {
  getGroupId(): number;
  setGroupId(value: number): void;

  getAdmin(): string;
  setAdmin(value: string): void;

  getMetadata(): Uint8Array | string;
  getMetadata_asU8(): Uint8Array;
  getMetadata_asB64(): string;
  setMetadata(value: Uint8Array | string): void;

  getVersion(): number;
  setVersion(value: number): void;

  getTotalWeight(): string;
  setTotalWeight(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GroupInfo.AsObject;
  static toObject(includeInstance: boolean, msg: GroupInfo): GroupInfo.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GroupInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GroupInfo;
  static deserializeBinaryFromReader(message: GroupInfo, reader: jspb.BinaryReader): GroupInfo;
}

export namespace GroupInfo {
  export type AsObject = {
    groupId: number,
    admin: string,
    metadata: Uint8Array | string,
    version: number,
    totalWeight: string,
  }
}

export class GroupMember extends jspb.Message {
  getGroupId(): number;
  setGroupId(value: number): void;

  hasMember(): boolean;
  clearMember(): void;
  getMember(): Member | undefined;
  setMember(value?: Member): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GroupMember.AsObject;
  static toObject(includeInstance: boolean, msg: GroupMember): GroupMember.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GroupMember, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GroupMember;
  static deserializeBinaryFromReader(message: GroupMember, reader: jspb.BinaryReader): GroupMember;
}

export namespace GroupMember {
  export type AsObject = {
    groupId: number,
    member?: Member.AsObject,
  }
}

export class GroupAccountInfo extends jspb.Message {
  getAddress(): string;
  setAddress(value: string): void;

  getGroupId(): number;
  setGroupId(value: number): void;

  getAdmin(): string;
  setAdmin(value: string): void;

  getMetadata(): Uint8Array | string;
  getMetadata_asU8(): Uint8Array;
  getMetadata_asB64(): string;
  setMetadata(value: Uint8Array | string): void;

  getVersion(): number;
  setVersion(value: number): void;

  hasDecisionPolicy(): boolean;
  clearDecisionPolicy(): void;
  getDecisionPolicy(): google_protobuf_any_pb.Any | undefined;
  setDecisionPolicy(value?: google_protobuf_any_pb.Any): void;

  getDerivationKey(): Uint8Array | string;
  getDerivationKey_asU8(): Uint8Array;
  getDerivationKey_asB64(): string;
  setDerivationKey(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GroupAccountInfo.AsObject;
  static toObject(includeInstance: boolean, msg: GroupAccountInfo): GroupAccountInfo.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GroupAccountInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GroupAccountInfo;
  static deserializeBinaryFromReader(message: GroupAccountInfo, reader: jspb.BinaryReader): GroupAccountInfo;
}

export namespace GroupAccountInfo {
  export type AsObject = {
    address: string,
    groupId: number,
    admin: string,
    metadata: Uint8Array | string,
    version: number,
    decisionPolicy?: google_protobuf_any_pb.Any.AsObject,
    derivationKey: Uint8Array | string,
  }
}

export class Proposal extends jspb.Message {
  getProposalId(): number;
  setProposalId(value: number): void;

  getAddress(): string;
  setAddress(value: string): void;

  getMetadata(): Uint8Array | string;
  getMetadata_asU8(): Uint8Array;
  getMetadata_asB64(): string;
  setMetadata(value: Uint8Array | string): void;

  clearProposersList(): void;
  getProposersList(): Array<string>;
  setProposersList(value: Array<string>): void;
  addProposers(value: string, index?: number): string;

  hasSubmittedAt(): boolean;
  clearSubmittedAt(): void;
  getSubmittedAt(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setSubmittedAt(value?: google_protobuf_timestamp_pb.Timestamp): void;

  getGroupVersion(): number;
  setGroupVersion(value: number): void;

  getGroupAccountVersion(): number;
  setGroupAccountVersion(value: number): void;

  getStatus(): Proposal.StatusMap[keyof Proposal.StatusMap];
  setStatus(value: Proposal.StatusMap[keyof Proposal.StatusMap]): void;

  getResult(): Proposal.ResultMap[keyof Proposal.ResultMap];
  setResult(value: Proposal.ResultMap[keyof Proposal.ResultMap]): void;

  hasVoteState(): boolean;
  clearVoteState(): void;
  getVoteState(): Tally | undefined;
  setVoteState(value?: Tally): void;

  hasTimeout(): boolean;
  clearTimeout(): void;
  getTimeout(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setTimeout(value?: google_protobuf_timestamp_pb.Timestamp): void;

  getExecutorResult(): Proposal.ExecutorResultMap[keyof Proposal.ExecutorResultMap];
  setExecutorResult(value: Proposal.ExecutorResultMap[keyof Proposal.ExecutorResultMap]): void;

  clearMsgsList(): void;
  getMsgsList(): Array<google_protobuf_any_pb.Any>;
  setMsgsList(value: Array<google_protobuf_any_pb.Any>): void;
  addMsgs(value?: google_protobuf_any_pb.Any, index?: number): google_protobuf_any_pb.Any;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Proposal.AsObject;
  static toObject(includeInstance: boolean, msg: Proposal): Proposal.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Proposal, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Proposal;
  static deserializeBinaryFromReader(message: Proposal, reader: jspb.BinaryReader): Proposal;
}

export namespace Proposal {
  export type AsObject = {
    proposalId: number,
    address: string,
    metadata: Uint8Array | string,
    proposersList: Array<string>,
    submittedAt?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    groupVersion: number,
    groupAccountVersion: number,
    status: Proposal.StatusMap[keyof Proposal.StatusMap],
    result: Proposal.ResultMap[keyof Proposal.ResultMap],
    voteState?: Tally.AsObject,
    timeout?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    executorResult: Proposal.ExecutorResultMap[keyof Proposal.ExecutorResultMap],
    msgsList: Array<google_protobuf_any_pb.Any.AsObject>,
  }

  export interface StatusMap {
    STATUS_UNSPECIFIED: 0;
    STATUS_SUBMITTED: 1;
    STATUS_CLOSED: 2;
    STATUS_ABORTED: 3;
  }

  export const Status: StatusMap;

  export interface ResultMap {
    RESULT_UNSPECIFIED: 0;
    RESULT_UNFINALIZED: 1;
    RESULT_ACCEPTED: 2;
    RESULT_REJECTED: 3;
  }

  export const Result: ResultMap;

  export interface ExecutorResultMap {
    EXECUTOR_RESULT_UNSPECIFIED: 0;
    EXECUTOR_RESULT_NOT_RUN: 1;
    EXECUTOR_RESULT_SUCCESS: 2;
    EXECUTOR_RESULT_FAILURE: 3;
  }

  export const ExecutorResult: ExecutorResultMap;
}

export class Tally extends jspb.Message {
  getYesCount(): string;
  setYesCount(value: string): void;

  getNoCount(): string;
  setNoCount(value: string): void;

  getAbstainCount(): string;
  setAbstainCount(value: string): void;

  getVetoCount(): string;
  setVetoCount(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Tally.AsObject;
  static toObject(includeInstance: boolean, msg: Tally): Tally.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Tally, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Tally;
  static deserializeBinaryFromReader(message: Tally, reader: jspb.BinaryReader): Tally;
}

export namespace Tally {
  export type AsObject = {
    yesCount: string,
    noCount: string,
    abstainCount: string,
    vetoCount: string,
  }
}

export class Vote extends jspb.Message {
  getProposalId(): number;
  setProposalId(value: number): void;

  getVoter(): string;
  setVoter(value: string): void;

  getChoice(): ChoiceMap[keyof ChoiceMap];
  setChoice(value: ChoiceMap[keyof ChoiceMap]): void;

  getMetadata(): Uint8Array | string;
  getMetadata_asU8(): Uint8Array;
  getMetadata_asB64(): string;
  setMetadata(value: Uint8Array | string): void;

  hasSubmittedAt(): boolean;
  clearSubmittedAt(): void;
  getSubmittedAt(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setSubmittedAt(value?: google_protobuf_timestamp_pb.Timestamp): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Vote.AsObject;
  static toObject(includeInstance: boolean, msg: Vote): Vote.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Vote, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Vote;
  static deserializeBinaryFromReader(message: Vote, reader: jspb.BinaryReader): Vote;
}

export namespace Vote {
  export type AsObject = {
    proposalId: number,
    voter: string,
    choice: ChoiceMap[keyof ChoiceMap],
    metadata: Uint8Array | string,
    submittedAt?: google_protobuf_timestamp_pb.Timestamp.AsObject,
  }
}

export interface ChoiceMap {
  CHOICE_UNSPECIFIED: 0;
  CHOICE_NO: 1;
  CHOICE_YES: 2;
  CHOICE_ABSTAIN: 3;
  CHOICE_VETO: 4;
}

export const Choice: ChoiceMap;

