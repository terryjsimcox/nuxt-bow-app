import type { InferSelectModel } from 'drizzle-orm';
import {
  mysqlTable,
  timestamp,
  int,
  tinyint,
  json,
} from 'drizzle-orm/mysql-core';
import { roles } from './roles';
import { resources } from './resources';
import { actions } from './actions';

export const permissionRules = mysqlTable('permission_rules', {
  id: int().primaryKey().autoincrement(),
  role_id: int('role_id')
    .notNull()
    .references(() => roles.id),
  resource_id: int('resource_id')
    .notNull()
    .references(() => resources.id),
  action_id: int('action_id')
    .notNull()
    .references(() => actions.id),
  allowed: tinyint('allowed').notNull().default(0),
  condition: json('condition'),
  createdAt: timestamp('created_at', { fsp: 3 }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { fsp: 3 })
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export type PermissionRule = InferSelectModel<typeof permissionRules>;
