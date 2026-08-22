import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`folders\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_h_folders_id\` integer,
  	\`name\` text NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`_h_folders_id\`) REFERENCES \`folders\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`folders__h_folders_idx\` ON \`folders\` (\`_h_folders_id\`);`)
  await db.run(sql`CREATE INDEX \`folders_updated_at_idx\` ON \`folders\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`folders_created_at_idx\` ON \`folders\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`_folders_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version__h_folders_id\` integer,
  	\`version_name\` text NOT NULL,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`folders\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version__h_folders_id\`) REFERENCES \`folders\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_folders_v_parent_idx\` ON \`_folders_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_folders_v_version_version__h_folders_idx\` ON \`_folders_v\` (\`version__h_folders_id\`);`)
  await db.run(sql`CREATE INDEX \`_folders_v_version_version_updated_at_idx\` ON \`_folders_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_folders_v_version_version_created_at_idx\` ON \`_folders_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_folders_v_created_at_idx\` ON \`_folders_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_folders_v_updated_at_idx\` ON \`_folders_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`pages_hero_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	\`link_appearance\` text DEFAULT 'default',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_hero_links_order_idx\` ON \`pages_hero_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_hero_links_parent_id_idx\` ON \`pages_hero_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_cta_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	\`link_appearance\` text DEFAULT 'default',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_cta\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_cta_links_order_idx\` ON \`pages_blocks_cta_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_cta_links_parent_id_idx\` ON \`pages_blocks_cta_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_cta\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`rich_text\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_cta_order_idx\` ON \`pages_blocks_cta\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_cta_parent_id_idx\` ON \`pages_blocks_cta\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_cta_path_idx\` ON \`pages_blocks_cta\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_content_columns\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`size\` text DEFAULT 'oneThird',
  	\`rich_text\` text,
  	\`enable_link\` integer,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	\`link_appearance\` text DEFAULT 'default',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_content_columns_order_idx\` ON \`pages_blocks_content_columns\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_content_columns_parent_id_idx\` ON \`pages_blocks_content_columns\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_content\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_content_order_idx\` ON \`pages_blocks_content\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_content_parent_id_idx\` ON \`pages_blocks_content\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_content_path_idx\` ON \`pages_blocks_content\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_media_block\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`media_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_media_block_order_idx\` ON \`pages_blocks_media_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_media_block_parent_id_idx\` ON \`pages_blocks_media_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_media_block_path_idx\` ON \`pages_blocks_media_block\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_media_block_media_idx\` ON \`pages_blocks_media_block\` (\`media_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_archive\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`intro_content\` text,
  	\`populate_by\` text DEFAULT 'collection',
  	\`relation_to\` text DEFAULT 'insights',
  	\`limit\` numeric DEFAULT 10,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_archive_order_idx\` ON \`pages_blocks_archive\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_archive_parent_id_idx\` ON \`pages_blocks_archive\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_archive_path_idx\` ON \`pages_blocks_archive\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_form_block\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`form_id\` integer,
  	\`enable_intro\` integer,
  	\`intro_content\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`form_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_form_block_order_idx\` ON \`pages_blocks_form_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_form_block_parent_id_idx\` ON \`pages_blocks_form_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_form_block_path_idx\` ON \`pages_blocks_form_block\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_form_block_form_idx\` ON \`pages_blocks_form_block\` (\`form_id\`);`)
  await db.run(sql`CREATE TABLE \`pages\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`hero_type\` text DEFAULT 'lowImpact',
  	\`hero_rich_text\` text,
  	\`hero_media_id\` integer,
  	\`meta_title\` text,
  	\`meta_image_id\` integer,
  	\`meta_description\` text,
  	\`published_at\` text,
  	\`slug\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`hero_media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_hero_hero_media_idx\` ON \`pages\` (\`hero_media_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_meta_meta_image_idx\` ON \`pages\` (\`meta_image_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_slug_idx\` ON \`pages\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`pages_updated_at_idx\` ON \`pages\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`pages_created_at_idx\` ON \`pages\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`pages__status_idx\` ON \`pages\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`pages_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` integer,
  	\`insights_id\` integer,
  	\`categories_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`insights_id\`) REFERENCES \`insights\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_rels_order_idx\` ON \`pages_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_parent_idx\` ON \`pages_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_path_idx\` ON \`pages_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_pages_id_idx\` ON \`pages_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_insights_id_idx\` ON \`pages_rels\` (\`insights_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_categories_id_idx\` ON \`pages_rels\` (\`categories_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_version_hero_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	\`link_appearance\` text DEFAULT 'default',
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_version_hero_links_order_idx\` ON \`_pages_v_version_hero_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_hero_links_parent_id_idx\` ON \`_pages_v_version_hero_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_cta_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	\`link_appearance\` text DEFAULT 'default',
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_cta\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_cta_links_order_idx\` ON \`_pages_v_blocks_cta_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_cta_links_parent_id_idx\` ON \`_pages_v_blocks_cta_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_cta\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`rich_text\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_cta_order_idx\` ON \`_pages_v_blocks_cta\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_cta_parent_id_idx\` ON \`_pages_v_blocks_cta\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_cta_path_idx\` ON \`_pages_v_blocks_cta\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_content_columns\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`size\` text DEFAULT 'oneThird',
  	\`rich_text\` text,
  	\`enable_link\` integer,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	\`link_appearance\` text DEFAULT 'default',
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_content_columns_order_idx\` ON \`_pages_v_blocks_content_columns\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_content_columns_parent_id_idx\` ON \`_pages_v_blocks_content_columns\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_content\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_content_order_idx\` ON \`_pages_v_blocks_content\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_content_parent_id_idx\` ON \`_pages_v_blocks_content\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_content_path_idx\` ON \`_pages_v_blocks_content\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_media_block\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`media_id\` integer,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_media_block_order_idx\` ON \`_pages_v_blocks_media_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_media_block_parent_id_idx\` ON \`_pages_v_blocks_media_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_media_block_path_idx\` ON \`_pages_v_blocks_media_block\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_media_block_media_idx\` ON \`_pages_v_blocks_media_block\` (\`media_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_archive\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`intro_content\` text,
  	\`populate_by\` text DEFAULT 'collection',
  	\`relation_to\` text DEFAULT 'insights',
  	\`limit\` numeric DEFAULT 10,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_archive_order_idx\` ON \`_pages_v_blocks_archive\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_archive_parent_id_idx\` ON \`_pages_v_blocks_archive\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_archive_path_idx\` ON \`_pages_v_blocks_archive\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_form_block\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`form_id\` integer,
  	\`enable_intro\` integer,
  	\`intro_content\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`form_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_form_block_order_idx\` ON \`_pages_v_blocks_form_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_form_block_parent_id_idx\` ON \`_pages_v_blocks_form_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_form_block_path_idx\` ON \`_pages_v_blocks_form_block\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_form_block_form_idx\` ON \`_pages_v_blocks_form_block\` (\`form_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_title\` text,
  	\`version_hero_type\` text DEFAULT 'lowImpact',
  	\`version_hero_rich_text\` text,
  	\`version_hero_media_id\` integer,
  	\`version_meta_title\` text,
  	\`version_meta_image_id\` integer,
  	\`version_meta_description\` text,
  	\`version_published_at\` text,
  	\`version_slug\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	\`autosave\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_hero_media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_parent_idx\` ON \`_pages_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_hero_version_hero_media_idx\` ON \`_pages_v\` (\`version_hero_media_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_meta_version_meta_image_idx\` ON \`_pages_v\` (\`version_meta_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_slug_idx\` ON \`_pages_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_updated_at_idx\` ON \`_pages_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_created_at_idx\` ON \`_pages_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version__status_idx\` ON \`_pages_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_created_at_idx\` ON \`_pages_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_updated_at_idx\` ON \`_pages_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_latest_idx\` ON \`_pages_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_autosave_idx\` ON \`_pages_v\` (\`autosave\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` integer,
  	\`insights_id\` integer,
  	\`categories_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`insights_id\`) REFERENCES \`insights\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_order_idx\` ON \`_pages_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_parent_idx\` ON \`_pages_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_path_idx\` ON \`_pages_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_pages_id_idx\` ON \`_pages_v_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_insights_id_idx\` ON \`_pages_v_rels\` (\`insights_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_categories_id_idx\` ON \`_pages_v_rels\` (\`categories_id\`);`)
  await db.run(sql`CREATE TABLE \`insights_tags\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tag\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`insights\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`insights_tags_order_idx\` ON \`insights_tags\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`insights_tags_parent_id_idx\` ON \`insights_tags\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`insights_populated_authors\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`insights\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`insights_populated_authors_order_idx\` ON \`insights_populated_authors\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`insights_populated_authors_parent_id_idx\` ON \`insights_populated_authors\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`insights\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`hero_image_id\` integer,
  	\`content\` text,
  	\`meta_title\` text,
  	\`meta_image_id\` integer,
  	\`meta_description\` text,
  	\`topic\` text,
  	\`read_time\` text,
  	\`published_at\` text,
  	\`slug\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`insights_hero_image_idx\` ON \`insights\` (\`hero_image_id\`);`)
  await db.run(sql`CREATE INDEX \`insights_meta_meta_image_idx\` ON \`insights\` (\`meta_image_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`insights_slug_idx\` ON \`insights\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`insights_updated_at_idx\` ON \`insights\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`insights_created_at_idx\` ON \`insights\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`insights__status_idx\` ON \`insights\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`insights_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`insights_id\` integer,
  	\`categories_id\` integer,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`insights\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`insights_id\`) REFERENCES \`insights\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`insights_rels_order_idx\` ON \`insights_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`insights_rels_parent_idx\` ON \`insights_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`insights_rels_path_idx\` ON \`insights_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`insights_rels_insights_id_idx\` ON \`insights_rels\` (\`insights_id\`);`)
  await db.run(sql`CREATE INDEX \`insights_rels_categories_id_idx\` ON \`insights_rels\` (\`categories_id\`);`)
  await db.run(sql`CREATE INDEX \`insights_rels_users_id_idx\` ON \`insights_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_insights_v_version_tags\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tag\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_insights_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_insights_v_version_tags_order_idx\` ON \`_insights_v_version_tags\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_insights_v_version_tags_parent_id_idx\` ON \`_insights_v_version_tags\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_insights_v_version_populated_authors\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	\`name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_insights_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_insights_v_version_populated_authors_order_idx\` ON \`_insights_v_version_populated_authors\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_insights_v_version_populated_authors_parent_id_idx\` ON \`_insights_v_version_populated_authors\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_insights_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_title\` text,
  	\`version_hero_image_id\` integer,
  	\`version_content\` text,
  	\`version_meta_title\` text,
  	\`version_meta_image_id\` integer,
  	\`version_meta_description\` text,
  	\`version_topic\` text,
  	\`version_read_time\` text,
  	\`version_published_at\` text,
  	\`version_slug\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	\`autosave\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`insights\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_insights_v_parent_idx\` ON \`_insights_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_insights_v_version_version_hero_image_idx\` ON \`_insights_v\` (\`version_hero_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_insights_v_version_meta_version_meta_image_idx\` ON \`_insights_v\` (\`version_meta_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_insights_v_version_version_slug_idx\` ON \`_insights_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_insights_v_version_version_updated_at_idx\` ON \`_insights_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_insights_v_version_version_created_at_idx\` ON \`_insights_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_insights_v_version_version__status_idx\` ON \`_insights_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_insights_v_created_at_idx\` ON \`_insights_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_insights_v_updated_at_idx\` ON \`_insights_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_insights_v_latest_idx\` ON \`_insights_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX \`_insights_v_autosave_idx\` ON \`_insights_v\` (\`autosave\`);`)
  await db.run(sql`CREATE TABLE \`_insights_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`insights_id\` integer,
  	\`categories_id\` integer,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_insights_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`insights_id\`) REFERENCES \`insights\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_insights_v_rels_order_idx\` ON \`_insights_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_insights_v_rels_parent_idx\` ON \`_insights_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_insights_v_rels_path_idx\` ON \`_insights_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_insights_v_rels_insights_id_idx\` ON \`_insights_v_rels\` (\`insights_id\`);`)
  await db.run(sql`CREATE INDEX \`_insights_v_rels_categories_id_idx\` ON \`_insights_v_rels\` (\`categories_id\`);`)
  await db.run(sql`CREATE INDEX \`_insights_v_rels_users_id_idx\` ON \`_insights_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`projects_stack\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tech\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`projects_stack_order_idx\` ON \`projects_stack\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`projects_stack_parent_id_idx\` ON \`projects_stack\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`projects_architecture\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`description\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`projects_architecture_order_idx\` ON \`projects_architecture\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`projects_architecture_parent_id_idx\` ON \`projects_architecture\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`projects_features\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`feature\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`projects_features_order_idx\` ON \`projects_features\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`projects_features_parent_id_idx\` ON \`projects_features\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`projects_result_metrics\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` text,
  	\`label\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`projects_result_metrics_order_idx\` ON \`projects_result_metrics\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`projects_result_metrics_parent_id_idx\` ON \`projects_result_metrics\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`projects_lessons\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`lesson\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`projects_lessons_order_idx\` ON \`projects_lessons\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`projects_lessons_parent_id_idx\` ON \`projects_lessons\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`projects_development_timeline\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`period\` text,
  	\`phase\` text,
  	\`description\` text,
  	\`hurdle\` text,
  	\`milestone\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`projects_development_timeline_order_idx\` ON \`projects_development_timeline\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`projects_development_timeline_parent_id_idx\` ON \`projects_development_timeline\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`projects\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`tagline\` text,
  	\`description\` text,
  	\`thumbnail_id\` integer,
  	\`stats_loc\` numeric,
  	\`stats_commits\` numeric,
  	\`stats_contributors\` numeric,
  	\`live_url\` text,
  	\`github\` text,
  	\`challenge\` text,
  	\`solution\` text,
  	\`code_sample_title\` text,
  	\`code_sample_language\` text,
  	\`code_sample_code\` text,
  	\`project_status\` text DEFAULT 'COMPLETED',
  	\`category\` text,
  	\`industry_id\` integer,
  	\`year\` numeric,
  	\`featured\` integer DEFAULT false,
  	\`sort_order\` numeric,
  	\`meta_title\` text,
  	\`meta_image_id\` integer,
  	\`meta_description\` text,
  	\`published_at\` text,
  	\`slug\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`thumbnail_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`industry_id\`) REFERENCES \`industries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`projects_thumbnail_idx\` ON \`projects\` (\`thumbnail_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_industry_idx\` ON \`projects\` (\`industry_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_meta_meta_image_idx\` ON \`projects\` (\`meta_image_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`projects_slug_idx\` ON \`projects\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`projects_updated_at_idx\` ON \`projects\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`projects_created_at_idx\` ON \`projects\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`projects__status_idx\` ON \`projects\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`_projects_v_version_stack\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tech\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_projects_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_projects_v_version_stack_order_idx\` ON \`_projects_v_version_stack\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_version_stack_parent_id_idx\` ON \`_projects_v_version_stack\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_projects_v_version_architecture\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`description\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_projects_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_projects_v_version_architecture_order_idx\` ON \`_projects_v_version_architecture\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_version_architecture_parent_id_idx\` ON \`_projects_v_version_architecture\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_projects_v_version_features\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`feature\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_projects_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_projects_v_version_features_order_idx\` ON \`_projects_v_version_features\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_version_features_parent_id_idx\` ON \`_projects_v_version_features\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_projects_v_version_result_metrics\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`value\` text,
  	\`label\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_projects_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_projects_v_version_result_metrics_order_idx\` ON \`_projects_v_version_result_metrics\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_version_result_metrics_parent_id_idx\` ON \`_projects_v_version_result_metrics\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_projects_v_version_lessons\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`lesson\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_projects_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_projects_v_version_lessons_order_idx\` ON \`_projects_v_version_lessons\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_version_lessons_parent_id_idx\` ON \`_projects_v_version_lessons\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_projects_v_version_development_timeline\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`period\` text,
  	\`phase\` text,
  	\`description\` text,
  	\`hurdle\` text,
  	\`milestone\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_projects_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_projects_v_version_development_timeline_order_idx\` ON \`_projects_v_version_development_timeline\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_version_development_timeline_parent_id_idx\` ON \`_projects_v_version_development_timeline\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_projects_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_name\` text,
  	\`version_tagline\` text,
  	\`version_description\` text,
  	\`version_thumbnail_id\` integer,
  	\`version_stats_loc\` numeric,
  	\`version_stats_commits\` numeric,
  	\`version_stats_contributors\` numeric,
  	\`version_live_url\` text,
  	\`version_github\` text,
  	\`version_challenge\` text,
  	\`version_solution\` text,
  	\`version_code_sample_title\` text,
  	\`version_code_sample_language\` text,
  	\`version_code_sample_code\` text,
  	\`version_project_status\` text DEFAULT 'COMPLETED',
  	\`version_category\` text,
  	\`version_industry_id\` integer,
  	\`version_year\` numeric,
  	\`version_featured\` integer DEFAULT false,
  	\`version_sort_order\` numeric,
  	\`version_meta_title\` text,
  	\`version_meta_image_id\` integer,
  	\`version_meta_description\` text,
  	\`version_published_at\` text,
  	\`version_slug\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	\`autosave\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_thumbnail_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_industry_id\`) REFERENCES \`industries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_projects_v_parent_idx\` ON \`_projects_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_version_version_thumbnail_idx\` ON \`_projects_v\` (\`version_thumbnail_id\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_version_version_industry_idx\` ON \`_projects_v\` (\`version_industry_id\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_version_meta_version_meta_image_idx\` ON \`_projects_v\` (\`version_meta_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_version_version_slug_idx\` ON \`_projects_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_version_version_updated_at_idx\` ON \`_projects_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_version_version_created_at_idx\` ON \`_projects_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_version_version__status_idx\` ON \`_projects_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_created_at_idx\` ON \`_projects_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_updated_at_idx\` ON \`_projects_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_latest_idx\` ON \`_projects_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_autosave_idx\` ON \`_projects_v\` (\`autosave\`);`)
  await db.run(sql`CREATE TABLE \`services_deliverables\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`item\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_deliverables_order_idx\` ON \`services_deliverables\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_deliverables_parent_id_idx\` ON \`services_deliverables\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`services_stack\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tech\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_stack_order_idx\` ON \`services_stack\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_stack_parent_id_idx\` ON \`services_stack\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`services_process\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`num\` text,
  	\`title\` text,
  	\`description\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_process_order_idx\` ON \`services_process\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_process_parent_id_idx\` ON \`services_process\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`services_pricing\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`description\` text,
  	\`best\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_pricing_order_idx\` ON \`services_pricing\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_pricing_parent_id_idx\` ON \`services_pricing\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`services_faq\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`question\` text,
  	\`answer\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_faq_order_idx\` ON \`services_faq\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_faq_parent_id_idx\` ON \`services_faq\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`services\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`num\` text,
  	\`icon\` text,
  	\`tagline\` text,
  	\`description\` text,
  	\`timeline\` text,
  	\`starting_from\` text,
  	\`code_language\` text,
  	\`code_title\` text,
  	\`code_code\` text,
  	\`meta_title\` text,
  	\`meta_image_id\` integer,
  	\`meta_description\` text,
  	\`published_at\` text,
  	\`slug\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`services_meta_meta_image_idx\` ON \`services\` (\`meta_image_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`services_slug_idx\` ON \`services\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`services_updated_at_idx\` ON \`services\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`services_created_at_idx\` ON \`services\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`services__status_idx\` ON \`services\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`_services_v_version_deliverables\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`item\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_services_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_services_v_version_deliverables_order_idx\` ON \`_services_v_version_deliverables\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_deliverables_parent_id_idx\` ON \`_services_v_version_deliverables\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_services_v_version_stack\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tech\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_services_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_services_v_version_stack_order_idx\` ON \`_services_v_version_stack\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_stack_parent_id_idx\` ON \`_services_v_version_stack\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_services_v_version_process\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`num\` text,
  	\`title\` text,
  	\`description\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_services_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_services_v_version_process_order_idx\` ON \`_services_v_version_process\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_process_parent_id_idx\` ON \`_services_v_version_process\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_services_v_version_pricing\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`description\` text,
  	\`best\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_services_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_services_v_version_pricing_order_idx\` ON \`_services_v_version_pricing\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_pricing_parent_id_idx\` ON \`_services_v_version_pricing\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_services_v_version_faq\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`question\` text,
  	\`answer\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_services_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_services_v_version_faq_order_idx\` ON \`_services_v_version_faq\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_faq_parent_id_idx\` ON \`_services_v_version_faq\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_services_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_title\` text,
  	\`version_num\` text,
  	\`version_icon\` text,
  	\`version_tagline\` text,
  	\`version_description\` text,
  	\`version_timeline\` text,
  	\`version_starting_from\` text,
  	\`version_code_language\` text,
  	\`version_code_title\` text,
  	\`version_code_code\` text,
  	\`version_meta_title\` text,
  	\`version_meta_image_id\` integer,
  	\`version_meta_description\` text,
  	\`version_published_at\` text,
  	\`version_slug\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	\`autosave\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_services_v_parent_idx\` ON \`_services_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_meta_version_meta_image_idx\` ON \`_services_v\` (\`version_meta_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_version_slug_idx\` ON \`_services_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_version_updated_at_idx\` ON \`_services_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_version_created_at_idx\` ON \`_services_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_version__status_idx\` ON \`_services_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_created_at_idx\` ON \`_services_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_updated_at_idx\` ON \`_services_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_latest_idx\` ON \`_services_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_autosave_idx\` ON \`_services_v\` (\`autosave\`);`)
  await db.run(sql`CREATE TABLE \`industries_services\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`service\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`industries\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`industries_services_order_idx\` ON \`industries_services\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`industries_services_parent_id_idx\` ON \`industries_services\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`industries_key_projects\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`project\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`industries\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`industries_key_projects_order_idx\` ON \`industries_key_projects\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`industries_key_projects_parent_id_idx\` ON \`industries_key_projects\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`industries_challenges\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`challenge\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`industries\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`industries_challenges_order_idx\` ON \`industries_challenges\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`industries_challenges_parent_id_idx\` ON \`industries_challenges\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`industries_solutions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`solution\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`industries\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`industries_solutions_order_idx\` ON \`industries_solutions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`industries_solutions_parent_id_idx\` ON \`industries_solutions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`industries_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` text,
  	\`label\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`industries\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`industries_stats_order_idx\` ON \`industries_stats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`industries_stats_parent_id_idx\` ON \`industries_stats\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`industries\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`tagline\` text,
  	\`description\` text,
  	\`project_count\` numeric,
  	\`meta_title\` text,
  	\`meta_image_id\` integer,
  	\`meta_description\` text,
  	\`published_at\` text,
  	\`sort_order\` numeric,
  	\`slug\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`industries_meta_meta_image_idx\` ON \`industries\` (\`meta_image_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`industries_slug_idx\` ON \`industries\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`industries_updated_at_idx\` ON \`industries\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`industries_created_at_idx\` ON \`industries\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`industries__status_idx\` ON \`industries\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`_industries_v_version_services\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`service\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_industries_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_industries_v_version_services_order_idx\` ON \`_industries_v_version_services\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_industries_v_version_services_parent_id_idx\` ON \`_industries_v_version_services\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_industries_v_version_key_projects\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`project\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_industries_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_industries_v_version_key_projects_order_idx\` ON \`_industries_v_version_key_projects\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_industries_v_version_key_projects_parent_id_idx\` ON \`_industries_v_version_key_projects\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_industries_v_version_challenges\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`challenge\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_industries_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_industries_v_version_challenges_order_idx\` ON \`_industries_v_version_challenges\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_industries_v_version_challenges_parent_id_idx\` ON \`_industries_v_version_challenges\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_industries_v_version_solutions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`solution\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_industries_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_industries_v_version_solutions_order_idx\` ON \`_industries_v_version_solutions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_industries_v_version_solutions_parent_id_idx\` ON \`_industries_v_version_solutions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_industries_v_version_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`value\` text,
  	\`label\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_industries_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_industries_v_version_stats_order_idx\` ON \`_industries_v_version_stats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_industries_v_version_stats_parent_id_idx\` ON \`_industries_v_version_stats\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_industries_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_name\` text,
  	\`version_tagline\` text,
  	\`version_description\` text,
  	\`version_project_count\` numeric,
  	\`version_meta_title\` text,
  	\`version_meta_image_id\` integer,
  	\`version_meta_description\` text,
  	\`version_published_at\` text,
  	\`version_sort_order\` numeric,
  	\`version_slug\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	\`autosave\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`industries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_industries_v_parent_idx\` ON \`_industries_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_industries_v_version_meta_version_meta_image_idx\` ON \`_industries_v\` (\`version_meta_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_industries_v_version_version_slug_idx\` ON \`_industries_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_industries_v_version_version_updated_at_idx\` ON \`_industries_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_industries_v_version_version_created_at_idx\` ON \`_industries_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_industries_v_version_version__status_idx\` ON \`_industries_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_industries_v_created_at_idx\` ON \`_industries_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_industries_v_updated_at_idx\` ON \`_industries_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_industries_v_latest_idx\` ON \`_industries_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX \`_industries_v_autosave_idx\` ON \`_industries_v\` (\`autosave\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_metrics\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` text,
  	\`label\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_metrics_order_idx\` ON \`case_studies_metrics\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_metrics_parent_id_idx\` ON \`case_studies_metrics\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_tags\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tag\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_tags_order_idx\` ON \`case_studies_tags\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_tags_parent_id_idx\` ON \`case_studies_tags\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`slug\` text,
  	\`category\` text,
  	\`client\` text,
  	\`industry\` text,
  	\`project_slug_id\` integer,
  	\`why_it_matters\` text,
  	\`initial_situation\` text,
  	\`scope\` text,
  	\`key_decision\` text,
  	\`outcome\` text,
  	\`systems_affected\` text,
  	\`meta_title\` text,
  	\`meta_image_id\` integer,
  	\`meta_description\` text,
  	\`published_at\` text,
  	\`sort_order\` numeric,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`project_slug_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`case_studies_slug_idx\` ON \`case_studies\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_project_slug_idx\` ON \`case_studies\` (\`project_slug_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_meta_meta_image_idx\` ON \`case_studies\` (\`meta_image_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_updated_at_idx\` ON \`case_studies\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_created_at_idx\` ON \`case_studies\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`case_studies__status_idx\` ON \`case_studies\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_version_metrics\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`value\` text,
  	\`label\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_version_metrics_order_idx\` ON \`_case_studies_v_version_metrics\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_version_metrics_parent_id_idx\` ON \`_case_studies_v_version_metrics\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_version_tags\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tag\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_version_tags_order_idx\` ON \`_case_studies_v_version_tags\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_version_tags_parent_id_idx\` ON \`_case_studies_v_version_tags\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_slug\` text,
  	\`version_category\` text,
  	\`version_client\` text,
  	\`version_industry\` text,
  	\`version_project_slug_id\` integer,
  	\`version_why_it_matters\` text,
  	\`version_initial_situation\` text,
  	\`version_scope\` text,
  	\`version_key_decision\` text,
  	\`version_outcome\` text,
  	\`version_systems_affected\` text,
  	\`version_meta_title\` text,
  	\`version_meta_image_id\` integer,
  	\`version_meta_description\` text,
  	\`version_published_at\` text,
  	\`version_sort_order\` numeric,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	\`autosave\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_project_slug_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_parent_idx\` ON \`_case_studies_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_version_version_slug_idx\` ON \`_case_studies_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_version_version_project_slug_idx\` ON \`_case_studies_v\` (\`version_project_slug_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_version_meta_version_meta_image_idx\` ON \`_case_studies_v\` (\`version_meta_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_version_version_updated_at_idx\` ON \`_case_studies_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_version_version_created_at_idx\` ON \`_case_studies_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_version_version__status_idx\` ON \`_case_studies_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_created_at_idx\` ON \`_case_studies_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_updated_at_idx\` ON \`_case_studies_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_latest_idx\` ON \`_case_studies_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_autosave_idx\` ON \`_case_studies_v\` (\`autosave\`);`)
  await db.run(sql`CREATE TABLE \`testimonials\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`author\` text,
  	\`role\` text,
  	\`company\` text,
  	\`quote\` text,
  	\`avatar_id\` integer,
  	\`featured\` integer DEFAULT false,
  	\`sort_order\` numeric,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`avatar_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`testimonials_avatar_idx\` ON \`testimonials\` (\`avatar_id\`);`)
  await db.run(sql`CREATE INDEX \`testimonials_updated_at_idx\` ON \`testimonials\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`testimonials_created_at_idx\` ON \`testimonials\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`testimonials__status_idx\` ON \`testimonials\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`_testimonials_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_author\` text,
  	\`version_role\` text,
  	\`version_company\` text,
  	\`version_quote\` text,
  	\`version_avatar_id\` integer,
  	\`version_featured\` integer DEFAULT false,
  	\`version_sort_order\` numeric,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	\`autosave\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`testimonials\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_avatar_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_testimonials_v_parent_idx\` ON \`_testimonials_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_testimonials_v_version_version_avatar_idx\` ON \`_testimonials_v\` (\`version_avatar_id\`);`)
  await db.run(sql`CREATE INDEX \`_testimonials_v_version_version_updated_at_idx\` ON \`_testimonials_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_testimonials_v_version_version_created_at_idx\` ON \`_testimonials_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_testimonials_v_version_version__status_idx\` ON \`_testimonials_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_testimonials_v_created_at_idx\` ON \`_testimonials_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_testimonials_v_updated_at_idx\` ON \`_testimonials_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_testimonials_v_latest_idx\` ON \`_testimonials_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX \`_testimonials_v_autosave_idx\` ON \`_testimonials_v\` (\`autosave\`);`)
  await db.run(sql`CREATE TABLE \`leads\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`email\` text NOT NULL,
  	\`message\` text NOT NULL,
  	\`project_type\` text,
  	\`source\` text DEFAULT 'chat',
  	\`status\` text DEFAULT 'new',
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`leads_updated_at_idx\` ON \`leads\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`leads_created_at_idx\` ON \`leads\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`_leads_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_name\` text NOT NULL,
  	\`version_email\` text NOT NULL,
  	\`version_message\` text NOT NULL,
  	\`version_project_type\` text,
  	\`version_source\` text DEFAULT 'chat',
  	\`version_status\` text DEFAULT 'new',
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`leads\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_leads_v_parent_idx\` ON \`_leads_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_leads_v_version_version_updated_at_idx\` ON \`_leads_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_leads_v_version_version_created_at_idx\` ON \`_leads_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_leads_v_created_at_idx\` ON \`_leads_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_leads_v_updated_at_idx\` ON \`_leads_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`comments\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`insight_id\` integer NOT NULL,
  	\`author\` text NOT NULL,
  	\`email\` text NOT NULL,
  	\`content\` text NOT NULL,
  	\`approved\` integer DEFAULT false,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`insight_id\`) REFERENCES \`insights\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`comments_insight_idx\` ON \`comments\` (\`insight_id\`);`)
  await db.run(sql`CREATE INDEX \`comments_approved_idx\` ON \`comments\` (\`approved\`);`)
  await db.run(sql`CREATE INDEX \`comments_updated_at_idx\` ON \`comments\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`comments_created_at_idx\` ON \`comments\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`_comments_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_insight_id\` integer NOT NULL,
  	\`version_author\` text NOT NULL,
  	\`version_email\` text NOT NULL,
  	\`version_content\` text NOT NULL,
  	\`version_approved\` integer DEFAULT false,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`comments\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_insight_id\`) REFERENCES \`insights\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_comments_v_parent_idx\` ON \`_comments_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_comments_v_version_version_insight_idx\` ON \`_comments_v\` (\`version_insight_id\`);`)
  await db.run(sql`CREATE INDEX \`_comments_v_version_version_approved_idx\` ON \`_comments_v\` (\`version_approved\`);`)
  await db.run(sql`CREATE INDEX \`_comments_v_version_version_updated_at_idx\` ON \`_comments_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_comments_v_version_version_created_at_idx\` ON \`_comments_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_comments_v_created_at_idx\` ON \`_comments_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_comments_v_updated_at_idx\` ON \`_comments_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`media\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`alt\` text,
  	\`_h_folders_id\` integer,
  	\`caption\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`url\` text,
  	\`thumbnail_u_r_l\` text,
  	\`filename\` text,
  	\`mime_type\` text,
  	\`filesize\` numeric,
  	\`width\` numeric,
  	\`height\` numeric,
  	\`focal_x\` numeric,
  	\`focal_y\` numeric,
  	\`sizes_thumbnail_url\` text,
  	\`sizes_thumbnail_width\` numeric,
  	\`sizes_thumbnail_height\` numeric,
  	\`sizes_thumbnail_mime_type\` text,
  	\`sizes_thumbnail_filesize\` numeric,
  	\`sizes_thumbnail_filename\` text,
  	\`sizes_square_url\` text,
  	\`sizes_square_width\` numeric,
  	\`sizes_square_height\` numeric,
  	\`sizes_square_mime_type\` text,
  	\`sizes_square_filesize\` numeric,
  	\`sizes_square_filename\` text,
  	\`sizes_small_url\` text,
  	\`sizes_small_width\` numeric,
  	\`sizes_small_height\` numeric,
  	\`sizes_small_mime_type\` text,
  	\`sizes_small_filesize\` numeric,
  	\`sizes_small_filename\` text,
  	\`sizes_medium_url\` text,
  	\`sizes_medium_width\` numeric,
  	\`sizes_medium_height\` numeric,
  	\`sizes_medium_mime_type\` text,
  	\`sizes_medium_filesize\` numeric,
  	\`sizes_medium_filename\` text,
  	\`sizes_large_url\` text,
  	\`sizes_large_width\` numeric,
  	\`sizes_large_height\` numeric,
  	\`sizes_large_mime_type\` text,
  	\`sizes_large_filesize\` numeric,
  	\`sizes_large_filename\` text,
  	\`sizes_xlarge_url\` text,
  	\`sizes_xlarge_width\` numeric,
  	\`sizes_xlarge_height\` numeric,
  	\`sizes_xlarge_mime_type\` text,
  	\`sizes_xlarge_filesize\` numeric,
  	\`sizes_xlarge_filename\` text,
  	\`sizes_og_url\` text,
  	\`sizes_og_width\` numeric,
  	\`sizes_og_height\` numeric,
  	\`sizes_og_mime_type\` text,
  	\`sizes_og_filesize\` numeric,
  	\`sizes_og_filename\` text,
  	FOREIGN KEY (\`_h_folders_id\`) REFERENCES \`folders\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`media__h_folders_idx\` ON \`media\` (\`_h_folders_id\`);`)
  await db.run(sql`CREATE INDEX \`media_updated_at_idx\` ON \`media\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`media_created_at_idx\` ON \`media\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`media_filename_idx\` ON \`media\` (\`filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_thumbnail_sizes_thumbnail_filename_idx\` ON \`media\` (\`sizes_thumbnail_filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_square_sizes_square_filename_idx\` ON \`media\` (\`sizes_square_filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_small_sizes_small_filename_idx\` ON \`media\` (\`sizes_small_filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_medium_sizes_medium_filename_idx\` ON \`media\` (\`sizes_medium_filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_large_sizes_large_filename_idx\` ON \`media\` (\`sizes_large_filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_xlarge_sizes_xlarge_filename_idx\` ON \`media\` (\`sizes_xlarge_filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_og_sizes_og_filename_idx\` ON \`media\` (\`sizes_og_filename\`);`)
  await db.run(sql`CREATE TABLE \`_media_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_alt\` text,
  	\`version__h_folders_id\` integer,
  	\`version_caption\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version_url\` text,
  	\`version_thumbnail_u_r_l\` text,
  	\`version_filename\` text,
  	\`version_mime_type\` text,
  	\`version_filesize\` numeric,
  	\`version_width\` numeric,
  	\`version_height\` numeric,
  	\`version_focal_x\` numeric,
  	\`version_focal_y\` numeric,
  	\`version_sizes_thumbnail_url\` text,
  	\`version_sizes_thumbnail_width\` numeric,
  	\`version_sizes_thumbnail_height\` numeric,
  	\`version_sizes_thumbnail_mime_type\` text,
  	\`version_sizes_thumbnail_filesize\` numeric,
  	\`version_sizes_thumbnail_filename\` text,
  	\`version_sizes_square_url\` text,
  	\`version_sizes_square_width\` numeric,
  	\`version_sizes_square_height\` numeric,
  	\`version_sizes_square_mime_type\` text,
  	\`version_sizes_square_filesize\` numeric,
  	\`version_sizes_square_filename\` text,
  	\`version_sizes_small_url\` text,
  	\`version_sizes_small_width\` numeric,
  	\`version_sizes_small_height\` numeric,
  	\`version_sizes_small_mime_type\` text,
  	\`version_sizes_small_filesize\` numeric,
  	\`version_sizes_small_filename\` text,
  	\`version_sizes_medium_url\` text,
  	\`version_sizes_medium_width\` numeric,
  	\`version_sizes_medium_height\` numeric,
  	\`version_sizes_medium_mime_type\` text,
  	\`version_sizes_medium_filesize\` numeric,
  	\`version_sizes_medium_filename\` text,
  	\`version_sizes_large_url\` text,
  	\`version_sizes_large_width\` numeric,
  	\`version_sizes_large_height\` numeric,
  	\`version_sizes_large_mime_type\` text,
  	\`version_sizes_large_filesize\` numeric,
  	\`version_sizes_large_filename\` text,
  	\`version_sizes_xlarge_url\` text,
  	\`version_sizes_xlarge_width\` numeric,
  	\`version_sizes_xlarge_height\` numeric,
  	\`version_sizes_xlarge_mime_type\` text,
  	\`version_sizes_xlarge_filesize\` numeric,
  	\`version_sizes_xlarge_filename\` text,
  	\`version_sizes_og_url\` text,
  	\`version_sizes_og_width\` numeric,
  	\`version_sizes_og_height\` numeric,
  	\`version_sizes_og_mime_type\` text,
  	\`version_sizes_og_filesize\` numeric,
  	\`version_sizes_og_filename\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version__h_folders_id\`) REFERENCES \`folders\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_media_v_parent_idx\` ON \`_media_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_media_v_version_version__h_folders_idx\` ON \`_media_v\` (\`version__h_folders_id\`);`)
  await db.run(sql`CREATE INDEX \`_media_v_version_version_updated_at_idx\` ON \`_media_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_media_v_version_version_created_at_idx\` ON \`_media_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_media_v_version_version_filename_idx\` ON \`_media_v\` (\`version_filename\`);`)
  await db.run(sql`CREATE INDEX \`_media_v_version_sizes_thumbnail_version_sizes_thumbnail_idx\` ON \`_media_v\` (\`version_sizes_thumbnail_filename\`);`)
  await db.run(sql`CREATE INDEX \`_media_v_version_sizes_square_version_sizes_square_filen_idx\` ON \`_media_v\` (\`version_sizes_square_filename\`);`)
  await db.run(sql`CREATE INDEX \`_media_v_version_sizes_small_version_sizes_small_filenam_idx\` ON \`_media_v\` (\`version_sizes_small_filename\`);`)
  await db.run(sql`CREATE INDEX \`_media_v_version_sizes_medium_version_sizes_medium_filen_idx\` ON \`_media_v\` (\`version_sizes_medium_filename\`);`)
  await db.run(sql`CREATE INDEX \`_media_v_version_sizes_large_version_sizes_large_filenam_idx\` ON \`_media_v\` (\`version_sizes_large_filename\`);`)
  await db.run(sql`CREATE INDEX \`_media_v_version_sizes_xlarge_version_sizes_xlarge_filen_idx\` ON \`_media_v\` (\`version_sizes_xlarge_filename\`);`)
  await db.run(sql`CREATE INDEX \`_media_v_version_sizes_og_version_sizes_og_filename_idx\` ON \`_media_v\` (\`version_sizes_og_filename\`);`)
  await db.run(sql`CREATE INDEX \`_media_v_created_at_idx\` ON \`_media_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_media_v_updated_at_idx\` ON \`_media_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`categories_breadcrumbs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`doc_id\` integer,
  	\`url\` text,
  	\`label\` text,
  	FOREIGN KEY (\`doc_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`categories_breadcrumbs_order_idx\` ON \`categories_breadcrumbs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`categories_breadcrumbs_parent_id_idx\` ON \`categories_breadcrumbs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`categories_breadcrumbs_doc_idx\` ON \`categories_breadcrumbs\` (\`doc_id\`);`)
  await db.run(sql`CREATE TABLE \`categories\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`parent_id\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`categories_slug_idx\` ON \`categories\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`categories_parent_idx\` ON \`categories\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`categories_updated_at_idx\` ON \`categories\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`categories_created_at_idx\` ON \`categories\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`_categories_v_version_breadcrumbs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`doc_id\` integer,
  	\`url\` text,
  	\`label\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`doc_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_categories_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_categories_v_version_breadcrumbs_order_idx\` ON \`_categories_v_version_breadcrumbs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_version_breadcrumbs_parent_id_idx\` ON \`_categories_v_version_breadcrumbs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_version_breadcrumbs_doc_idx\` ON \`_categories_v_version_breadcrumbs\` (\`doc_id\`);`)
  await db.run(sql`CREATE TABLE \`_categories_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_title\` text NOT NULL,
  	\`version_slug\` text NOT NULL,
  	\`version_parent_id\` integer,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_parent_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_categories_v_parent_idx\` ON \`_categories_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_version_version_slug_idx\` ON \`_categories_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_version_version_parent_idx\` ON \`_categories_v\` (\`version_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_version_version_updated_at_idx\` ON \`_categories_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_version_version_created_at_idx\` ON \`_categories_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_created_at_idx\` ON \`_categories_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_updated_at_idx\` ON \`_categories_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`users_sessions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`created_at\` text,
  	\`expires_at\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`users_sessions_order_idx\` ON \`users_sessions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`users_sessions_parent_id_idx\` ON \`users_sessions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`users\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`email\` text NOT NULL,
  	\`reset_password_token\` text,
  	\`reset_password_expiration\` text,
  	\`salt\` text,
  	\`hash\` text,
  	\`login_attempts\` numeric DEFAULT 0,
  	\`lock_until\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`users_updated_at_idx\` ON \`users\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`users_created_at_idx\` ON \`users\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`users_email_idx\` ON \`users\` (\`email\`);`)
  await db.run(sql`CREATE TABLE \`redirects\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`from\` text NOT NULL,
  	\`to_type\` text DEFAULT 'reference',
  	\`to_url\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`redirects_from_idx\` ON \`redirects\` (\`from\`);`)
  await db.run(sql`CREATE INDEX \`redirects_updated_at_idx\` ON \`redirects\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`redirects_created_at_idx\` ON \`redirects\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`redirects_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` integer,
  	\`insights_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`redirects\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`insights_id\`) REFERENCES \`insights\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`redirects_rels_order_idx\` ON \`redirects_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`redirects_rels_parent_idx\` ON \`redirects_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`redirects_rels_path_idx\` ON \`redirects_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`redirects_rels_pages_id_idx\` ON \`redirects_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`redirects_rels_insights_id_idx\` ON \`redirects_rels\` (\`insights_id\`);`)
  await db.run(sql`CREATE TABLE \`_redirects_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_from\` text NOT NULL,
  	\`version_to_type\` text DEFAULT 'reference',
  	\`version_to_url\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`redirects\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_redirects_v_parent_idx\` ON \`_redirects_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_redirects_v_version_version_from_idx\` ON \`_redirects_v\` (\`version_from\`);`)
  await db.run(sql`CREATE INDEX \`_redirects_v_version_version_updated_at_idx\` ON \`_redirects_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_redirects_v_version_version_created_at_idx\` ON \`_redirects_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_redirects_v_created_at_idx\` ON \`_redirects_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_redirects_v_updated_at_idx\` ON \`_redirects_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`_redirects_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` integer,
  	\`insights_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_redirects_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`insights_id\`) REFERENCES \`insights\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_redirects_v_rels_order_idx\` ON \`_redirects_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_redirects_v_rels_parent_idx\` ON \`_redirects_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_redirects_v_rels_path_idx\` ON \`_redirects_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_redirects_v_rels_pages_id_idx\` ON \`_redirects_v_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`_redirects_v_rels_insights_id_idx\` ON \`_redirects_v_rels\` (\`insights_id\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_checkbox\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`label\` text,
  	\`width\` numeric,
  	\`required\` integer,
  	\`default_value\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_checkbox_order_idx\` ON \`forms_blocks_checkbox\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_checkbox_parent_id_idx\` ON \`forms_blocks_checkbox\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_checkbox_path_idx\` ON \`forms_blocks_checkbox\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_country\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`label\` text,
  	\`width\` numeric,
  	\`required\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_country_order_idx\` ON \`forms_blocks_country\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_country_parent_id_idx\` ON \`forms_blocks_country\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_country_path_idx\` ON \`forms_blocks_country\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_email\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`label\` text,
  	\`width\` numeric,
  	\`required\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_email_order_idx\` ON \`forms_blocks_email\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_email_parent_id_idx\` ON \`forms_blocks_email\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_email_path_idx\` ON \`forms_blocks_email\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_message\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`message\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_message_order_idx\` ON \`forms_blocks_message\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_message_parent_id_idx\` ON \`forms_blocks_message\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_message_path_idx\` ON \`forms_blocks_message\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_number\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`label\` text,
  	\`width\` numeric,
  	\`default_value\` numeric,
  	\`required\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_number_order_idx\` ON \`forms_blocks_number\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_number_parent_id_idx\` ON \`forms_blocks_number\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_number_path_idx\` ON \`forms_blocks_number\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_select_options\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`value\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms_blocks_select\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_select_options_order_idx\` ON \`forms_blocks_select_options\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_select_options_parent_id_idx\` ON \`forms_blocks_select_options\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_select\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`label\` text,
  	\`width\` numeric,
  	\`default_value\` text,
  	\`placeholder\` text,
  	\`required\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_select_order_idx\` ON \`forms_blocks_select\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_select_parent_id_idx\` ON \`forms_blocks_select\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_select_path_idx\` ON \`forms_blocks_select\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_state\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`label\` text,
  	\`width\` numeric,
  	\`required\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_state_order_idx\` ON \`forms_blocks_state\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_state_parent_id_idx\` ON \`forms_blocks_state\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_state_path_idx\` ON \`forms_blocks_state\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`label\` text,
  	\`width\` numeric,
  	\`default_value\` text,
  	\`required\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_text_order_idx\` ON \`forms_blocks_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_text_parent_id_idx\` ON \`forms_blocks_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_text_path_idx\` ON \`forms_blocks_text\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_textarea\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`label\` text,
  	\`width\` numeric,
  	\`default_value\` text,
  	\`required\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_textarea_order_idx\` ON \`forms_blocks_textarea\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_textarea_parent_id_idx\` ON \`forms_blocks_textarea\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_textarea_path_idx\` ON \`forms_blocks_textarea\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`forms_emails\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`email_to\` text,
  	\`cc\` text,
  	\`bcc\` text,
  	\`reply_to\` text,
  	\`email_from\` text,
  	\`subject\` text DEFAULT 'You''ve received a new message.' NOT NULL,
  	\`message\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_emails_order_idx\` ON \`forms_emails\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_emails_parent_id_idx\` ON \`forms_emails\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`forms\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`submit_button_label\` text,
  	\`confirmation_type\` text DEFAULT 'message',
  	\`confirmation_message\` text,
  	\`redirect_url\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_updated_at_idx\` ON \`forms\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`forms_created_at_idx\` ON \`forms\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`_forms_v_blocks_checkbox\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`label\` text,
  	\`width\` numeric,
  	\`required\` integer,
  	\`default_value\` integer,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_forms_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_forms_v_blocks_checkbox_order_idx\` ON \`_forms_v_blocks_checkbox\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_forms_v_blocks_checkbox_parent_id_idx\` ON \`_forms_v_blocks_checkbox\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_forms_v_blocks_checkbox_path_idx\` ON \`_forms_v_blocks_checkbox\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_forms_v_blocks_country\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`label\` text,
  	\`width\` numeric,
  	\`required\` integer,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_forms_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_forms_v_blocks_country_order_idx\` ON \`_forms_v_blocks_country\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_forms_v_blocks_country_parent_id_idx\` ON \`_forms_v_blocks_country\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_forms_v_blocks_country_path_idx\` ON \`_forms_v_blocks_country\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_forms_v_blocks_email\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`label\` text,
  	\`width\` numeric,
  	\`required\` integer,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_forms_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_forms_v_blocks_email_order_idx\` ON \`_forms_v_blocks_email\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_forms_v_blocks_email_parent_id_idx\` ON \`_forms_v_blocks_email\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_forms_v_blocks_email_path_idx\` ON \`_forms_v_blocks_email\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_forms_v_blocks_message\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`message\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_forms_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_forms_v_blocks_message_order_idx\` ON \`_forms_v_blocks_message\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_forms_v_blocks_message_parent_id_idx\` ON \`_forms_v_blocks_message\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_forms_v_blocks_message_path_idx\` ON \`_forms_v_blocks_message\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_forms_v_blocks_number\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`label\` text,
  	\`width\` numeric,
  	\`default_value\` numeric,
  	\`required\` integer,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_forms_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_forms_v_blocks_number_order_idx\` ON \`_forms_v_blocks_number\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_forms_v_blocks_number_parent_id_idx\` ON \`_forms_v_blocks_number\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_forms_v_blocks_number_path_idx\` ON \`_forms_v_blocks_number\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_forms_v_blocks_select_options\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`value\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_forms_v_blocks_select\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_forms_v_blocks_select_options_order_idx\` ON \`_forms_v_blocks_select_options\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_forms_v_blocks_select_options_parent_id_idx\` ON \`_forms_v_blocks_select_options\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_forms_v_blocks_select\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`label\` text,
  	\`width\` numeric,
  	\`default_value\` text,
  	\`placeholder\` text,
  	\`required\` integer,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_forms_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_forms_v_blocks_select_order_idx\` ON \`_forms_v_blocks_select\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_forms_v_blocks_select_parent_id_idx\` ON \`_forms_v_blocks_select\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_forms_v_blocks_select_path_idx\` ON \`_forms_v_blocks_select\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_forms_v_blocks_state\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`label\` text,
  	\`width\` numeric,
  	\`required\` integer,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_forms_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_forms_v_blocks_state_order_idx\` ON \`_forms_v_blocks_state\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_forms_v_blocks_state_parent_id_idx\` ON \`_forms_v_blocks_state\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_forms_v_blocks_state_path_idx\` ON \`_forms_v_blocks_state\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_forms_v_blocks_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`label\` text,
  	\`width\` numeric,
  	\`default_value\` text,
  	\`required\` integer,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_forms_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_forms_v_blocks_text_order_idx\` ON \`_forms_v_blocks_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_forms_v_blocks_text_parent_id_idx\` ON \`_forms_v_blocks_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_forms_v_blocks_text_path_idx\` ON \`_forms_v_blocks_text\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_forms_v_blocks_textarea\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`label\` text,
  	\`width\` numeric,
  	\`default_value\` text,
  	\`required\` integer,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_forms_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_forms_v_blocks_textarea_order_idx\` ON \`_forms_v_blocks_textarea\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_forms_v_blocks_textarea_parent_id_idx\` ON \`_forms_v_blocks_textarea\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_forms_v_blocks_textarea_path_idx\` ON \`_forms_v_blocks_textarea\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_forms_v_version_emails\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`email_to\` text,
  	\`cc\` text,
  	\`bcc\` text,
  	\`reply_to\` text,
  	\`email_from\` text,
  	\`subject\` text DEFAULT 'You''ve received a new message.' NOT NULL,
  	\`message\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_forms_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_forms_v_version_emails_order_idx\` ON \`_forms_v_version_emails\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_forms_v_version_emails_parent_id_idx\` ON \`_forms_v_version_emails\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_forms_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_title\` text NOT NULL,
  	\`version_submit_button_label\` text,
  	\`version_confirmation_type\` text DEFAULT 'message',
  	\`version_confirmation_message\` text,
  	\`version_redirect_url\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_forms_v_parent_idx\` ON \`_forms_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_forms_v_version_version_updated_at_idx\` ON \`_forms_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_forms_v_version_version_created_at_idx\` ON \`_forms_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_forms_v_created_at_idx\` ON \`_forms_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_forms_v_updated_at_idx\` ON \`_forms_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`form_submissions_submission_data\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`field\` text NOT NULL,
  	\`value\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`form_submissions\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`form_submissions_submission_data_order_idx\` ON \`form_submissions_submission_data\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_submission_data_parent_id_idx\` ON \`form_submissions_submission_data\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`form_submissions\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`form_id\` integer NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`form_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`form_submissions_form_idx\` ON \`form_submissions\` (\`form_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_updated_at_idx\` ON \`form_submissions\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_created_at_idx\` ON \`form_submissions\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`_form_submissions_v_version_submission_data\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`field\` text NOT NULL,
  	\`value\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_form_submissions_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_version_submission_data_order_idx\` ON \`_form_submissions_v_version_submission_data\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_version_submission_data_parent_id_idx\` ON \`_form_submissions_v_version_submission_data\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_form_submissions_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_form_id\` integer NOT NULL,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`form_submissions\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_form_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_parent_idx\` ON \`_form_submissions_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_version_version_form_idx\` ON \`_form_submissions_v\` (\`version_form_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_version_version_updated_at_idx\` ON \`_form_submissions_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_version_version_created_at_idx\` ON \`_form_submissions_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_created_at_idx\` ON \`_form_submissions_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_updated_at_idx\` ON \`_form_submissions_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`search_categories\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`relation_to\` text,
  	\`category_i_d\` text,
  	\`title\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`search\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`search_categories_order_idx\` ON \`search_categories\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`search_categories_parent_id_idx\` ON \`search_categories\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`search\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`priority\` numeric,
  	\`slug\` text,
  	\`meta_title\` text,
  	\`meta_description\` text,
  	\`meta_image_id\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`search_slug_idx\` ON \`search\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`search_meta_meta_image_idx\` ON \`search\` (\`meta_image_id\`);`)
  await db.run(sql`CREATE INDEX \`search_updated_at_idx\` ON \`search\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`search_created_at_idx\` ON \`search\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`search_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`insights_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`search\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`insights_id\`) REFERENCES \`insights\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`search_rels_order_idx\` ON \`search_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`search_rels_parent_idx\` ON \`search_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`search_rels_path_idx\` ON \`search_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`search_rels_insights_id_idx\` ON \`search_rels\` (\`insights_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_kv\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text NOT NULL,
  	\`data\` text NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`payload_kv_key_idx\` ON \`payload_kv\` (\`key\`);`)
  await db.run(sql`CREATE TABLE \`payload_jobs_log\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`executed_at\` text NOT NULL,
  	\`completed_at\` text NOT NULL,
  	\`task_slug\` text NOT NULL,
  	\`task_i_d\` text NOT NULL,
  	\`input\` text NOT NULL,
  	\`output\` text,
  	\`state\` text NOT NULL,
  	\`error\` text,
  	\`parent_task_slug\` text,
  	\`parent_task_i_d\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`payload_jobs\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_jobs_log_order_idx\` ON \`payload_jobs_log\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`payload_jobs_log_parent_id_idx\` ON \`payload_jobs_log\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_jobs\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`input\` text,
  	\`meta\` text,
  	\`completed_at\` text,
  	\`total_tried\` numeric DEFAULT 0,
  	\`has_error\` integer DEFAULT false,
  	\`error\` text,
  	\`task_slug\` text,
  	\`queue\` text DEFAULT 'default',
  	\`wait_until\` text,
  	\`processing_until\` text,
  	\`processing_token\` text,
  	\`concurrency_key\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_jobs_completed_at_idx\` ON \`payload_jobs\` (\`completed_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_jobs_total_tried_idx\` ON \`payload_jobs\` (\`total_tried\`);`)
  await db.run(sql`CREATE INDEX \`payload_jobs_has_error_idx\` ON \`payload_jobs\` (\`has_error\`);`)
  await db.run(sql`CREATE INDEX \`payload_jobs_task_slug_idx\` ON \`payload_jobs\` (\`task_slug\`);`)
  await db.run(sql`CREATE INDEX \`payload_jobs_queue_idx\` ON \`payload_jobs\` (\`queue\`);`)
  await db.run(sql`CREATE INDEX \`payload_jobs_wait_until_idx\` ON \`payload_jobs\` (\`wait_until\`);`)
  await db.run(sql`CREATE INDEX \`payload_jobs_processing_until_idx\` ON \`payload_jobs\` (\`processing_until\`);`)
  await db.run(sql`CREATE INDEX \`payload_jobs_concurrency_key_idx\` ON \`payload_jobs\` (\`concurrency_key\`);`)
  await db.run(sql`CREATE INDEX \`payload_jobs_updated_at_idx\` ON \`payload_jobs\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_jobs_created_at_idx\` ON \`payload_jobs\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`global_slug\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_global_slug_idx\` ON \`payload_locked_documents\` (\`global_slug\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_updated_at_idx\` ON \`payload_locked_documents\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_created_at_idx\` ON \`payload_locked_documents\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`folders_id\` integer,
  	\`pages_id\` integer,
  	\`insights_id\` integer,
  	\`projects_id\` integer,
  	\`services_id\` integer,
  	\`industries_id\` integer,
  	\`case_studies_id\` integer,
  	\`testimonials_id\` integer,
  	\`leads_id\` integer,
  	\`comments_id\` integer,
  	\`media_id\` integer,
  	\`categories_id\` integer,
  	\`users_id\` integer,
  	\`redirects_id\` integer,
  	\`forms_id\` integer,
  	\`form_submissions_id\` integer,
  	\`search_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`folders_id\`) REFERENCES \`folders\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`insights_id\`) REFERENCES \`insights\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`projects_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`services_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`industries_id\`) REFERENCES \`industries\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`case_studies_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`testimonials_id\`) REFERENCES \`testimonials\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`leads_id\`) REFERENCES \`leads\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`comments_id\`) REFERENCES \`comments\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`redirects_id\`) REFERENCES \`redirects\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`forms_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`form_submissions_id\`) REFERENCES \`form_submissions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`search_id\`) REFERENCES \`search\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_folders_id_idx\` ON \`payload_locked_documents_rels\` (\`folders_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_pages_id_idx\` ON \`payload_locked_documents_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_insights_id_idx\` ON \`payload_locked_documents_rels\` (\`insights_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_projects_id_idx\` ON \`payload_locked_documents_rels\` (\`projects_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_services_id_idx\` ON \`payload_locked_documents_rels\` (\`services_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_industries_id_idx\` ON \`payload_locked_documents_rels\` (\`industries_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_case_studies_id_idx\` ON \`payload_locked_documents_rels\` (\`case_studies_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_testimonials_id_idx\` ON \`payload_locked_documents_rels\` (\`testimonials_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_leads_id_idx\` ON \`payload_locked_documents_rels\` (\`leads_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_comments_id_idx\` ON \`payload_locked_documents_rels\` (\`comments_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_categories_id_idx\` ON \`payload_locked_documents_rels\` (\`categories_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_redirects_id_idx\` ON \`payload_locked_documents_rels\` (\`redirects_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_forms_id_idx\` ON \`payload_locked_documents_rels\` (\`forms_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_form_submissions_id_idx\` ON \`payload_locked_documents_rels\` (\`form_submissions_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_search_id_idx\` ON \`payload_locked_documents_rels\` (\`search_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text,
  	\`value\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_key_idx\` ON \`payload_preferences\` (\`key\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_updated_at_idx\` ON \`payload_preferences\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_created_at_idx\` ON \`payload_preferences\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_preferences\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_order_idx\` ON \`payload_preferences_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_parent_idx\` ON \`payload_preferences_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_path_idx\` ON \`payload_preferences_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_users_id_idx\` ON \`payload_preferences_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_migrations\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`batch\` numeric,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_migrations_updated_at_idx\` ON \`payload_migrations\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_migrations_created_at_idx\` ON \`payload_migrations\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`header_nav_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`header\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`header_nav_items_order_idx\` ON \`header_nav_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`header_nav_items_parent_id_idx\` ON \`header_nav_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`header\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`header_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` integer,
  	\`insights_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`header\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`insights_id\`) REFERENCES \`insights\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`header_rels_order_idx\` ON \`header_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`header_rels_parent_idx\` ON \`header_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`header_rels_path_idx\` ON \`header_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`header_rels_pages_id_idx\` ON \`header_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`header_rels_insights_id_idx\` ON \`header_rels\` (\`insights_id\`);`)
  await db.run(sql`CREATE TABLE \`footer_nav_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`footer\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`footer_nav_items_order_idx\` ON \`footer_nav_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`footer_nav_items_parent_id_idx\` ON \`footer_nav_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`footer\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`footer_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` integer,
  	\`insights_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`footer\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`insights_id\`) REFERENCES \`insights\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`footer_rels_order_idx\` ON \`footer_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`footer_rels_parent_idx\` ON \`footer_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`footer_rels_path_idx\` ON \`footer_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`footer_rels_pages_id_idx\` ON \`footer_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`footer_rels_insights_id_idx\` ON \`footer_rels\` (\`insights_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_roles\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`role\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_roles_order_idx\` ON \`site_settings_roles\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_roles_parent_id_idx\` ON \`site_settings_roles\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_socials\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`url\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_socials_order_idx\` ON \`site_settings_socials\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_socials_parent_id_idx\` ON \`site_settings_socials\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_metrics\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` text,
  	\`label\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_metrics_order_idx\` ON \`site_settings_metrics\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_metrics_parent_id_idx\` ON \`site_settings_metrics\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_clients\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`type\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_clients_order_idx\` ON \`site_settings_clients\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_clients_parent_id_idx\` ON \`site_settings_clients\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_contact_channels\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`url\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_contact_channels_order_idx\` ON \`site_settings_contact_channels\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_contact_channels_parent_id_idx\` ON \`site_settings_contact_channels\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_project_types\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`type\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_project_types_order_idx\` ON \`site_settings_project_types\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_project_types_parent_id_idx\` ON \`site_settings_project_types\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_budget_ranges\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`range\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_budget_ranges_order_idx\` ON \`site_settings_budget_ranges\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_budget_ranges_parent_id_idx\` ON \`site_settings_budget_ranges\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_timelines\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`timeline\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_timelines_order_idx\` ON \`site_settings_timelines\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_timelines_parent_id_idx\` ON \`site_settings_timelines\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_contact_steps\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`description\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_contact_steps_order_idx\` ON \`site_settings_contact_steps\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_contact_steps_parent_id_idx\` ON \`site_settings_contact_steps\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_contact_faq\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`question\` text,
  	\`answer\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_contact_faq_order_idx\` ON \`site_settings_contact_faq\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_contact_faq_parent_id_idx\` ON \`site_settings_contact_faq\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_footer_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_footer_links_order_idx\` ON \`site_settings_footer_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_footer_links_parent_id_idx\` ON \`site_settings_footer_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`site_name\` text NOT NULL,
  	\`name\` text NOT NULL,
  	\`tagline\` text,
  	\`availability\` text,
  	\`location\` text,
  	\`email\` text,
  	\`calendly_url\` text,
  	\`hero_headline\` text,
  	\`hero_intro\` text,
  	\`cta_title\` text,
  	\`cta_subtitle\` text,
  	\`cta_primary_label\` text,
  	\`cta_primary_to\` text,
  	\`cta_secondary_label\` text,
  	\`cta_secondary_to\` text,
  	\`contact_intro\` text,
  	\`footer_note\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`site_settings_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` integer,
  	\`insights_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`insights_id\`) REFERENCES \`insights\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_rels_order_idx\` ON \`site_settings_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_rels_parent_idx\` ON \`site_settings_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_rels_path_idx\` ON \`site_settings_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_rels_pages_id_idx\` ON \`site_settings_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_rels_insights_id_idx\` ON \`site_settings_rels\` (\`insights_id\`);`)
  await db.run(sql`CREATE TABLE \`about_blocks_about_hero_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` text,
  	\`label\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`about_blocks_about_hero\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`about_blocks_about_hero_stats_order_idx\` ON \`about_blocks_about_hero_stats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`about_blocks_about_hero_stats_parent_id_idx\` ON \`about_blocks_about_hero_stats\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`about_blocks_about_hero\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`portrait_id\` integer,
  	\`headline\` text,
  	\`intro\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`portrait_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`about\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`about_blocks_about_hero_order_idx\` ON \`about_blocks_about_hero\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`about_blocks_about_hero_parent_id_idx\` ON \`about_blocks_about_hero\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`about_blocks_about_hero_path_idx\` ON \`about_blocks_about_hero\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`about_blocks_about_hero_portrait_idx\` ON \`about_blocks_about_hero\` (\`portrait_id\`);`)
  await db.run(sql`CREATE TABLE \`about_blocks_origin_story\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text DEFAULT 'Where it started',
  	\`content\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`about\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`about_blocks_origin_story_order_idx\` ON \`about_blocks_origin_story\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`about_blocks_origin_story_parent_id_idx\` ON \`about_blocks_origin_story\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`about_blocks_origin_story_path_idx\` ON \`about_blocks_origin_story\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`about_blocks_philosophy_values\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`icon\` text,
  	\`title\` text,
  	\`description\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`about_blocks_philosophy\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`about_blocks_philosophy_values_order_idx\` ON \`about_blocks_philosophy_values\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`about_blocks_philosophy_values_parent_id_idx\` ON \`about_blocks_philosophy_values\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`about_blocks_philosophy\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text DEFAULT 'How I think',
  	\`intro\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`about\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`about_blocks_philosophy_order_idx\` ON \`about_blocks_philosophy\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`about_blocks_philosophy_parent_id_idx\` ON \`about_blocks_philosophy\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`about_blocks_philosophy_path_idx\` ON \`about_blocks_philosophy\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`about_blocks_timeline_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`year\` text,
  	\`title\` text,
  	\`description\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`about_blocks_timeline\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`about_blocks_timeline_items_order_idx\` ON \`about_blocks_timeline_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`about_blocks_timeline_items_parent_id_idx\` ON \`about_blocks_timeline_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`about_blocks_timeline\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text DEFAULT 'The road so far',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`about\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`about_blocks_timeline_order_idx\` ON \`about_blocks_timeline\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`about_blocks_timeline_parent_id_idx\` ON \`about_blocks_timeline\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`about_blocks_timeline_path_idx\` ON \`about_blocks_timeline\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`about_blocks_skills_categories\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`tools\` text,
  	\`context\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`about_blocks_skills\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`about_blocks_skills_categories_order_idx\` ON \`about_blocks_skills_categories\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`about_blocks_skills_categories_parent_id_idx\` ON \`about_blocks_skills_categories\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`about_blocks_skills\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text DEFAULT 'The stack',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`about\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`about_blocks_skills_order_idx\` ON \`about_blocks_skills\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`about_blocks_skills_parent_id_idx\` ON \`about_blocks_skills\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`about_blocks_skills_path_idx\` ON \`about_blocks_skills\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`about_blocks_beyond_code_paragraphs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`paragraph\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`about_blocks_beyond_code\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`about_blocks_beyond_code_paragraphs_order_idx\` ON \`about_blocks_beyond_code_paragraphs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`about_blocks_beyond_code_paragraphs_parent_id_idx\` ON \`about_blocks_beyond_code_paragraphs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`about_blocks_beyond_code\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text DEFAULT 'Beyond the code',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`about\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`about_blocks_beyond_code_order_idx\` ON \`about_blocks_beyond_code\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`about_blocks_beyond_code_parent_id_idx\` ON \`about_blocks_beyond_code\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`about_blocks_beyond_code_path_idx\` ON \`about_blocks_beyond_code\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`about_blocks_certifications_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`issuer\` text,
  	\`year\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`about_blocks_certifications\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`about_blocks_certifications_items_order_idx\` ON \`about_blocks_certifications_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`about_blocks_certifications_items_parent_id_idx\` ON \`about_blocks_certifications_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`about_blocks_certifications\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text DEFAULT 'Credentials',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`about\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`about_blocks_certifications_order_idx\` ON \`about_blocks_certifications\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`about_blocks_certifications_parent_id_idx\` ON \`about_blocks_certifications\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`about_blocks_certifications_path_idx\` ON \`about_blocks_certifications\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`about\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`home_blocks_home_hero\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_blocks_home_hero_order_idx\` ON \`home_blocks_home_hero\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_blocks_home_hero_parent_id_idx\` ON \`home_blocks_home_hero\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_blocks_home_hero_path_idx\` ON \`home_blocks_home_hero\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`home_blocks_pain_points\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_blocks_pain_points_order_idx\` ON \`home_blocks_pain_points\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_blocks_pain_points_parent_id_idx\` ON \`home_blocks_pain_points\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_blocks_pain_points_path_idx\` ON \`home_blocks_pain_points\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`home_blocks_mini_stack\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_blocks_mini_stack_order_idx\` ON \`home_blocks_mini_stack\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_blocks_mini_stack_parent_id_idx\` ON \`home_blocks_mini_stack\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_blocks_mini_stack_path_idx\` ON \`home_blocks_mini_stack\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`home_blocks_about\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_blocks_about_order_idx\` ON \`home_blocks_about\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_blocks_about_parent_id_idx\` ON \`home_blocks_about\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_blocks_about_path_idx\` ON \`home_blocks_about\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`home_blocks_works\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_blocks_works_order_idx\` ON \`home_blocks_works\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_blocks_works_parent_id_idx\` ON \`home_blocks_works\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_blocks_works_path_idx\` ON \`home_blocks_works\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`home_blocks_services\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_blocks_services_order_idx\` ON \`home_blocks_services\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_blocks_services_parent_id_idx\` ON \`home_blocks_services\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_blocks_services_path_idx\` ON \`home_blocks_services\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`home_blocks_industries\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_blocks_industries_order_idx\` ON \`home_blocks_industries\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_blocks_industries_parent_id_idx\` ON \`home_blocks_industries\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_blocks_industries_path_idx\` ON \`home_blocks_industries\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`home_blocks_process\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_blocks_process_order_idx\` ON \`home_blocks_process\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_blocks_process_parent_id_idx\` ON \`home_blocks_process\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_blocks_process_path_idx\` ON \`home_blocks_process\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`home_blocks_testimonials\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_blocks_testimonials_order_idx\` ON \`home_blocks_testimonials\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_blocks_testimonials_parent_id_idx\` ON \`home_blocks_testimonials\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_blocks_testimonials_path_idx\` ON \`home_blocks_testimonials\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`home_blocks_insights\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_blocks_insights_order_idx\` ON \`home_blocks_insights\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_blocks_insights_parent_id_idx\` ON \`home_blocks_insights\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_blocks_insights_path_idx\` ON \`home_blocks_insights\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`home_blocks_page_cta\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`subtitle\` text,
  	\`primary_label\` text,
  	\`primary_to\` text,
  	\`secondary_label\` text,
  	\`secondary_to\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_blocks_page_cta_order_idx\` ON \`home_blocks_page_cta\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_blocks_page_cta_parent_id_idx\` ON \`home_blocks_page_cta\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_blocks_page_cta_path_idx\` ON \`home_blocks_page_cta\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`home\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`resume_highlights\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` text,
  	\`label\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`resume\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`resume_highlights_order_idx\` ON \`resume_highlights\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`resume_highlights_parent_id_idx\` ON \`resume_highlights\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`resume_experience_achievements\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`achievement\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`resume_experience\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`resume_experience_achievements_order_idx\` ON \`resume_experience_achievements\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`resume_experience_achievements_parent_id_idx\` ON \`resume_experience_achievements\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`resume_experience_stack\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tech\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`resume_experience\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`resume_experience_stack_order_idx\` ON \`resume_experience_stack\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`resume_experience_stack_parent_id_idx\` ON \`resume_experience_stack\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`resume_experience\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`role\` text,
  	\`company\` text,
  	\`period\` text,
  	\`location\` text,
  	\`summary\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`resume\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`resume_experience_order_idx\` ON \`resume_experience\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`resume_experience_parent_id_idx\` ON \`resume_experience\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`resume_education\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`degree\` text,
  	\`institution\` text,
  	\`period\` text,
  	\`detail\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`resume\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`resume_education_order_idx\` ON \`resume_education\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`resume_education_parent_id_idx\` ON \`resume_education\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`resume_skills_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`item\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`resume_skills\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`resume_skills_items_order_idx\` ON \`resume_skills_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`resume_skills_items_parent_id_idx\` ON \`resume_skills_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`resume_skills\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`category\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`resume\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`resume_skills_order_idx\` ON \`resume_skills\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`resume_skills_parent_id_idx\` ON \`resume_skills\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`resume_certifications\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`issuer\` text,
  	\`year\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`resume\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`resume_certifications_order_idx\` ON \`resume_certifications\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`resume_certifications_parent_id_idx\` ON \`resume_certifications\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`resume_speaking\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`event\` text,
  	\`title\` text,
  	\`year\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`resume\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`resume_speaking_order_idx\` ON \`resume_speaking\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`resume_speaking_parent_id_idx\` ON \`resume_speaking\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`resume\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`title\` text,
  	\`email\` text,
  	\`phone\` text,
  	\`location\` text,
  	\`website\` text,
  	\`linkedin\` text,
  	\`github\` text,
  	\`version\` text,
  	\`summary\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`uses_sections_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`detail\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`uses_sections\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`uses_sections_items_order_idx\` ON \`uses_sections_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`uses_sections_items_parent_id_idx\` ON \`uses_sections_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`uses_sections\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`subtitle\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`uses\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`uses_sections_order_idx\` ON \`uses_sections\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`uses_sections_parent_id_idx\` ON \`uses_sections\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`uses\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`intro\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`now_blocks_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`detail\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`now_blocks\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`now_blocks_items_order_idx\` ON \`now_blocks_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`now_blocks_items_parent_id_idx\` ON \`now_blocks_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`now_blocks\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`title\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`now\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`now_blocks_order_idx\` ON \`now_blocks\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`now_blocks_parent_id_idx\` ON \`now_blocks\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`now\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`updated\` text,
  	\`intro\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`speaking_talks\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`event\` text,
  	\`year\` text,
  	\`location\` text,
  	\`link\` text,
  	\`description\` text,
  	\`featured\` integer DEFAULT false,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`speaking\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`speaking_talks_order_idx\` ON \`speaking_talks\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`speaking_talks_parent_id_idx\` ON \`speaking_talks\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`speaking\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`intro\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`payload_jobs_stats\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`stats\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`folders\`;`)
  await db.run(sql`DROP TABLE \`_folders_v\`;`)
  await db.run(sql`DROP TABLE \`pages_hero_links\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_cta_links\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_cta\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_content_columns\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_content\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_media_block\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_archive\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_form_block\`;`)
  await db.run(sql`DROP TABLE \`pages\`;`)
  await db.run(sql`DROP TABLE \`pages_rels\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_version_hero_links\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_cta_links\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_cta\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_content_columns\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_content\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_media_block\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_archive\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_form_block\`;`)
  await db.run(sql`DROP TABLE \`_pages_v\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_rels\`;`)
  await db.run(sql`DROP TABLE \`insights_tags\`;`)
  await db.run(sql`DROP TABLE \`insights_populated_authors\`;`)
  await db.run(sql`DROP TABLE \`insights\`;`)
  await db.run(sql`DROP TABLE \`insights_rels\`;`)
  await db.run(sql`DROP TABLE \`_insights_v_version_tags\`;`)
  await db.run(sql`DROP TABLE \`_insights_v_version_populated_authors\`;`)
  await db.run(sql`DROP TABLE \`_insights_v\`;`)
  await db.run(sql`DROP TABLE \`_insights_v_rels\`;`)
  await db.run(sql`DROP TABLE \`projects_stack\`;`)
  await db.run(sql`DROP TABLE \`projects_architecture\`;`)
  await db.run(sql`DROP TABLE \`projects_features\`;`)
  await db.run(sql`DROP TABLE \`projects_result_metrics\`;`)
  await db.run(sql`DROP TABLE \`projects_lessons\`;`)
  await db.run(sql`DROP TABLE \`projects_development_timeline\`;`)
  await db.run(sql`DROP TABLE \`projects\`;`)
  await db.run(sql`DROP TABLE \`_projects_v_version_stack\`;`)
  await db.run(sql`DROP TABLE \`_projects_v_version_architecture\`;`)
  await db.run(sql`DROP TABLE \`_projects_v_version_features\`;`)
  await db.run(sql`DROP TABLE \`_projects_v_version_result_metrics\`;`)
  await db.run(sql`DROP TABLE \`_projects_v_version_lessons\`;`)
  await db.run(sql`DROP TABLE \`_projects_v_version_development_timeline\`;`)
  await db.run(sql`DROP TABLE \`_projects_v\`;`)
  await db.run(sql`DROP TABLE \`services_deliverables\`;`)
  await db.run(sql`DROP TABLE \`services_stack\`;`)
  await db.run(sql`DROP TABLE \`services_process\`;`)
  await db.run(sql`DROP TABLE \`services_pricing\`;`)
  await db.run(sql`DROP TABLE \`services_faq\`;`)
  await db.run(sql`DROP TABLE \`services\`;`)
  await db.run(sql`DROP TABLE \`_services_v_version_deliverables\`;`)
  await db.run(sql`DROP TABLE \`_services_v_version_stack\`;`)
  await db.run(sql`DROP TABLE \`_services_v_version_process\`;`)
  await db.run(sql`DROP TABLE \`_services_v_version_pricing\`;`)
  await db.run(sql`DROP TABLE \`_services_v_version_faq\`;`)
  await db.run(sql`DROP TABLE \`_services_v\`;`)
  await db.run(sql`DROP TABLE \`industries_services\`;`)
  await db.run(sql`DROP TABLE \`industries_key_projects\`;`)
  await db.run(sql`DROP TABLE \`industries_challenges\`;`)
  await db.run(sql`DROP TABLE \`industries_solutions\`;`)
  await db.run(sql`DROP TABLE \`industries_stats\`;`)
  await db.run(sql`DROP TABLE \`industries\`;`)
  await db.run(sql`DROP TABLE \`_industries_v_version_services\`;`)
  await db.run(sql`DROP TABLE \`_industries_v_version_key_projects\`;`)
  await db.run(sql`DROP TABLE \`_industries_v_version_challenges\`;`)
  await db.run(sql`DROP TABLE \`_industries_v_version_solutions\`;`)
  await db.run(sql`DROP TABLE \`_industries_v_version_stats\`;`)
  await db.run(sql`DROP TABLE \`_industries_v\`;`)
  await db.run(sql`DROP TABLE \`case_studies_metrics\`;`)
  await db.run(sql`DROP TABLE \`case_studies_tags\`;`)
  await db.run(sql`DROP TABLE \`case_studies\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_version_metrics\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_version_tags\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v\`;`)
  await db.run(sql`DROP TABLE \`testimonials\`;`)
  await db.run(sql`DROP TABLE \`_testimonials_v\`;`)
  await db.run(sql`DROP TABLE \`leads\`;`)
  await db.run(sql`DROP TABLE \`_leads_v\`;`)
  await db.run(sql`DROP TABLE \`comments\`;`)
  await db.run(sql`DROP TABLE \`_comments_v\`;`)
  await db.run(sql`DROP TABLE \`media\`;`)
  await db.run(sql`DROP TABLE \`_media_v\`;`)
  await db.run(sql`DROP TABLE \`categories_breadcrumbs\`;`)
  await db.run(sql`DROP TABLE \`categories\`;`)
  await db.run(sql`DROP TABLE \`_categories_v_version_breadcrumbs\`;`)
  await db.run(sql`DROP TABLE \`_categories_v\`;`)
  await db.run(sql`DROP TABLE \`users_sessions\`;`)
  await db.run(sql`DROP TABLE \`users\`;`)
  await db.run(sql`DROP TABLE \`redirects\`;`)
  await db.run(sql`DROP TABLE \`redirects_rels\`;`)
  await db.run(sql`DROP TABLE \`_redirects_v\`;`)
  await db.run(sql`DROP TABLE \`_redirects_v_rels\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_checkbox\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_country\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_email\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_message\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_number\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_select_options\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_select\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_state\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_text\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_textarea\`;`)
  await db.run(sql`DROP TABLE \`forms_emails\`;`)
  await db.run(sql`DROP TABLE \`forms\`;`)
  await db.run(sql`DROP TABLE \`_forms_v_blocks_checkbox\`;`)
  await db.run(sql`DROP TABLE \`_forms_v_blocks_country\`;`)
  await db.run(sql`DROP TABLE \`_forms_v_blocks_email\`;`)
  await db.run(sql`DROP TABLE \`_forms_v_blocks_message\`;`)
  await db.run(sql`DROP TABLE \`_forms_v_blocks_number\`;`)
  await db.run(sql`DROP TABLE \`_forms_v_blocks_select_options\`;`)
  await db.run(sql`DROP TABLE \`_forms_v_blocks_select\`;`)
  await db.run(sql`DROP TABLE \`_forms_v_blocks_state\`;`)
  await db.run(sql`DROP TABLE \`_forms_v_blocks_text\`;`)
  await db.run(sql`DROP TABLE \`_forms_v_blocks_textarea\`;`)
  await db.run(sql`DROP TABLE \`_forms_v_version_emails\`;`)
  await db.run(sql`DROP TABLE \`_forms_v\`;`)
  await db.run(sql`DROP TABLE \`form_submissions_submission_data\`;`)
  await db.run(sql`DROP TABLE \`form_submissions\`;`)
  await db.run(sql`DROP TABLE \`_form_submissions_v_version_submission_data\`;`)
  await db.run(sql`DROP TABLE \`_form_submissions_v\`;`)
  await db.run(sql`DROP TABLE \`search_categories\`;`)
  await db.run(sql`DROP TABLE \`search\`;`)
  await db.run(sql`DROP TABLE \`search_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_kv\`;`)
  await db.run(sql`DROP TABLE \`payload_jobs_log\`;`)
  await db.run(sql`DROP TABLE \`payload_jobs\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_migrations\`;`)
  await db.run(sql`DROP TABLE \`header_nav_items\`;`)
  await db.run(sql`DROP TABLE \`header\`;`)
  await db.run(sql`DROP TABLE \`header_rels\`;`)
  await db.run(sql`DROP TABLE \`footer_nav_items\`;`)
  await db.run(sql`DROP TABLE \`footer\`;`)
  await db.run(sql`DROP TABLE \`footer_rels\`;`)
  await db.run(sql`DROP TABLE \`site_settings_roles\`;`)
  await db.run(sql`DROP TABLE \`site_settings_socials\`;`)
  await db.run(sql`DROP TABLE \`site_settings_metrics\`;`)
  await db.run(sql`DROP TABLE \`site_settings_clients\`;`)
  await db.run(sql`DROP TABLE \`site_settings_contact_channels\`;`)
  await db.run(sql`DROP TABLE \`site_settings_project_types\`;`)
  await db.run(sql`DROP TABLE \`site_settings_budget_ranges\`;`)
  await db.run(sql`DROP TABLE \`site_settings_timelines\`;`)
  await db.run(sql`DROP TABLE \`site_settings_contact_steps\`;`)
  await db.run(sql`DROP TABLE \`site_settings_contact_faq\`;`)
  await db.run(sql`DROP TABLE \`site_settings_footer_links\`;`)
  await db.run(sql`DROP TABLE \`site_settings\`;`)
  await db.run(sql`DROP TABLE \`site_settings_rels\`;`)
  await db.run(sql`DROP TABLE \`about_blocks_about_hero_stats\`;`)
  await db.run(sql`DROP TABLE \`about_blocks_about_hero\`;`)
  await db.run(sql`DROP TABLE \`about_blocks_origin_story\`;`)
  await db.run(sql`DROP TABLE \`about_blocks_philosophy_values\`;`)
  await db.run(sql`DROP TABLE \`about_blocks_philosophy\`;`)
  await db.run(sql`DROP TABLE \`about_blocks_timeline_items\`;`)
  await db.run(sql`DROP TABLE \`about_blocks_timeline\`;`)
  await db.run(sql`DROP TABLE \`about_blocks_skills_categories\`;`)
  await db.run(sql`DROP TABLE \`about_blocks_skills\`;`)
  await db.run(sql`DROP TABLE \`about_blocks_beyond_code_paragraphs\`;`)
  await db.run(sql`DROP TABLE \`about_blocks_beyond_code\`;`)
  await db.run(sql`DROP TABLE \`about_blocks_certifications_items\`;`)
  await db.run(sql`DROP TABLE \`about_blocks_certifications\`;`)
  await db.run(sql`DROP TABLE \`about\`;`)
  await db.run(sql`DROP TABLE \`home_blocks_home_hero\`;`)
  await db.run(sql`DROP TABLE \`home_blocks_pain_points\`;`)
  await db.run(sql`DROP TABLE \`home_blocks_mini_stack\`;`)
  await db.run(sql`DROP TABLE \`home_blocks_about\`;`)
  await db.run(sql`DROP TABLE \`home_blocks_works\`;`)
  await db.run(sql`DROP TABLE \`home_blocks_services\`;`)
  await db.run(sql`DROP TABLE \`home_blocks_industries\`;`)
  await db.run(sql`DROP TABLE \`home_blocks_process\`;`)
  await db.run(sql`DROP TABLE \`home_blocks_testimonials\`;`)
  await db.run(sql`DROP TABLE \`home_blocks_insights\`;`)
  await db.run(sql`DROP TABLE \`home_blocks_page_cta\`;`)
  await db.run(sql`DROP TABLE \`home\`;`)
  await db.run(sql`DROP TABLE \`resume_highlights\`;`)
  await db.run(sql`DROP TABLE \`resume_experience_achievements\`;`)
  await db.run(sql`DROP TABLE \`resume_experience_stack\`;`)
  await db.run(sql`DROP TABLE \`resume_experience\`;`)
  await db.run(sql`DROP TABLE \`resume_education\`;`)
  await db.run(sql`DROP TABLE \`resume_skills_items\`;`)
  await db.run(sql`DROP TABLE \`resume_skills\`;`)
  await db.run(sql`DROP TABLE \`resume_certifications\`;`)
  await db.run(sql`DROP TABLE \`resume_speaking\`;`)
  await db.run(sql`DROP TABLE \`resume\`;`)
  await db.run(sql`DROP TABLE \`uses_sections_items\`;`)
  await db.run(sql`DROP TABLE \`uses_sections\`;`)
  await db.run(sql`DROP TABLE \`uses\`;`)
  await db.run(sql`DROP TABLE \`now_blocks_items\`;`)
  await db.run(sql`DROP TABLE \`now_blocks\`;`)
  await db.run(sql`DROP TABLE \`now\`;`)
  await db.run(sql`DROP TABLE \`speaking_talks\`;`)
  await db.run(sql`DROP TABLE \`speaking\`;`)
  await db.run(sql`DROP TABLE \`payload_jobs_stats\`;`)
}
