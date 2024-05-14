import {
  sqliteTable,
  text,
  integer,
  blob,
  uniqueIndex,
} from 'drizzle-orm/sqlite-core';
export const pdf = sqliteTable('pdf', {
  id: integer('id').primaryKey(),
  name: text('name'),
  author: text('author'),
  data: blob('data'),
  kind: text('kind'),
  status: text('status'),
  uploadedAt: integer('uploadedAt'),
  processedAt: integer('processedAt'),
});
