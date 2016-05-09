CREATE KEYSPACE IF NOT EXISTS adap_gateway
    WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : 1 }
    AND DURABLE_WRITES = true;
