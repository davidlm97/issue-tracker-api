echo '################ MONGO ENTRYPOINT START ################';
# Mongo script to seed a user for accesing the default db
mongo -- "$MONGO_INITDB_DATABASE" <<EOF
db.createUser({
    user: '$MONGO_DB_USER_NAME',
    pwd: '$MONGO_DB_USER_PASSWORD',
    roles: [
      {
        role: 'readWrite',
        db: '$MONGO_INITDB_DATABASE',
      },
    ],
  });
EOF

echo '################ MONGO ENTRYPOINT END ################';