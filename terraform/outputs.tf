output "database_connection_name" {
  description = "The connection name of the database instance"
  value       = google_sql_database_instance.main.connection_name
}

output "database_ip" {
  description = "The IP address of the database instance"
  value       = google_sql_database_instance.main.ip_address[0].ip_address
}

output "database_url" {
  description = "The database URL for the application"
  value       = "postgresql://${google_sql_user.main.name}:${random_password.db_password.result}@${google_sql_database_instance.main.ip_address[0].ip_address}:5432/${google_sql_database.main.name}"
  sensitive   = true
}
