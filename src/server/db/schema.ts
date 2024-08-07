import { relations, sql } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `habitfarm_${name}`);

export const habitboards = createTable("habitboard", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 256 }),
  description: varchar("description", { length: 256 }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const habitBoards_relation = relations(habitboards, ({ many }) => ({
  habitDays: many(habitDays),
}));

export const habitDays = createTable("habitday", {
  id: serial("id").primaryKey(),
  habitboardId: integer("habitboard_id").notNull(),
  day: varchar("day", { length: 256 }),
  completed: boolean("completed").default(false),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const habitDays_relation = relations(habitDays, ({ one }) => ({
  habitboards: one(habitboards, {
    fields: [habitDays.habitboardId],
    references: [habitboards.id],
  }),
}));

// export const posts = createTable(
//   "post",
//   {
//     id: serial("id").primaryKey(),
//     name: varchar("name", { length: 256 }),
//     createdAt: timestamp("created_at", { withTimezone: true })
//       .default(sql`CURRENT_TIMESTAMP`)
//       .notNull(),
//     updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
//       () => new Date()
//     ),
//   },
//   (example) => ({
//     nameIndex: index("name_idx").on(example.name),
//   })
// );
