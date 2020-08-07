/*
 * Copyright 2020 Spotify AB
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { GraphQLResolveInfo } from 'graphql';
import { ModuleContext } from '@graphql-modules/core';

export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type EntityMetadataAnnotation = {
  __typename?: 'EntityMetadataAnnotation';
  key: Scalars['String'];
  value: Scalars['String'];
};

export type EntityMetadata = {
  __typename?: 'EntityMetadata';
  name: Scalars['String'];
  namespace?: Maybe<Scalars['String']>;
  annotation?: Maybe<EntityMetadataAnnotation>;
  annotations?: Maybe<Array<EntityMetadataAnnotation>>;
};


export type EntityMetadataAnnotationArgs = {
  name?: Maybe<Scalars['String']>;
};

export type ComponentEntitySpec = {
  __typename?: 'ComponentEntitySpec';
  type: Scalars['String'];
  lifecycle: Scalars['String'];
  owner: Scalars['String'];
};

export type ComponentEntity = CatalogEntity & {
  __typename?: 'ComponentEntity';
  apiVersion?: Maybe<Scalars['String']>;
  kind: Scalars['String'];
  metadata?: Maybe<EntityMetadata>;
  spec: ComponentEntitySpec;
};

export type LocationEntitySpec = {
  __typename?: 'LocationEntitySpec';
  type: Scalars['String'];
  target?: Maybe<Scalars['String']>;
  targets?: Maybe<Array<Scalars['String']>>;
};

export type LocationEntity = CatalogEntity & {
  __typename?: 'LocationEntity';
  apiVersion?: Maybe<Scalars['String']>;
  kind: Scalars['String'];
  metadata?: Maybe<EntityMetadata>;
  spec: LocationEntitySpec;
};

export type TemplateEntitySpec = {
  __typename?: 'TemplateEntitySpec';
  type: Scalars['String'];
  templater: Scalars['String'];
  path?: Maybe<Scalars['String']>;
};

export type TemplateEntity = CatalogEntity & {
  __typename?: 'TemplateEntity';
  apiVersion?: Maybe<Scalars['String']>;
  kind: Scalars['String'];
  metadata?: Maybe<EntityMetadata>;
  spec: TemplateEntitySpec;
};

export type CatalogEntity = {
  apiVersion?: Maybe<Scalars['String']>;
  kind: Scalars['String'];
  metadata?: Maybe<EntityMetadata>;
};

export type CatalogQuery = {
  __typename?: 'CatalogQuery';
  list: Array<CatalogEntity>;
};

export type Query = {
  __typename?: 'Query';
  catalog: CatalogQuery;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  EntityMetadataAnnotation: ResolverTypeWrapper<Partial<EntityMetadataAnnotation>>;
  String: ResolverTypeWrapper<Partial<Scalars['String']>>;
  EntityMetadata: ResolverTypeWrapper<Partial<EntityMetadata>>;
  ComponentEntitySpec: ResolverTypeWrapper<Partial<ComponentEntitySpec>>;
  ComponentEntity: ResolverTypeWrapper<Partial<ComponentEntity>>;
  LocationEntitySpec: ResolverTypeWrapper<Partial<LocationEntitySpec>>;
  LocationEntity: ResolverTypeWrapper<Partial<LocationEntity>>;
  TemplateEntitySpec: ResolverTypeWrapper<Partial<TemplateEntitySpec>>;
  TemplateEntity: ResolverTypeWrapper<Partial<TemplateEntity>>;
  CatalogEntity: ResolversTypes['ComponentEntity'] | ResolversTypes['LocationEntity'] | ResolversTypes['TemplateEntity'];
  CatalogQuery: ResolverTypeWrapper<Partial<CatalogQuery>>;
  Query: ResolverTypeWrapper<{}>;
  Boolean: ResolverTypeWrapper<Partial<Scalars['Boolean']>>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  EntityMetadataAnnotation: Partial<EntityMetadataAnnotation>;
  String: Partial<Scalars['String']>;
  EntityMetadata: Partial<EntityMetadata>;
  ComponentEntitySpec: Partial<ComponentEntitySpec>;
  ComponentEntity: Partial<ComponentEntity>;
  LocationEntitySpec: Partial<LocationEntitySpec>;
  LocationEntity: Partial<LocationEntity>;
  TemplateEntitySpec: Partial<TemplateEntitySpec>;
  TemplateEntity: Partial<TemplateEntity>;
  CatalogEntity: ResolversParentTypes['ComponentEntity'] | ResolversParentTypes['LocationEntity'] | ResolversParentTypes['TemplateEntity'];
  CatalogQuery: Partial<CatalogQuery>;
  Query: {};
  Boolean: Partial<Scalars['Boolean']>;
}>;

export type EntityMetadataAnnotationResolvers<ContextType = ModuleContext, ParentType extends ResolversParentTypes['EntityMetadataAnnotation'] = ResolversParentTypes['EntityMetadataAnnotation']> = ResolversObject<{
  key?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type EntityMetadataResolvers<ContextType = ModuleContext, ParentType extends ResolversParentTypes['EntityMetadata'] = ResolversParentTypes['EntityMetadata']> = ResolversObject<{
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  namespace?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  annotation?: Resolver<Maybe<ResolversTypes['EntityMetadataAnnotation']>, ParentType, ContextType, RequireFields<EntityMetadataAnnotationArgs, never>>;
  annotations?: Resolver<Maybe<Array<ResolversTypes['EntityMetadataAnnotation']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type ComponentEntitySpecResolvers<ContextType = ModuleContext, ParentType extends ResolversParentTypes['ComponentEntitySpec'] = ResolversParentTypes['ComponentEntitySpec']> = ResolversObject<{
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lifecycle?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type ComponentEntityResolvers<ContextType = ModuleContext, ParentType extends ResolversParentTypes['ComponentEntity'] = ResolversParentTypes['ComponentEntity']> = ResolversObject<{
  apiVersion?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  kind?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  metadata?: Resolver<Maybe<ResolversTypes['EntityMetadata']>, ParentType, ContextType>;
  spec?: Resolver<ResolversTypes['ComponentEntitySpec'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type LocationEntitySpecResolvers<ContextType = ModuleContext, ParentType extends ResolversParentTypes['LocationEntitySpec'] = ResolversParentTypes['LocationEntitySpec']> = ResolversObject<{
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  target?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  targets?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type LocationEntityResolvers<ContextType = ModuleContext, ParentType extends ResolversParentTypes['LocationEntity'] = ResolversParentTypes['LocationEntity']> = ResolversObject<{
  apiVersion?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  kind?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  metadata?: Resolver<Maybe<ResolversTypes['EntityMetadata']>, ParentType, ContextType>;
  spec?: Resolver<ResolversTypes['LocationEntitySpec'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type TemplateEntitySpecResolvers<ContextType = ModuleContext, ParentType extends ResolversParentTypes['TemplateEntitySpec'] = ResolversParentTypes['TemplateEntitySpec']> = ResolversObject<{
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  templater?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type TemplateEntityResolvers<ContextType = ModuleContext, ParentType extends ResolversParentTypes['TemplateEntity'] = ResolversParentTypes['TemplateEntity']> = ResolversObject<{
  apiVersion?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  kind?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  metadata?: Resolver<Maybe<ResolversTypes['EntityMetadata']>, ParentType, ContextType>;
  spec?: Resolver<ResolversTypes['TemplateEntitySpec'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type CatalogEntityResolvers<ContextType = ModuleContext, ParentType extends ResolversParentTypes['CatalogEntity'] = ResolversParentTypes['CatalogEntity']> = ResolversObject<{
  __resolveType: TypeResolveFn<'ComponentEntity' | 'LocationEntity' | 'TemplateEntity', ParentType, ContextType>;
  apiVersion?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  kind?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  metadata?: Resolver<Maybe<ResolversTypes['EntityMetadata']>, ParentType, ContextType>;
}>;

export type CatalogQueryResolvers<ContextType = ModuleContext, ParentType extends ResolversParentTypes['CatalogQuery'] = ResolversParentTypes['CatalogQuery']> = ResolversObject<{
  list?: Resolver<Array<ResolversTypes['CatalogEntity']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type QueryResolvers<ContextType = ModuleContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  catalog?: Resolver<ResolversTypes['CatalogQuery'], ParentType, ContextType>;
}>;

export type Resolvers<ContextType = ModuleContext> = ResolversObject<{
  EntityMetadataAnnotation?: EntityMetadataAnnotationResolvers<ContextType>;
  EntityMetadata?: EntityMetadataResolvers<ContextType>;
  ComponentEntitySpec?: ComponentEntitySpecResolvers<ContextType>;
  ComponentEntity?: ComponentEntityResolvers<ContextType>;
  LocationEntitySpec?: LocationEntitySpecResolvers<ContextType>;
  LocationEntity?: LocationEntityResolvers<ContextType>;
  TemplateEntitySpec?: TemplateEntitySpecResolvers<ContextType>;
  TemplateEntity?: TemplateEntityResolvers<ContextType>;
  CatalogEntity?: CatalogEntityResolvers<ContextType>;
  CatalogQuery?: CatalogQueryResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = ModuleContext> = Resolvers<ContextType>;
