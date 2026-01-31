exports.up = (pgm) => {
  pgm.createTable("users", {
    id: {
      type: "serial",
      primaryKey: true,
    },
    email: {
      type: "varchar(255)",
      notNull: true,
      unique: true,
    },
    created_at: {
      type: "timestamp",
      default: pgm.func("current_timestamp"),
    },
  });

  // Insert seed data
  pgm.sql(`
    INSERT INTO users (email) VALUES
    ('john.doe@example.com'),
    ('jane.smith@example.com'),
    ('alice.johnson@example.com'),
    ('bob.wilson@example.com'),
    ('carol.brown@example.com');
  `);
};

exports.down = (pgm) => {
  pgm.dropTable("users");
};
