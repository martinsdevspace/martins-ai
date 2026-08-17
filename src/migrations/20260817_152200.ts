import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "site_settings_contact_steps" DROP COLUMN "step";
  ALTER TABLE "site_settings_contact_steps" ADD COLUMN "title" varchar;
  ALTER TABLE "site_settings_contact_steps" ADD COLUMN "description" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "site_settings_contact_steps" DROP COLUMN "description";
  ALTER TABLE "site_settings_contact_steps" DROP COLUMN "title";
  ALTER TABLE "site_settings_contact_steps" ADD COLUMN "step" varchar;`)
}
