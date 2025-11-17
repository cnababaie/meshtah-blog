import type { Schema, Struct } from '@strapi/strapi';

export interface SourceSource extends Struct.ComponentSchema {
  collectionName: 'components_source_sources';
  info: {
    displayName: 'source';
    icon: 'link';
  };
  attributes: {
    name: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'source.source': SourceSource;
    }
  }
}
