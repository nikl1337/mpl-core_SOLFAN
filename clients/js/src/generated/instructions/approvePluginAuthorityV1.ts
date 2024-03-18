/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  Context,
  Pda,
  PublicKey,
  Signer,
  TransactionBuilder,
  transactionBuilder,
} from '@metaplex-foundation/umi';
import {
  Serializer,
  mapSerializer,
  struct,
  u8,
} from '@metaplex-foundation/umi/serializers';
import {
  ResolvedAccount,
  ResolvedAccountsWithIndices,
  getAccountMetasAndSigners,
} from '../shared';
import {
  PluginAuthority,
  PluginAuthorityArgs,
  PluginType,
  PluginTypeArgs,
  getPluginAuthoritySerializer,
  getPluginTypeSerializer,
} from '../types';

// Accounts.
export type ApprovePluginAuthorityV1InstructionAccounts = {
  /** The address of the asset */
  asset: PublicKey | Pda;
  /** The collection to which the asset belongs */
  collection?: PublicKey | Pda;
  /** The account paying for the storage fees */
  payer?: Signer;
  /** The owner or delegate of the asset */
  authority?: Signer;
  /** The system program */
  systemProgram?: PublicKey | Pda;
  /** The SPL Noop Program */
  logWrapper?: PublicKey | Pda;
};

// Data.
export type ApprovePluginAuthorityV1InstructionData = {
  discriminator: number;
  pluginType: PluginType;
  newAuthority: PluginAuthority;
};

export type ApprovePluginAuthorityV1InstructionDataArgs = {
  pluginType: PluginTypeArgs;
  newAuthority: PluginAuthorityArgs;
};

export function getApprovePluginAuthorityV1InstructionDataSerializer(): Serializer<
  ApprovePluginAuthorityV1InstructionDataArgs,
  ApprovePluginAuthorityV1InstructionData
> {
  return mapSerializer<
    ApprovePluginAuthorityV1InstructionDataArgs,
    any,
    ApprovePluginAuthorityV1InstructionData
  >(
    struct<ApprovePluginAuthorityV1InstructionData>(
      [
        ['discriminator', u8()],
        ['pluginType', getPluginTypeSerializer()],
        ['newAuthority', getPluginAuthoritySerializer()],
      ],
      { description: 'ApprovePluginAuthorityV1InstructionData' }
    ),
    (value) => ({ ...value, discriminator: 8 })
  ) as Serializer<
    ApprovePluginAuthorityV1InstructionDataArgs,
    ApprovePluginAuthorityV1InstructionData
  >;
}

// Args.
export type ApprovePluginAuthorityV1InstructionArgs =
  ApprovePluginAuthorityV1InstructionDataArgs;

// Instruction.
export function approvePluginAuthorityV1(
  context: Pick<Context, 'payer' | 'programs'>,
  input: ApprovePluginAuthorityV1InstructionAccounts &
    ApprovePluginAuthorityV1InstructionArgs
): TransactionBuilder {
  // Program ID.
  const programId = context.programs.getPublicKey(
    'mplCore',
    'CoREENxT6tW1HoK8ypY1SxRMZTcVPm7R94rH4PZNhX7d'
  );

  // Accounts.
  const resolvedAccounts = {
    asset: {
      index: 0,
      isWritable: true as boolean,
      value: input.asset ?? null,
    },
    collection: {
      index: 1,
      isWritable: true as boolean,
      value: input.collection ?? null,
    },
    payer: {
      index: 2,
      isWritable: true as boolean,
      value: input.payer ?? null,
    },
    authority: {
      index: 3,
      isWritable: false as boolean,
      value: input.authority ?? null,
    },
    systemProgram: {
      index: 4,
      isWritable: false as boolean,
      value: input.systemProgram ?? null,
    },
    logWrapper: {
      index: 5,
      isWritable: false as boolean,
      value: input.logWrapper ?? null,
    },
  } satisfies ResolvedAccountsWithIndices;

  // Arguments.
  const resolvedArgs: ApprovePluginAuthorityV1InstructionArgs = { ...input };

  // Default values.
  if (!resolvedAccounts.payer.value) {
    resolvedAccounts.payer.value = context.payer;
  }
  if (!resolvedAccounts.systemProgram.value) {
    resolvedAccounts.systemProgram.value = context.programs.getPublicKey(
      'splSystem',
      '11111111111111111111111111111111'
    );
    resolvedAccounts.systemProgram.isWritable = false;
  }

  // Accounts in order.
  const orderedAccounts: ResolvedAccount[] = Object.values(
    resolvedAccounts
  ).sort((a, b) => a.index - b.index);

  // Keys and Signers.
  const [keys, signers] = getAccountMetasAndSigners(
    orderedAccounts,
    'programId',
    programId
  );

  // Data.
  const data = getApprovePluginAuthorityV1InstructionDataSerializer().serialize(
    resolvedArgs as ApprovePluginAuthorityV1InstructionDataArgs
  );

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}