import { Serializer } from '@metaplex-foundation/umi/serializers';

import {
  Key,
  PluginHeaderV1,
  PluginHeaderV1AccountData,
  PluginRegistryV1AccountData,
  getPluginHeaderV1AccountDataSerializer,
  getPluginRegistryV1AccountDataSerializer,
} from '../generated';
import {
  CollectionV1AccountData as GenCollectionV1AccountData,
  CollectionV1AccountDataArgs as GenCollectionV1AccountDataArgs,
  getCollectionV1AccountDataSerializer as genGetCollectionV1AccountDataSerializer,
} from '../generated/types/collectionV1AccountData';
import { PluginsList } from '../types';
import { registryRecordsToPluginsList } from '../plugins';

export type CollectionV1AccountData = GenCollectionV1AccountData &
  PluginsList & {
    pluginHeader?: Omit<PluginHeaderV1, 'publicKey' | 'header'>;
  };

export type CollectionV1AccountDataArgs = Omit<
  GenCollectionV1AccountDataArgs,
  'updateAuthority'
> &
  PluginsList & {
    pluginHeader?: Omit<PluginHeaderV1, 'publicKey' | 'header'>;
  };

export const getCollectionV1AccountDataSerializer = (): Serializer<
  CollectionV1AccountDataArgs,
  CollectionV1AccountData
> => ({
  description: 'CollectionAccountData',
  fixedSize: null,
  maxSize: null,
  serialize: () => {
    throw new Error('Operation not supported.');
  },
  deserialize: (
    buffer: Uint8Array,
    offset = 0
  ): [CollectionV1AccountData, number] => {
    // Account.
    const [collection, collectionOffset] =
      genGetCollectionV1AccountDataSerializer().deserialize(buffer, offset);
    if (collection.key !== Key.CollectionV1) {
      throw new Error(
        `Expected an Collection account, got key: ${collection.key}`
      );
    }

    let pluginHeader: PluginHeaderV1AccountData | undefined;
    let pluginRegistry: PluginRegistryV1AccountData | undefined;
    let pluginsList: PluginsList | undefined;
    let finalOffset = collectionOffset;

    if (buffer.length !== collectionOffset) {
      [pluginHeader] = getPluginHeaderV1AccountDataSerializer().deserialize(
        buffer,
        collectionOffset
      );

      [pluginRegistry, finalOffset] =
        getPluginRegistryV1AccountDataSerializer().deserialize(
          buffer,
          Number(pluginHeader.pluginRegistryOffset)
        );

      pluginsList = registryRecordsToPluginsList(
        pluginRegistry.registry,
        buffer
      );
    }

    return [
      {
        pluginHeader,
        ...pluginsList,
        ...collection,
      },
      finalOffset,
    ];
  },
});
