import {
  mysqlTable,
  varchar,
  text,
  timestamp,
  bigint,
  int,
  mysqlEnum,
} from 'drizzle-orm/mysql-core';
export const backupLogs = mysqlTable('backup_logs', {
  id: int('id').primaryKey().autoincrement(),
  userId: varchar('user_id', { length: 36 }),
  backuptime: timestamp('backup_time', { fsp: 3 }), // time of backup
  status: mysqlEnum('status', ['SUCCESS', 'FAILED', 'WARNING']).notNull(), // status of backup
  message: text('message').notNull(), // message
  backupfile: varchar('backup_file', { length: 255 }), // backup file
  backupSize: bigint('backup_size', { mode: 'number' }), // backup size in bytes
  durationseconds: int('duration_seconds'), // Duration of the backup process
  createdAt: timestamp('created_at', { fsp: 3 }).defaultNow().notNull(), // record creation time
  updatedAt: timestamp('updated_at', { fsp: 3 })
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export type BackupLog = typeof backupLogs.$inferSelect;
export type NewBackupLog = typeof backupLogs.$inferInsert;
