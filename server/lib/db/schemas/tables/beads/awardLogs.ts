import {
  int,
  mysqlTable,
  serial,
  text,
  timestamp,
} from 'drizzle-orm/mysql-core';

export const awardLogs = mysqlTable('award_logs', {
  id: serial('id').primaryKey(),
  bead_id: int('bead_id'),
  event_type: text('event_type'),
  event_description: text('event_description'),
  event_data: text('event_data'),
  date: timestamp('date'),
  event_user_ip: text('event_user_ip'),
  event_user: text('event_user'),
});
