/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  Serializer,
  array,
  struct,
  u64,
} from '@metaplex-foundation/umi/serializers';
import {
  Authority,
  AuthorityArgs,
  Plugin,
  PluginArgs,
  getAuthoritySerializer,
  getPluginSerializer,
} from '.';

export type HashablePluginSchema = {
  index: bigint;
  authorities: Array<Authority>;
  plugin: Plugin;
};

export type HashablePluginSchemaArgs = {
  index: number | bigint;
  authorities: Array<AuthorityArgs>;
  plugin: PluginArgs;
};

export function getHashablePluginSchemaSerializer(): Serializer<
  HashablePluginSchemaArgs,
  HashablePluginSchema
> {
  return struct<HashablePluginSchema>(
    [
      ['index', u64()],
      ['authorities', array(getAuthoritySerializer())],
      ['plugin', getPluginSerializer()],
    ],
    { description: 'HashablePluginSchema' }
  ) as Serializer<HashablePluginSchemaArgs, HashablePluginSchema>;
}
