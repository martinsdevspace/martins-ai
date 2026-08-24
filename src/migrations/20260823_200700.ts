import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`site_settings_terminal_lines\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`prompt\` text,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_terminal_lines_order_idx\` ON \`site_settings_terminal_lines\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_terminal_lines_parent_id_idx\` ON \`site_settings_terminal_lines\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_blocks_pain_points_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`icon\` text,
  	\`title\` text,
  	\`body\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_blocks_pain_points\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_blocks_pain_points_items_order_idx\` ON \`home_blocks_pain_points_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_blocks_pain_points_items_parent_id_idx\` ON \`home_blocks_pain_points_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_blocks_mini_stack_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tech\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_blocks_mini_stack\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_blocks_mini_stack_items_order_idx\` ON \`home_blocks_mini_stack_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_blocks_mini_stack_items_parent_id_idx\` ON \`home_blocks_mini_stack_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_blocks_process_phases_tags\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tag\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_blocks_process_phases\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_blocks_process_phases_tags_order_idx\` ON \`home_blocks_process_phases_tags\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_blocks_process_phases_tags_parent_id_idx\` ON \`home_blocks_process_phases_tags\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_blocks_process_phases\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`num\` text,
  	\`title\` text,
  	\`description\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_blocks_process\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_blocks_process_phases_order_idx\` ON \`home_blocks_process_phases\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_blocks_process_phases_parent_id_idx\` ON \`home_blocks_process_phases\` (\`_parent_id\`);`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`navigate_label\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`connect_label\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`contact_column_label\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`response_time_note\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`timezone_note\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`copyright_text\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`status_label\` text;`)
  await db.run(sql`ALTER TABLE \`home_blocks_pain_points\` ADD \`label\` text DEFAULT '// THE_OLD_WAY';`)
  await db.run(sql`ALTER TABLE \`home_blocks_pain_points\` ADD \`heading\` text DEFAULT 'Stop fighting your stack.';`)
  await db.run(sql`ALTER TABLE \`home_blocks_pain_points\` ADD \`intro\` text;`)
  await db.run(sql`ALTER TABLE \`home_blocks_mini_stack\` ADD \`label\` text DEFAULT '// CURRENT_STACK';`)
  await db.run(sql`ALTER TABLE \`home_blocks_mini_stack\` ADD \`heading\` text DEFAULT 'Built on a stack that ships.';`)
  await db.run(sql`ALTER TABLE \`home_blocks_about\` ADD \`label\` text DEFAULT '// — ABOUT';`)
  await db.run(sql`ALTER TABLE \`home_blocks_about\` ADD \`link_label\` text DEFAULT 'READ_THE_FULL_STORY';`)
  await db.run(sql`ALTER TABLE \`home_blocks_works\` ADD \`label\` text DEFAULT '// 02 — SELECTED_WORKS';`)
  await db.run(sql`ALTER TABLE \`home_blocks_works\` ADD \`heading\` text DEFAULT 'Systems that run real money.';`)
  await db.run(sql`ALTER TABLE \`home_blocks_works\` ADD \`intro\` text;`)
  await db.run(sql`ALTER TABLE \`home_blocks_works\` ADD \`view_all_label\` text DEFAULT 'View all works';`)
  await db.run(sql`ALTER TABLE \`home_blocks_services\` ADD \`label\` text DEFAULT '// 03 — SERVICES';`)
  await db.run(sql`ALTER TABLE \`home_blocks_services\` ADD \`heading\` text DEFAULT 'Engagements that ship.';`)
  await db.run(sql`ALTER TABLE \`home_blocks_services\` ADD \`intro\` text;`)
  await db.run(sql`ALTER TABLE \`home_blocks_services\` ADD \`view_all_label\` text DEFAULT 'View all services';`)
  await db.run(sql`ALTER TABLE \`home_blocks_industries\` ADD \`label\` text DEFAULT '// 04 — INDUSTRIES';`)
  await db.run(sql`ALTER TABLE \`home_blocks_industries\` ADD \`heading\` text DEFAULT 'Where I operate.';`)
  await db.run(sql`ALTER TABLE \`home_blocks_industries\` ADD \`intro\` text;`)
  await db.run(sql`ALTER TABLE \`home_blocks_industries\` ADD \`view_all_label\` text DEFAULT 'View all industries';`)
  await db.run(sql`ALTER TABLE \`home_blocks_process\` ADD \`label\` text DEFAULT '// 06 — PROCESS';`)
  await db.run(sql`ALTER TABLE \`home_blocks_process\` ADD \`heading\` text DEFAULT 'A repeatable path from first call to shipped.';`)
  await db.run(sql`ALTER TABLE \`home_blocks_process\` ADD \`intro\` text;`)
  await db.run(sql`ALTER TABLE \`home_blocks_testimonials\` ADD \`label\` text DEFAULT '// 07 — TESTIMONIALS';`)
  await db.run(sql`ALTER TABLE \`home_blocks_testimonials\` ADD \`heading\` text DEFAULT 'What founders and engineering leads say.';`)
  await db.run(sql`ALTER TABLE \`home_blocks_testimonials\` ADD \`intro\` text;`)
  await db.run(sql`ALTER TABLE \`home_blocks_insights\` ADD \`label\` text DEFAULT '// 08 — LATEST_INSIGHTS';`)
  await db.run(sql`ALTER TABLE \`home_blocks_insights\` ADD \`heading\` text DEFAULT 'Notes from the build log.';`)
  await db.run(sql`ALTER TABLE \`home_blocks_insights\` ADD \`intro\` text;`)
  await db.run(sql`ALTER TABLE \`home_blocks_insights\` ADD \`view_all_label\` text DEFAULT 'View all insights';`)
  await db.run(sql`ALTER TABLE \`home_blocks_page_cta\` ADD \`address\` text;`)
  await db.run(sql`ALTER TABLE \`home_blocks_page_cta\` ADD \`status_badge\` text;`)
  await db.run(sql`ALTER TABLE \`home_blocks_page_cta\` ADD \`response_note\` text;`)
  await db.run(sql`ALTER TABLE \`speaking\` ADD \`page_label\` text DEFAULT '// — SPEAKING';`)
  await db.run(sql`ALTER TABLE \`speaking\` ADD \`upcoming_heading\` text DEFAULT 'Upcoming';`)
  await db.run(sql`ALTER TABLE \`speaking\` ADD \`past_heading\` text DEFAULT 'Selected talks';`)
  await db.run(sql`ALTER TABLE \`speaking\` ADD \`empty_message\` text DEFAULT 'No talks listed yet. Check back soon.';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`site_settings_terminal_lines\`;`)
  await db.run(sql`DROP TABLE \`home_blocks_pain_points_items\`;`)
  await db.run(sql`DROP TABLE \`home_blocks_mini_stack_items\`;`)
  await db.run(sql`DROP TABLE \`home_blocks_process_phases_tags\`;`)
  await db.run(sql`DROP TABLE \`home_blocks_process_phases\`;`)
  await db.run(sql`ALTER TABLE \`site_settings\` DROP COLUMN \`navigate_label\`;`)
  await db.run(sql`ALTER TABLE \`site_settings\` DROP COLUMN \`connect_label\`;`)
  await db.run(sql`ALTER TABLE \`site_settings\` DROP COLUMN \`contact_column_label\`;`)
  await db.run(sql`ALTER TABLE \`site_settings\` DROP COLUMN \`response_time_note\`;`)
  await db.run(sql`ALTER TABLE \`site_settings\` DROP COLUMN \`timezone_note\`;`)
  await db.run(sql`ALTER TABLE \`site_settings\` DROP COLUMN \`copyright_text\`;`)
  await db.run(sql`ALTER TABLE \`site_settings\` DROP COLUMN \`status_label\`;`)
  await db.run(sql`ALTER TABLE \`home_blocks_pain_points\` DROP COLUMN \`label\`;`)
  await db.run(sql`ALTER TABLE \`home_blocks_pain_points\` DROP COLUMN \`heading\`;`)
  await db.run(sql`ALTER TABLE \`home_blocks_pain_points\` DROP COLUMN \`intro\`;`)
  await db.run(sql`ALTER TABLE \`home_blocks_mini_stack\` DROP COLUMN \`label\`;`)
  await db.run(sql`ALTER TABLE \`home_blocks_mini_stack\` DROP COLUMN \`heading\`;`)
  await db.run(sql`ALTER TABLE \`home_blocks_about\` DROP COLUMN \`label\`;`)
  await db.run(sql`ALTER TABLE \`home_blocks_about\` DROP COLUMN \`link_label\`;`)
  await db.run(sql`ALTER TABLE \`home_blocks_works\` DROP COLUMN \`label\`;`)
  await db.run(sql`ALTER TABLE \`home_blocks_works\` DROP COLUMN \`heading\`;`)
  await db.run(sql`ALTER TABLE \`home_blocks_works\` DROP COLUMN \`intro\`;`)
  await db.run(sql`ALTER TABLE \`home_blocks_works\` DROP COLUMN \`view_all_label\`;`)
  await db.run(sql`ALTER TABLE \`home_blocks_services\` DROP COLUMN \`label\`;`)
  await db.run(sql`ALTER TABLE \`home_blocks_services\` DROP COLUMN \`heading\`;`)
  await db.run(sql`ALTER TABLE \`home_blocks_services\` DROP COLUMN \`intro\`;`)
  await db.run(sql`ALTER TABLE \`home_blocks_services\` DROP COLUMN \`view_all_label\`;`)
  await db.run(sql`ALTER TABLE \`home_blocks_industries\` DROP COLUMN \`label\`;`)
  await db.run(sql`ALTER TABLE \`home_blocks_industries\` DROP COLUMN \`heading\`;`)
  await db.run(sql`ALTER TABLE \`home_blocks_industries\` DROP COLUMN \`intro\`;`)
  await db.run(sql`ALTER TABLE \`home_blocks_industries\` DROP COLUMN \`view_all_label\`;`)
  await db.run(sql`ALTER TABLE \`home_blocks_process\` DROP COLUMN \`label\`;`)
  await db.run(sql`ALTER TABLE \`home_blocks_process\` DROP COLUMN \`heading\`;`)
  await db.run(sql`ALTER TABLE \`home_blocks_process\` DROP COLUMN \`intro\`;`)
  await db.run(sql`ALTER TABLE \`home_blocks_testimonials\` DROP COLUMN \`label\`;`)
  await db.run(sql`ALTER TABLE \`home_blocks_testimonials\` DROP COLUMN \`heading\`;`)
  await db.run(sql`ALTER TABLE \`home_blocks_testimonials\` DROP COLUMN \`intro\`;`)
  await db.run(sql`ALTER TABLE \`home_blocks_insights\` DROP COLUMN \`label\`;`)
  await db.run(sql`ALTER TABLE \`home_blocks_insights\` DROP COLUMN \`heading\`;`)
  await db.run(sql`ALTER TABLE \`home_blocks_insights\` DROP COLUMN \`intro\`;`)
  await db.run(sql`ALTER TABLE \`home_blocks_insights\` DROP COLUMN \`view_all_label\`;`)
  await db.run(sql`ALTER TABLE \`home_blocks_page_cta\` DROP COLUMN \`address\`;`)
  await db.run(sql`ALTER TABLE \`home_blocks_page_cta\` DROP COLUMN \`status_badge\`;`)
  await db.run(sql`ALTER TABLE \`home_blocks_page_cta\` DROP COLUMN \`response_note\`;`)
  await db.run(sql`ALTER TABLE \`speaking\` DROP COLUMN \`page_label\`;`)
  await db.run(sql`ALTER TABLE \`speaking\` DROP COLUMN \`upcoming_heading\`;`)
  await db.run(sql`ALTER TABLE \`speaking\` DROP COLUMN \`past_heading\`;`)
  await db.run(sql`ALTER TABLE \`speaking\` DROP COLUMN \`empty_message\`;`)
}
